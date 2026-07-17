'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
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
import { toast } from 'sonner';
import {
  Send,
  MessageSquare,
  Mail,
  Smartphone,
  Bell,
  Clock,
  FileText,
  Edit,
} from 'lucide-react';
import { mockBranches } from '@/mock-data';
import { formatDate } from '@/lib/utils';

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'whatsapp' | 'sms';
  subject: string;
  description: string;
  lastModified: string;
}

const templates: NotificationTemplate[] = [
  { id: 'tpl-1', name: 'Welcome Email', type: 'email', subject: 'Welcome to JK Raffle, {{firstName}}!', description: 'Sent when a new member registers', lastModified: '2025-05-15T10:00:00Z' },
  { id: 'tpl-2', name: 'Payment Confirmation', type: 'email', subject: 'Payment Confirmed — Order #{{orderId}}', description: 'Sent after successful payment', lastModified: '2025-05-20T14:00:00Z' },
  { id: 'tpl-3', name: 'Draw Reminder', type: 'email', subject: 'Draw Tomorrow: {{campaignTitle}}', description: 'Sent 24 hours before a draw', lastModified: '2025-06-01T09:00:00Z' },
  { id: 'tpl-4', name: 'Winner Announcement', type: 'email', subject: 'Congratulations, {{firstName}}! You Won!', description: 'Sent to the winner after a draw', lastModified: '2025-06-05T11:00:00Z' },
  { id: 'tpl-5', name: 'WhatsApp Welcome', type: 'whatsapp', subject: 'Welcome to JK Raffle!', description: 'WhatsApp welcome message for new members', lastModified: '2025-05-15T10:00:00Z' },
  { id: 'tpl-6', name: 'WhatsApp Payment', type: 'whatsapp', subject: 'Payment Received', description: 'WhatsApp payment confirmation', lastModified: '2025-05-20T14:00:00Z' },
  { id: 'tpl-7', name: 'WhatsApp Draw', type: 'whatsapp', subject: 'Draw Reminder', description: 'WhatsApp draw reminder', lastModified: '2025-06-01T09:00:00Z' },
  { id: 'tpl-8', name: 'SMS Welcome', type: 'sms', subject: 'Welcome to JK Raffle', description: 'SMS welcome for new registrations', lastModified: '2025-05-15T10:00:00Z' },
  { id: 'tpl-9', name: 'SMS Payment', type: 'sms', subject: 'Payment Confirmed', description: 'SMS payment confirmation', lastModified: '2025-05-20T14:00:00Z' },
];

interface Broadcast {
  id: string;
  title: string;
  channels: string[];
  target: string;
  status: string;
  sentAt: string;
  delivered: number;
  failed: number;
  total: number;
}

const broadcasts: Broadcast[] = [
  { id: 'bc-1', title: 'June Campaign Launch', channels: ['In-App', 'Email', 'WhatsApp'], target: 'All Members', status: 'delivered', sentAt: '2025-06-01T08:00:00Z', delivered: 3640, failed: 12, total: 3692 },
  { id: 'bc-2', title: 'Maintenance Window Notice', channels: ['In-App', 'Email'], target: 'All Members', status: 'delivered', sentAt: '2025-05-28T22:00:00Z', delivered: 3520, failed: 8, total: 3568 },
  { id: 'bc-3', title: 'New Branch Opening', channels: ['In-App', 'Email', 'SMS', 'WhatsApp'], target: 'Johannesburg North Members', status: 'delivered', sentAt: '2025-05-20T10:00:00Z', delivered: 328, failed: 2, total: 342 },
  { id: 'bc-4', title: 'Winner Verification Required', channels: ['In-App', 'Email'], target: 'Specific Users', status: 'delivered', sentAt: '2025-05-15T14:00:00Z', delivered: 6, failed: 0, total: 6 },
  { id: 'bc-5', title: 'Scheduled: Mid-Year Promo', channels: ['In-App', 'Email', 'WhatsApp'], target: 'All Members', status: 'scheduled', sentAt: '2025-06-20T08:00:00Z', delivered: 0, failed: 0, total: 3769 },
  { id: 'bc-6', title: 'Draw Results: Luxury Villa', channels: ['In-App', 'Email', 'WhatsApp'], target: 'Campaign Participants', status: 'delivered', sentAt: '2025-05-25T18:30:00Z', delivered: 498, failed: 2, total: 500 },
];

