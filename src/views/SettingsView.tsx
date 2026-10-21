import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  onLogout: () => void;
  onForceSync: () => void;
  onClearCache: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onLogout,
  onForceSync,
  onClearCache,
}) => {
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [supervisorMessage, setSupervisorMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Profile & Supervisor) - 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 p-6 shadow-xs flex flex-col items-center text-center">
            <div className="relative mb-5">
              <img
                alt={user.name}
                src={user.avatarUrl}
                className="w-32 h-32 rounded-full border-4 border-[#e5eeff] shadow-md object-cover"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-[#006194] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:bg-[#007bb9] transition-colors border-2 border-white"
                title="Edit Photo"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>

            <h2 className="text-xl font-bold text-[#0b1c30] mb-0.5">{user.name}</h2>
            <p className="text-xs text-[#707881] mb-5">ID: {user.id}</p>

            <div className="w-full bg-[#f8f9ff] rounded-xl p-4 flex flex-col gap-2.5 text-left border border-[#bfc7d2]/40">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#707881] uppercase tracking-wider">
                  Current Phase
                </span>
                <span className="font-bold text-[#006194]">{user.phase}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#707881] uppercase tracking-wider">
                  Cohort
                </span>
                <span className="font-semibold text-[#0b1c30]">{user.cohort}</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-1 border-t border-[#bfc7d2]/30">
                <span className="font-semibold text-[#707881] uppercase tracking-wider">
                  Designation
                </span>
                <span className="text-[#3f4850]">{user.role}</span>
              </div>
            </div>
          </div>

          {/* Faculty Supervisor Card */}
          <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 p-6 shadow-xs">
            <h3 className="text-base font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006a61]">
                supervisor_account
              </span>
              <span>Assigned Faculty</span>
            </h3>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#86f2e4]/30 text-[#006f66] flex items-center justify-center font-bold text-base border border-[#006a61]/20">
                DR
              </div>
              <div>
                <p className="text-sm font-bold text-[#0b1c30]">{user.supervisorName}</p>
                <p className="text-xs text-[#707881]">{user.supervisorDept}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSupervisorModal(true)}
              className="w-full h-11 border border-[#bfc7d2] rounded-xl text-[#006194] text-xs font-bold hover:bg-[#eff4ff] transition-colors flex items-center justify-center gap-2 active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Contact Supervisor</span>
            </button>
          </div>
        </div>

        {/* Right Column (Settings & Data) - 8 cols */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Storage & Sync Card */}
          <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#0b1c30] mb-6 border-b border-[#bfc7d2]/40 pb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006194]">cloud_sync</span>
              <span>Data &amp; Storage</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Device Storage */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-[#0b1c30]">Device Storage</span>
                  <span className="text-xs font-semibold text-[#707881]">45.2 GB free</span>
                </div>

                <div className="w-full h-3 bg-[#e5eeff] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#006194]" style={{ width: '25%' }} title="App Data: 1.2GB" />
                  <div className="h-full bg-[#006a61]" style={{ width: '15%' }} title="Offline DB: 800MB" />
                  <div className="h-full bg-[#bfc7d2]" style={{ width: '45%' }} title="Other Apps: 2.1GB" />
                </div>

                <div className="flex gap-4 mt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#006194]" />
                    <span className="text-[#3f4850]">App Data (1.2GB)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#006a61]" />
                    <span className="text-[#3f4850]">Offline DB (800MB)</span>
                  </div>
                </div>
              </div>

              {/* Offline DB Controls */}
              <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-[#bfc7d2]/40 pt-4 md:pt-0 md:pl-8">
                <div>
                  <p className="text-sm font-bold text-[#0b1c30]">Offline Database</p>
                  <p className="text-xs text-[#707881] mt-0.5">Last synced: 2 hours ago</p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onForceSync}
                    className="flex-1 h-11 bg-[#006194] text-white rounded-xl text-xs font-bold hover:bg-[#007bb9] transition-colors active:scale-98 flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">sync</span>
                    <span>Force Sync</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(true)}
                    className="flex-1 h-11 border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6]/20 rounded-xl text-xs font-bold transition-colors active:scale-98 flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    <span>Clear Cache</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language */}
            <div
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="bg-white rounded-2xl border border-[#bfc7d2]/60 p-5 shadow-xs hover:border-[#006194] transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="material-symbols-outlined text-3xl text-[#006194] group-hover:scale-105 transition-transform">
                  language
                </span>
                <div className="w-10 h-6 bg-[#006194] rounded-full relative p-1 transition-colors">
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      language === 'en' ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
              <h4 className="text-base font-bold text-[#0b1c30]">Language</h4>
              <p className="text-xs text-[#707881] mt-0.5">
                {language === 'en' ? 'English (Medical US)' : 'Hindi (Regional Indian)'}
              </p>
            </div>

            {/* Appearance */}
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white rounded-2xl border border-[#bfc7d2]/60 p-5 shadow-xs hover:border-[#006194] transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="material-symbols-outlined text-3xl text-[#006a61] group-hover:scale-105 transition-transform">
                  dark_mode
                </span>
                <div
                  className={`w-10 h-6 rounded-full relative p-1 transition-colors ${
                    darkMode ? 'bg-[#006a61]' : 'bg-[#bfc7d2]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      darkMode ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
              <h4 className="text-base font-bold text-[#0b1c30]">Appearance</h4>
              <p className="text-xs text-[#707881] mt-0.5">
                {darkMode ? 'Dark Mode (Simulated)' : 'Light Mode (Standard Medical)'}
              </p>
            </div>

            {/* Security & Privacy */}
            <div
              onClick={() => setShowSecurityModal(true)}
              className="bg-white rounded-2xl border border-[#bfc7d2]/60 p-5 shadow-xs hover:border-[#006194] transition-colors cursor-pointer group md:col-span-2 flex justify-between items-center"
            >
              <div>
                <h4 className="text-base font-bold text-[#0b1c30] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194]">security</span>
                  <span>Security &amp; Privacy</span>
                </h4>
                <p className="text-xs text-[#707881] mt-1">
                  Manage offline PIN, biometric credentials, encrypted storage, and patient confidentiality consent forms.
                </p>
              </div>
              <span className="material-symbols-outlined text-[#bfc7d2] group-hover:text-[#006194] transition-colors">
                chevron_right
              </span>
            </div>
          </div>

          {/* Logout Action */}
          <div className="mt-4">
            <button
              type="button"
              onClick={onLogout}
              className="w-full min-h-[52px] border-2 border-[#ba1a1a] text-[#ba1a1a] bg-white rounded-2xl text-sm font-bold hover:bg-[#ffdad6]/20 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Secure Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Supervisor Contact Modal */}
      {showSupervisorModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#bfc7d2]">
            <h3 className="text-lg font-bold text-[#0b1c30] mb-1">Contact Supervisor</h3>
            <p className="text-xs text-[#707881] mb-4">
              Send an inquiry or clinical consultation request to {user.supervisorName}.
            </p>

            {messageSent ? (
              <div className="bg-[#86f2e4]/30 border border-[#006a61]/30 text-[#006f66] p-4 rounded-xl text-xs mb-4">
                Message successfully dispatched to faculty portal!
              </div>
            ) : (
              <textarea
                rows={4}
                value={supervisorMessage}
                onChange={(e) => setSupervisorMessage(e.target.value)}
                placeholder="State clinical query, household concern, or scheduling conflict..."
                className="w-full p-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs outline-none focus:border-[#006194] mb-4"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSupervisorModal(false);
                  setMessageSent(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-[#707881] hover:bg-[#eff4ff] rounded-xl"
              >
                Close
              </button>
              {!messageSent && (
                <button
                  type="button"
                  onClick={() => setMessageSent(true)}
                  className="px-5 py-2.5 text-xs font-bold bg-[#006194] text-white hover:bg-[#007bb9] rounded-xl"
                >
                  Send Consultation
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clear Cache Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#bfc7d2]">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <h3 className="text-base font-bold text-[#0b1c30] mb-1">Clear Local Cache?</h3>
            <p className="text-xs text-[#707881] mb-5">
              This will remove cached static assets. Any un-synced pending records will be pushed first before flushing.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-[#707881] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearCache();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-[#ba1a1a] text-white hover:bg-[#93000a] rounded-xl"
              >
                Confirm Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#bfc7d2]">
            <h3 className="text-base font-bold text-[#0b1c30] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006194]">shield</span>
              <span>Security &amp; Encryption Protocols</span>
            </h3>
            <div className="space-y-3 text-xs text-[#3f4850] mb-5">
              <div className="p-3 bg-[#eff4ff] rounded-xl">
                <span className="font-bold text-[#006194] block">AES-256 Offline Storage</span>
                Local SQLite database encrypted with hardware key.
              </div>
              <div className="p-3 bg-[#eff4ff] rounded-xl">
                <span className="font-bold text-[#006194] block">Biometric Lock</span>
                Fingerprint authentication required when returning to app from lock screen.
              </div>
              <div className="p-3 bg-[#eff4ff] rounded-xl">
                <span className="font-bold text-[#006194] block">Consent Integrity</span>
                Digital signatures backed by cryptographic hash stamps.
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowSecurityModal(false)}
                className="px-5 py-2 text-xs font-bold bg-[#006194] text-white rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
