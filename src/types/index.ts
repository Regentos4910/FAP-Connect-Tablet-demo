export type ScreenId =
  | 'login'
  | 'dashboard'
  | 'families'
  | 'family-details'
  | 'family-members'
  | 'general-info'
  | 'housing'
  | 'economic-data'
  | 'social-history'
  | 'clinical-examination'
  | 'laboratory'
  | 'vital-events'
  | 'tb-screening'
  | 'summary'
  | 'offline-sync'
  | 'settings';

export interface FamilyMember {
  id: string;
  name: string;
  initials: string;
  relation: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Examined' | 'Pending Exam';
  dob: string;
  occupation: string;
  education: string;
  maritalStatus: string;
  isHead?: boolean;
  avatarColor?: string;
  vitals?: VitalSigns;
  clinicalNotes?: ClinicalNotes;
}

export interface VitalSigns {
  height: number;
  weight: number;
  bmi: number;
  pulse: number;
  bpSys: number;
  bpDia: number;
  respRate: number;
  bloodSugar: number;
  hemoglobin: number;
}

export interface ClinicalNotes {
  diagnosis: string;
  treatment: string;
  advice: string;
  urineProtein: 'Nil' | 'Trace' | '1+' | '2+' | '3+';
  urineSugar: 'Nil' | 'Trace' | '1+' | '2+' | '3+';
  urineKetones: 'Negative' | 'Positive';
  remarks?: string;
}

export interface Family {
  id: string;
  code: string;
  familyName: string;
  headName: string;
  village: string;
  houseNo: string;
  sector?: string;
  memberCount: number;
  phase: 'Phase 1 Complete' | 'Phase 2 Active' | 'Phase 3 Pending';
  completeness: number; // percentage 0-100
  lastVisit: string;
  status: 'Synced' | 'Pending Sync' | 'Complete';
  members: FamilyMember[];
  consented: boolean;
  primaryPhone: string;
  altPhone?: string;
  notes?: string;
  nationalId?: string;
  incomeCategory: 'Below Poverty Line (BPL)' | 'Above Poverty Line (APL)' | 'Antyodaya';
  cardType: string;
  housingType: 'Kutcha House' | 'Pucca House' | 'Semi-Pucca';
  sanitation: 'Adequate' | 'Inadequate Sanitation';
  tbCases: number;
  tbCaseDetails?: string;
  anaemiaRiskCount: number;
  underweightCount: number;
  schoolDropoutsCount: number;
  schoolDropoutDetails?: string;
}

export interface SyncRecord {
  id: string;
  type: string;
  category: 'clinical' | 'economic' | 'lab' | 'demographics' | 'housing';
  familyName: string;
  familyId: string;
  timestamp: string;
  status: 'pending' | 'failed' | 'synced' | 'conflict';
  details?: string;
}

export interface SyncHistoryItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'success' | 'error' | 'warning';
}

export interface UserProfile {
  name: string;
  id: string;
  role: string;
  phase: string;
  cohort: string;
  avatarUrl: string;
  supervisorName: string;
  supervisorDept: string;
}
