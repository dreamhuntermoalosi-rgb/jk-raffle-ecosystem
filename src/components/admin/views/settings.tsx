'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Palette,
  Mail,
  MessageSquare,
  Smartphone,
  Shield,
  History,
  Upload,
  Save,
  Pencil,
} from 'lucide-react';
import { formatDate, getInitials } from '@/lib/utils';
import { mockUsers, mockAdmin } from '@/mock-data';

// Template items for each channel
interface TemplateItem {
  id: string;
  name: string;
  description: string;
  lastModified: string;
}

const emailTemplates: TemplateItem[] = [
  { id: 'et-1', name: 'Welcome Email', description: 'Sent when a new member registers', lastModified: '2025-05-15T10:00:00Z' },
  { id: 'et-2', name: 'Payment Confirmation', description: 'Order payment receipt', lastModified: '2025-05-20T14:00:00Z' },
  { id: 'et-3', name: 'Draw Reminder', description: '24-hour pre-draw notification', lastModified: '2025-06-01T09:00:00Z' },
  { id: 'et-4', name: 'Winner Announcement', description: 'Congratulations to the winner', lastModified: '2025-06-05T11:00:00Z' },
  { id: 'et-5', name: 'Password Reset', description: 'Password reset request', lastModified: '2025-04-10T08:00:00Z' },
  { id: 'et-6', name: 'Account Deactivation', description: 'Account deactivation notice', lastModified: '2025-03-22T12:00:00Z' },
];

const whatsappTemplates: TemplateItem[] = [
  { id: 'wt-1', name: 'Welcome Message', description: 'WhatsApp welcome for new members', lastModified: '2025-05-15T10:00:00Z' },
  { id: 'wt-2', name: 'Payment Confirmation', description: 'WhatsApp payment receipt', lastModified: '2025-05-20T14:00:00Z' },
  { id: 'wt-3', name: 'Draw Reminder', description: 'WhatsApp draw notification', lastModified: '2025-06-01T09:00:00Z' },
  { id: 'wt-4', name: 'Winner Announcement', description: 'WhatsApp winner notification', lastModified: '2025-06-05T11:00:00Z' },
];

const smsTemplates: TemplateItem[] = [
  { id: 'st-1', name: 'OTP Verification', description: 'One-time password for login', lastModified: '2025-05-15T10:00:00Z' },
  { id: 'st-2', name: 'Draw Alert', description: 'SMS draw reminder', lastModified: '2025-06-01T09:00:00Z' },
  { id: 'st-3', name: 'Winner Alert', description: 'SMS winner notification', lastModified: '2025-06-05T11:00:00Z' },
  { id: 'st-4', name: 'Ticket Purchase', description: 'SMS purchase confirmation', lastModified: '2025-05-20T14:00:00Z' },
];

// Audit log data
interface AuditEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  ip: string;
  timestamp: string;
}

const auditLog: AuditEntry[] = [
  { id: 'al-1', userId: 'user-thabo', userName: 'Thabo Mokoena', action: 'Updated', entity: 'Campaign: Luxury Sandton Villa', ip: '196.25.xx.xx', timestamp: '2025-06-12T09:15:00Z' },
  { id: 'al-2', userId: 'user-sarah', userName: 'Sarah van der Merwe', action: 'Refunded', entity: 'Order #ORD-018', ip: '165.73.xx.xx', timestamp: '2025-06-12T08:45:00Z' },
  { id: 'al-3', userId: 'user-david', userName: 'David Nkosi', action: 'Created', entity: 'Campaign: BMW X5 Premium', ip: '41.58.xx.xx', timestamp: '2025-06-12T07:30:00Z' },
  { id: 'al-4', userId: 'user-thabo', userName: 'Thabo Mokoena', action: 'Modified', entity: 'User: Zanele Khumalo', ip: '196.25.xx.xx', timestamp: '2025-06-11T16:20:00Z' },
  { id: 'al-5', userId: 'user-sarah', userName: 'Sarah van der Merwe', action: 'Exported', entity: 'Report: Monthly Revenue', ip: '165.73.xx.xx', timestamp: '2025-06-11T14:00:00Z' },
  { id: 'al-6', userId: 'user-thabo', userName: 'Thabo Mokoena', action: 'Configured', entity: 'Settings: Email Templates', ip: '196.25.xx.xx', timestamp: '2025-06-11T11:30:00Z' },
  { id: 'al-7', userId: 'user-lisa', userName: 'Lisa Botha', action: 'Resolved', entity: 'Ticket: #TKT-003', ip: '197.84.xx.xx', timestamp: '2025-06-11T10:15:00Z' },
  { id: 'al-8', userId: 'user-david', userName: 'David Nkosi', action: 'Updated', entity: 'Branch: Johannesburg North', ip: '41.58.xx.xx', timestamp: '2025-06-11T09:00:00Z' },
  { id: 'al-9', userId: 'user-thabo', userName: 'Thabo Mokoena', action: 'Broadcast', entity: 'Notification: June Campaign Launch', ip: '196.25.xx.xx', timestamp: '2025-06-10T15:00:00Z' },
  { id: 'al-10', userId: 'user-michael', userName: 'Michael Mabuza', action: 'Audited', entity: 'Payment Reconciliation', ip: '102.67.xx.xx', timestamp: '2025-06-10T12:00:00Z' },
  { id: 'al-11', userId: 'user-thabo', userName: 'Thabo Mokoena', action: 'Deployed', entity: 'System Update v2.4.1', ip: '196.25.xx.xx', timestamp: '2025-06-09T22:00:00Z' },
  { id: 'al-12', userId: 'user-sarah', userName: 'Sarah van der Merwe', action: 'Created', entity: 'Campaign: Garden Route Getaway', ip: '165.73.xx.xx', timestamp: '2025-06-09T14:30:00Z' },
];

