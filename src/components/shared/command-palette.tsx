'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAppStore } from '@/stores/app-store';
import { useTheme } from 'next-themes';
import type { Portal } from '@/types';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Globe,
  User,
  Building2,
  Shield,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeft,
  Home,
  LayoutDashboard,
  Ticket,
  ShoppingCart,
  UserCircle,
  Bell,
  BarChart3,
  Settings,
  Users,
  Megaphone,
  Package,
  CreditCard,
  FileText,
  HelpCircle,
  Info,
  Phone,
  LogIn,
  Clock,
  type LucideIcon,
} from 'lucide-react';

// ============================================
// Navigation items per portal
// ============================================

interface NavItem {
  label: string;
  view: string;
  icon: LucideIcon;
  shortcut?: string;
}

const publicNavItems: NavItem[] = [
  { label: 'Home', view: 'home', icon: Home },
  { label: 'Campaigns', view: 'campaigns', icon: Megaphone },
  { label: 'Winners', view: 'winners', icon: Ticket },
  { label: 'How It Works', view: 'how-it-works', icon: Info },
  { label: 'About', view: 'about', icon: HelpCircle },
  { label: 'FAQ', view: 'faq', icon: HelpCircle },
  { label: 'Contact', view: 'contact', icon: Phone },
  { label: 'Login', view: 'login', icon: LogIn },
];

