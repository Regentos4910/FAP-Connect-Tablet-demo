import React, { useState } from 'react';
import { ScreenId, UserProfile } from '../types';

interface NavigationRailProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  pendingSyncCount: number;
  isOffline: boolean;
  onToggleOffline: () => void;
  user: UserProfile;
}

interface NavItem {
  id: ScreenId;
  label: string;
  icon: string;
  showBadge?: boolean;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  currentScreen,
  onNavigate,
  pendingSyncCount,
  isOffline,
  onToggleOffline,
  user,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'families', label: 'Assigned Families', icon: 'group' },
    { id: 'family-details', label: 'Family Details', icon: 'description' },
    { id: 'family-members', label: 'Family Members', icon: 'person' },
    { id: 'housing', label: 'Housing Conditions', icon: 'home' },
    { id: 'economic-data', label: 'Economic Data', icon: 'payments' },
    { id: 'social-history', label: 'Social History', icon: 'history' },
    { id: 'clinical-examination', label: 'Clinical Examination', icon: 'medical_services' },
    { id: 'laboratory', label: 'Laboratory Investigation', icon: 'biotech' },
    { id: 'vital-events', label: 'Vital Events', icon: 'event' },
    { id: 'tb-screening', label: 'TB Screening', icon: 'emergency' },
    { id: 'summary', label: 'Family Summary', icon: 'summarize' },
    { id: 'offline-sync', label: 'Pending Sync', icon: 'sync_problem', showBadge: pendingSyncCount > 0 },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <nav
      className="fixed left-0 top-0 h-full w-[80px] bg-white border-r border-[#bfc7d2]/50 z-50 flex flex-col items-center py-3.5 gap-2 select-none shadow-[2px_0_8px_rgba(0,0,0,0.03)]"
      aria-label="Sidebar Navigation Rail"
    >
      {/* Brand / Avatar circle */}
      <div className="mb-2 flex flex-col items-center cursor-pointer group" onClick={() => onNavigate('dashboard')} title="FAP Connect Home">
        <div className="w-11 h-11 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm group-hover:scale-105 transition-transform">
          FC
        </div>
        <span className="text-[10px] font-semibold text-[#006194] mt-1 tracking-tight">FAP</span>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center gap-1.5 no-scrollbar px-1 py-1">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <div
              key={item.id}
              className="relative flex items-center justify-center w-full"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-13 h-13 rounded-xl flex flex-col items-center justify-center transition-all duration-150 active:scale-95 relative ${
                  isActive
                    ? 'bg-[#86f2e4] text-[#006f66] font-semibold shadow-xs'
                    : 'text-[#3f4850] hover:bg-[#e5eeff] hover:text-[#006194]'
                }`}
                aria-label={item.label}
              >
                <span
                  className={`material-symbols-outlined text-[23px] ${
                    isActive ? 'filled' : ''
                  }`}
                >
                  {item.icon}
                </span>

                {/* Subtitle label for selected or high priority item */}
                {isActive && (
                  <span className="text-[9px] font-medium leading-none mt-0.5 max-w-[50px] truncate text-center">
                    {item.label.split(' ')[0]}
                  </span>
                )}

                {/* Badge for Pending Sync */}
                {item.showBadge && (
                  <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 ring-2 ring-white">
                    {pendingSyncCount}
                  </span>
                )}
              </button>

              {/* Tooltip on hover */}
              {hoveredItem === item.id && !isActive && (
                <div className="absolute left-[78px] top-1/2 -translate-y-1/2 z-50 bg-[#213145] text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-md whitespace-nowrap pointer-events-none animate-in fade-in duration-100">
                  {item.label}
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#213145]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Area: Offline indicator & profile */}
      <div className="mt-auto pt-2 border-t border-[#bfc7d2]/30 w-full flex flex-col items-center gap-2 px-2">
        {/* Offline status indicator toggle button */}
        <button
          type="button"
          onClick={onToggleOffline}
          className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-colors relative group ${
            isOffline
              ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
              : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
          }`}
          title={isOffline ? 'Offline Mode Active (Click to go Online)' : 'Online Mode (Click to simulate Offline)'}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[20px]">
              {isOffline ? 'cloud_off' : 'cloud_done'}
            </span>
            <span
              className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                isOffline ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
              }`}
            />
          </div>
          <span className="text-[9px] font-semibold tracking-tight mt-0.5">
            {isOffline ? 'Offline' : 'Online'}
          </span>
        </button>

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={() => onNavigate('settings')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#007bb9]/40 hover:border-[#006194] transition-all hover:scale-105 active:scale-95 shadow-xs"
          title={`Logged in as ${user.name}`}
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </nav>
  );
};
