import { NextResponse } from 'next/server';
import { mockCampaigns } from '@/mock-data';
import type { CampaignStatus } from '@/types';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/campaigns
 * Returns paginated campaigns with optional filtering by status, branch, and search.
 * Query params: status, branch, search, page, limit
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status') as CampaignStatus | null;
  const branch = searchParams.get('branch');
  const search = searchParams.get('search');
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20));

  let filtered = [...mockCampaigns];

  if (status) {
    filtered = filtered.filter((c) => c.status === status);
  }

  if (branch) {
    filtered = filtered.filter((c) => c.branchId === branch || c.branch?.id === branch);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.product?.name.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({ data, total, page, limit });
}

/**
 * POST /api/campaigns
 * Creates a new campaign (mock — returns input with a generated ID).
 */
export async function POST(request: Request) {
  await delay();

  try {
    const body = await request.json();
    const newCampaign = {
      ...body,
      id: `campaign-${Date.now()}`,
      createdAt: new Date().toISOString(),
      soldTickets: 0,
    };

    return NextResponse.json({ data: newCampaign }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}