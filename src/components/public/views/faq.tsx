'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockFAQ } from '@/mock-data';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const categories = ['all', ...Array.from(new Set(mockFAQ.map(f => f.category)))];

const categoryLabels: Record<string, string> = {
  all: 'All',
  general: 'General',
  legal: 'Legal & Compliance',
  tickets: 'Tickets',
  payments: 'Payments',
  draws: 'Draws',
  winners: 'Winners & Prizes',
};

export function PublicFAQ() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFAQ = useMemo(() => {
    return mockFAQ.filter((faq) => {
      const matchCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchSearch =
        search === '' ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  const groupedFAQ = useMemo(() => {
    const groups: Record<string, typeof mockFAQ> = {};
    filteredFAQ.forEach((faq) => {
      if (!groups[faq.category]) groups[faq.category] = [];
      groups[faq.category].push(faq);
    });
    return groups;
  }, [filteredFAQ]);

  return (
    <div className="pt-16 lg:pt-18">
      {/* Header — dark maroon gradient */}
      <section className="relative bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <Badge className="mb-5 bg-white/10 text-gold-400 border-gold-400/20 hover:bg-white/15">
              <HelpCircle className="h-3 w-3 mr-1" />
              Help Centre
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
              Frequently Asked <span className="gradient-gold">Questions</span>
            </h1>
            <p className="text-lg text-maroon-200/70">
              Find answers to the most common questions about JK Raffle.
              Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search */}
        <motion.div {...fadeInUp} className="mb-8 -mt-8 relative z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-11 rounded-xl bg-white shadow-royal-md border-border/30"
            />
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div {...fadeInUp} className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-[10px]',
                activeCategory === cat
                  ? 'bg-maroon-500 hover:bg-maroon-600 text-white shadow-sm'
                  : 'text-muted-foreground border-border/40 hover:bg-maroon-50 hover:text-maroon-600 hover:border-maroon-200'
              )}
            >
              {categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
              {cat !== 'all' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({mockFAQ.filter(f => f.category === cat).length})
                </span>
              )}
            </Button>
          ))}
        </motion.div>

        {/* FAQ Accordion Groups */}
        {filteredFAQ.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🤔</div>
            <h3 className="text-xl font-semibold mb-2">No matching questions</h3>
            <p className="text-muted-foreground">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFAQ).map(([category, faqs]) => (
              <motion.div key={category} {...fadeInUp}>
                {Object.keys(groupedFAQ).length > 1 && (
                  <h3 className="text-xs font-semibold text-maroon-500 uppercase tracking-widest mb-3">
                    {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                )}
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border border-border/30 rounded-xl px-5 data-[state=open]:bg-white data-[state=open]:shadow-royal-sm data-[state=open]:border-maroon-200/50 bg-white/60 transition-all duration-200"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4 text-foreground/90 [&>svg]:text-maroon-500">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}