'use client';

import {
  Download,
  Printer,
  Share2,
  QrCode,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn, formatCurrency, formatDate, getStatusColor, getCategoryIcon } from '@/lib/utils';
import { mockCampaigns, mockBranches } from '@/mock-data';
import type { Ticket } from '@/types';

interface TicketDetailDialogProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockVerificationHistory = [
  {
    id: 'v-1',
    date: '2025-06-10T14:23:00Z',
    method: 'QR Scan',
    status: 'verified',
    location: 'Sandton Branch',
  },
  {
    id: 'v-2',
    date: '2025-06-08T09:15:00Z',
    method: 'Manual Lookup',
    status: 'verified',
    location: 'Online Portal',
  },
];

export function TicketDetailDialog({ ticket, open, onOpenChange }: TicketDetailDialogProps) {
  if (!ticket) return null;

  const campaign = mockCampaigns.find((c) => c.id === ticket.campaignId);
  const branch = campaign ? mockBranches.find((b) => b.id === campaign.branchId) : null;
  const isWon = ticket.status === 'won' || ticket.status === 'claimed';

  const handleAction = (action: string) => {
    toast.success(`${action} action — this is a demo feature.`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-xl border-0">
        {/* Ticket Header with maroon gradient */}
        <div className="relative bg-gradient-to-br from-maroon-600 via-maroon-500 to-maroon-700 px-6 pt-6 pb-5 rounded-t-xl">
          <div className="flex items-center justify-between mb-4">
            <Badge
              variant="secondary"
              className={cn(
                'text-xs px-3 py-1 font-medium rounded-md border-0',
                getStatusColor(ticket.status)
              )}
            >
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </Badge>
            {isWon && (
              <Badge className="bg-gold-400 text-maroon-900 border-0 text-xs px-3 py-1 font-bold rounded-md">
                🏆 Winner!
              </Badge>
            )}
          </div>
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-white text-left font-mono text-2xl md:text-3xl tracking-widest font-bold">
              {ticket.reference}
            </DialogTitle>
            <DialogDescription className="text-white/50 text-left text-sm">
              {campaign?.title || 'Unknown Campaign'}
            </DialogDescription>
          </DialogHeader>
          {/* Decorative dots */}
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-20">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-[200px] h-[200px] rounded-xl border-2 border-dashed border-maroon-200 bg-maroon-50/30 flex flex-col items-center justify-center gap-2">
              {/* Corner decorations */}
              <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-maroon-300 rounded-tl-md" />
              <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-maroon-300 rounded-tr-md" />
              <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-maroon-300 rounded-bl-md" />
              <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-maroon-300 rounded-br-md" />
              <QrCode className="h-16 w-16 text-maroon-500" />
              <span className="text-xs font-medium text-maroon-400">Scan to Verify</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Barcode: {ticket.barcode || 'N/A'}
            </p>
          </div>

          <Separator />

          {/* Ticket Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem
              label="Campaign"
              value={campaign?.title || 'Unknown'}
              icon={getCategoryIcon(campaign?.product?.category || 'other')}
            />
            <DetailItem
              label="Branch"
              value={branch?.name || 'N/A'}
            />
            <DetailItem
              label="Purchase Date"
              value={formatDate(ticket.purchasedAt, 'long')}
            />
            <DetailItem
              label="Draw Date"
              value={campaign?.drawDate ? formatDate(campaign.drawDate, 'long') : 'TBD'}
            />
            <DetailItem
              label="Ticket Price"
              value={formatCurrency(campaign?.ticketPrice || 0)}
              highlight
            />
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Payment Status</p>
              <Badge
                variant="secondary"
                className="text-xs px-3 py-1 bg-maroon-50 text-maroon-600 rounded-md border-0 font-medium"
              >
                <ShieldCheck className="h-3 w-3 mr-1.5" />
                Paid
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Verification History */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 tracking-tight">
              <ShieldCheck className="h-4 w-4 text-maroon-500" />
              Verification History
            </h3>
            <div className="space-y-2">
              {mockVerificationHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-maroon-50">
                      <ShieldCheck className="h-4 w-4 text-maroon-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{entry.method}</p>
                      <p className="text-xs text-muted-foreground">{entry.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(entry.date, 'relative')}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-[10px] px-1.5 py-0 bg-maroon-50 text-maroon-500 rounded-md border-0"
                    >
                      Verified
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-[10px] border-border hover:bg-maroon-50 hover:border-maroon-200"
              onClick={() => handleAction('Download PDF')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-[10px] border-border hover:bg-maroon-50 hover:border-maroon-200"
              onClick={() => handleAction('Print')}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-[10px] border-border hover:bg-maroon-50 hover:border-maroon-200"
              onClick={() => handleAction('Share')}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon?: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p
        className={cn(
          'text-sm',
          highlight
            ? 'text-lg font-bold text-maroon-500'
            : 'font-medium text-foreground'
        )}
      >
        {icon && <span className="mr-1.5">{icon}</span>}
        {value}
      </p>
    </div>
  );
}