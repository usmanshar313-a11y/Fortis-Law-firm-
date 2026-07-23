import React, { useState, useEffect } from 'react';
import { PageRoute, Language, CaseResult } from '../types';
import { CASE_RESULTS, PRACTICE_AREAS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { Search, Filter, Scale, CheckCircle2 } from 'lucide-react';

interface CaseResultsViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const CaseResultsView: React.FC<CaseResultsViewProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  // Debounce search input to avoid re-render jank (performance requirement)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredResults = CASE_RESULTS.filter((res) => {
    const matchesArea = selectedArea === 'all' || res.practiceAreaId === selectedArea;
    const matchesQuery =
      res.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      res.summary.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      res.clientType.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesArea && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Judicial Precedents & Victories</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] dark:text-white">
          Notable Case Results
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          Filter past judgments, High Court writs, and arbitral awards handled by Fortis Law Associates.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="card-modern p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="input-modern pl-9"
          />
        </div>

        {/* Practice Area Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs">
          <button
            onClick={() => setSelectedArea('all')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedArea === 'all'
                ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] font-semibold'
                : 'bg-[#F5F5F5] dark:bg-[#111111] text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white border border-[#E5E5E5] dark:border-[#2C2C2E]'
            }`}
          >
            All Practice Sectors
          </button>
          {PRACTICE_AREAS.slice(0, 5).map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedArea === area.id
                  ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] font-semibold'
                  : 'bg-[#F5F5F5] dark:bg-[#111111] text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white border border-[#E5E5E5] dark:border-[#2C2C2E]'
              }`}
            >
              {lang === 'en' ? area.title : area.titleUr}
            </button>
          ))}
        </div>

      </div>

      {/* Case Results List */}
      {filteredResults.length === 0 ? (
        <div className="text-center py-16 card-modern rounded-2xl text-[#6E6E73] text-xs">
          No case outcomes matching your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className="card-modern p-6 rounded-2xl flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#1A1A1A] dark:text-[#F5F5F5] bg-[#F5F5F5] dark:bg-[#2C2C2E] px-2.5 py-1 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E]">
                    {result.practiceAreaName}
                  </span>
                  <span className="font-mono text-[#6E6E73]">{result.year}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white leading-tight">
                  {lang === 'en' ? result.title : result.titleUr}
                </h3>

                <p className="text-xs font-mono text-[#6E6E73]">
                  Client: {result.clientType}
                </p>

                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {lang === 'en' ? result.summary : result.summaryUr}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
                <div className="flex items-center space-x-2 text-xs text-[#1A1A1A] dark:text-[#F5F5F5] font-semibold bg-[#F5F5F5] dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2C2C2E]">
                  <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
                  <span>{result.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
