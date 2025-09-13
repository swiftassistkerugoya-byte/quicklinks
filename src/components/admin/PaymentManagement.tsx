import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Search, Filter, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Payment {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: 'mpesa' | 'cash';
  status: 'pending' | 'paid' | 'failed';
  transactionId?: string;
  createdAt: Date;
  verifiedAt?: Date;
}

const initialPayments: Payment[] = [
  {
    id: '1',
    orderId: 'ORD-2025-001',
    customerId: 'cust1',
    customerName: 'John Doe',
    amount: 129999,
    method: 'mpesa',
    status: 'pending',
    transactionId: 'MP240115001',
    createdAt: new Date('2025-01-15T10:30:00')
  },
  {
    id: '2',
    orderId: 'ORD-2025-002',
    customerId: 'cust2',
    customerName: 'Jane Smith',
    amount: 2400,
    method: 'mpesa',
    status: 'paid',
    transactionId: 'MP240114002',
    createdAt: new Date('2025-01-14T15:45:00'),
    verifiedAt: new Date('2025-01-14T15:47:00')
  },
  {
    id: '3',
    orderId: 'ORD-2025-003',
    customerId: 'cust3',
    customerName: 'Mike Johnson',
    amount: 5000,
    method: 'cash',
    status: 'paid',
    createdAt: new Date('2025-01-13T12:20:00'),
    verifiedAt: new Date('2025-01-13T14:30:00')
  }
];

export default function PaymentManagement() {
  const [payments, setPayments] = useLocalStorage<Payment[]>('admin_payments', initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [paymentSettings, setPaymentSettings] = useLocalStorage('payment_settings', {
    mpesaPaybill: '123456',
    mpesaTill: '654321',
    businessShortCode: '174379',
    passkey: 'your-passkey-here'
  });

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || payment.status === statusFilter;
    const matchesMethod = !methodFilter || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleVerifyPayment = (paymentId: string) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: 'paid' as const, verifiedAt: new Date() }
        : payment
    ));
  };

  const handleFailPayment = (paymentId: string) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: 'failed' as const }
        : payment
    ));
  };

  const handleInitiatePayment = () => {
    const newPayment: Payment = {
      id: Date.now().toString(),
      orderId: `ORD-${Date.now()}`,
      customerId: 'new-customer',
      customerName: 'New Customer',
      amount: Math.floor(Math.random() * 50000) + 1000,
      method: 'mpesa',
      status: 'pending',
      transactionId: `MP${Date.now()}`,
      createdAt: new Date()
    };
    setPayments(prev => [newPayment, ...prev]);
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = filteredPayments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = filteredPayments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
          <p className="text-gray-600">Monitor and manage all payment transactions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowSettings(true)}>
            Settings
          </Button>
          <Button onClick={handleInitiatePayment} leftIcon={<CreditCard className="w-4 h-4" />}>
            Initiate Payment
          </Button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">KES {totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                <p className="text-2xl font-bold text-green-600">KES {paidAmount.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-yellow-600">KES {pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Methods</option>
              <option value="mpesa">M-Pesa</option>
              <option value="cash">Cash</option>
            </select>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {filteredPayments.length} payments
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Payment Transactions</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      KES {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="capitalize">{payment.method}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.transactionId || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      {payment.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleVerifyPayment(payment.id)}
                          >
                            Verify
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleFailPayment(payment.id)}
                          >
                            Fail
                          </Button>
                        </>
                      )}
                      {payment.status === 'paid' && payment.verifiedAt && (
                        <span className="text-xs text-green-600">
                          Verified {payment.verifiedAt.toLocaleDateString()}
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Payment Settings</h3>
            
            <div className="space-y-4">
              <Input
                label="M-Pesa Paybill Number"
                value={paymentSettings.mpesaPaybill}
                onChange={(e) => setPaymentSettings(prev => ({ ...prev, mpesaPaybill: e.target.value }))}
              />
              
              <Input
                label="M-Pesa Till Number"
                value={paymentSettings.mpesaTill}
                onChange={(e) => setPaymentSettings(prev => ({ ...prev, mpesaTill: e.target.value }))}
              />
              
              <Input
                label="Business Short Code"
                value={paymentSettings.businessShortCode}
                onChange={(e) => setPaymentSettings(prev => ({ ...prev, businessShortCode: e.target.value }))}
              />
              
              <Input
                label="Passkey"
                type="password"
                value={paymentSettings.passkey}
                onChange={(e) => setPaymentSettings(prev => ({ ...prev, passkey: e.target.value }))}
              />
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={() => setShowSettings(false)} className="flex-1">
                Save Settings
              </Button>
              <Button variant="outline" onClick={() => setShowSettings(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}