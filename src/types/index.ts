export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee' | 'customer';
  phone?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  prepTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId?: string;
  foodId?: string;
  quantity: number;
  price: number;
  name: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderType: 'product' | 'food';
  deliveryAddress: string;
  paymentMethod: 'mpesa' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceType: 'taxi' | 'grocery' | 'laundry' | 'cleaning' | 'delivery' | 'other';
  title: string;
  description: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  scheduledDate: Date;
  budget: number;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  promoCode?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'driver' | 'delivery' | 'cleaner' | 'admin';
  isActive: boolean;
  rating: number;
  totalJobs: number;
  joinedAt: Date;
  skills: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  oldData?: any;
  newData?: any;
  timestamp: Date;
  ipAddress?: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  type: 'customer-support' | 'internal' | 'system';
  orderId?: string;
  requestId?: string;
}

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalRequests: number;
  activeCustomers: number;
  topProducts: Array<{ name: string; sales: number; revenue: number }>;
  revenueByMonth: Array<{ month: string; revenue: number }>;
  ordersByStatus: Array<{ status: string; count: number }>;
}