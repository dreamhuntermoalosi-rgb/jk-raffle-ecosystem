import { NextResponse } from 'next/server';
import { mockCampaigns } from '@/mock-data';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/campaigns/[id]
 * Returns a single campaign by its ID.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const campaign = mockCampaigns.find((c) => c.id === id);

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  return NextResponse.json({ data: campaign });
}

/**
 * PUT /api/campaigns/[id]
 * Updates a campaign (mock — returns the input merged with existing data).
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const campaign = mockCampaigns.find((c) => c.id === id);

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const updated = { ...campaign, ...body, id, updatedAt: new Date().toISOString() };
    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

/**
 * PATCH /api/campaigns/[id]
 * Patches campaign status (open/close/pause/etc).
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const campaign = mockCampaigns.find((c) => c.id === id);

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const patched = {
      ...campaign,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };

    if (body.status === 'closed' || body.status === 'completed') {
      patched.closedAt = new Date().toISOString();
    }

    return NextResponse.json({ data: patched });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}