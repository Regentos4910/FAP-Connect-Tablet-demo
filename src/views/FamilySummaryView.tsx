import React, { useState } from 'react';
import { Family, ScreenId } from '../types';

interface FamilySummaryViewProps {
  family: Family;
  onNavigate: (screen: ScreenId) => void;
}

export const FamilySummaryView: React.FC<FamilySummaryViewProps> = ({
  family,
  onNavigate,
}) => {
  const [printSuccess, setPrintSuccess] = useState(false);

  const handlePrint = () => {
    setPrintSuccess(true);
    setTimeout(() => {
      window.print();
      setPrintSuccess(false);
    }, 200);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#f8f9ff] pb-32">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#0b1c30] tracking-tight mb-2">
              Family Summary
            </h1>
            <p className="text-base text-[#3f4850]">
              Comprehensive health and socio-economic overview for Household #{family.code} ({family.familyName}).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="h-12 px-6 rounded-full border border-[#bfc7d2] bg-white text-[#006194] hover:bg-[#eff4ff] transition-colors text-xs font-bold flex items-center gap-2 shadow-2xs active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Print Report</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('family-details')}
              className="h-12 px-6 rounded-full bg-[#006194] text-white hover:bg-[#007bb9] transition-colors text-xs font-bold flex items-center gap-2 shadow-xs active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Update Data</span>
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* ROW 1: High Level Stats */}

          {/* Family Size (3 cols) */}
          <div className="col-span-1 md:col-span-3 bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6 flex flex-col justify-between min-h-[168px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#cce5ff]/30 rounded-bl-full pointer-events-none -mr-4 -mt-4" />
            <div className="flex items-center gap-2 text-[#3f4850] mb-4">
              <span className="material-symbols-outlined text-[#006194]">group</span>
              <h3 className="text-base font-bold text-[#0b1c30]">Family Size</h3>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0b1c30] tracking-tight">
                {family.memberCount}
              </div>
              <p className="text-xs text-[#707881] mt-1">Total Members Registered</p>
            </div>
          </div>

          {/* Demographics Breakdown (6 cols) */}
          <div className="col-span-1 md:col-span-6 bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6 flex flex-col min-h-[168px]">
            <h3 className="text-base font-bold text-[#0b1c30] mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006194]">pie_chart</span>
              <span>Vulnerable Demographics</span>
            </h3>

            <div className="flex-1 flex items-center justify-around">
              {/* Children */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#86f2e4]/30 text-[#006f66] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-2xl">child_care</span>
                </div>
                <span className="text-2xl font-bold text-[#0b1c30]">3</span>
                <span className="text-xs text-[#707881]">Children (&lt;5y)</span>
              </div>

              <div className="w-px h-14 bg-[#bfc7d2]/40" />

              {/* Pregnant */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#ffdcc0] text-[#894d00] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-2xl">pregnant_woman</span>
                </div>
                <span className="text-2xl font-bold text-[#0b1c30]">1</span>
                <span className="text-xs text-[#707881]">Pregnant</span>
              </div>

              <div className="w-px h-14 bg-[#bfc7d2]/40" />

              {/* Senior Citizens */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#d3e4fe] text-[#006194] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-2xl">elderly</span>
                </div>
                <span className="text-2xl font-bold text-[#0b1c30]">1</span>
                <span className="text-xs text-[#707881]">Senior Citizens</span>
              </div>
            </div>
          </div>

          {/* Socio-Economic Status (3 cols) */}
          <div className="col-span-1 md:col-span-3 bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6 flex flex-col min-h-[168px]">
            <div className="flex items-center gap-2 text-[#3f4850] mb-4">
              <span className="material-symbols-outlined text-[#006194]">
                account_balance_wallet
              </span>
              <h3 className="text-base font-bold text-[#0b1c30]">Income Category</h3>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 bg-[#ffdad6] text-[#93000a] px-3 py-1 rounded-full text-xs font-bold w-max mb-2">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                <span>{family.incomeCategory}</span>
              </div>
              <p className="text-xs text-[#3f4850] mt-1 font-medium">
                Card Type: {family.cardType}
              </p>
            </div>
          </div>

          {/* ROW 2: Health Risks & Indicators (Critical) */}

          {/* Clinical Risk Flags (8 cols) */}
          <div className="col-span-1 md:col-span-8 bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6 flex flex-col">
            <h3 className="text-lg font-bold text-[#0b1c30] mb-6 flex items-center gap-2 border-b border-[#bfc7d2]/40 pb-4">
              <span className="material-symbols-outlined text-[#ba1a1a]">health_and_safety</span>
              <span>Clinical Risk Flags</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* TB Cases Detected */}
              <div className="bg-[#ffdad6]/20 border border-[#ffdad6] rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">coronavirus</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3f4850] uppercase tracking-wider">
                    TB Cases Detected
                  </h4>
                  <div className="text-2xl font-bold text-[#ba1a1a] my-0.5">
                    {family.tbCases} Active
                  </div>
                  <p className="text-xs text-[#707881]">
                    {family.tbCaseDetails || 'Member: Ramesh (45M) - On DOTS therapy.'}
                  </p>
                </div>
              </div>

              {/* Anaemia Risk */}
              <div className="bg-[#eff4ff] border border-[#bfc7d2]/60 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">bloodtype</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3f4850] uppercase tracking-wider">
                    Anaemia Risk
                  </h4>
                  <div className="text-2xl font-bold text-[#0b1c30] my-0.5">
                    {family.anaemiaRiskCount} Severe
                  </div>
                  <p className="text-xs text-[#707881]">Requires iron supplements follow-up.</p>
                </div>
              </div>

              {/* Underweight */}
              <div className="bg-[#eff4ff] border border-[#bfc7d2]/60 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#006a61] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">scale</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3f4850] uppercase tracking-wider">
                    Underweight (SAM/MAM)
                  </h4>
                  <div className="text-2xl font-bold text-[#0b1c30] my-0.5">
                    {family.underweightCount} MAM
                  </div>
                  <p className="text-xs text-[#707881]">
                    Child under 5. Nutritional intervention needed.
                  </p>
                </div>
              </div>

              {/* Overweight / Obesity */}
              <div className="bg-[#f8f9ff] border border-[#bfc7d2]/40 rounded-2xl p-4 flex items-start gap-3.5 opacity-70">
                <div className="w-10 h-10 rounded-full bg-[#bfc7d2] text-[#3f4850] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">monitor_weight</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3f4850] uppercase tracking-wider">
                    Overweight / Obesity
                  </h4>
                  <div className="text-2xl font-bold text-[#0b1c30] my-0.5">0</div>
                  <p className="text-xs text-[#707881]">No members flagged.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Environment & Social (4 cols) */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
            {/* Housing Quality */}
            <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6 flex flex-col justify-center items-center text-center">
              <div className="flex items-center gap-2 text-[#3f4850] self-start mb-3">
                <span className="material-symbols-outlined text-[#006194]">house</span>
                <h3 className="text-base font-bold text-[#0b1c30]">Housing Quality</h3>
              </div>
              <div className="w-14 h-14 rounded-full bg-[#d3e4fe] text-[#006194] flex items-center justify-center mb-2.5">
                <span className="material-symbols-outlined text-[28px]">roofing</span>
              </div>
              <span className="text-lg font-bold text-[#0b1c30]">{family.housingType}</span>
              <span className="text-xs font-semibold text-[#894d00] mt-2 px-3.5 py-1 bg-[#ffdcc0]/70 rounded-full">
                {family.sanitation}
              </span>
            </div>

            {/* Education Status */}
            <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6 flex flex-col">
              <div className="flex items-center gap-2 text-[#3f4850] mb-3">
                <span className="material-symbols-outlined text-[#006194]">school</span>
                <h3 className="text-base font-bold text-[#0b1c30]">Education Status</h3>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-4xl font-bold text-[#894d00]">
                  {family.schoolDropoutsCount}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0b1c30]">School Dropout</h4>
                  <p className="text-xs text-[#707881]">
                    {family.schoolDropoutDetails || '14 year old female.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
