import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export function WhatsAppButton() {
    const [showConfirm, setShowConfirm] = useState(false);

    const sendWhatsAppNotice = () => {
        const message = `🚨⚠️
    _Bueno, que, no van a pagar o que?_
    _Actualmente te encuentras en mora del pago por concepto de: Spotify Familiar._
    _Paga y sigue disfrutando de tu música favorita_
    _Notificación automática creada por: Afemos_`;

        const text = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${text}`, '_blank');
        setShowConfirm(false);
    };

    return (
        <div className="absolute bottom-32 right-4 z-50">
            {showConfirm ? (
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-green-200 flex flex-col gap-3 w-64 animate-in slide-in-from-bottom-5 mb-4">
                    <div className="text-gray-800 font-medium">
                        <p>¿Enviar recordatorio?</p>
                        <p className="text-xs text-gray-500 italic mt-1 whitespace-pre-line">
                            "🚨⚠️ Bueno, que, no van a pagar..."
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200">Cancelar</button>
                        <button onClick={sendWhatsAppNotice} className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 flex items-center justify-center gap-1">
                            <Send className="w-4 h-4" /> Enviar
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShowConfirm(true)}
                    className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center gap-2 font-bold border-4 border-white"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span>Enviar Aviso</span>
                </button>
            )}
        </div>
    );
}
