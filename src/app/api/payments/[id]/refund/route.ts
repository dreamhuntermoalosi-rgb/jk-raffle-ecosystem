import { NextResponse } from 'next/server';
import { mockPayments } from '@/mock-data';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * POST /api/payments/[id]/refund
 * Processes a mock refund for a payment.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const payment = mockPayments.find((p) => p.id === id);

  if (!payment) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }

  if (payment.status === 'refunded') {
    return NextResponse.json({ error: 'Payment has already been refunded' }, { status: 400 });
  }

  const refunded = {
    ...payment,
    status: 'refunded' as const,
    refundedAt: new Date().toISOString(),
  };

  return NextResponse.json({
    data: refunded,
    message: 'Refund processed successfully',
  });
}