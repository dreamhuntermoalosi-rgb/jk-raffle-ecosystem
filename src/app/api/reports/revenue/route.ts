import { NextResponse } from 'next/server';
import { mockDashboardStats } from '@/mock-data';

/** Simulate network latency */
const delay = () => new Promise((r) => setTimeout(r, Math.random() * 300 + 200));

/**
 * GET /api/reports/revenue
 * Returns revenue data by month for chart visualizations.
 * Query params: months (number of months to return, default 12)
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = request.nextUrl;
  const months = Math.min(24, Math.max(1, Number(searchParams.get('months')) || 12));

  const revenueData = mockDashboardStats.revenueByMonth.slice(-months);

  // Calculate summary statistics
  const totalRevenue = revenueData.reduce((sum, m) => sum + m.revenue, 0);
  const totalTickets = revenueData.reduce((sum, m) => sum + m.tickets, 0);
  const avgRevenue = totalRevenue / revenueData.length;
  const bestMonth = revenueData.reduce(
    (best, m) => (m.revenue > best.revenue ? m : best),
    revenueData[0]
  );
  const worstMonth = revenueData.reduce(
    (worst, m) => (m.revenue < worst.revenue ? m : worst),
    revenueData[0]
  );

  return NextResponse.json({
    data: revenueData,
    summary: {
      totalRevenue,
      totalTickets,
      averageMonthlyRevenue: Math.round(avgRevenue),
      bestMonth: bestMonth?.month ?? null,
      worstMonth: worstMonth?.month ?? null,
    },
  });
}