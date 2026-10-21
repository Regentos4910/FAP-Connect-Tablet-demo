import React from 'react';
import { UserProfile } from '../types';

interface TopHeaderProps {
  title: string;
  badge?: string;
  badgeType?: 'default' | 'draft' | 'info' | 'syncing';
  subtitle?: string;
  user: UserProfile;
  isSyncing?: boolean;
  onSyncClick?: () => void;
  onProfileClick?: () => void;
  rightActions?: React.ReactNode;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  badge,
  badgeType = 'default',
  subtitle,
  user,
  isSyncing = false,
  onSyncClick,
  onProfileClick,
  rightActions,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#bfc7d2]/50 shadow-xs flex justify-between items-center h-16 px-6 lg:px-8 shrink-0">
      <div className="flex items-center gap-3 lg:gap-4 min-w-0">
        <h1 className="text-xl lg:text-2xl font-bold text-[#006194] tracking-tight truncate">
          {title}
        </h1>

        {badge && (
          <span
            className={`px-3 py-0.5 rounded-full text-xs font-medium border shrink-0 ${
              badgeType === 'draft'
                ? 'bg-[#eff4ff] text-[#3f4850] border-[#bfc7d2]'
                : badgeType === 'syncing'
                ? 'bg-[#86f2e4]/30 text-[#006a61] border-[#006a61]/30 animate-pulse'
                : 'bg-[#dce9ff] text-[#0b1c30] border-[#bfc7d2]/50'
            }`}
          >
            {badge}
          </span>
        )}

        {subtitle && (
          <span className="hidden sm:inline-block text-xs text-[#707881] border-l border-[#bfc7d2] pl-3 truncate">
            {subtitle}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-4 shrink-0">
        {rightActions}

        <button
          type="button"
          onClick={onSyncClick}
          disabled={isSyncing}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eff4ff] text-[#3f4850] hover:text-[#006194] transition-colors active:scale-95"
          title="Manual Sync"
          aria-label="Sync"
        >
          <span
            className={`material-symbols-outlined text-xl ${
              isSyncing ? 'animate-spin text-[#006194]' : ''
            }`}
          >
            sync
          </span>
        </button>

        <button
          type="button"
          onClick={onProfileClick}
          className="flex items-center gap-2 py-1 px-1.5 rounded-full hover:bg-[#eff4ff] transition-colors text-left"
          title={user.name}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#007bb9]/30">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden md:inline-block text-xs font-semibold text-[#0b1c30]">
            {user.name.split(' ')[0]} {user.name.split(' ')[1]?.[0]}.
          </span>
        </button>
      </div>
    </header>
  );
};
