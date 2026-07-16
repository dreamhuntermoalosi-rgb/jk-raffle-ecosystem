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
      {/* Header */}
      <section className="bg-gradient-to-b from-forest-50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="h-3 w-3 mr-1" />
              Help Centre
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to the most common questions about JK Raffle.
              Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search */}
        <motion.div {...fadeInUp} className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
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
                activeCategory === cat
                  ? 'bg-forest-500 hover:bg-forest-600 text-white'
                  : 'text-muted-foreground'
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
                  <h3 className="text-sm font-semibold text-forest-500 uppercase tracking-wider mb-3">
                    {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                )}
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border border-border/50 rounded-xl px-5 data-[state=open]:bg-muted/30 transition-colors"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
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