'use client';

import { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Smartphone,
  Mail,
  MessageCircle,
  Globe,
  Monitor,
  Check,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn, getInitials, formatDate } from '@/lib/utils';
import { mockCurrentUser, mockBranches } from '@/mock-data';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  occupation: z.string().min(2, 'Occupation is required'),
  biography: z.string().max(500, 'Biography must be under 500 characters').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const mockSessions = [
  { id: '1', device: 'Chrome on Windows', ip: '196.21.45.112', location: 'Sandton, Gauteng', date: '2025-06-12T07:45:00Z', current: true },
  { id: '2', device: 'Safari on iPhone 15', ip: '41.58.23.89', location: 'Sandton, Gauteng', date: '2025-06-11T18:30:00Z', current: false },
  { id: '3', device: 'Firefox on MacOS', ip: '165.90.12.44', location: 'Cape Town, Western Cape', date: '2025-06-08T10:15:00Z', current: false },
];

export function MemberProfile() {
  const user = mockCurrentUser;
  const branch = mockBranches.find(b => b.id === user.branchId);
  const initials = getInitials(user.firstName, user.lastName);

  const [notifPrefs, setNotifPrefs] = useState({
    inApp: true,
    whatsapp: true,
    sms: true,
    email: true,
    push: false,
    marketing: true,
  });
  const [twoFactor, setTwoFactor] = useState(user.twoFactorEnabled);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
      occupation: user.occupation || '',
      biography: user.biography || '',
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    toast.success('Profile updated successfully');
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    toast.success('Password changed successfully');
    passwordForm.reset();
  }

  const togglePref = (key: keyof typeof notifPrefs) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Notification preference updated');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-royal-sm rounded-xl bg-white overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-maroon-500 to-maroon-700 p-[3px]">
                <Avatar className="h-full w-full bg-maroon-500 text-white text-2xl rounded-full">
                  <AvatarFallback className="text-2xl font-bold bg-white text-maroon-600 rounded-full">{initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">{user.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge className="bg-maroon-50 text-maroon-600 capitalize rounded-md border-0">
                  {user.role.replace('_', ' ')}
                </Badge>
                {branch && (
                  <Badge variant="outline" className="text-xs rounded-md">
                    {branch.name}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Member since {formatDate(user.createdAt, 'long')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
            <User className="h-4 w-4 text-maroon-500" />
            Edit Profile
          </CardTitle>
          <CardDescription className="text-xs">Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-xs">First Name</Label>
                <Input
                  id="firstName"
                  {...profileForm.register('firstName')}
                  className="mt-1.5 rounded-lg"
                />
                {profileForm.formState.errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{profileForm.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs">Last Name</Label>
                <Input
                  id="lastName"
                  {...profileForm.register('lastName')}
                  className="mt-1.5 rounded-lg"
                />
                {profileForm.formState.errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{profileForm.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                <Input
                  id="phone"
                  {...profileForm.register('phone')}
                  className="mt-1.5 rounded-lg"
                />
                {profileForm.formState.errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{profileForm.formState.errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="occupation" className="text-xs">Occupation</Label>
                <Input
                  id="occupation"
                  {...profileForm.register('occupation')}
                  className="mt-1.5 rounded-lg"
                />
                {profileForm.formState.errors.occupation && (
                  <p className="text-xs text-red-500 mt-1">{profileForm.formState.errors.occupation.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="biography" className="text-xs">Biography</Label>
              <textarea
                id="biography"
                {...profileForm.register('biography')}
                rows={3}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5 resize-none"
                placeholder="Tell us about yourself..."
              />
              {profileForm.formState.errors.biography && (
                <p className="text-xs text-red-500 mt-1">{profileForm.formState.errors.biography.message}</p>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-maroon-500 hover:bg-maroon-600 rounded-[10px]"
              >
                <Check className="h-4 w-4 mr-1.5" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
            <Shield className="h-4 w-4 text-maroon-500" />
            Security
          </CardTitle>
          <CardDescription className="text-xs">Manage your password and account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Change Password */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Change Password</h3>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-3">
              <div className="relative">
                <Label htmlFor="currentPw" className="text-xs">Current Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="currentPw"
                    type={showCurrentPw ? 'text' : 'password'}
                    {...passwordForm.register('currentPassword')}
                    placeholder="Enter current password"
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-xs text-red-500 mt-1">{passwordForm.formState.errors.currentPassword.message}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Label htmlFor="newPw" className="text-xs">New Password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="newPw"
                      type={showNewPw ? 'text' : 'password'}
                      {...passwordForm.register('newPassword')}
                      placeholder="Enter new password"
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-xs text-red-500 mt-1">{passwordForm.formState.errors.newPassword.message}</p>
                  )}
                </div>
                <div className="relative">
                  <Label htmlFor="confirmPw" className="text-xs">Confirm Password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="confirmPw"
                      type={showConfirmPw ? 'text' : 'password'}
                      {...passwordForm.register('confirmPassword')}
                      placeholder="Confirm new password"
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{passwordForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="outline" className="text-xs rounded-[10px] border-border hover:bg-maroon-50">
                  <Lock className="h-3.5 w-3.5 mr-1.5" />
                  Update Password
                </Button>
              </div>
            </form>
          </div>

          <Separator />

          {/* Two-Factor Auth */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-maroon-500" />
                Two-Factor Authentication
              </h3>
              <p className="text-xs text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={twoFactor}
              onCheckedChange={(checked) => {
                setTwoFactor(checked);
                toast.success(checked ? '2FA enabled' : '2FA disabled');
              }}
            />
          </div>

          <Separator />

          {/* Active Sessions */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Active Sessions</h3>
            <div className="space-y-3">
              {mockSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3.5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-maroon-50 flex items-center justify-center">
                      <Monitor className="h-4 w-4 text-maroon-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{session.device}</p>
                        {session.current && (
                          <Badge className="bg-maroon-50 text-maroon-600 text-[10px] px-1.5 py-0 rounded-md border-0">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {session.ip} &middot; {session.location} &middot; {formatDate(session.date, 'relative')}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
            <Bell className="h-4 w-4 text-maroon-500" />
            Notification Preferences
          </CardTitle>
          <CardDescription className="text-xs">Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'inApp' as const, label: 'In-App Notifications', icon: Bell, desc: 'Notifications within the app' },
              { key: 'whatsapp' as const, label: 'WhatsApp', icon: MessageCircle, desc: 'Messages via WhatsApp' },
              { key: 'sms' as const, label: 'SMS', icon: Smartphone, desc: 'Text messages to your phone' },
              { key: 'email' as const, label: 'Email', icon: Mail, desc: 'Notifications to your email' },
              { key: 'push' as const, label: 'Push Notifications', icon: Globe, desc: 'Browser push notifications' },
              { key: 'marketing' as const, label: 'Marketing Consent', icon: Globe, desc: 'Receive promotional offers' },
            ].map((pref) => {
              const Icon = pref.icon;
              return (
                <div
                  key={pref.key}
                  className="flex items-center justify-between p-3.5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-maroon-50 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-maroon-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{pref.label}</p>
                      <p className="text-[11px] text-muted-foreground">{pref.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifPrefs[pref.key]}
                    onCheckedChange={() => togglePref(pref.key)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}