import { NextResponse } from 'next/server';
import { mockOrders } from '@/mock-data';
import type { OrderStatus } from '@/types';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/orders
 * Returns paginated orders with optional filtering by userId and status.
 * Query params: userId, status, page, limit
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('userId');
  const status = searchParams.get('status') as OrderStatus | null;
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20));

  let filtered = [...mockOrders];

  if (userId) {
    filtered = filtered.filter((o) => o.userId === userId);
  }

  if (status) {
    filtered = filtered.filter((o) => o.status === status);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({ data, total, page, limit });
}

/**
 * POST /api/orders
 * Creates a new order (mock — returns the input with a generated ID).
 */
export async function POST(request: Request) {
  await delay();

  try {
    const body = await request.json();
    const newOrder = {
      ...body,
      id: `order-${Date.now()}`,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newOrder }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}