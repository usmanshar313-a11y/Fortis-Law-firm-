import React, { useState, useEffect } from 'react';
import { PageRoute, Language } from '../types';
import {
  supabase,
  setLocalAdminAuthenticated,
  getAdminCredentials
} from '../lib/supabase';
import { UI_STRINGS } from '../data/translations';
import { Shield, Lock, Key, AlertCircle, ArrowLeft, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react';

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

  // Rate limiting / lockout state
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

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

      // 2. Strict Check against configured secret admin credentials
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
                placeholder="email@example.com"
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

