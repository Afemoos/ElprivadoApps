

import { apps } from '../../config/apps';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LogIn } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

interface LobbyProps {
    onSelectApp: (appId: string) => void;
    onNavigateToAuth: () => void;
}

export function Lobby({ onSelectApp, onNavigateToAuth }: LobbyProps) {
    const { user, logOut } = useAuth();

    const handleAppClick = (appId: string) => {
        // Allow access to everyone (Visitor Mode)
        onSelectApp(appId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 font-sans text-white relative">
            {/* Auth Button */}
            <div className="absolute top-6 right-6 z-10">
                {user ? (
                    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 pr-4 animate-in fade-in slide-in-from-top-5 duration-500 hover:bg-white/10 transition-colors hover:shadow-lg hover:shadow-indigo-500/10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <span className="font-bold text-white text-lg">
                                {user.email?.[0].toUpperCase()}
                            </span>
                        </div>
                        <div className="hidden md:block text-left mr-2">
                            <p className="text-xs text-gray-400">Hola,</p>
                            <p className="text-sm font-medium text-white max-w-[150px] truncate">
                                {user.email?.split('@')[0]}
                            </p>
                        </div>
                        <button
                            onClick={() => logOut()}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                            title="Cerrar Sesión"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <Button
                        onClick={onNavigateToAuth}
                        variant="ghost"
                        color="indigo"
                        icon={<LogIn className="w-4 h-4" />}
                    >
                        Iniciar Sesión
                    </Button>
                )}
            </div>

            <div className="max-w-4xl w-full space-y-12">
                <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Lobby
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl">
                        Selecciona una aplicación para comenzar
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apps.filter(app => !app.hidden).map((app) => (
                        <Card
                            key={app.id}
                            onClick={() => handleAppClick(app.id)}
                            hoverEffect
                            color="indigo"
                            className="group relative cursor-pointer flex flex-col gap-6 animate-in zoom-in-95 duration-500 delay-100 text-left"
                        >
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-indigo-500/30 group-hover:border-indigo-500/50 transition-all shadow-lg shadow-black/50 flex items-center justify-center bg-slate-800">
                                <app.icon className="w-10 h-10 text-indigo-500 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{app.name}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {app.description}
                                </p>
                            </div>
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Card>
                    ))}

                    {/* Placeholder for future apps */}
                    <Card className="flex flex-col items-center justify-center gap-4 opacity-50 border-dashed hover:opacity-75 transition-opacity duration-300 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="text-2xl text-gray-600">+</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">Próximamente</p>
                    </Card>
                </div>
            </div>

            <footer className="fixed bottom-6 text-center text-gray-600 text-xs">
                &copy; {new Date().getFullYear()} El Privado Team
            </footer>
        </div >
    );
}
