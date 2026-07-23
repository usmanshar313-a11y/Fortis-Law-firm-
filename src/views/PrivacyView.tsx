import React from 'react';
import { PageRoute, Language } from '../types';
import { UI_STRINGS } from '../data/translations';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';

interface PrivacyViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6 space-y-2 text-center sm:text-left">
        <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Statutory & Ethical Framework</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] dark:text-white">
          Privacy & Attorney-Client Confidentiality Statement
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          Last revised: June 2025 • Fortis Law Associates Directorate
        </p>
      </div>

      <div className="card-modern p-6 sm:p-10 rounded-2xl space-y-8 text-xs sm:text-sm leading-relaxed text-[#1A1A1A] dark:text-[#F5F5F5]">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2 text-[#1A1A1A] dark:text-white">
            <Lock className="w-5 h-5 shrink-0" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
              1. Absolute Attorney-Client Privilege Protection
            </h2>
          </div>
          <p className="text-[#6E6E73]">
            Under Article 9 of the Qanun-e-Shahadat Order 1984 and the Legal Practitioners and Bar Councils Act 1973, all oral communications, written notes, case pleadings, and electronic transmissions shared between a client and advocates of Fortis Law Associates are protected by strict statutory professional privilege.
          </p>
          <p className="text-[#6E6E73]">
            We never disclose client identities, consultation details, corporate transaction term sheets, or litigation strategies to third parties without express written consent or explicit court mandate.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
          <div className="flex items-center space-x-2 text-[#1A1A1A] dark:text-white">
            <Shield className="w-5 h-5 shrink-0" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
              2. Digital Data Handling & Supabase Infrastructure
            </h2>
          </div>
          <p className="text-[#6E6E73]">
            Information submitted via our Consultation Booking System and Contact Portals is transmitted over encrypted TLS 1.3 channels and stored in secure Supabase relational databases configured with Row Level Security (RLS) policies.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#6E6E73]">
            <li>Personal details (Name, Email, Phone, Case Description) are used solely for scheduling and conflict-of-interest screening.</li>
            <li>We do not sell, rent, or trade client telemetry or personal data to advertising networks.</li>
            <li>Database records are subject to strict administrative authorization and internal audit trails.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
          <div className="flex items-center space-x-2 text-[#1A1A1A] dark:text-white">
            <FileText className="w-5 h-5 shrink-0" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
              3. Conflict of Interest Verification Protocol
            </h2>
          </div>
          <p className="text-[#6E6E73]">
            Before accepting any litigation brief or corporate advisory mandate, our ethics committee performs a comprehensive conflict search across all active and past matter registries to ensure absolute allegiance to your legal interests.
          </p>
        </section>

        <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#2C2C2E] bg-[#F5F5F5] dark:bg-[#111111] p-4 rounded-xl text-xs text-[#6E6E73] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Questions regarding data protection or ethics compliance?</span>
          <button
            onClick={() => setRoute('contact')}
            className="btn-secondary text-xs cursor-pointer"
          >
            Contact Ethics Directorate
          </button>
        </div>

      </div>

    </div>
  );
};
