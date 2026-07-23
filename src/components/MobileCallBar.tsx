import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { FIRM_INFO } from '../data/lawData';
import { PageRoute } from '../types';

interface MobileCallBarProps {
  setRoute: (route: PageRoute) => void;
}

export const MobileCallBar: React.FC<MobileCallBarProps> = ({ setRoute }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0A0A0A]/95 backdrop-blur border-t border-[#3D261B] px-3 py-2 grid grid-cols-3 gap-2 text-white text-xs">
      {/* Call Direct */}
      <a
        href={`tel:${FIRM_INFO.phone}`}
        className="flex flex-col items-center justify-center py-1.5 px-2 bg-[#1A1A1A] rounded border border-[#2A2A2A] active:bg-[#252525]"
      >
        <Phone className="w-4 h-4 text-[#5B3A29] mb-1" />
        <span className="font-medium text-[10px]">Call Now</span>
      </a>

      {/* WhatsApp Advocate */}
      <a
        href={FIRM_INFO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center py-1.5 px-2 bg-[#1A382B] text-[#25D366] rounded border border-[#25D366]/30 active:bg-[#1A382B]/80"
      >
        <MessageSquare className="w-4 h-4 mb-1 fill-current" />
        <span className="font-semibold text-[10px]">WhatsApp</span>
      </a>

      {/* Book Consultation */}
      <button
        onClick={() => setRoute('book-consultation')}
        className="flex flex-col items-center justify-center py-1.5 px-2 bg-[#5B3A29] text-white rounded border border-[#6F4E37] active:bg-[#3D261B]"
      >
        <Calendar className="w-4 h-4 mb-1" />
        <span className="font-semibold text-[10px]">Book Consultation</span>
      </button>
    </div>
  );
};