const channels = [
  { id: 'in_app', label: 'In-App', icon: Bell },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'sms', label: 'SMS', icon: Smartphone },
  { id: 'email', label: 'Email', icon: Mail },
];

export function AdminNotifications() {
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['in_app', 'email']);
  const [targetType, setTargetType] = useState('all');
  const [scheduled, setScheduled] = useState(false);

  function toggleChannel(id: string) {
    setSelectedChannels(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }

  function handleSend() {
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      toast.error('Please fill in the title and message.');
      return;
    }
    if (selectedChannels.length === 0) {
      toast.error('Please select at least one channel.');
      return;
    }
    toast.success(`Broadcast "${broadcastTitle}" ${scheduled ? 'scheduled' : 'sent'} successfully via ${selectedChannels.length} channel(s).`);
    setBroadcastTitle('');
    setBroadcastMessage('');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <p className="text-sm text-slate-500 mt-1">Manage broadcasts, templates, and delivery</p>
      </div>

      {/* Broadcast Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Send className="w-5 h-5 text-[hsl(152,68%,35%)]" />
            Broadcast Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bc-title">Title</Label>
              <Input
                id="bc-title"
                placeholder="e.g. New Campaign Launch"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select value={targetType} onValueChange={setTargetType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="branch">Specific Branch</SelectItem>
                  <SelectItem value="role">Specific Role</SelectItem>
                  <SelectItem value="campaign">Campaign Participants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {targetType === 'branch' && (
            <div className="space-y-2">
              <Label>Branch</Label>
              <Select>
                <SelectTrigger className="w-full sm:w-80"><SelectValue placeholder="Select branch" /></SelectTrigger>
                <SelectContent>
                  {mockBranches.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="bc-message">Message</Label>
            <Textarea
              id="bc-message"
              placeholder="Type your notification message..."
              rows={4}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Channels</Label>
            <div className="flex flex-wrap gap-3">
              {channels.map(ch => {
                const Icon = ch.icon;
                const checked = selectedChannels.includes(ch.id);
                return (
                  <label
                    key={ch.id}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                      checked
                        ? 'border-[hsl(152,68%,35%)] bg-[hsl(152,68%,35%)]/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleChannel(ch.id)}
                    />
                    <Icon className={`w-4 h-4 ${checked ? 'text-[hsl(152,68%,35%)]' : 'text-slate-400'}`} />
                    <span className={`text-sm ${checked ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                      {ch.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch checked={scheduled} onCheckedChange={setScheduled} />
              <Label className="text-sm">Schedule for later</Label>
              {scheduled && (
                <Input type="datetime-local" className="w-48" />
              )}
            </div>
            <Button
              className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white"
              onClick={handleSend}
            >
              <Send className="w-4 h-4 mr-2" />
              {scheduled ? 'Schedule' : 'Send Now'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-500" />
            Notification Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {templates.map(tpl => (
              <div
                key={tpl.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Badge variant="outline" className="text-[10px] capitalize flex-shrink-0">
                    {tpl.type}
                  </Badge>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900">{tpl.name}</p>
                    <p className="text-xs text-slate-500 truncate">{tpl.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Updated {formatDate(tpl.lastModified, 'relative')}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => toast.info(`Editing template: ${tpl.name}`)}
                  >
                    <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Broadcasts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Broadcasts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Title</TableHead>
                <TableHead className="text-xs">Channels</TableHead>
                <TableHead className="text-xs">Target</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Sent</TableHead>
                <TableHead className="text-xs text-right">Delivery</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {broadcasts.map(bc => (
                <TableRow key={bc.id} className="hover:bg-slate-50">
                  <TableCell className="text-sm font-medium text-slate-900">{bc.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {bc.channels.map(ch => (
                        <Badge key={ch} variant="outline" className="text-[9px]">{ch}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">{bc.target}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${
                        bc.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-700'
                          : bc.status === 'scheduled'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {bc.status === 'scheduled' && <Clock className="w-3 h-3 mr-1" />}
                      {bc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">{formatDate(bc.sentAt)}</TableCell>
                  <TableCell className="text-right">
                    {bc.status === 'delivered' ? (
                      <div className="text-xs">
                        <span className="text-emerald-600 font-medium">{bc.delivered}</span>
                        <span className="text-slate-400">/{bc.total}</span>
                        {bc.failed > 0 && (
                          <span className="text-red-400 ml-1">({bc.failed} failed)</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Pending</span>
                    )}
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