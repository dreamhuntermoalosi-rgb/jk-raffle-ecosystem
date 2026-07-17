'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  UserPlus,
  Search,
  MoreHorizontal,
  Pencil,
  Ban,
  KeyRound,
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  Ticket,
  Banknote,
} from 'lucide-react';
import { mockBranches, mockBranchManager } from '@/mock-data';
import { cn } from '@/lib/utils';
import type { UserStatus } from '@/types';

const branchId = mockBranchManager.branchId ?? 'branch-jhb-n';
const branch = mockBranches.find(b => b.id === branchId);

// Generate 20 mock members for this branch
const branchMembers = [
  { id: 'm-001', firstName: 'James', lastName: 'Peterson', email: 'james.peterson@email.co.za', phone: '+27 85 555 4004', status: 'active' as UserStatus, joinDate: '2024-09-22', ticketsPurchased: 12, totalSpent: 3600 },
  { id: 'm-002', firstName: 'Aiden', lastName: 'Mabena', email: 'aiden.mabena@email.co.za', phone: '+27 72 555 8101', status: 'active' as UserStatus, joinDate: '2025-06-10', ticketsPurchased: 2, totalSpent: 400 },
  { id: 'm-003', firstName: 'Zanele', lastName: 'Khumalo', email: 'zanele.k@email.co.za', phone: '+27 73 555 8202', status: 'active' as UserStatus, joinDate: '2025-06-08', ticketsPurchased: 7, totalSpent: 3500 },
  { id: 'm-004', firstName: 'Pieter', lastName: 'du Plessis', email: 'pieter.dp@email.co.za', phone: '+27 82 555 8303', status: 'pending' as UserStatus, joinDate: '2025-06-05', ticketsPurchased: 0, totalSpent: 0 },
  { id: 'm-005', firstName: 'Nomsa', lastName: 'Dlamini', email: 'nomsa.d@email.co.za', phone: '+27 74 555 8404', status: 'active' as UserStatus, joinDate: '2025-06-03', ticketsPurchased: 5, totalSpent: 1500 },
  { id: 'm-006', firstName: 'Kyle', lastName: 'van Niekerk', email: 'kyle.vn@email.co.za', phone: '+27 83 555 8505', status: 'suspended' as UserStatus, joinDate: '2025-06-01', ticketsPurchased: 3, totalSpent: 900 },
  { id: 'm-007', firstName: 'Thandiwe', lastName: 'Mthembu', email: 'thandi.m@email.co.za', phone: '+27 76 555 8606', status: 'active' as UserStatus, joinDate: '2025-05-28', ticketsPurchased: 18, totalSpent: 7200 },
  { id: 'm-008', firstName: 'Johan', lastName: 'Steyn', email: 'johan.s@email.co.za', phone: '+27 84 555 8707', status: 'active' as UserStatus, joinDate: '2025-05-25', ticketsPurchased: 4, totalSpent: 1200 },
  { id: 'm-009', firstName: 'Lerato', lastName: 'Molefe', email: 'lerato.m@email.co.za', phone: '+27 71 555 8808', status: 'active' as UserStatus, joinDate: '2025-05-20', ticketsPurchased: 9, totalSpent: 2700 },
  { id: 'm-010', firstName: 'Sipho', lastName: 'Ndlovu', email: 'sipho.n@email.co.za', phone: '+27 77 555 8909', status: 'deactivated' as UserStatus, joinDate: '2025-05-15', ticketsPurchased: 1, totalSpent: 50 },
  { id: 'm-011', firstName: 'Anri', lastName: 'Potgieter', email: 'anri.p@email.co.za', phone: '+27 86 555 9010', status: 'active' as UserStatus, joinDate: '2025-05-12', ticketsPurchased: 6, totalSpent: 1800 },
  { id: 'm-012', firstName: 'Bongani', lastName: 'Zulu', email: 'bongani.z@email.co.za', phone: '+27 78 555 9111', status: 'active' as UserStatus, joinDate: '2025-05-08', ticketsPurchased: 14, totalSpent: 5600 },
  { id: 'm-013', firstName: 'Carel', lastName: 'Viljoen', email: 'carel.v@email.co.za', phone: '+27 87 555 9212', status: 'active' as UserStatus, joinDate: '2025-04-30', ticketsPurchased: 3, totalSpent: 900 },
  { id: 'm-014', firstName: 'Dineo', lastName: 'Mokoena', email: 'dineo.m@email.co.za', phone: '+27 79 555 9313', status: 'pending' as UserStatus, joinDate: '2025-04-28', ticketsPurchased: 0, totalSpent: 0 },
  { id: 'm-015', firstName: 'Ethan', lastName: 'Coetzee', email: 'ethan.c@email.co.za', phone: '+27 81 555 9414', status: 'active' as UserStatus, joinDate: '2025-04-22', ticketsPurchased: 8, totalSpent: 2400 },
  { id: 'm-016', firstName: 'Fikile', lastName: 'Maseko', email: 'fikile.m@email.co.za', phone: '+27 75 555 9515', status: 'active' as UserStatus, joinDate: '2025-04-18', ticketsPurchased: 10, totalSpent: 4000 },
  { id: 'm-017', firstName: 'Gideon', lastName: 'Muller', email: 'gideon.m@email.co.za', phone: '+27 88 555 9616', status: 'suspended' as UserStatus, joinDate: '2025-04-12', ticketsPurchased: 2, totalSpent: 600 },
  { id: 'm-018', firstName: 'Hlengiwe', lastName: 'Mkhize', email: 'hlengiwe.mk@email.co.za', phone: '+27 70 555 9717', status: 'active' as UserStatus, joinDate: '2025-04-05', ticketsPurchased: 15, totalSpent: 6000 },
  { id: 'm-019', firstName: 'Ian', lastName: 'Hendricks', email: 'ian.h@email.co.za', phone: '+27 89 555 9818', status: 'active' as UserStatus, joinDate: '2025-03-28', ticketsPurchased: 5, totalSpent: 1500 },
  { id: 'm-020', firstName: 'Jabulile', lastName: 'Sithole', email: 'jabulile.s@email.co.za', phone: '+27 68 555 9919', status: 'active' as UserStatus, joinDate: '2025-03-20', ticketsPurchased: 11, totalSpent: 4400 },
];

