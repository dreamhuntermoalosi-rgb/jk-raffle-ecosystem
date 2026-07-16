'use client';

import { ManagerDashboard } from './views/dashboard';
import { ManagerMembers } from './views/members';
import { ManagerReports } from './views/reports';
import { ManagerSidebar } from './manager-sidebar';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';

const views: Record<string, React.ComponentType> = {
  dashboard: ManagerDashboard,
  members: ManagerMembers,
  reports: ManagerReports,
};

export function ManagerPortal() {
  const { currentView, sidebarOpen } = useAppStore();
  const ViewComponent = views[currentView] || ManagerDashboard;

  return (
    <div className="min-h-screen flex">
      <ManagerSidebar />
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "lg:ml-72" : "lg:ml-20"
      )}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto page-enter">
          <ViewComponent />
        </div>
      </main>
    </div>
  );
}