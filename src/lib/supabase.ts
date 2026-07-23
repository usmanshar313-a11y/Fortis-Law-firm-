import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = "https://umzpnqqkomydihwltocd.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_4AQtephIcvO4UWrRhP0y5Q_iUbjNZAj";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Booking {
  id?: string;
  created_at?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  practice_area: string;
  attorney_preferred?: string;
  booking_date: string;
  booking_time: string;
  case_description?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  admin_notes?: string;
}

export interface ContactSubmission {
  id?: string;
  created_at?: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status?: 'unread' | 'read' | 'replied';
}
