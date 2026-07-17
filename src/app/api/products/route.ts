import { NextResponse } from 'next/server';
import { mockProducts } from '@/mock-data';
import type { ProductCategory } from '@/types';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/products
 * Returns all products with optional filtering by category and status.
 * Query params: category, status
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category') as ProductCategory | null;
  const status = searchParams.get('status');

  let filtered = [...mockProducts];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }

  return NextResponse.json({ data: filtered, total: filtered.length });
}