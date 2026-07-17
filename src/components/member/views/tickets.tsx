'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Grid3X3,
  List,
  QrCode,
  Download,
  Eye,
  Ticket,
  Home,
  Car,
  Monitor,
  Banknote,
  Plane,
  Gift,
  TicketCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, formatDate, getStatusColor, formatCurrency, getCategoryIcon, generateTicketReference } from '@/lib/utils';
import { mockTickets, mockCampaigns, mockCurrentUser } from '@/mock-data';
import type { Ticket as TicketType, TicketStatus } from '@/types';
import { TicketDetailDialog } from './ticket-detail';

// Generate extra tickets to reach 55+ for visual richness
function generateExtraTickets(): TicketType[] {
  const statuses: TicketStatus[] = ['active', 'active', 'active', 'active', 'active', 'expired', 'archived', 'archived', 'expired', 'active', 'active'];
  const campaignIds = ['camp-001', 'camp-002', 'camp-003', 'camp-006', 'camp-007', 'camp-009', 'camp-010', 'camp-011', 'camp-012', 'camp-004', 'camp-005'];
  const dates = [
    '2025-05-15T09:00:00Z', '2025-05-18T14:30:00Z', '2025-05-22T11:00:00Z',
    '2025-05-25T16:00:00Z', '2025-06-01T08:00:00Z', '2025-06-04T10:30:00Z',
    '2025-04-10T12:00:00Z', '2025-04-15T15:00:00Z', '2025-04-20T09:00:00Z',
    '2025-06-06T11:00:00Z', '2025-06-09T14:00:00Z',
  ];

  return statuses.map((status, i) => ({
    id: `tkt-extra-${i + 1}`,
    reference: generateTicketReference(),
    campaignId: campaignIds[i],
    userId: mockCurrentUser.id,
    orderId: null,
    status,
    qrCode: status === 'active' ? `qr_extra_${i}` : null,
    barcode: status === 'active' ? `BC-EXT-${100 + i}` : null,
    verifiedAt: null,
    purchasedAt: dates[i],
    createdAt: dates[i],
  }));
}

const allTickets = [...mockTickets.filter(t => t.userId === mockCurrentUser.id), ...generateExtraTickets()];

const categoryIcons: Record<string, React.ElementType> = {
  house: Home,
  vehicle: Car,
  electronics: Monitor,
  cash: Banknote,
  vacation: Plane,
  other: Gift,
};

type TabFilter = 'all' | 'active' | 'won' | 'expired' | 'archived';

