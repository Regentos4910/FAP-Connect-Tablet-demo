import React, { useState } from 'react';
import { Family, ScreenId } from '../types';

interface GeneralInfoFormViewProps {
  family: Family;
  onNavigate: (screen: ScreenId) => void;
  onUpdateFamily: (updated: Family) => void;
}

export const GeneralInfoFormView: React.FC<GeneralInfoFormViewProps> = ({
  family,
  onNavigate,
  onUpdateFamily,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: General Info Fields
  const [firstName, setFirstName] = useState(
    family.headName ? family.headName.split(' ')[0] : 'Robert'
  );
  const [lastName, setLastName] = useState(
    family.headName ? family.headName.split(' ').slice(1).join(' ') : 'Nkosi'
  );
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [nationalId, setNationalId] = useState(family.nationalId || '84021');
  const [primaryPhone, setPrimaryPhone] = useState(
    family.primaryPhone ? family.primaryPhone.replace(/^\+\d+\s*/, '') : '81 234 5678'
  );
  const [countryCode, setCountryCode] = useState(
    family.primaryPhone && family.primaryPhone.startsWith('+91') ? '+91' : '+27'
  );
  const [altPhone, setAltPhone] = useState(
    family.altPhone ? family.altPhone.replace(/^\+\d+\s*/, '') : ''
  );
  const [notes, setNotes] = useState(
    family.notes || 'Brief notes regarding the general information gathering process...'
  );

  // Step 2: Location Fields
  const [village, setVillage] = useState(family.village || 'Kadarpur');
  const [houseNo, setHouseNo] = useState(family.houseNo || '42-B');
  const [sector, setSector] = useState(family.sector || 'North Sector');
  const [landmark, setLandmark] = useState('Near Primary Health Sub-Centre');

  // Step 3: Consent Fields
  const [consentGiven, setConsentGiven] = useState(family.consented);
  const [informantName, setInformantName] = useState(family.headName || 'Robert Nkosi');
  const [consentWitness, setConsentWitness] = useState('Dr. Sarah Jenkins');

  const [showSavedPill, setShowSavedPill] = useState(true);

  // National ID validation: must be 13 digits
  const idDigitsOnly = nationalId.replace(/\D/g, '');
  const isIdInvalid = nationalId.length > 0 && idDigitsOnly.length !== 13;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      // Save and navigate to Family Details
      const updated: Family = {
        ...family,
        headName: `${firstName} ${lastName}`.trim(),
        nationalId,
        primaryPhone: `${countryCode} ${primaryPhone}`.trim(),
        altPhone: altPhone ? `${countryCode} ${altPhone}`.trim() : undefined,
        notes,
        village,
        houseNo,
        sector,
        consented: consentGiven,
      };
      onUpdateFamily(updated);
      onNavigate('family-details');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    } else {
      onNavigate('family-details');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f8f9ff]">
      {/* Top Action / Stepper Bar */}
      <div className="bg-[#eff4ff] text-[#006194] sticky top-16 z-30 w-full shadow-xs flex justify-between items-center py-3 px-6 lg:px-8 border-b border-[#bfc7d2]/50 shrink-0">
        {/* Stepper Progress */}
        <div className="flex items-center gap-2 flex-1 max-w-xl">
          {/* Step 1 */}
          <div
            className={`flex items-center cursor-pointer ${
              currentStep === 1 ? 'opacity-100 font-bold' : 'opacity-70'
            }`}
            onClick={() => setCurrentStep(1)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${
                currentStep >= 1 ? 'bg-[#006194] text-white' : 'bg-white border border-[#bfc7d2] text-[#3f4850]'
              }`}
            >
              1
            </div>
            <span className="ml-2 text-xs text-[#006194] hidden sm:block">General Info</span>
          </div>

          <div className={`h-0.5 flex-1 mx-2 ${currentStep > 1 ? 'bg-[#006194]' : 'bg-[#bfc7d2]/60'}`} />

          {/* Step 2 */}
          <div
            className={`flex items-center cursor-pointer ${
              currentStep === 2 ? 'opacity-100 font-bold' : 'opacity-70'
            }`}
            onClick={() => setCurrentStep(2)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= 2 ? 'bg-[#006194] text-white' : 'bg-white border border-[#bfc7d2] text-[#3f4850]'
              }`}
            >
              2
            </div>
            <span className="ml-2 text-xs text-[#3f4850] hidden sm:block">Location</span>
          </div>

          <div className={`h-0.5 flex-1 mx-2 ${currentStep > 2 ? 'bg-[#006194]' : 'bg-[#bfc7d2]/60'}`} />

          {/* Step 3 */}
          <div
            className={`flex items-center cursor-pointer ${
              currentStep === 3 ? 'opacity-100 font-bold' : 'opacity-70'
            }`}
            onClick={() => setCurrentStep(3)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === 3 ? 'bg-[#006194] text-white' : 'bg-white border border-[#bfc7d2] text-[#3f4850]'
              }`}
            >
              3
            </div>
            <span className="ml-2 text-xs text-[#3f4850] hidden sm:block">Consent</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 ml-4">
          <span className="text-xs italic text-[#707881] hidden md:block">Auto-saving...</span>
          <button
            type="button"
            onClick={handlePrevious}
            className="text-xs font-semibold text-[#3f4850] hover:bg-white rounded-xl px-4 py-2 border border-[#bfc7d2] transition-colors"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="text-xs font-semibold bg-[#006194] text-white hover:bg-[#007bb9] rounded-xl px-5 py-2 shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>{currentStep === 3 ? 'Complete & Save' : 'Next'}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Scrollable Form Body */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Header Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0b1c30] mb-1">
              {currentStep === 1
                ? 'General Information'
                : currentStep === 2
                ? 'Household Location & Geographic Data'
                : 'Informed Consent & Verification'}
            </h2>
            <p className="text-sm text-[#3f4850]">
              {currentStep === 1
                ? 'Please complete the primary demographic and contact details for the assigned family unit. Fields marked with an asterisk (*) are required.'
                : currentStep === 2
                ? 'Record geographic coordinates, physical house numbers, and village sub-centre sector identifiers.'
                : 'Verify subject informed consent per ethical guidelines for community medicine surveillance.'}
            </p>
          </div>

          {/* STEP 1: GENERAL INFO */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Card 1: Head of Household */}
              <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6">
                <h3 className="text-base font-bold text-[#0b1c30] mb-5 pb-3 border-b border-[#bfc7d2]/30">
                  Head of Household
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* First Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0b1c30]">
                      First Name <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Robert"
                      className="w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none text-sm text-[#0b1c30]"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0b1c30]">
                      Last Name <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Nkosi"
                      className="w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none text-sm text-[#0b1c30]"
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0b1c30]">
                      Gender <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full h-12 px-4 appearance-none bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none text-sm text-[#0b1c30]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#707881] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* National ID / Passport */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0b1c30]">
                      National ID / Passport <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="Enter 13-digit ID"
                      className={`w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border transition-all text-sm text-[#0b1c30] outline-none ${
                        isIdInvalid
                          ? 'border-[#ba1a1a] ring-2 ring-[#ba1a1a]/20 bg-[#ffdad6]/10'
                          : 'border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20'
                      }`}
                    />
                    {isIdInvalid && (
                      <p className="text-xs text-[#ba1a1a] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        <span>ID number must be 13 digits long.</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Contact Information */}
              <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6">
                <h3 className="text-base font-bold text-[#0b1c30] mb-5 pb-3 border-b border-[#bfc7d2]/30">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Primary Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0b1c30]">
                      Primary Phone <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="flex">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-12 px-3 bg-[#e5eeff] rounded-l-xl border border-r-0 border-[#bfc7d2] text-sm text-[#006194] font-semibold outline-none"
                      >
                        <option value="+27">+27</option>
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                      <input
                        type="tel"
                        value={primaryPhone}
                        onChange={(e) => setPrimaryPhone(e.target.value)}
                        placeholder="81 234 5678"
                        className="flex-1 h-12 px-4 bg-[#f8f9ff] rounded-r-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none text-sm text-[#0b1c30]"
                      />
                    </div>
                  </div>

                  {/* Alternative Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0b1c30]">
                      Alternative Phone
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3.5 bg-[#e5eeff] rounded-l-xl border border-r-0 border-[#bfc7d2] text-sm text-[#3f4850] font-medium">
                        {countryCode}
                      </span>
                      <input
                        type="tel"
                        value={altPhone}
                        onChange={(e) => setAltPhone(e.target.value)}
                        placeholder="Optional"
                        className="flex-1 h-12 px-4 bg-[#f8f9ff] rounded-r-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none text-sm text-[#0b1c30]"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-[#0b1c30]">
                      Interview Notes / Observations
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Brief notes regarding the general information gathering process..."
                      className="w-full p-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 outline-none text-sm text-[#0b1c30] resize-y"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6 space-y-5">
              <h3 className="text-base font-bold text-[#0b1c30] pb-3 border-b border-[#bfc7d2]/30">
                Geographic &amp; Household Placement
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    Village / Locality *
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] text-sm text-[#0b1c30]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    House Number / Plot *
                  </label>
                  <input
                    type="text"
                    value={houseNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                    className="w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] text-sm text-[#0b1c30]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">Sector</label>
                  <input
                    type="text"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] text-sm text-[#0b1c30]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    Landmark / Nearest Facility
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] text-sm text-[#0b1c30]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CONSENT */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs p-6 space-y-5">
              <h3 className="text-base font-bold text-[#0b1c30] pb-3 border-b border-[#bfc7d2]/30">
                Informed Consent Record
              </h3>

              <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#bfc7d2]/50 text-xs text-[#3f4850] space-y-2">
                <p className="font-semibold text-[#006194]">
                  Family Adoption Programme (FAP) Protocol Agreement
                </p>
                <p>
                  The head of the household or authorized respondent has received information in their vernacular language regarding longitudinal health monitoring, demographic surveys, and voluntary participation.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2]/40">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="w-5 h-5 text-[#006194] rounded focus:ring-0 mt-0.5 cursor-pointer"
                />
                <label htmlFor="consent" className="text-xs font-semibold text-[#0b1c30] cursor-pointer">
                  Informed voluntary consent obtained from respondent for household health visits and data retention.
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    Informant / Respondent Name
                  </label>
                  <input
                    type="text"
                    value={informantName}
                    onChange={(e) => setInformantName(e.target.value)}
                    className="w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] text-sm text-[#0b1c30]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0b1c30] block mb-1">
                    Student Witness / Investigator
                  </label>
                  <input
                    type="text"
                    value={consentWitness}
                    onChange={(e) => setConsentWitness(e.target.value)}
                    className="w-full h-12 px-4 bg-[#f8f9ff] rounded-xl border border-[#bfc7d2] text-sm text-[#0b1c30]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Save Indicator (Bottom Right) matching Image_16 */}
      {showSavedPill && (
        <div className="fixed bottom-8 right-8 bg-[#213145] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 pointer-events-none opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[#86f2e4] text-[20px]">
            check_circle
          </span>
          <span className="text-xs font-semibold">All changes saved to device</span>
        </div>
      )}
    </div>
  );
};
