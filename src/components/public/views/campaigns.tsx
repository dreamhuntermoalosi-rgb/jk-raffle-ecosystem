'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { getActiveCampaigns } from '@/mock-data';
import { formatCurrency, formatCountdown, formatDate, formatNumber, getCategoryIcon, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, Search, TicketCheck, SlidersHorizontal, SearchX } from 'lucide-react';
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
      {/* Header — Dark maroon gradient */}
      <section className="bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-700 relative overflow-hidden">
        {/* Subtle decorative element */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-gold-400/15 text-gold-300 border-gold-400/25 hover:bg-gold-400/25 mb-5">
              <TicketCheck className="h-3 w-3 mr-1.5" />
              Active Raffles
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
              Current <span className="gradient-gold">Campaigns</span>
            </h1>
            <p className="text-lg text-maroon-200/80 max-w-2xl mx-auto leading-relaxed">
              Browse all active campaigns and purchase tickets for your chance to win
              incredible prizes across South Africa.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search & Filters */}
        <motion.div {...fadeInUp} className="mb-8 -mt-8 space-y-5 relative z-20">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-[10px] bg-white border-border/60 shadow-royal-sm h-11"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'rounded-[10px] text-sm font-medium transition-all',
                  activeTab === tab.value
                    ? 'bg-maroon-500 hover:bg-maroon-600 text-white shadow-royal-sm'
                    : 'text-muted-foreground border-border/60 bg-white hover:bg-maroon-50 hover:text-maroon-500 hover:border-maroon-200'
                )}
              >
                {activeTab === tab.value && tab.value !== 'all' && (
                  <span className="mr-1.5">{getCategoryIcon(tab.value)}</span>
                )}
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Showing {filtered.length} campaign{filtered.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Campaign Grid */}
        {filtered.length === 0 ? (
          <motion.div {...fadeInUp} className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-maroon-50 mb-5">
              <SearchX className="h-7 w-7 text-maroon-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">No campaigns found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria.</p>
          </motion.div>
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
                  <Card className="card-hover overflow-hidden border-border/40 shadow-royal-sm rounded-xl h-full flex flex-col bg-white">
                    {/* Image area — dark maroon gradient */}
                    <div className="relative h-48 bg-gradient-to-br from-maroon-800 to-maroon-900 flex items-center justify-center">
                      <span className="text-5xl opacity-80">{getCategoryIcon(campaign.product.category)}</span>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-maroon-500/90 text-white text-xs border-0 backdrop-blur-sm">
                          {campaign.product.category.charAt(0).toUpperCase() + campaign.product.category.slice(1)}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/10 text-white/90 text-xs backdrop-blur-sm border border-white/10">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5" />
                          Open
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-base line-clamp-1 text-foreground">{campaign.title}</h3>
                      </div>

                      {/* Prize value — LARGE, gold */}
                      <p className="text-2xl font-bold text-gold-400 mb-4">
                        {formatCurrency(campaign.product.value)}
                      </p>

                      <div className="space-y-3 flex-1">
                        {/* Ticket price */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Ticket Price</span>
                          <span className="font-normal text-foreground">{formatCurrency(campaign.ticketPrice)}</span>
                        </div>

                        {/* Progress — gold-to-maroon gradient bar */}
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="text-muted-foreground">Sold</span>
                            <span className="font-medium text-foreground">
                              {formatNumber(campaign.soldTickets)} / {formatNumber(campaign.maxTickets)} ({progress}%)
                            </span>
                          </div>
                          <div className="progress-royal">
                            <div
                              style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #D4AF37, #5B1322)',
                              }}
                            />
                          </div>
                        </div>

                        {/* Remaining tickets — gold-500 */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Remaining</span>
                          <span className="font-medium text-gold-500">{formatNumber(remaining)} tickets</span>
                        </div>

                        {/* Draw info with Clock */}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>
                            {!cd.expired
                              ? `${cd.days}d ${cd.hours}h ${cd.minutes}m remaining`
                              : 'Draw completed'}
                          </span>
                        </div>

                        {/* Branch with MapPin */}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>{campaign.branch.name}, {campaign.branch.province}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="px-5 pb-5 pt-0">
                      <Button
                        className="w-full bg-maroon-500 hover:bg-maroon-600 text-white rounded-[10px] h-11 font-medium"
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