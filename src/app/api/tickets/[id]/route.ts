import { NextResponse } from 'next/server';
import { mockTickets } from '@/mock-data';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/tickets/[id]
 * Returns a single ticket by its ID.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const ticket = mockTickets.find((t) => t.id === id);

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }

  return NextResponse.json({ data: ticket });
}

/**
 * PATCH /api/tickets/[id]
 * Verifies a ticket (mock verification).
 * Accepts { action: "verify" } in the body.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const ticket = mockTickets.find((t) => t.id === id);

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }

  try {
    const body = await request.json();

    if (body.action === 'verify') {
      const verified = {
        ...ticket,
        verifiedAt: new Date().toISOString(),
      };
      return NextResponse.json({ data: verified });
    }

    const patched = { ...ticket, ...body };
    return NextResponse.json({ data: patched });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}