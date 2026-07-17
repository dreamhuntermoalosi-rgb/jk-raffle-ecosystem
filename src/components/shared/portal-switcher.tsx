'use client';

import { useAppStore } from '@/stores/app-store';
import type { Portal } from '@/types';
import { Globe, User, Building2, Shield, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const portals: { id: Portal; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'public', label: 'Public Site', icon: <Globe className="w-4 h-4" />, description: 'Marketing & Campaigns' },
  { id: 'member', label: 'Member Portal', icon: <User className="w-4 h-4" />, description: 'Tickets & Dashboard' },
  { id: 'manager', label: 'Branch Manager', icon: <Building2 className="w-4 h-4" />, description: 'Members & Reports' },
  { id: 'admin', label: 'Administration', icon: <Shield className="w-4 h-4" />, description: 'Full Control Panel' },
];

export function PortalSwitcher() {
  const { currentPortal, setPortal, setCommandOpen } = useAppStore();
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">JK</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <span className="font-semibold text-sm">JK Raffle</span>
              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-medium">DEMO</span>
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
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  currentPortal === portal.id
                    ? "bg-forest-500 text-white shadow-sm shadow-forest-500/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
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
              className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              aria-label="Open command palette"
            >
              <kbd className="inline-flex h-5 items-center rounded border border-border/60 bg-muted/50 px-1.5 font-mono text-[10px] leading-none">⌘K</kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}