'use client';

import { useAppStore } from '@/stores/app-store';
import { mockCurrentUser, mockBranchManager, mockAdmin } from '@/mock-data';
import { PublicPortal } from '@/components/public/public-portal';
import { MemberPortal } from '@/components/member/member-portal';
import { ManagerPortal } from '@/components/manager/manager-portal';
import { AdminPortal } from '@/components/admin/admin-portal';
import { PortalSwitcher } from '@/components/shared/portal-switcher';
import { CommandPalette } from '@/components/shared/command-palette';
import { MobileNav } from '@/components/shared/mobile-nav';
import { useEffect, useCallback } from 'react';

export default function Home() {
  const { currentPortal, currentUser, login, setCommandOpen, commandOpen } = useAppStore();

  // Auto-login based on portal
  useEffect(() => {
    if (currentPortal === 'member' && (!currentUser || currentUser.role !== 'member')) {
      login(mockCurrentUser);
    } else if (currentPortal === 'manager' && (!currentUser || currentUser.role !== 'branch_manager')) {
      login(mockBranchManager);
    } else if (currentPortal === 'admin' && (!currentUser || currentUser.role !== 'super_admin')) {
      login(mockAdmin);
    }
  }, [currentPortal, currentUser, login]);

  // Cmd+K / Ctrl+K keyboard shortcut
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    },
    [commandOpen, setCommandOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col">
      <PortalSwitcher />
      <div className="flex-1 pb-20 md:pb-0">
        {currentPortal === 'public' && <PublicPortal />}
        {currentPortal === 'member' && <MemberPortal />}
        {currentPortal === 'manager' && <ManagerPortal />}
        {currentPortal === 'admin' && <AdminPortal />}
      </div>
      <MobileNav />
      <CommandPalette />
    </div>
  );
}