import React, { useState } from 'react';
import { PageRoute, Language, BlogPost } from '../types';
import { BLOG_POSTS, LEAD_MAGNETS } from '../data/lawData';
import { UI_STRINGS } from '../data/translations';
import { Search, FileText, Download, Clock, User, X, Check } from 'lucide-react';

interface InsightsViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];
  const [search, setSearch] = useState('');
  const [downloadingGuide, setDownloadingGuide] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredPosts = BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (guideTitle: string) => {
    setDownloadingGuide(guideTitle);
    setTimeout(() => {
      setDownloadingGuide(null);
      setDownloadSuccess(guideTitle);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.15em] text-[#6E6E73] font-bold">Legal Analysis & Publications</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] dark:text-white">
          Insights & Guides
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          Authoritative legal articles and complimentary downloadable PDF guides for clients.
        </p>
      </div>

      {/* Download Success Toast Notification */}
      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Success! <strong>{downloadSuccess}</strong> has been downloaded to your device.</span>
          </div>
          <button onClick={() => setDownloadSuccess(null)} className="p-1 hover:opacity-75 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Lead Magnets Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Search & Blog Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search legal publications, precedents, or guides..."
              className="input-modern pl-9"
            />
          </div>

          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="card-modern p-6 rounded-2xl space-y-4 transition-all"
              >
                <div className="flex items-center justify-between text-xs text-[#1A1A1A] dark:text-[#F5F5F5]">
                  <span className="font-semibold uppercase tracking-wider bg-[#F5F5F5] dark:bg-[#2C2C2E] px-2.5 py-1 rounded-full border border-[#E5E5E5] dark:border-[#2C2C2E]">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-3 text-[#6E6E73] font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#1A1A1A] dark:text-white">
                  {lang === 'en' ? post.title : post.titleUr}
                </h2>

                <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                  {post.content}
                </p>

                <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2C2C2E] flex items-center justify-between">
                  <span className="text-xs text-[#6E6E73] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-white" />
                    {post.author}
                  </span>

                  {post.hasLeadMagnet && (
                    <button
                      onClick={() => handleDownload(post.leadMagnetTitle || 'Legal Guide')}
                      disabled={downloadingGuide === post.leadMagnetTitle}
                      className="btn-primary text-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadingGuide === post.leadMagnetTitle ? 'Downloading...' : 'Download PDF Guide'}</span>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Lead Magnet Downloads Sidebar */}
        <div className="space-y-6">
          <div className="card-modern p-6 rounded-2xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-3">
              <FileText className="w-5 h-5 text-[#1A1A1A] dark:text-white" />
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white">Client Legal Guides</h3>
            </div>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Download complimentary, action-oriented legal checklists and statutory guides authored by senior associates.
            </p>

            <div className="space-y-4 pt-2">
              {LEAD_MAGNETS.map((lm) => (
                <div
                  key={lm.id}
                  className="bg-[#F5F5F5] dark:bg-[#111111] p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2C2C2E] space-y-2.5"
                >
                  <h4 className="font-serif text-xs font-bold text-[#1A1A1A] dark:text-white leading-snug">
                    {lm.title}
                  </h4>
                  <p className="text-[11px] text-[#6E6E73] leading-relaxed">
                    {lm.description}
                  </p>
                  <button
                    onClick={() => handleDownload(lm.title)}
                    disabled={downloadingGuide === lm.title}
                    className="w-full btn-primary text-xs justify-center cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingGuide === lm.title ? 'Generating PDF...' : 'Download PDF'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
