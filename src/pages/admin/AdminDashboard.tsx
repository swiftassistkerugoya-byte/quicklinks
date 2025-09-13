import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import {
  Users, Package, ShoppingCart, DollarSign, TrendingUp, 
  MessageSquare, FileText, Settings, Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import AdminSidebar from '../../components/admin/AdminSidebar';
import EmployeeManagement from '../../components/admin/EmployeeManagement';
import OrderManagement from '../../components/admin/OrderManagement';
import ProductManagement from '../../components/admin/ProductManagement';
import FoodManagement from '../../components/admin/FoodManagement';
import MessagingSystem from '../../components/admin/MessagingSystem';
import AnalyticsModule from '../../components/admin/AnalyticsModule';
import PaymentManagement from '../../components/admin/PaymentManagement';
import SettingsModule from '../../components/admin/SettingsModule';
import AuditLogs from '../../components/admin/AuditLogs';
import { Analytics } from '../../types';

const mockAnalytics: Analytics = {
  totalRevenue: 2450000,
  totalOrders: 1247,
  totalRequests: 892,
  activeCustomers: 456,
  topProducts: [
    { name: 'Samsung Galaxy S24', sales: 45, revenue: 4049955 },
    { name: 'MacBook Pro M3', sales: 23, revenue: 4599977 },
    { name: 'Sony Headphones', sales: 67, revenue: 870933 },
    { name: 'LG Smart TV', sales: 31, revenue: 2045969 }
  ],
  revenueByMonth: [
    { month: 'Jan', revenue: 180000 },
    { month: 'Feb', revenue: 220000 },
    { month: 'Mar', revenue: 290000 },
    { month: 'Apr', revenue: 340000 },
    { month: 'May', revenue: 380000 },
    { month: 'Jun', revenue: 420000 }
  ],
  ordersByStatus: [
    { status: 'Completed', count: 856 },
    { status: 'Pending', count: 234 },
    { status: 'Cancelled', count: 157 }
  ]
};

const COLORS = ['#8B0000', '#FFD700', '#000000', '#DC2626'];

const quickActions = [
  { name: 'Manage Products', icon: Package, href: '/admin/products', color: 'bg-blue-500' },
  { name: 'View Orders', icon: ShoppingCart, href: '/admin/orders', color: 'bg-green-500' },
  { name: 'Manage Users', icon: Users, href: '/admin/users', color: 'bg-purple-500' },
  { name: 'Messages', icon: MessageSquare, href: '/admin/messages', color: 'bg-yellow-500' },
  { name: 'Reports', icon: FileText, href: '/admin/reports', color: 'bg-red-500' },
  { name: 'Settings', icon: Settings, href: '/admin/settings', color: 'bg-gray-500' }
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/food" element={<FoodManagement />} />
          <Route path="/messages" element={<MessagingSystem />} />
          <Route path="/analytics" element={<AnalyticsModule />} />
          <Route path="/payments" element={<PaymentManagement />} />
          <Route path="/settings" element={<SettingsModule />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function DashboardHome() {
  const [analytics] = useState<Analytics>(mockAnalytics);
  const [recentActivity] = useState([
    { id: 1, action: 'New order received', user: 'John Doe', time: '5 minutes ago', type: 'order' },
    { id: 2, action: 'Product updated', user: 'Admin', time: '15 minutes ago', type: 'product' },
    { id: 3, action: 'Service request completed', user: 'Jane Smith', time: '1 hour ago', type: 'service' },
    { id: 4, action: 'New user registered', user: 'Mike Johnson', time: '2 hours ago', type: 'user' }
  ]);

  const stats = [
    {
      title: 'Total Revenue',
      value: `KES ${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Service Requests',
      value: analytics.totalRequests.toLocaleString(),
      icon: Package,
      change: '+15.3%',
      changeType: 'positive'
    },
    {
  const quickActions = [
    { name: 'Manage Products', icon: Package, href: '/admin/products', color: 'bg-blue-500' },
    { name: 'View Orders', icon: ShoppingCart, href: '/admin/orders', color: 'bg-green-500' },
    { name: 'Manage Users', icon: Users, href: '/admin/users', color: 'bg-purple-500' },
    { name: 'Messages', icon: MessageSquare, href: '/admin/messages', color: 'bg-yellow-500' },
    { name: 'Reports', icon: FileText, href: '/admin/reports', color: 'bg-red-500' },
    { name: 'Settings', icon: Settings, href: '/admin/settings', color: 'bg-gray-500' }
  ];
      title: 'Active Customers',
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" leftIcon={<Eye className="w-4 h-4" />}>
              View Store
            </Button>
            <Button leftIcon={<FileText className="w-4 h-4" />}>
              Export Reports
            </Button>
          </div>
        </div>
      </div>
      value: analytics.activeCustomers.toLocaleString(),
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">{stat.change}</span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      icon: Users,
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Revenue Trend</h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`KES ${Number(value).toLocaleString()}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#8B0000" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      change: '+6.1%',
        {/* Orders by Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Orders by Status</h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.ordersByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics.ordersByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      changeType: 'positive'
      {/* Top Products Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Top Products by Revenue</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`KES ${Number(value).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#8B0000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    }
      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-colors text-left"
                    >
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900">{action.name}</h4>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
  ];
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibtml">Recent Activity</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}