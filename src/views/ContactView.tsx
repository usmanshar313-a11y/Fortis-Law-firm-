import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { FIRM_INFO, OFFICE_LOCATIONS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];
  const [selectedCity, setSelectedCity] = useState(OFFICE_LOCATIONS[0].city);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [contactData, setContactData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setContactData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    }, 1000);
  };

  const activeOffice = OFFICE_LOCATIONS.find((o) => o.city === selectedCity) || OFFICE_LOCATIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Global & Regional Offices</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] dark:text-white">
          Contact Directorate
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          Engage with our legal counsel across Islamabad, Lahore, and Karachi or dispatch an official inquiry.
        </p>
      </div>

      {formSubmitted && (
        <div className="p-4 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Thank you. Your message has been logged with Fortis Registry. A duty advocate will respond shortly.</span>
          </div>
          <button onClick={() => setFormSubmitted(false)} className="underline font-semibold cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Main Grid: Office Tabs & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Locations & Interactive Map View */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Office Selector Tabs */}
          <div className="flex space-x-2 border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-2 text-xs">
            {OFFICE_LOCATIONS.map((loc) => (
              <button
                key={loc.city}
                onClick={() => setSelectedCity(loc.city)}
                className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                  selectedCity === loc.city
                    ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A]'
                    : 'text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white bg-[#F5F5F5] dark:bg-[#111111]'
                }`}
              >
                {loc.city}
              </button>
            ))}
          </div>

          {/* Office Detail Card */}
          <div className="card-modern p-6 rounded-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] dark:text-white">
              {activeOffice.city}
            </h3>

            <div className="space-y-3 text-xs text-[#6E6E73]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0 mt-0.5" />
                <span className="text-[#1A1A1A] dark:text-[#F5F5F5]">{activeOffice.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
                <a href={`tel:${activeOffice.phone}`} className="hover:underline text-[#1A1A1A] dark:text-[#F5F5F5]">
                  {activeOffice.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
                <a href={`mailto:${activeOffice.email}`} className="hover:underline text-[#1A1A1A] dark:text-[#F5F5F5]">
                  {activeOffice.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-[#6E6E73]">
                <Clock className="w-4 h-4 text-[#1A1A1A] dark:text-white shrink-0" />
                <span>{activeOffice.hours}</span>
              </p>
            </div>

            {/* Simulated Interactive Map Viewer */}
            <div className="h-56 rounded-2xl border border-[#E5E5E5] dark:border-[#2C2C2E] bg-[#111111] overflow-hidden relative flex items-center justify-center text-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#2C2C2E_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <div className="relative z-10 space-y-2">
                <MapPin className="w-8 h-8 text-white mx-auto animate-bounce" />
                <span className="font-serif font-bold text-white text-sm block">
                  Fortis Directorate - {activeOffice.city}
                </span>
                <span className="text-[11px] text-[#6E6E73] block">
                  {activeOffice.address}
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeOffice.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-1.5 rounded-full bg-white text-black text-[10px] font-semibold tracking-wider hover:bg-[#E5E5E5] transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-2">
              <a
                href={FIRM_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary py-3 justify-center text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Urgent Legal Inquiry on WhatsApp (+92 308 0291021)</span>
              </a>
            </div>

          </div>

        </div>

        {/* Right Col: Inquiry Submission Form */}
        <div className="lg:col-span-6 card-modern p-6 sm:p-8 rounded-2xl space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] dark:text-white">
              Dispatch Written Inquiry
            </h3>
            <p className="text-xs text-[#6E6E73] mt-1">
              All communications are strictly protected under Attorney-Client Confidentiality Privilege.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={contactData.fullName}
                onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                placeholder="e.g. CEO Tariq Aziz"
                className="input-modern"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="input-modern"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  placeholder="+92 308 0291021"
                  className="input-modern"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Subject Matter</label>
              <input
                type="text"
                value={contactData.subject}
                onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                placeholder="e.g. High Court Writ Consultation or Cross-Border Merger"
                className="input-modern"
              />
            </div>

            <div>
              <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Inquiry / Statement of Case *</label>
              <textarea
                rows={5}
                required
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                placeholder="Briefly describe the legal circumstances or regulatory notice received..."
                className="input-modern"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-3 justify-center text-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Transmitting Inquiry...' : 'Dispatch Confidential Message'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
