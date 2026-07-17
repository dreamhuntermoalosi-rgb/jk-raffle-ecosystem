'use client';

import { motion } from 'framer-motion';
import { mockDashboardStats, mockBranches, mockRecentWinners } from '@/mock-data';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  Shield,
  Users,
  MapPin,
  Award,
  Target,
  Eye,
  Building2,
  Globe,
  TreePine,
} from 'lucide-react';

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

export function PublicAbout() {
  const stats = mockDashboardStats;
  const totalPrizeValue = mockRecentWinners.reduce((sum, w) => sum + w.prizeValue, 0);
  const totalBranchMembers = mockBranches.reduce((sum, b) => sum + (b.memberCount || 0), 0);

  return (
    <div className="pt-16 lg:pt-18">
      {/* Hero — dark maroon gradient with generous padding */}
      <section className="relative bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 overflow-hidden">
        {/* Subtle decorative element */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <Badge className="mb-5 bg-white/10 text-gold-400 border-gold-400/20 hover:bg-white/15">
              <Building2 className="h-3 w-3 mr-1" />
              Our Story
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
              About <span className="gradient-gold">JK Raffle</span>
            </h1>
            <p className="text-lg text-maroon-200/70 leading-relaxed">
              JK Raffle Ecosystem is South Africa&apos;s premier community-driven raffle platform,
              founded on principles of transparency, fairness, and the belief that
              extraordinary opportunities should be accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-maroon-100 to-maroon-200/50 flex items-center justify-center overflow-hidden shadow-royal-md">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-maroon-500 to-maroon-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-maroon-500/20">
                      <span className="text-white font-bold text-2xl">JK</span>
                    </div>
                    <h3 className="text-2xl font-bold text-maroon-600 mb-2">FLG Empire</h3>
                    <p className="text-maroon-600/70">In Partnership with IPHC</p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-maroon-600/50">
                      <MapPin className="h-4 w-4" />
                      South Africa
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The JK Raffle Ecosystem was established by the <strong className="text-foreground">FLG Empire</strong> in
                  strategic partnership with the <strong className="text-foreground">IPHC (International Pentecostal Holiness Church)</strong> community
                  to create a trusted, transparent platform that empowers everyday South Africans
                  with the opportunity to win life-changing prizes.
                </p>
                <p>
                  Unlike conventional lotteries, JK Raffle operates through a network of
                  physical branches across all nine South African provinces. Each branch
                  is managed by an authorised Branch Manager who personally verifies members,
                  ensuring a secure and community-oriented experience.
                </p>
                <p>
                  Every draw is conducted publicly, often at community events, shopping
                  centres, or branch locations, with independent witnesses present. This
                  commitment to transparency has earned JK Raffle the trust of thousands of
                  members across the country.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Shield, label: 'Licensed & Compliant' },
                  { icon: Eye, label: 'Public Draws' },
                  { icon: Heart, label: 'Community First' },
                  { icon: Globe, label: 'All 9 Provinces' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 text-sm p-3 rounded-xl bg-white shadow-royal-sm border border-border/30">
                    <div className="w-9 h-9 rounded-lg bg-maroon-50 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-maroon-500" />
                    </div>
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              By The Numbers
            </h2>
            <p className="text-muted-foreground mt-2">Our growing impact across South Africa</p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: MapPin, label: 'Branches Nationwide', value: mockBranches.length },
              { icon: Users, label: 'Registered Members', value: totalBranchMembers },
              { icon: Award, label: 'Prizes Awarded', value: formatCurrency(totalPrizeValue) },
              { icon: Target, label: 'Tickets Sold', value: formatNumber(stats.totalTicketsSold) },
            ].map((stat) => (
              <motion.div key={stat.label} {...fadeInUp}>
                <Card className="text-center border-border/30 shadow-royal-sm rounded-xl bg-white">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-maroon-50 mb-4">
                      <stat.icon className="h-6 w-6 text-maroon-500" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-maroon-500 tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FLG Empire / IPHC */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-maroon-500 to-maroon-600 mb-6 shadow-royal-md">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                The FLG Empire &amp; IPHC Partnership
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-left">
                <p>
                  The <strong className="text-foreground">FLG Empire</strong> is a South African organisation
                  dedicated to community empowerment through innovative programmes. Founded on principles
                  of integrity, growth, and service, the FLG Empire has established a network of
                  initiatives spanning multiple sectors.
                </p>
                <p>
                  The <strong className="text-foreground">International Pentecostal Holiness Church (IPHC)</strong> is
                  one of South Africa&apos;s largest and most respected church denominations, with a
                  presence in every province and a membership numbering in the millions. The IPHC
                  community is known for its strong values of honesty, community support, and
                  collective upliftment.
                </p>
                <p>
                  Together, the FLG Empire and IPHC have created JK Raffle as a tool for community
                  enrichment — providing not just entertainment, but genuine opportunities for financial
                  transformation while maintaining the highest standards of ethical conduct and
                  regulatory compliance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team — premium avatars with maroon gradient rings */}
      <section className="py-16 lg:py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center">
            <Badge variant="secondary" className="mb-4">Leadership</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              A dedicated team of professionals ensuring every aspect of JK Raffle
              runs with excellence and integrity.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { name: 'Thabo Mokoena', role: 'Chief Executive Officer', initials: 'TM' },
              { name: 'Sarah van der Merwe', role: 'Head of Operations', initials: 'SM' },
              { name: 'David Nkosi', role: 'Branch Network Director', initials: 'DN' },
            ].map((member) => (
              <motion.div key={member.name} {...fadeInUp}>
                <Card className="card-hover border-border/30 shadow-royal-sm text-center rounded-xl bg-white">
                  <CardContent className="p-6">
                    {/* Premium avatar with maroon gradient ring */}
                    <div className="relative inline-flex items-center justify-center mb-4">
                      <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-br from-maroon-400 to-maroon-600 p-[3px] shadow-md shadow-maroon-500/15">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-maroon-500 to-maroon-700 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">{member.initials}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-base">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}