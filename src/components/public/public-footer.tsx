'use client';

import { useAppStore } from '@/stores/app-store';
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
    <footer className="bg-maroon-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-24 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[10px] bg-white/8 flex items-center justify-center border border-gold-400/15">
                <span className="text-gold-400 font-bold text-[15px] tracking-tight">JK</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold leading-tight tracking-tight">JK Raffle</span>
                <span className="text-[9px] font-semibold text-white/30 leading-none tracking-[0.15em] uppercase">
                  Ecosystem
                </span>
              </div>
            </div>
            <p className="text-white/45 text-[13px] leading-relaxed max-w-sm mb-8">
              South Africa&apos;s premier community-driven raffle platform, proudly
              operated under the FLG Empire in partnership with IPHC. Transforming
              dreams into reality, one ticket at a time.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-[8px] bg-white/5 hover:bg-gold-400/10 border border-white/5 hover:border-gold-400/20 flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="h-3.5 w-3.5 text-white/40 group-hover:text-gold-400 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/80 mb-5 tracking-[0.14em] uppercase">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.view)}
                    className="text-[13px] text-white/40 hover:text-white transition-colors duration-250"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/80 mb-5 tracking-[0.14em] uppercase">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.view)}
                    className="text-[13px] text-white/40 hover:text-white transition-colors duration-250"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/80 mb-5 tracking-[0.14em] uppercase">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.view)}
                    className="text-[13px] text-white/40 hover:text-white transition-colors duration-250"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2.5">
              <a href="tel:+27800001234" className="flex items-center gap-2.5 text-[13px] text-white/40 hover:text-white transition-colors duration-250">
                <Phone className="h-3.5 w-3.5 text-white/30" />
                +27 80 000 1234
              </a>
              <a href="mailto:support@jkraffle.co.za" className="flex items-center gap-2.5 text-[13px] text-white/40 hover:text-white transition-colors duration-250">
                <Mail className="h-3.5 w-3.5 text-white/30" />
                support@jkraffle.co.za
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gold Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divider-gold" />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30 tracking-wide">
            &copy; {new Date().getFullYear()} JK Raffle Ecosystem. All rights reserved.
          </p>
          <p className="text-[11px] text-white/30 tracking-wide">
            A proud initiative of{' '}
            <span className="text-gold-400/80 font-medium">FLG Empire</span>
            {' '}in partnership with{' '}
            <span className="text-gold-400/80 font-medium">IPHC Community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}