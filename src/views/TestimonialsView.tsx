import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { TESTIMONIALS, PRACTICE_AREAS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { Star, CheckCircle, Quote } from 'lucide-react';

interface TestimonialsViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const filteredTestimonials = TESTIMONIALS.filter((item) => {
    if (selectedArea === 'all') return true;
    return item.practiceAreaId === selectedArea;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#3D261B]/40 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-[#5B3A29] font-bold">Client Affirmations & Feedback</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white">
          Client Testimonials
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-[#B8B8B8]">
          Verifiable recommendations from multinational executives, institutions, and private individuals.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={() => setSelectedArea('all')}
          className={`px-3 py-1.5 rounded transition-colors ${
            selectedArea === 'all'
              ? 'bg-[#5B3A29] text-white font-semibold'
              : 'bg-gray-100 dark:bg-[#151515] text-gray-600 dark:text-[#B8B8B8] hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          All Testimonials
        </button>
        {PRACTICE_AREAS.slice(0, 5).map((area) => (
          <button
            key={area.id}
            onClick={() => setSelectedArea(area.id)}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedArea === area.id
                ? 'bg-[#5B3A29] text-white font-semibold'
                : 'bg-gray-100 dark:bg-[#151515] text-gray-600 dark:text-[#B8B8B8] hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {lang === 'en' ? area.title : area.titleUr}
          </button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-[#2A2A2A] p-6 rounded-lg flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all relative"
          >
            <Quote className="w-8 h-8 text-[#5B3A29]/20 absolute top-4 right-4" />

            <div className="space-y-3">
              {/* Star Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-gray-700 dark:text-[#C7C7C7] italic leading-relaxed pt-2">
                "{lang === 'en' ? item.comment : item.commentUr}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-[#1F1F1F] flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span>{item.clientName}</span>
                  {item.isVerified && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" title="Verified Client" />
                  )}
                </h4>
                {item.clientTitle && (
                  <span className="text-[11px] text-gray-500 dark:text-[#8E8E8E] block">
                    {item.clientTitle}
                  </span>
                )}
              </div>

              <span className="text-[10px] text-gray-400 font-mono">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
