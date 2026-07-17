'use client';

import { motion } from 'framer-motion';
import { mockRecentWinners, getRecentWinners } from '@/mock-data';
import { formatCurrency, formatDate, getInitials, getCategoryIcon } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MapPin, Trophy, Calendar, Ticket, Quote } from 'lucide-react';

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

export function PublicWinners() {
  const winners = mockRecentWinners;

  const totalWon = winners.reduce((sum, w) => sum + w.prizeValue, 0);

  return (
    <div className="pt-16 lg:pt-18">
      {/* Header — Warm gold-tinted background */}
      <section className="bg-gold-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,19,34,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-gold-400/20 text-gold-600 border-gold-400/30 hover:bg-gold-400/30 mb-5">
              <Trophy className="h-3 w-3 mr-1.5" />
              Hall of Champions
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Previous <span className="gradient-gold">Winners</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transparency and trust are at the heart of JK Raffle —
              all draws are conducted publicly with independent verification.
            </p>
          </motion.div>

          {/* Summary stats — 3 columns */}
          <motion.div {...fadeInUp} className="grid grid-cols-3 gap-4 sm:gap-10 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-maroon-500">{winners.length}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Total Winners</p>
            </div>
            <div className="text-center border-x border-border/60">
              <p className="text-3xl sm:text-4xl font-bold text-maroon-500">{formatCurrency(totalWon)}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Total Prizes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-maroon-500">9</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Provinces</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Winners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {winners.map((winner) => (
              <motion.div key={winner.id} {...fadeInUp}>
                <Card className="card-hover border-border/40 shadow-royal-sm rounded-xl overflow-hidden relative bg-white">
                  {/* Trophy badge — top-right */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center border border-gold-200/50">
                    <Trophy className="h-5 w-5 text-gold-500" />
                  </div>

                  <CardContent className="p-6">
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-4 mb-5">
                      <Avatar className="h-14 w-14 bg-gradient-to-br from-maroon-600 to-maroon-800 ring-2 ring-gold-400/40 flex-shrink-0">
                        <AvatarFallback className="bg-transparent text-white font-bold text-lg">
                          {getInitials(winner.firstName, winner.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-lg text-foreground leading-tight">
                          {winner.firstName} {winner.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{winner.city}, {winner.province}</span>
                        </p>
                      </div>
                    </div>

                    {/* Prize Details — luxury section */}
                    <div className="bg-maroon-50/80 rounded-lg p-4 mb-4">
                      <p className="text-xs text-maroon-600/70 font-medium mb-1 uppercase tracking-wider">
                        Prize Won
                      </p>
                      <p className="text-sm text-maroon-700 font-medium mb-2.5">{winner.campaignTitle}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-maroon-500">{formatCurrency(winner.prizeValue)}</p>
                        <span className="text-2xl">
                          {winner.prizeName.toLowerCase().includes('cash') ? '💰' :
                           winner.prizeName.toLowerCase().includes('car') || winner.prizeName.toLowerCase().includes('mercedes') ? '🚗' :
                           winner.prizeName.toLowerCase().includes('apartment') || winner.prizeName.toLowerCase().includes('house') ? '🏠' :
                           winner.prizeName.toLowerCase().includes('holiday') || winner.prizeName.toLowerCase().includes('zanzibar') ? '✈️' :
                           winner.prizeName.toLowerCase().includes('camera') || winner.prizeName.toLowerCase().includes('sony') ? '💻' : '🎁'}
                        </span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Ticket className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                          {winner.ticketReference}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{formatDate(winner.wonAt)}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    {winner.quote && (
                      <div className="relative rounded-lg p-3.5 bg-muted/40">
                        <Quote className="h-4 w-4 text-gold-400/40 mb-1.5" />
                        <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-4">
                          &ldquo;{winner.quote}&rdquo;
                        </p>
                      </div>
                    )}
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