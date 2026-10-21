import React from 'react';
import { Family, ScreenId, UserProfile } from '../types';

interface DashboardViewProps {
  families: Family[];
  pendingSyncCount: number;
  isOffline: boolean;
  onNavigate: (screen: ScreenId) => void;
  onSelectFamily: (family: Family) => void;
  onTriggerSync: () => void;
  user: UserProfile;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  families,
  pendingSyncCount,
  isOffline,
  onNavigate,
  onSelectFamily,
  onTriggerSync,
}) => {
  const completedVisits = 18;
  const pendingVisits = 24;
  const lastActiveFamily = families[0] || null;

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8 pb-32">
      {/* Quick Actions Bar */}
      <section aria-label="Quick Actions" className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => {
            if (lastActiveFamily) {
              onSelectFamily(lastActiveFamily);
              onNavigate('family-details');
            } else {
              onNavigate('families');
            }
          }}
          className="flex items-center gap-3 bg-[#006194] text-white font-medium text-sm px-6 h-12 rounded-xl hover:bg-[#007bb9] transition-all active:scale-[0.98] shadow-xs flex-1 min-w-[220px] justify-center md:justify-start"
        >
          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
          <span>Continue Last Family</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onNavigate('general-info');
          }}
          className="flex items-center gap-3 bg-[#eff4ff] text-[#0b1c30] font-medium text-sm px-6 h-12 rounded-xl hover:bg-[#dce9ff] transition-all active:scale-[0.98] border border-[#bfc7d2]/60 shadow-xs flex-1 min-w-[220px] justify-center md:justify-start"
        >
          <span className="material-symbols-outlined text-[20px] text-[#006194]">add</span>
          <span>Start New Visit</span>
        </button>

        <button
          type="button"
          onClick={onTriggerSync}
          className="flex items-center gap-3 bg-[#eff4ff] text-[#0b1c30] font-medium text-sm px-6 h-12 rounded-xl hover:bg-[#dce9ff] transition-all active:scale-[0.98] border border-[#bfc7d2]/60 shadow-xs flex-1 min-w-[220px] justify-center md:justify-start"
        >
          <span className="material-symbols-outlined text-[20px] text-[#006a61]">sync</span>
          <span>Sync Data Now</span>
        </button>
      </section>

      {/* Metrics Grid */}
      <section aria-label="Key Metrics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Assigned Families */}
        <div
          onClick={() => onNavigate('families')}
          className="bg-white rounded-2xl p-6 border border-[#bfc7d2]/60 shadow-xs flex flex-col justify-between min-h-[148px] hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-[#3f4850] group-hover:text-[#006194] transition-colors">
              Assigned Families
            </h3>
            <div className="w-10 h-10 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194]">
              <span className="material-symbols-outlined text-2xl">group</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold text-[#0b1c30] tracking-tight">
              {families.length > 30 ? families.length : 42}
            </span>
            <p className="text-xs text-[#707881] mt-1">Total families in your cohort</p>
          </div>
        </div>

        {/* Completed Visits */}
        <div className="bg-white rounded-2xl p-6 border border-[#bfc7d2]/60 shadow-xs flex flex-col justify-between min-h-[148px] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-[#3f4850]">Completed Visits</h3>
            <div className="w-10 h-10 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold text-[#0b1c30] tracking-tight">
              {completedVisits}
            </span>
            <p className="text-xs text-[#707881] mt-1">Visits completed this phase</p>
          </div>
        </div>

        {/* Pending Visits */}
        <div className="bg-white rounded-2xl p-6 border border-[#bfc7d2]/60 shadow-xs flex flex-col justify-between min-h-[148px] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-[#3f4850]">Pending Visits</h3>
            <div className="w-10 h-10 rounded-full bg-[#ffdcc0]/50 flex items-center justify-center text-[#894d00]">
              <span className="material-symbols-outlined text-2xl">pending_actions</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold text-[#0b1c30] tracking-tight">
              {pendingVisits}
            </span>
            <p className="text-xs text-[#707881] mt-1">Require follow-up scheduling</p>
          </div>
        </div>

        {/* Pending Sync Card */}
        <div
          onClick={() => onNavigate('offline-sync')}
          className="bg-[#ffdad6]/20 rounded-2xl p-6 border border-[#ba1a1a]/30 shadow-xs flex flex-col justify-between min-h-[148px] relative overflow-hidden cursor-pointer hover:border-[#ba1a1a] transition-colors"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#ba1a1a]/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-base font-semibold text-[#93000a]">Pending Sync</h3>
            <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-2xl">sync_problem</span>
            </div>
          </div>
          <div className="mt-4 relative z-10">
            <span className="text-4xl font-bold text-[#ba1a1a] tracking-tight">
              {pendingSyncCount}
            </span>
            <p className="text-xs text-[#93000a] mt-1 font-medium">
              Records waiting to upload
            </p>
          </div>
        </div>

        {/* Last Sync Time */}
        <div className="bg-white rounded-2xl p-6 border border-[#bfc7d2]/60 shadow-xs flex flex-col justify-between min-h-[148px]">
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-[#3f4850]">Last Synchronized</h3>
            <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#3f4850]">
              <span className="material-symbols-outlined text-2xl">update</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-[#0b1c30]">Today, 08:30 AM</span>
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOffline ? 'bg-[#ba1a1a]' : 'bg-[#006a61]'
                }`}
              />
              <p className="text-xs text-[#3f4850]">
                {isOffline ? 'Currently offline (Changes cached)' : 'Connected to server'}
              </p>
            </div>
          </div>
        </div>

        {/* Current Phase */}
        <div
          onClick={() => onNavigate('family-details')}
          className="bg-[#007bb9] text-white rounded-2xl p-6 shadow-xs flex flex-col justify-between min-h-[148px] relative overflow-hidden cursor-pointer hover:bg-[#006194] transition-colors"
        >
          <div className="absolute right-[-10px] bottom-[-20px] opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[130px] leading-none">
              assignment
            </span>
          </div>
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-base font-semibold opacity-90">Current Phase</h3>
          </div>
          <div className="mt-4 relative z-10">
            <span className="text-4xl font-bold tracking-tight">Phase I</span>
            <p className="text-xs text-white/90 mt-1">Baseline Data Collection</p>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#bfc7d2]/40 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#0b1c30]">Recent Activity</h2>
          <button
            type="button"
            onClick={() => onNavigate('offline-sync')}
            className="text-[#006194] text-xs font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        <div className="divide-y divide-[#bfc7d2]/30">
          {/* Activity Item 1 */}
          <div
            onClick={() => {
              const target = families.find((f) => f.id === 'fap-1042') || families[0];
              if (target) onSelectFamily(target);
              onNavigate('clinical-examination');
            }}
            className="p-5 md:p-6 flex items-start gap-4 hover:bg-[#eff4ff]/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194] mt-0.5 shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">
                edit_document
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#0b1c30]">
                <span className="font-semibold">Clinical Examination</span> updated for{' '}
                <span className="font-semibold text-[#006194]">Family #1042 (Smith)</span>
              </p>
              <p className="text-xs text-[#707881] mt-1">Edited by you · 2 hours ago</p>
            </div>
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#707881] group-hover:text-[#006194] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          {/* Activity Item 2 */}
          <div
            onClick={() => {
              const target = families.find((f) => f.id === 'fap-2023-089') || families[0];
              if (target) onSelectFamily(target);
              onNavigate('housing');
            }}
            className="p-5 md:p-6 flex items-start gap-4 hover:bg-[#eff4ff]/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61] mt-0.5 shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">home</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#0b1c30]">
                <span className="font-semibold">Housing Data</span> completed for{' '}
                <span className="font-semibold text-[#006194]">
                  The Sharma Family (#FAP-2023-089)
                </span>
              </p>
              <p className="text-xs text-[#707881] mt-1">Edited by you · Yesterday, 14:30</p>
            </div>
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#707881] group-hover:text-[#006194] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          {/* Activity Item 3 */}
          <div
            onClick={() => {
              onNavigate('families');
            }}
            className="p-5 md:p-6 flex items-start gap-4 hover:bg-[#eff4ff]/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#ffdcc0]/50 flex items-center justify-center text-[#894d00] mt-0.5 shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#0b1c30]">
                <span className="font-semibold">Baseline Survey</span> started for{' '}
                <span className="font-semibold text-[#006194]">Household #4029 (Nkosi)</span>
              </p>
              <p className="text-xs text-[#707881] mt-1">Edited by you · 3 days ago</p>
            </div>
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#707881] group-hover:text-[#006194] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
