import React, { useState, useRef } from 'react';
import { Language, PageRoute } from '../types';
import { UI_STRINGS } from '../data/translations';
import { FIRM_INFO } from '../data/lawData';
import { Menu, X, Sun, Moon, Globe, Shield, Phone, Calendar, Search, ChevronDown } from 'lucide-react';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  currentRoute: PageRoute;
  setRoute: (route: PageRoute) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  setSelectedPracticeArea?: (id: string) => void;
  setSelectedAttorney?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  setRoute,
  lang,
  setLang,
  isDarkMode,
  setIsDarkMode,
  setSelectedPracticeArea,
  setSelectedAttorney
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const t = UI_STRINGS[lang];

  // Hidden admin entry point state
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAdminPortal = () => {
    setRoute('admin-login');
    try {
      window.history.pushState({}, '', '/admin-login.html');
    } catch (err) {}
  };

  const handleHiddenFClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 2) {
      clickCountRef.current = 0;
      triggerAdminPortal();
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
  };

  const handlePressStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      triggerAdminPortal();
    }, 1200);
  };

  const handlePressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const navItems: { label: string; route: PageRoute; hasDropdown?: boolean }[] = [
    { label: t.navHome, route: 'home' },
    { label: t.navPracticeAreas, route: 'practice-areas', hasDropdown: true },
    { label: t.navAttorneys, route: 'attorneys' },
    { label: t.navCaseResults, route: 'case-results' },
    { label: t.navTestimonials, route: 'testimonials' },
    { label: t.navInsights, route: 'insights' },
    { label: t.navCareers, route: 'careers' },
    { label: t.navFeeTransparency, route: 'fee-transparency' },
    { label: t.navContact, route: 'contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#E5E5E5] dark:border-[#2C2C2E] text-[#1A1A1A] dark:text-[#F5F5F5] transition-colors duration-200">
        {/* Top Utility Bar */}
        <div className="hidden lg:flex justify-between items-center px-8 py-2 text-xs bg-[#F5F5F5] dark:bg-[#111111] border-b border-[#E5E5E5] dark:border-[#2C2C2E] text-[#6E6E73]">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Shield className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-white" />
              <span>Advocates Supreme Court of Pakistan & High Courts</span>
            </span>
            <span>•</span>
            <span>Islamabad | Lahore | Karachi</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href={`tel:${FIRM_INFO.phone}`} className="flex items-center gap-1.5 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-white" />
              <span className="font-medium">{FIRM_INFO.phone}</span>
            </a>
            <a href={`mailto:${FIRM_INFO.email}`} className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
              {FIRM_INFO.email}
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo with Hidden Hotspot for Admin Login */}
          <div className="flex items-center space-x-3 select-none">
            {/* Logo Crest Container */}
            <div 
              onClick={(e) => {
                if (clickCountRef.current === 0) {
                  setRoute('home');
                }
              }}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              className="relative w-11 h-11 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] border border-[#1A1A1A] dark:border-white rounded-xl flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="text-xl font-serif font-bold tracking-tighter select-none">
                FL
              </span>

              {/* Invisible Hotspot explicitly wired over the crest */}
              <div 
                id="admin-logo-hotspot"
                onClick={handleHiddenFClick}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  triggerAdminPortal();
                }}
                className="absolute inset-0 z-30 opacity-0 pointer-events-auto"
                style={{ cursor: 'inherit' }}
                title=""
              />
            </div>

            <div onClick={() => setRoute('home')} className="cursor-pointer">
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-wider text-[#1A1A1A] dark:text-white">
                FORTIS LAW
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-[#6E6E73] uppercase">
                ASSOCIATES
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2 text-xs font-medium tracking-wide">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => setRoute(item.route)}
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] font-semibold'
                      : 'text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#1F1F21]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-3 h-3 opacity-70" />}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Search, Dark Mode, Language, Consultation Button */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E] text-[#1A1A1A] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#1F1F21] transition-colors"
              title="Search site (Practice areas, articles, lawyers...)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E] text-xs font-medium text-[#1A1A1A] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#1F1F21] transition-colors"
              title="Toggle Language (English / Urdu)"
            >
              <Globe className="w-3.5 h-3.5 text-[#6E6E73]" />
              <span className="uppercase">{lang === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="p-2.5 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E] text-[#1A1A1A] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#1F1F21] transition-colors"
              title="Toggle Light / Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Book Consultation Button (Apple Pill Button) */}
            <button
              onClick={() => setRoute('book-consultation')}
              className="btn-primary"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.navBookBtn}</span>
            </button>
          </div>

          {/* Mobile Controls & Hamburger Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E] text-[#1A1A1A] dark:text-white"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="p-2 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E] text-xs text-[#1A1A1A] dark:text-white"
            >
              {lang === 'en' ? 'اردو' : 'EN'}
            </button>

            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="p-2 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E] text-[#1A1A1A] dark:text-white"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#1A1A1A] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#1F1F21]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0D0D0D] border-b border-[#E5E5E5] dark:border-[#2C2C2E] px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => {
                    setRoute(item.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A]'
                      : 'text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#1F1F21]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
              <button
                onClick={() => {
                  setRoute('book-consultation');
                  setMobileMenuOpen(false);
                }}
                className="w-full btn-primary justify-center py-3"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.navBookBtn}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setRoute={setRoute}
        setSelectedPracticeArea={setSelectedPracticeArea}
        setSelectedAttorney={setSelectedAttorney}
      />
    </>
  );
};

