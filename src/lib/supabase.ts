import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = "https://umzpnqqkomydihwltocd.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_4AQtephIcvO4UWrRhP0y5Q_iUbjNZAj";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Default Admin Credentials
export const DEFAULT_ADMIN_CREDENTIALS = {
  email: "excuses.heckles.94@icloud.com",
  password: "Sd2-@3cd-eas(*&8mss_s0"
};

const CUSTOM_ADMIN_KEY = 'fortis_custom_admin_creds';

export function getAdminCredentials(): { email: string; password: string } {
  try {
    const stored = localStorage.getItem(CUSTOM_ADMIN_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email && parsed.password) {
        return {
          email: parsed.email.trim().toLowerCase(),
          password: parsed.password
        };
      }
    }
  } catch (err) {
    console.error('Failed to read custom admin credentials:', err);
  }
  return {
    email: DEFAULT_ADMIN_CREDENTIALS.email.toLowerCase(),
    password: DEFAULT_ADMIN_CREDENTIALS.password
  };
}

export function saveAdminCredentials(email: string, password: string): void {
  try {
    localStorage.setItem(CUSTOM_ADMIN_KEY, JSON.stringify({
      email: email.trim().toLowerCase(),
      password: password
    }));
  } catch (err) {
    console.error('Failed to save custom admin credentials:', err);
  }
}

export function isLocalAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem('fortis_admin_auth') === 'true';
  } catch {
    return false;
  }
}

export function setLocalAdminAuthenticated(status: boolean): void {
  try {
    if (status) {
      sessionStorage.setItem('fortis_admin_auth', 'true');
    } else {
      sessionStorage.removeItem('fortis_admin_auth');
    }
  } catch (err) {
    console.error('Failed to set local admin auth state:', err);
  }
}

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

const LOCAL_BOOKINGS_KEY = 'fortis_local_bookings';

export function getLocalBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to get local bookings:', err);
    return [];
  }
}

export function saveLocalBooking(booking: Booking): Booking {
  try {
    const current = getLocalBookings();
    const finalBooking: Booking = {
      ...booking,
      id: booking.id || `bk_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      created_at: booking.created_at || new Date().toISOString()
    };

    const existsIndex = current.findIndex(b => b.id === finalBooking.id);
    if (existsIndex >= 0) {
      current[existsIndex] = { ...current[existsIndex], ...finalBooking };
    } else {
      current.unshift(finalBooking);
    }

    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(current));
    return finalBooking;
  } catch (err) {
    console.error('Failed to save local booking:', err);
    return booking;
  }
}

export function updateLocalBookingStatus(id: string, status: Booking['status'], adminNotes?: string): void {
  try {
    const current = getLocalBookings();
    const updated = current.map(b => (b.id === id ? { ...b, status, admin_notes: adminNotes ?? b.admin_notes } : b));
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update local booking:', err);
  }
}

export function deleteLocalBooking(id: string): void {
  try {
    const current = getLocalBookings();
    const filtered = current.filter(b => b.id !== id);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete local booking:', err);
  }
}

