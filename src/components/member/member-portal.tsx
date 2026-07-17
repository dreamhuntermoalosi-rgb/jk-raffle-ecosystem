'use client';

import { MemberDashboard } from './views/dashboard';
import { MemberTickets } from './views/tickets';
import { MemberPurchase } from './views/purchase';
import { MemberProfile } from './views/profile';
import { MemberNotifications } from './views/notifications';
import { MemberSidebar } from './member-sidebar';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';

const views: Record<string, React.ComponentType> = {
  dashboard: MemberDashboard,
  tickets: MemberTickets,
  purchase: MemberPurchase,
  profile: MemberProfile,
  notifications: MemberNotifications,
};

export function MemberPortal() {
  const { currentView, sidebarOpen } = useAppStore();
  const ViewComponent = views[currentView] || MemberDashboard;

  return (
    <div className="min-h-screen flex">
      <MemberSidebar />
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