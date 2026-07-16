'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Plus, Eye, MoreHorizontal, Pencil, ShieldCheck, ShieldX, Search } from 'lucide-react';
import {
  mockUsers,
  mockBranches,
  mockOrders,
  mockTickets,
} from '@/mock-data';
import { formatDate, getInitials, getStatusColor } from '@/lib/utils';
import type { User, UserRole } from '@/types';

const roleFilters: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'branch_manager', label: 'Branch Manager' },
  { value: 'member', label: 'Member' },
  { value: 'support', label: 'Support' },
  { value: 'auditor', label: 'Auditor' },
];

const roleLabels: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  branch_manager: 'Branch Manager',
  member: 'Member',
  support: 'Support',
  auditor: 'Auditor',
};

// Generate extra users to make table full
const extraUsers: User[] = [
  { id: 'u-10', email: 'zanele.khumalo@email.co.za', phone: '+27 82 456 7890', firstName: 'Zanele', lastName: 'Khumalo', avatar: null, occupation: 'Teacher', biography: null, role: 'member', status: 'active', branchId: 'branch-jhb-n', twoFactorEnabled: true, lastLoginAt: '2025-06-11T14:30:00Z', createdAt: '2024-08-15T10:00:00Z', updatedAt: '2025-06-11T14:30:00Z' },
  { id: 'u-11', email: 'pieter.du.plessis@email.co.za', phone: '+27 83 567 8901', firstName: 'Pieter', lastName: 'du Plessis', avatar: null, occupation: 'Engineer', biography: null, role: 'member', status: 'active', branchId: 'branch-cpt-c', twoFactorEnabled: false, lastLoginAt: '2025-06-10T09:00:00Z', createdAt: '2024-06-20T08:00:00Z', updatedAt: '2025-06-10T09:00:00Z' },
  { id: 'u-12', email: 'nomvula.zondo@email.co.za', phone: '+27 84 678 9012', firstName: 'Nomvula', lastName: 'Zondo', avatar: null, occupation: 'Nurse', biography: null, role: 'member', status: 'suspended', branchId: 'branch-dbn-c', twoFactorEnabled: false, lastLoginAt: '2025-05-20T16:00:00Z', createdAt: '2024-09-10T12:00:00Z', updatedAt: '2025-05-20T16:00:00Z' },
  { id: 'u-13', email: 'kagiso.molefe@email.co.za', phone: '+27 71 789 0123', firstName: 'Kagiso', lastName: 'Molefe', avatar: null, occupation: 'Accountant', biography: null, role: 'member', status: 'active', branchId: 'branch-pta-c', twoFactorEnabled: true, lastLoginAt: '2025-06-12T08:00:00Z', createdAt: '2024-07-05T09:00:00Z', updatedAt: '2025-06-12T08:00:00Z' },
  { id: 'u-14', email: 'anisha.pillay@email.co.za', phone: '+27 79 890 1234', firstName: 'Anisha', lastName: 'Pillay', avatar: null, occupation: 'Pharmacist', biography: null, role: 'member', status: 'active', branchId: 'branch-dbn-s', twoFactorEnabled: false, lastLoginAt: '2025-06-09T11:00:00Z', createdAt: '2024-10-01T10:00:00Z', updatedAt: '2025-06-09T11:00:00Z' },
  { id: 'u-15', email: 'henri.van.wyk@email.co.za', phone: '+27 73 901 2345', firstName: 'Henri', lastName: 'van Wyk', avatar: null, occupation: 'Farmer', biography: null, role: 'member', status: 'active', branchId: 'branch-bfn-c', twoFactorEnabled: false, lastLoginAt: '2025-06-08T15:00:00Z', createdAt: '2024-11-15T08:00:00Z', updatedAt: '2025-06-08T15:00:00Z' },
  { id: 'u-16', email: 'lerato.mabena@email.co.za', phone: '+27 68 012 3456', firstName: 'Lerato', lastName: 'Mabena', avatar: null, occupation: 'Software Developer', biography: null, role: 'support', status: 'active', branchId: null, twoFactorEnabled: true, lastLoginAt: '2025-06-12T10:00:00Z', createdAt: '2024-05-20T08:00:00Z', updatedAt: '2025-06-12T10:00:00Z' },
  { id: 'u-17', email: 'thabo.mahlangu@email.co.za', phone: '+27 65 123 4567', firstName: 'Thabo', lastName: 'Mahlangu', avatar: null, occupation: 'Lawyer', biography: null, role: 'member', status: 'active', branchId: 'branch-nsel', twoFactorEnabled: false, lastLoginAt: '2025-06-07T13:00:00Z', createdAt: '2024-12-01T10:00:00Z', updatedAt: '2025-06-07T13:00:00Z' },
  { id: 'u-18', email: 'carmen.naude@email.co.za', phone: '+27 82 234 5678', firstName: 'Carmen', lastName: 'Naude', avatar: null, occupation: 'Designer', biography: null, role: 'member', status: 'deactivated', branchId: 'branch-stl', twoFactorEnabled: false, lastLoginAt: '2025-04-15T10:00:00Z', createdAt: '2024-04-10T08:00:00Z', updatedAt: '2025-04-15T10:00:00Z' },
  { id: 'u-19', email: 'sibusiso.ndlovu@email.co.za', phone: '+27 61 345 6789', firstName: 'Sibusiso', lastName: 'Ndlovu', avatar: null, occupation: 'Electrician', biography: null, role: 'member', status: 'active', branchId: 'branch-jhb-s', twoFactorEnabled: true, lastLoginAt: '2025-06-11T16:30:00Z', createdAt: '2024-08-25T09:00:00Z', updatedAt: '2025-06-11T16:30:00Z' },
  { id: 'u-20', email: 'elana.van.der.berg@email.co.za', phone: '+27 83 456 7890', firstName: 'Elana', lastName: 'van der Berg', avatar: null, occupation: 'Journalist', biography: null, role: 'member', status: 'active', branchId: 'branch-cpt-s', twoFactorEnabled: false, lastLoginAt: '2025-06-10T07:00:00Z', createdAt: '2024-09-30T11:00:00Z', updatedAt: '2025-06-10T07:00:00Z' },
  { id: 'u-21', email: 'michael.sithole@email.co.za', phone: '+27 72 567 8901', firstName: 'Michael', lastName: 'Sithole', avatar: null, occupation: 'Student', biography: null, role: 'member', status: 'pending', branchId: 'branch-pta-e', twoFactorEnabled: false, lastLoginAt: null, createdAt: '2025-06-12T06:00:00Z', updatedAt: '2025-06-12T06:00:00Z' },
];

