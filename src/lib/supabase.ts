import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = "https://umzpnqqkomydihwltocd.supabase.co";

export const SUPABASE_ANON_KEY =
  "sb_publishable_4AQtephIcvO4UWrRhP0y5Q_iUbjNZAj";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// ===============================
// SUPABASE AUTHENTICATION
// ===============================

export async function adminLogin(
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    console.error('Admin login failed:', error.message);

    return {
      success: false,
      error: error.message,
      user: null,
    };
  }

  return {
    success: true,
    error: null,
    user: data.user,
  };
}


export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(
      'Failed to get current user:',
      error.message
    );

    return null;
  }

  return user;
}


export async function adminLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(
      'Logout failed:',
      error.message
    );

    return false;
  }

  return true;
}


// ===============================
// LOCAL SESSION CHECK
// ===============================

export function isLocalAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem('fortis_admin_auth') === 'true';
  } catch {
    return false;
  }
}

export function setLocalAdminAuthenticated(
  status: boolean
): void {
  try {
    if (status) {
      sessionStorage.setItem(
        'fortis_admin_auth',
        'true'
      );
    } else {
      sessionStorage.removeItem(
        'fortis_admin_auth'
      );
    }
  } catch (err) {
    console.error(
      'Failed to set local admin auth state:',
      err
    );
  }
}


// ===============================
// BOOKING
// ===============================

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
  status:
    | 'pending'
    | 'confirmed'
    | 'completed'
    | 'cancelled';
  admin_notes?: string;
}


// ===============================
// CONTACT SUBMISSION
// ===============================

export interface ContactSubmission {
  id?: string;
  created_at?: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status?:
    | 'unread'
    | 'read'
    | 'replied';
}
