import { useState } from 'react';
import { useSpotifyData } from './hooks/useSpotifyData';
import { Login } from './components/Login';
import { MobileLayout } from './components/MobileLayout';
import { DesktopLayout } from './components/DesktopLayout';
import { useIsMobile } from './hooks/useIsMobile';

export default function SpotifyTracker() {
  const { user, members, payments, isLoading, addMember, removeMember, markAsPaid, undoPayment, deleteHistorical } = useSpotifyData();
  const [activeTab, setActiveTab] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const isMobile = useIsMobile();

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

  <p className="font-medium animate-pulse">Cargando...</p>
      </div >
    );
}

const commonProps = {
  user,
  members,
  payments,
  activeTab,
  setActiveTab,
  currentDate,
  changeMonth,
  selectSpecificMonth,
  addMember,
  removeMember,
  markAsPaid,
  undoPayment,
  deleteHistorical,
  isGuest,
  onLogout: handleLogout
};

return isMobile ? (
  <MobileLayout {...commonProps} />
) : (
  <DesktopLayout {...commonProps} />
);
}