import { lazy } from 'react';
import { Music, Dumbbell } from 'lucide-react';

// Lazy load components for better performance
const SpotifyApp = lazy(() => import('../features/spotify/SpotifyApp').then(module => ({ default: module.SpotifyApp })));
const GymApp = lazy(() => import('../features/gym/GymApp').then(module => ({ default: module.GymApp })));

export interface AppConfig {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    component: React.ComponentType<{ onBackToHub: () => void }>;
    hidden?: boolean;
}

export const apps: AppConfig[] = [
    {
        id: 'spotify',
        name: 'Spotify Familiar',
        description: 'Gestión de pagos y miembros del plan familiar',
        icon: Music,
        component: SpotifyApp
    },
    {
        id: 'app_2',
        name: 'Gym Planner',
        description: 'Planificador de rutinas de gimnasio',
        icon: Dumbbell,
        component: GymApp,
        hidden: true
    }
];
