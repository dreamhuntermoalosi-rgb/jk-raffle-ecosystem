'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Pause,
  Play,
  XCircle,
  Trophy,
  MoreHorizontal,
  Filter,
} from 'lucide-react';
import { mockCampaigns, mockBranches, mockProducts } from '@/mock-data';
import { formatCurrency, formatDate, getCategoryIcon, getStatusColor } from '@/lib/utils';
import type { Campaign, CampaignStatus } from '@/types';

const statusFilters: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'paused', label: 'Paused' },
  { value: 'closed', label: 'Closed' },
  { value: 'completed', label: 'Completed' },
  { value: 'draft', label: 'Draft' },
];

// Extra campaigns to reach 20
const extraCampaigns: Campaign[] = [
  {
    id: 'camp-19', title: 'Stellenbosch Wine Estate Raffle', description: 'Win a share in a luxury wine estate experience.', productId: 'prod-vac-3', product: mockProducts[13], branchId: 'branch-stl', branch: mockBranches[13], status: 'draft', ticketPrice: 150, maxTickets: 2000, soldTickets: 0, drawDate: '2025-10-15T18:00:00Z', createdAt: '2025-06-10T10:00:00Z', progress: 0,
  },
  {
    id: 'camp-20', title: 'Garden Route Getaway Raffle', description: '7-night luxury holiday along the Garden Route.', productId: 'prod-vac-2', product: mockProducts[12], branchId: 'branch-geo', branch: mockBranches[16], status: 'draft', ticketPrice: 200, maxTickets: 1500, soldTickets: 0, drawDate: '2025-11-01T18:00:00Z', createdAt: '2025-06-11T14:00:00Z', progress: 0,
  },
];

const allCampaigns = [...mockCampaigns, ...extraCampaigns];