export function MemberTickets() {
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredTickets = useMemo(() => {
    let tickets = allTickets;

    // Filter by tab
    if (activeTab === 'active') {
      tickets = tickets.filter((t) => t.status === 'active');
    } else if (activeTab === 'won') {
      tickets = tickets.filter((t) => t.status === 'won' || t.status === 'claimed');
    } else if (activeTab === 'expired') {
      tickets = tickets.filter((t) => t.status === 'expired' || t.status === 'voided');
    } else if (activeTab === 'archived') {
      tickets = tickets.filter((t) => t.status === 'expired' || t.status === 'claimed' || t.status === 'voided');
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tickets = tickets.filter((t) => {
        const campaign = mockCampaigns.find((c) => c.id === t.campaignId);
        return (
          t.reference.toLowerCase().includes(q) ||
          campaign?.title.toLowerCase().includes(q) ||
          t.status.includes(q)
        );
      });
    }

    return tickets.sort((a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime());
  }, [activeTab, searchQuery]);

  const counts = useMemo(() => ({
    all: allTickets.length,
    active: allTickets.filter(t => t.status === 'active').length,
    won: allTickets.filter(t => t.status === 'won' || t.status === 'claimed').length,
    expired: allTickets.filter(t => t.status === 'expired' || t.status === 'voided').length,
    archived: allTickets.filter(t => t.status === 'expired' || t.status === 'claimed' || t.status === 'voided').length,
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Tickets</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {allTickets.length} total tickets &middot; {counts.active} active
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className={cn(
              'h-9 w-9 rounded-lg',
              viewMode === 'grid' && 'bg-maroon-500 hover:bg-maroon-600'
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className={cn(
              'h-9 w-9 rounded-lg',
              viewMode === 'list' && 'bg-maroon-500 hover:bg-maroon-600'
            )}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by reference or campaign..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-lg"
          />
        </div>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabFilter)}>
          <TabsList className="h-10">
            <TabsTrigger value="all" className="text-xs px-3">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="active" className="text-xs px-3">Active ({counts.active})</TabsTrigger>
            <TabsTrigger value="won" className="text-xs px-3">Won ({counts.won})</TabsTrigger>
            <TabsTrigger value="expired" className="text-xs px-3">Expired ({counts.expired})</TabsTrigger>
            <TabsTrigger value="archived" className="text-xs px-3">Archived ({counts.archived})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {filteredTickets.length === 0 ? (
        <Card className="border-0 shadow-royal-sm rounded-xl">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-maroon-50 p-4 mb-4">
              <Ticket className="h-8 w-8 text-maroon-500" />
            </div>
            <h3 className="font-semibold text-lg">No tickets found</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {searchQuery ? 'Try a different search term' : 'No tickets match this filter'}
            </p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} onSelect={() => { setSelectedTicket(ticket); setDetailOpen(true); }} />
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-royal-sm rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-muted/50 sticky top-0">
                <TableHead className="text-xs font-medium text-muted-foreground">Reference</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Campaign</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Category</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Price</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Purchased</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => {
                const campaign = mockCampaigns.find((c) => c.id === ticket.campaignId);
                const isWon = ticket.status === 'won';
                return (
                  <TableRow key={ticket.id} className={cn(
                    'hover:bg-maroon-50/30 transition-colors',
                    isWon && 'bg-gold-50/30'
                  )}>
                    <TableCell className="font-mono text-xs font-semibold text-foreground">
                      {ticket.reference}
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate text-muted-foreground">
                      {campaign?.title || 'Unknown'}
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="mr-1">{getCategoryIcon(campaign?.product.category || 'other')}</span>
                      {campaign?.product.category || '—'}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {formatCurrency(campaign?.ticketPrice || 0)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn('text-[10px] px-2 py-0.5 rounded-md', getStatusColor(ticket.status))}
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(ticket.purchasedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-maroon-50" onClick={() => { setSelectedTicket(ticket); setDetailOpen(true); }}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-maroon-50">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      <TicketDetailDialog ticket={selectedTicket} open={detailOpen} onOpenChange={setDetailOpen} />
    </div>
  );
}

function TicketCard({ ticket, onSelect }: { ticket: TicketType; onSelect: () => void }) {
  const campaign = mockCampaigns.find((c) => c.id === ticket.campaignId);
  const isWon = ticket.status === 'won';
  const CatIcon = categoryIcons[campaign?.product.category || 'other'] || Gift;

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-200 hover:shadow-royal-md hover:-translate-y-0.5 cursor-pointer border-0 shadow-royal-sm rounded-xl bg-white',
        isWon && 'shadow-gold-md'
      )}
      onClick={onSelect}
    >
      {/* Golden glow for won tickets */}
      {isWon && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50/80 via-transparent to-gold-50/40 pointer-events-none" />
      )}

      <CardContent className="p-5 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              isWon ? 'bg-gold-100' : 'bg-maroon-50'
            )}>
              <CatIcon className={cn('h-5 w-5', isWon ? 'text-gold-600' : 'text-maroon-500')} />
            </div>
            <Badge
              variant="secondary"
              className={cn('text-[10px] px-2 py-0.5 rounded-md', getStatusColor(ticket.status))}
            >
              {isWon && <TicketCheck className="h-3 w-3 mr-1" />}
              {ticket.status}
            </Badge>
          </div>
          {isWon && (
            <div className="text-gold-500">
              <TicketCheck className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Reference - large monospace */}
        <div className="mb-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Ticket Reference</p>
          <p className="font-mono text-xl font-bold tracking-wider text-foreground">
            {ticket.reference}
          </p>
        </div>

        {/* Campaign info */}
        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-foreground truncate">
            {campaign?.title || 'Unknown Campaign'}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Purchased {formatDate(ticket.purchasedAt)}</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(campaign?.ticketPrice || 0)}
            </span>
          </div>
        </div>

        {/* QR code placeholder */}
        {ticket.qrCode && (
          <div className="flex items-center justify-center bg-maroon-50/50 rounded-lg py-3 mb-4 border border-dashed border-maroon-100">
            <div className="flex flex-col items-center gap-1 text-maroon-400">
              <QrCode className="h-8 w-8" />
              <span className="text-[10px]">QR Code</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs rounded-lg border-border hover:bg-maroon-50 hover:border-maroon-200" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            View Details
          </Button>
          {ticket.status === 'active' && (
            <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg border-border hover:bg-maroon-50 hover:border-maroon-200">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              PDF
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}