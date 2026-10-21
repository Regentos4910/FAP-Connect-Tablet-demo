/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CURRENT_USER,
  INITIAL_FAMILIES,
  INITIAL_SYNC_HISTORY,
  INITIAL_SYNC_RECORDS,
} from './data/mockData';
import {
  ClinicalNotes,
  Family,
  FamilyMember,
  ScreenId,
  SyncHistoryItem,
  SyncRecord,
  VitalSigns,
} from './types';
import { NavigationRail } from './components/NavigationRail';
import { TopHeader } from './components/TopHeader';
import { SectionModal } from './components/SectionModal';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { AssignedFamiliesView } from './views/AssignedFamiliesView';
import { FamilyDetailsView } from './views/FamilyDetailsView';
import { FamilyMembersView } from './views/FamilyMembersView';
import { ClinicalExaminationView } from './views/ClinicalExaminationView';
import { GeneralInfoFormView } from './views/GeneralInfoFormView';
import { OfflineSyncView } from './views/OfflineSyncView';
import { FamilySummaryView } from './views/FamilySummaryView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Screen State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');

  // Active Family & Member State
  const [families, setFamilies] = useState<Family[]>(INITIAL_FAMILIES);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>(INITIAL_FAMILIES[0].id);
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    INITIAL_FAMILIES[0].members[0]?.id || ''
  );

  // Sync & Offline State
  const [isOffline, setIsOffline] = useState(true); // Matches the initial screenshots which show "Offline Mode" active
  const [syncRecords, setSyncRecords] = useState<SyncRecord[]>(INITIAL_SYNC_RECORDS);
  const [syncHistory, setSyncHistory] = useState<SyncHistoryItem[]>(INITIAL_SYNC_HISTORY);
  const [isSyncingGlobal, setIsSyncingGlobal] = useState(false);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  // Modal State for sections (Housing, Economic, TB, etc.)
  const [activeModalSection, setActiveModalSection] = useState<string | null>(null);

  const selectedFamily =
    families.find((f) => f.id === selectedFamilyId) || families[0];

  const selectedMember =
    selectedFamily.members.find((m) => m.id === selectedMemberId) ||
    selectedFamily.members[0];

  const pendingSyncCount = syncRecords.filter((r) => r.status === 'pending').length;

  const showToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 3000);
  };

  const handleGlobalSync = async () => {
    setIsSyncingGlobal(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mark pending records as synced
    setSyncRecords((prev) =>
      prev.map((r) => (r.status === 'pending' || r.status === 'failed' ? { ...r, status: 'synced' } : r))
    );

    // Add entry to history
    const newHist: SyncHistoryItem = {
      id: `hist-${Date.now()}`,
      timestamp: 'Just now',
      title: 'Manual Sync Complete',
      description: `${pendingSyncCount || 5} records successfully uploaded to central server.`,
      type: 'success',
    };
    setSyncHistory((prev) => [newHist, ...prev]);

    setIsSyncingGlobal(false);
    showToast('Sync complete! All pending records uploaded.');
  };

  const handleRetryRecord = (recordId: string) => {
    setSyncRecords((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, status: 'synced' } : r))
    );
    showToast(`Record ${recordId} re-uploaded successfully.`);
  };

  const handleToggleOffline = () => {
    setIsOffline((prev) => {
      const next = !prev;
      showToast(next ? 'Switched to Offline Mode (Cached locally)' : 'Connected to Server (Online)');
      return next;
    });
  };

  const handleSaveVitalsAndNotes = (
    memberId: string,
    vitals: VitalSigns,
    notes: ClinicalNotes
  ) => {
    setFamilies((prev) =>
      prev.map((fam) => {
        if (fam.id !== selectedFamily.id) return fam;
        return {
          ...fam,
          completeness: Math.min(100, fam.completeness + 10),
          members: fam.members.map((m) => {
            if (m.id !== memberId) return m;
            return {
              ...m,
              status: 'Examined',
              vitals,
              clinicalNotes: notes,
            };
          }),
        };
      })
    );

    // Queue sync record
    const newRecord: SyncRecord = {
      id: `CLI-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Clinical Exam',
      category: 'clinical',
      familyName: selectedFamily.familyName,
      familyId: selectedFamily.id,
      timestamp: 'Just now',
      status: 'pending',
      details: `Vitals & Clinical examination logged for ${selectedMember.name}`,
    };
    setSyncRecords((prev) => [newRecord, ...prev]);
  };

  const handleAddMember = (newMember: FamilyMember) => {
    setFamilies((prev) =>
      prev.map((fam) => {
        if (fam.id !== selectedFamily.id) return fam;
        return {
          ...fam,
          memberCount: fam.members.length + 1,
          members: [...fam.members, newMember],
        };
      })
    );
    showToast(`Added ${newMember.name} to ${selectedFamily.familyName} roster.`);
  };

  const handleUpdateMember = (updatedMember: FamilyMember) => {
    setFamilies((prev) =>
      prev.map((fam) => {
        if (fam.id !== selectedFamily.id) return fam;
        return {
          ...fam,
          members: fam.members.map((m) => (m.id === updatedMember.id ? updatedMember : m)),
        };
      })
    );
    showToast(`Updated details for ${updatedMember.name}.`);
  };

  const handleUpdateFamily = (updated: Family) => {
    setFamilies((prev) =>
      prev.map((f) => (f.id === updated.id ? updated : f))
    );
    showToast(`Household ${updated.familyName} data saved.`);
  };

  const handleSaveModalSection = (sectionKey: string, data: any) => {
    if (sectionKey === 'housing' && data.housingType) {
      setFamilies((prev) =>
        prev.map((f) =>
          f.id === selectedFamily.id
            ? { ...f, housingType: data.housingType, sanitation: data.sanitation }
            : f
        )
      );
    }
    if (sectionKey === 'economic-data' && data.cardType) {
      setFamilies((prev) =>
        prev.map((f) =>
          f.id === selectedFamily.id
            ? { ...f, cardType: data.cardType, incomeCategory: data.bplCategory }
            : f
        )
      );
    }

    const newRecord: SyncRecord = {
      id: `${sectionKey.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      type: `${sectionKey} update`,
      category: 'demographics',
      familyName: selectedFamily.familyName,
      familyId: selectedFamily.id,
      timestamp: 'Just now',
      status: 'pending',
    };
    setSyncRecords((prev) => [newRecord, ...prev]);
    showToast(`${sectionKey} updated and queued for offline sync.`);
  };

  // Direct modal routing for rail clicks
  const navigateToScreen = (screen: ScreenId) => {
    if (
      screen === 'housing' ||
      screen === 'economic-data' ||
      screen === 'social-history' ||
      screen === 'laboratory' ||
      screen === 'vital-events' ||
      screen === 'tb-screening'
    ) {
      setActiveModalSection(screen);
      return;
    }
    setCurrentScreen(screen);
  };

  // Login view when logged out
  if (!isAuthenticated) {
    return (
      <LoginView
        isOffline={isOffline}
        onLogin={() => {
          setIsAuthenticated(true);
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  // Determine top header title & badges based on current screen
  const getHeaderProps = () => {
    switch (currentScreen) {
      case 'dashboard':
        return { title: 'Overview' };
      case 'families':
        return { title: 'Assigned Families' };
      case 'family-details':
        return {
          title: 'Family Details',
          badge: `Code: ${selectedFamily.code}`,
          subtitle: `Assigned Student: ${CURRENT_USER.name}`,
        };
      case 'family-members':
        return {
          title: 'FAP Connect',
          subtitle: 'Family Members',
        };
      case 'clinical-examination':
        return {
          title: 'Clinical Examination',
          badge: 'Draft Mode',
          badgeType: 'draft' as const,
        };
      case 'general-info':
        return {
          title: 'Family Details',
          subtitle: 'General Information',
          badge: isOffline ? 'Offline Sync' : 'Syncing',
          badgeType: isOffline ? ('default' as const) : ('syncing' as const),
        };
      case 'offline-sync':
        return {
          title: 'FAP Connect',
          badge: 'Sync Status',
        };
      case 'summary':
        return {
          title: 'FAP Connect',
          subtitle: 'Family Summary',
        };
      case 'settings':
        return {
          title: 'FAP Connect',
          subtitle: 'Settings & Profile',
        };
      default:
        return { title: 'FAP Connect' };
    }
  };

  const headerProps = getHeaderProps();

  return (
    <div className="flex h-screen w-full bg-[#f8f9ff] text-[#0b1c30] overflow-hidden select-none">
      {/* 80px Left Navigation Rail */}
      <NavigationRail
        currentScreen={currentScreen}
        onNavigate={navigateToScreen}
        pendingSyncCount={pendingSyncCount}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        user={CURRENT_USER}
      />

      {/* Main App Content Canvas (Offset 80px for rail) */}
      <div className="flex-1 ml-[80px] flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Header */}
        <TopHeader
          title={headerProps.title}
          badge={headerProps.badge}
          badgeType={headerProps.badgeType}
          subtitle={headerProps.subtitle}
          user={CURRENT_USER}
          isSyncing={isSyncingGlobal}
          onSyncClick={handleGlobalSync}
          onProfileClick={() => setCurrentScreen('settings')}
        />

        {/* Dynamic Screen View Router */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {currentScreen === 'dashboard' && (
            <DashboardView
              families={families}
              pendingSyncCount={pendingSyncCount}
              isOffline={isOffline}
              onNavigate={navigateToScreen}
              onSelectFamily={(f) => {
                setSelectedFamilyId(f.id);
                setSelectedMemberId(f.members[0]?.id || '');
              }}
              onTriggerSync={handleGlobalSync}
              user={CURRENT_USER}
            />
          )}

          {currentScreen === 'families' && (
            <AssignedFamiliesView
              families={families}
              selectedFamily={selectedFamily}
              onSelectFamily={(f) => {
                setSelectedFamilyId(f.id);
                setSelectedMemberId(f.members[0]?.id || '');
              }}
              onNavigate={navigateToScreen}
            />
          )}

          {currentScreen === 'family-details' && (
            <FamilyDetailsView
              family={selectedFamily}
              user={CURRENT_USER}
              onNavigate={navigateToScreen}
              onOpenSectionModal={(secKey) => setActiveModalSection(secKey)}
            />
          )}

          {currentScreen === 'family-members' && (
            <FamilyMembersView
              family={selectedFamily}
              onNavigate={navigateToScreen}
              onSelectMemberForExam={(mem) => {
                setSelectedMemberId(mem.id);
              }}
              onAddMember={handleAddMember}
              onUpdateMember={handleUpdateMember}
            />
          )}

          {currentScreen === 'clinical-examination' && (
            <ClinicalExaminationView
              family={selectedFamily}
              currentMember={selectedMember}
              onSelectMember={(mem) => setSelectedMemberId(mem.id)}
              onNavigate={navigateToScreen}
              onSaveRecord={handleSaveVitalsAndNotes}
            />
          )}

          {currentScreen === 'general-info' && (
            <GeneralInfoFormView
              family={selectedFamily}
              onNavigate={navigateToScreen}
              onUpdateFamily={handleUpdateFamily}
            />
          )}

          {currentScreen === 'offline-sync' && (
            <OfflineSyncView
              records={syncRecords}
              history={syncHistory}
              isOffline={isOffline}
              onToggleOffline={handleToggleOffline}
              onSyncAll={handleGlobalSync}
              onRetryRecord={handleRetryRecord}
            />
          )}

          {currentScreen === 'summary' && (
            <FamilySummaryView
              family={selectedFamily}
              onNavigate={navigateToScreen}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsView
              user={CURRENT_USER}
              onLogout={() => setIsAuthenticated(false)}
              onForceSync={handleGlobalSync}
              onClearCache={() => {
                showToast('Local cache cleared successfully.');
              }}
            />
          )}
        </div>
      </div>

      {/* Global Interactive Section Modal */}
      <SectionModal
        sectionKey={activeModalSection}
        family={selectedFamily}
        onClose={() => setActiveModalSection(null)}
        onSave={handleSaveModalSection}
      />

      {/* Global Toast Notification */}
      {globalToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#213145] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-[#86f2e4] text-[18px]">
            info
          </span>
          <span>{globalToast}</span>
        </div>
      )}
    </div>
  );
}
