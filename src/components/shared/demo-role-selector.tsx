'use client';

import { useAppStore } from '@/stores/app-store';
import type { Portal } from '@/types';
import { X, User, Building2, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ============================================
// Demo Role Selector — Types & Config
// ============================================

interface DemoRoleSelectorProps {
  open: boolean;
  onClose: () => void;
}

interface RoleCard {
  id: Portal;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentClass: string;
  iconBgClass: string;
  iconTextClass: string;
  glowColor: string;
  buttonBgClass: string;
  buttonHoverClass: string;
  buttonTextClass: string;
  borderAccentClass: string;
}

const roles: RoleCard[] = [
  {
    id: 'member',
    icon: <User className="h-7 w-7" />,
    title: 'Member Portal',
    description:
      'Purchase tickets, track winnings, manage your profile. Experience the member journey.',
    accentClass: 'text-gold-400',
    iconBgClass: 'bg-gold-500/15',
    iconTextClass: 'text-gold-400',
    glowColor: 'rgba(212, 160, 23, 0.25)',
    buttonBgClass: 'bg-gold-500 hover:bg-gold-400',
    buttonHoverClass: 'hover:shadow-gold-500/30',
    buttonTextClass: 'text-forest-900',
    borderAccentClass: 'border-gold-500/30',
  },
  {
    id: 'manager',
    icon: <Building2 className="h-7 w-7" />,
    title: 'Branch Manager',
    description:
      'Manage branch members, view reports, track campaign performance for your branch.',
    accentClass: 'text-forest-400',
    iconBgClass: 'bg-forest-400/15',
    iconTextClass: 'text-forest-400',
    glowColor: 'rgba(74, 222, 128, 0.2)',
    buttonBgClass: 'bg-forest-500 hover:bg-forest-600',
    buttonHoverClass: 'hover:shadow-forest-500/30',
    buttonTextClass: 'text-white',
    borderAccentClass: 'border-forest-400/30',
  },
  {
    id: 'admin',
    icon: <Shield className="h-7 w-7" />,
    title: 'Admin Panel',
    description:
      'Full platform control: campaigns, products, branches, payments, users, and settings.',
    accentClass: 'text-red-400',
    iconBgClass: 'bg-red-500/15',
    iconTextClass: 'text-red-400',
    glowColor: 'rgba(248, 113, 113, 0.2)',
    buttonBgClass: 'bg-red-600 hover:bg-red-500',
    buttonHoverClass: 'hover:shadow-red-500/30',
    buttonTextClass: 'text-white',
    borderAccentClass: 'border-red-500/30',
  },
];

// ============================================
// Animation Variants
// ============================================

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.15 + i * 0.1,
    },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.15 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.05 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

// ============================================
// Component
// ============================================

export function DemoRoleSelector({ open, onClose }: DemoRoleSelectorProps) {
  const { setPortal, setView, login } = useAppStore();

  const handleSelectRole = (role: RoleCard) => {
    onClose();
    // Small delay to let the overlay close first
    setTimeout(() => {
      setPortal(role.id);
      setView('dashboard');
    }, 300);
  };

  // Escape key to close
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="demo-role-selector"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950"
            aria-hidden="true"
            onClick={onClose}
          >
            {/* Subtle radial gradient accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(212,160,23,0.08)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(22,101,52,0.15)_0%,transparent_50%)]" />
            {/* Fine dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={contentVariants}
            className="relative z-10 w-full max-w-5xl mx-4 sm:mx-6"
          >
            {/* Close button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl text-forest-300/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close role selector"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Header */}
            <motion.div variants={headerVariants} className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-5">
                <Sparkles className="h-4 w-4 text-gold-400" />
                <span className="text-xs font-medium text-gold-300 tracking-wide uppercase">
                  Interactive Preview
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                Experience the Dashboard
              </h2>
              <p className="text-base sm:text-lg text-forest-200/60 max-w-xl mx-auto leading-relaxed">
                Choose a role to explore their dedicated portal
              </p>
            </motion.div>

            {/* Role Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectRole(role)}
                    className={cn(
                      'group relative w-full text-left rounded-2xl border',
                      'bg-white/[0.04] backdrop-blur-sm',
                      'p-6 sm:p-7 transition-all duration-300',
                      'hover:bg-white/[0.08] hover:border-opacity-60',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400',
                      role.borderAccentClass
                    )}
                    style={
                      {
                        '--tour-glow': role.glowColor,
                      } as React.CSSProperties
                    }
                    aria-label={`Enter ${role.title}`}
                  >
                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow: `0 0 40px 4px ${role.glowColor}, inset 0 0 40px 0 ${role.glowColor}`,
                      }}
                    />

                    {/* Icon */}
                    <div
                      className={cn(
                        'relative inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110',
                        role.iconBgClass
                      )}
                    >
                      <span className={role.iconTextClass}>{role.icon}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        'relative text-lg font-semibold mb-2.5 transition-colors duration-300',
                        'text-white group-hover:' + role.accentClass.replace('text-', 'text-')
                      )}
                    >
                      {role.title}
                    </h3>

                    {/* Description */}
                    <p className="relative text-sm text-forest-200/50 leading-relaxed mb-6 group-hover:text-forest-200/70 transition-colors duration-300">
                      {role.description}
                    </p>

                    {/* CTA */}
                    <div className="relative flex items-center gap-2 text-sm font-medium">
                      <span
                        className={cn(
                          'transition-colors duration-300',
                          role.accentClass
                        )}
                      >
                        Enter Dashboard
                      </span>
                      <ArrowRight
                        className={cn(
                          'h-4 w-4 transition-transform duration-300 group-hover:translate-x-1',
                          role.accentClass
                        )}
                      />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Footer hint */}
            <motion.p
              variants={headerVariants}
              className="text-center text-xs text-forest-200/30 mt-8 sm:mt-10"
            >
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-forest-200/50 font-mono text-[10px]">Esc</kbd> to close
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}