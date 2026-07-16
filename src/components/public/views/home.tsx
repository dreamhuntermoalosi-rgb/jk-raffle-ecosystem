'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { getFeaturedCampaigns, getRecentWinners, mockDashboardStats, mockRecentWinners } from '@/mock-data';
import { formatCurrency, formatCountdown, formatDate, formatNumber, getCategoryIcon, getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  Clock,
  Users,
  Trophy,
  TicketCheck,
  UserPlus,
  ShoppingCart,
  Star,
  MapPin,
  Zap,
  Shield,
  Gift,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-60px' },
};

export function PublicHome() {
  const { setView } = useAppStore();
  const featuredCampaigns = getFeaturedCampaigns();
  const recentWinners = getRecentWinners();
  const stats = mockDashboardStats;
  const heroCountdownTarget = featuredCampaigns[0]?.drawDate || '2025-09-15T18:00:00Z';
  const [countdown, setCountdown] = useState(formatCountdown(heroCountdownTarget));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown(heroCountdownTarget));
    }, 1000);
    return () => clearInterval(interval);
  }, [heroCountdownTarget]);

  // Compute total prize value from winners
  const totalPrizeValue = mockRecentWinners.reduce((sum, w) => sum + w.prizeValue, 0);

  const navTo = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-16 lg:pt-18">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-forest-800">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest-800/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30 hover:bg-gold-500/30 mb-6 px-4 py-1.5 text-sm font-medium">
                <Gift className="h-3.5 w-3.5 mr-1.5" />
                FLG Empire &bull; IPHC Community Initiative
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6"
            >
              Your Dream Home{' '}
              <span className="gradient-gold">Awaits</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-lg sm:text-xl text-forest-200/80 leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              South Africa&apos;s premier community-driven raffle platform. Win incredible
              prizes from houses to holidays — powered by the FLG Empire in
              partnership with IPHC.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            >
              <Button
                size="lg"
                onClick={() => navTo('campaigns')}
                className="bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold px-8 h-12 text-base shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300"
              >
                View Current Campaigns
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navTo('how-it-works')}
                className="border-white/20 text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base"
              >
                How It Works
              </Button>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="inline-flex flex-col items-center"
            >
              <p className="text-sm font-medium text-forest-300/60 uppercase tracking-wider mb-3">
                Next Draw In
              </p>
              <div className="flex items-center gap-3">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                          {String(unit.value).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-forest-300/50 mt-1.5 uppercase tracking-wider font-medium">
                        {unit.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <span className="text-xl sm:text-2xl text-forest-300/30 font-light mb-5">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { icon: Trophy, label: 'Total Winners', value: stats.totalWinners, format: true },
                { icon: Gift, label: 'Total Prize Value', value: totalPrizeValue, currency: true },
                { icon: Zap, label: 'Active Campaigns', value: stats.activeCampaigns, format: true },
                { icon: Users, label: 'Members', value: stats.totalMembers, format: true },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-forest-50 mb-3">
                    <stat.icon className="h-5 w-5 text-forest-500" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    {stat.currency ? formatCurrency(stat.value) : formatNumber(stat.value)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED CAMPAIGNS ===== */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Featured Prizes</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Current <span className="gradient-text">Campaigns</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our featured raffle campaigns and stand a chance to win life-changing prizes.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredCampaigns.slice(0, 3).map((campaign) => {
              const progress = Math.round((campaign.soldTickets / campaign.maxTickets) * 100);
              const remaining = campaign.maxTickets - campaign.soldTickets;
              return (
                <motion.div key={campaign.id} {...fadeInUp}>
                  <Card className="card-hover overflow-hidden border-border/50 shadow-sm">
                    {/* Product Image Placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-forest-50 to-forest-100 flex items-center justify-center">
                      <span className="text-6xl">{getCategoryIcon(campaign.product.category)}</span>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-forest-500 text-white text-xs">
                          {campaign.product.category.charAt(0).toUpperCase() + campaign.product.category.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 text-forest-700 text-xs backdrop-blur-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {campaign.branch.name}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="font-semibold text-base mb-1 line-clamp-1">{campaign.title}</h3>
                      <p className="text-2xl font-bold text-forest-500 mb-3">
                        {formatCurrency(campaign.product.value)}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{progress}% sold</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tickets remaining</span>
                          <span className="font-medium text-gold-500">{formatNumber(remaining)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Draw date</span>
                          <span className="font-medium">{formatDate(campaign.drawDate)}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="px-5 pb-5 pt-0">
                      <Button
                        className="w-full bg-forest-500 hover:bg-forest-600 text-white"
                        onClick={() => navTo('campaigns')}
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navTo('campaigns')}
              className="px-8"
            >
              View All Campaigns
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS PREVIEW ===== */}
      <section className="py-20 lg:py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is easy. Just three simple steps to enter our raffles.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              {
                step: '01',
                icon: UserPlus,
                title: 'Register',
                description: 'Visit your nearest FLG Empire branch and register through your authorised Branch Manager. Quick, secure, and personal.',
              },
              {
                step: '02',
                icon: ShoppingCart,
                title: 'Select & Purchase',
                description: 'Browse active campaigns and purchase tickets for the prizes that excite you most. Multiple tickets increase your chances.',
              },
              {
                step: '03',
                icon: Trophy,
                title: 'Win!',
                description: 'Join the live draw or watch online. Winners are announced publicly with full transparency. Your dream could be next!',
              },
            ].map((item) => (
              <motion.div key={item.step} {...fadeInUp} className="text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg shadow-forest-500/5 mb-6">
                  <item.icon className="h-8 w-8 text-forest-500" />
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => navTo('how-it-works')} className="px-8">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== RECENT WINNERS ===== */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Celebrating Our Winners
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Recent <span className="gradient-gold">Winners</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real people, real prizes. Meet the lucky members whose dreams came true.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockRecentWinners.slice(0, 6).map((winner) => (
              <motion.div key={winner.id} {...fadeInUp}>
                <Card className="card-hover border-border/50 shadow-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12 bg-gradient-to-br from-gold-400 to-gold-500">
                        <AvatarFallback className="bg-transparent text-white font-semibold text-sm">
                          {getInitials(winner.firstName, winner.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {winner.firstName} {winner.lastName}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {winner.city}, {winner.province}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gold-50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gold-600 font-medium mb-1">{winner.campaignTitle}</p>
                      <p className="text-lg font-bold text-forest-500">{formatCurrency(winner.prizeValue)}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="font-mono bg-muted px-2 py-1 rounded">{winner.ticketReference}</span>
                      <span>{formatDate(winner.wonAt)}</span>
                    </div>

                    {winner.quote && (
                      <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-3">
                        &ldquo;{winner.quote}&rdquo;
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-10">
            <Button variant="outline" size="lg" onClick={() => navTo('winners')} className="px-8">
              View All Winners
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-600 via-forest-500 to-forest-700 p-10 sm:p-16 text-center"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/10 rounded-full translate-y-1/2 -translate-x-1/3" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                Ready to <span className="text-gold-300">Win?</span>
              </h2>
              <p className="text-forest-100/80 text-lg max-w-xl mx-auto mb-8">
                Join thousands of South Africans who are already part of the JK Raffle
                community. Your next ticket could change your life forever.
              </p>
              <Button
                size="lg"
                onClick={() => navTo('login')}
                className="bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold px-10 h-13 text-base shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40 transition-all duration-300"
              >
                Join Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}