import { create } from 'zustand';
import type { Portal, User, CartItem, Notification } from '@/types';

// ============================================
// App Store - Global application state
// ============================================

interface AppState {
  // Navigation
  currentPortal: Portal;
  currentView: string;
  sidebarOpen: boolean;
  commandOpen: boolean;
  recentViews: string[];
  
  // Auth (mock)
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Cart
  cart: CartItem[];
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Loading
  globalLoading: boolean;
  
  // Demo & Tour
  demoOpen: boolean;
  tourOpen: boolean;
  tourStep: number;
  
  // Actions
  setPortal: (portal: Portal) => void;
  setView: (view: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCommandOpen: (open: boolean) => void;
  addRecentView: (view: string) => void;
  login: (user: User) => void;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (campaignId: string) => void;
  updateCartQuantity: (campaignId: string, quantity: number) => void;
  clearCart: () => void;
  setNotifications: (notifications: Notification[]) => void;
  markNotificationRead: (id: string) => void;
  setGlobalLoading: (loading: boolean) => void;
  setDemoOpen: (open: boolean) => void;
  setTourOpen: (open: boolean) => void;
  setTourStep: (step: number) => void;
  startTour: () => void;
  endTour: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  currentPortal: 'public',
  currentView: 'home',
  sidebarOpen: true,
  commandOpen: false,
  recentViews: [],
  
  // Auth
  currentUser: null,
  isAuthenticated: false,
  
  // Cart
  cart: [],
  
  // Notifications
  notifications: [],
  unreadCount: 0,
  
  // Loading
  globalLoading: false,
  
  // Demo & Tour
  demoOpen: false,
  tourOpen: false,
  tourStep: 0,
  
  // Actions
  setPortal: (portal) => set({ 
    currentPortal: portal, 
    currentView: portal === 'public' ? 'home' : 'dashboard' 
  }),
  setView: (view) => set({ currentView: view }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCommandOpen: (open) => set({ commandOpen: open }),
  addRecentView: (view) => set((s) => {
    const filtered = s.recentViews.filter((v) => v !== view);
    return { recentViews: [view, ...filtered].slice(0, 8) };
  }),
  login: (user) => set({ currentUser: user, isAuthenticated: true }),
  logout: () => set({ currentUser: null, isAuthenticated: false, cart: [] }),
  addToCart: (item) => set((s) => {
    const existing = s.cart.find(c => c.campaignId === item.campaignId);
    if (existing) {
      return {
        cart: s.cart.map(c => 
          c.campaignId === item.campaignId 
            ? { ...c, quantity: c.quantity + item.quantity, total: (c.quantity + item.quantity) * c.unitPrice }
            : c
        ),
      };
    }
    return { cart: [...s.cart, item] };
  }),
  removeFromCart: (campaignId) => set((s) => ({ 
    cart: s.cart.filter(c => c.campaignId !== campaignId) 
  })),
  updateCartQuantity: (campaignId, quantity) => set((s) => ({
    cart: s.cart.map(c => 
      c.campaignId === campaignId 
        ? { ...c, quantity, total: quantity * c.unitPrice }
        : c
    ),
  })),
  clearCart: () => set({ cart: [] }),
  setNotifications: (notifications) => set({ 
    notifications, 
    unreadCount: notifications.filter(n => n.status === 'unread').length 
  }),
  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map(n => n.id === id ? { ...n, status: 'read' as const } : n),
    unreadCount: Math.max(0, s.unreadCount - 1),
  })),
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
  setDemoOpen: (open) => set({ demoOpen: open }),
  setTourOpen: (open) => set({ tourOpen: open }),
  setTourStep: (step) => set({ tourStep: step }),
  startTour: () => set({ tourOpen: true, tourStep: 0 }),
  endTour: () => set({ tourOpen: false, tourStep: 0 }),
}));