export type Language = 'en' | 'ur';

export type PageRoute = 
  | 'home'
  | 'practice-areas'
  | 'attorneys'
  | 'case-results'
  | 'testimonials'
  | 'insights'
  | 'careers'
  | 'fee-transparency'
  | 'contact'
  | 'privacy'
  | 'book-consultation'
  | 'admin-login'
  | 'admin-dashboard';

export interface FAQItem {
  question: string;
  questionUr?: string;
  answer: string;
  answerUr?: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  titleUr: string;
  shortDesc: string;
  shortDescUr: string;
  fullDesc: string;
  iconName: string;
  keyServices: string[];
  faqs: FAQItem[];
}

export interface Attorney {
  id: string;
  name: string;
  nameUr: string;
  title: string;
  titleUr: string;
  licenseNumber: string;
  email: string;
  phone: string;
  specialization: string;
  education: string[];
  barAdmissions: string[];
  notableCases: string[];
  bio: string;
  bioUr: string;
  imageUrl: string;
  isPartner: boolean;
}

export interface CaseResult {
  id: string;
  title: string;
  titleUr: string;
  practiceAreaId: string;
  practiceAreaName: string;
  clientType: string; // e.g. "Multinational Corporation", "Private Individual", "Commercial Bank"
  outcome: string;
  year: string;
  summary: string;
  summaryUr: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle?: string;
  practiceAreaId: string;
  practiceAreaName: string;
  rating: number;
  comment: string;
  commentUr: string;
  date: string;
  isVerified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  titleUr: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  hasLeadMagnet?: boolean;
  leadMagnetTitle?: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  location: string;
  type: string; // Full-time, Internship
  department: string;
  experienceRequired: string;
  description: string;
  requirements: string[];
}
