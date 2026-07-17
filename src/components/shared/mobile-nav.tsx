'use client';

import { useState } from 'react';
import {
  Home,
  Trophy,
  LayoutDashboard,
  Ticket,
  ShoppingCart,
  User,
  Users,
  BarChart3,
  Settings,
  MoreHorizontal,
  X,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  view: string;
  icon: LucideIcon;
}

interface MoreNavItem {
  label: string;
  view: string;
  icon: LucideIcon;
  description?: string;
}

const publicNavItems: NavItem[] = [
  { label: 'Home', view: 'home', icon: Home },
  { label: 'Campaigns', view: 'campaigns', icon: Ticket },
  { label: 'Winners', view: 'winners', icon: Trophy },
];

const publicMoreItems: MoreNavItem[] = [
  { label: 'About Us', view: 'about', icon: Home, description: 'Learn about JK Raffle' },
  { label: 'How It Works', view: 'how-it-works', icon: BarChart3, description: 'Step-by-step guide' },
  { label: 'FAQ', view: 'faq', icon: Settings, description: 'Frequently asked questions' },
  { label: 'Contact', view: 'contact', icon: Users, description: 'Get in touch' },
  { label: 'Login', view: 'login', icon: User, description: 'Sign in to your account' },
  { label: 'Privacy', view: 'privacy', icon: Settings, description: 'Privacy policy' },
  { label: 'Terms', view: 'terms', icon: Settings, description: 'Terms and conditions' },
];

const memberNavItems: NavItem[] = [
  { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { label: 'Tickets', view: 'tickets', icon: Ticket },
  { label: 'Purchase', view: 'purchase', icon: ShoppingCart },
  { label: 'Profile', view: 'profile', icon: User },
];

const managerNavItems: NavItem[] = [
  { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { label: 'Members', view: 'members', icon: Users },
  { label: 'Reports', view: 'reports', icon: BarChart3 },
  { label: 'Settings', view: 'settings', icon: Settings },
];

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { label: 'Campaigns', view: 'campaigns', icon: Trophy },
  { label: 'Users', view: 'users', icon: Users },
];

const adminMoreItems: MoreNavItem[] = [
  { label: 'Products', view: 'products', icon: ShoppingCart, description: 'Manage products' },
  { label: 'Branches', view: 'branches', icon: Home, description: 'Manage branches' },
  { label: 'Payments', view: 'payments', icon: Ticket, description: 'Payment management' },
  { label: 'Notifications', view: 'notifications', icon: User, description: 'Broadcast messages' },
  { label: 'Reports', view: 'reports', icon: BarChart3, description: 'Analytics & reports' },
  { label: 'Settings', view: 'settings', icon: Settings, description: 'System settings' },
];

export function MobileNav() {
  const { currentPortal, currentView, setView } = useAppStore();
  const [moreOpen, setMoreOpen] = useState(false);

  const activeColor = 'text-[hsl(152,68%,35%)]';
  const inactiveColor = 'text-muted-foreground';

  const navConfig = (() => {
    switch (currentPortal) {
      case 'public':
        return { items: publicNavItems, moreItems: publicMoreItems, hasMore: true };
      case 'member':
        return { items: memberNavItems, moreItems: [], hasMore: false };
      case 'manager':
        return { items: managerNavItems, moreItems: [], hasMore: false };
      case 'admin':
        return { items: adminNavItems, moreItems: adminMoreItems, hasMore: true };
      default:
        return { items: publicNavItems, moreItems: publicMoreItems, hasMore: true };
    }
  })();

  const handleNav = (view: string) => {
    setView(view);
    setMoreOpen(false);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-background/80 backdrop-blur-xl border-t border-border/60"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around h-full px-2 max-w-lg mx-auto">
          {navConfig.items.map((item) => {
            const isActive = currentView === item.view;
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors duration-200 rounded-lg',
                  isActive ? activeColor : `${inactiveColor} hover:text-foreground`
                )}
              >
                <Icon className={cn('h-5 w-5 transition-transform duration-200', isActive && 'scale-110')} />
                <span className={cn('text-[10px] font-medium leading-none', isActive && 'font-semibold')}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[hsl(152,68%,35%)]" />
                )}
              </button>
            );
          })}

          {navConfig.hasMore && (
            <button
              onClick={() => setMoreOpen(true)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors duration-200 rounded-lg',
                moreOpen ? activeColor : `${inactiveColor} hover:text-foreground`
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-[10px] font-medium leading-none">More</span>
            </button>
          )}
        </div>
      </nav>

      {/* More Items Sheet */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl max-h-[70vh]">
          <SheetHeader className="text-left">
            <SheetTitle className="text-base">More Options</SheetTitle>
          </SheetHeader>
          <div className="space-y-1 px-4 pb-4 overflow-y-auto max-h-[55vh]">
            {navConfig.moreItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={cn(
                    'flex items-center gap-3 w-full p-3 rounded-xl transition-colors duration-150 text-left',
                    isActive
                      ? 'bg-[hsl(152,68%,8%)] text-[hsl(152,68%,35%)] dark:bg-[hsl(152,68%,12%)]'
                      : 'hover:bg-muted'
                  )}
                >
                  <div className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-lg shrink-0',
                    isActive
                      ? 'bg-[hsl(152,68%,15%)] dark:bg-[hsl(152,68%,20%)]'
                      : 'bg-muted'
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    )}
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-[hsl(152,68%,35%)] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}