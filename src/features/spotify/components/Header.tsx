import { LogOut, User as UserIcon, Bell, Check, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Request } from '../../../types';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    requests?: Request[];
    onAcceptRequest?: (request: Request) => Promise<void>;
    onRejectRequest?: (requestId: string) => Promise<void>;
    isGuest?: boolean;
}

export function Header({ user, onLogout, requests = [], onAcceptRequest, onRejectRequest, isGuest = false }: HeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const pendingRequests = requests.filter(r => r.status === 'pending');
    const hasNotifications = pendingRequests.length > 0;
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-gray-900/90 backdrop-blur-xl border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-30 shadow-lg">
            <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg border border-green-500/30">
                    <UserIcon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                    <h2 className="font-bold text-white text-lg leading-tight">
                        {user ? (user.displayName || user.email?.split('@')[0]) : 'Bienvenido'}
                    </h2>
                    <p className="text-xs text-gray-400 capitalize">
                        {user ? (isGuest ? 'Visitante' : 'Administrador') : 'Inicia Sesión'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {user && !isGuest && (
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors relative"
                        >
                            <Bell className="w-5 h-5" />
                            {hasNotifications && (
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-900 animate-pulse"></span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-gray-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-3 border-b border-white/10 bg-gray-900/50">
                                    <h3 className="font-bold text-white text-sm">Solicitudes ({pendingRequests.length})</h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {pendingRequests.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500 text-sm">
                                            No hay solicitudes pendientes
                                        </div>
                                    ) : (
                                        pendingRequests.map(request => (
                                            <div key={request.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="text-white font-medium text-sm">{request.name}</p>
                                                        <p className="text-xs text-gray-400">Solicita unirse</p>
                                                    </div>
                                                    <span className="text-[10px] text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded">
                                                        {new Date(request.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => onAcceptRequest?.(request)}
                                                        className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 text-xs font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 transition-colors border border-green-500/20"
                                                    >
                                                        <Check className="w-3 h-3" /> Aceptar
                                                    </button>
                                                    <button
                                                        onClick={() => onRejectRequest?.(request.id)}
                                                        className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 transition-colors border border-red-500/20"
                                                    >
                                                        <X className="w-3 h-3" /> Rechazar
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                    title="Cerrar sesión"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium hidden md:inline">Salir</span>
                </button>
            </div>
        </header>
    );
}
