import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { ATTORNEYS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { Award, BookOpen, Scale, Calendar, Phone, Mail, Shield, CheckCircle2 } from 'lucide-react';

interface AttorneysViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
  setSelectedAttorney?: (id: string) => void;
}

export const AttorneysView: React.FC<AttorneysViewProps> = ({
  setRoute,
  lang,
  setSelectedAttorney
}) => {
  const t = UI_STRINGS[lang];
  const [filterPartner, setFilterPartner] = useState<'all' | 'partner' | 'associate'>('all');

  const filteredAttorneys = ATTORNEYS.filter((att) => {
    if (filterPartner === 'partner') return att.isPartner;
    if (filterPartner === 'associate') return !att.isPartner;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Partner Directorate</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] dark:text-white">
            {t.navAttorneys}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6E73]">
            Senior Advocates Supreme Court of Pakistan, Barristers-at-Law, and specialized appellate litigators.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 bg-[#F5F5F5] dark:bg-[#111111] p-1.5 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E] text-xs">
          <button
            onClick={() => setFilterPartner('all')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              filterPartner === 'all'
                ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] font-semibold'
                : 'text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            All Legal Panel ({ATTORNEYS.length})
          </button>
          <button
            onClick={() => setFilterPartner('partner')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              filterPartner === 'partner'
                ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] font-semibold'
                : 'text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            Partners ({ATTORNEYS.filter(a => a.isPartner).length})
          </button>
          <button
            onClick={() => setFilterPartner('associate')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              filterPartner === 'associate'
                ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] font-semibold'
                : 'text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white'
            }`}
          >
            Senior Associates
          </button>
        </div>
      </div>

      {/* Attorney Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredAttorneys.map((attorney) => (
          <div
            key={attorney.id}
            className="card-modern rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all"
          >
            {/* Left Photo & Badges */}
            <div className="sm:w-2/5 relative bg-gray-900 overflow-hidden shrink-0 min-h-[260px] rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
              <img
                src={attorney.imageUrl}
                alt={attorney.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden"></div>
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md text-[#1A1A1A] dark:text-white text-[10px] font-mono border border-[#E5E5E5] dark:border-[#2C2C2E]">
                  {attorney.licenseNumber}
                </span>
              </div>
            </div>

            {/* Right Profile Details */}
            <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-[#F5F5F5] bg-[#F5F5F5] dark:bg-[#2C2C2E] px-2.5 py-1 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E]">
                    {attorney.isPartner ? 'Senior Partner' : 'Senior Associate'}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#1A1A1A] dark:text-white">
                  {lang === 'en' ? attorney.name : attorney.nameUr}
                </h2>

                <p className="text-xs font-semibold text-[#6E6E73]">
                  {lang === 'en' ? attorney.title : attorney.titleUr}
                </p>

                <p className="text-xs text-[#6E6E73] leading-relaxed line-clamp-3">
                  {lang === 'en' ? attorney.bio : attorney.bioUr}
                </p>

                {/* Academic Admissions */}
                <div className="pt-2 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#6E6E73] block">
                    Academic Qualifications:
                  </span>
                  <ul className="text-[11px] text-[#1A1A1A] dark:text-[#F5F5F5] space-y-0.5">
                    {attorney.education.map((edu, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-[#1A1A1A] dark:text-white shrink-0" />
                        <span className="truncate">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bar Admissions */}
                <div className="pt-2 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#6E6E73] block">
                    Bar Admissions:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {attorney.barAdmissions.map((bar, idx) => (
                      <span key={idx} className="text-[10px] bg-[#F5F5F5] dark:bg-[#111111] text-[#1A1A1A] dark:text-[#F5F5F5] px-2.5 py-0.5 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E]">
                        {bar}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
                <button
                  onClick={() => {
                    if (setSelectedAttorney) setSelectedAttorney(attorney.id);
                    setRoute('book-consultation');
                  }}
                  className="w-full btn-primary text-xs justify-center cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.bookWithLawyer}</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
