import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { PRACTICE_AREAS, BLOG_POSTS, ATTORNEYS, CASE_RESULTS } from '../data/lawData';
import { Search, X, Briefcase, FileText, User, Award, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setRoute: (route: PageRoute) => void;
  setSelectedPracticeArea?: (id: string) => void;
  setSelectedAttorney?: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  setRoute,
  setSelectedPracticeArea,
  setSelectedAttorney
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'practices' | 'articles' | 'attorneys' | 'cases'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search Results Filtering
  const matchingPractices = PRACTICE_AREAS.filter(
    (p) => p.title.toLowerCase().includes(trimmed) || p.shortDesc.toLowerCase().includes(trimmed)
  );

  const matchingArticles = BLOG_POSTS.filter(
    (b) => b.title.toLowerCase().includes(trimmed) || b.summary.toLowerCase().includes(trimmed) || b.category.toLowerCase().includes(trimmed)
  );

  const matchingAttorneys = ATTORNEYS.filter(
    (a) => a.name.toLowerCase().includes(trimmed) || a.specialization.toLowerCase().includes(trimmed) || a.title.toLowerCase().includes(trimmed)
  );

  const matchingCases = CASE_RESULTS.filter(
    (c) => c.title.toLowerCase().includes(trimmed) || c.summary.toLowerCase().includes(trimmed) || c.practiceAreaName.toLowerCase().includes(trimmed)
  );

  const totalResults = matchingPractices.length + matchingArticles.length + matchingAttorneys.length + matchingCases.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2C2C2E] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-[#E5E5E5] dark:border-[#2C2C2E] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6E6E73] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practice areas, articles, attorneys, or cases..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1A1A1A] dark:text-[#F5F5F5] placeholder-[#6E6E73] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-[#F5F5F5]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F5F5] dark:bg-[#2C2C2E] text-[#1A1A1A] dark:text-[#F5F5F5] hover:opacity-80 transition-opacity"
          >
            Esc
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E5E5E5] dark:border-[#2C2C2E] overflow-x-auto text-xs">
          {[
            { id: 'all', label: `All (${trimmed ? totalResults : PRACTICE_AREAS.length + BLOG_POSTS.length + ATTORNEYS.length + CASE_RESULTS.length})` },
            { id: 'practices', label: `Practice Areas (${matchingPractices.length})` },
            { id: 'articles', label: `Articles (${matchingArticles.length})` },
            { id: 'attorneys', label: `Attorneys (${matchingAttorneys.length})` },
            { id: 'cases', label: `Case Results (${matchingCases.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A]'
                  : 'text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 text-xs sm:text-sm">
          {trimmed && totalResults === 0 ? (
            <div className="py-12 text-center text-[#6E6E73]">
              No legal resources or attorneys matched "{query}".
            </div>
          ) : (
            <>
              {/* Practice Areas */}
              {(activeTab === 'all' || activeTab === 'practices') && matchingPractices.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider px-1">
                    Practice Areas
                  </div>
                  {matchingPractices.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (setSelectedPracticeArea) setSelectedPracticeArea(p.id);
                        setRoute('practice-areas');
                        onClose();
                      }}
                      className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2C2C2E] hover:border-[#1A1A1A] dark:hover:border-white transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F5F5F5] dark:bg-[#2C2C2E] flex items-center justify-center text-[#1A1A1A] dark:text-[#F5F5F5]">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#1A1A1A] dark:text-[#F5F5F5] group-hover:underline">
                            {p.title}
                          </div>
                          <div className="text-xs text-[#6E6E73] line-clamp-1">{p.shortDesc}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#6E6E73] group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Articles / Insights */}
              {(activeTab === 'all' || activeTab === 'articles') && matchingArticles.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider px-1">
                    Insights & Articles
                  </div>
                  {matchingArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => {
                        setRoute('insights');
                        onClose();
                      }}
                      className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2C2C2E] hover:border-[#1A1A1A] dark:hover:border-white transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F5F5F5] dark:bg-[#2C2C2E] flex items-center justify-center text-[#1A1A1A] dark:text-[#F5F5F5]">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#1A1A1A] dark:text-[#F5F5F5] group-hover:underline">
                            {art.title}
                          </div>
                          <div className="text-xs text-[#6E6E73]">{art.category} • {art.author}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#6E6E73] group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Attorneys */}
              {(activeTab === 'all' || activeTab === 'attorneys') && matchingAttorneys.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider px-1">
                    Senior Advocates & Partners
                  </div>
                  {matchingAttorneys.map((att) => (
                    <div
                      key={att.id}
                      onClick={() => {
                        if (setSelectedAttorney) setSelectedAttorney(att.id);
                        setRoute('attorneys');
                        onClose();
                      }}
                      className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2C2C2E] hover:border-[#1A1A1A] dark:hover:border-white transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={att.imageUrl}
                          alt={att.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-[#1A1A1A] dark:text-[#F5F5F5] group-hover:underline">
                            {att.name}
                          </div>
                          <div className="text-xs text-[#6E6E73]">{att.title}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#6E6E73] group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Case Results */}
              {(activeTab === 'all' || activeTab === 'cases') && matchingCases.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider px-1">
                    Representative Case Results
                  </div>
                  {matchingCases.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setRoute('case-results');
                        onClose();
                      }}
                      className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2C2C2E] hover:border-[#1A1A1A] dark:hover:border-white transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F5F5F5] dark:bg-[#2C2C2E] flex items-center justify-center text-[#1A1A1A] dark:text-[#F5F5F5]">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#1A1A1A] dark:text-[#F5F5F5] group-hover:underline">
                            {c.title}
                          </div>
                          <div className="text-xs text-[#6E6E73]">{c.practiceAreaName} • {c.outcome}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#6E6E73] group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