const allUsers = [...mockUsers, ...extraUsers];

export function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = useMemo(() => {
    return allUsers.filter(u => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      }
      return true;
    });
  }, [roleFilter, search]);

  function openDetail(u: User) {
    setSelectedUser(u);
    setDetailOpen(true);
  }

  function getBranchName(branchId: string | null): string {
    if (!branchId) return '—';
    return mockBranches.find(b => b.id === branchId)?.name || '—';
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500 mt-1">{allUsers.length} registered users</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-first">First Name</Label>
                  <Input id="user-first" placeholder="First name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-last">Last Name</Label>
                  <Input id="user-last" placeholder="Last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" placeholder="user@jkraffle.co.za" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-phone">Phone</Label>
                <Input id="user-phone" placeholder="+27 XX XXX XXXX" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(roleLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Assign branch" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Branch</SelectItem>
                      {mockBranches.map(b => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-pass">Initial Password</Label>
                <Input id="user-pass" type="password" placeholder="Min 8 characters" />
              </div>
              <div className="flex items-center gap-3">
                <Switch id="user-2fa" />
                <Label htmlFor="user-2fa">Require 2FA setup on first login</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white" onClick={() => { toast.success('User created successfully!'); setCreateOpen(false); }}>
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {roleFilters.map(f => (
            <Button
              key={f.value}
              variant={roleFilter === f.value ? 'default' : 'outline'}
              size="sm"
              className={`h-8 text-xs ${roleFilter === f.value ? 'bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white' : ''}`}
              onClick={() => setRoleFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">User</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Role</TableHead>
                  <TableHead className="text-xs">Branch</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-center">2FA</TableHead>
                  <TableHead className="text-xs">Last Login</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-slate-100 text-slate-600 text-[11px] font-semibold">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-slate-900 whitespace-nowrap">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 max-w-[180px] truncate">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px]">
                        {roleLabels[user.role]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">{getBranchName(user.branchId)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] ${getStatusColor(user.status)}`}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {user.twoFactorEnabled ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <ShieldX className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {user.lastLoginAt ? formatDate(user.lastLoginAt, 'relative') : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDetail(user)}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editing ${user.firstName}`)}>
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedUser && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[hsl(152,68%,35%)] text-white text-sm font-semibold">
                      {getInitials(selectedUser.firstName, selectedUser.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>{selectedUser.firstName} {selectedUser.lastName}</DialogTitle>
                    <p className="text-sm text-slate-500">{selectedUser.email}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[11px] text-slate-500 uppercase">Role</p>
                    <p className="text-sm font-medium mt-0.5">{roleLabels[selectedUser.role]}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[11px] text-slate-500 uppercase">Status</p>
                    <Badge variant="secondary" className={`text-[10px] mt-0.5 ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[11px] text-slate-500 uppercase">Branch</p>
                    <p className="text-sm font-medium mt-0.5">{getBranchName(selectedUser.branchId)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[11px] text-slate-500 uppercase">2FA</p>
                    <p className="text-sm font-medium mt-0.5">{selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Activity Summary</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-lg bg-slate-50">
                      <p className="text-lg font-bold text-slate-900">{mockOrders.filter(o => o.userId === selectedUser.id).length}</p>
                      <p className="text-[10px] text-slate-500">Orders</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-50">
                      <p className="text-lg font-bold text-slate-900">{mockTickets.filter(t => t.userId === selectedUser.id).length}</p>
                      <p className="text-[10px] text-slate-500">Tickets</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-50">
                      <p className="text-lg font-bold text-slate-900">{formatDate(selectedUser.createdAt)}</p>
                      <p className="text-[10px] text-slate-500">Joined</p>
                    </div>
                  </div>
                </div>
                {selectedUser.occupation && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">Profile</p>
                      <p className="text-sm text-slate-600">{selectedUser.occupation}</p>
                      {selectedUser.phone && <p className="text-sm text-slate-500 mt-0.5">{selectedUser.phone}</p>}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}