import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { RoutineEditor } from './components/RoutineEditor';
import { DailyWorkout } from './components/DailyWorkout';

interface GymAppProps {
    onBackToHub: () => void;
}

export function GymApp({ onBackToHub }: GymAppProps) {
    const { user } = useAuth();
    const [schedule, setSchedule] = useState<Record<string, string[]> | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function fetchRoutine() {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, 'gym_routines', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSchedule(docSnap.data().schedule);
                }
            } catch (error) {
                console.error("Error fetching routine:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRoutine();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-950 to-gray-900 text-white p-8">
            <button
                onClick={onBackToHub}
                className="mb-8 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
                <span>←</span> Volver al Hub
            </button>

            <div className="max-w-6xl mx-auto">
                {!user ? (
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold mb-4">Modo Visitante</h2>
                        <p className="text-gray-400 mb-8">Inicia sesión para crear y gestionar tu rutina personalizada.</p>
                        <div className="opacity-50 pointer-events-none blur-sm select-none">
                            <DailyWorkout schedule={{}} onEdit={() => { }} />
                        </div>
                    </div>
                ) : !schedule || isEditing ? (
                    <RoutineEditor
                        initialSchedule={schedule || undefined}
                        onSave={() => {
                            setIsEditing(false);
                            window.location.reload();
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <DailyWorkout
                        schedule={schedule}
                        onEdit={() => setIsEditing(true)}
                    />
                )}
            </div>
        </div>
    );
}
