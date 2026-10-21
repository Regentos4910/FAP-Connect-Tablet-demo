import React, { useState, useMemo } from 'react';
import { Family, ScreenId } from '../types';

interface AssignedFamiliesViewProps {
  families: Family[];
  selectedFamily: Family | null;
  onSelectFamily: (family: Family) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const AssignedFamiliesView: React.FC<AssignedFamiliesViewProps> = ({
  families,
  selectedFamily,
  onSelectFamily,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState<string>('All Villages');

  const villages = ['All Villages', 'Village A', 'Village B', 'Kadarpur', 'Pending Sync'];

  const filteredFamilies = useMemo(() => {
    return families.filter((f) => {
      const matchesSearch =
        f.familyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.village.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedVillage === 'All Villages') return true;
      if (selectedVillage === 'Pending Sync') return f.status === 'Pending Sync';
      return f.village === selectedVillage;
    });
  }, [families, searchQuery, selectedVillage]);

  const activeFamily = selectedFamily || filteredFamilies[0] || families[0];

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-white h-[calc(100vh-64px)]">
      {/* Left Column: Search & Family List */}
      <section className="w-full lg:w-[45%] xl:w-[40%] flex flex-col border-r border-[#bfc7d2]/50 bg-white h-full z-10 shrink-0">
        {/* Search & Filters */}
        <div className="p-4 border-b border-[#bfc7d2]/50 bg-[#f8f9ff] shrink-0">
          <div className="relative mb-3">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search families, IDs..."
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 bg-white text-sm text-[#0b1c30] placeholder-[#707881] outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {villages.map((village) => {
              const isSelected = selectedVillage === village;
              return (
                <button
                  key={village}
                  type="button"
                  onClick={() => setSelectedVillage(village)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-[#007bb9] text-white shadow-xs'
                      : 'border border-[#bfc7d2] text-[#3f4850] hover:bg-[#eff4ff]'
                  }`}
                >
                  {village}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Family Cards List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-white">
          {filteredFamilies.length === 0 ? (
            <div className="p-8 text-center text-[#707881]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#bfc7d2]">
                group_off
              </span>
              <p className="text-sm font-medium">No families match your criteria.</p>
            </div>
          ) : (
            filteredFamilies.map((family) => {
              const isSelected = activeFamily?.id === family.id;
              return (
                <div
                  key={family.id}
                  onClick={() => onSelectFamily(family)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#86f2e4]/15 border-[#86f2e4] ring-1 ring-[#86f2e4]/50 shadow-xs'
                      : 'bg-[#f8f9ff] border-[#bfc7d2]/60 hover:bg-[#eff4ff] hover:border-[#bfc7d2]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-base text-[#0b1c30] tracking-tight">
                        {family.familyName}
                      </h3>
                      <p className="text-xs text-[#707881] mt-0.5">ID: {family.code}</p>
                    </div>

                    {/* Circular Progress Gauge */}
                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#bfc7d2]/30"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="100, 100"
                          strokeWidth="3.5"
                        />
                        <path
                          className={family.completeness === 100 ? 'text-[#006a61]' : 'text-[#006194]'}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray={`${family.completeness}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {family.completeness === 100 ? (
                        <span className="absolute material-symbols-outlined text-[#006a61] text-[18px]">
                          check
                        </span>
                      ) : (
                        <span className="absolute text-[10px] font-bold text-[#006194]">
                          {family.completeness}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-[#3f4850]">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#707881]">
                        location_on
                      </span>
                      <span>
                        {family.village} ({family.houseNo})
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#707881]">
                        group
                      </span>
                      <span>{family.memberCount} Members</span>
                    </div>

                    {family.status === 'Pending Sync' ? (
                      <div className="flex items-center gap-1 text-[#ba1a1a]">
                        <span className="material-symbols-outlined text-[16px]">
                          sync_problem
                        </span>
                        <span className="font-medium">Pending Sync</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[#006a61]">
                        <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
                        <span className="font-medium">{family.phase}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Right Column: Family Detail Preview */}
      <section className="flex-1 bg-[#eff4ff]/60 p-6 lg:p-8 overflow-y-auto">
        {activeFamily ? (
          <div className="max-w-3xl w-full mx-auto flex flex-col h-full">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#0b1c30] tracking-tight">
                    {activeFamily.familyName}
                  </h2>
                  <span className="px-3 py-1 bg-[#86f2e4] text-[#006f66] rounded-full text-xs font-semibold">
                    {activeFamily.phase}
                  </span>
                </div>
                <p className="text-sm text-[#707881] flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">badge</span>
                  <span>ID: {activeFamily.code}</span>
                  <span>·</span>
                  <span>Head: {activeFamily.headName}</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('general-info')}
                  className="h-11 px-4 rounded-xl border border-[#bfc7d2] bg-white text-[#0b1c30] flex items-center gap-2 hover:bg-[#eff4ff] transition-colors text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  <span>Edit Info</span>
                </button>
              </div>
            </div>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Location */}
              <div className="bg-white rounded-2xl p-5 border border-[#bfc7d2]/50 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#cce5ff]/50 flex items-center justify-center text-[#006194] shrink-0">
                  <span className="material-symbols-outlined text-2xl">home</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-base font-bold text-[#0b1c30] truncate">
                    {activeFamily.village}, {activeFamily.houseNo}
                  </p>
                </div>
              </div>

              {/* Family Members */}
              <div className="bg-white rounded-2xl p-5 border border-[#bfc7d2]/50 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ffdcc0]/60 flex items-center justify-center text-[#894d00] shrink-0">
                  <span className="material-symbols-outlined text-2xl">group</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">
                    Family Members
                  </p>
                  <p className="text-base font-bold text-[#0b1c30] truncate">
                    {activeFamily.memberCount} Enrolled
                  </p>
                </div>
              </div>

              {/* Last Visit */}
              <div className="bg-white rounded-2xl p-5 border border-[#bfc7d2]/50 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d3e4fe]/50 flex items-center justify-center text-[#3f4850] shrink-0">
                  <span className="material-symbols-outlined text-2xl">event</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">
                    Last Visit
                  </p>
                  <p className="text-base font-bold text-[#0b1c30] truncate">
                    {activeFamily.lastVisit}
                  </p>
                </div>
              </div>

              {/* Completeness */}
              <div className="bg-white rounded-2xl p-5 border border-[#bfc7d2]/50 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#86f2e4]/40 flex items-center justify-center text-[#006f66] shrink-0">
                  <span className="material-symbols-outlined text-2xl">monitoring</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">
                    Data Completeness
                  </p>
                  <p className="text-base font-bold text-[#0b1c30] truncate">
                    {activeFamily.completeness}%
                  </p>
                </div>
              </div>
            </div>

            {/* Enrolled Members Preview */}
            <div className="bg-white rounded-2xl border border-[#bfc7d2]/50 shadow-xs flex-1 p-6 flex flex-col mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-[#0b1c30]">Enrolled Members</h3>
                <button
                  type="button"
                  onClick={() => onNavigate('family-members')}
                  className="text-xs text-[#006194] font-semibold hover:underline"
                >
                  Manage Roster ({activeFamily.members.length})
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1">
                {activeFamily.members.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => onNavigate('family-members')}
                    className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-[#eff4ff]/60 transition-colors border-b border-[#bfc7d2]/20 last:border-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#e5eeff] text-[#006194] flex items-center justify-center font-bold text-xs shrink-0">
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0b1c30]">{member.name}</p>
                        <p className="text-xs text-[#707881]">
                          {member.relation} · {member.gender} · {member.age} Yrs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {member.status === 'Examined' ? (
                        <span className="material-symbols-outlined text-[#006a61] text-[20px]" title="Examined">
                          check_circle
                        </span>
                      ) : (
                        <span
                          className="material-symbols-outlined text-[#bfc7d2] text-[20px]"
                          title="Pending Examination"
                        >
                          radio_button_unchecked
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-2 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('family-details')}
                className="bg-[#006194] hover:bg-[#007bb9] text-white font-semibold text-sm h-12 px-7 rounded-full flex items-center gap-2.5 transition-transform active:scale-95 shadow-md"
              >
                <span>Continue Data Entry</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
};
