'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { TourStep } from './tour-data';

interface TourGuideProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

const PADDING = 8;

function getTargetRect(targetId: string): TargetRect | null {
  if (typeof document === 'undefined') return null;
  const el = document.getElementById(targetId);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
  };
}

function resolvePosition(
  preferred: 'top' | 'bottom' | 'left' | 'right' | undefined,
  target: TargetRect,
  tooltipWidth: number,
  tooltipHeight: number,
  viewportWidth: number,
  viewportHeight: number
): 'top' | 'bottom' | 'left' | 'right' {
  if (preferred) {
    const space = {
      top: target.top,
      bottom: viewportHeight - target.top - target.height,
      left: target.left,
      right: viewportWidth - target.left - target.width,
    };

    const required = {
      top: tooltipHeight + 16,
      bottom: tooltipHeight + 16,
      left: tooltipWidth + 16,
      right: tooltipWidth + 16,
    };

    if (space[preferred] >= required[preferred]) return preferred;
  }

  const space = {
    top: target.top,
    bottom: viewportHeight - target.top - target.height,
    left: target.left,
    right: viewportWidth - target.left - target.width,
  };

  const best = (Object.entries(space) as [TourStep['position'], number][]).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return best[0];
}

function getTooltipStyle(
  position: 'top' | 'bottom' | 'left' | 'right',
  target: TargetRect
): React.CSSProperties {
  const gap = 16;

  switch (position) {
    case 'top':
      return {
        bottom: window.innerHeight - target.top + gap,
        left: target.centerX,
        transform: 'translateX(-50%)',
      };
    case 'bottom':
      return {
        top: target.top + target.height + gap,
        left: target.centerX,
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        top: target.centerY,
        right: window.innerWidth - target.left + gap,
        transform: 'translateY(-50%)',
      };
    case 'right':
      return {
        top: target.centerY,
        left: target.left + target.width + gap,
        transform: 'translateY(-50%)',
      };
  }
}

export function TourGuide({
  steps,
  isOpen,
  onClose,
  currentStep,
  onNext,
  onPrev,
  onFinish,
}: TourGuideProps) {
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  // Compute resolved position as a derived value (no state needed)
  // Use estimated tooltip dimensions to avoid accessing refs during render
  const resolvedPos = useMemo<TourStep['position']>(() => {
    if (!targetRect || !step) return 'bottom';
    return resolvePosition(
      step.position,
      targetRect,
      360, // estimated tooltip width
      200, // estimated tooltip height
      window.innerWidth,
      window.innerHeight
    );
  }, [targetRect, step]);

  // Update target rect from external callbacks (ResizeObserver, scroll, resize)
  const measureTarget = useCallback(() => {
    if (!step || !isOpen) {
      setTargetRect(null);
      return;
    }
    const rect = getTargetRect(step.targetId);
    if (rect) {
      setTargetRect(rect);
    } else if (!isLast) {
      onNext();
    } else {
      onFinish();
    }
  }, [step, isOpen, isLast, onNext, onFinish]);

  // Subscribe to DOM changes: ResizeObserver, resize, scroll
  useEffect(() => {
    if (!isOpen || !step) return;

    // Use requestAnimationFrame to avoid synchronous setState in effect body
    const rafId = requestAnimationFrame(() => {
      measureTarget();
    });

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(measureTarget);
    });
    const el = document.getElementById(step.targetId);
    if (el) observer.observe(el);

    const handleResize = () => requestAnimationFrame(measureTarget);
    const handleScroll = () => requestAnimationFrame(measureTarget);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, step, currentStep, measureTarget]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && !isLast) onNext();
      if (e.key === 'ArrowLeft' && !isFirst) onPrev();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, isLast, isFirst, onClose, onNext, onPrev]);

  // Scroll target into view
  useEffect(() => {
    if (!isOpen || !step) return;
    const el = document.getElementById(step.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [isOpen, step, currentStep]);

  if (!isOpen || !step || !targetRect) return null;

  const spotlightStyle: React.CSSProperties = {
    position: 'fixed',
    top: targetRect.top - PADDING,
    left: targetRect.left - PADDING,
    width: targetRect.width + PADDING * 2,
    height: targetRect.height + PADDING * 2,
    borderRadius: '12px',
    zIndex: 9998,
    boxShadow: `0 0 0 ${Math.max(window.innerWidth, window.innerHeight) * 2}px rgba(0, 0, 0, 0.75)`,
    pointerEvents: 'none',
  };

  const tooltipStyle = getTooltipStyle(resolvedPos, targetRect);

  return createPortal(
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="tour-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9997]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Spotlight cutout around target */}
      <motion.div
        key="tour-spotlight"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={spotlightStyle}
      >
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-gold-400"
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(212, 160, 23, 0.5)',
              '0 0 0 8px rgba(212, 160, 23, 0)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        {/* Inner ring */}
        <div className="absolute inset-0 rounded-xl border border-gold-400/60" />
      </motion.div>

      {/* Tooltip card */}
      <motion.div
        key={`tour-tooltip-${currentStep}`}
        ref={tooltipRef}
        initial={{ opacity: 0, y: resolvedPos === 'top' ? 8 : -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: resolvedPos === 'top' ? -8 : 8, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={tooltipStyle}
        className="fixed z-[9999] w-[320px] sm:w-[360px]"
      >
        <div className="bg-white dark:bg-forest-900 rounded-2xl shadow-2xl shadow-black/20 border border-border/50 overflow-hidden">
          {/* Close button */}
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              aria-label="Close tour"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Step indicator + progress */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </p>
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                      i === currentStep
                        ? 'bg-gold-500 scale-110'
                        : i < currentStep
                          ? 'bg-gold-400/50'
                          : 'bg-muted-foreground/20'
                    )}
                  />
                ))}
              </div>
            </div>
            <Progress
              value={progressPercent}
              className="h-1 [&>div]:bg-gold-500"
            />
          </div>

          {/* Content */}
          <div className="px-5 pb-4 pt-2">
            <h3 className="text-base font-semibold text-foreground mb-1.5 pr-6">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Actions */}
          <div className="px-5 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isFirst && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrev}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onFinish}
                className="text-muted-foreground hover:text-foreground"
              >
                Skip
              </Button>
              <Button
                size="sm"
                onClick={isLast ? onFinish : onNext}
                className="bg-gold-500 hover:bg-gold-400 text-forest-900 font-medium shadow-sm"
              >
                {isLast ? 'Finish' : 'Next'}
                {!isLast && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}