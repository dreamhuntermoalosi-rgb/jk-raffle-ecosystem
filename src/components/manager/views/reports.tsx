'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Download,
  FileText,
  TrendingUp,
  Ticket,
  Receipt,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { mockDashboardStats, mockCampaigns, mockBranchManager, getBranchStats } from '@/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const branchId = mockBranchManager.branchId ?? 'branch-jhb-n';
const branchCampaigns = mockCampaigns.filter(c => c.branchId === branchId);

type DateRange = 'this-month' | 'last-month' | 'last-3' | 'this-year';

const dateRanges: { id: DateRange; label: string }[] = [
  { id: 'this-month', label: 'This Month' },
  { id: 'last-month', label: 'Last Month' },
  { id: 'last-3', label: 'Last 3 Months' },
  { id: 'this-year', label: 'This Year' },
];

// Branch-specific data for reports
const revenueByMonth = [
  { month: 'Jul 24', revenue: 98000 },
  { month: 'Aug 24', revenue: 115000 },
  { month: 'Sep 24', revenue: 132000 },
  { month: 'Oct 24', revenue: 148000 },
  { month: 'Nov 24', revenue: 125000 },
  { month: 'Dec 24', revenue: 168000 },
  { month: 'Jan 25', revenue: 142000 },
  { month: 'Feb 25', revenue: 128000 },
  { month: 'Mar 25', revenue: 155000 },
  { month: 'Apr 25', revenue: 172000 },
  { month: 'May 25', revenue: 195000 },
  { month: 'Jun 25', revenue: 142000 },
];

const memberGrowth = [
  { month: 'Jul 24', members: 210 },
  { month: 'Aug 24', members: 228 },
  { month: 'Sep 24', members: 241 },
  { month: 'Oct 24', members: 258 },
  { month: 'Nov 24', members: 272 },
  { month: 'Dec 24', members: 289 },
  { month: 'Jan 25', members: 298 },
  { month: 'Feb 25', members: 309 },
  { month: 'Mar 25', members: 318 },
  { month: 'Apr 25', members: 326 },
  { month: 'May 25', members: 335 },
  { month: 'Jun 25', members: 342 },
];

const ticketsByCategory = [
  { name: 'Houses', value: 234, color: '#15803d' },
  { name: 'Vehicles', value: 186, color: '#d97706' },
  { name: 'Cash', value: 145, color: '#059669' },
  { name: 'Electronics', value: 98, color: '#ca8a04' },
  { name: 'Vacations', value: 67, color: '#166534' },
];

const topCampaigns = branchCampaigns
  .filter(c => c.status === 'open' || c.status === 'completed')
  .sort((a, b) => b.soldTickets - a.soldTickets)
  .map(c => ({
    id: c.id,
    title: c.title,
    soldTickets: c.soldTickets,
    revenue: c.soldTickets * c.ticketPrice,
    completion: Math.round((c.soldTickets / c.maxTickets) * 100),
    status: c.status,
  }));

// Summary data based on date range
const rangeSummary: Record<DateRange, { revenue: number; tickets: number; avgOrder: number; conversion: number }> = {
  'this-month': { revenue: 142000, tickets: 58, avgOrder: 2448, conversion: 4.2 },
  'last-month': { revenue: 195000, tickets: 70, avgOrder: 2786, conversion: 5.1 },
  'last-3': { revenue: 509000, tickets: 190, avgOrder: 2679, conversion: 4.8 },
  'this-year': { revenue: 1620000, tickets: 662, avgOrder: 2447, conversion: 4.5 },
};

function formatZAR(amount: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const forestColors = ['#15803d', '#166534', '#14532d', '#059669', '#047857'];
const goldColors = ['#d97706', '#ca8a04', '#b45309', '#a16207', '#854d0e'];

export function ManagerReports() {
  const [activeRange, setActiveRange] = useState<DateRange>('this-month');

  const summary = rangeSummary[activeRange];

  const summaryCards = [
    {
      label: 'Total Revenue',
      value: formatZAR(summary.revenue),
      change: '+12.3%',
      positive: true,
      icon: TrendingUp,
      color: 'text-forest-600',
      bg: 'bg-forest-50',
    },
    {
      label: 'Total Tickets',
      value: summary.tickets.toLocaleString(),
      change: '+8.7%',
      positive: true,
      icon: Ticket,
      color: 'text-gold-600',
      bg: 'bg-gold-50',
    },
    {
      label: 'Avg Order Value',
      value: formatZAR(summary.avgOrder),
      change: '-2.1%',
      positive: false,
      icon: Receipt,
      color: 'text-forest-600',
      bg: 'bg-forest-50',
    },
    {
      label: 'Conversion Rate',
      value: `${summary.conversion}%`,
      change: '+0.4%',
      positive: true,
      icon: Target,
      color: 'text-gold-600',
      bg: 'bg-gold-50',
    },
  ];

  function handleExport(type: 'csv' | 'pdf') {
    toast.success(`${type.toUpperCase()} report generated successfully.`, {
      description: `Your ${type.toUpperCase()} file is ready for download.`,
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-forest-900">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Performance insights for your branch
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => handleExport('csv')}
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => handleExport('pdf')}
          >
            <FileText className="w-3.5 h-3.5" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex flex-wrap gap-2">
        {dateRanges.map((r) => (
          <Button
            key={r.id}
            variant={activeRange === r.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveRange(r.id)}
            className={cn(
              'text-xs font-medium transition-all',
              activeRange === r.id
                ? 'bg-forest-600 hover:bg-forest-700 text-white shadow-sm'
                : 'text-muted-foreground hover:text-forest-700 hover:border-forest-300'
            )}
          >
            {r.label}
          </Button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow duration-200">
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Month — Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue by Month</CardTitle>
            <CardDescription>Monthly branch revenue (ZAR)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByMonth} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#737373' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#737373' }}
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
                  <Bar
                    dataKey="revenue"
                    fill="#15803d"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tickets by Category — Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Tickets by Category</CardTitle>
            <CardDescription>Distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketsByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {ticketsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '13px',
                    }}
                    formatter={(value: number, name: string) => [`${value} tickets`, name]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span className="text-xs text-neutral-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Growth — Line Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Member Growth</CardTitle>
          <CardDescription>New member registrations over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memberGrowth} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#737373' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#737373' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '13px',
                  }}
                  formatter={(value: number) => [value, 'Members']}
                />
                <Line
                  type="monotone"
                  dataKey="members"
                  stroke="#15803d"
                  strokeWidth={2.5}
                  dot={{ fill: '#15803d', r: 4, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, stroke: '#15803d', strokeWidth: 2, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Campaigns Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Top Campaigns</CardTitle>
          <CardDescription>Performance ranking by tickets sold</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Campaign
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell text-right">
                  Tickets Sold
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell text-right">
                  Revenue
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-40">
                  Progress
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="group hover:bg-forest-50/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-neutral-900 truncate max-w-[240px]">
                        {campaign.title}
                      </p>
                      {campaign.status === 'completed' && (
                        <Badge className="shrink-0 bg-forest-100 text-forest-700 border-0 text-[10px] font-medium">
                          Done
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right text-sm font-medium text-neutral-700">
                    {campaign.soldTickets.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right text-sm font-medium text-neutral-700">
                    {formatZAR(campaign.revenue)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={campaign.completion} className="h-2 flex-1 bg-neutral-100 [&>[data-slot=indicator]]:bg-forest-500" />
                      <span className="text-xs font-medium text-muted-foreground w-10 text-right">
                        {campaign.completion}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}