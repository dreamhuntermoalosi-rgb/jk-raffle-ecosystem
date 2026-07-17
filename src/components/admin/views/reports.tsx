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

const FOREST = 'hsl(152, 68%, 35%)';
const GOLD = 'hsl(43, 96%, 56%)';
const FOREST_LIGHT = 'hsl(152, 68%, 75%)';

// Revenue by month data
const revenueData = mockDashboardStats.revenueByMonth.map(d => ({
  ...d,
  monthShort: d.month.split(' ')[0],
}));

// Member registration trends (mock)
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

// Active vs Inactive members
const memberStatusData = [
  { name: 'Active', value: 2948, color: FOREST },
  { name: 'Inactive', value: 821, color: '#e2e8f0' },
];

// Payment methods
const paymentMethodData = [
  { name: 'PayFast', value: 2850, color: FOREST },
  { name: 'Credit Card', value: 1320, color: GOLD },
  { name: 'EFT', value: 653, color: '#f97316' },
];

// Branch comparison
const branchComparisonData = mockDashboardStats.ticketsByBranch.slice(0, 8).map(d => ({
  name: d.branch.length > 10 ? d.branch.slice(0, 10) + '…' : d.branch,
  revenue: d.revenue,
  tickets: d.tickets,
}));

// Campaign performance
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
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Comprehensive insights across the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36">
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
          <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
            <FileText className="w-4 h-4 mr-1.5" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-1.5" /> PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('xlsx')}>
            <FileSpreadsheet className="w-4 h-4 mr-1.5" /> Excel
          </Button>
        </div>
      </div>

      {/* Revenue Report */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Revenue Report</CardTitle>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-500">
                Total: <span className="font-semibold text-slate-900">{formatCurrency(mockDashboardStats.totalRevenue)}</span>
              </span>
              <span className="text-slate-500">
                Avg: <span className="font-semibold text-slate-900">{formatCurrency(Math.round(mockDashboardStats.totalRevenue / 12))}</span>/mo
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="monthShort" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke={FOREST} strokeWidth={2.5} dot={{ fill: FOREST, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column: Member Report + Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Registration Trends */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Member Registration Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={memberTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(value: number) => [formatNumber(value), 'Registrations']}
                  />
                  <Line type="monotone" dataKey="registrations" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-slate-500">Active vs Inactive:</span>
              <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700">
                Active: 78%
              </Badge>
              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600">
                Inactive: 22%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Pie */}
        <Card>
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
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(value: number) => [formatNumber(value), '']}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-slate-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Comparison */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Branch Comparison</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value: number, name: string) => [
                    name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                    name === 'revenue' ? 'Revenue' : 'Tickets',
                  ]}
                />
                <Legend iconType="circle" formatter={(value) => <span className="text-xs text-slate-600">{value === 'revenue' ? 'Revenue' : 'Tickets'}</span>} />
                <Bar dataKey="revenue" fill={FOREST} radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="tickets" fill={GOLD} radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">#</TableHead>
                  <TableHead className="text-xs">Campaign</TableHead>
                  <TableHead className="text-xs">Branch</TableHead>
                  <TableHead className="text-xs text-right">Tickets Sold</TableHead>
                  <TableHead className="text-xs text-right">Revenue</TableHead>
                  <TableHead className="text-xs">Progress</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignPerformance.map((c, i) => (
                  <TableRow key={i} className="hover:bg-slate-50">
                    <TableCell className="text-xs text-slate-400">{i + 1}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-900 max-w-[200px] truncate">{c.title}</TableCell>
                    <TableCell className="text-xs text-slate-500">{c.branch}</TableCell>
                    <TableCell className="text-sm text-right">
                      {formatNumber(c.sold)} <span className="text-xs text-slate-400">/ {formatNumber(c.max)}</span>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-right">{formatCurrency(c.revenue)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-[hsl(152,68%,35%)]" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-8 text-right">{c.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] ${c.status === 'open' ? 'bg-emerald-100 text-emerald-700' : c.status === 'completed' ? 'bg-slate-100 text-slate-600' : 'bg-slate-100 text-slate-500'}`}>
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