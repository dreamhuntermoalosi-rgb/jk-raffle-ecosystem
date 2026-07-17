'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { getActiveCampaigns } from '@/mock-data';
import { formatCurrency, formatCountdown, formatDate, formatNumber, getCategoryIcon, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, Search, TicketCheck, SlidersHorizontal } from 'lucide-react';
import type { ProductCategory } from '@/types';

const categoryTabs: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Houses', value: 'house' },
  { label: 'Vehicles', value: 'vehicle' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Cash', value: 'cash' },
  { label: 'Vacations', value: 'vacation' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: '-40px' },
};

export function PublicCampaigns() {
  const { setView, setPortal, login } = useAppStore();
  const [activeTab, setActiveTab] = useState<ProductCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const allCampaigns = getActiveCampaigns();

  const filtered = allCampaigns.filter((c) => {
    const matchCategory = activeTab === 'all' || c.product.category === activeTab;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.product.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleBuyTickets = () => {
    login({
      id: 'user-james',
      email: 'james.peterson@email.co.za',
      phone: '+27 82 345 6789',
      firstName: 'James',
      lastName: 'Peterson',
      avatar: null,
      occupation: 'Civil Engineer',
      biography: 'A dedicated community member and father of two.',
      role: 'member',
      status: 'active',
      branchId: 'branch-jhb-n',
      twoFactorEnabled: false,
      lastLoginAt: '2025-06-10T14:30:00Z',
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2025-06-10T14:30:00Z',
    });
    setPortal('member');
  };

  return (
    <div className="pt-16 lg:pt-18">
      {/* Header */}
      <section className="bg-gradient-to-b from-forest-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.div {...fadeInUp} className="text-center">
            <Badge variant="secondary" className="mb-4">
              <TicketCheck className="h-3 w-3 mr-1" />
              Active Raffles
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Current <span className="gradient-text">Campaigns</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse all active campaigns and purchase tickets for your chance to win
              incredible prizes across South Africa.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search & Filters */}
        <motion.div {...fadeInUp} className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  activeTab === tab.value
                    ? 'bg-forest-500 hover:bg-forest-600 text-white'
                    : 'text-muted-foreground'
                )}
              >
                {tab.value !== 'all' && (
                  <span className="mr-1.5">{getCategoryIcon(tab.value)}</span>
                )}
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            Showing {filtered.length} campaign{filtered.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Campaign Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((campaign) => {
              const progress = Math.round((campaign.soldTickets / campaign.maxTickets) * 100);
              const remaining = campaign.maxTickets - campaign.soldTickets;
              const cd = formatCountdown(campaign.drawDate);

              return (
                <motion.div key={campaign.id} {...fadeInUp}>
                  <Card className="card-hover overflow-hidden border-border/50 shadow-sm h-full flex flex-col">
                    {/* Image placeholder */}
                    <div className="relative h-44 bg-gradient-to-br from-forest-50 to-forest-100/80 flex items-center justify-center">
                      <span className="text-5xl">{getCategoryIcon(campaign.product.category)}</span>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-forest-500 text-white text-xs">
                          {campaign.product.category.charAt(0).toUpperCase() + campaign.product.category.slice(1)}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/90 text-emerald-700 text-xs backdrop-blur-sm">
                          Open
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-base line-clamp-1">{campaign.title}</h3>
                      </div>

                      <p className="text-2xl font-bold text-forest-500 mb-4">
                        {formatCurrency(campaign.product.value)}
                      </p>

                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Ticket Price</span>
                          <span className="font-semibold">{formatCurrency(campaign.ticketPrice)}</span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="text-muted-foreground">Sold</span>
                            <span className="font-medium">
                              {formatNumber(campaign.soldTickets)} / {formatNumber(campaign.maxTickets)} ({progress}%)
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Remaining</span>
                          <span className="font-medium text-gold-500">{formatNumber(remaining)} tickets</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {!cd.expired
                                ? `${cd.days}d ${cd.hours}h ${cd.minutes}m`
                                : 'Draw completed'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{campaign.branch.name}, {campaign.branch.province}</span>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Draw: {formatDate(campaign.drawDate, 'long')}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="px-5 pb-5 pt-0">
                      <Button
                        className="w-full bg-forest-500 hover:bg-forest-600 text-white"
                        onClick={handleBuyTickets}
                      >
                        Buy Tickets
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}