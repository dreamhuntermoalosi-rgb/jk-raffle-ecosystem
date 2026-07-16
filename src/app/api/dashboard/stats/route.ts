import { NextResponse } from 'next/server';
import { mockDashboardStats } from '@/mock-data';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/dashboard/stats
 * Returns dashboard statistics including revenue, tickets, members, and more.
 */
export async function GET() {
  await delay();

  return NextResponse.json({ data: mockDashboardStats });
}