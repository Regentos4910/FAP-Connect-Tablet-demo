import React, { useState } from 'react';
import { SyncHistoryItem, SyncRecord } from '../types';

interface OfflineSyncViewProps {
  records: SyncRecord[];
  history: SyncHistoryItem[];
  isOffline: boolean;
  onToggleOffline: () => void;
  onSyncAll: () => Promise<void>;
  onRetryRecord: (recordId: string) => void;
}

export const OfflineSyncView: React.FC<OfflineSyncViewProps> = ({
  records,
  history,
  isOffline,
  onToggleOffline,
  onSyncAll,
  onRetryRecord,
}) => {
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const pendingCount = records.filter((r) => r.status === 'pending').length;
  const syncedCount = 142;
  const failedCount = records.filter((r) => r.status === 'failed').length;
  const conflictCount = records.filter((r) => r.status === 'conflict').length || 1;

  const handleSyncNow = async () => {
    setSyncing(true);
    setSyncProgress(15);
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 300);

    await onSyncAll();
    setTimeout(() => {
      clearInterval(interval);
      setSyncProgress(100);
      setTimeout(() => {
        setSyncing(false);
        setSyncProgress(0);
      }, 500);
    }, 1200);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 pb-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0b1c30] tracking-tight mb-2">
            Offline Sync
          </h2>
          <p className="text-sm text-[#3f4850] max-w-2xl leading-relaxed">
            Manage your localized data. Connect to a stable network to push pending records to the central server and resolve any data conflicts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSyncNow}
          disabled={syncing}
          className="bg-[#006194] text-white font-semibold text-sm rounded-xl h-12 px-6 flex items-center justify-center gap-2 hover:bg-[#007bb9] transition-colors active:scale-[0.98] shadow-xs shrink-0 disabled:opacity-75"
        >
          <span className={`material-symbols-outlined text-[20px] ${syncing ? 'animate-spin' : ''}`}>
            sync
          </span>
          <span>{syncing ? `Uploading (${syncProgress}%)...` : 'Sync Now'}</span>
        </button>
      </div>

      {/* Sync Progress Bar */}
      {syncing && (
        <div className="w-full bg-[#e5eeff] rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="bg-[#006194] h-full transition-all duration-300 rounded-full"
            style={{ width: `${syncProgress}%` }}
          />
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Status Lists (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Pending */}
            <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#ffdcc0] text-[#894d00] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[20px]">pending_actions</span>
              </div>
              <span className="text-3xl font-bold text-[#0b1c30]">{pendingCount}</span>
              <span className="text-xs font-bold text-[#707881] uppercase tracking-wider mt-1">
                Pending
              </span>
            </div>

            {/* Synced */}
            <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-4 shadow-xs flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[20px]">cloud_done</span>
              </div>
              <span className="text-3xl font-bold text-[#0b1c30]">{syncedCount}</span>
              <span className="text-xs font-bold text-[#707881] uppercase tracking-wider mt-1">
                Synced
              </span>
            </div>

            {/* Failed */}
            <div className="bg-white border border-[#bfc7d2]/60 border-l-4 border-l-[#ba1a1a] rounded-2xl p-4 shadow-xs flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[20px]">error</span>
              </div>
              <span className="text-3xl font-bold text-[#ba1a1a]">{failedCount}</span>
              <span className="text-xs font-bold text-[#707881] uppercase tracking-wider mt-1">
                Failed
              </span>
            </div>

            {/* Conflicts */}
            <div className="bg-white border border-[#bfc7d2]/60 border-l-4 border-l-amber-600 rounded-2xl p-4 shadow-xs flex flex-col">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
              <span className="text-3xl font-bold text-[#0b1c30]">{conflictCount}</span>
              <span className="text-xs font-bold text-[#707881] uppercase tracking-wider mt-1">
                Conflicts
              </span>
            </div>
          </div>

          {/* Pending Records List */}
          <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl shadow-xs overflow-hidden flex flex-col">
            <div className="p-5 border-b border-[#bfc7d2]/40 bg-[#eff4ff] flex justify-between items-center">
              <h3 className="text-base font-bold text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#894d00]">pending_actions</span>
                <span>Pending Records</span>
              </h3>
              <span className="text-xs text-[#006194] font-semibold">{records.length} queue items</span>
            </div>

            <div className="divide-y divide-[#bfc7d2]/30">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-[#f8f9ff] text-xs font-bold text-[#707881] uppercase tracking-wider">
                <div className="col-span-5 md:col-span-4">Record ID / Type</div>
                <div className="col-span-4">Family Name</div>
                <div className="col-span-3 hidden sm:block">Timestamp</div>
                <div className="col-span-3 sm:col-span-1 text-center">Status</div>
              </div>

              {/* Rows */}
              {records.map((record) => {
                const isFailed = record.status === 'failed';
                return (
                  <div
                    key={record.id}
                    className={`grid grid-cols-12 gap-4 p-4 items-center min-h-[58px] transition-colors ${
                      isFailed ? 'bg-[#ffdad6]/25' : 'hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isFailed
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#eff4ff] text-[#006194]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {record.category === 'clinical'
                            ? 'medical_services'
                            : record.category === 'economic'
                            ? 'payments'
                            : record.category === 'lab'
                            ? 'biotech'
                            : 'description'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0b1c30] truncate">
                          {record.id}
                        </div>
                        <div
                          className={`text-[11px] truncate ${
                            isFailed ? 'text-[#ba1a1a] font-medium' : 'text-[#707881]'
                          }`}
                        >
                          {record.type}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-4 text-xs font-medium text-[#0b1c30] truncate">
                      {record.familyName}
                    </div>

                    <div className="col-span-3 hidden sm:block text-xs text-[#707881]">
                      {record.timestamp}
                    </div>

                    <div className="col-span-3 sm:col-span-1 flex justify-center">
                      {isFailed ? (
                        <button
                          type="button"
                          onClick={() => onRetryRecord(record.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                          title="Retry Upload"
                        >
                          <span className="material-symbols-outlined text-[18px]">refresh</span>
                        </button>
                      ) : record.status === 'synced' ? (
                        <span className="material-symbols-outlined text-[#006a61] text-[18px]">
                          check_circle
                        </span>
                      ) : (
                        <span
                          className="material-symbols-outlined text-[#894d00] text-[18px]"
                          title="Waiting to sync"
                        >
                          hourglass_empty
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Alerts (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Network Status Card */}
          <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center w-full">
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 relative ${
                  isOffline
                    ? 'bg-amber-50 border-amber-500 text-amber-700'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-700'
                }`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {isOffline ? 'wifi_off' : 'wifi'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0b1c30] mb-1">
                {isOffline ? 'Currently Offline' : 'Connected to Network'}
              </h3>
              <p className="text-xs text-[#707881] mb-4">
                Last successful sync: Yesterday, 18:45 PM
              </p>

              <button
                type="button"
                onClick={onToggleOffline}
                className="mb-4 text-xs font-semibold px-4 py-1.5 rounded-full border border-[#bfc7d2] hover:bg-[#eff4ff] text-[#006194] transition-colors"
              >
                {isOffline ? 'Simulate Reconnect (Go Online)' : 'Simulate Offline Mode'}
              </button>

              <div className="w-full bg-[#e5eeff] rounded-full h-2 mb-2 overflow-hidden">
                <div className="bg-amber-600 h-2 rounded-full w-[85%]" />
              </div>
              <p className="text-xs text-[#707881] text-left w-full">
                Local storage: 85% full (approx 20MB remaining)
              </p>
            </div>
          </div>

          {/* Sync History Timeline */}
          <div className="bg-white border border-[#bfc7d2]/60 rounded-2xl shadow-xs p-6 flex flex-col">
            <h3 className="text-base font-bold text-[#0b1c30] mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006194]">history</span>
              <span>Sync History</span>
            </h3>

            <div className="relative pl-6 border-l-2 border-[#bfc7d2]/60 space-y-6 flex-1 text-left">
              {history.map((item) => (
                <div key={item.id} className="relative">
                  <div
                    className={`absolute -left-[31px] w-3.5 h-3.5 rounded-full border-2 border-white ${
                      item.type === 'error'
                        ? 'bg-[#ba1a1a]'
                        : item.type === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-[#006a61]'
                    }`}
                  />
                  <div className="text-[11px] font-medium text-[#707881] mb-0.5">
                    {item.timestamp}
                  </div>
                  <div className="text-sm font-bold text-[#0b1c30]">{item.title}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      item.type === 'error' ? 'text-[#ba1a1a]' : 'text-[#3f4850]'
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
