import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { CAREER_POSITIONS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { Briefcase, MapPin, Clock, Send, CheckCircle2, Upload } from 'lucide-react';

interface CareersViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const CareersView: React.FC<CareersViewProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resumeName, setResumeName] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pqe: '',
    coverLetter: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setApplied(true);
      setFormData({ fullName: '', email: '', phone: '', pqe: '', coverLetter: '' });
      setResumeName('');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Recruitment & Associate Development</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] dark:text-white">
          Careers at Fortis
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          Join Pakistan's premier appellate litigation and cross-border corporate practice.
        </p>
      </div>

      {applied && (
        <div className="p-4 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Your associate application has been received by the Recruitment Directorate. We will contact shortlisted candidates.</span>
          </div>
          <button onClick={() => setApplied(false)} className="underline font-semibold cursor-pointer">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Open Positions List */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#1A1A1A] dark:text-white">
            Current Open Positions
          </h2>

          <div className="space-y-4">
            {CAREER_POSITIONS.map((pos) => (
              <div
                key={pos.id}
                className="card-modern p-6 rounded-2xl space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
                      {pos.title}
                    </h3>
                    <p className="text-xs text-[#6E6E73] font-semibold mt-0.5">
                      {pos.department}
                    </p>
                  </div>
                  <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#F5F5F5] dark:bg-[#2C2C2E] border border-[#E5E5E5] dark:border-[#2C2C2E] text-[#1A1A1A] dark:text-[#F5F5F5] text-xs font-mono">
                    {pos.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#6E6E73]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-white" />
                    {pos.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-white" />
                    {pos.experienceRequired}
                  </span>
                </div>

                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {pos.description}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-[#1A1A1A] dark:text-[#F5F5F5] block mb-1">
                    Key Prerequisites:
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-[#6E6E73] space-y-1">
                    {pos.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
                  <button
                    onClick={() => setSelectedPosition(pos.title)}
                    className="btn-primary text-xs cursor-pointer"
                  >
                    Apply for this Role
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-5 card-modern p-6 sm:p-8 rounded-2xl space-y-6 h-fit">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">
              Associate Candidate Application
            </h3>
            {selectedPosition && (
              <p className="text-xs text-[#6E6E73] font-medium mt-1">
                Applying for: {selectedPosition}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Barrister Ahmad Farooq"
                className="input-modern"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@law.com"
                  className="input-modern"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 0000000"
                  className="input-modern"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Years of PQE & Institution</label>
              <input
                type="text"
                value={formData.pqe}
                onChange={(e) => setFormData({ ...formData, pqe: e.target.value })}
                placeholder="e.g. 4 Years PQE, Oxford LL.B."
                className="input-modern"
              />
            </div>

            <div>
              <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Attach Resume / CV (PDF)</label>
              <div className="relative border-2 border-dashed border-[#E5E5E5] dark:border-[#2C2C2E] p-4 rounded-xl text-center hover:border-[#1A1A1A] transition-colors cursor-pointer bg-[#F5F5F5] dark:bg-[#111111]">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setResumeName(e.target.files[0].name);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-5 h-5 mx-auto text-[#1A1A1A] dark:text-white mb-1" />
                <span className="block text-[#6E6E73]">
                  {resumeName ? resumeName : 'Click or drag PDF CV here'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">Cover Letter & Statement of Interest</label>
              <textarea
                rows={4}
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                placeholder="Highlight appellate drafting experience or corporate transactional background..."
                className="input-modern"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-3 justify-center text-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Transmitting Application...' : 'Submit Application'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
