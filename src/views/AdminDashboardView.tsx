import React, { useState, useEffect } from 'react';
import { PageRoute, Language } from '../types';
import { supabase, Booking } from '../lib/supabase';
import { UI_STRINGS } from '../data/translations';
import { Shield, Lock, Calendar, CheckCircle2, Clock, XCircle, Trash2, Edit3, LogOut, RefreshCw, Search, Users, AlertCircle } from 'lucide-react';

interface AdminDashboardViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ setRoute, lang }) => {
  const t = UI_STRINGS[lang];

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState<string>('');
  const [authVerified, setAuthVerified] = useState<boolean>(false);

  // Check Supabase Auth Session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Redirect if not authenticated
        setRoute('admin-login');
      } else {
        setAuthVerified(true);
        fetchBookings();
      }
    };
    checkSession();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching bookings from Supabase:', error.message);
        // Resilient fallback state
        setBookings([]);
      } else if (data) {
        setBookings(data as Booking[]);
      }
    } catch (err) {
      console.error('Fetch bookings exception:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string | undefined, newStatus: Booking['status']) => {
    if (!id) return;
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus, admin_notes: adminNotesInput })
        .eq('id', id);

      if (error) {
        console.error('Error updating booking:', error.message);
      }

      // Local update for instant UI feedback
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus, admin_notes: adminNotesInput } : b))
      );
      setSelectedBooking(null);
      setAdminNotesInput('');
    } catch (err) {
      console.error('Update status exception:', err);
    }
  };

  const handleDeleteBooking = async (id: string | undefined) => {
    if (!id || !window.confirm('Are you sure you want to delete this booking record?')) return;
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (!error) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error('Delete booking exception:', err);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setRoute('admin-login');
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch =
      b.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.client_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.client_phone.includes(searchTerm) ||
      b.practice_area.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;

  if (!authVerified && loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xs text-[#B8B8B8]">
        <span>Verifying Security Session...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="card-modern p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-[#1A1A1A] dark:text-white">
              FORTIS LEGAL DIRECTORATE • ADMIN DASHBOARD
            </h1>
            <p className="text-xs text-[#6E6E73]">
              Protected Calendar & Consultation Registry (Supabase RLS Enforced)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchBookings}
            className="px-3.5 py-2 rounded-full bg-[#F5F5F5] dark:bg-[#111111] hover:bg-[#E5E5E5] dark:hover:bg-[#2C2C2E] border border-[#E5E5E5] dark:border-[#2C2C2E] text-xs text-[#1A1A1A] dark:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-modern p-4 rounded-2xl space-y-1">
          <span className="text-[11px] font-mono text-[#6E6E73] uppercase block">Total Bookings</span>
          <span className="font-serif text-2xl font-bold text-[#1A1A1A] dark:text-white">{totalBookings}</span>
        </div>

        <div className="card-modern p-4 rounded-2xl space-y-1">
          <span className="text-[11px] font-mono text-[#6E6E73] uppercase block">Pending Review</span>
          <span className="font-serif text-2xl font-bold text-[#1A1A1A] dark:text-white">{pendingCount}</span>
        </div>

        <div className="card-modern p-4 rounded-2xl space-y-1">
          <span className="text-[11px] font-mono text-[#6E6E73] uppercase block">Confirmed</span>
          <span className="font-serif text-2xl font-bold text-[#1A1A1A] dark:text-white">{confirmedCount}</span>
        </div>

        <div className="card-modern p-4 rounded-2xl space-y-1">
          <span className="text-[11px] font-mono text-[#6E6E73] uppercase block">Completed</span>
          <span className="font-serif text-2xl font-bold text-[#1A1A1A] dark:text-white">{completedCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-modern p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search client name, email, or practice area..."
            className="input-modern pl-9"
          />
        </div>

        <div className="flex items-center space-x-1.5 flex-wrap">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-full uppercase font-mono text-[11px] transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] font-bold'
                  : 'bg-[#F5F5F5] dark:bg-[#111111] text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white border border-[#E5E5E5] dark:border-[#2C2C2E]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card-modern rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F5F5] dark:bg-[#111111] text-[#1A1A1A] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2C2C2E] uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Practice Sector</th>
                <th className="p-3.5">Counsel</th>
                <th className="p-3.5">Date / Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2C2C2E]">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#6E6E73]">
                    No consultation records found in database matching criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id || Math.random().toString()} className="hover:bg-[#F5F5F5] dark:hover:bg-[#111111] transition-colors">
                    <td className="p-3.5 font-semibold text-[#1A1A1A] dark:text-white">
                      {b.client_name}
                    </td>
                    <td className="p-3.5 text-[#6E6E73]">
                      <div>{b.client_email}</div>
                      <div className="font-mono text-[11px]">{b.client_phone}</div>
                    </td>
                    <td className="p-3.5 font-medium text-[#1A1A1A] dark:text-white">
                      {b.practice_area}
                    </td>
                    <td className="p-3.5 text-[#6E6E73]">
                      {b.attorney_preferred || 'First Available'}
                    </td>
                    <td className="p-3.5 font-mono text-[#6E6E73]">
                      <div>{b.booking_date}</div>
                      <div className="text-[10px] text-[#6E6E73]">{b.booking_time}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold border border-[#E5E5E5] dark:border-[#2C2C2E] bg-[#F5F5F5] dark:bg-[#2C2C2E] text-[#1A1A1A] dark:text-white">
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setAdminNotesInput(b.admin_notes || '');
                        }}
                        className="p-1.5 rounded-full bg-[#F5F5F5] dark:bg-[#2C2C2E] hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-[#1A1A1A] transition-colors cursor-pointer"
                        title="Manage Status & Add Notes"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="p-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Booking Status Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card-modern p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] dark:text-white border-b border-[#E5E5E5] dark:border-[#2C2C2E] pb-2">
              Update Consultation Docket #{selectedBooking.id?.slice(0, 8) || 'REC'}
            </h3>

            <div className="space-y-2 text-xs text-[#6E6E73]">
              <p><strong className="text-[#1A1A1A] dark:text-white">Client:</strong> {selectedBooking.client_name}</p>
              <p><strong className="text-[#1A1A1A] dark:text-white">Date & Time:</strong> {selectedBooking.booking_date} at {selectedBooking.booking_time}</p>
              <p><strong className="text-[#1A1A1A] dark:text-white">Case Background:</strong> {selectedBooking.case_description || 'No notes provided.'}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] dark:text-white mb-1">Admin Notes / Internal Comments</label>
              <textarea
                rows={3}
                value={adminNotesInput}
                onChange={(e) => setAdminNotesInput(e.target.value)}
                placeholder="e.g. Assigned to Barrister Tariq Fortis; fee retainer deposit received."
                className="input-modern"
              ></textarea>
            </div>

            <div className="space-y-2 pt-2">
              <span className="block text-xs font-semibold text-[#1A1A1A] dark:text-white">Select New Status:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'confirmed')}
                  className="btn-primary text-xs justify-center cursor-pointer"
                >
                  Mark Confirmed
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'completed')}
                  className="btn-primary text-xs justify-center cursor-pointer"
                >
                  Mark Completed
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'cancelled')}
                  className="btn-secondary text-xs justify-center cursor-pointer"
                >
                  Mark Cancelled
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'pending')}
                  className="btn-secondary text-xs justify-center cursor-pointer"
                >
                  Set Pending
                </button>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedBooking(null)}
                className="btn-secondary text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
