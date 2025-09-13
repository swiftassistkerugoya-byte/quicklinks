import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Calendar, Download, Filter, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const COLORS = ['#8B0000', '#FFD700', '#000000', '#DC2626', '#059669', '#7C3AED'];

const generateMockData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const services = ['Taxi', 'Delivery', 'Cleaning', 'Grocery', 'Laundry'];
  const products = ['Smartphones', 'Laptops', 'TVs', 'Appliances', 'Audio'];

  return {
    revenueData: months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 500000) + 200000,
      orders: Math.floor(Math.random() * 200) + 50,
      services: Math.floor(Math.random() * 150) + 30
    })),
    serviceData: services.map(service => ({
      name: service,
      completed: Math.floor(Math.random() * 100) + 20,
      pending: Math.floor(Math.random() * 30) + 5,
      revenue: Math.floor(Math.random() * 200000) + 50000
    })),
    productData: products.map(product => ({
      name: product,
      sales: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 1000000) + 200000
    })),
    dailyStats: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      orders: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 100000) + 20000,
      services: Math.floor(Math.random() * 30) + 5
    }))
  };
};

export default function AnalyticsModule() {
  const [analyticsData] = useLocalStorage('analytics_data', generateMockData());
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const totalRevenue = useMemo(() => 
    analyticsData.revenueData.reduce((sum, item) => sum + item.revenue, 0), 
    [analyticsData]
  );

  const totalOrders = useMemo(() => 
    analyticsData.revenueData.reduce((sum, item) => sum + item.orders, 0), 
    [analyticsData]
  );

  const totalServices = useMemo(() => 
    analyticsData.revenueData.reduce((sum, item) => sum + item.services, 0), 
    [analyticsData]
  );

  const avgOrderValue = useMemo(() => 
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0, 
    [totalRevenue, totalOrders]
  );

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    // Simulate export functionality
    const data = JSON.stringify(analyticsData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report.${format === 'excel' ? 'xlsx' : format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: `KES ${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Total Orders',
      value: totalOrders.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Services Completed',
      value: totalServices.toLocaleString(),
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Avg Order Value',
      value: `KES ${avgOrderValue.toLocaleString()}`,
      change: '+6.1%',
      changeType: 'positive' as const,
      icon: DollarSign
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <span className="text-sm text-gray-500 ml-1">vs last period</span>
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Revenue Trend</h3>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={selectedMetric === 'revenue' ? 'primary' : 'outline'}
                  onClick={() => setSelectedMetric('revenue')}
                >
                  Revenue
                </Button>
                <Button
                  size="sm"
                  variant={selectedMetric === 'orders' ? 'primary' : 'outline'}
                  onClick={() => setSelectedMetric('orders')}
                >
                  Orders
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    selectedMetric === 'revenue' 
                      ? `KES ${Number(value).toLocaleString()}` 
                      : Number(value).toLocaleString(),
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]} 
                />
                <Area 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#8B0000" 
                  fill="#8B0000" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Performance */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Service Performance</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#8B0000" name="Completed" />
                <Bar dataKey="pending" fill="#FFD700" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Top Products by Revenue</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.productData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => [`KES ${Number(value).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#8B0000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Performance */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Daily Performance (Last 30 Days)</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8B0000" name="Orders" />
                <Line type="monotone" dataKey="services" stroke="#FFD700" name="Services" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Export Reports</h3>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => exportData('csv')}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
            <Button 
              variant="outline" 
              onClick={() => exportData('excel')}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export Excel
            </Button>
            <Button 
              variant="outline" 
              onClick={() => exportData('pdf')}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}