import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: () => void;
  isOffline: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, isOffline }) => {
  const [username, setUsername] = useState('MED-2023-8492');
  const [password, setPassword] = useState('••••••••••••');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative Subtle Medical Wave Background */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage:
            "radial-gradient(#006194 1px, transparent 1px), radial-gradient(#006a61 1px, #f8f9ff 1px)",
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* Main Login Card */}
      <main className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-[#bfc7d2]/60 flex flex-col md:flex-row overflow-hidden">
        {/* Left Branding Column */}
        <section className="bg-[#eff4ff] p-8 md:p-10 flex flex-col justify-between md:w-5/12 border-b md:border-b-0 md:border-r border-[#bfc7d2]/50">
          <div className="space-y-6">
            {/* Logos & Institution Title */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white p-1.5 shadow-xs border border-[#bfc7d2]/40 flex items-center justify-center shrink-0">
                <img
                  className="w-full h-full object-contain"
                  alt="Bharati Vidyapeeth Medical College crest"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvqOK4vQ9ou6Zou9tZIGwSNMZOkLVI19jslhAc_MP1hyreyL-aOVMNfchDFdpTuSIO4x67tjtJVxB2pF6IYqLKM6AYBAIaoKLvTG7e0FUKpAy7E2oTyosDUMv6woPW7Oe0jTeIwWiuNYnmkE3mFoHsscFr_ihyxnf1P7OUbSP5LPxtVvEPiUf7fhZ1R6NpKPTHuDlkmejp98ZfdQdgJtUUGudX2NI3Ot6q9Mwmt6Ga0UDdXoVSclNQ"
                  onError={(e) => {
                    // Fallback to stylized SVG crest if network blocks external asset
                    (e.target as HTMLElement).style.display = 'none';
                    (e.currentTarget.parentElement as HTMLElement).innerHTML =
                      '<span class="material-symbols-outlined text-3xl text-[#006194]">local_hospital</span>';
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#006194] tracking-tight">
                  FAP Connect
                </h1>
                <p className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider mt-0.5">
                  Clinical Data Portal
                </p>
              </div>
            </div>

            <div className="mt-6 text-sm text-[#3f4850] leading-relaxed">
              <p>
                Secure access for medical students and staff to manage family health
                profiles, clinical examinations, and community medicine cohort assignments.
              </p>
            </div>
          </div>

          {/* Sync Status & Offline Indicator */}
          <div className="mt-8 pt-6 border-t border-[#bfc7d2]/40 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-xs" />
              <span className="text-sm font-medium text-[#3f4850] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">
                  {isOffline ? 'cloud_off' : 'cloud_done'}
                </span>
                {isOffline ? 'Offline Mode Active' : 'Offline Mode Ready'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#707881]">
              <span className="material-symbols-outlined text-[16px] text-[#006194]">
                sync
              </span>
              <span>Last sync: 2 hours ago (Local cache intact)</span>
            </div>
          </div>
        </section>

        {/* Right Form Column */}
        <section className="p-8 md:p-12 md:w-7/12 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0b1c30] mb-1.5">Sign In</h2>
            <p className="text-sm text-[#3f4850]">
              Enter your credentials to access your assigned families.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-semibold text-[#0b1c30] uppercase tracking-wider block"
                htmlFor="username"
              >
                Student / Staff ID
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px]">
                  person
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. MED-2023-8492"
                  required
                  className="w-full h-12 pl-11 pr-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none transition-all text-sm text-[#0b1c30]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-semibold text-[#0b1c30] uppercase tracking-wider block"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px]">
                  lock
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full h-12 pl-11 pr-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none transition-all text-sm text-[#0b1c30]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="submit"
                className="w-full h-12 bg-[#006194] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#007bb9] active:scale-[0.98] transition-all shadow-sm"
              >
                <span>Login</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-[#006194] font-medium hover:underline text-center py-1"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Quick Demo Pre-fill helper */}
          <div className="mt-6 pt-5 border-t border-[#bfc7d2]/30 flex items-center justify-between">
            <span className="text-xs text-[#707881]">Testing account:</span>
            <button
              type="button"
              onClick={() => {
                setUsername('MED-2023-8492');
                setPassword('Password123');
                onLogin();
              }}
              className="text-xs bg-[#e5eeff] text-[#006194] px-3 py-1.5 rounded-lg font-medium hover:bg-[#cce5ff] transition-colors"
            >
              Demo Login as Dr. Sarah Jenkins
            </button>
          </div>
        </section>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#bfc7d2]">
            <h3 className="text-lg font-bold text-[#0b1c30] mb-2">Password Recovery</h3>
            <p className="text-sm text-[#3f4850] mb-4">
              Enter your institutional ID or registered email. We will send a secure password reset token to your supervisor.
            </p>

            {forgotSent ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-sm mb-4">
                Recovery instructions have been sent to your registered academic email.
              </div>
            ) : (
              <input
                type="text"
                placeholder="Student ID or Institutional Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full h-11 px-3.5 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm mb-4"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSent(false);
                }}
                className="px-4 py-2 text-sm text-[#707881] hover:bg-[#f8f9ff] rounded-xl"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="px-4 py-2 text-sm font-semibold bg-[#006194] text-white rounded-xl hover:bg-[#007bb9]"
                >
                  Send Recovery Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
