'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/stores/app-store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', view: 'home' },
  { label: 'Campaigns', view: 'campaigns' },
  { label: 'Winners', view: 'winners' },
  { label: 'How It Works', view: 'how-it-works' },
  { label: 'About', view: 'about' },
  { label: 'FAQ', view: 'faq' },
  { label: 'Contact', view: 'contact' },
];

export function PublicHeader() {
  const { currentView, setView, setPortal } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: string) => {
    setView(view);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setView('login');
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'fixed top-14 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'shadow-royal-sm'
          : 'bg-transparent'
      )}
      style={
        scrolled
          ? {
              background: 'rgba(250, 249, 247, 0.88)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderBottom: '1px solid rgba(91, 19, 34, 0.08)',
            }
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-[10px] bg-maroon-800 flex items-center justify-center shadow-royal-sm group-hover:shadow-royal-md transition-shadow duration-300 border border-gold-400/20">
              <span className="text-gold-400 font-bold text-[15px] tracking-tight">JK</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold leading-tight tracking-tight text-foreground">
                JK Raffle
              </span>
              <span className="text-[9px] font-semibold text-muted-foreground/70 leading-none tracking-[0.15em] uppercase">
                Ecosystem
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={cn(
                  'relative px-3.5 py-2 rounded-[8px] text-[13px] font-medium transition-all duration-250',
                  currentView === link.view
                    ? 'text-maroon-700 dark:text-maroon-300'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
                {currentView === link.view && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-maroon-600 dark:bg-gold-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={handleLogin}
              className="bg-maroon-600 hover:bg-maroon-700 dark:bg-maroon-500 dark:hover:bg-maroon-600 text-white rounded-[10px] border border-gold-400/15 hover:border-gold-400/30 shadow-royal-sm hover:shadow-royal-md transition-all duration-300 text-[13px] font-medium px-5 h-9"
            >
              Member Login
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground rounded-[8px]">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 bg-background border-l border-border/60">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[8px] bg-maroon-800 flex items-center justify-center border border-gold-400/20">
                      <span className="text-gold-400 font-bold text-xs">JK</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm leading-tight">JK Raffle</span>
                      <span className="text-[9px] font-semibold text-muted-foreground/60 leading-none tracking-[0.12em] uppercase">Ecosystem</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-[8px] text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
                  {navLinks.map((link) => (
                    <button
                      key={link.view}
                      onClick={() => handleNav(link.view)}
                      className={cn(
                        'w-full text-left px-5 py-3 text-[13px] font-medium transition-all duration-200 relative',
                        currentView === link.view
                          ? 'text-maroon-700 dark:text-gold-400 bg-maroon-50/60 dark:bg-maroon-950/50'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {currentView === link.view && (
                          <span className="w-[3px] h-4 rounded-full bg-maroon-600 dark:bg-gold-400 flex-shrink-0" />
                        )}
                        <span className={currentView === link.view ? '' : 'ml-[15px]'}>
                          {link.label}
                        </span>
                      </span>
                    </button>
                  ))}
                </nav>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-border/50">
                  <Button
                    onClick={() => {
                      handleLogin();
                    }}
                    className="w-full bg-maroon-600 hover:bg-maroon-700 dark:bg-maroon-500 dark:hover:bg-maroon-600 text-white rounded-[10px] border border-gold-400/15 text-[13px] font-medium h-10"
                  >
                    Member Login
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}