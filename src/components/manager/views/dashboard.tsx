'use client';

import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  TrendingUp,
  Trophy,
  Ticket,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  ShieldCheck,
  Clock,
  UserPlus,
  CreditCard,
  Activity,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  mockBranchManager,
  mockBranches,
  mockCampaigns,
  getBranchStats,
} from '@/mock-data';
import { cn } from '@/lib/utils';

const branchId = mockBranchManager.branchId ?? 'branch-jhb-n';
const branch = mockBranches.find(b => b.id === branchId);
const branchStats = getBranchStats(branchId);
const branchCampaigns = mockCampaigns.filter(c => c.branchId === branchId && c.status === 'open');

// Revenue data for this branch (last 6 months)
const branchRevenueData = [
  { month: 'Jan', revenue: 98000, tickets: 42 },
  { month: 'Feb', revenue: 115000, tickets: 48 },
  { month: 'Mar', revenue: 132000, tickets: 55 },
  { month: 'Apr', revenue: 148000, tickets: 62 },
  { month: 'May', revenue: 165000, tickets: 70 },
  { month: 'Jun', revenue: 142000, tickets: 58 },
];

// Recent members for this branch
const recentMembers = [
  { name: 'Aiden Mabena', email: 'aiden.mabena@email.co.za', status: 'active' as const, joinDate: '2025-06-10' },
  { name: 'Zanele Khumalo', email: 'zanele.k@email.co.za', status: 'active' as const, joinDate: '2025-06-08' },
  { name: 'Pieter du Plessis', email: 'pieter.dp@email.co.za', status: 'pending' as const, joinDate: '2025-06-05' },
  { name: 'Nomsa Dlamini', email: 'nomsa.d@email.co.za', status: 'active' as const, joinDate: '2025-06-03' },
  { name: 'Kyle van Niekerk', email: 'kyle.vn@email.co.za', status: 'suspended' as const, joinDate: '2025-06-01' },
];

// Activity feed for this branch
const branchActivities = [
  { icon: UserPlus, text: 'Aiden Mabena joined Johannesburg North', time: '2 hours ago', color: 'text-forest-600 bg-forest-50' },
  { icon: CreditCard, text: 'R3,500 in ticket purchases from Zanele Khumalo', time: '4 hours ago', color: 'text-gold-600 bg-gold-50' },
  { icon: Ticket, text: 'Penthouse Suite campaign reached 78% sold', time: '6 hours ago', color: 'text-forest-600 bg-forest-50' },
  { icon: Trophy, text: 'R500K Cash Jackpot campaign launched', time: '1 day ago', color: 'text-gold-600 bg-gold-50' },
  { icon: Activity, text: 'Monthly branch report generated', time: '2 days ago', color: 'text-neutral-600 bg-neutral-100' },
];

const statusColor: Record<string, string> = {
  active: 'bg-forest-100 text-forest-700',
  pending: 'bg-gold-100 text-gold-700',
  suspended: 'bg-red-100 text-red-700',
  deactivated: 'bg-neutral-100 text-neutral-500',
};

function formatZAR(amount: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ManagerDashboard() {
  const stats = useMemo(() => [
    {
      label: 'Total Members',
      value: branch?.memberCount?.toLocaleString() ?? '342',
      change: '+12.5%',
      positive: true,
      icon: Users,
      color: 'text-forest-600',
      bg: 'bg-forest-50',
    },
    {
      label: 'Revenue This Month',
      value: formatZAR(branchRevenueData[5].revenue),
      change: '+8.2%',
      positive: true,
      icon: TrendingUp,
      color: 'text-gold-600',
      bg: 'bg-gold-50',
    },
    {
      label: 'Active Campaigns',
      value: String(branchStats?.activeCampaignCount ?? branchCampaigns.length),
      change: '+2',
      positive: true,
      icon: Trophy,
      color: 'text-forest-600',
      bg: 'bg-forest-50',
    },
    {
      label: 'Tickets Sold',
      value: branchStats?.totalTicketsSold?.toLocaleString() ?? '—',
      change: '+15.3%',
      positive: true,
      icon: Ticket,
      color: 'text-gold-600',
      bg: 'bg-gold-50',
    },
  ], []);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-forest-900">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your branch performance and activity
        </p>
      </div>

      {/* Branch Info Card */}
      <Card id="manager-branch-info" className="border-l-4 border-l-forest-500 bg-gradient-to-r from-forest-50/50 to-white">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-forest-100 text-forest-700">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-forest-900">
                  {branch?.name ?? 'Johannesburg North'}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                  <span className="font-mono text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded">
                    {branch?.code ?? 'JHB-N'}
                  </span>
                  <span>{branch?.memberCount ?? 342} members</span>
                  <span>Manager: {mockBranchManager.firstName} {mockBranchManager.lastName}</span>
                </div>
              </div>
            </div>
            <Badge className="bg-forest-100 text-forest-700 hover:bg-forest-200 border-0 text-xs font-medium gap-1.5 px-3 py-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div id="manager-stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', stat.bg)}>
                    <Icon className={cn('w-5 h-5', stat.color)} />
                  </div>
                  <div
                    className={cn(
                      'flex items-center gap-0.5 text-xs font-medium rounded-full px-2 py-0.5',
                      stat.positive
                        ? 'text-forest-600 bg-forest-50'
                        : 'text-red-600 bg-red-50'
                    )}
                  >
                    {stat.positive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card id="manager-chart" className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for your branch (last 6 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={branchRevenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#15803d" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#15803d" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: '#737373' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#737373' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '13px',
                    }}
                    formatter={(value: number) => [formatZAR(value), 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#15803d"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    dot={{ fill: '#15803d', r: 4, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, stroke: '#15803d', strokeWidth: 2, fill: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card id="manager-activity">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest events in your branch</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {branchActivities.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-6 py-3.5 hover:bg-muted/30 transition-colors"
                  >
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5', activity.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-neutral-700 leading-snug">
                        {activity.text}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Members Table */}
      <Card id="manager-members-table">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Recent Members</CardTitle>
          <CardDescription>Newest members in your branch</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Join Date</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMembers.map((member, i) => (
                <TableRow key={i} className="group">
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      className={cn(
                        'border-0 text-xs font-medium capitalize',
                        statusColor[member.status]
                      )}
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {new Date(member.joinDate).toLocaleDateString('en-ZA', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-xs text-forest-600 hover:text-forest-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Campaign Performance */}
      <div>
        <h2 className="text-base font-semibold text-forest-900 mb-3">Active Campaigns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {branchCampaigns.map((campaign) => {
            const pct = campaign.progress ?? Math.round((campaign.soldTickets / campaign.maxTickets) * 100);
            const revenue = campaign.soldTickets * campaign.ticketPrice;
            return (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-neutral-900 truncate">
                        {campaign.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Draw: {new Date(campaign.drawDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <Badge className="shrink-0 bg-forest-100 text-forest-700 border-0 text-xs">
                      {pct}%
                    </Badge>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>{campaign.soldTickets} / {campaign.maxTickets} tickets</span>
                      <span className="font-medium text-forest-700">{formatZAR(revenue)}</span>
                    </div>
                    <Progress value={pct} className="h-2 bg-neutral-100 [&>[data-slot=indicator]]:bg-forest-500" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}