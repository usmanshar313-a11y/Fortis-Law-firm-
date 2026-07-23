import React from 'react';
import { PageRoute, Language } from '../types';
import { FIRM_INFO, OFFICE_LOCATIONS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];

  return (
    <footer className="bg-[#0D0D0D] text-[#F5F5F5] border-t border-[#2C2C2E] text-sm">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        {/* Column 1: Firm Overview */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setRoute('home')}>
            <div className="w-10 h-10 bg-white text-[#1A1A1A] border border-white rounded-xl flex items-center justify-center font-serif font-bold text-lg">
              FL
            </div>
            <div>
              <span className="block font-serif text-lg font-bold text-white tracking-wider">
                FORTIS LAW
              </span>
              <span className="block text-[9px] tracking-[0.2em] text-[#6E6E73] uppercase">
                ASSOCIATES
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-[#6E6E73]">
            {FIRM_INFO.tagline}
          </p>

          <div className="pt-2 text-xs space-y-1 text-[#6E6E73]">
            <p className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-white" />
              <span>Advocates Supreme Court of Pakistan</span>
            </p>
            <p>Pakistan Bar Council Enrolment Senior-04812</p>
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div className="space-y-3">
          <h3 className="font-serif text-xs font-semibold uppercase tracking-wider text-white border-b border-[#2C2C2E] pb-2">
            Practice Directorate
          </h3>
          <ul className="space-y-2 text-xs text-[#6E6E73]">
            <li>
              <button onClick={() => setRoute('practice-areas')} className="hover:text-white transition-colors">
                Corporate & Mergers (M&A)
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('practice-areas')} className="hover:text-white transition-colors">
                Constitutional & Public Law Writs
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('practice-areas')} className="hover:text-white transition-colors">
                Banking Finance & Islamic Sukuk
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('practice-areas')} className="hover:text-white transition-colors">
                White-Collar NAB & FIA Defense
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('practice-areas')} className="hover:text-white transition-colors">
                Intellectual Property & Brands
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('practice-areas')} className="hover:text-white transition-colors">
                Overseas Family & Estate Partition
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Firm Links & Resources */}
        <div className="space-y-3">
          <h3 className="font-serif text-xs font-semibold uppercase tracking-wider text-white border-b border-[#2C2C2E] pb-2">
            Client Navigation
          </h3>
          <ul className="space-y-2 text-xs text-[#6E6E73]">
            <li>
              <button onClick={() => setRoute('attorneys')} className="hover:text-white transition-colors">
                Our Senior Partners & Advocates
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('case-results')} className="hover:text-white transition-colors">
                Noteworthy Case Outcomes
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('fee-transparency')} className="hover:text-white transition-colors">
                Fee Structure & Transparency
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('insights')} className="hover:text-white transition-colors">
                Legal Insights & Guides (PDFs)
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('careers')} className="hover:text-white transition-colors">
                Careers & Associate Recruitment
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('privacy')} className="hover:text-white transition-colors">
                Attorney-Client Privacy Statement
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Main Office */}
        <div className="space-y-3">
          <h3 className="font-serif text-xs font-semibold uppercase tracking-wider text-white border-b border-[#2C2C2E] pb-2">
            Head Directorate
          </h3>
          <div className="space-y-2 text-xs text-[#6E6E73]">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <span>{OFFICE_LOCATIONS[0].address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white shrink-0" />
              <a href={`tel:${FIRM_INFO.phone}`} className="hover:text-white">
                {FIRM_INFO.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white shrink-0" />
              <a href={`mailto:${FIRM_INFO.email}`} className="hover:text-white">
                {FIRM_INFO.email}
              </a>
            </p>
            <div className="pt-2">
              <button
                onClick={() => setRoute('book-consultation')}
                className="w-full btn-primary text-xs py-2.5"
              >
                Schedule Legal Consultation
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Disclaimer & Credit Line */}
      <div className="border-t border-[#2C2C2E] bg-[#000000] py-6 px-4 sm:px-6 lg:px-8 text-xs text-[#6E6E73]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} FORTIS LAW ASSOCIATES. All Rights Reserved. Professional Legal Representation.
          </p>

          {/* Mandatory Footer Credit Line */}
          <div className="text-center md:text-right font-medium text-[#F5F5F5] border border-[#2C2C2E] px-3.5 py-1.5 rounded-full bg-[#111111]">
            <span>{FIRM_INFO.developedBy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

