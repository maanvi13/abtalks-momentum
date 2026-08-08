import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoStateProvider } from './context/DemoStateContext';
import { TourProvider } from './context/TourContext';
import { MobileShell } from './components/layout/MobileShell';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { DemoSwitcher } from './components/layout/DemoSwitcher';
import { TourOverlay } from './components/tour/TourOverlay';
import { TourEndingModal } from './components/tour/TourEndingModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChallengePage } from './pages/ChallengePage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  return (
    <DemoStateProvider>
      <BrowserRouter>
        <TourProvider>
          <MobileShell>
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/day/:dayId" element={<ChallengePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <BottomNav />
            <DemoSwitcher />
            <TourOverlay />
            <TourEndingModal />
          </MobileShell>
        </TourProvider>
      </BrowserRouter>
    </DemoStateProvider>
  );
}

export default App;
