import React, { useState } from 'react';
import { Family } from '../types';

interface SectionModalProps {
  sectionKey: string | null;
  family: Family;
  onClose: () => void;
  onSave: (sectionKey: string, data: any) => void;
}

export const SectionModal: React.FC<SectionModalProps> = ({
  sectionKey,
  family,
  onClose,
  onSave,
}) => {
  if (!sectionKey) return null;

  // Local form state based on section
  const [housingType, setHousingType] = useState(family.housingType);
  const [sanitation, setSanitation] = useState(family.sanitation);
  const [waterSource, setWaterSource] = useState('Piped Tap Water in Yard');
  const [wasteDisposal, setWasteDisposal] = useState('Community Waste Bin');
  const [ventilation, setVentilation] = useState('Adequate cross-ventilation');

  // Economic Data
  const [income, setIncome] = useState('12,000');
  const [cardType, setCardType] = useState(family.cardType);
  const [bplCategory, setBplCategory] = useState(family.incomeCategory);
  const [debts, setDebts] = useState('No outstanding institutional debt');

  // TB Screening
  const [coughOver2Weeks, setCoughOver2Weeks] = useState(family.tbCases > 0);
  const [nightSweats, setNightSweats] = useState(family.tbCases > 0);
  const [weightLoss, setWeightLoss] = useState(family.tbCases > 0);
  const [dotsActive, setDotsActive] = useState(family.tbCases > 0);
  const [nikshayId, setNikshayId] = useState('NK-2023-89410');

  // Lab
  const [malariaRdt, setMalariaRdt] = useState('Negative');
  const [sputumResult, setSputumResult] = useState(family.tbCases > 0 ? '1+ Positive' : 'Negative');
  const [rapidHb, setRapidHb] = useState('11.4');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSave(sectionKey, {
      housingType,
      sanitation,
      waterSource,
      wasteDisposal,
      income,
      cardType,
      bplCategory,
      coughOver2Weeks,
      nightSweats,
      weightLoss,
      dotsActive,
      nikshayId,
      malariaRdt,
      sputumResult,
      rapidHb,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const getSectionTitle = () => {
    switch (sectionKey) {
      case 'housing':
        return 'Housing & Environmental Conditions';
      case 'economic-data':
        return 'Socio-Economic & Asset Inventory';
      case 'social-history':
        return 'Social, Dietary & Addiction History';
      case 'laboratory':
        return 'Point-of-Care Laboratory Investigations';
      case 'vital-events':
        return 'Vital Events (Births & Mortality Records)';
      case 'tb-screening':
        return 'Tuberculosis & Airborne Screening';
      default:
        return 'Questionnaire Module';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#bfc7d2]/60 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-[#bfc7d2]/40 mb-6">
          <div>
            <span className="text-[11px] font-bold text-[#006194] uppercase tracking-wider">
              Household #{family.code} · {family.familyName}
            </span>
            <h3 className="text-xl font-bold text-[#0b1c30]">{getSectionTitle()}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#707881] hover:text-[#0b1c30] p-1 rounded-lg"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="bg-[#86f2e4]/30 border border-[#006a61]/30 text-[#006f66] p-4 rounded-xl text-xs font-semibold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Module data successfully committed to household file and offline queue!</span>
          </div>
        )}

        {/* Dynamic Form Content */}
        {sectionKey === 'housing' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Type of Dwelling / Structure
                </label>
                <select
                  value={housingType}
                  onChange={(e) => setHousingType(e.target.value as any)}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                >
                  <option value="Kutcha House">Kutcha House (Mud/Thatch)</option>
                  <option value="Semi-Pucca">Semi-Pucca (Brick &amp; Asbestos)</option>
                  <option value="Pucca House">Pucca House (Concrete &amp; Cement)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Sanitation Facility
                </label>
                <select
                  value={sanitation}
                  onChange={(e) => setSanitation(e.target.value as any)}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                >
                  <option value="Adequate">Adequate (Individual Flush Latrine)</option>
                  <option value="Inadequate Sanitation">Inadequate Sanitation (Shared/Pit)</option>
                  <option value="Open Defecation">Open Defecation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Drinking Water Source
                </label>
                <input
                  type="text"
                  value={waterSource}
                  onChange={(e) => setWaterSource(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Solid Waste Disposal
                </label>
                <input
                  type="text"
                  value={wasteDisposal}
                  onChange={(e) => setWasteDisposal(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                Ventilation &amp; Natural Lighting Notes
              </label>
              <textarea
                rows={3}
                value={ventilation}
                onChange={(e) => setVentilation(e.target.value)}
                className="w-full p-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
              />
            </div>
          </div>
        )}

        {sectionKey === 'economic-data' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Monthly Household Income (INR / local)
                </label>
                <input
                  type="text"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Ration Card Type
                </label>
                <select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                >
                  <option value="Red (Antyodaya)">Red (Antyodaya - Poorest)</option>
                  <option value="Yellow Card">Yellow Card (BPL Standard)</option>
                  <option value="White Card">White Card (APL Standard)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                Outstanding Debts &amp; Loan Status
              </label>
              <input
                type="text"
                value={debts}
                onChange={(e) => setDebts(e.target.value)}
                className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
              />
            </div>
          </div>
        )}

        {sectionKey === 'tb-screening' && (
          <div className="space-y-4">
            <div className="p-3 bg-[#ffdad6]/20 border border-[#ba1a1a]/30 rounded-xl text-xs text-[#93000a]">
              National Tuberculosis Elimination Programme (NTEP) Presumptive TB Screening Checklist.
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-2.5 rounded-xl border border-[#bfc7d2]/40 hover:bg-[#f8f9ff] cursor-pointer">
                <input
                  type="checkbox"
                  checked={coughOver2Weeks}
                  onChange={(e) => setCoughOver2Weeks(e.target.checked)}
                  className="w-4 h-4 text-[#ba1a1a] rounded"
                />
                <span className="text-xs font-semibold text-[#0b1c30]">
                  Any household member having persistent cough &gt; 2 weeks
                </span>
              </label>

              <label className="flex items-center gap-3 p-2.5 rounded-xl border border-[#bfc7d2]/40 hover:bg-[#f8f9ff] cursor-pointer">
                <input
                  type="checkbox"
                  checked={nightSweats}
                  onChange={(e) => setNightSweats(e.target.checked)}
                  className="w-4 h-4 text-[#ba1a1a] rounded"
                />
                <span className="text-xs font-semibold text-[#0b1c30]">
                  Evening rise of temperature or profuse night sweats
                </span>
              </label>

              <label className="flex items-center gap-3 p-2.5 rounded-xl border border-[#bfc7d2]/40 hover:bg-[#f8f9ff] cursor-pointer">
                <input
                  type="checkbox"
                  checked={weightLoss}
                  onChange={(e) => setWeightLoss(e.target.checked)}
                  className="w-4 h-4 text-[#ba1a1a] rounded"
                />
                <span className="text-xs font-semibold text-[#0b1c30]">
                  Unexplained significant weight loss or loss of appetite
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Active DOTS / Nikshay ID
                </label>
                <input
                  type="text"
                  value={nikshayId}
                  onChange={(e) => setNikshayId(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  DOTS Adherence Status
                </label>
                <select
                  value={dotsActive ? 'Active' : 'Not On Treatment'}
                  onChange={(e) => setDotsActive(e.target.value === 'Active')}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                >
                  <option value="Active">Active DOTS Regimen</option>
                  <option value="Not On Treatment">Not On Treatment</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {(sectionKey === 'laboratory' ||
          sectionKey === 'social-history' ||
          sectionKey === 'vital-events') && (
          <div className="space-y-4">
            <div className="p-3 bg-[#eff4ff] border border-[#bfc7d2]/50 rounded-xl text-xs text-[#006194]">
              Field records for {getSectionTitle()}. Verified by primary intern.
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Primary Biomarker / Finding
                </label>
                <input
                  type="text"
                  value={rapidHb}
                  onChange={(e) => setRapidHb(e.target.value)}
                  placeholder="e.g. Rapid Hb 11.4 g/dL"
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                  Field Test Result
                </label>
                <input
                  type="text"
                  value={malariaRdt}
                  onChange={(e) => setMalariaRdt(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                Clinical Observation &amp; Follow-Up Schedule
              </label>
              <textarea
                rows={3}
                placeholder="Enter field notes, referral notes, or Anganwadi coordinator remarks..."
                className="w-full p-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs"
                defaultValue="Field screening verified with ASHA worker. Next routine follow-up in 4 weeks."
              />
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-[#bfc7d2]/40 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-[#707881] hover:bg-[#eff4ff] rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 text-xs font-bold bg-[#006194] text-white hover:bg-[#007bb9] rounded-xl shadow-xs"
          >
            Save Module Data
          </button>
        </div>
      </div>
    </div>
  );
};
