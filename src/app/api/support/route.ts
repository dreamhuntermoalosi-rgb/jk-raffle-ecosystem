import { NextResponse } from 'next/server';
import { mockSupportTickets } from '@/mock-data';
import type { SupportTicketStatus } from '@/types';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/support
 * Returns support tickets with optional filtering by status.
 * Query params: status, page, limit
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status') as SupportTicketStatus | null;
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20));

  let filtered = [...mockSupportTickets];

  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({ data, total, page, limit });
}

/**
 * POST /api/support
 * Creates a support ticket (mock).
 */
export async function POST(request: Request) {
  await delay();

  try {
    const body = await request.json();
    const newTicket = {
      ...body,
      id: `support-${Date.now()}`,
      status: 'open' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newTicket }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}