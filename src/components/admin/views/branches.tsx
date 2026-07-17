'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Plus, LayoutGrid, List, MoreHorizontal, Pencil, Eye, MapPin, Users } from 'lucide-react';
import { mockBranches, mockUsers } from '@/mock-data';
import { formatCurrency, formatNumber, getStatusColor } from '@/lib/utils';

const managers = mockUsers.filter(u => u.role === 'branch_manager' || u.role === 'super_admin' || u.role === 'admin');

const provinces = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State',
  'Mpumalanga', 'Limpopo', 'Northern Cape', 'North West',
];

export function AdminBranches() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Branches</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockBranches.length} branches across South Africa</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg p-0.5 bg-muted">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-maroon-500 hover:bg-maroon-600 text-white rounded-[10px]">
                <Plus className="w-4 h-4 mr-2" />
                Create Branch
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Branch</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="br-name">Branch Name</Label>
                    <Input id="br-name" placeholder="e.g. Johannesburg West" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="br-code">Branch Code</Label>
                    <Input id="br-code" placeholder="e.g. JHB-W" className="rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Province</Label>
                    <Select>
                      <SelectTrigger className="rounded-lg"><SelectValue placeholder="Select province" /></SelectTrigger>
                      <SelectContent>
                        {provinces.map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="br-city">City</Label>
                    <Input id="br-city" placeholder="e.g. Johannesburg" className="rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="br-address">Address</Label>
                  <Input id="br-address" placeholder="Full street address" className="rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="br-phone">Phone</Label>
                    <Input id="br-phone" placeholder="+27 XX XXX XXXX" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="br-email">Email</Label>
                    <Input id="br-email" type="email" placeholder="branch@jkraffle.co.za" className="rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Manager</Label>
                  <Select>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder="Assign a manager" /></SelectTrigger>
                    <SelectContent>
                      {managers.map(m => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.firstName} {m.lastName} ({m.role.replace('_', ' ')})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-[10px]">Cancel</Button>
                </DialogClose>
                <Button className="bg-maroon-500 hover:bg-maroon-600 text-white rounded-[10px]" onClick={() => { toast.success('Branch created successfully!'); setDialogOpen(false); }}>
                  Create Branch
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBranches.map((branch) => (
            <Card key={branch.id} className="group shadow-royal-sm rounded-xl border-0 hover:shadow-royal-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{branch.name}</h3>
                    <Badge variant="outline" className="text-[10px] font-mono mt-1 rounded-md">{branch.code}</Badge>
                  </div>
                  <Badge variant="secondary" className={`text-[10px] rounded-md ${getStatusColor(branch.status)}`}>
                    {branch.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{branch.city}{branch.province ? `, ${branch.province}` : ''}</span>
                </div>

                {/* Map Placeholder */}
                <div className="w-full h-24 rounded-lg bg-maroon-50/60 flex items-center justify-center mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, #5B1322 10px, #5B1322 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, #5B1322 10px, #5B1322 11px)' }} />
                  <MapPin className="w-6 h-6 text-maroon-500 relative z-10" />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Users className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{formatNumber(branch.memberCount || 0)}</p>
                    <p className="text-[10px] text-muted-foreground">Members</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <p className="text-sm font-semibold text-foreground">{formatCurrency(branch.revenue || 0)}</p>
                    <p className="text-[10px] text-muted-foreground">Revenue</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <p className="text-xs font-medium text-foreground">{branch.managerId ? 'Assigned' : 'Open'}</p>
                    <p className="text-[10px] text-muted-foreground">Manager</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs rounded-[10px]" onClick={() => toast.info(`Viewing ${branch.name}`)}>
                    <Eye className="w-3.5 h-3.5 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs rounded-[10px]" onClick={() => toast.info(`Editing ${branch.name}`)}>
                    <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="shadow-royal-sm rounded-xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Code</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">City</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Manager</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Members</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Revenue</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBranches.map((branch) => {
                    const manager = branch.managerId ? mockUsers.find(u => u.id === branch.managerId) : null;
                    return (
                      <TableRow key={branch.id} className="hover:bg-maroon-50/30 transition-colors">
                        <TableCell className="text-sm font-medium text-foreground py-3.5">{branch.name}</TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline" className="text-[10px] font-mono rounded-md">{branch.code}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground py-3.5">
                          {branch.city}{branch.province ? `, ${branch.province}` : ''}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground py-3.5">
                          {manager ? `${manager.firstName} ${manager.lastName}` : <span className="text-muted-foreground">Unassigned</span>}
                        </TableCell>
                        <TableCell className="text-sm text-right py-3.5">{formatNumber(branch.memberCount || 0)}</TableCell>
                        <TableCell className="text-sm font-medium text-right py-3.5">{formatCurrency(branch.revenue || 0)}</TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="secondary" className={`text-[10px] rounded-md ${getStatusColor(branch.status)}`}>
                            {branch.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right py-3.5">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.info(`Viewing ${branch.name}`)}>
                                <Eye className="w-4 h-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info(`Editing ${branch.name}`)}>
                                <Pencil className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}