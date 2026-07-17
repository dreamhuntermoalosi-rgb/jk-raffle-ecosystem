'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Ticket,
  ShoppingCart,
  User,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { mockCurrentUser } from '@/mock-data';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tickets', label: 'My Tickets', icon: Ticket },
  { id: 'purchase', label: 'Purchase Tickets', icon: ShoppingCart },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function MemberSidebar() {
  const { currentView, sidebarOpen, setView, toggleSidebar } = useAppStore();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const user = mockCurrentUser;
  const initials = getInitials(user.firstName, user.lastName);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[#2E0910]/50 bg-[#130304] transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-72' : 'w-20'
      )}
    >
      {/* User section */}
      <div className="flex h-16 items-center gap-3 border-b border-[#2E0910] px-4">
        <Avatar className="h-9 w-9 shrink-0 bg-[#3D0C16] text-white">
          <AvatarFallback className="text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            'flex flex-col overflow-hidden transition-all duration-300',
            sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
          )}
        >
          <span className="truncate text-sm font-semibold text-white tracking-tight">
            {user.firstName} {user.lastName}
          </span>
          <span className="truncate text-xs text-[#f4a9b8]/60">
            {user.email}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            const button = (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer border-l-2',
                  isActive
                    ? 'border-[#D4AF37] bg-[#5B1322]/15 text-white'
                    : 'border-transparent text-[#f4a9b8]/70 hover:bg-[#2E0910]/60 hover:text-[#fce7eb]',
                  !sidebarOpen && 'justify-center px-2 border-l-0'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    'truncate transition-all duration-300',
                    sidebarOpen
                      ? 'opacity-100 w-auto'
                      : 'opacity-0 w-0 overflow-hidden'
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
                  <TooltipContent side="right" sideOffset={8}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return button;
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[#2E0910]/50 p-3">
        <Separator className="mb-3 hidden" />

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#f4a9b8]/40 hover:bg-[#2E0910]/40 hover:text-[#f4a9b8]/70 transition-colors mb-1 cursor-pointer',
            !sidebarOpen && 'justify-center px-2'
          )}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="h-5 w-5 shrink-0" />
              <span className="truncate">Collapse</span>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <ChevronRight className="h-5 w-5 shrink-0" />
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                Expand
              </TooltipContent>
            </Tooltip>
          )}
        </button>

        {/* Logout */}
        {sidebarOpen ? (
          <button
            onClick={() => {
              useAppStore.getState().logout();
              useAppStore.getState().setPortal('public');
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400/80 hover:bg-[#2E0910]/60 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Log Out</span>
          </button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  useAppStore.getState().logout();
                  useAppStore.getState().setPortal('public');
                }}
                className="flex w-full justify-center items-center rounded-lg px-2 py-2 text-sm text-red-400/80 hover:bg-[#2E0910]/60 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="h-5 w-5 shrink-0" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              Log Out
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </aside>
  );
}