function TemplateList({ templates, icon: Icon, accent }: { templates: TemplateItem[]; icon: React.ElementType; accent: string }) {
  return (
    <div className="space-y-2">
      {templates.map(tpl => (
        <div
          key={tpl.id}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`p-2 rounded-lg ${accent}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900">{tpl.name}</p>
              <p className="text-xs text-slate-500">{tpl.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <span className="text-xs text-slate-400 hidden sm:inline">
              {formatDate(tpl.lastModified, 'relative')}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => toast.info(`Editing template: ${tpl.name}`)}
            >
              <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminSettings() {
  const [platformName, setPlatformName] = useState('JK Raffle');
  const [tagline, setTagline] = useState('South Africa\'s Premier Raffle Platform');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [require2FA, setRequire2FA] = useState(true);
  const [minPassword, setMinPassword] = useState('8');

  function saveBranding() {
    toast.success('Branding settings saved successfully.');
  }

  function saveSecurity() {
    toast.success('Security settings saved successfully.');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Platform configuration and management</p>
      </div>

      <Tabs defaultValue="branding">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp Templates</TabsTrigger>
          <TabsTrigger value="sms">SMS Templates</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        {/* Branding */}
        <TabsContent value="branding" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Palette className="w-5 h-5 text-[hsl(43,96%,56%)]" />
                Brand Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Platform Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-[hsl(152,68%,35%)] flex items-center justify-center text-white text-xl font-bold">
                    JK
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plat-name">Platform Name</Label>
                  <Input
                    id="plat-name"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plat-tagline">Tagline</Label>
                  <Input
                    id="plat-tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Brand Color</Label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(152,68%,35%)] border-2 border-slate-200" />
                  <Input value="hsl(152, 68%, 35%)" className="w-48 font-mono text-sm" readOnly />
                  <Button variant="outline" size="sm" onClick={() => toast.info('Color picker would open here')}>
                    Change
                  </Button>
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button
                  className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white"
                  onClick={saveBranding}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Branding
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5 text-[hsl(152,68%,35%)]" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateList templates={emailTemplates} icon={Mail} accent="bg-[hsl(152,68%,35%)]/10 text-[hsl(152,68%,35%)]" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp Templates */}
        <TabsContent value="whatsapp" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                WhatsApp Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateList templates={whatsappTemplates} icon={MessageSquare} accent="bg-emerald-100 text-emerald-600" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMS Templates */}
        <TabsContent value="sms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-600" />
                SMS Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateList templates={smsTemplates} icon={Smartphone} accent="bg-amber-100 text-amber-600" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Session Timeout</p>
                    <p className="text-xs text-slate-500">Automatically log out inactive users</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="w-20 text-center text-sm"
                    />
                    <span className="text-xs text-slate-500">minutes</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Minimum Password Length</p>
                    <p className="text-xs text-slate-500">Minimum characters required for passwords</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={minPassword}
                      onChange={(e) => setMinPassword(e.target.value)}
                      className="w-20 text-center text-sm"
                    />
                    <span className="text-xs text-slate-500">chars</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Require 2FA for Admin Users</p>
                    <p className="text-xs text-slate-500">Enforce two-factor authentication for admin and super admin roles</p>
                  </div>
                  <Switch checked={require2FA} onCheckedChange={setRequire2FA} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div>
                    <p className="text-sm font-medium text-slate-900">IP Whitelist</p>
                    <p className="text-xs text-slate-500">Restrict admin access to specific IP addresses</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info('IP whitelist editor would open')}>
                    Configure
                  </Button>
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button
                  className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white"
                  onClick={saveSecurity}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log */}
        <TabsContent value="audit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <History className="w-5 h-5 text-slate-500" />
                Audit Log
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">User</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                    <TableHead className="text-xs">Entity</TableHead>
                    <TableHead className="text-xs">IP Address</TableHead>
                    <TableHead className="text-xs">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLog.map(entry => (
                    <TableRow key={entry.id} className="hover:bg-slate-50">
                      <TableCell className="text-sm font-medium text-slate-900">{entry.userName}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] ${
                            entry.action === 'Created' ? 'bg-emerald-100 text-emerald-700' :
                            entry.action === 'Refunded' ? 'bg-pink-100 text-pink-700' :
                            entry.action === 'Deleted' ? 'bg-red-100 text-red-700' :
                            'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {entry.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 max-w-[200px] truncate">{entry.entity}</TableCell>
                      <TableCell className="text-xs font-mono text-slate-500">{entry.ip}</TableCell>
                      <TableCell className="text-xs text-slate-500">{formatDate(entry.timestamp, 'relative')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}