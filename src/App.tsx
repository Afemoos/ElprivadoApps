import { useState } from 'react';
import { Users, DollarSign, List } from 'lucide-react';
import { useSpotifyData } from './hooks/useSpotifyData';
import { Header } from './components/Header';
import { MemberManagement } from './components/MemberManagement';
import { PaymentList } from './components/PaymentList';
import { HistoryReport } from './components/HistoryReport';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Login } from './components/Login';

export default function SpotifyTracker() {
  const { user, members, payments, isLoading, addMember, removeMember, markAsPaid, undoPayment, deleteHistorical } = useSpotifyData();
  const [activeTab, setActiveTab] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const selectSpecificMonth = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsGuest(false);
  };

  const handleGuestLogin = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
    setActiveTab(1); // Default to Payments tab for guests
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} onGuestLogin={handleGuestLogin} />;
  }

  if (isLoading && !user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-green-500 flex-col gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <p className="font-medium animate-pulse">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-[100dvh] flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 font-sans relative overflow-hidden text-white">
      <Header user={user} />

      <main className="flex-1 overflow-y-auto p-4 relative">
        {activeTab === 0 && !isGuest && (
          <MemberManagement
            members={members}
            onAddMember={addMember}
            onRemoveMember={removeMember}
          />
        )}

        {activeTab === 1 && (
          <PaymentList
            members={members}
            payments={payments}
            currentDate={currentDate}
            onChangeMonth={changeMonth}
            onMarkAsPaid={markAsPaid}
            onUndoPayment={undoPayment}
            isGuest={isGuest}
          />
        )}

        {activeTab === 2 && (
          <HistoryReport
            members={members}
            payments={payments}
            currentDate={currentDate}
            onChangeMonth={changeMonth}
            onSelectMonth={selectSpecificMonth}
            onDeleteHistorical={deleteHistorical}
            isGuest={isGuest}
          />
        )}
      </main>

      {activeTab === 1 && !isGuest && <WhatsAppButton />}

      <nav className="bg-gray-900/90 backdrop-blur-lg border-t border-white/10 flex justify-around p-2 pb-6 shadow-2xl z-20 shrink-0">
        {!isGuest && (
          <button onClick={() => setActiveTab(0)} className={`flex flex-col items-center p-2 rounded-xl w-20 transition-all duration-300 ${activeTab === 0 ? 'text-green-400 bg-white/10 translate-y-[-4px]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}><Users className={`w-6 h-6 mb-1 ${activeTab === 0 ? 'fill-current' : ''}`} /><span className="text-[10px] font-bold uppercase tracking-wide">Gestión</span></button>
        )}
        <button onClick={() => setActiveTab(1)} className={`flex flex-col items-center p-2 rounded-xl w-20 transition-all duration-300 ${activeTab === 1 ? 'text-green-400 bg-white/10 shadow-lg shadow-green-900/20 translate-y-[-8px] scale-110' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}><DollarSign className="w-7 h-7 mb-0.5" strokeWidth={activeTab === 1 ? 3 : 2} /><span className="text-[10px] font-bold uppercase tracking-wide">Pagos</span></button>
        <button onClick={() => setActiveTab(2)} className={`flex flex-col items-center p-2 rounded-xl w-20 transition-all duration-300 ${activeTab === 2 ? 'text-green-400 bg-white/10 translate-y-[-4px]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}><List className="w-6 h-6 mb-1" strokeWidth={activeTab === 2 ? 3 : 2} /><span className="text-[10px] font-bold uppercase tracking-wide">Historial</span></button>
      </nav>
    </div>
  );
}