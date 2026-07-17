'use client';

import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { mockAdmin } from '@/mock-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  Trophy,
  Package,
  Building2,
  Users,
  CreditCard,
  Bell,
  CalendarDays,
  LifeBuoy,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { getInitials } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  section: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'Main' },
  { id: 'campaigns', label: 'Campaigns', icon: Trophy, section: 'Management' },
  { id: 'products', label: 'Products', icon: Package, section: 'Management' },
  { id: 'branches', label: 'Branches', icon: Building2, section: 'Management' },
  { id: 'users', label: 'Users', icon: Users, section: 'Management' },
  { id: 'payments', label: 'Payments', icon: CreditCard, section: 'Management' },
  { id: 'notifications', label: 'Notifications', icon: Bell, section: 'System' },
  { id: 'events', label: 'Events', icon: CalendarDays, section: 'System' },
  { id: 'support', label: 'Support', icon: LifeBuoy, section: 'System' },
  { id: 'reports', label: 'Reports', icon: BarChart3, section: 'System' },
  { id: 'settings', label: 'Settings', icon: Settings, section: 'System' },
];

const sections = ['Main', 'Management', 'System'];

export function AdminSidebar() {
  const { currentView, sidebarOpen, setView, toggleSidebar } = useAppStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        id="admin-sidebar"
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300',
          sidebarOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-0 lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className={cn('p-4 border-b border-slate-200', !sidebarOpen && 'px-3')}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[hsl(152,68%,35%)] flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 truncate">JK Raffle</p>
                <p className="text-xs text-slate-500 truncate">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Profile */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 h-9 flex-shrink-0">
                <AvatarFallback className="bg-[hsl(152,68%,35%)] text-white text-xs font-semibold">
                  {getInitials(mockAdmin.firstName, mockAdmin.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {mockAdmin.firstName} {mockAdmin.lastName}
                </p>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[hsl(43,96%,56%)]/15 text-[hsl(43,96%,36%)]">
                  Super Admin
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {sections.map((section) => (
            <div key={section} className="mb-2">
              {sidebarOpen && (
                <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {section}
                </p>
              )}
              {!sidebarOpen && section !== 'Main' && (
                <Separator className="my-2 mx-2 bg-slate-200" />
              )}
              {navItems
                .filter((item) => item.section === section)
                .map((item) => {
                  const isActive = currentView === item.id;
                  const Icon = item.icon;

                  const button = (
                    <button
                      key={item.id}
                      onClick={() => setView(item.id)}
                      className={cn(
                        'w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150',
                        sidebarOpen ? 'px-3 py-2.5' : 'px-2 py-2.5 justify-center',
                        isActive
                          ? 'bg-[hsl(152,68%,35%)] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <Icon className={cn('w-5 h-5 flex-shrink-0', !sidebarOpen && 'mx-auto')} />
                      {sidebarOpen && <span>{item.label}</span>}
                    </button>
                  );

                  if (!sidebarOpen) {
                    return (
                      <Tooltip key={item.id} delayDuration={0}>
                        <TooltipTrigger asChild>{button}</TooltipTrigger>
                        <TooltipContent side="right" className="text-xs">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return button;
                })}
            </div>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="w-full justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            {sidebarOpen && <span className="ml-2 text-xs">Collapse</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}