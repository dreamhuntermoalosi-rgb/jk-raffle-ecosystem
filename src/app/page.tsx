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
import { DemoRoleSelector } from '@/components/shared/demo-role-selector';
import { TourGuide } from '@/components/shared/tour-guide';
import { memberTourSteps, managerTourSteps, adminTourSteps } from '@/components/shared/tour-data';
import { useEffect, useCallback, useRef } from 'react';

export default function Home() {
  const {
    currentPortal,
    currentUser,
    login,
    setCommandOpen,
    commandOpen,
    demoOpen,
    setDemoOpen,
    tourOpen,
    tourStep,
    setTourStep,
    setTourOpen,
    startTour,
    endTour,
  } = useAppStore();

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

  // Detect portal transitions using ref to start tour
  const portalRef = useRef('public');
  useEffect(() => {
    const prev = portalRef.current;
    portalRef.current = currentPortal;
    // Start tour when switching from public to any dashboard portal
    if (currentPortal !== 'public' && prev === 'public') {
      const timer = setTimeout(() => startTour(), 800);
      return () => clearTimeout(timer);
    }
  }, [currentPortal, startTour]);

  // Get tour steps based on current portal
  const getTourSteps = () => {
    switch (currentPortal) {
      case 'member': return memberTourSteps;
      case 'manager': return managerTourSteps;
      case 'admin': return adminTourSteps;
      default: return [];
    }
  };

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

  const tourSteps = getTourSteps();

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
      <DemoRoleSelector
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
      />
      <TourGuide
        steps={tourSteps}
        isOpen={tourOpen && currentPortal !== 'public' && tourSteps.length > 0}
        onClose={endTour}
        currentStep={tourStep}
        onNext={() => setTourStep(Math.min(tourStep + 1, tourSteps.length - 1))}
        onPrev={() => setTourStep(Math.max(tourStep - 1, 0))}
        onFinish={endTour}
      />
    </div>
  );
}