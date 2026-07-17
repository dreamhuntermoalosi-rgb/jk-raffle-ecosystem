'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Trophy,
  Users,
  Ticket,
  Clock,
  AlertCircle,
  CheckCircle2,
  Activity,
  Server,
  Database,
  Wifi,
  Mail,
  Shield,
} from 'lucide-react';
import {
  mockDashboardStats,
  mockCampaigns,
  mockActivityLogs,
  mockAdmin,
  mockUsers,
  mockSupportTickets,
} from '@/mock-data';
import { formatCurrency, formatNumber, formatDate, getInitials, getStatusColor } from '@/lib/utils';
import type { Campaign } from '@/types';

const FOREST = 'hsl(152, 68%, 35%)';
const FOREST_LIGHT = 'hsl(152, 68%, 93%)';
const GOLD = 'hsl(43, 96%, 56%)';
const GOLD_LIGHT = 'hsl(43, 96%, 93%)';

const openTickets = mockSupportTickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;

const kpiCards = [
  {
    label: 'Total Revenue',
    value: formatCurrency(mockDashboardStats.totalRevenue),
    raw: mockDashboardStats.totalRevenue,
    trend: '+18.2%',
    trendUp: true,
    icon: DollarSign,
    color: 'text-[hsl(152,68%,35%)]',
    bg: 'bg-[hsl(152,68%,35%)]/10',
  },
  {
    label: 'Active Campaigns',
    value: String(mockDashboardStats.activeCampaigns),
    raw: mockDashboardStats.activeCampaigns,
    trend: '+3 this month',
    trendUp: true,
    icon: Trophy,
    color: 'text-[hsl(43,96%,36%)]',
    bg: 'bg-[hsl(43,96%,56%)]/10',
  },
  {
    label: 'Total Members',
    value: formatNumber(mockDashboardStats.totalMembers),
    raw: mockDashboardStats.totalMembers,
    trend: '+12.5%',
    trendUp: true,
    icon: Users,
    color: 'text-[hsl(152,68%,35%)]',
    bg: 'bg-[hsl(152,68%,35%)]/10',
  },
  {
    label: 'Tickets Sold',
    value: formatNumber(mockDashboardStats.totalTicketsSold),
    raw: mockDashboardStats.totalTicketsSold,
    trend: '+24.3%',
    trendUp: true,
    icon: Ticket,
    color: 'text-[hsl(43,96%,36%)]',
    bg: 'bg-[hsl(43,96%,56%)]/10',
  },
  {
    label: 'Monthly Growth',
    value: `${mockDashboardStats.monthlyGrowth}%`,
    raw: mockDashboardStats.monthlyGrowth,
    trend: '+2.1% vs last',
    trendUp: true,
    icon: TrendingUp,
    color: 'text-[hsl(152,68%,35%)]',
    bg: 'bg-[hsl(152,68%,35%)]/10',
  },
  {
    label: 'Pending Payments',
    value: String(mockDashboardStats.pendingPayments),
    raw: mockDashboardStats.pendingPayments,
    trend: '-5 vs last week',
    trendUp: true,
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    label: 'Open Support Tickets',
    value: String(openTickets),
    raw: openTickets,
    trend: `${mockSupportTickets.filter(t => t.status === 'open').length} new`,
    trendUp: false,
    icon: AlertCircle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    label: 'Total Winners',
    value: formatNumber(mockDashboardStats.totalWinners),
    raw: mockDashboardStats.totalWinners,
    trend: '+6 this month',
    trendUp: true,
    icon: CheckCircle2,
    color: 'text-[hsl(43,96%,36%)]',
    bg: 'bg-[hsl(43,96%,56%)]/10',
  },
];

const systemHealth = [
  { name: 'API Status', status: 'Operational', icon: Server, ok: true },
  { name: 'Database', status: 'Healthy', icon: Database, ok: true },
  { name: 'Payment Gateway', status: 'Connected', icon: Shield, ok: true },
  { name: 'Email Service', status: 'Active', icon: Mail, ok: true },
];

const activityUsers = [...mockUsers];
const extraActivities = [
  { id: 'a-100', userId: 'user-thabo', action: 'Updated campaign settings', entity: 'Luxury Sandton Villa Raffle', entityId: 'camp-1', details: { changes: 'Extended draw date' }, createdAt: '2025-06-12T09:15:00Z' },
  { id: 'a-101', userId: 'user-sarah', action: 'Approved refund request', entity: 'Order #ORD-018', entityId: 'ord-018', details: { amount: 1500 }, createdAt: '2025-06-12T08:45:00Z' },
  { id: 'a-102', userId: 'user-david', action: 'Created new campaign', entity: 'BMW X5 Premium Raffle', entityId: 'camp-new-1', details: { branch: 'Johannesburg North' }, createdAt: '2025-06-12T07:30:00Z' },
];
const allActivities = [...extraActivities, ...mockActivityLogs].slice(0, 8);

