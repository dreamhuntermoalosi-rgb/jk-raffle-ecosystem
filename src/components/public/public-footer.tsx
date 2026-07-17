'use client';

import { useAppStore } from '@/stores/app-store';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const platformLinks = [
  { label: 'Home', view: 'home' },
  { label: 'Campaigns', view: 'campaigns' },
  { label: 'Winners', view: 'winners' },
  { label: 'How It Works', view: 'how-it-works' },
  { label: 'About Us', view: 'about' },
];

const legalLinks = [
  { label: 'Privacy Policy', view: 'privacy' },
  { label: 'Terms of Service', view: 'terms' },
  { label: 'Cookie Policy', view: 'privacy' },
  { label: 'Compliance', view: 'terms' },
];

const supportLinks = [
  { label: 'FAQ', view: 'faq' },
  { label: 'Contact Us', view: 'contact' },
  { label: 'Support Centre', view: 'contact' },
  { label: 'Report an Issue', view: 'contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function PublicFooter() {
  const { setView } = useAppStore();

  const handleNav = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JK</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold leading-tight">JK Raffle</span>
                <span className="text-[10px] font-medium text-forest-300/60 leading-none tracking-wider uppercase">
                  Ecosystem
                </span>
              </div>
            </div>
            <p className="text-forest-300/70 text-sm leading-relaxed max-w-sm mb-6">
              South Africa&apos;s premier community-driven raffle platform, proudly
              operated under the FLG Empire in partnership with IPHC. Transforming
              dreams into reality, one ticket at a time.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
                >
                  <social.icon className="h-4 w-4 text-forest-300/70 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.view)}
                    className="text-sm text-forest-300/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.view)}
                    className="text-sm text-forest-300/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.view)}
                    className="text-sm text-forest-300/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2">
              <a href="tel:+27800001234" className="flex items-center gap-2 text-sm text-forest-300/70 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5" />
                +27 80 000 1234
              </a>
              <a href="mailto:support@jkraffle.co.za" className="flex items-center gap-2 text-sm text-forest-300/70 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5" />
                support@jkraffle.co.za
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-forest-300/50">
            &copy; {new Date().getFullYear()} JK Raffle Ecosystem. All rights reserved.
          </p>
          <p className="text-xs text-forest-300/50">
            A proud initiative of{' '}
            <span className="text-gold-400 font-medium">FLG Empire</span>
            {' '}in partnership with{' '}
            <span className="text-gold-400 font-medium">IPHC Community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}