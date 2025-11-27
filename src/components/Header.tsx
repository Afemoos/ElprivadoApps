import { DollarSign, Cloud, CloudOff, LogOut } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
    return (
        <header className="bg-gray-900/50 backdrop-blur-md text-white p-4 pt-6 shadow-lg z-10 flex justify-between items-center shrink-0 border-b border-white/10">
            <button
                onClick={onLogout}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                title="Cerrar sesión"
            >
                <LogOut className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full border border-green-500/30"><DollarSign className="w-4 h-4 text-green-400" /></span>
                Control de Spotify
            </h1>
            <div title={user ? "Conectado" : "Desconectado"}>
                {user ? <Cloud className="w-5 h-5 text-green-400" /> : <CloudOff className="w-5 h-5 text-red-400" />}
            </div>
        </header>
    );
}
