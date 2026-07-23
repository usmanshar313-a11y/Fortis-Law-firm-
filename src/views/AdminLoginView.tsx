import React, { useState, useEffect } from 'react';
import { PageRoute, Language } from '../types';
import {
  supabase,
  setLocalAdminAuthenticated,
  getAdminCredentials,
  saveAdminCredentials
} from '../lib/supabase';
import { UI_STRINGS } from '../data/translations';
import { Shield, Lock, Key, AlertCircle, ArrowLeft, Loader2, CheckCircle2, Settings2, Eye, EyeOff } from 'lucide-react';

interface AdminLoginViewProps {
  setRoute: (route: PageRoute) => void;
  lang: Language;
  onLoginSuccess: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ setRoute, lang, onLoginSuccess }) => {
  const t = UI_STRINGS[lang];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Active Admin Credentials
  const [adminCreds, setAdminCreds] = useState(getAdminCredentials());

  // State for setting custom credentials modal/section
  const [showCredsEditor, setShowCredsEditor] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  // Rate limiting / lockout state
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  // Sync admin credentials on mount
  useEffect(() => {
    const creds = getAdminCredentials();
    setAdminCreds(creds);
    setNewAdminEmail(creds.email);
    setNewAdminPassword(creds.password);
  }, []);

  // Handle countdown timer when locked out
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLockedOut && lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setIsLockedOut(false);
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLockedOut, lockoutTimer]);

  const handleSaveNewCreds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      setErrorMessage('New email and password cannot be empty.');
      return;
    }

    saveAdminCredentials(newAdminEmail.trim(), newAdminPassword.trim());
    const updated = getAdminCredentials();
    setAdminCreds(updated);
    setEmail(updated.email);
    setPassword(updated.password);
    setShowCredsEditor(false);
    setErrorMessage(null);
    setSuccessMessage('Your custom admin email & password have been updated successfully!');

    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (isLockedOut) {
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // 1. Check Supabase Auth signIn
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass
      });

      if (!error && data.session) {
        setLocalAdminAuthenticated(true);
        setFailedAttempts(0);
        onLoginSuccess();
        setRoute('admin-dashboard');
        return;
      }

      // 2. Strict Check against configured admin credentials
      const currentCreds = getAdminCredentials();
      if (cleanEmail === currentCreds.email.toLowerCase() && cleanPass === currentCreds.password) {
        setLocalAdminAuthenticated(true);
        setFailedAttempts(0);
        onLoginSuccess();
        setRoute('admin-dashboard');
        return;
      }

      // 3. Increment failed attempts for invalid credentials
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= 5) {
        setIsLockedOut(true);
        setLockoutTimer(60);
        setErrorMessage('Too many failed attempts. Security lockout active for 60 seconds.');
      } else {
        setErrorMessage(`Invalid email or password. Attempt ${nextAttempts} of 5.`);
      }
    } catch (err) {
      setErrorMessage('An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md card-modern p-8 rounded-2xl space-y-6">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] rounded-full flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] dark:text-white">
            {t.adminTitle}
          </h1>
          <p className="text-xs text-[#6E6E73]">
            Authorized Legal Directorate Personnel Only
          </p>
        </div>

        {/* Success Banner */}
        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-600 text-white text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Lockout Warning */}
        {isLockedOut && (
          <div className="p-3 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2C2C2E] text-[#1A1A1A] dark:text-white text-xs text-center font-mono">
            Security Lockout Active. Please wait {lockoutTimer} seconds.
          </div>
        )}

        {/* Authorized Admin Credential Info & Customizer */}
        <div className="p-4 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2C2C2E] text-xs space-y-3">
          <div className="flex items-center justify-between text-[#1A1A1A] dark:text-white font-semibold">
            <span className="flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Authorized Admin Account</span>
            </span>
            <button
              type="button"
              onClick={() => setShowCredsEditor(!showCredsEditor)}
              className="text-[11px] text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white underline flex items-center space-x-1 cursor-pointer"
            >
              <Settings2 className="w-3 h-3" />
              <span>{showCredsEditor ? 'Hide Setup' : 'Set Your Password'}</span>
            </button>
          </div>

          {!showCredsEditor ? (
            <div className="space-y-2">
              <div className="text-[11px] text-[#6E6E73] font-mono space-y-1 bg-white dark:bg-[#1A1A1A] p-2.5 rounded-lg border border-[#E5E5E5] dark:border-[#2C2C2E]">
                <div>Authorized Email: <strong className="text-[#1A1A1A] dark:text-white">{adminCreds.email}</strong></div>
                <div>Authorized Password: <strong className="text-[#1A1A1A] dark:text-white">{"•".repeat(adminCreds.password.length)}</strong></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail(adminCreds.email);
                  setPassword(adminCreds.password);
                }}
                className="w-full py-1.5 rounded-lg bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] text-[11px] font-semibold transition-opacity hover:opacity-90 cursor-pointer"
              >
                Autofill Credentials
              </button>
            </div>
          ) : (
            /* Form to customize Admin Email & Password */
            <form onSubmit={handleSaveNewCreds} className="space-y-3 pt-1 border-t border-[#E5E5E5] dark:border-[#2C2C2E]">
              <div>
                <label className="block text-[11px] text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">
                  Set Your Desired Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="input-modern py-1.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">
                  Set Your Secret Password
                </label>
                <input
                  type="text"
                  required
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="YourSecretPass123"
                  className="input-modern py-1.5 text-xs font-mono"
                />
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Save Custom Password & Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowCredsEditor(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#E5E5E5] dark:bg-[#2C2C2E] text-[#1A1A1A] dark:text-white text-[11px] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Shield className="w-3.5 h-3.5 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                disabled={isLockedOut || loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@domain.com"
                className="input-modern pl-9 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1A1A1A] dark:text-[#F5F5F5] font-medium mb-1">
              Secret Password
            </label>
            <div className="relative">
              <Key className="w-3.5 h-3.5 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={isLockedOut || loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-modern pl-9 pr-9 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLockedOut || loading}
            className="w-full btn-primary py-3 justify-center text-xs cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Access...</span>
              </>
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#2C2C2E] text-center">
          <button
            onClick={() => setRoute('home')}
            className="text-xs text-[#6E6E73] hover:text-[#1A1A1A] dark:hover:text-white flex items-center justify-center space-x-1 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Law Firm Site</span>
          </button>
        </div>

      </div>
    </div>
  );
};

