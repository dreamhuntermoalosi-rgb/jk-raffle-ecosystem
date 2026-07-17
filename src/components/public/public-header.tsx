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
        'fixed top-14 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'glass border-b border-border/40 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-forest-500 flex items-center justify-center shadow-md shadow-forest-500/20 group-hover:shadow-lg group-hover:shadow-forest-500/30 transition-shadow duration-300">
              <span className="text-white font-bold text-sm tracking-tight">JK</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold leading-tight tracking-tight text-foreground">
                JK Raffle
              </span>
              <span className="text-[10px] font-medium text-muted-foreground leading-none tracking-wider uppercase">
                Ecosystem
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  currentView === link.view
                    ? 'text-forest-500 bg-forest-50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={handleLogin}
              className="bg-forest-500 hover:bg-forest-600 text-white shadow-md shadow-forest-500/20 hover:shadow-lg hover:shadow-forest-500/30 transition-all duration-300"
            >
              Member Login
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-forest-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">JK</span>
                    </div>
                    <span className="font-semibold text-sm">JK Raffle</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link, index) => (
                    <button
                      key={link.view}
                      onClick={() => handleNav(link.view)}
                      className={cn(
                        'w-full text-left px-6 py-3 text-sm font-medium transition-colors duration-200',
                        currentView === link.view
                          ? 'text-forest-500 bg-forest-50 border-r-2 border-forest-500'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      )}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-border/50">
                  <Button
                    onClick={() => {
                      handleLogin();
                    }}
                    className="w-full bg-forest-500 hover:bg-forest-600 text-white"
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