import { useState } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../context/AuthContext';

const DAYS = [
    { id: 'monday', label: 'Lunes' },
    { id: 'tuesday', label: 'Martes' },
    { id: 'wednesday', label: 'Miércoles' },
    { id: 'thursday', label: 'Jueves' },
    { id: 'friday', label: 'Viernes' },
    { id: 'saturday', label: 'Sábado' },
    { id: 'sunday', label: 'Domingo' },
];

const MUSCLE_GROUPS = [
    'Pecho', 'Espalda', 'Piernas', 'Hombros', 'Bíceps', 'Tríceps', 'Abdominales', 'Cardio', 'Descanso'
];

interface RoutineEditorProps {
    initialSchedule?: Record<string, string[]>;
    onSave: () => void;
    onCancel: () => void;
}

export function RoutineEditor({ initialSchedule, onSave, onCancel }: RoutineEditorProps) {
    const { user } = useAuth();
    const [schedule, setSchedule] = useState<Record<string, string[]>>(initialSchedule || {
        monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: []
    });
    const [saving, setSaving] = useState(false);

    const toggleMuscle = (day: string, muscle: string) => {
        setSchedule(prev => {
            const currentMuscles = prev[day] || [];
            const newMuscles = currentMuscles.includes(muscle)
                ? currentMuscles.filter(m => m !== muscle)
                : [...currentMuscles, muscle];
            return { ...prev, [day]: newMuscles };
        });
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await setDoc(doc(db, 'gym_routines', user.uid), {
                userId: user.uid,
                schedule,
                updatedAt: Timestamp.now()
            });
            onSave();
        } catch (error) {
            console.error("Error saving routine:", error);
            alert("Error al guardar la rutina");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Editar Rutina Semanal</h2>
                <div className="space-x-4">
                    <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Guardando...' : 'Guardar Rutina'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {DAYS.map(day => (
                    <div key={day.id} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-red-400">{day.label}</h3>
                        <div className="flex flex-wrap gap-2">
                            {MUSCLE_GROUPS.map(muscle => (
                                <button
                                    key={muscle}
                                    onClick={() => toggleMuscle(day.id, muscle)}
                                    className={`px-3 py-1 rounded-full text-sm transition-all ${schedule[day.id]?.includes(muscle)
                                        ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                                        : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10'
                                        }`}
                                >
                                    {muscle}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
