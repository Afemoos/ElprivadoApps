import { useState, Suspense } from 'react';
import { Hub } from './components/Hub';
import { apps } from './config/apps';

export default function App() {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  if (!selectedAppId) {
    return <Hub onSelectApp={setSelectedAppId} />;
  }

  const SelectedApp = apps.find(app => app.id === selectedAppId)?.component;

  if (SelectedApp) {
    return (
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center bg-gray-900 text-green-500 flex-col gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="font-medium animate-pulse">Cargando aplicación...</p>
        </div>
      }>
        <SelectedApp onBackToHub={() => setSelectedAppId(null)} />
      </Suspense>
    );
  }

  return null;
}