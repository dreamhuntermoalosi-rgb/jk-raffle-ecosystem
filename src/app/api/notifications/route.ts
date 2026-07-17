import { NextResponse } from 'next/server';
import { mockNotifications } from '@/mock-data';
import type { NotificationStatus } from '@/types';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/notifications
 * Returns notifications with optional filtering by userId, status, and channel.
 * Query params: userId, status, channel
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('userId');
  const status = searchParams.get('status') as NotificationStatus | null;
  const channel = searchParams.get('channel');

  let filtered = [...mockNotifications];

  if (userId) {
    filtered = filtered.filter((n) => n.userId === userId);
  }

  if (status) {
    filtered = filtered.filter((n) => n.status === status);
  }

  if (channel) {
    filtered = filtered.filter((n) => n.channel === channel);
  }

  // Sort by sent date descending (most recent first)
  filtered.sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );

  return NextResponse.json({ data: filtered, total: filtered.length });
}

/**
 * POST /api/notifications
 * Creates a broadcast notification (mock).
 */
export async function POST(request: Request) {
  await delay();

  try {
    const body = await request.json();
    const newNotification = {
      ...body,
      id: `notif-${Date.now()}`,
      status: 'delivered' as const,
      sentAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newNotification }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}