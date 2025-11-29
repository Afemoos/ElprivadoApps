import { useMemo } from 'react';

interface DailyWorkoutProps {
    schedule: Record<string, string[]>;
    onEdit: () => void;
}

export function DailyWorkout({ schedule, onEdit }: DailyWorkoutProps) {
    const today = useMemo(() => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[new Date().getDay()];
    }, []);

    const dayLabel = useMemo(() => {
        const labels: Record<string, string> = {
            monday: 'Lunes', tuesday: 'Martes', wednesday: 'Miércoles', thursday: 'Jueves',
            friday: 'Viernes', saturday: 'Sábado', sunday: 'Domingo'
        };
        return labels[today];
    }, [today]);

    const todaysMuscles = schedule[today] || [];
    const isRestDay = todaysMuscles.includes('Descanso') || todaysMuscles.length === 0;

    return (
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="space-y-2">
                <h2 className="text-gray-400 text-xl">Hoy es {dayLabel}</h2>
                <h1 className="text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    {isRestDay ? 'Día de Descanso' : 'A trabajar:'}
                </h1>
            </div>

            {!isRestDay && (
                <div className="flex flex-wrap justify-center gap-4 py-8">
                    {todaysMuscles.map(muscle => (
                        <div key={muscle} className="bg-red-500/10 border border-red-500/30 text-red-400 px-8 py-4 rounded-2xl text-2xl font-bold shadow-lg shadow-red-500/10">
                            {muscle}
                        </div>
                    ))}
                </div>
            )}

            {isRestDay && (
                <div className="py-8">
                    <p className="text-xl text-gray-500">Recupérate para darle con todo mañana 💪</p>
                </div>
            )}

            <button
                onClick={onEdit}
                className="text-gray-400 hover:text-white underline decoration-gray-600 hover:decoration-white underline-offset-4 transition-all"
            >
                Modificar mi rutina
            </button>
        </div>
    );
}