const memberNavItems: NavItem[] = [
  { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { label: 'My Tickets', view: 'tickets', icon: Ticket },
  { label: 'Purchase Tickets', view: 'purchase', icon: ShoppingCart },
  { label: 'Profile', view: 'profile', icon: UserCircle },
  { label: 'Notifications', view: 'notifications', icon: Bell },
];

const managerNavItems: NavItem[] = [
  { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { label: 'Members', view: 'members', icon: Users },
  { label: 'Reports', view: 'reports', icon: BarChart3 },
  { label: 'Campaigns', view: 'campaigns', icon: Megaphone },
  { label: 'Settings', view: 'settings', icon: Settings },
];

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { label: 'Campaigns', view: 'campaigns', icon: Megaphone },
  { label: 'Products', view: 'products', icon: Package },
  { label: 'Branches', view: 'branches', icon: Building2 },
  { label: 'Users', view: 'users', icon: Users },
  { label: 'Payments', view: 'payments', icon: CreditCard },
  { label: 'Notifications', view: 'notifications', icon: Bell },
  { label: 'Reports', view: 'reports', icon: FileText },
  { label: 'Settings', view: 'settings', icon: Settings },
];

const navItemsByPortal: Record<Portal, NavItem[]> = {
  public: publicNavItems,
  member: memberNavItems,
  manager: managerNavItems,
  admin: adminNavItems,
};

// ============================================
// Portal switcher items
// ============================================

interface PortalItem {
  label: string;
  portal: Portal;
  icon: LucideIcon;
}

const portalItems: PortalItem[] = [
  { label: 'Switch to Public Site', portal: 'public', icon: Globe },
  { label: 'Switch to Member Portal', portal: 'member', icon: User },
  { label: 'Switch to Branch Manager', portal: 'manager', icon: Building2 },
  { label: 'Switch to Administration', portal: 'admin', icon: Shield },
];

// ============================================
// Recent view label map (view -> display label)
// ============================================

const viewLabelMap: Record<string, string> = {
  home: 'Home',
  campaigns: 'Campaigns',
  winners: 'Winners',
  'how-it-works': 'How It Works',
  about: 'About',
  faq: 'FAQ',
  contact: 'Contact',
  login: 'Login',
  dashboard: 'Dashboard',
  tickets: 'My Tickets',
  purchase: 'Purchase Tickets',
  profile: 'Profile',
  notifications: 'Notifications',
  members: 'Members',
  reports: 'Reports',
  settings: 'Settings',
  products: 'Products',
  branches: 'Branches',
  users: 'Users',
  payments: 'Payments',
};

const viewIconMap: Record<string, LucideIcon> = {
  home: Home,
  campaigns: Megaphone,
  winners: Ticket,
  'how-it-works': Info,
  about: HelpCircle,
  faq: HelpCircle,
  contact: Phone,
  login: LogIn,
  dashboard: LayoutDashboard,
  tickets: Ticket,
  purchase: ShoppingCart,
  profile: UserCircle,
  notifications: Bell,
  members: Users,
  reports: BarChart3,
  settings: Settings,
  products: Package,
  branches: Building2,
  users: Users,
  payments: CreditCard,
};

// ============================================
// Command Palette Component
// ============================================

export function CommandPalette() {
  const {
    commandOpen,
    setCommandOpen,
    currentPortal,
    setPortal,
    setView,
    sidebarOpen,
    setSidebarOpen,
    recentViews,
    addRecentView,
  } = useAppStore();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const commandRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setCommandOpen(open);
    },
    [setCommandOpen]
  );

  const handleNavigate = useCallback(
    (view: string) => {
      setView(view);
      addRecentView(view);
      setCommandOpen(false);
    },
    [setView, addRecentView, setCommandOpen]
  );

  const handlePortalSwitch = useCallback(
    (portal: Portal) => {
      setPortal(portal);
      setCommandOpen(false);
    },
    [setPortal, setCommandOpen]
  );

  const handleToggleDarkMode = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
    setCommandOpen(false);
  }, [isDark, setTheme, setCommandOpen]);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
    setCommandOpen(false);
  }, [sidebarOpen, setSidebarOpen, setCommandOpen]);

  // Track recent view when currentView changes (but not when command palette opens)
  const currentView = useAppStore((s) => s.currentView);
  const prevViewRef = useRef(currentView);
  useEffect(() => {
    if (currentView !== prevViewRef.current && !commandOpen) {
      addRecentView(currentView);
    }
    prevViewRef.current = currentView;
  }, [currentView, commandOpen, addRecentView]);

  const currentNavItems = navItemsByPortal[currentPortal];

  // Filter recent views to only show those relevant to current portal
  const currentViewSet = new Set(currentNavItems.map((n) => n.view));
  const filteredRecent = recentViews.filter((v) => currentViewSet.has(v)).slice(0, 4);

  return (
    <CommandDialog
      open={commandOpen}
      onOpenChange={handleOpenChange}
      title="Command Palette"
      description="Search for pages, actions, and settings"
      className="sm:max-w-xl rounded-xl shadow-2xl"
    >
      <div ref={commandRef}>
        <CommandInput placeholder="Search pages, actions, or type a command..." />
        <CommandList className="max-h-[420px]">
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Recent Items */}
          {filteredRecent.length > 0 && (
            <CommandGroup heading="Recent">
              {filteredRecent.map((view) => {
                const IconComp = viewIconMap[view] || Clock;
                const label = viewLabelMap[view] || view;
                return (
                  <CommandItem
                    key={`recent-${view}`}
                    value={`recent ${label}`}
                    onSelect={() => handleNavigate(view)}
                    className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer data-[selected=true]:bg-forest-500/10 data-[selected=true]:text-forest-600 dark:data-[selected=true]:text-forest-400"
                  >
                    <IconComp className="size-4 text-muted-foreground" />
                    <span>{label}</span>
                    <CommandShortcut className="text-[10px]">
                      recent
                    </CommandShortcut>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {/* Portal Switching */}
          <CommandGroup heading="Portals">
            {portalItems.map((item) => (
              <CommandItem
                key={item.portal}
                value={`portal ${item.label}`}
                onSelect={() => handlePortalSwitch(item.portal)}
                className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer data-[selected=true]:bg-forest-500/10 data-[selected=true]:text-forest-600 dark:data-[selected=true]:text-forest-400"
              >
                <item.icon className="size-4 text-muted-foreground" />
                <span>{item.label}</span>
                {currentPortal === item.portal && (
                  <span className="ml-auto text-[10px] text-forest-600 dark:text-forest-400 font-medium">
                    current
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Navigation - current portal */}
          <CommandGroup heading="Navigation">
            {currentNavItems.map((item) => (
              <CommandItem
                key={item.view}
                value={`nav ${item.label} ${item.view}`}
                onSelect={() => handleNavigate(item.view)}
                className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer data-[selected=true]:bg-forest-500/10 data-[selected=true]:text-forest-600 dark:data-[selected=true]:text-forest-400"
              >
                <item.icon className="size-4 text-muted-foreground" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Actions */}
          <CommandGroup heading="Actions">
            <CommandItem
              value="action toggle dark mode theme"
              onSelect={handleToggleDarkMode}
              className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer data-[selected=true]:bg-forest-500/10 data-[selected=true]:text-forest-600 dark:data-[selected=true]:text-forest-400"
            >
              {isDark ? (
                <Sun className="size-4 text-muted-foreground" />
              ) : (
                <Moon className="size-4 text-muted-foreground" />
              )}
              <span>Toggle Dark Mode</span>
              <CommandShortcut>
                {isDark ? '☀️' : '🌙'}
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              value="action toggle sidebar panel"
              onSelect={handleToggleSidebar}
              className="gap-3 rounded-lg px-3 py-2.5 cursor-pointer data-[selected=true]:bg-forest-500/10 data-[selected=true]:text-forest-600 dark:data-[selected=true]:text-forest-400"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="size-4 text-muted-foreground" />
              ) : (
                <PanelLeft className="size-4 text-muted-foreground" />
              )}
              <span>Toggle Sidebar</span>
              <CommandShortcut>
                {sidebarOpen ? 'hide' : 'show'}
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>

        {/* Footer hint */}
        <div className="border-t border-border/50 px-4 py-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-5 items-center rounded border border-border/60 bg-muted/50 px-1.5 font-mono text-[10px]">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-5 items-center rounded border border-border/60 bg-muted/50 px-1.5 font-mono text-[10px]">↵</kbd>
              select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border border-border/60 bg-muted/50 px-1.5 font-mono text-[10px]">esc</kbd>
            close
          </span>
        </div>
      </div>
    </CommandDialog>
  );
}