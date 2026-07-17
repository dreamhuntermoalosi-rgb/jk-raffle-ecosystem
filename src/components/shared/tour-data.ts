'use client';

export interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

// ============================================
// Member Dashboard Tour Steps (6 steps)
// ============================================
export const memberTourSteps: TourStep[] = [
  {
    targetId: 'member-welcome',
    title: 'Welcome Back!',
    description:
      'Your personalized dashboard overview with key stats at a glance.',
    position: 'bottom',
  },
  {
    targetId: 'member-stats',
    title: 'Your Statistics',
    description:
      'Track your active tickets, total spend, winnings, and upcoming draws.',
    position: 'bottom',
  },
  {
    targetId: 'member-countdown',
    title: 'Draw Countdown',
    description:
      'Never miss a draw — this live countdown shows time remaining.',
    position: 'bottom',
  },
  {
    targetId: 'member-tickets-table',
    title: 'Your Tickets',
    description:
      'View all your purchased tickets with status and campaign details.',
    position: 'top',
  },
  {
    targetId: 'member-activity',
    title: 'Recent Activity',
    description:
      'Your latest actions and notifications in chronological order.',
    position: 'top',
  },
  {
    targetId: 'member-actions',
    title: 'Quick Actions',
    description:
      'Jump to common tasks: buy tickets, view all tickets, or check your profile.',
    position: 'top',
  },
];

// ============================================
// Manager Dashboard Tour Steps (5 steps)
// ============================================
export const managerTourSteps: TourStep[] = [
  {
    targetId: 'manager-branch-info',
    title: 'Branch Overview',
    description:
      'Your branch details and key performance metrics.',
    position: 'bottom',
  },
  {
    targetId: 'manager-stats',
    title: 'Branch Statistics',
    description:
      'Members, revenue, campaigns, and ticket sales at a glance.',
    position: 'bottom',
  },
  {
    targetId: 'manager-chart',
    title: 'Revenue Trend',
    description:
      "Visual breakdown of your branch's monthly revenue performance.",
    position: 'bottom',
  },
  {
    targetId: 'manager-members-table',
    title: 'Member Management',
    description:
      'Search, filter, and manage all branch members.',
    position: 'top',
  },
  {
    targetId: 'manager-activity',
    title: 'Activity Feed',
    description:
      'Recent actions and updates from your branch.',
    position: 'top',
  },
];

// ============================================
// Admin Dashboard Tour Steps (7 steps)
// ============================================
export const adminTourSteps: TourStep[] = [
  {
    targetId: 'admin-kpis',
    title: 'Key Performance Indicators',
    description:
      'System-wide metrics: revenue, users, campaigns, and more.',
    position: 'bottom',
  },
  {
    targetId: 'admin-revenue-chart',
    title: 'Revenue Analytics',
    description:
      '12-month revenue trend across all branches.',
    position: 'bottom',
  },
  {
    targetId: 'admin-campaigns-table',
    title: 'Campaign Overview',
    description:
      'Monitor all active campaigns with performance data.',
    position: 'top',
  },
  {
    targetId: 'admin-branch-chart',
    title: 'Branch Performance',
    description:
      'Compare branch performance side by side.',
    position: 'top',
  },
  {
    targetId: 'admin-activity',
    title: 'System Activity',
    description:
      'Recent system events and admin actions.',
    position: 'top',
  },
  {
    targetId: 'admin-system-health',
    title: 'System Health',
    description:
      'Monitor system uptime, API status, and performance.',
    position: 'top',
  },
  {
    targetId: 'admin-sidebar',
    title: 'Navigation',
    description:
      'Access all admin features from the sidebar.',
    position: 'right',
  },
];