function getUserForActivity(userId: string) {
  return activityUsers.find(u => u.id === userId) || mockAdmin;
}

const topCampaigns: Campaign[] = mockDashboardStats.topCampaigns;

const revenueData = mockDashboardStats.revenueByMonth.map(d => ({
  ...d,
  monthShort: d.month.split(' ')[0],
}));

const branchBarData = mockDashboardStats.ticketsByBranch.slice(0, 5).map(d => ({
  name: d.branch.length > 12 ? d.branch.slice(0, 12) + '…' : d.branch,
  revenue: d.revenue,
  tickets: d.tickets,
}));

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[hsl(152,68%,25%)] to-[hsl(152,68%,40%)] p-6 sm:p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {mockAdmin.firstName}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-white/80">
            Here&apos;s what&apos;s happening with JK Raffle today.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-white/90">All Systems Operational</span>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <div className="absolute right-8 top-6 w-48 h-48 border-2 border-white rounded-full" />
          <div className="absolute right-16 top-16 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute right-24 top-24 w-16 h-16 border-2 border-white rounded-full" />
        </div>
      </div>

      {/* KPI Grid */}
      <div id="admin-kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{kpi.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                  </div>
                  <div className={`p-2.5 rounded-lg ${kpi.bg}`}>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  {kpi.trendUp ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-orange-500" />
                  )}
                  <span className={`text-xs font-medium ${kpi.trendUp ? 'text-emerald-600' : 'text-orange-600'}`}>
                    {kpi.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <Card id="admin-revenue-chart">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
            <Badge variant="secondary" className="text-xs font-normal">
              Last 12 Months
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="forestGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={FOREST} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={FOREST} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={GOLD} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={GOLD} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="monthShort"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [formatCurrency(value), '']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke={FOREST}
                  strokeWidth={2.5}
                  fill="url(#forestGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="tickets"
                  name="Tickets"
                  stroke={GOLD}
                  strokeWidth={2}
                  fill="url(#goldGradient)"
                  yAxisId={0}
                  hide
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column: Campaigns + Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaigns Overview */}
        <Card id="admin-campaigns-table">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Top Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Campaign</TableHead>
                    <TableHead className="text-xs">Branch</TableHead>
                    <TableHead className="text-xs">Progress</TableHead>
                    <TableHead className="text-xs text-right">Revenue</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCampaigns.map((c) => (
                    <TableRow key={c.id} className="hover:bg-slate-50">
                      <TableCell className="text-sm font-medium text-slate-900 max-w-[140px] truncate">
                        {c.title}
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">{c.branch.name}</TableCell>
                      <TableCell className="w-28">
                        <div className="flex items-center gap-2">
                          <Progress value={c.progress || 0} className="h-1.5 flex-1" />
                          <span className="text-xs text-slate-500 w-8 text-right">{c.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-right">
                        {formatCurrency(c.soldTickets * c.ticketPrice)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-[10px] ${getStatusColor(c.status)}`}>
                          {c.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Branch Performance */}
        <Card id="admin-branch-chart">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Branch Revenue (Top 5)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchBarData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    width={100}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill={FOREST} radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Activity + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2" id="admin-activity">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {allActivities.map((activity) => {
                const user = getUserForActivity(activity.userId);
                return (
                  <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                    <Avatar className="w-8 h-8 flex-shrink-0 mt-0.5">
                      <AvatarFallback className="bg-slate-100 text-slate-600 text-[11px] font-semibold">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-700">
                        <span className="font-medium text-slate-900">{user.firstName} {user.lastName}</span>{' '}
                        {activity.action.toLowerCase()}
                      </p>
                      {activity.entity && (
                        <p className="text-xs text-slate-500 truncate mt-0.5">{activity.entity}</p>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap">
                      {formatDate(activity.createdAt, 'relative')}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card id="admin-system-health">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">System Health</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {systemHealth.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <Icon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-emerald-600">{item.status}</p>
                  </div>
                  <Wifi className="w-4 h-4 text-emerald-500" />
                </div>
              );
            })}

            <div className="mt-4 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-medium text-slate-500">Uptime</span>
              </div>
              <p className="text-xl font-bold text-slate-900">99.97%</p>
              <p className="text-xs text-slate-400 mt-0.5">Last 30 days</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}