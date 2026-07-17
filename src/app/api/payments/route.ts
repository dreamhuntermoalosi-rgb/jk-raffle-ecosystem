import { NextResponse } from 'next/server';
import { mockPayments } from '@/mock-data';
import type { PaymentStatus } from '@/types';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/payments
 * Returns paginated payments with optional filtering by status and method.
 * Query params: status, method, page, limit
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status') as PaymentStatus | null;
  const method = searchParams.get('method');
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20));

  let filtered = [...mockPayments];

  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }

  if (method) {
    filtered = filtered.filter((p) => p.method === method);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({ data, total, page, limit });
}

/**
 * POST /api/payments
 * Creates a mock payment.
 */
export async function POST(request: Request) {
  await delay();

  try {
    const body = await request.json();
    const newPayment = {
      ...body,
      id: `pay-${Date.now()}`,
      status: 'pending' as const,
      gatewayRef: `GW-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newPayment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}