const ITEMS_PER_PAGE = 8;

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

export function ManagerMembers() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsMember, setDetailsMember] = useState<(typeof branchMembers)[0] | null>(null);

  // Create form state
  const [formFirst, setFormFirst] = useState('');
  const [formLast, setFormLast] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');

  const filtered = useMemo(() => {
    let list = [...branchMembers];

    // Filter by status
    if (statusFilter !== 'all') {
      list = list.filter(m => m.status === statusFilter);
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        m =>
          `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'name') return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      if (sortBy === 'date') return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

    return list;
  }, [search, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const showingFrom = (page - 1) * ITEMS_PER_PAGE + 1;
  const showingTo = Math.min(page * ITEMS_PER_PAGE, filtered.length);

  function handleCreateSubmit() {
    setCreateOpen(false);
    setFormFirst('');
    setFormLast('');
    setFormEmail('');
    setFormPhone('');
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-forest-900 flex items-center gap-3">
            Members
            <Badge className="bg-forest-100 text-forest-700 hover:bg-forest-200 border-0 text-xs font-medium">
              {branchMembers.length}
            </Badge>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage members for {branch?.name ?? 'Johannesburg North'}
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-forest-600 hover:bg-forest-700 text-white gap-2">
              <UserPlus className="w-4 h-4" />
              Create Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Member</DialogTitle>
              <DialogDescription>
                Add a new member to {branch?.name ?? 'your branch'}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="e.g. Sipho"
                    value={formFirst}
                    onChange={(e) => setFormFirst(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="e.g. Ndlovu"
                    value={formLast}
                    onChange={(e) => setFormLast(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sipho@example.co.za"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+27 82 555 0000"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Branch</Label>
                <Input value={branch?.name ?? 'Johannesburg North'} disabled className="bg-muted" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-forest-600 hover:bg-forest-700 text-white" onClick={handleCreateSubmit}>
                Create Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters Row */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="deactivated">Deactivated</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="max-h-[520px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky top-0 bg-card z-10">
                    Member
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell sticky top-0 bg-card z-10">
                    Phone
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky top-0 bg-card z-10">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell sticky top-0 bg-card z-10">
                    Join Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell text-right sticky top-0 bg-card z-10">
                    Tickets
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell text-right sticky top-0 bg-card z-10">
                    Total Spent
                  </TableHead>
                  <TableHead className="w-12 sticky top-0 bg-card z-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((member) => {
                  const initials = `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`;
                  return (
                    <TableRow key={member.id} className="group hover:bg-forest-50/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-forest-100 text-forest-700 text-xs font-semibold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                              {member.firstName} {member.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {member.phone}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            'border-0 text-xs font-medium capitalize',
                            statusColor[member.status]
                          )}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        {new Date(member.joinDate).toLocaleDateString('en-ZA', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-right font-medium text-neutral-700">
                        {member.ticketsPurchased}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-right font-medium text-neutral-700">
                        {formatZAR(member.totalSpent)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              className="cursor-pointer gap-2"
                              onClick={() => setDetailsMember(member)}
                            >
                              <Eye className="w-4 h-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer gap-2">
                              <Pencil className="w-4 h-4" />
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer gap-2 text-amber-600">
                              <Ban className="w-4 h-4" />
                              Suspend Member
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer gap-2 text-amber-600">
                              <KeyRound className="w-4 h-4" />
                              Reset Password
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {paged.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No members found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t px-6 py-3">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-neutral-700">{showingFrom}</span> to{' '}
              <span className="font-medium text-neutral-700">{showingTo}</span> of{' '}
              <span className="font-medium text-neutral-700">{filtered.length}</span> members
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Button
                  key={p}
                  variant={page === p ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(p)}
                  className={cn(
                    'h-8 w-8 p-0 text-xs font-medium',
                    page === p && 'bg-forest-600 hover:bg-forest-700 text-white'
                  )}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Member Details Dialog */}
      <Dialog open={!!detailsMember} onOpenChange={(open) => !open && setDetailsMember(null)}>
        <DialogContent className="sm:max-w-lg">
          {detailsMember && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-forest-100 text-forest-700 text-sm font-semibold">
                      {detailsMember.firstName.charAt(0)}{detailsMember.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {detailsMember.firstName} {detailsMember.lastName}
                </DialogTitle>
                <DialogDescription>Member profile details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </div>
                    <p className="text-sm font-medium text-neutral-900">{detailsMember.email}</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" /> Phone
                    </div>
                    <p className="text-sm font-medium text-neutral-900">{detailsMember.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" /> Joined
                    </div>
                    <p className="text-sm font-medium text-neutral-900">
                      {new Date(detailsMember.joinDate).toLocaleDateString('en-ZA', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      Status
                    </div>
                    <Badge className={cn('border-0 text-xs font-medium capitalize mt-0.5', statusColor[detailsMember.status])}>
                      {detailsMember.status}
                    </Badge>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Activity Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-forest-50 p-3">
                      <div className="flex items-center gap-2 text-forest-700">
                        <Ticket className="w-4 h-4" />
                        <span className="text-xs font-medium">Tickets Purchased</span>
                      </div>
                      <p className="text-xl font-bold text-forest-900 mt-1">{detailsMember.ticketsPurchased}</p>
                    </div>
                    <div className="rounded-lg bg-gold-50 p-3">
                      <div className="flex items-center gap-2 text-gold-700">
                        <Banknote className="w-4 h-4" />
                        <span className="text-xs font-medium">Total Spent</span>
                      </div>
                      <p className="text-xl font-bold text-gold-900 mt-1">{formatZAR(detailsMember.totalSpent)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    Branch
                  </div>
                  <p className="text-sm font-medium text-neutral-900">{branch?.name ?? 'Johannesburg North'} ({branch?.code ?? 'JHB-N'})</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailsMember(null)}>
                  Close
                </Button>
                <Button className="bg-forest-600 hover:bg-forest-700 text-white gap-2">
                  <Pencil className="w-4 h-4" />
                  Edit Member
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}