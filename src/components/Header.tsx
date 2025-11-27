import { DollarSign, Cloud, CloudOff } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
    user: User | null;
}

export function Header({ user }: HeaderProps) {
    return (
        <header className="bg-gray-900 text-white p-4 pt-6 shadow-lg z-10 flex justify-between items-center shrink-0">
            <div className="w-6"></div>
            <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-green-500 p-1 rounded-full"><DollarSign className="w-4 h-4 text-white" /></span>
                Control de Spotify
            </h1>
            <div title={user ? "Conectado" : "Desconectado"}>
                {user ? <Cloud className="w-5 h-5 text-green-400" /> : <CloudOff className="w-5 h-5 text-red-400" />}
            </div>
        </header>
    );
}
