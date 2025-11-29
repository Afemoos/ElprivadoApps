import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

interface ForgotPasswordProps {
    onNavigate: (page: 'login' | 'register' | 'forgot-password' | 'hub') => void;
}

export function ForgotPassword({ onNavigate }: ForgotPasswordProps) {
    const [email, setEmail] = useState('');
    const { resetPassword, error, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let resetEmail = email;
            if (!email.includes('@')) {
                resetEmail = `${email}@elprivado.app`;
            }
            await resetPassword(resetEmail);
            setSuccess(true);
        } catch (error) {
            // Error is handled in context
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6 font-sans text-white">
            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <button
                    onClick={() => onNavigate('login')}
                    className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver al Login
                </button>

                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Recuperar Cuenta
                    </h2>
                    <p className="text-gray-400">
                        Te enviaremos un enlace para restablecer tu contraseña
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    {success ? (
                        <div className="text-center space-y-6 py-4">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">¡Correo enviado!</h3>
                                <p className="text-gray-400 text-sm">
                                    Revisa tu bandeja de entrada en <strong>{email}</strong> y sigue las instrucciones para restablecer tu contraseña.
                                </p>
                            </div>
                            <button
                                onClick={() => onNavigate('login')}
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors"
                            >
                                Volver al inicio de sesión
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Email o Usuario</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
                                        placeholder="tu@email.com o usuario"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Enviar enlace'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