export function AdminCampaigns() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filtered = useMemo(() => {
    return allCampaigns.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (branchFilter !== 'all' && c.branchId !== branchFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return c.title.toLowerCase().includes(q) || c.branch.name.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, statusFilter, branchFilter]);

  const openCount = allCampaigns.filter(c => c.status === 'open').length;

  function handleView(c: Campaign) {
    setSelectedCampaign(c);
    setDetailOpen(true);
  }

  function handleAction(action: string, c: Campaign) {
    const msgs: Record<string, string> = {
      pause: `Campaign "${c.title}" has been paused.`,
      resume: `Campaign "${c.title}" has been resumed.`,
      close: `Campaign "${c.title}" has been closed.`,
      draw: `Draw initiated for "${c.title}".`,
    };
    toast.success(msgs[action] || `Action "${action}" completed.`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-sm text-slate-500 mt-1">{allCampaigns.length} total campaigns · {openCount} open</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="camp-title">Campaign Title</Label>
                <Input id="camp-title" placeholder="e.g. Luxury Villa Raffle" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                    <SelectContent>
                      {mockProducts.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          {getCategoryIcon(p.category)} {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                    <SelectContent>
                      {mockBranches.map(b => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="camp-price">Ticket Price (ZAR)</Label>
                  <Input id="camp-price" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="camp-max">Max Tickets</Label>
                  <Input id="camp-max" type="number" placeholder="5000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="camp-date">Draw Date</Label>
                <Input id="camp-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="camp-desc">Description</Label>
                <Textarea id="camp-desc" placeholder="Describe the campaign..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="camp-terms">Terms & Conditions</Label>
                <Textarea id="camp-terms" placeholder="Enter terms and conditions..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white" onClick={() => { toast.success('Campaign created successfully!'); setCreateOpen(false); }}>
                Create Campaign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs / Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2 text-slate-400" />
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {mockBranches.map(b => (
                <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList className="bg-slate-100">
            {statusFilters.map((f) => (
              <TabsTrigger key={f.value} value={f.value} className="text-xs sm:text-sm">
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Campaign</TableHead>
                  <TableHead className="text-xs">Product</TableHead>
                  <TableHead className="text-xs">Branch</TableHead>
                  <TableHead className="text-xs text-right">Price</TableHead>
                  <TableHead className="text-xs">Progress</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Draw Date</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="hover:bg-slate-50">
                    <TableCell className="text-sm font-medium text-slate-900 max-w-[180px] truncate">
                      {c.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{getCategoryIcon(c.product.category)}</span>
                        <span className="text-xs text-slate-600 max-w-[120px] truncate">{c.product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">{c.branch.name}</TableCell>
                    <TableCell className="text-sm text-right font-medium">{formatCurrency(c.ticketPrice)}</TableCell>
                    <TableCell className="w-32">
                      <div className="flex items-center gap-2">
                        <Progress value={c.progress || 0} className="h-1.5 flex-1" />
                        <span className="text-[11px] text-slate-500 w-12 text-right">
                          {c.soldTickets}/{c.maxTickets}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] ${getStatusColor(c.status)}`}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">{formatDate(c.drawDate)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(c)}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Edit dialog would open')}>
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          {c.status === 'open' && (
                            <DropdownMenuItem onClick={() => handleAction('pause', c)}>
                              <Pause className="w-4 h-4 mr-2" /> Pause
                            </DropdownMenuItem>
                          )}
                          {c.status === 'paused' && (
                            <DropdownMenuItem onClick={() => handleAction('resume', c)}>
                              <Play className="w-4 h-4 mr-2" /> Resume
                            </DropdownMenuItem>
                          )}
                          {(c.status === 'open' || c.status === 'paused') && (
                            <DropdownMenuSeparator />
                          )}
                          {(c.status === 'open' || c.status === 'paused') && (
                            <DropdownMenuItem onClick={() => handleAction('close', c)} className="text-orange-600">
                              <XCircle className="w-4 h-4 mr-2" /> Close
                            </DropdownMenuItem>
                          )}
                          {c.status === 'open' && (
                            <DropdownMenuItem onClick={() => handleAction('draw', c)} className="text-[hsl(43,96%,36%)]">
                              <Trophy className="w-4 h-4 mr-2" /> Draw Winner
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500">No campaigns match your filters.</div>
          )}
        </CardContent>
      </Card>

      {/* Campaign Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">{selectedCampaign.title}</DialogTitle>
                <p className="text-sm text-slate-500">{selectedCampaign.branch.name}</p>
              </DialogHeader>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-50">
                      <p className="text-xs text-slate-500">Product</p>
                      <p className="text-sm font-medium">{selectedCampaign.product.name}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50">
                      <p className="text-xs text-slate-500">Value</p>
                      <p className="text-sm font-medium">{formatCurrency(selectedCampaign.product.value)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50">
                      <p className="text-xs text-slate-500">Ticket Price</p>
                      <p className="text-sm font-medium">{formatCurrency(selectedCampaign.ticketPrice)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50">
                      <p className="text-xs text-slate-500">Draw Date</p>
                      <p className="text-sm font-medium">{formatDate(selectedCampaign.drawDate, 'long')}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Progress</p>
                    <div className="flex items-center gap-3">
                      <Progress value={selectedCampaign.progress || 0} className="h-2 flex-1" />
                      <span className="text-sm font-semibold">{selectedCampaign.progress}%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{selectedCampaign.soldTickets} of {selectedCampaign.maxTickets} tickets sold</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">Revenue</p>
                    <p className="text-lg font-bold text-[hsl(152,68%,35%)]">{formatCurrency(selectedCampaign.soldTickets * selectedCampaign.ticketPrice)}</p>
                  </div>
                  {selectedCampaign.description && (
                    <p className="text-sm text-slate-600">{selectedCampaign.description}</p>
                  )}
                </TabsContent>
                <TabsContent value="tickets" className="mt-4">
                  <div className="text-center py-8 text-sm text-slate-500">
                    Ticket management is handled through the campaign editor. {selectedCampaign.soldTickets} tickets have been sold.
                  </div>
                </TabsContent>
                <TabsContent value="orders" className="mt-4">
                  <div className="text-center py-8 text-sm text-slate-500">
                    Orders linked to this campaign can be viewed in the Payments section. Revenue: {formatCurrency(selectedCampaign.soldTickets * selectedCampaign.ticketPrice)}.
                  </div>
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-50 text-center">
                      <p className="text-2xl font-bold text-slate-900">{selectedCampaign.soldTickets}</p>
                      <p className="text-xs text-slate-500">Tickets Sold</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 text-center">
                      <p className="text-2xl font-bold text-slate-900">{selectedCampaign.maxTickets - selectedCampaign.soldTickets}</p>
                      <p className="text-xs text-slate-500">Tickets Remaining</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 text-center">
                      <p className="text-2xl font-bold text-[hsl(152,68%,35%)]">{selectedCampaign.progress}%</p>
                      <p className="text-xs text-slate-500">Sold Percentage</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 text-center">
                      <p className="text-2xl font-bold text-slate-900">{formatCurrency(selectedCampaign.soldTickets * selectedCampaign.ticketPrice)}</p>
                      <p className="text-xs text-slate-500">Total Revenue</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}