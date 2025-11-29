if (appId) {
  const appExists = apps.find(a => a.id === appId);
  if (appExists) {
    setSelectedAppId(appId);
  }
}
  }, []);

const handleNavigate = (page: ViewState | 'hub') => {
  setCurrentView(page as ViewState);
  if (page === 'hub') {
    setSelectedAppId(null);
  }
};

const renderContent = () => {
  if (selectedAppId) {
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
  }

  switch (currentView) {
    case 'login':
      return <Login onNavigate={handleNavigate} />;
    case 'register':
      return <Register onNavigate={handleNavigate} />;
    case 'forgot-password':
      return <ForgotPassword onNavigate={handleNavigate} />;
    case 'hub':
    default:
      return <Lobby onSelectApp={setSelectedAppId} onNavigateToAuth={() => setCurrentView('login')} />;
  }
};

return (
  <AuthProvider>
    {renderContent()}
  </AuthProvider>
);
}