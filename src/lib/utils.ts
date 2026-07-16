// ============================================
// JK RAFFLE ECOSYSTEM - Utility Functions
// ============================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'ZAR'): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-ZA').format(num);
}

export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = new Date(date);
  
  if (format === 'relative') {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 7) return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-ZA', { 
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  }
  
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatCountdown(targetDate: string | Date): { days: number; hours: number; minutes: number; seconds: number; expired: boolean } {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;
  
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    expired: false,
  };
}

export function generateTicketReference(): string {
  const letters1 = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                   String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                   String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const numbers = Math.floor(Math.random() * 900) + 100;
  return `JKR-${letters1}-${numbers}`;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    open: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    won: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    claimed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    paused: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    closed: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400',
    archived: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-500',
    expired: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-500',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    refunded: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    cancelled: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-500',
    suspended: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    deactivated: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-500',
    draft: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-500',
    resolved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    upcoming: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    ongoing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    delivered: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    read: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-500',
    unread: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-500',
  };
  return colors[status] || 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400';
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    house: '🏠',
    vehicle: '🚗',
    electronics: '💻',
    cash: '💰',
    vacation: '✈️',
    other: '🎁',
  };
  return icons[category] || '🎁';
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}