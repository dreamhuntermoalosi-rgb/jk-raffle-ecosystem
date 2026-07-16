'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  UserPlus,
  Search,
  ShoppingCart,
  CreditCard,
  PartyPopper,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true, margin: '-40px' },
};

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Account Creation by Branch Manager',
    description:
      'Visit your nearest JK Raffle branch and meet with an authorised Branch Manager. They will verify your identity, create your account, and provide you with login credentials. All registrations are done in person to ensure security and prevent fraud.',
    details: ['Valid South African ID required', 'In-person verification at branch', 'Account activated within 24 hours'],
  },
  {
    number: '02',
    icon: Search,
    title: 'Browse Active Campaigns',
    description:
      'Once registered, log in to your member portal and explore all active raffle campaigns. Filter by category — houses, vehicles, electronics, cash prizes, or vacation packages. Each campaign shows the prize value, ticket price, and draw date.',
    details: ['Browse across all 9 provinces', 'Filter by prize category', 'View detailed prize information'],
  },
  {
    number: '03',
    icon: ShoppingCart,
    title: 'Purchase Tickets',
    description:
      'Select the campaigns that excite you and add tickets to your cart. You can purchase multiple tickets for the same campaign to increase your chances. Each ticket receives a unique reference number (e.g., JKR-XXX-NNN) for tracking.',
    details: ['Buy single or multiple tickets', 'Unique ticket references', 'Shopping cart for easy checkout'],
  },
  {
    number: '04',
    icon: CreditCard,
    title: 'Payment & Verification',
    description:
      'Complete your purchase using our secure payment methods including credit/debit card or EFT (Electronic Funds Transfer). Payments are processed through trusted South African gateways. You\'ll receive an instant confirmation and digital receipt via email and in-app notification.',
    details: ['Credit card, debit card, or EFT', 'Secure payment gateway', 'Instant digital receipt'],
  },
  {
    number: '05',
    icon: PartyPopper,
    title: 'Draw Day & Winner Announcement',
    description:
      'On the scheduled draw date, a public draw is conducted — often at community events, shopping centres, or branch locations with independent witnesses present. The winning ticket is selected randomly using verified methods, and the winner is announced publicly and contacted directly.',
    details: ['Public draws with witnesses', 'Random, verified selection', 'Winner announced on the spot'],
  },
];

export function PublicHowItWorks() {
  const { setView } = useAppStore();

  return (
    <div className="pt-16 lg:pt-18">
      {/* Header */}
      <section className="bg-gradient-to-b from-forest-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Step by Step
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              How It <span className="gradient-text">Works</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From registration to winning — here&apos;s everything you need to know
              about participating in JK Raffle campaigns. Our process is designed
              to be simple, secure, and fully transparent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div key={step.number} {...fadeInUp}>
                <Card className="border-border/50 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left: Number + Icon */}
                      <div className="flex items-center gap-4 p-6 lg:p-8 lg:w-56 shrink-0">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-forest-50 flex items-center justify-center">
                            <step.icon className="h-6 w-6 text-forest-500" />
                          </div>
                          <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-forest-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                            {step.number}
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div className="hidden lg:block absolute left-[72px] top-[88px] w-0.5 h-[calc(100%-48px)] bg-forest-100" />
                        )}
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 p-6 lg:py-8 lg:pr-8 lg:pl-0 border-t lg:border-t-0 lg:border-l border-border/50">
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                          {step.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {step.details.map((detail) => (
                            <span
                              key={detail}
                              className="inline-flex items-center gap-1.5 text-xs text-forest-600 bg-forest-50 px-2.5 py-1 rounded-full font-medium"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connector line for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-0.5 h-6 bg-forest-100 rounded-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 lg:py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Why Trust JK Raffle?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built on a foundation of transparency and community trust.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Shield,
                title: 'Licensed & Regulated',
                description: 'Fully compliant with South African gaming and consumer protection regulations.',
              },
              {
                icon: MapPin,
                title: 'Physical Branches',
                description: '20 branches across 9 provinces with face-to-face service and verification.',
              },
              {
                icon: Clock,
                title: 'Prompt Payouts',
                description: 'Winners receive their prizes within 14 business days of verification.',
              },
              {
                icon: CheckCircle2,
                title: 'Public Transparency',
                description: 'All draws are public with independent witnesses and full audit trails.',
              },
            ].map((item) => (
              <motion.div key={item.title} {...fadeInUp}>
                <Card className="card-hover border-border/50 shadow-sm text-center h-full">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-forest-50 mb-4">
                      <item.icon className="h-6 w-6 text-forest-500" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Check out our frequently asked questions for detailed answers about
              everything from ticket purchasing to prize claims.
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setView('faq');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8"
            >
              Visit FAQ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}