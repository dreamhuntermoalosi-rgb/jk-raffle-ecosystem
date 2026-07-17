'use client';

import { useState } from 'react';
import { mockEvents, mockBranches, mockCampaigns } from '@/mock-data';
import { formatDate, cn, getStatusColor } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Trophy,
  Building2,
  Users,
  Megaphone,
  CalendarDays,
  List,
  Plus,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Eye,
} from 'lucide-react';
import type { Event } from '@/types';

const eventTypeIcons: Record<string, React.ElementType> = {
  draw: Trophy,
  branch_event: Building2,
  community: Users,
  promotional: Megaphone,
};

const eventTypeLabels: Record<string, string> = {
  draw: 'Draw',
  branch_event: 'Branch Event',
  community: 'Community',
  promotional: 'Promotional',
};

export function AdminEvents() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showPast, setShowPast] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState<Event | null>(null);

  const upcomingEvents = mockEvents.filter(
    (e) => e.status === 'upcoming' || e.status === 'ongoing'
  );
  const pastEvents = mockEvents.filter((e) => e.status === 'completed' || e.status === 'cancelled');

  const getBranchName = (branchId: string | null) => {
    if (!branchId) return 'All Branches';
    return mockBranches.find((b) => b.id === branchId)?.name || 'Unknown Branch';
  };

  const getCampaignTitle = (campaignId: string | null) => {
    if (!campaignId) return null;
    return mockCampaigns.find((c) => c.id === campaignId)?.title || null;
  };

  const getEventIcon = (type: string) => {
    return eventTypeIcons[type] || CalendarDays;
  };

  const mockAttendees: Record<string, number> = {
    'evt-001': 128,
    'evt-002': 89,
    'evt-003': 214,
    'evt-004': 342,
    'evt-005': 0,
    'evt-006': 167,
    'evt-007': 0,
    'evt-008': 256,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Events & Calendar</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage draws, branch events, and community activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-lg p-0.5 bg-muted">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
            >
              <List className="w-4 h-4 mr-1.5" />
              List
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className="h-8 px-3"
            >
              <CalendarDays className="w-4 h-4 mr-1.5" />
              Calendar
            </Button>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-maroon-500 hover:bg-maroon-600 text-white rounded-[10px]">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Add a new event to the system. Fill in all required fields.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-title">Title</Label>
                  <Input id="event-title" placeholder="e.g. Live Draw - Sandton Campaign" className="rounded-lg" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-desc">Description</Label>
                  <Textarea
                    id="event-desc"
                    placeholder="Describe the event details..."
                    rows={3}
                    className="rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-type">Type</Label>
                    <Select>
                      <SelectTrigger id="event-type" className="rounded-lg">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draw">Draw</SelectItem>
                        <SelectItem value="branch_event">Branch Event</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-branch">Branch</Label>
                    <Select>
                      <SelectTrigger id="event-branch" className="rounded-lg">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBranches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-date">Start Date & Time</Label>
                    <Input id="event-date" type="datetime-local" className="rounded-lg" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-end-date">End Date & Time</Label>
                    <Input id="event-end-date" type="datetime-local" className="rounded-lg" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-location">Location</Label>
                  <Input id="event-location" placeholder="e.g. Sandton City Mall, Centre Court" className="rounded-lg" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-campaign">Campaign (Optional)</Label>
                  <Select>
                    <SelectTrigger id="event-campaign" className="rounded-lg">
                      <SelectValue placeholder="Select campaign (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCampaigns.map((campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id}>
                          {campaign.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateOpen(false)} className="rounded-[10px]">
                  Cancel
                </Button>
                <Button className="bg-maroon-500 hover:bg-maroon-600 text-white rounded-[10px]" onClick={() => setCreateOpen(false)}>
                  Create Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Calendar Placeholder View */}
      {viewMode === 'calendar' && (
        <Card className="shadow-royal-sm rounded-xl border-0 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <CalendarDays className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">Calendar View</h3>
            <p className="text-sm text-muted-foreground/70 mt-1 text-center max-w-sm">
              Calendar integration coming soon. Switch to list view to manage events.
            </p>
          </CardContent>
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <>
          {/* Upcoming Events */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingEvents.map((event) => {
                const Icon = getEventIcon(event.type);
                const attendees = mockAttendees[event.id] ?? 0;
                const campaignTitle = getCampaignTitle(event.campaignId);

                return (
                  <Card
                    key={event.id}
                    className="cursor-pointer shadow-royal-sm rounded-xl border-0 hover:shadow-royal-md transition-shadow"
                    onClick={() => setDetailEvent(event)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg bg-maroon-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-maroon-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-sm text-foreground line-clamp-1">{event.title}</h3>
                            <Badge variant="secondary" className={cn('text-[10px] rounded-md', getStatusColor(event.status))}>
                              {event.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {formatDate(event.date, 'long')}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {event.location || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" />
                              {getBranchName(event.branchId)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {attendees > 0 ? `${attendees} attending` : 'No RSVPs yet'}
                            </span>
                          </div>
                          {campaignTitle && (
                            <p className="text-[11px] text-gold-600 mt-2 font-medium truncate">
                              Campaign: {campaignTitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <button
                onClick={() => setShowPast(!showPast)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                {showPast ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showPast ? 'Hide Past Events' : `Show Past Events (${pastEvents.length})`}
              </button>
              {showPast && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastEvents.map((event) => {
                    const Icon = getEventIcon(event.type);
                    const attendees = mockAttendees[event.id] ?? 0;

                    return (
                      <Card
                        key={event.id}
                        className="cursor-pointer shadow-royal-sm rounded-xl border-0 hover:shadow-royal-md transition-shadow opacity-80"
                        onClick={() => setDetailEvent(event)}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-lg bg-maroon-50/60 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-maroon-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="font-semibold text-sm text-foreground line-clamp-1">{event.title}</h3>
                                <Badge variant="secondary" className={cn('text-[10px] rounded-md', getStatusColor(event.status))}>
                                  {event.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                {event.description}
                              </p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <CalendarDays className="w-3.5 h-3.5" />
                                  {formatDate(event.date, 'long')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {event.location || 'N/A'}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3.5 h-3.5" />
                                  {getBranchName(event.branchId)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5" />
                                  {attendees > 0 ? `${attendees} attended` : 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Event Detail Dialog */}
      <Dialog open={!!detailEvent} onOpenChange={(open) => !open && setDetailEvent(null)}>
        <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
          {detailEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-maroon-50 flex items-center justify-center">
                    {(() => {
                      const Icon = getEventIcon(detailEvent.type);
                      return <Icon className="w-5 h-5 text-maroon-500" />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="text-lg">{detailEvent.title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={cn('text-[10px] rounded-md', getStatusColor(detailEvent.status))}>
                        {detailEvent.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] rounded-md">
                        {eventTypeLabels[detailEvent.type] || detailEvent.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {detailEvent.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date & Time</p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      {formatDate(detailEvent.date, 'long')}
                    </p>
                    {detailEvent.endDate && (
                      <p className="text-xs text-muted-foreground">
                        Ends: {formatDate(detailEvent.endDate, 'long')}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {detailEvent.location || 'N/A'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Branch</p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                      {getBranchName(detailEvent.branchId)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendees</p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      {mockAttendees[detailEvent.id] ?? 0} {detailEvent.status === 'completed' ? 'attended' : 'registered'}
                    </p>
                  </div>
                </div>
                {getCampaignTitle(detailEvent.campaignId) && (
                  <div className="bg-gold-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gold-600 uppercase tracking-wider mb-1">Linked Campaign</p>
                    <p className="text-sm font-medium text-gold-700">
                      {getCampaignTitle(detailEvent.campaignId)}
                    </p>
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  Created: {formatDate(detailEvent.createdAt, 'long')}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailEvent(null)} className="rounded-[10px]">
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}