import { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

interface VisitorRequestProps {
    onRequestSpot: (name: string) => Promise<void>;
}

export function VisitorRequest({ onRequestSpot }: VisitorRequestProps) {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        try {
            await onRequestSpot(name);
            setIsSuccess(true);
            setName('');
            // Reset success message after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
        } catch (error) {
            console.error("Error requesting spot:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-5 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">¿Quieres unirte al Plan Familiar?</h3>
                    <p className="text-gray-400 text-sm max-w-md">
                        Envía una solicitud al administrador con tu nombre. Una vez aceptada, podrás crear tu cuenta vinculada.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre..."
                            className="w-full sm:w-64 bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
                            disabled={isSubmitting || isSuccess}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || !name.trim() || isSuccess}
                        className={`
                            flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-200
                            ${isSuccess
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                                : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                            }
                        `}
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isSuccess ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Enviado</span>
                            </>
                        ) : (
                            <>
                                <span>Solicitar</span>
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
