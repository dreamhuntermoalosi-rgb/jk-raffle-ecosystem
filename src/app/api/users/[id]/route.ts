import { NextResponse } from 'next/server';
import { mockUsers } from '@/mock-data';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/users/[id]
 * Returns a single user by their ID.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ data: user });
}

/**
 * PUT /api/users/[id]
 * Updates a user (mock — returns the input merged with existing data).
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const updated = {
      ...user,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

/**
 * DELETE /api/users/[id]
 * Deactivates a user (mock — sets status to 'deactivated').
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay();

  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const deactivated = {
    ...user,
    status: 'deactivated' as const,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json({
    data: deactivated,
    message: 'User deactivated successfully',
  });
}