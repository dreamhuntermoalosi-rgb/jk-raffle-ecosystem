'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { mockCurrentUser } from '@/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import {
  LogIn,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  ArrowRight,
  Lock,
  KeyRound,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export function PublicLogin() {
  const { login, setPortal, setView } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(mockCurrentUser);
      setPortal('member');
      setLoading(false);
      toast.success('Welcome back, James!');
    }, 1200);
  };

  return (
    <div className="pt-16 lg:pt-18 min-h-[calc(100vh-4.5rem)] flex items-center relative overflow-hidden">
      {/* Subtle maroon gradient background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-50 via-background to-maroon-50/30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-maroon-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-maroon-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 relative z-10">
        <div className="max-w-md mx-auto">
          <motion.div {...fadeInUp}>
            {/* Logo — maroon */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-maroon-500 to-maroon-600 flex items-center justify-center mx-auto mb-5 shadow-royal-lg">
                <span className="text-white font-bold text-xl">JK</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">Member Login</h1>
              <p className="text-sm text-muted-foreground">
                Access your JK Raffle member portal
              </p>
            </div>

            {/* Card — shadow-royal-lg, rounded-2xl */}
            <Card className="border-border/30 shadow-royal-lg rounded-2xl overflow-hidden bg-white">
              {/* Important Notice */}
              <div className="bg-gold-50 border-b border-gold-200/50 px-6 py-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gold-700 mb-1">
                      Important Notice
                    </p>
                    <p className="text-xs text-gold-600/80 leading-relaxed">
                      Accounts are created exclusively by authorised Branch Managers.
                      Self-registration is not available. If you&apos;d like to join,
                      please visit your nearest JK Raffle branch.
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.co.za"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 rounded-lg border-border/50 focus-visible:ring-maroon-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        className="text-xs text-muted-foreground hover:text-maroon-500 transition-colors"
                        onClick={() => toast.info('Password reset link sent to your email.')}
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11 pr-10 rounded-lg border-border/50 focus-visible:ring-maroon-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-maroon-500 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Login button — maroon-500, rounded-[10px] */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-maroon-500 hover:bg-maroon-600 text-white h-11 font-medium rounded-[10px] shadow-sm shadow-maroon-500/20"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </span>
                    )}
                  </Button>
                </form>

                <Separator className="my-6" />

                {/* 2FA Placeholder */}
                <div className="bg-maroon-50/50 rounded-lg p-4 border border-maroon-100/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-maroon-100/60 flex items-center justify-center shrink-0">
                      <KeyRound className="h-4 w-4 text-maroon-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-0.5">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">
                        If you have 2FA enabled, you&apos;ll be prompted for a verification code
                        after signing in.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security notice */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              <span>Protected by industry-standard encryption</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}