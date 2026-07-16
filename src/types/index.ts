// ============================================
// JK RAFFLE ECOSYSTEM - Type Definitions
// ============================================

export type Portal = 'public' | 'member' | 'manager' | 'admin';
export type PageView = string;

export type UserRole = 'super_admin' | 'admin' | 'branch_manager' | 'member' | 'support' | 'auditor';
export type UserStatus = 'active' | 'suspended' | 'deactivated' | 'pending';
export type CampaignStatus = 'draft' | 'open' | 'paused' | 'closed' | 'archived' | 'completed';
export type TicketStatus = 'active' | 'expired' | 'won' | 'claimed' | 'voided';
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type NotificationStatus = 'read' | 'unread' | 'delivered' | 'failed';
export type SupportTicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type SupportTicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type EventTypes = 'draw' | 'branch_event' | 'community' | 'promotional';
export type ProductCategory = 'house' | 'vehicle' | 'electronics' | 'cash' | 'vacation' | 'other';

export interface User {
  id: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  avatar: string | null;
  occupation: string | null;
  biography: string | null;
  role: UserRole;
  status: UserStatus;
  branchId: string | null;
  branch?: Branch;
  twoFactorEnabled: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  province: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  managerId: string | null;
  manager?: User;
  status: string;
  memberCount?: number;
  revenue?: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: ProductCategory;
  value: number;
  image: string | null;
  images: string[] | null;
  videoUrl: string | null;
  specs: Record<string, string> | null;
  status: string;
  featured: boolean;
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string | null;
  productId: string;
  product: Product;
  branchId: string;
  branch: Branch;
  status: CampaignStatus;
  ticketPrice: number;
  maxTickets: number;
  soldTickets: number;
  drawDate: string;
  drawLocation: string | null;
  featuredImage: string | null;
  galleryImages: string[] | null;
  videoUrl: string | null;
  winnerId: string | null;
  winner?: User;
  createdAt: string;
  closedAt: string | null;
  drawnAt: string | null;
  // Computed
  progress?: number;
  timeRemaining?: string;
}

export interface Ticket {
  id: string;
  reference: string;
  campaignId: string;
  campaign?: Campaign;
  userId: string;
  user?: User;
  orderId: string | null;
  status: TicketStatus;
  qrCode: string | null;
  barcode: string | null;
  verifiedAt: string | null;
  purchasedAt: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  campaignId: string;
  campaign?: Campaign;
  ticketCount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string | null;
  paidAt: string | null;
  createdAt: string;
  tickets?: Ticket[];
  payment?: Payment;
}

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  gatewayRef: string | null;
  paidAt: string | null;
  refundedAt: string | null;
  invoiceUrl: string | null;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  channel: string;
  status: NotificationStatus;
  deliveryLog: Record<string, unknown> | null;
  sentAt: string;
  readAt: string | null;
}

export interface ActivityLog {
  id: string;
  userId: string;
  user?: User;
  action: string;
  entity: string | null;
  entityId: string | null;
  details: Record<string, unknown> | null;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  user?: User;
  action: string;
  entity: string;
  entityId: string | null;
  oldValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  user?: User;
  subject: string;
  description: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  category: string;
  assignedTo: string | null;
  resolution: string | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  type: EventTypes;
  date: string;
  endDate: string | null;
  location: string | null;
  campaignId: string | null;
  branchId: string | null;
  status: EventStatus;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalTicketsSold: number;
  totalMembers: number;
  activeCampaigns: number;
  totalOrders: number;
  pendingPayments: number;
  totalWinners: number;
  monthlyGrowth: number;
  revenueByMonth: { month: string; revenue: number; tickets: number }[];
  ticketsByBranch: { branch: string; tickets: number; revenue: number }[];
  recentActivity: ActivityLog[];
  topCampaigns: Campaign[];
}

export interface CartItem {
  campaignId: string;
  campaign: Campaign;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface MemberPreference {
  notificationsInApp: boolean;
  notificationsWhatsApp: boolean;
  notificationsSMS: boolean;
  notificationsEmail: boolean;
  notificationsPush: boolean;
  marketingConsent: boolean;
  language: string;
}