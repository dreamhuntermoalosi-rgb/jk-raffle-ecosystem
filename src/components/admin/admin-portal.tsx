'use client';

import { AdminDashboard } from './views/dashboard';
import { AdminCampaigns } from './views/campaigns';
import { AdminProducts } from './views/products';
import { AdminBranches } from './views/branches';
import { AdminPayments } from './views/payments';
import { AdminUsers } from './views/users';
import { AdminNotifications } from './views/notifications';
import { AdminReports } from './views/reports';
import { AdminSettings } from './views/settings';
import { AdminSidebar } from './admin-sidebar';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';

const views: Record<string, React.ComponentType> = {
  dashboard: AdminDashboard,
  campaigns: AdminCampaigns,
  products: AdminProducts,
  branches: AdminBranches,
  payments: AdminPayments,
  users: AdminUsers,
  notifications: AdminNotifications,
  reports: AdminReports,
  settings: AdminSettings,
};

export function AdminPortal() {
  const { currentView, sidebarOpen } = useAppStore();
  const ViewComponent = views[currentView] || AdminDashboard;

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
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