'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { mockDashboardStats, mockCampaigns, mockPayments } from '@/mock-data';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { toast } from 'sonner';

const MAROON = '#5B1322';
const GOLD = '#D4AF37';
const MAROON_LIGHT = '#7A1D30';

const revenueData = mockDashboardStats.revenueByMonth.map(d => ({
  ...d,
  monthShort: d.month.split(' ')[0],
}));

const memberTrendData = [
  { month: 'Jul', registrations: 245 },
  { month: 'Aug', registrations: 278 },
  { month: 'Sep', registrations: 312 },
  { month: 'Oct', registrations: 340 },
  { month: 'Nov', registrations: 295 },
  { month: 'Dec', registrations: 420 },
  { month: 'Jan', registrations: 380 },
  { month: 'Feb', registrations: 355 },
  { month: 'Mar', registrations: 410 },
  { month: 'Apr', registrations: 450 },
  { month: 'May', registrations: 488 },
  { month: 'Jun', registrations: 296 },
];

const memberStatusData = [
  { name: 'Active', value: 2948, color: MAROON },
  { name: 'Inactive', value: 821, color: '#e5e7eb' },
];

const paymentMethodData = [
  { name: 'PayFast', value: 2850, color: MAROON },
  { name: 'Credit Card', value: 1320, color: GOLD },
  { name: 'EFT', value: 653, color: '#B8860B' },
];

const branchComparisonData = mockDashboardStats.ticketsByBranch.slice(0, 8).map(d => ({
  name: d.branch.length > 10 ? d.branch.slice(0, 10) + '…' : d.branch,
  revenue: d.revenue,
  tickets: d.tickets,
}));

const campaignPerformance = mockCampaigns
  .map(c => ({
    title: c.title,
    branch: c.branch.name,
    sold: c.soldTickets,
    max: c.maxTickets,
    revenue: c.soldTickets * c.ticketPrice,
    progress: c.progress || 0,
    status: c.status,
  }))
  .sort((a, b) => b.revenue - a.revenue);

const chartTooltipStyle = {
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  fontSize: '12px',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08)',
};

export function AdminReports() {
  const [dateRange, setDateRange] = useState('12m');

  function handleExport(format: string) {
    toast.success(`Report exported as ${format.toUpperCase()} successfully.`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive insights across the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last 12 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="rounded-[10px]" onClick={() => handleExport('csv')}>
            <FileText className="w-4 h-4 mr-1.5" /> CSV
          </Button>
          <Button size="sm" className="rounded-[10px] bg-maroon-500 hover:bg-maroon-600 text-white" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-1.5" /> PDF
          </Button>
          <Button variant="outline" size="sm" className="rounded-[10px]" onClick={() => handleExport('xlsx')}>
            <FileSpreadsheet className="w-4 h-4 mr-1.5" /> Excel
          </Button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardContent className="p-5 sm:p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</p>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-2">{formatCurrency(mockDashboardStats.totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardContent className="p-5 sm:p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Monthly Average</p>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-2">{formatCurrency(Math.round(mockDashboardStats.totalRevenue / 12))}</p>
          </CardContent>
        </Card>
        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardContent className="p-5 sm:p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Members</p>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-2">{formatNumber(mockDashboardStats.totalMembers)}</p>
          </CardContent>
        </Card>
        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardContent className="p-5 sm:p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conversion Rate</p>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-2">4.5%</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Report */}
      <Card className="shadow-royal-sm rounded-xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Revenue Report</CardTitle>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-muted-foreground">
                Total: <span className="font-semibold text-foreground">{formatCurrency(mockDashboardStats.totalRevenue)}</span>
              </span>
              <span className="text-muted-foreground">
                Avg: <span className="font-semibold text-foreground">{formatCurrency(Math.round(mockDashboardStats.totalRevenue / 12))}/mo</span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.4} />
                <XAxis dataKey="monthShort" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a3a3a3' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a3a3a3' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke={MAROON} strokeWidth={2.5} dot={{ fill: MAROON, r: 4, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column: Member Report + Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Member Registration Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={memberTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.4} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#a3a3a3' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#a3a3a3' }} />
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [formatNumber(value), 'Registrations']} />
                  <Line type="monotone" dataKey="registrations" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-muted-foreground">Active vs Inactive:</span>
              <Badge variant="secondary" className="text-[10px] bg-maroon-100 text-maroon-700 rounded-md">
                Active: 78%
              </Badge>
              <Badge variant="secondary" className="text-[10px] bg-muted text-muted-foreground rounded-md">
                Inactive: 22%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Payment Methods Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [formatNumber(value), '']} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-muted-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Comparison */}
      <Card className="shadow-royal-sm rounded-xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Branch Comparison</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.4} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a3a3a3' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#a3a3a3' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <RechartsTooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value: number, name: string) => [
                    name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                    name === 'revenue' ? 'Revenue' : 'Tickets',
                  ]}
                />
                <Legend iconType="circle" formatter={(value) => <span className="text-xs text-muted-foreground">{value === 'revenue' ? 'Revenue' : 'Tickets'}</span>} />
                <Bar dataKey="revenue" fill={MAROON} radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="tickets" fill={GOLD} radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Performance Table */}
      <Card className="shadow-royal-sm rounded-xl border-0 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/50">
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">#</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Branch</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Tickets Sold</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Revenue</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Progress</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignPerformance.map((c, i) => (
                  <TableRow key={i} className="hover:bg-maroon-50/30 transition-colors">
                    <TableCell className="text-xs text-muted-foreground py-3.5">{i + 1}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground max-w-[200px] truncate py-3.5">{c.title}</TableCell>
                    <TableCell className="text-xs text-muted-foreground py-3.5">{c.branch}</TableCell>
                    <TableCell className="text-sm text-right py-3.5">
                      {formatNumber(c.sold)} <span className="text-xs text-muted-foreground">/ {formatNumber(c.max)}</span>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-right py-3.5">{formatCurrency(c.revenue)}</TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-maroon-500" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">{c.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge variant="secondary" className={`text-[10px] rounded-md ${c.status === 'open' ? 'bg-maroon-100 text-maroon-700' : c.status === 'completed' ? 'bg-muted text-muted-foreground' : 'bg-muted text-muted-foreground'}`}>
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
    </div>
  );
}