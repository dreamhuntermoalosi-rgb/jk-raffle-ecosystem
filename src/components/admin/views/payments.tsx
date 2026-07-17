'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  DollarSign,
  Clock,
  RotateCcw,
  Eye,
  MoreHorizontal,
  CreditCard,
  Calendar,
} from 'lucide-react';
import { mockPayments, mockUsers, mockOrders } from '@/mock-data';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import type { Payment } from '@/types';

const statusOptions = ['all', 'completed', 'pending', 'failed', 'refunded'];
const methodOptions = ['all', 'credit_card', 'eft', 'payfast'];

function getUserName(userId: string): string {
  const user = mockUsers.find(u => u.id === userId);
  return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
}

export function AdminPayments() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundPayment, setRefundPayment] = useState<Payment | null>(null);
  const [refundReason, setRefundReason] = useState('');

  const completed = mockPayments.filter(p => p.status === 'completed');
  const pending = mockPayments.filter(p => p.status === 'pending');
  const refunded = mockPayments.filter(p => p.status === 'refunded');
  const totalProcessed = completed.reduce((s, p) => s + p.amount, 0);
  const totalPending = pending.reduce((s, p) => s + p.amount, 0);
  const totalRefunded = refunded.reduce((s, p) => s + p.amount, 0);

  const filtered = useMemo(() => {
    return mockPayments.filter(p => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (methodFilter !== 'all' && p.method !== methodFilter) return false;
      return true;
    });
  }, [statusFilter, methodFilter]);

  function openRefund(p: Payment) {
    setRefundPayment(p);
    setRefundReason('');
    setRefundOpen(true);
  }

  function handleRefund() {
    toast.success(`Refund of ${formatCurrency(refundPayment?.amount || 0)} processed successfully.`);
    setRefundOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Processed</p>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gold-600 mt-1">{formatCurrency(totalProcessed)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{completed.length} transactions</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-maroon-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-maroon-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gold-600 mt-1">{formatCurrency(totalPending)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{pending.length} transactions</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-royal-sm rounded-xl border-0">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Refunded</p>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">{formatCurrency(totalRefunded)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{refunded.length} transactions</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44 rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(s => (
              <SelectItem key={s} value={s} className="capitalize">{s === 'all' ? 'All Statuses' : s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="w-full sm:w-44 rounded-lg">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            {methodOptions.map(m => (
              <SelectItem key={m} value={m}>
                {m === 'all' ? 'All Methods' : m === 'credit_card' ? 'Credit Card' : m === 'eft' ? 'EFT' : 'PayFast'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 ml-auto text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>All time</span>
        </div>
      </div>

      {/* Payments Table */}
      <Card className="shadow-royal-sm rounded-xl border-0 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/50">
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">User</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Amount</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Method</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Gateway Ref</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-maroon-50/30 transition-colors">
                    <TableCell className="text-xs font-mono text-muted-foreground py-3.5">{payment.orderId.slice(0, 12).toUpperCase()}</TableCell>
                    <TableCell className="text-sm text-foreground py-3.5">{getUserName(payment.userId)}</TableCell>
                    <TableCell className="text-sm font-bold text-gold-600 text-right py-3.5">{formatCurrency(payment.amount)}</TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                        <Badge variant="outline" className="text-[10px] rounded-md">
                          {payment.method === 'credit_card' ? 'Credit Card' : payment.method === 'eft' ? 'EFT' : 'PayFast'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge variant="secondary" className={`text-[10px] rounded-md ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground py-3.5">
                      {payment.paidAt ? formatDate(payment.paidAt) : formatDate(payment.createdAt)}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground max-w-[100px] truncate py-3.5">
                      {payment.gatewayRef || '—'}
                    </TableCell>
                    <TableCell className="text-right py-3.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info('Viewing payment details')}>
                            <Eye className="w-4 h-4 mr-2" /> View
                          </DropdownMenuItem>
                          {payment.status === 'completed' && (
                            <DropdownMenuItem onClick={() => openRefund(payment)} className="text-red-600">
                              <RotateCcw className="w-4 h-4 mr-2" /> Refund
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
            <div className="py-12 text-center text-sm text-muted-foreground">No payments match your filters.</div>
          )}
        </CardContent>
      </Card>

      {/* Refund Dialog */}
      <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
          </DialogHeader>
          {refundPayment && (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Refund Amount</span>
                  <span className="text-lg font-bold text-gold-600">{formatCurrency(refundPayment.amount)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Order</span>
                  <span className="font-mono">{refundPayment.orderId.slice(0, 16).toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>User</span>
                  <span>{getUserName(refundPayment.userId)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="refund-reason">Refund Reason</Label>
                <Textarea
                  id="refund-reason"
                  placeholder="Please provide a reason for this refund..."
                  rows={3}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-[10px]">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleRefund}
              disabled={!refundReason.trim()}
              className="rounded-[10px]"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Confirm Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}