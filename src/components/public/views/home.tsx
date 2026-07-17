'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { Play } from 'lucide-react';
import { getFeaturedCampaigns, getRecentWinners, mockDashboardStats, mockRecentWinners } from '@/mock-data';
import { formatCurrency, formatCountdown, formatDate, formatNumber, getCategoryIcon, getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  const { setView, setDemoOpen } = useAppStore();
  const featuredCampaigns = getFeaturedCampaigns();
  const recentWinners = getRecentWinners();
  const stats = mockDashboardStats;
  const heroCampaign = featuredCampaigns[0];
  const heroCountdownTarget = heroCampaign?.drawDate || '2025-09-15T18:00:00Z';
  const [countdown, setCountdown] = useState(formatCountdown(heroCountdownTarget));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown(heroCountdownTarget));
    }, 1000);
    return () => clearInterval(interval);
  }, [heroCountdownTarget]);

  const totalPrizeValue = mockRecentWinners.reduce((sum, w) => sum + w.prizeValue, 0);

  const navTo = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroProgress = heroCampaign ? Math.round((heroCampaign.soldTickets / heroCampaign.maxTickets) * 100) : 0;
  const heroRemaining = heroCampaign ? heroCampaign.maxTickets - heroCampaign.soldTickets : 0;

  return (
    <div className="pt-16 lg:pt-18">
      {/* ===== HERO SECTION — Cinematic & Luxurious ===== */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-maroon-900">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900 via-maroon-700 to-maroon-800" />

        {/* Luxury dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        {/* Geometric line overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(30deg, transparent 49%, rgba(212,175,55,0.15) 49%, rgba(212,175,55,0.15) 51%, transparent 51%),
                           linear-gradient(-30deg, transparent 49%, rgba(212,175,55,0.15) 49%, rgba(212,175,55,0.15) 51%, transparent 51%)`,
          backgroundSize: '80px 140px'
        }} />

        {/* Floating gradient orbs for depth */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-maroon-600 opacity-[0.06] blur-[120px]" />
        <div className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] rounded-full bg-gold-400 opacity-[0.04] blur-[140px]" />
        <div className="absolute top-[50%] left-[40%] w-[300px] h-[300px] rounded-full bg-maroon-500 opacity-[0.05] blur-[100px]" />
        <div className="absolute top-[20%] right-[25%] w-[200px] h-[200px] rounded-full bg-gold-400 opacity-[0.03] blur-[80px]" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            {/* Left: Hero text content (3 cols) */}
            <div className="lg:col-span-3 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <Badge className="bg-gold-400/10 text-gold-300 border-gold-400/20 hover:bg-gold-400/15 mb-8 px-4 py-1.5 text-sm font-medium">
                  <Gift className="h-3.5 w-3.5 mr-1.5" />
                  FLG Empire &bull; IPHC Community Initiative
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6"
              >
                Your Next Home Could Be{' '}
                <span className="gradient-gold">One Ticket Away</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                className="text-lg sm:text-xl text-maroon-200/80 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 text-balance"
              >
                South Africa&apos;s premier community-driven raffle platform. Win incredible
                prizes from houses to holidays — powered by the FLG Empire in
                partnership with IPHC.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-5"
              >
                <Button
                  size="lg"
                  onClick={() => navTo('campaigns')}
                  className="bg-gold-400 hover:bg-gold-300 text-maroon-950 font-semibold px-8 h-12 text-base rounded-[10px] shadow-gold-sm hover:shadow-gold-md transition-all duration-300 btn-premium"
                >
                  Browse Campaigns
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navTo('login')}
                  className="border-white/20 text-white/90 hover:bg-white/10 hover:text-white px-8 h-12 text-base rounded-[10px]"
                >
                  Member Login
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => setDemoOpen(true)}
                  className="bg-gold-400 hover:bg-gold-300 text-maroon-950 font-semibold px-8 h-12 text-base rounded-[10px] shadow-gold-sm hover:shadow-gold-md transition-all duration-300 pulse-glow"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Check Demo
                </Button>
              </motion.div>
            </div>

            {/* Right: Floating Campaign Summary Card (2 cols) */}
            <div className="lg:col-span-2 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                className="animate-float"
              >
                <div className="glass-card rounded-xl p-6 shadow-royal-lg">
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-maroon-500/20 text-maroon-300 border-maroon-500/30 text-xs font-medium">
                      Featured Campaign
                    </Badge>
                    <div className="flex items-center gap-1.5 text-gold-400">
                      <Trophy className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">Live</span>
                    </div>
                  </div>

                  {/* Campaign title */}
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                    {heroCampaign?.title || 'Featured Campaign'}
                  </h3>
                  <p className="text-maroon-300/60 text-xs mb-5 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {heroCampaign?.branch.name || 'South Africa'}
                  </p>

                  {/* Prize value — large gold */}
                  <div className="mb-5">
                    <p className="text-[10px] text-maroon-300/50 uppercase tracking-widest font-medium mb-1">
                      Prize Value
                    </p>
                    <p className="text-3xl font-bold text-gold-400 tracking-tight">
                      {formatCurrency(heroCampaign?.product.value || 0)}
                    </p>
                  </div>

                  {/* Tickets remaining */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-maroon-200/60">Tickets Remaining</span>
                    <span className="text-xs font-semibold text-white">
                      {formatNumber(heroRemaining)}
                    </span>
                  </div>

                  {/* Gold progress bar */}
                  <div className="mb-5">
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${heroProgress}%`,
                          background: 'linear-gradient(90deg, #D4AF37, #f7d064)',
                          transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-maroon-300/40">{heroProgress}% sold</span>
                      <span className="text-[10px] text-maroon-300/40">{formatNumber(heroCampaign?.soldTickets || 0)} tickets</span>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[10px] text-gold-400/70 uppercase tracking-widest font-medium mb-3">
                      Draw Countdown
                    </p>
                    {countdown.expired ? (
                      <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gold-400/10 border border-gold-400/20">
                        <Trophy className="w-4 h-4 text-gold-400" />
                        <span className="text-gold-300 font-semibold text-sm">Draw Complete!</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        {[
                          { label: 'Days', value: countdown.days },
                          { label: 'Hrs', value: countdown.hours },
                          { label: 'Min', value: countdown.minutes },
                          { label: 'Sec', value: countdown.seconds },
                        ].map((unit) => (
                          <div key={unit.label} className="flex flex-col items-center">
                            <div className="w-14 h-14 rounded-lg bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
                              <span className="text-xl font-bold text-white tabular-nums">
                                {String(unit.value).padStart(2, '0')}
                              </span>
                            </div>
                            <span className="text-[9px] text-gold-400/60 mt-1.5 uppercase tracking-wider font-medium">
                              {unit.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile: Floating card below hero text */}
          <div className="lg:hidden mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            >
              <div className="glass-card rounded-xl p-5 shadow-royal-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-maroon-500/20 text-maroon-300 border-maroon-500/30 text-xs font-medium">
                    Featured
                  </Badge>
                  <div className="flex items-center gap-1.5 text-gold-400">
                    <Trophy className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Live</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-0.5 line-clamp-1">
                  {heroCampaign?.title || 'Featured Campaign'}
                </h3>
                <p className="text-2xl font-bold text-gold-400 tracking-tight mb-3">
                  {formatCurrency(heroCampaign?.product.value || 0)}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-maroon-200/60">Tickets Remaining</span>
                  <span className="text-xs font-semibold text-white">{formatNumber(heroRemaining)}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${heroProgress}%`,
                      background: 'linear-gradient(90deg, #D4AF37, #f7d064)',
                      transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                </div>
                {countdown.expired ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gold-400/10 border border-gold-400/20">
                    <Trophy className="w-4 h-4 text-gold-400" />
                    <span className="text-gold-300 font-semibold text-sm">Draw Complete!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    {[
                      { label: 'Days', value: countdown.days },
                      { label: 'Hrs', value: countdown.hours },
                      { label: 'Min', value: countdown.minutes },
                      { label: 'Sec', value: countdown.seconds },
                    ].map((unit) => (
                      <div key={unit.label} className="flex flex-col items-center">
                        <div className="w-14 h-12 rounded-lg bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
                          <span className="text-lg font-bold text-white tabular-nums">
                            {String(unit.value).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-[9px] text-gold-400/60 mt-1 uppercase tracking-wider font-medium">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative -mt-6 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="rounded-xl bg-maroon-50 border border-maroon-100/60 p-6 sm:p-8 shadow-royal-lg"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { icon: Trophy, label: 'Total Winners', value: stats.totalWinners, format: true },
                { icon: Gift, label: 'Total Prize Value', value: totalPrizeValue, currency: true },
                { icon: Zap, label: 'Active Campaigns', value: stats.activeCampaigns, format: true },
                { icon: Users, label: 'Members', value: stats.totalMembers, format: true },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-maroon-500/10 mb-3">
                    <stat.icon className="h-5 w-5 text-maroon-500" />
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
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <Badge variant="secondary" className="mb-4 text-xs font-medium">Featured Prizes</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Current <span className="gradient-gold">Campaigns</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our featured raffle campaigns and stand a chance to win life-changing prizes.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {featuredCampaigns.slice(0, 3).map((campaign) => {
              const progress = Math.round((campaign.soldTickets / campaign.maxTickets) * 100);
              const remaining = campaign.maxTickets - campaign.soldTickets;
              return (
                <motion.div key={campaign.id} {...fadeInUp}>
                  <Card className="card-hover overflow-hidden border-border/40 shadow-royal-sm rounded-xl bg-card">
                    {/* Dark maroon gradient image area */}
                    <div className="relative h-52 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-700 flex items-center justify-center overflow-hidden">
                      {/* Subtle pattern */}
                      <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                      }} />
                      <span className="text-6xl relative z-10 drop-shadow-lg">
                        {getCategoryIcon(campaign.product.category)}
                      </span>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-maroon-500 text-white text-xs font-medium">
                          {campaign.product.category.charAt(0).toUpperCase() + campaign.product.category.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 text-maroon-700 text-xs backdrop-blur-sm font-medium">
                          <MapPin className="h-3 w-3 mr-1" />
                          {campaign.branch.name}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="font-semibold text-base mb-1 line-clamp-1">{campaign.title}</h3>
                      <p className="text-2xl font-bold text-gold-400 mb-4 tracking-tight">
                        {formatCurrency(campaign.product.value)}
                      </p>

                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{progress}% sold</span>
                        </div>
                        {/* Gold-to-maroon progress bar */}
                        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${progress}%`,
                              background: 'linear-gradient(90deg, #D4AF37, #5B1322)',
                              transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tickets remaining</span>
                          <span className="font-medium text-gold-400">{formatNumber(remaining)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Draw date</span>
                          <span className="font-medium text-foreground">{formatDate(campaign.drawDate)}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="px-5 pb-5 pt-0">
                      <Button
                        className="w-full bg-maroon-500 hover:bg-maroon-600 text-white rounded-[10px] font-medium"
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

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navTo('campaigns')}
              className="px-8 rounded-[10px] border-maroon-200 text-maroon-500 hover:bg-maroon-50"
            >
              View All Campaigns
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#F4F4F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-xs font-medium">Simple Process</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              How It <span className="gradient-gold">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is easy. Just three simple steps to enter our raffles.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16"
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
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-xl bg-white shadow-royal-md mb-7">
                  <item.icon className="h-8 w-8 text-maroon-500" />
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-400 text-maroon-950 text-xs font-bold flex items-center justify-center shadow-sm">
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

          <motion.div {...fadeInUp} className="text-center mt-14">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navTo('how-it-works')}
              className="px-8 rounded-[10px] border-maroon-200 text-maroon-500 hover:bg-maroon-50"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== RECENT WINNERS ===== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-xs font-medium">
              <Star className="h-3 w-3 mr-1" />
              Celebrating Our Winners
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
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
                <Card className="card-hover border-border/40 shadow-royal-sm rounded-xl overflow-hidden bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-5">
                      <Avatar className="h-12 w-12 bg-gradient-to-br from-maroon-500 to-maroon-700 shadow-sm">
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

                    <div className="bg-maroon-50/60 rounded-lg p-3.5 mb-4 border border-maroon-100/40">
                      <p className="text-xs text-maroon-500/70 font-medium mb-0.5">{winner.campaignTitle}</p>
                      <p className="text-xl font-bold text-gold-400 tracking-tight">{formatCurrency(winner.prizeValue)}</p>
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

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navTo('winners')}
              className="px-8 rounded-[10px] border-maroon-200 text-maroon-500 hover:bg-maroon-50"
            >
              View All Winners
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-br from-maroon-800 via-maroon-900 to-maroon-800">
        {/* Luxury pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        {/* Geometric lines */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(45deg, transparent 49%, rgba(212,175,55,0.2) 49%, rgba(212,175,55,0.2) 51%, transparent 51%)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Gold accent decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute top-[15%] right-[8%] w-[300px] h-[300px] rounded-full bg-gold-400 opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-gold-400 opacity-[0.025] blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Decorative gold line above headline */}
            <div className="divider-gold w-16 mx-auto mb-8" />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
              Ready to Change Your <span className="text-gold-400">Future?</span>
            </h2>
            <p className="text-maroon-200/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of South Africans who are already part of the JK Raffle
              community. Your next ticket could change your life forever.
            </p>
            <Button
              size="lg"
              onClick={() => navTo('login')}
              className="bg-gold-400 hover:bg-gold-300 text-maroon-950 font-semibold px-10 h-13 text-base rounded-[10px] shadow-gold-md hover:shadow-gold-md transition-all duration-300 btn-premium"
            >
              Join Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}