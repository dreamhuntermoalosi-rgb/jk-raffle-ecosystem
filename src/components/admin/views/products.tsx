'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, LayoutGrid, List, MoreHorizontal, Pencil, Eye, Trash2 } from 'lucide-react';
import { mockProducts, mockCampaigns } from '@/mock-data';
import { formatCurrency, getCategoryIcon, getStatusColor } from '@/lib/utils';
import type { Product, ProductCategory } from '@/types';

const categories: { value: ProductCategory; label: string }[] = [
  { value: 'house', label: 'House' },
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'cash', label: 'Cash' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'other', label: 'Other' },
];

function getCampaignCount(productId: string) {
  return mockCampaigns.filter(c => c.productId === productId).length;
}

export function AdminProducts() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  function openCreate() {
    setEditingProduct(null);
    setDialogOpen(true);
  }

  function openEdit(p: Product) {
    setEditingProduct(p);
    setDialogOpen(true);
  }

  function handleSave() {
    toast.success(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
    setDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500 mt-1">{mockProducts.length} products in catalogue</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg p-0.5 bg-slate-100">
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
              <Button className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white" onClick={openCreate}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="prod-name">Product Name</Label>
                  <Input id="prod-name" placeholder="e.g. Luxury Beachfront Villa" defaultValue={editingProduct?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prod-desc">Description</Label>
                  <Textarea id="prod-desc" placeholder="Describe the product..." rows={3} defaultValue={editingProduct?.description || ''} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select defaultValue={editingProduct?.category}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map(c => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prod-value">Value (ZAR)</Label>
                    <Input id="prod-value" type="number" placeholder="1000000" defaultValue={editingProduct?.value} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue={editingProduct?.status || 'active'}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prod-image">Image URL</Label>
                    <Input id="prod-image" placeholder="https://..." defaultValue={editingProduct?.image || ''} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="bg-[hsl(152,68%,35%)] hover:bg-[hsl(152,68%,30%)] text-white" onClick={handleSave}>
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProducts.map((product) => {
            const campaignCount = getCampaignCount(product.id);
            return (
              <Card key={product.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                      {getCategoryIcon(product.category)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={`text-[10px] capitalize ${getStatusColor(product.status)}`}>
                        {product.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(product)}><Pencil className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600"><Trash2 className="w-4 h-4 mr-2" /> Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[hsl(152,68%,35%)]">{formatCurrency(product.value)}</p>
                    <span className="text-xs text-slate-400">{campaignCount} campaign{campaignCount !== 1 ? 's' : ''}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Category</TableHead>
                  <TableHead className="text-xs text-right">Value</TableHead>
                  <TableHead className="text-xs text-center">Campaigns</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.map((product) => {
                  const campaignCount = getCampaignCount(product.id);
                  return (
                    <TableRow key={product.id} className="hover:bg-slate-50">
                      <TableCell className="text-sm font-medium text-slate-900">{product.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span>{getCategoryIcon(product.category)}</span>
                          <span className="text-xs capitalize text-slate-600">{product.category}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-right">{formatCurrency(product.value)}</TableCell>
                      <TableCell className="text-sm text-center">{campaignCount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-[10px] ${getStatusColor(product.status)}`}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info('View product details')}>
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(product)}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}