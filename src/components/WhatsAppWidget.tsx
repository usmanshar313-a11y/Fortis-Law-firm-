import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { FIRM_INFO } from '../data/lawData';

export const WhatsAppWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center group">
      {/* Tooltip */}
      <div className="mr-3 bg-[#0A0A0A] text-white text-xs py-1.5 px-3 rounded shadow-xl border border-[#5B3A29] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <span>Connect with Duty Advocate on WhatsApp</span>
      </div>

      {/* Floating Button */}
      <a
        href={FIRM_INFO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 border-2 border-white/20"
        aria-label="WhatsApp Advocate"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};
