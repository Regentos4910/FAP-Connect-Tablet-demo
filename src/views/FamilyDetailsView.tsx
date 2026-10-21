import React from 'react';
import { Family, ScreenId, UserProfile } from '../types';

interface FamilyDetailsViewProps {
  family: Family;
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onOpenSectionModal: (sectionKey: string) => void;
}

export const FamilyDetailsView: React.FC<FamilyDetailsViewProps> = ({
  family,
  onNavigate,
  onOpenSectionModal,
}) => {
  return (
    <div className="p-6 lg:p-8 pb-32 max-w-7xl mx-auto w-full space-y-8">
      {/* Quick Info & Timeline Banner */}
      <section className="bg-white rounded-2xl shadow-xs border border-[#bfc7d2]/50 p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
        {/* Quick Info */}
        <div className="shrink-0 flex flex-col gap-3 w-full lg:w-1/3">
          <div>
            <h2 className="text-xl font-bold text-[#0b1c30]">
              Village: {family.village}
            </h2>
            <p className="text-sm text-[#3f4850] mt-0.5">
              House Number: {family.houseNo}, {family.sector || 'Main Sector'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#86f2e4]/30 text-[#006f66] border border-[#006a61]/20 px-2.5 py-1 rounded-full text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              {family.consented ? 'Consented' : 'Consent Pending'}
            </span>
            <span className="text-xs font-medium text-[#3f4850] bg-[#e5eeff] px-3 py-1 rounded-full border border-[#bfc7d2]/40">
              {family.memberCount} Members
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-24 bg-[#bfc7d2]/40" />
        <div className="block lg:hidden h-px w-full bg-[#bfc7d2]/40" />

        {/* Phase Timeline */}
        <div className="flex-1 w-full pl-0 lg:pl-4">
          <h3 className="text-xs font-bold text-[#707881] uppercase tracking-wider mb-5">
            Data Collection Progress
          </h3>

          <div className="relative px-4">
            {/* Background line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#d3e4fe] -translate-y-1/2 rounded-full z-0" />
            {/* Active filled line */}
            <div className="absolute top-1/2 left-8 w-[50%] h-1 bg-[#006194] -translate-y-1/2 rounded-full z-0" />

            {/* Nodes */}
            <div className="relative z-10 flex justify-between">
              {/* Phase 1: Complete */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('general-info')}>
                <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-[#0b1c30]">Phase I</span>
                  <span className="block text-[11px] text-[#707881]">Demographics</span>
                </div>
              </div>

              {/* Phase 2: In Progress */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-[#006194] border-4 border-white flex items-center justify-center shadow-sm ring-2 ring-[#006194]">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-[#006194]">Phase II</span>
                  <span className="block text-[11px] text-[#006194] font-medium">Health &amp; Clinical</span>
                </div>
              </div>

              {/* Phase 3: Pending */}
              <div className="flex flex-col items-center gap-1.5 opacity-60">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-[#bfc7d2] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[#707881] text-[16px]">
                    more_horiz
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-xs font-medium text-[#707881]">Phase III</span>
                  <span className="block text-[11px] text-[#707881]">Intervention</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire Sections */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#0b1c30]">Questionnaire Sections</h3>
          <span className="text-xs text-[#707881]">Click any module to inspect or input data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Housing Conditions (Completed) */}
          <div
            onClick={() => onOpenSectionModal('housing')}
            className="bg-white rounded-2xl shadow-xs border border-[#bfc7d2]/50 p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#86f2e4]/30 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#eff4ff] rounded-xl flex items-center justify-center text-[#006194]">
                <span className="material-symbols-outlined text-[26px]">home</span>
              </div>
              <span className="bg-[#86f2e4]/40 text-[#006f66] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#006a61]/20">
                <span className="material-symbols-outlined text-[14px]">done_all</span> 100%
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0b1c30] mb-1.5">Housing Conditions</h4>
            <p className="text-xs text-[#3f4850] mb-4 line-clamp-2">
              Sanitation, water source, and structural integrity details completed.
            </p>
            <div className="mt-auto pt-4 border-t border-[#bfc7d2]/30 flex justify-between items-center">
              <span className="text-[11px] text-[#707881]">Updated: 2h ago</span>
              <button
                type="button"
                className="text-[#006194] text-xs font-semibold hover:underline flex items-center gap-0.5"
              >
                View <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Card 2: Economic Data (In Progress) */}
          <div
            onClick={() => onOpenSectionModal('economic-data')}
            className="bg-white rounded-2xl shadow-xs border-l-4 border-l-[#006194] border-t border-r border-b border-[#bfc7d2]/50 p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#cce5ff]/50 rounded-xl flex items-center justify-center text-[#006194]">
                <span className="material-symbols-outlined text-[26px]">payments</span>
              </div>
              <span className="bg-[#ffdcc0]/60 text-[#894d00] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#894d00]/20">
                <span className="material-symbols-outlined text-[14px]">sync</span> 60%
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0b1c30] mb-1.5">Economic Data</h4>
            <p className="text-xs text-[#3f4850] mb-4 line-clamp-2">
              Income sources, debts, agricultural livestock, and asset ownership.
            </p>

            {/* Mini Progress */}
            <div className="w-full bg-[#e5eeff] h-1.5 rounded-full mb-4">
              <div className="bg-[#006194] h-1.5 rounded-full" style={{ width: '60%' }} />
            </div>

            <div className="mt-auto pt-4 border-t border-[#bfc7d2]/30 flex justify-between items-center">
              <span className="text-[11px] text-[#707881]">Draft saved</span>
              <button
                type="button"
                className="bg-[#006194] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#007bb9] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Card 3: Clinical Examination (Pending) */}
          <div
            onClick={() => onNavigate('clinical-examination')}
            className="bg-white rounded-2xl shadow-xs border border-[#bfc7d2]/50 p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#eff4ff] rounded-xl flex items-center justify-center text-[#006194]">
                <span className="material-symbols-outlined text-[26px]">medical_services</span>
              </div>
              <span className="bg-[#eff4ff] text-[#707881] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#bfc7d2]">
                <span className="material-symbols-outlined text-[14px]">event_note</span> 0%
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0b1c30] mb-1.5">Clinical Examination</h4>
            <p className="text-xs text-[#3f4850] mb-4 line-clamp-2">
              Anthropometry, vital signs, systemic examination, and urine findings for members.
            </p>
            <div className="mt-auto pt-4 border-t border-[#bfc7d2]/30 flex justify-between items-center">
              <span className="text-[11px] text-[#707881]">Not started</span>
              <button
                type="button"
                className="text-[#006194] text-xs font-semibold hover:underline flex items-center gap-1"
              >
                Start <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 4: Social History & Demographics */}
          <div
            onClick={() => onOpenSectionModal('social-history')}
            className="bg-white rounded-2xl shadow-xs border border-[#bfc7d2]/50 p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#eff4ff] rounded-xl flex items-center justify-center text-[#006194]">
                <span className="material-symbols-outlined text-[26px]">history</span>
              </div>
              <span className="bg-[#86f2e4]/40 text-[#006f66] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">done_all</span> 90%
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0b1c30] mb-1.5">Social &amp; Dietary History</h4>
            <p className="text-xs text-[#3f4850] mb-4 line-clamp-2">
              Addictions, dietary patterns (24-hour recall), immunization records, and family pedigree.
            </p>
            <div className="mt-auto pt-4 border-t border-[#bfc7d2]/30 flex justify-between items-center">
              <span className="text-[11px] text-[#707881]">Updated yesterday</span>
              <button
                type="button"
                className="text-[#006194] text-xs font-semibold hover:underline flex items-center gap-0.5"
              >
                View <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Card 5: TB Screening */}
          <div
            onClick={() => onOpenSectionModal('tb-screening')}
            className="bg-white rounded-2xl shadow-xs border border-[#bfc7d2]/50 p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#ffdad6]/40 rounded-xl flex items-center justify-center text-[#ba1a1a]">
                <span className="material-symbols-outlined text-[26px]">emergency</span>
              </div>
              <span className="bg-[#ffdad6] text-[#93000a] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span> 1 Alert
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0b1c30] mb-1.5">TB &amp; Infectious Screening</h4>
            <p className="text-xs text-[#3f4850] mb-4 line-clamp-2">
              Cough questionnaire, sputum status, Nikshay ID tracking, and contact screening.
            </p>
            <div className="mt-auto pt-4 border-t border-[#bfc7d2]/30 flex justify-between items-center">
              <span className="text-[11px] text-[#707881]">DOTS Active</span>
              <button
                type="button"
                className="text-[#ba1a1a] text-xs font-semibold hover:underline flex items-center gap-0.5"
              >
                Inspect <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Card 6: Family Summary & Report */}
          <div
            onClick={() => onNavigate('summary')}
            className="bg-gradient-to-br from-[#006194] to-[#007bb9] text-white rounded-2xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[26px]">summarize</span>
              </div>
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                Executive View
              </span>
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">Family Health Summary</h4>
            <p className="text-xs text-white/80 mb-4 line-clamp-2">
              Consolidated risk matrix, BPL status, nutritional indicators, and supervisor print view.
            </p>
            <div className="mt-auto pt-4 border-t border-white/20 flex justify-between items-center">
              <span className="text-[11px] text-white/80">Print Ready</span>
              <button
                type="button"
                className="text-white text-xs font-semibold hover:underline flex items-center gap-1"
              >
                View Summary <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
