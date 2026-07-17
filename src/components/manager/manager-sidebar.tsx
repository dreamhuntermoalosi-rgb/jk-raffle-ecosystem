'use client';

import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { mockBranchManager, mockBranches } from '@/mock-data';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'campaigns', label: 'Campaigns', icon: Trophy },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const branch = mockBranches.find(b => b.id === mockBranchManager.branchId);

export function ManagerSidebar() {
  const { currentView, sidebarOpen, setView, toggleSidebar } = useAppStore();
  const initials = `${mockBranchManager.firstName.charAt(0)}${mockBranchManager.lastName.charAt(0)}`;

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen bg-[#130304] border-r border-[#2E0910]/50 flex flex-col transition-all duration-300 ease-in-out',
          sidebarOpen ? 'w-72' : 'w-20'
        )}
      >
        {/* Logo & Brand */}
        <div className="flex items-center h-16 px-4 border-b border-[#2E0910]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#3D0C16] text-[#f4a9b8] shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
              )}
            >
              <p className="text-sm font-bold text-white whitespace-nowrap tracking-tight">
                JK Raffle
              </p>
              <p className="text-[11px] text-[#f4a9b8]/50 whitespace-nowrap">
                Branch Manager
              </p>
            </div>
          </div>
        </div>

        {/* Manager Info */}
        <div className={cn('px-4 py-4', !sidebarOpen && 'px-2')}>
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg p-2.5 bg-[#1F060B] border border-[#2E0910]/50 transition-all',
              !sidebarOpen && 'justify-center p-2'
            )}
          >
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-[#3D0C16] text-white text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
              )}
            >
              <p className="text-sm font-semibold text-white truncate tracking-tight">
                {mockBranchManager.firstName} {mockBranchManager.lastName}
              </p>
              <p className="text-xs text-[#f4a9b8]/60 truncate">{branch?.name ?? 'Unknown Branch'}</p>
            </div>
          </div>
        </div>

        <Separator className="bg-[#2E0910]/50" />

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;

              const button = (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={cn(
                    'flex items-center gap-3 w-full rounded-lg text-sm font-medium transition-all duration-200 group border-l-2',
                    sidebarOpen ? 'justify-start px-3 py-2.5' : 'justify-center px-2 py-2.5 border-l-0',
                    isActive
                      ? 'border-[#D4AF37] bg-[#5B1322]/15 text-white'
                      : 'border-transparent text-[#f4a9b8]/70 hover:bg-[#2E0910]/60 hover:text-[#fce7eb]'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 shrink-0 transition-colors',
                      !sidebarOpen && 'mx-auto'
                    )}
                  />
                  <span
                    className={cn(
                      'transition-all duration-300 whitespace-nowrap',
                      sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );

              if (!sidebarOpen) {
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side="right" sideOffset={12}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return button;
            })}
          </nav>
        </ScrollArea>

        <Separator className="bg-[#2E0910]/50" />

        {/* Collapse Toggle */}
        <div className="p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn(
              'w-full rounded-lg text-[#f4a9b8]/40 hover:text-[#f4a9b8]/70 hover:bg-[#2E0910]/40 transition-colors',
              sidebarOpen ? 'justify-start' : 'justify-center'
            )}
          >
            {sidebarOpen ? (
              <>
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span className="ml-2 text-xs">Collapse</span>
              </>
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}