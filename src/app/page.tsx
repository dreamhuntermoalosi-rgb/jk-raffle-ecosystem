'use client';

import { useAppStore } from '@/stores/app-store';
import { mockCurrentUser, mockBranchManager, mockAdmin } from '@/mock-data';
import { PublicPortal } from '@/components/public/public-portal';
import { MemberPortal } from '@/components/member/member-portal';
import { ManagerPortal } from '@/components/manager/manager-portal';
import { AdminPortal } from '@/components/admin/admin-portal';
import { PortalSwitcher } from '@/components/shared/portal-switcher';
import { useEffect } from 'react';

export default function Home() {
  const { currentPortal, currentUser, login } = useAppStore();

  useEffect(() => {
    if (currentPortal === 'member' && (!currentUser || currentUser.role !== 'member')) {
      login(mockCurrentUser);
    } else if (currentPortal === 'manager' && (!currentUser || currentUser.role !== 'branch_manager')) {
      login(mockBranchManager);
    } else if (currentPortal === 'admin' && (!currentUser || currentUser.role !== 'super_admin')) {
      login(mockAdmin);
    }
  }, [currentPortal, currentUser, login]);

  return (
    <div className="min-h-screen flex flex-col">
      <PortalSwitcher />
      <div className="flex-1">
        {currentPortal === 'public' && <PublicPortal />}
        {currentPortal === 'member' && <MemberPortal />}
        {currentPortal === 'manager' && <ManagerPortal />}
        {currentPortal === 'admin' && <AdminPortal />}
      </div>
    </div>
  );
}