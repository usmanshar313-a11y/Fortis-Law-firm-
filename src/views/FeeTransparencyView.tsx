import React from 'react';
import { PageRoute, Language } from '../types';
import { UI_STRINGS } from '../data/translations';
import { Scale, CheckCircle2, ShieldCheck, DollarSign, Calendar, Lock } from 'lucide-react';

interface FeeTransparencyViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const FeeTransparencyView: React.FC<FeeTransparencyViewProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Billing Philosophy & Governance</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] dark:text-white">
          Fee Structure & Transparency
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73] max-w-2xl">
          Complete clarity in honorarium arrangements. We operate with structured engagement letters, capped hourly ceilings, and no hidden disbursements.
        </p>
      </div>

      {/* Fee Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Model 1: Initial Legal Consultation */}
        <div className="card-modern p-6 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
            Initial Strategy Consultation
          </h3>
          <p className="text-xs text-[#6E6E73] leading-relaxed">
            A structured 45 to 60-minute confidential conference with a Senior Partner or Senior Associate to review facts, evaluate High Court maintainability, and draft action blueprints.
          </p>
          <ul className="text-xs text-[#1A1A1A] dark:text-[#F5F5F5] space-y-2 pt-2 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
              <span>Flat Consultation Honorarium</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
              <span>Full Credit Applied toward Retainer</span>
            </li>
          </ul>
        </div>

        {/* Model 2: Fixed Fee Project Engagement */}
        <div className="card-modern p-6 rounded-2xl space-y-4 relative">
          <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] text-[10px] font-mono tracking-wider font-bold">
            MOST POPULAR FOR CORPORATES
          </span>
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
            Fixed-Fee Litigation & M&A
          </h3>
          <p className="text-xs text-[#6E6E73] leading-relaxed">
            Predictable milestone-based pricing for Writ Petitions, M&A due diligence, arbitration proceedings, and trademark registrations.
          </p>
          <ul className="text-xs text-[#1A1A1A] dark:text-[#F5F5F5] space-y-2 pt-2 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
              <span>No Unexpected Billing Overruns</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
              <span>Staged Milestone Payments</span>
            </li>
          </ul>
        </div>

        {/* Model 3: Annual Corporate Retainers */}
        <div className="card-modern p-6 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
            Annual General Counsel Retainer
          </h3>
          <p className="text-xs text-[#6E6E73] leading-relaxed">
            Comprehensive external general counsel services for financial institutions, multinationals, and tech enterprises with priority court appearances.
          </p>
          <ul className="text-xs text-[#1A1A1A] dark:text-[#F5F5F5] space-y-2 pt-2 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
              <span>Dedicated Partner Oversight</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
              <span>24/7 Regulatory Emergency Line</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Trust & Pro Bono Commitment Block */}
      <div className="card-modern p-8 rounded-2xl space-y-4 shadow-xl">
        <h3 className="font-serif text-xl font-bold text-[#1A1A1A] dark:text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#1A1A1A] dark:text-white" />
          <span>Pro Bono & Public Interest Commitment</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed max-w-3xl">
          Fortis Law Associates allocates at least 15% of total senior partner advocacy hours to pro bono constitutional public interest litigation, fundamental human rights protection, and legal aid for underprivileged citizens.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setRoute('book-consultation')}
            className="btn-primary text-xs cursor-pointer"
          >
            Request Engagement Quote
          </button>
        </div>
      </div>

    </div>
  );
};
