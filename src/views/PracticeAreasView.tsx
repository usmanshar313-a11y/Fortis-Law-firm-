import React, { useState } from 'react';
import { PageRoute, Language, PracticeArea } from '../types';
import { PRACTICE_AREAS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { Briefcase, ChevronDown, ChevronUp, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';

interface PracticeAreasViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
  selectedPracticeAreaId?: string;
  setSelectedPracticeArea?: (id: string) => void;
}

export const PracticeAreasView: React.FC<PracticeAreasViewProps> = ({
  setRoute,
  lang,
  selectedPracticeAreaId,
  setSelectedPracticeArea
}) => {
  const t = UI_STRINGS[lang];
  const [activeAreaId, setActiveAreaId] = useState<string>(
    selectedPracticeAreaId || PRACTICE_AREAS[0].id
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currentArea = PRACTICE_AREAS.find((a) => a.id === activeAreaId) || PRACTICE_AREAS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Comprehensive Practice Directorate</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] dark:text-white">
          {t.navPracticeAreas}
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73] max-w-2xl">
          From high-stakes Constitutional Supreme Court writs to cross-border M&A and private family asset distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Practice Area Selector */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="font-serif text-sm font-semibold text-[#1A1A1A] dark:text-white uppercase tracking-wider px-2 mb-3">
            Select Practice Sector
          </h3>
          <div className="space-y-1">
            {PRACTICE_AREAS.map((area) => {
              const isSelected = area.id === activeAreaId;
              return (
                <button
                  key={area.id}
                  onClick={() => {
                    setActiveAreaId(area.id);
                    if (setSelectedPracticeArea) setSelectedPracticeArea(area.id);
                    setOpenFaqIndex(0);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all text-xs sm:text-sm font-medium flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] border-[#1A1A1A] dark:border-white shadow-md'
                      : 'bg-white dark:bg-[#111111] text-[#1A1A1A] dark:text-[#F5F5F5] border-[#E5E5E5] dark:border-[#2C2C2E] hover:border-[#1A1A1A]'
                  }`}
                >
                  <span className="font-serif">{lang === 'en' ? area.title : area.titleUr}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : 'opacity-40'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Sector Detail & Tailored FAQs */}
        <div className="lg:col-span-8 space-y-8 card-modern p-6 sm:p-8 rounded-2xl">
          
          <div className="space-y-4 border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F5F5F5] dark:bg-[#2C2C2E] text-[#1A1A1A] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2C2C2E] text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-white" />
              <span>PRACTICE SECTOR #{currentArea.id.toUpperCase()}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] dark:text-white">
              {lang === 'en' ? currentArea.title : currentArea.titleUr}
            </h2>

            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
              {currentArea.fullDesc}
            </p>
          </div>

          {/* Key Services Offered */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-[#1A1A1A] dark:text-white uppercase tracking-wider">
              Core Legal Advisory Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentArea.keyServices.map((service, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-[#1A1A1A] dark:text-[#F5F5F5] bg-[#F5F5F5] dark:bg-[#111111] p-3.5 rounded-xl border border-[#E5E5E5] dark:border-[#2C2C2E]">
                  <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0 mt-0.5" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Area FAQ Accordion */}
          <div className="space-y-4 pt-4 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
            <h3 className="font-serif text-base font-bold text-[#1A1A1A] dark:text-white uppercase tracking-wider">
              Frequently Asked Questions (FAQs)
            </h3>

            <div className="space-y-2">
              {currentArea.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E5E5E5] dark:border-[#2C2C2E] rounded-xl overflow-hidden bg-[#F5F5F5] dark:bg-[#111111]"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1A1A] dark:text-white hover:underline transition-colors cursor-pointer"
                    >
                      <span>{lang === 'en' ? faq.question : faq.questionUr}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#1A1A1A] dark:text-white" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-3 pt-1 text-xs text-[#6E6E73] leading-relaxed border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
                        {lang === 'en' ? faq.answer : faq.answerUr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sector CTA */}
          <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#2C2C2E] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F5F5F5] dark:bg-[#111111] p-4 rounded-xl">
            <div>
              <span className="block text-xs font-bold text-[#1A1A1A] dark:text-white">Require Consultation in {currentArea.title}?</span>
              <span className="block text-[11px] text-[#6E6E73]">Schedule an appointment with our sector partner.</span>
            </div>

            <button
              onClick={() => setRoute('book-consultation')}
              className="btn-primary text-xs shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
