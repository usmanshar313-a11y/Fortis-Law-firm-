import React, { useState, useEffect } from 'react';
import { PageRoute, Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { MobileCallBar } from './components/MobileCallBar';

import { HomeView } from './views/HomeView';
import { PracticeAreasView } from './views/PracticeAreasView';
import { AttorneysView } from './views/AttorneysView';
import { CaseResultsView } from './views/CaseResultsView';
import { TestimonialsView } from './views/TestimonialsView';
import { InsightsView } from './views/InsightsView';
import { CareersView } from './views/CareersView';
import { FeeTransparencyView } from './views/FeeTransparencyView';
import { ContactView } from './views/ContactView';
import { PrivacyView } from './views/PrivacyView';
import { ConsultationView } from './views/ConsultationView';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminDashboardView } from './views/AdminDashboardView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [lang, setLang] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Selected state passed to booking view when user clicks "Book with Attorney" or "Select Sector"
  const [selectedPracticeAreaId, setSelectedPracticeAreaId] = useState<string | undefined>();
  const [selectedAttorneyId, setSelectedAttorneyId] = useState<string | undefined>();

  // Dark Mode Toggle Class Sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync route with URL path / window location
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('admin-login')) {
      setCurrentRoute('admin-login');
    } else if (path.includes('admin-dashboard')) {
      setCurrentRoute('admin-dashboard');
    }
  }, []);

  const handleSetRoute = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update path silently for admin routes
    if (route === 'admin-login') {
      window.history.pushState({}, '', '/admin-login');
    } else if (route === 'admin-dashboard') {
      window.history.pushState({}, '', '/admin-dashboard');
    } else {
      if (window.location.pathname.includes('admin')) {
        window.history.pushState({}, '', '/');
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDarkMode ? 'bg-[#0D0D0D] text-[#F5F5F5]' : 'bg-[#FFFFFF] text-[#1A1A1A]'}`}>
      
      {/* Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        setRoute={handleSetRoute}
        lang={lang}
        setLang={setLang}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setSelectedPracticeArea={setSelectedPracticeAreaId}
        setSelectedAttorney={setSelectedAttorneyId}
      />

      {/* Main Content Render Area */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomeView
            setRoute={handleSetRoute}
            lang={lang}
            setSelectedPracticeArea={setSelectedPracticeAreaId}
            setSelectedAttorney={setSelectedAttorneyId}
          />
        )}

        {currentRoute === 'practice-areas' && (
          <PracticeAreasView
            setRoute={handleSetRoute}
            lang={lang}
            selectedPracticeAreaId={selectedPracticeAreaId}
            setSelectedPracticeArea={setSelectedPracticeAreaId}
          />
        )}

        {currentRoute === 'attorneys' && (
          <AttorneysView
            setRoute={handleSetRoute}
            lang={lang}
            setSelectedAttorney={setSelectedAttorneyId}
          />
        )}

        {currentRoute === 'case-results' && (
          <CaseResultsView setRoute={handleSetRoute} lang={lang} />
        )}

        {currentRoute === 'testimonials' && (
          <TestimonialsView setRoute={handleSetRoute} lang={lang} />
        )}

        {currentRoute === 'insights' && (
          <InsightsView setRoute={handleSetRoute} lang={lang} />
        )}

        {currentRoute === 'careers' && (
          <CareersView setRoute={handleSetRoute} lang={lang} />
        )}

        {currentRoute === 'fee-transparency' && (
          <FeeTransparencyView setRoute={handleSetRoute} lang={lang} />
        )}

        {currentRoute === 'contact' && (
          <ContactView setRoute={handleSetRoute} lang={lang} />
        )}

        {currentRoute === 'privacy' && (
          <PrivacyView setRoute={handleSetRoute} lang={lang} />
        )}

        {currentRoute === 'book-consultation' && (
          <ConsultationView
            setRoute={handleSetRoute}
            lang={lang}
            selectedPracticeAreaId={selectedPracticeAreaId}
            selectedAttorneyId={selectedAttorneyId}
          />
        )}

        {currentRoute === 'admin-login' && (
          <AdminLoginView
            setRoute={handleSetRoute}
            lang={lang}
            onLoginSuccess={() => handleSetRoute('admin-dashboard')}
          />
        )}

        {currentRoute === 'admin-dashboard' && (
          <AdminDashboardView setRoute={handleSetRoute} lang={lang} />
        )}
      </main>

      {/* Sticky Widgets */}
      <WhatsAppWidget />
      <MobileCallBar setRoute={handleSetRoute} />

      {/* Global Footer */}
      <Footer setRoute={handleSetRoute} lang={lang} />

    </div>
  );
}
