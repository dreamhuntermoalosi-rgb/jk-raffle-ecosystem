import { NextResponse } from 'next/server';
import { mockUsers } from '@/mock-data';
import type { UserRole, UserStatus } from '@/types';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/users
 * Returns paginated users with optional filtering by role, status, branch, and search.
 * Query params: role, status, branch, search, page, limit
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const role = searchParams.get('role') as UserRole | null;
  const status = searchParams.get('status') as UserStatus | null;
  const branch = searchParams.get('branch');
  const search = searchParams.get('search');
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20));

  let filtered = [...mockUsers];

  if (role) {
    filtered = filtered.filter((u) => u.role === role);
  }

  if (status) {
    filtered = filtered.filter((u) => u.status === status);
  }

  if (branch) {
    filtered = filtered.filter((u) => u.branchId === branch);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({ data, total, page, limit });
}

/**
 * POST /api/users
 * Creates a new user (mock — returns the input with a generated ID).
 */
export async function POST(request: Request) {
  await delay();

  try {
    const body = await request.json();
    const newUser = {
      ...body,
      id: `user-${Date.now()}`,
      status: 'active' as const,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}