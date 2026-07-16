import { NextResponse } from 'next/server';
import { mockBranches } from '@/mock-data';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/branches
 * Returns all branches.
 */
export async function GET() {
  await delay();

  return NextResponse.json({ data: mockBranches, total: mockBranches.length });
}