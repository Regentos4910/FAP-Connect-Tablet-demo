import React, { useState } from 'react';
import { Family, FamilyMember, ScreenId } from '../types';

interface FamilyMembersViewProps {
  family: Family;
  onNavigate: (screen: ScreenId) => void;
  onSelectMemberForExam: (member: FamilyMember) => void;
  onAddMember: (newMember: FamilyMember) => void;
  onUpdateMember: (updatedMember: FamilyMember) => void;
}

export const FamilyMembersView: React.FC<FamilyMembersViewProps> = ({
  family,
  onNavigate,
  onSelectMemberForExam,
  onAddMember,
  onUpdateMember,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(family.members[1]?.id || family.members[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<FamilyMember | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // New Member Form state
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Son');
  const [newMemberAge, setNewMemberAge] = useState('');
  const [newMemberGender, setNewMemberGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newMemberOccupation, setNewMemberOccupation] = useState('');
  const [newMemberEducation, setNewMemberEducation] = useState('');
  const [newMemberMarital, setNewMemberMarital] = useState('Single');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSaveAction = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const initials = newMemberName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const created: FamilyMember = {
      id: `mem-${Date.now()}`,
      name: newMemberName,
      initials: initials || 'FM',
      relation: newMemberRelation,
      age: parseInt(newMemberAge) || 20,
      gender: newMemberGender,
      status: 'Pending Exam',
      dob: 'Jan 01, 2000',
      occupation: newMemberOccupation || 'Not Specified',
      education: newMemberEducation || 'Secondary',
      maritalStatus: newMemberMarital,
    };

    onAddMember(created);
    setShowAddModal(false);
    setNewMemberName('');
    setNewMemberAge('');
    setNewMemberOccupation('');
    setExpandedId(created.id);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f8f9ff]">
      {/* Action Bar (Top Secondary Bar) */}
      <div className="bg-[#d3e4fe] text-[#006194] sticky top-16 z-30 w-full shadow-xs flex justify-between items-center py-2 px-6 lg:px-8 shrink-0">
        <span className="text-xs italic text-[#3f4850] hidden sm:block font-medium">
          Roster Action Bar
        </span>
        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            onClick={handleSaveAction}
            className="text-[#3f4850] hover:bg-white/80 rounded-lg px-4 py-2 text-xs font-semibold active:scale-[0.98] transition-all"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => onNavigate('family-details')}
            className="border border-[#bfc7d2] text-[#006194] bg-white hover:bg-[#eff4ff] rounded-lg px-4 py-2 text-xs font-semibold active:scale-[0.98] transition-all"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => onNavigate('clinical-examination')}
            className="bg-[#006194] text-white hover:bg-[#007bb9] rounded-lg px-5 py-2 text-xs font-semibold active:scale-[0.98] transition-all shadow-xs flex items-center gap-1"
          >
            <span>Next</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full pb-32">
        {/* Header & Main Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1c30] tracking-tight mb-1">
              {family.familyName} Roster
            </h1>
            <p className="text-sm text-[#3f4850]">
              Manage individuals residing at Household ID: {family.code} ({family.village})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowHistoryModal(true)}
              className="border border-[#bfc7d2] text-[#006194] bg-white hover:bg-[#eff4ff] rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-semibold shadow-xs active:scale-98 transition-all min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>View History</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl px-5 py-2.5 flex items-center gap-2 text-xs font-semibold shadow-xs active:scale-98 transition-all min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white rounded-2xl shadow-xs border border-[#bfc7d2]/60 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#bfc7d2]/50 bg-[#eff4ff] text-xs font-bold text-[#3f4850] uppercase tracking-wider sticky top-0 z-10">
            <div className="col-span-4 lg:col-span-3">Name</div>
            <div className="col-span-3 lg:col-span-2 hidden sm:block">Relation</div>
            <div className="col-span-2 lg:col-span-1 hidden md:block">Age</div>
            <div className="col-span-2 lg:col-span-2 hidden lg:block">Gender</div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-3">Status</div>
            <div className="col-span-2 lg:col-span-1 text-right">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#bfc7d2]/30 text-sm text-[#0b1c30]">
            {family.members.map((member) => {
              const isExpanded = expandedId === member.id;
              return (
                <div key={member.id} className="transition-colors">
                  {/* Clickable Summary Row */}
                  <div
                    onClick={() => toggleExpand(member.id)}
                    className="grid grid-cols-12 gap-4 p-4 min-h-[60px] items-center hover:bg-[#eff4ff]/60 transition-colors cursor-pointer select-none"
                  >
                    {/* Name & Avatar */}
                    <div className="col-span-4 lg:col-span-3 font-semibold flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          member.isHead
                            ? 'bg-[#007bb9] text-white'
                            : member.gender === 'Female'
                            ? 'bg-[#ffdcc0] text-[#894d00]'
                            : 'bg-[#dce9ff] text-[#006194]'
                        }`}
                      >
                        {member.initials}
                      </div>
                      <span className="truncate">{member.name}</span>
                    </div>

                    {/* Relation */}
                    <div className="col-span-3 lg:col-span-2 hidden sm:block text-[#3f4850]">
                      {member.relation}
                    </div>

                    {/* Age */}
                    <div className="col-span-2 lg:col-span-1 hidden md:block text-[#3f4850]">
                      {member.age}
                    </div>

                    {/* Gender */}
                    <div className="col-span-2 lg:col-span-2 hidden lg:block text-[#3f4850]">
                      {member.gender}
                    </div>

                    {/* Status Badge */}
                    <div className="col-span-6 sm:col-span-3 lg:col-span-3 flex items-center gap-2">
                      {member.status === 'Examined' ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] shrink-0" />
                          <span className="text-xs font-semibold text-[#006a61]">Examined</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] shrink-0 animate-pulse" />
                          <span className="text-xs font-semibold text-[#ba1a1a]">Pending Exam</span>
                        </>
                      )}
                    </div>

                    {/* Expand Button */}
                    <div className="col-span-2 lg:col-span-1 flex justify-end">
                      <button
                        type="button"
                        aria-label="Expand details"
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[#707881] hover:bg-[#dce9ff] transition-all"
                      >
                        <span
                          className={`material-symbols-outlined transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#006194]' : ''
                          }`}
                        >
                          expand_more
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail Bento Card */}
                  {isExpanded && (
                    <div className="bg-[#f8f9ff] p-6 border-t border-[#bfc7d2]/30 flex flex-col lg:flex-row gap-6 shadow-inner animate-in fade-in duration-150">
                      {/* Left Profile Summary */}
                      <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-white border border-[#bfc7d2]/50 shadow-xs flex items-center justify-center text-[#006194] shrink-0">
                            <span className="material-symbols-outlined text-[36px]">
                              {member.gender === 'Female' ? 'face_3' : 'face'}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#0b1c30]">{member.name}</h3>
                            <p className="text-xs text-[#707881]">
                              ID: {family.code}-{member.id.slice(-2)}
                            </p>
                            <span className="inline-block mt-2 px-2.5 py-0.5 bg-[#86f2e4]/30 text-[#006f66] border border-[#006a61]/20 text-[11px] rounded-md font-semibold">
                              {member.relation}
                            </span>
                          </div>
                        </div>

                        {member.vitals && (
                          <div className="text-xs text-[#3f4850] bg-white p-3 rounded-xl border border-[#bfc7d2]/40">
                            <span className="font-semibold text-[#006194]">Recorded Vitals:</span>{' '}
                            BP {member.vitals.bpSys}/{member.vitals.bpDia} mmHg · Pulse {member.vitals.pulse} bpm · BMI {member.vitals.bmi}
                          </div>
                        )}
                      </div>

                      {/* Middle Details Grid */}
                      <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="bg-white p-3.5 rounded-xl border border-[#bfc7d2]/40 shadow-2xs">
                          <span className="text-[10px] text-[#707881] uppercase font-bold tracking-wider block mb-1">
                            Date of Birth
                          </span>
                          <span className="text-sm font-semibold text-[#0b1c30]">
                            {member.dob} ({member.age} yrs)
                          </span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-[#bfc7d2]/40 shadow-2xs">
                          <span className="text-[10px] text-[#707881] uppercase font-bold tracking-wider block mb-1">
                            Occupation
                          </span>
                          <span className="text-sm font-semibold text-[#0b1c30]">
                            {member.occupation}
                          </span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-[#bfc7d2]/40 shadow-2xs">
                          <span className="text-[10px] text-[#707881] uppercase font-bold tracking-wider block mb-1">
                            Education
                          </span>
                          <span className="text-sm font-semibold text-[#0b1c30]">
                            {member.education}
                          </span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-[#bfc7d2]/40 shadow-2xs">
                          <span className="text-[10px] text-[#707881] uppercase font-bold tracking-wider block mb-1">
                            Marital Status
                          </span>
                          <span className="text-sm font-semibold text-[#0b1c30]">
                            {member.maritalStatus}
                          </span>
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="w-full lg:w-auto flex lg:flex-col justify-end gap-2.5 mt-2 lg:mt-0">
                        {member.status === 'Pending Exam' ? (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectMemberForExam(member);
                              onNavigate('clinical-examination');
                            }}
                            className="bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-xl px-4 py-2.5 text-xs font-semibold active:scale-98 transition-all min-h-[44px] flex items-center justify-center gap-1.5 shadow-sm w-full lg:w-36"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              medical_services
                            </span>
                            <span>Start Exam</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectMemberForExam(member);
                              onNavigate('clinical-examination');
                            }}
                            className="bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl px-4 py-2.5 text-xs font-semibold active:scale-98 transition-all min-h-[44px] flex items-center justify-center gap-1.5 shadow-sm w-full lg:w-36"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              visibility
                            </span>
                            <span>View Exam</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setShowEditModal(member)}
                          className="border border-[#bfc7d2] text-[#006194] bg-white hover:bg-[#eff4ff] rounded-xl px-4 py-2.5 text-xs font-semibold active:scale-98 transition-all min-h-[44px] flex items-center justify-center gap-1.5 w-full lg:w-36 shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating Save Toast */}
      {saveToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#213145] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2.5 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[#86f2e4] text-[20px]">
            check_circle
          </span>
          <span className="text-xs font-semibold">Roster saved to device storage</span>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#bfc7d2]/60">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#0b1c30]">Add Family Member</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#707881] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Smith"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    Relationship *
                  </label>
                  <select
                    value={newMemberRelation}
                    onChange={(e) => setNewMemberRelation(e.target.value)}
                    className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                  >
                    <option value="Head of Household">Head of Household</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="120"
                    placeholder="e.g. 25"
                    value={newMemberAge}
                    onChange={(e) => setNewMemberAge(e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">Gender</label>
                  <select
                    value={newMemberGender}
                    onChange={(e) =>
                      setNewMemberGender(e.target.value as 'Male' | 'Female' | 'Other')
                    }
                    className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    Marital Status
                  </label>
                  <select
                    value={newMemberMarital}
                    onChange={(e) => setNewMemberMarital(e.target.value)}
                    className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Student / Farmer"
                    value={newMemberOccupation}
                    onChange={(e) => setNewMemberOccupation(e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    Education
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. High School"
                    value={newMemberEducation}
                    onChange={(e) => setNewMemberEducation(e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#bfc7d2]/30">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#707881] hover:bg-[#eff4ff] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold bg-[#006194] text-white hover:bg-[#007bb9] rounded-xl shadow-xs"
                >
                  Add to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#bfc7d2]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#0b1c30]">
                Edit: {showEditModal.name}
              </h3>
              <button
                type="button"
                onClick={() => setShowEditModal(null)}
                className="text-[#707881] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">Occupation</label>
                <input
                  type="text"
                  value={showEditModal.occupation}
                  onChange={(e) =>
                    setShowEditModal({ ...showEditModal, occupation: e.target.value })
                  }
                  className="w-full h-11 px-3.5 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">Education</label>
                <input
                  type="text"
                  value={showEditModal.education}
                  onChange={(e) =>
                    setShowEditModal({ ...showEditModal, education: e.target.value })
                  }
                  className="w-full h-11 px-3.5 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Marital Status
                </label>
                <input
                  type="text"
                  value={showEditModal.maritalStatus}
                  onChange={(e) =>
                    setShowEditModal({ ...showEditModal, maritalStatus: e.target.value })
                  }
                  className="w-full h-11 px-3.5 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#707881] hover:bg-[#eff4ff] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateMember(showEditModal);
                    setShowEditModal(null);
                  }}
                  className="px-5 py-2 text-xs font-semibold bg-[#006194] text-white hover:bg-[#007bb9] rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#bfc7d2]">
            <h3 className="text-lg font-bold text-[#0b1c30] mb-3">Family Roster History</h3>
            <div className="space-y-3 text-xs text-[#3f4850] max-h-60 overflow-y-auto">
              <div className="p-3 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2]/30">
                <p className="font-semibold text-[#006194]">Oct 14, 2023 · 14:10</p>
                <p>Member John Smith examined by Dr. Sarah Jenkins. Vitals logged.</p>
              </div>
              <div className="p-3 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2]/30">
                <p className="font-semibold text-[#006194]">Oct 02, 2023 · 10:30</p>
                <p>Initial household baseline completed. 5 members enumerated.</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 text-xs font-semibold bg-[#006194] text-white rounded-xl"
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
