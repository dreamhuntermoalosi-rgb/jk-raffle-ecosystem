'use client';

import { useAppStore } from '@/stores/app-store';
import type { Portal } from '@/types';
import { Globe, User, Building2, Shield, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const portals: { id: Portal; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'public', label: 'Public Site', icon: <Globe className="w-3.5 h-3.5" />, description: 'Marketing & Campaigns' },
  { id: 'member', label: 'Member Portal', icon: <User className="w-3.5 h-3.5" />, description: 'Tickets & Dashboard' },
  { id: 'manager', label: 'Branch Manager', icon: <Building2 className="w-3.5 h-3.5" />, description: 'Members & Reports' },
  { id: 'admin', label: 'Administration', icon: <Shield className="w-3.5 h-3.5" />, description: 'Full Control Panel' },
];

export function PortalSwitcher() {
  const { currentPortal, setPortal, setCommandOpen } = useAppStore();
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className="sticky top-0 z-50 shadow-royal-sm"
      style={{
        background: isDark
          ? 'rgba(17, 17, 17, 0.9)'
          : 'rgba(250, 249, 247, 0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: isDark
          ? '1px solid rgba(255, 255, 255, 0.06)'
          : '1px solid rgba(91, 19, 34, 0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[52px]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-maroon-800 dark:bg-maroon-700 flex items-center justify-center shadow-royal-sm border border-gold-400/15">
              <span className="text-gold-400 font-bold text-[13px] tracking-tight">JK</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-semibold text-[13px] tracking-tight">JK Raffle</span>
              <span className="text-[9px] font-semibold text-muted-foreground/60 bg-muted/80 dark:bg-white/5 px-1.5 py-0.5 rounded-[5px] tracking-[0.08em] uppercase">Demo</span>
            </div>
          </div>

          {/* Portal Switcher */}
          <nav className="flex items-center gap-1" role="tablist" aria-label="Portal selector">
            {portals.map((portal) => (
              <button
                key={portal.id}
                role="tab"
                aria-selected={currentPortal === portal.id}
                onClick={() => setPortal(portal.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-all duration-200',
                  currentPortal === portal.id
                    ? 'bg-maroon-600 dark:bg-maroon-500 text-white shadow-royal-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70 dark:hover:bg-white/5'
                )}
              >
                {portal.icon}
                <span className="hidden md:inline">{portal.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Command Palette Hint */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] text-[12px] text-muted-foreground/70 hover:text-foreground hover:bg-muted/70 dark:hover:bg-white/5 transition-all duration-200"
              aria-label="Open command palette"
            >
              <kbd className="inline-flex h-5 items-center rounded-[5px] border border-border/50 dark:border-white/8 bg-muted/60 dark:bg-white/5 px-1.5 font-mono text-[10px] leading-none text-muted-foreground/60">⌘K</kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-[8px] text-muted-foreground/70 hover:text-foreground hover:bg-muted/70 dark:hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}