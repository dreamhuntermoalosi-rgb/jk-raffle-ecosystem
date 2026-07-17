import { NextResponse } from 'next/server';
import { mockTickets } from '@/mock-data';
import type { TicketStatus } from '@/types';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/tickets
 * Returns paginated tickets with optional filtering by userId, status, campaignId, and search.
 * Query params: userId, status, campaignId, search, page, limit
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('userId');
  const status = searchParams.get('status') as TicketStatus | null;
  const campaignId = searchParams.get('campaignId');
  const search = searchParams.get('search');
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20));

  let filtered = [...mockTickets];

  if (userId) {
    filtered = filtered.filter((t) => t.userId === userId);
  }

  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }

  if (campaignId) {
    filtered = filtered.filter((t) => t.campaignId === campaignId);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.reference.toLowerCase().includes(q) ||
        t.campaign?.title.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({ data, total, page, limit });
}