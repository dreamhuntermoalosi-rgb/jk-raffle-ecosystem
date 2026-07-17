'use client';

import { useState } from 'react';
import { mockSupportTickets, mockUsers } from '@/mock-data';
import { formatDate, cn, getStatusColor } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Plus,
  Eye,
  UserCheck,
  CheckCircle2,
  MessageSquare,
  Clock,
  User,
  Tag,
} from 'lucide-react';
import type { SupportTicket } from '@/types';

const categoryLabels: Record<string, string> = {
  payments: 'Payments',
  technical: 'Technical',
  general: 'General',
  account: 'Account',
};

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Closed' },
] as const;

type FilterTab = (typeof filterTabs)[number]['id'];

export function AdminSupport() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [detailTicket, setDetailTicket] = useState<SupportTicket | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filteredTickets = mockSupportTickets.filter((ticket) => {
    if (activeTab === 'all') return true;
    return ticket.status === activeTab;
  });

  const getUser = (userId: string) => mockUsers.find((u) => u.id === userId);
  const getAssignee = (userId: string | null) =>
    userId ? mockUsers.find((u) => u.id === userId) : null;

  const tabCounts = {
    all: mockSupportTickets.length,
    open: mockSupportTickets.filter((t) => t.status === 'open').length,
    in_progress: mockSupportTickets.filter((t) => t.status === 'in_progress').length,
    resolved: mockSupportTickets.filter((t) => t.status === 'resolved').length,
    closed: mockSupportTickets.filter((t) => t.status === 'closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mockSupportTickets.length} total tickets &middot;{' '}
            {tabCounts.open} open &middot; {tabCounts.in_progress} in progress
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-forest-500 hover:bg-forest-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Create a new support ticket on behalf of a user.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="ticket-user">User</Label>
                <Select>
                  <SelectTrigger id="ticket-user">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.firstName} {u.lastName} ({u.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ticket-subject">Subject</Label>
                <Input id="ticket-subject" placeholder="Brief description of the issue" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ticket-desc">Description</Label>
                <Textarea
                  id="ticket-desc"
                  placeholder="Detailed description of the issue..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ticket-priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="ticket-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ticket-category">Category</Label>
                  <Select>
                    <SelectTrigger id="ticket-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payments">Payments</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-forest-500 hover:bg-forest-600 text-white" onClick={() => setCreateOpen(false)}>
                Create Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b pb-0 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'border-forest-500 text-forest-600 dark:text-forest-400'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            )}
          >
            {tab.label}
            <span className="ml-1.5 text-xs text-muted-foreground">({tabCounts[tab.id]})</span>
          </button>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                  No tickets found for this filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((ticket) => {
                const user = getUser(ticket.userId);
                return (
                  <TableRow key={ticket.id} className="cursor-pointer" onClick={() => setDetailTicket(ticket)}>
                    <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                    <TableCell className="font-medium max-w-[220px] truncate">
                      {ticket.subject}
                    </TableCell>
                    <TableCell className="text-sm">
                      {user ? `${user.firstName} ${user.lastName}` : 'Unknown'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn('text-[11px] px-1.5 py-0', getStatusColor(ticket.priority))}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn('text-[11px] px-1.5 py-0', getStatusColor(ticket.status))}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[11px]">
                        {categoryLabels[ticket.category] || ticket.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(ticket.createdAt, 'relative')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setDetailTicket(ticket)}
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title="Assign to me"
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-emerald-600"
                            title="Resolve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Ticket Detail Dialog */}
      <Dialog open={!!detailTicket} onOpenChange={(open) => !open && setDetailTicket(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {detailTicket && (() => {
            const user = getUser(detailTicket.userId);
            const assignee = getAssignee(detailTicket.assignedTo);

            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {detailTicket.id}
                    </span>
                    <Badge variant="secondary" className={cn('text-[11px] px-1.5 py-0', getStatusColor(detailTicket.priority))}>
                      {detailTicket.priority}
                    </Badge>
                    <Badge variant="secondary" className={cn('text-[11px] px-1.5 py-0', getStatusColor(detailTicket.status))}>
                      {detailTicket.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-[11px]">
                      {categoryLabels[detailTicket.category] || detailTicket.category}
                    </Badge>
                  </div>
                  <DialogTitle className="text-lg mt-2">{detailTicket.subject}</DialogTitle>
                </DialogHeader>

                <div className="space-y-5 py-2">
                  {/* User Info */}
                  {user && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-9 h-9 rounded-full bg-forest-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email} &middot; {user.phone}</p>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</p>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed bg-muted/30 p-3 rounded-lg">
                      {detailTicket.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Assigned To</p>
                        <p className="text-sm font-medium">
                          {assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unassigned'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Category</p>
                        <p className="text-sm font-medium">
                          {categoryLabels[detailTicket.category] || detailTicket.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Created</p>
                        <p className="text-sm font-medium">{formatDate(detailTicket.createdAt, 'long')}</p>
                      </div>
                    </div>
                    {detailTicket.resolvedAt && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Resolved</p>
                          <p className="text-sm font-medium">{formatDate(detailTicket.resolvedAt, 'long')}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Resolution */}
                  {detailTicket.resolution && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Resolution</p>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200/50 dark:border-emerald-800/30">
                        {detailTicket.resolution}
                      </p>
                    </div>
                  )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                  <Button variant="outline" onClick={() => setDetailTicket(null)}>
                    Close
                  </Button>
                  <Button variant="outline" className="gap-1.5">
                    <UserCheck className="w-4 h-4" />
                    Assign to Me
                  </Button>
                  {detailTicket.status !== 'resolved' && detailTicket.status !== 'closed' && (
                    <Button className="bg-forest-500 hover:bg-forest-600 text-white gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Resolve
                    </Button>
                  )}
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}