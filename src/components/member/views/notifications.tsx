'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Bell,
  MessageCircle,
  Mail,
  Smartphone,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  Inbox,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, formatDate } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { mockNotifications } from '@/mock-data';
import { toast } from 'sonner';
import type { Notification } from '@/types';

type NotifTab = 'all' | 'unread' | 'in_app' | 'whatsapp' | 'sms' | 'email';

function getChannelIconName(channel: string): string {
  switch (channel) {
    case 'in_app':
    case 'push':
      return 'bell';
    case 'whatsapp':
      return 'message-circle';
    case 'email':
      return 'mail';
    case 'sms':
      return 'smartphone';
    default:
      return 'bell';
  }
}

function getChannelLabel(channel: string) {
  switch (channel) {
    case 'in_app': return 'In-App';
    case 'push': return 'Push';
    case 'whatsapp': return 'WhatsApp';
    case 'email': return 'Email';
    case 'sms': return 'SMS';
    default: return channel;
  }
}

function getChannelColor(channel: string) {
  switch (channel) {
    case 'in_app':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    case 'whatsapp':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'email':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    case 'sms':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    case 'push':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function MemberNotifications() {
  const { notifications, unreadCount, markNotificationRead, setNotifications } = useAppStore();
  const [activeTab, setActiveTab] = useState<NotifTab>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Initialize notifications from mock data on first render
  const initialized = useMemo(() => {
    if (notifications.length === 0) {
      setNotifications(mockNotifications);
    }
    return true;
  }, []);

  const filteredNotifications = useMemo(() => {
    let list = notifications.length > 0 ? notifications : mockNotifications;

    if (activeTab === 'unread') {
      list = list.filter(n => n.status === 'unread');
    } else if (activeTab === 'in_app' || activeTab === 'whatsapp' || activeTab === 'sms' || activeTab === 'email') {
      list = list.filter(n => n.channel === activeTab);
    }

    return list.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
  }, [activeTab, notifications]);

  const handleMarkRead = useCallback((id: string) => {
    markNotificationRead(id);
  }, [markNotificationRead]);

  const handleMarkAllRead = useCallback(() => {
    const current = notifications.length > 0 ? notifications : mockNotifications;
    current.forEach(n => {
      if (n.status === 'unread') {
        markNotificationRead(n.id);
      }
    });
    toast.success('All notifications marked as read');
  }, [notifications, markNotificationRead]);

  const tabCounts = useMemo(() => {
    const all = notifications.length > 0 ? notifications : mockNotifications;
    return {
      all: all.length,
      unread: all.filter(n => n.status === 'unread').length,
      in_app: all.filter(n => n.channel === 'in_app').length,
      whatsapp: all.filter(n => n.channel === 'whatsapp').length,
      sms: all.filter(n => n.channel === 'sms').length,
      email: all.filter(n => n.channel === 'email').length,
    };
  }, [notifications]);

  const currentUnreadCount = notifications.length > 0 ? unreadCount : mockNotifications.filter(n => n.status === 'unread').length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              Notifications
              {currentUnreadCount > 0 && (
                <Badge className="bg-rose-500 text-white text-xs px-2">
                  {currentUnreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Stay updated on your raffle activity
            </p>
          </div>
        </div>
        {currentUnreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            className="text-xs"
          >
            <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as NotifTab)}>
        <TabsList className="h-10 flex-wrap">
          <TabsTrigger value="all" className="text-xs px-3">All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="unread" className="text-xs px-3">Unread ({tabCounts.unread})</TabsTrigger>
          <TabsTrigger value="in_app" className="text-xs px-3">In-App ({tabCounts.in_app})</TabsTrigger>
          <TabsTrigger value="whatsapp" className="text-xs px-3">WhatsApp ({tabCounts.whatsapp})</TabsTrigger>
          <TabsTrigger value="sms" className="text-xs px-3">SMS ({tabCounts.sms})</TabsTrigger>
          <TabsTrigger value="email" className="text-xs px-3">Email ({tabCounts.email})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Notification list */}
      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">No notifications</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {activeTab === 'unread'
                ? "You're all caught up! No unread notifications."
                : 'No notifications match this filter.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              isExpanded={expandedId === notification.id}
              onToggleExpand={() => setExpandedId(expandedId === notification.id ? null : notification.id)}
              onMarkRead={() => handleMarkRead(notification.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationItem({ notification, isExpanded, onToggleExpand, onMarkRead }: {
  notification: Notification;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onMarkRead: () => void;
}) {
  const isUnread = notification.status === 'unread';
  const channelIconName = getChannelIconName(notification.channel);

  return (
    <Card
      className={cn(
        'transition-all cursor-pointer hover:shadow-sm',
        isUnread && 'border-l-4 border-l-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/10'
      )}
      onClick={() => {
        if (isUnread) onMarkRead();
        onToggleExpand();
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Channel icon */}
          <div className={cn('p-2 rounded-lg shrink-0', getChannelColor(notification.channel))}>
            {channelIconName === 'bell' && <Bell className="h-4 w-4" />}
            {channelIconName === 'message-circle' && <MessageCircle className="h-4 w-4" />}
            {channelIconName === 'mail' && <Mail className="h-4 w-4" />}
            {channelIconName === 'smartphone' && <Smartphone className="h-4 w-4" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className={cn(
                    'text-sm leading-snug',
                    isUnread ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'
                  )}>
                    {notification.title}
                  </h3>
                  {isUnread && (
                    <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                  )}
                </div>
                <p className={cn(
                  'text-xs leading-relaxed',
                  isUnread ? 'text-foreground/80' : 'text-muted-foreground'
                )}>
                  {notification.message}
                </p>
              </div>

              {/* Right side */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                  {formatDate(notification.sentAt, 'relative')}
                </span>
                <Badge
                  variant="secondary"
                  className={cn('text-[10px] px-1.5 py-0', getChannelColor(notification.channel))}
                >
                  {getChannelLabel(notification.channel)}
                </Badge>
              </div>
            </div>

            {/* Expand/Collapse for delivery log */}
            <div className="mt-2 flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand();
                }}
                className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3" />
                    Hide details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" />
                    Delivery details
                  </>
                )}
              </button>
            </div>

            {isExpanded && (
              <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">Sent:</span>
                    <span>{formatDate(notification.sentAt, 'long')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">Channel:</span>
                    <span className="capitalize">{notification.channel.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">Status:</span>
                    <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <CheckCheck className="h-3 w-3 mr-1" />
                      Delivered successfully
                    </Badge>
                  </div>
                  {notification.readAt && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground w-24">Read:</span>
                      <span>{formatDate(notification.readAt, 'long')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-24">Type:</span>
                    <span className="capitalize">{notification.type.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}