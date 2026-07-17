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
import { formatDate } from '@/lib/utils';
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
          className="flex items-center justify-between p-3 rounded-lg hover:bg-maroon-50/30 transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`p-2 rounded-lg ${accent}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{tpl.name}</p>
              <p className="text-xs text-muted-foreground">{tpl.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <span className="text-xs text-muted-foreground hidden sm:inline">
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
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform configuration and management</p>
      </div>

      <Tabs defaultValue="branding">
        <TabsList className="bg-muted">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp Templates</TabsTrigger>
          <TabsTrigger value="sms">SMS Templates</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        {/* Branding */}
        <TabsContent value="branding" className="mt-6">
          <Card className="shadow-royal-sm rounded-xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Palette className="w-5 h-5 text-gold-600" />
                Brand Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Platform Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-maroon-500 flex items-center justify-center text-white text-xl font-bold">
                    JK
                  </div>
                  <Button variant="outline" size="sm" className="rounded-[10px]">
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
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plat-tagline">Tagline</Label>
                  <Input
                    id="plat-tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Brand Color</Label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-maroon-500 border-2 border-border" />
                  <Input value="#5B1322" className="w-48 font-mono text-sm rounded-lg" readOnly />
                  <Button variant="outline" size="sm" className="rounded-[10px]" onClick={() => toast.info('Color picker would open here')}>
                    Change
                  </Button>
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button
                  className="bg-maroon-500 hover:bg-maroon-600 text-white rounded-[10px]"
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
          <Card className="shadow-royal-sm rounded-xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5 text-maroon-500" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateList templates={emailTemplates} icon={Mail} accent="bg-maroon-50 text-maroon-600" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp Templates */}
        <TabsContent value="whatsapp" className="mt-6">
          <Card className="shadow-royal-sm rounded-xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-maroon-500" />
                WhatsApp Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateList templates={whatsappTemplates} icon={MessageSquare} accent="bg-maroon-100 text-maroon-600" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMS Templates */}
        <TabsContent value="sms" className="mt-6">
          <Card className="shadow-royal-sm rounded-xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-maroon-500" />
                SMS Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateList templates={smsTemplates} icon={Smartphone} accent="bg-maroon-50 text-maroon-500" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6">
          <Card className="shadow-royal-sm rounded-xl border-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-maroon-500" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Session Timeout</p>
                    <p className="text-xs text-muted-foreground">Automatically log out inactive users</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="w-20 text-center text-sm rounded-lg"
                    />
                    <span className="text-xs text-muted-foreground">minutes</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Minimum Password Length</p>
                    <p className="text-xs text-muted-foreground">Minimum characters required for passwords</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={minPassword}
                      onChange={(e) => setMinPassword(e.target.value)}
                      className="w-20 text-center text-sm rounded-lg"
                    />
                    <span className="text-xs text-muted-foreground">chars</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Require 2FA for Admin Users</p>
                    <p className="text-xs text-muted-foreground">Enforce two-factor authentication for admin and super admin roles</p>
                  </div>
                  <Switch checked={require2FA} onCheckedChange={setRequire2FA} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">IP Whitelist</p>
                    <p className="text-xs text-muted-foreground">Restrict admin access to specific IP addresses</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-[10px]" onClick={() => toast.info('IP whitelist editor would open')}>
                    Configure
                  </Button>
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button
                  className="bg-maroon-500 hover:bg-maroon-600 text-white rounded-[10px]"
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
          <Card className="shadow-royal-sm rounded-xl border-0 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <History className="w-5 h-5 text-muted-foreground" />
                Audit Log
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-muted/50">
                      <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">User</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">Action</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">Entity</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">IP Address</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLog.map(entry => (
                      <TableRow key={entry.id} className="hover:bg-maroon-50/30 transition-colors">
                        <TableCell className="text-sm font-medium text-foreground py-3">{entry.userName}</TableCell>
                        <TableCell className="py-3">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] rounded-md ${
                              entry.action === 'Created' ? 'bg-maroon-100 text-maroon-700' :
                              entry.action === 'Refunded' ? 'bg-gold-50 text-gold-700' :
                              entry.action === 'Deleted' ? 'bg-red-50 text-red-700' :
                              'bg-muted text-muted-foreground'
                            }`}
                          >
                            {entry.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate py-3">{entry.entity}</TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground py-3">{entry.ip}</TableCell>
                        <TableCell className="text-xs text-muted-foreground py-3">{formatDate(entry.timestamp, 'relative')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}