import React from 'react';
import { PageRoute, Language } from '../types';
import { FIRM_INFO, PRACTICE_AREAS, ATTORNEYS, CASE_RESULTS, LEAD_MAGNETS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { Shield, Scale, ArrowRight, Award, Calendar, FileText, Download, Briefcase } from 'lucide-react';

interface HomeViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
  setSelectedPracticeArea?: (id: string) => void;
  setSelectedAttorney?: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setRoute, lang, setSelectedPracticeArea, setSelectedAttorney }) => {
  const t = UI_STRINGS[lang];

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-white dark:bg-[#0D0D0D] text-[#1A1A1A] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2C2C2E] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="tagline flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#1A1A1A] dark:text-[#F5F5F5]" />
              <span>A TRADITION OF EXCELLENCE • ESTABLISHED 1998</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif text-[#1A1A1A] dark:text-[#F5F5F5] font-normal leading-[1.1] tracking-tight">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-[#6E6E73] max-w-xl font-sans font-normal leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setRoute('book-consultation')}
                className="btn-primary cursor-pointer shadow-sm hover:shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.bookConsultationNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setRoute('practice-areas')}
                className="btn-secondary cursor-pointer"
              >
                {t.explorePracticeAreas}
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image & Overlay Stats Bar */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E5E5E5] dark:border-[#2C2C2E] bg-[#F5F5F5] dark:bg-[#111111] min-h-[360px] lg:min-h-[440px] flex flex-col justify-end shadow-md">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000"
              alt="Fortis Law Directorate"
              className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-transparent to-transparent"></div>

            {/* Stats Bar Overlay */}
            <div className="relative z-10 bg-white/90 dark:bg-[#0D0D0D]/90 backdrop-blur-md p-5 border-t border-[#E5E5E5] dark:border-[#2C2C2E] grid grid-cols-3 gap-2 text-center rounded-b-2xl">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] dark:text-white">{FIRM_INFO.yearsActive}</span>
                <span className="block text-[10px] uppercase tracking-[0.1em] font-bold text-[#6E6E73]">{t.yearsActive}</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] dark:text-white">{FIRM_INFO.casesHandled}</span>
                <span className="block text-[10px] uppercase tracking-[0.1em] font-bold text-[#6E6E73]">{t.casesHandled}</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] dark:text-white">{FIRM_INFO.successRate}</span>
                <span className="block text-[10px] uppercase tracking-[0.1em] font-bold text-[#6E6E73]">{t.successRate}</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. TRUST BAR & DIRECTORY BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2C2C2E] rounded-2xl p-6 flex flex-wrap items-center justify-around gap-6 text-center text-xs text-[#6E6E73]">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#1A1A1A] dark:text-white" />
            <span className="font-semibold text-[#1A1A1A] dark:text-white">Chambers & Partners Recommended 2025</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#1A1A1A] dark:text-white" />
            <span className="font-semibold text-[#1A1A1A] dark:text-white">Legal 500 Asia Pacific Top Tier Law Firm</span>
          </div>
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-[#1A1A1A] dark:text-white" />
            <span className="font-semibold text-[#1A1A1A] dark:text-white">Pakistan Bar Council Senior Advocates</span>
          </div>
        </div>
      </section>


      {/* 3. PRACTICE AREAS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Legal Practice Directorate</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A] dark:text-white mt-1">
              Core Specialized Practice Areas
            </h2>
          </div>
          <button
            onClick={() => setRoute('practice-areas')}
            className="text-xs font-semibold text-[#1A1A1A] dark:text-white hover:underline flex items-center space-x-1 uppercase tracking-wider cursor-pointer"
          >
            <span>View All Practice Areas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRACTICE_AREAS.slice(0, 4).map((area) => (
            <div
              key={area.id}
              onClick={() => {
                if (setSelectedPracticeArea) setSelectedPracticeArea(area.id);
                setRoute('practice-areas');
              }}
              className="area-card group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F5] dark:bg-[#2C2C2E] flex items-center justify-center text-[#1A1A1A] dark:text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-normal text-[#1A1A1A] dark:text-white group-hover:underline transition-all">
                  {lang === 'en' ? area.title : area.titleUr}
                </h3>
                <p className="text-xs text-[#6E6E73] leading-relaxed line-clamp-3">
                  {lang === 'en' ? area.shortDesc : area.shortDescUr}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5E5E5] dark:border-[#2C2C2E] flex items-center justify-between text-xs font-semibold text-[#1A1A1A] dark:text-white">
                <span>View Details & FAQs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 4. SENIOR ATTORNEYS SPOTLIGHT */}
      <section className="bg-[#F5F5F5] dark:bg-[#111111] text-[#1A1A1A] dark:text-white py-16 border-y border-[#E5E5E5] dark:border-[#2C2C2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Leadership Panel</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A] dark:text-white">
              Distinguished Legal Advocates
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73]">
              Our partners bring decades of appellate experience, international education from Oxford and Harvard, and precedent-setting judicial victories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATTORNEYS.map((attorney) => (
              <div
                key={attorney.id}
                className="card-modern overflow-hidden flex flex-col justify-between group transition-all"
              >
                <div className="relative h-64 overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800">
                  <img
                    src={attorney.imageUrl}
                    alt={attorney.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md text-[10px] font-mono text-[#1A1A1A] dark:text-white border border-[#E5E5E5] dark:border-[#2C2C2E]">
                      {attorney.licenseNumber}
                    </span>
                  </div>
                </div>

                <div className="pt-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
                      {lang === 'en' ? attorney.name : attorney.nameUr}
                    </h3>
                    <p className="text-xs text-[#6E6E73] font-semibold mt-0.5">
                      {lang === 'en' ? attorney.title : attorney.titleUr}
                    </p>
                    <p className="text-xs text-[#6E6E73] mt-2 line-clamp-2">
                      {attorney.specialization}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
                    <button
                      onClick={() => {
                        if (setSelectedAttorney) setSelectedAttorney(attorney.id);
                        setRoute('book-consultation');
                      }}
                      className="w-full btn-secondary text-xs py-2 justify-center"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t.bookWithLawyer}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setRoute('attorneys')}
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] dark:text-white hover:underline transition-all cursor-pointer"
            >
              <span>View Full Profiles & Academic Admissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>


      {/* 5. CASE RESULTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Judicial Record</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A] dark:text-white mt-1">
              Precedent-Setting Case Victories
            </h2>
          </div>
          <button
            onClick={() => setRoute('case-results')}
            className="text-xs font-semibold text-[#1A1A1A] dark:text-white hover:underline flex items-center space-x-1 uppercase tracking-wider cursor-pointer"
          >
            <span>Browse All Case Results</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_RESULTS.slice(0, 3).map((res) => (
            <div
              key={res.id}
              className="card-modern space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6E6E73] font-medium">
                  <span>{res.practiceAreaName}</span>
                  <span className="font-mono text-[#6E6E73]">{res.year}</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A1A1A] dark:text-white leading-snug">
                  {lang === 'en' ? res.title : res.titleUr}
                </h3>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {lang === 'en' ? res.summary : res.summaryUr}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
                <span className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] dark:bg-[#2C2C2E] text-[#1A1A1A] dark:text-[#F5F5F5] text-xs font-semibold border border-[#E5E5E5] dark:border-[#2C2C2E]">
                  {res.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 6. LEAD MAGNET DOWNLOAD BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A] text-white dark:bg-[#111111] border border-[#1A1A1A] dark:border-[#2C2C2E] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6E6E73] uppercase tracking-wider">
              <FileText className="w-4 h-4 text-white" />
              <span>Free Lead Magnet Guide</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {LEAD_MAGNETS[0].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#B8B8B8] leading-relaxed">
              {LEAD_MAGNETS[0].description}
            </p>
          </div>

          <button
            onClick={() => setRoute('insights')}
            className="shrink-0 btn-primary bg-white text-[#1A1A1A] hover:bg-[#F5F5F5] dark:bg-white dark:text-[#1A1A1A] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Guide</span>
          </button>
        </div>
      </section>

    </div>
  );
};

