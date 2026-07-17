'use client';

import { useState, useEffect } from 'react';
import {
  Ticket,
  Wallet,
  Trophy,
  Bell,
  ShoppingCart,
  List,
  UserCircle,
  Headphones,
  TrendingUp,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, formatCurrency, formatCountdown, formatDate, getStatusColor } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { mockCurrentUser, mockTickets, mockCampaigns, mockActivityLogs, mockNotifications } from '@/mock-data';
import type { Ticket as TicketType } from '@/types';

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState(formatCountdown(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (countdown.expired) {
    return <span className="text-amber-600 font-semibold">Draw in progress</span>;
  }

  return (
    <div className="flex gap-3">
      {[
        { value: countdown.days, label: 'Days' },
        { value: countdown.hours, label: 'Hours' },
        { value: countdown.minutes, label: 'Min' },
        { value: countdown.seconds, label: 'Sec' },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[48px]">
            <span className="text-2xl font-bold text-white tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] text-emerald-100 uppercase tracking-wider mt-1 block">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function getActivityIcon(action: string) {
  if (action.includes('login')) return '🔐';
  if (action.includes('order.create')) return '🛒';
  if (action.includes('refund')) return '💸';
  if (action.includes('ticket.view')) return '🎫';
  if (action.includes('profile')) return '👤';
  return '📌';
}

function getActivityDescription(log: typeof mockActivityLogs[0]) {
  const details = log.details || {};
  if (log.action === 'user.login') {
    return `Signed in from ${details.device} in ${details.location}`;
  }
  if (log.action === 'order.create') {
    return `Purchased ${details.ticketCount} ticket${details.ticketCount > 1 ? 's' : ''} for R${details.totalAmount}`;
  }
  if (log.action === 'order.refund') {
    return `Refund of R${details.refundAmount} processed — ${details.reason}`;
  }
  if (log.action === 'ticket.view') {
    return `Viewed ticket ${details.reference} for "${details.campaignTitle}"`;
  }
  if (log.action === 'profile.update') {
    return `Updated ${details.field} in profile`;
  }
  return log.action;
}

export function MemberDashboard() {
  const { setView } = useAppStore();
  const user = mockCurrentUser;

  // Compute stats
  const memberTickets = mockTickets.filter((t) => t.userId === user.id);
  const activeTickets = memberTickets.filter((t) => t.status === 'active');
  const totalSpent = memberTickets.reduce((sum, t) => {
    const campaign = mockCampaigns.find((c) => c.id === t.campaignId);
    return sum + (campaign?.ticketPrice || 0);
  }, 0);
  const campaignsEntered = new Set(memberTickets.map((t) => t.campaignId)).size;
  const unreadCount = mockNotifications.filter((n) => n.status === 'unread').length;

  // Nearest draw
  const userOpenCampaigns = mockCampaigns
    .filter((c) => c.status === 'open')
    .filter((c) => memberTickets.some((t) => t.campaignId === c.id && t.status === 'active'))
    .sort((a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime());
  const fallbackCampaigns = mockCampaigns
    .filter((c) => c.status === 'open')
    .sort((a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime());
  const nearestDraw = userOpenCampaigns[0] || fallbackCampaigns[0] || null;

  const ticketsOwnedForDraw = nearestDraw
    ? memberTickets.filter((t) => t.campaignId === nearestDraw.id && t.status === 'active').length
    : 0;

  // Recent 5 tickets
  const recentTickets = [...memberTickets]
    .sort((a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      label: 'Active Tickets',
      value: activeTickets.length,
      icon: Ticket,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      trend: '+3 this week',
    },
    {
      label: 'Total Spent',
      value: formatCurrency(totalSpent),
      icon: Wallet,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      trend: 'Lifetime',
    },
    {
      label: 'Campaigns Entered',
      value: campaignsEntered,
      icon: Trophy,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      trend: `${activeTickets.length} tickets active`,
    },
    {
      label: 'Notifications',
      value: unreadCount,
      icon: Bell,
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-950/30',
      trend: unreadCount > 0 ? 'Unread' : 'All caught up',
    },
  ];

  const quickActions = [
    { label: 'Buy Tickets', icon: ShoppingCart, view: 'purchase', color: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
    { label: 'View All Tickets', icon: Ticket, view: 'tickets', color: 'bg-white hover:bg-muted text-foreground border' },
    { label: 'My Profile', icon: UserCircle, view: 'profile', color: 'bg-white hover:bg-muted text-foreground border' },
    { label: 'Support', icon: Headphones, view: 'notifications', color: 'bg-white hover:bg-muted text-foreground border' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="overflow-hidden border-0">
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <span className="text-emerald-200 text-sm font-medium">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome back, {user.firstName}
              </h1>
              <p className="text-emerald-200 mt-1">
                You have <span className="text-amber-300 font-semibold">{activeTickets.length} active tickets</span> across{' '}
                {campaignsEntered} campaigns. Good luck!
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setView('purchase')}
                className="bg-amber-500 hover:bg-amber-600 text-emerald-900 font-semibold shadow-lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Tickets
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1 tabular-nums">{stat.value}</p>
                  </div>
                  <div className={cn('p-2.5 rounded-lg', stat.bg)}>
                    <Icon className={cn('h-5 w-5', stat.color)} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Draw - spans 2 cols */}
        {nearestDraw && (
          <Card className="lg:col-span-2 overflow-hidden border-2 border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base">Upcoming Draw</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl p-5 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <Badge className="bg-amber-500 text-emerald-900 font-semibold mb-3">
                      {nearestDraw.progress}% Sold
                    </Badge>
                    <h3 className="text-xl font-bold mb-1">{nearestDraw.title}</h3>
                    <p className="text-emerald-200 text-sm">
                      {formatCurrency(nearestDraw.product.value)} prize
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-emerald-200 text-xs">
                      <MapPin className="h-3.5 w-3.5" />
                      {nearestDraw.drawLocation}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-amber-300" />
                      <span className="text-sm">
                        You own <span className="font-bold text-amber-300">{ticketsOwnedForDraw}</span> ticket{ticketsOwnedForDraw !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-emerald-200 uppercase tracking-wider">Time Remaining</span>
                    <CountdownTimer targetDate={nearestDraw.drawDate} />
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-emerald-200 mb-1">
                    <span>{nearestDraw.soldTickets} sold</span>
                    <span>{nearestDraw.maxTickets} total</span>
                  </div>
                  <div className="w-full bg-emerald-900/50 rounded-full h-2">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${nearestDraw.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="ghost"
                  onClick={() => setView(action.view)}
                  className={cn(
                    'h-auto py-4 flex-col gap-2 rounded-xl transition-all',
                    action.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{action.label}</span>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets Table + Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <List className="h-5 w-5 text-muted-foreground" />
              My Recent Tickets
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-700 hover:text-emerald-800 text-xs"
              onClick={() => setView('tickets')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Reference</TableHead>
                  <TableHead className="text-xs">Campaign</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTickets.map((ticket) => {
                  const campaign = mockCampaigns.find((c) => c.id === ticket.campaignId);
                  return (
                    <TableRow key={ticket.id} className="text-sm">
                      <TableCell className="font-mono text-xs font-medium">
                        {ticket.reference}
                      </TableCell>
                      <TableCell className="text-xs truncate max-w-[140px]">
                        {campaign?.title || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn('text-[10px] px-2 py-0.5', getStatusColor(ticket.status))}
                        >
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground text-right">
                        {formatDate(ticket.purchasedAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity Timeline */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-0 max-h-80 overflow-y-auto pr-2">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

              {mockActivityLogs.slice(0, 7).map((log, index) => (
                <div key={log.id} className="flex gap-4 pb-5 relative">
                  {/* Dot */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm">
                    {getActivityIcon(log.action)}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm text-foreground leading-snug">
                      {getActivityDescription(log)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(log.createdAt, 'relative')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}