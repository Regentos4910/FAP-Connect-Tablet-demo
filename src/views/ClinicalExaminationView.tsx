import React, { useState, useId } from 'react';
import { Family, FamilyMember, ScreenId, VitalSigns, ClinicalNotes } from '../types';

interface ClinicalExaminationViewProps {
  family: Family;
  currentMember: FamilyMember;
  onSelectMember: (member: FamilyMember) => void;
  onNavigate: (screen: ScreenId) => void;
  onSaveRecord: (memberId: string, vitals: VitalSigns, notes: ClinicalNotes) => void;
}

export const ClinicalExaminationView: React.FC<ClinicalExaminationViewProps> = ({
  family,
  currentMember,
  onSelectMember,
  onNavigate,
  onSaveRecord,
}) => {
  const member = currentMember || family.members[0];

  const heightId = useId();
  const weightId = useId();
  const pulseId = useId();
  const bpSysId = useId();
  const bpDiaId = useId();
  const respId = useId();
  const bsId = useId();
  const hbId = useId();
  const diagId = useId();
  const treatId = useId();
  const adviceId = useId();

  // Vitals State
  const [height, setHeight] = useState<number | string>(member.vitals?.height || 170.0);
  const [weight, setWeight] = useState<number | string>(member.vitals?.weight || 68.0);
  const [pulse, setPulse] = useState<number | string>(member.vitals?.pulse || 76);
  const [bpSys, setBpSys] = useState<number | string>(member.vitals?.bpSys || 120);
  const [bpDia, setBpDia] = useState<number | string>(member.vitals?.bpDia || 80);
  const [respRate, setRespRate] = useState<number | string>(member.vitals?.respRate || 16);
  const [bloodSugar, setBloodSugar] = useState<number | string>(member.vitals?.bloodSugar || 105);
  const [hemoglobin, setHemoglobin] = useState<number | string>(member.vitals?.hemoglobin || 13.2);

  // Notes State
  const [diagnosis, setDiagnosis] = useState(
    member.clinicalNotes?.diagnosis || 'General physical examination: No active acute distress.'
  );
  const [treatment, setTreatment] = useState(
    member.clinicalNotes?.treatment || 'Routine multivitamins & prophylactic deworming (Albendazole 400mg single dose).'
  );
  const [advice, setAdvice] = useState(
    member.clinicalNotes?.advice || 'Encourage hydration, boiled water usage, and personal hand hygiene.'
  );

  // Urine Table State
  const [urineProtein, setUrineProtein] = useState<'Nil' | 'Trace' | '1+' | '2+' | '3+'>(
    member.clinicalNotes?.urineProtein || 'Nil'
  );
  const [urineSugar, setUrineSugar] = useState<'Nil' | 'Trace' | '1+' | '2+' | '3+'>(
    member.clinicalNotes?.urineSugar || 'Nil'
  );
  const [urineKetones, setUrineKetones] = useState<'Negative' | 'Positive'>(
    member.clinicalNotes?.urineKetones || 'Negative'
  );
  const [remarks, setRemarks] = useState(member.clinicalNotes?.remarks || '-');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculate BMI live
  const numHeight = typeof height === 'number' ? height : parseFloat(height) || 0;
  const numWeight = typeof weight === 'number' ? weight : parseFloat(weight) || 0;
  const computedBmi =
    numHeight > 0 && numWeight > 0
      ? parseFloat((numWeight / Math.pow(numHeight / 100, 2)).toFixed(1))
      : 0;

  const getBmiCategory = (bmi: number) => {
    if (bmi <= 0) return { label: 'Auto', color: 'text-[#707881] bg-[#f8f9ff]' };
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-amber-700 bg-amber-50' };
    if (bmi < 25) return { label: 'Normal', color: 'text-emerald-700 bg-emerald-50' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-amber-700 bg-amber-50' };
    return { label: 'Obese', color: 'text-red-700 bg-red-50' };
  };

  const bmiCat = getBmiCategory(computedBmi);

  const handleSave = () => {
    const finalVitals: VitalSigns = {
      height: Number(height) || 0,
      weight: Number(weight) || 0,
      bmi: computedBmi,
      pulse: Number(pulse) || 0,
      bpSys: Number(bpSys) || 120,
      bpDia: Number(bpDia) || 80,
      respRate: Number(respRate) || 16,
      bloodSugar: Number(bloodSugar) || 100,
      hemoglobin: Number(hemoglobin) || 12.0,
    };

    const finalNotes: ClinicalNotes = {
      diagnosis,
      treatment,
      advice,
      urineProtein,
      urineSugar,
      urineKetones,
      remarks,
    };

    onSaveRecord(member.id, finalVitals, finalNotes);
    setToastMessage(`Examination record saved for ${member.name}! Marked as Examined.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f8f9ff]">
      {/* Top Action Bar */}
      <header className="sticky top-16 z-30 w-full bg-[#eff4ff] shadow-xs flex justify-between items-center py-2.5 px-6 lg:px-8 border-b border-[#bfc7d2]/50">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-[#0b1c30]">Clinical Examination</h2>
          <span className="text-xs italic text-[#3f4850] bg-white px-3 py-0.5 rounded-full border border-[#bfc7d2]/60 font-medium">
            Draft Mode
          </span>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button
            type="button"
            onClick={() => onNavigate('family-members')}
            className="text-xs font-semibold text-[#3f4850] hover:bg-white px-3 py-2 rounded-lg transition-colors flex items-center gap-1 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('summary')}
            className="text-xs font-semibold text-[#3f4850] hover:bg-white px-3 py-2 rounded-lg transition-colors flex items-center gap-1 active:scale-[0.98]"
          >
            <span>Next</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>

          <div className="h-6 w-px bg-[#bfc7d2] mx-1" />

          <button
            type="button"
            onClick={handleSave}
            className="text-xs font-bold bg-[#006194] text-white hover:bg-[#007bb9] px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 active:scale-[0.98] shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save Record</span>
          </button>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 p-6 lg:p-8 max-w-[1600px] mx-auto w-full pb-32">
        {/* Patient Context & Member Switcher */}
        <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 lg:p-5 mb-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center font-bold text-lg shrink-0 border border-[#006a61]/20">
              {member.initials}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-bold text-[#0b1c30]">{member.name}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#e5eeff] text-[#006194]">
                  {member.relation}
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-0.5">
                {member.age} yrs · {member.gender} · ID: {family.code}-{member.id.slice(-2)} · Household: {family.familyName}
              </p>
            </div>
          </div>

          {/* Quick Member Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#bfc7d2]/30">
            <span className="text-xs text-[#707881] font-medium hidden sm:inline">Examine Member:</span>
            <select
              value={member.id}
              onChange={(e) => {
                const found = family.members.find((m) => m.id === e.target.value);
                if (found) onSelectMember(found);
              }}
              className="h-10 px-3 bg-[#f8f9ff] border border-[#bfc7d2] rounded-xl text-xs font-semibold text-[#006194] outline-none"
            >
              {family.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.relation}) - {m.status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Two-Column Reflow Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Vitals (7 cols / ~60%) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[#bfc7d2]/40 pb-2">
              <h3 className="text-base font-bold text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006194]">monitor_heart</span>
                <span>Vital Signs</span>
              </h3>
              <span className="text-xs text-[#707881]">Recorded Today</span>
            </div>

            {/* Bento Grid for Vitals */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Height */}
              <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col gap-2 focus-within:border-[#006194] focus-within:ring-2 focus-within:ring-[#006194]/20 transition-all">
                <label htmlFor={heightId} className="text-xs font-semibold text-[#707881]">
                  Height
                </label>
                <div className="relative flex items-baseline">
                  <input
                    id={heightId}
                    type="number"
                    step="0.5"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent border-none p-0 text-3xl font-bold text-[#0b1c30] focus:ring-0 outline-none"
                  />
                  <span className="text-sm font-semibold text-[#707881] ml-1">cm</span>
                </div>
              </div>

              {/* Weight */}
              <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col gap-2 focus-within:border-[#006194] focus-within:ring-2 focus-within:ring-[#006194]/20 transition-all">
                <label htmlFor={weightId} className="text-xs font-semibold text-[#707881]">
                  Weight
                </label>
                <div className="relative flex items-baseline">
                  <input
                    id={weightId}
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent border-none p-0 text-3xl font-bold text-[#0b1c30] focus:ring-0 outline-none"
                  />
                  <span className="text-sm font-semibold text-[#707881] ml-1">kg</span>
                </div>
              </div>

              {/* BMI (Calculated Auto) */}
              <div className="bg-[#eff4ff] border border-[#bfc7d2]/50 rounded-2xl p-4 flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#707881]">BMI</span>
                <div className="flex items-baseline gap-2 mt-auto">
                  <span className="text-3xl font-bold text-[#006194]">
                    {computedBmi > 0 ? computedBmi : '--'}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md border border-current/20 ${bmiCat.color}`}
                  >
                    {bmiCat.label}
                  </span>
                </div>
              </div>

              {/* Pulse */}
              <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col gap-2 focus-within:border-[#006194] focus-within:ring-2 focus-within:ring-[#006194]/20 transition-all">
                <label htmlFor={pulseId} className="text-xs font-semibold text-[#707881]">
                  Pulse
                </label>
                <div className="relative flex items-baseline">
                  <input
                    id={pulseId}
                    type="number"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent border-none p-0 text-3xl font-bold text-[#0b1c30] focus:ring-0 outline-none"
                  />
                  <span className="text-sm font-semibold text-[#707881] ml-1">bpm</span>
                </div>
              </div>

              {/* Blood Pressure (Sys / Dia) */}
              <div className="col-span-2 bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col gap-2 focus-within:border-[#006194] focus-within:ring-2 focus-within:ring-[#006194]/20 transition-all">
                <label htmlFor={bpSysId} className="text-xs font-semibold text-[#707881]">
                  Blood Pressure (Sys / Dia)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id={bpSysId}
                    type="number"
                    value={bpSys}
                    onChange={(e) => setBpSys(e.target.value)}
                    placeholder="120"
                    className="w-20 text-center bg-transparent border-b-2 border-[#bfc7d2] pb-1 text-3xl font-bold text-[#0b1c30] focus:border-[#006194] focus:ring-0 outline-none"
                  />
                  <span className="text-2xl text-[#707881] font-light">/</span>
                  <input
                    id={bpDiaId}
                    type="number"
                    value={bpDia}
                    onChange={(e) => setBpDia(e.target.value)}
                    placeholder="80"
                    className="w-20 text-center bg-transparent border-b-2 border-[#bfc7d2] pb-1 text-3xl font-bold text-[#0b1c30] focus:border-[#006194] focus:ring-0 outline-none"
                  />
                  <span className="text-sm font-semibold text-[#707881] ml-2">mmHg</span>
                </div>
              </div>

              {/* Respiratory Rate */}
              <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col gap-2 focus-within:border-[#006194] focus-within:ring-2 focus-within:ring-[#006194]/20 transition-all">
                <label htmlFor={respId} className="text-xs font-semibold text-[#707881]">
                  Resp. Rate
                </label>
                <div className="relative flex items-baseline">
                  <input
                    id={respId}
                    type="number"
                    value={respRate}
                    onChange={(e) => setRespRate(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent border-none p-0 text-3xl font-bold text-[#0b1c30] focus:ring-0 outline-none"
                  />
                  <span className="text-sm font-semibold text-[#707881] ml-1">/min</span>
                </div>
              </div>

              {/* Blood Sugar (RBS) */}
              <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col gap-2 focus-within:border-[#006194] focus-within:ring-2 focus-within:ring-[#006194]/20 transition-all">
                <label htmlFor={bsId} className="text-xs font-semibold text-[#707881]">
                  Blood Sugar (RBS)
                </label>
                <div className="relative flex items-baseline">
                  <input
                    id={bsId}
                    type="number"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent border-none p-0 text-3xl font-bold text-[#0b1c30] focus:ring-0 outline-none"
                  />
                  <span className="text-xs font-semibold text-[#707881] ml-1">mg/dL</span>
                </div>
              </div>

              {/* Hemoglobin */}
              <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col gap-2 focus-within:border-[#006194] focus-within:ring-2 focus-within:ring-[#006194]/20 transition-all">
                <label htmlFor={hbId} className="text-xs font-semibold text-[#707881]">
                  Hemoglobin
                </label>
                <div className="relative flex items-baseline">
                  <input
                    id={hbId}
                    type="number"
                    step="0.1"
                    value={hemoglobin}
                    onChange={(e) => setHemoglobin(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent border-none p-0 text-3xl font-bold text-[#0b1c30] focus:ring-0 outline-none"
                  />
                  <span className="text-xs font-semibold text-[#707881] ml-1">g/dL</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Clinical Notes & Urine Findings (5 cols / ~40%) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Clinical Notes Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#bfc7d2]/40 pb-2">
                <h3 className="text-base font-bold text-[#0b1c30] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194]">edit_note</span>
                  <span>Clinical Notes</span>
                </h3>
              </div>

              {/* Diagnosis */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={diagId} className="text-xs font-semibold text-[#0b1c30]">
                  Diagnosis / Impression
                </label>
                <textarea
                  id={diagId}
                  rows={3}
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Enter clinical diagnosis or diagnostic impression..."
                  className="w-full bg-white border border-[#bfc7d2] rounded-xl p-3.5 text-sm text-[#0b1c30] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none shadow-2xs resize-y"
                />
              </div>

              {/* Treatment */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={treatId} className="text-xs font-semibold text-[#0b1c30]">
                  Treatment Plan
                </label>
                <textarea
                  id={treatId}
                  rows={3}
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  placeholder="Prescriptions, procedures, dosage, next steps..."
                  className="w-full bg-white border border-[#bfc7d2] rounded-xl p-3.5 text-sm text-[#0b1c30] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none shadow-2xs resize-y"
                />
              </div>

              {/* Lifestyle Advice */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={adviceId} className="text-xs font-semibold text-[#0b1c30]">
                  Lifestyle &amp; Dietary Advice
                </label>
                <textarea
                  id={adviceId}
                  rows={2}
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  placeholder="Dietary changes, exercise, counseling..."
                  className="w-full bg-white border border-[#bfc7d2] rounded-xl p-3.5 text-sm text-[#0b1c30] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none shadow-2xs resize-y"
                />
              </div>
            </div>

            {/* Urine Findings Table */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#bfc7d2]/40 pb-2">
                <h3 className="text-base font-bold text-[#0b1c30] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194]">science</span>
                  <span>Urine Findings</span>
                </h3>
              </div>

              <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#eff4ff] border-b border-[#bfc7d2]/50 text-xs font-bold text-[#3f4850]">
                      <th className="p-3.5 w-1/3">Parameter</th>
                      <th className="p-3.5 w-1/3">Result</th>
                      <th className="p-3.5 w-1/3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-[#0b1c30] divide-y divide-[#bfc7d2]/30">
                    {/* Protein */}
                    <tr className="hover:bg-[#f8f9ff]">
                      <td className="p-3.5 font-semibold">Protein</td>
                      <td className="p-2">
                        <select
                          value={urineProtein}
                          onChange={(e) => setUrineProtein(e.target.value as any)}
                          className="w-full bg-white border border-[#bfc7d2] rounded-lg px-2.5 py-1.5 text-xs font-medium focus:border-[#006194] outline-none"
                        >
                          <option value="Nil">Nil</option>
                          <option value="Trace">Trace</option>
                          <option value="1+">1+</option>
                          <option value="2+">2+</option>
                          <option value="3+">3+</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder="-"
                          className="w-full bg-transparent border-b border-[#bfc7d2] px-2 py-1 text-xs outline-none focus:border-[#006194]"
                        />
                      </td>
                    </tr>

                    {/* Sugar */}
                    <tr className="hover:bg-[#f8f9ff]">
                      <td className="p-3.5 font-semibold">Sugar</td>
                      <td className="p-2">
                        <select
                          value={urineSugar}
                          onChange={(e) => setUrineSugar(e.target.value as any)}
                          className="w-full bg-white border border-[#bfc7d2] rounded-lg px-2.5 py-1.5 text-xs font-medium focus:border-[#006194] outline-none"
                        >
                          <option value="Nil">Nil</option>
                          <option value="Trace">Trace</option>
                          <option value="1+">1+</option>
                          <option value="2+">2+</option>
                          <option value="3+">3+</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          placeholder="-"
                          className="w-full bg-transparent border-b border-[#bfc7d2] px-2 py-1 text-xs outline-none focus:border-[#006194]"
                        />
                      </td>
                    </tr>

                    {/* Ketones */}
                    <tr className="hover:bg-[#f8f9ff]">
                      <td className="p-3.5 font-semibold">Ketones</td>
                      <td className="p-2">
                        <select
                          value={urineKetones}
                          onChange={(e) => setUrineKetones(e.target.value as any)}
                          className="w-full bg-white border border-[#bfc7d2] rounded-lg px-2.5 py-1.5 text-xs font-medium focus:border-[#006194] outline-none"
                        >
                          <option value="Negative">Negative</option>
                          <option value="Positive">Positive</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          placeholder="-"
                          className="w-full bg-transparent border-b border-[#bfc7d2] px-2 py-1 text-xs outline-none focus:border-[#006194]"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Save Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#213145] text-white px-5 py-3.5 rounded-full shadow-xl flex items-center gap-3 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[#86f2e4] text-[20px]">
            check_circle
          </span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
