import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Filter, Eye, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { AuditLog } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const initialLogs: AuditLog[] = [
  {
    id: '1',
    userId: 'admin1',
    userName: 'Admin User',
    action: 'Created Employee',
    entityType: 'Employee',
    entityId: 'emp-001',
    newData: { name: 'John Doe', role: 'driver' },
    timestamp: new Date('2025-01-15T10:30:00'),
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    userId: 'admin1',
    userName: 'Admin User',
    action: 'Updated Order Status',
    entityType: 'Order',
    entityId: 'ORD-2025-001',
    oldData: { status: 'pending' },
    newData: { status: 'confirmed' },
    timestamp: new Date('2025-01-15T09:15:00'),
    ipAddress: '192.168.1.100'
  },
  {
    id: '3',
    userId: 'admin1',
    userName: 'Admin User',
    action: 'Deleted Product',
    entityType: 'Product',
    entityId: 'prod-123',
    oldData: { name: 'Old Product', price: 5000 },
    timestamp: new Date('2025-01-14T16:45:00'),
    ipAddress: '192.168.1.100'
  }
];

export default function AuditLogs() {
  const [logs, setLogs] = useLocalStorage<AuditLog[]>('audit_logs', initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [dateRange, setDateRange] = useState('7');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Add new audit log function (to be called from other components)
  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp' | 'userId' | 'userName' | 'ipAddress'>) => {
    const newLog: AuditLog = {
      ...log,
      id: Date.now().toString(),
      userId: 'admin1',
      userName: 'Admin User',
      timestamp: new Date(),
      ipAddress: '192.168.1.100'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Make addAuditLog available globally (in a real app, this would be in a context)
  useEffect(() => {
    (window as any).addAuditLog = addAuditLog;
  }, []);

  const actions = [...new Set(logs.map(log => log.action))];
  const entities = [...new Set(logs.map(log => log.entityType))];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = !selectedAction || log.action === selectedAction;
    const matchesEntity = !selectedEntity || log.entityType === selectedEntity;
    
    const daysAgo = parseInt(dateRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    const matchesDate = log.timestamp >= cutoffDate;
    
    return matchesSearch && matchesAction && matchesEntity && matchesDate;
  });

  const exportLogs = (format: 'csv' | 'excel' | 'pdf') => {
    const exportData = filteredLogs.map(log => ({
      Timestamp: log.timestamp.toLocaleString(),
      User: log.userName,
      Action: log.action,
      Entity: log.entityType,
      'Entity ID': log.entityId,
      'IP Address': log.ipAddress,
      'Old Data': log.oldData ? JSON.stringify(log.oldData) : '',
      'New Data': log.newData ? JSON.stringify(log.newData) : ''
    }));

    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getActionColor = (action: string) => {
    if (action.includes('Created') || action.includes('Added')) return 'bg-green-100 text-green-800';
    if (action.includes('Updated') || action.includes('Modified')) return 'bg-blue-100 text-blue-800';
    if (action.includes('Deleted') || action.includes('Removed')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
          <p className="text-gray-600">Track all administrative actions and changes</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportData('csv')} leftIcon={<Download className="w-4 h-4" />}>
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportData('excel')} leftIcon={<Download className="w-4 h-4" />}>
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => exportData('pdf')} leftIcon={<Download className="w-4 h-4" />}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Actions</option>
              {actions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Entities</option>
              {entities.map(entity => (
                <option key={entity} value={entity}>{entity}</option>
              ))}
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="1">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {filteredLogs.length} logs
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Audit Trail</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entity ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.timestamp.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.entityType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {log.entityId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedLog(log)}
                        leftIcon={<Eye className="w-3 h-3" />}
                      >
                        View Details
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Audit Log Details</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                  <p className="text-sm text-gray-900">{selectedLog.timestamp.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">User</label>
                  <p className="text-sm text-gray-900">{selectedLog.userName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Action</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(selectedLog.action)}`}>
                    {selectedLog.action}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Entity</label>
                  <p className="text-sm text-gray-900">{selectedLog.entityType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Entity ID</label>
                  <p className="text-sm text-gray-900 font-mono">{selectedLog.entityId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">IP Address</label>
                  <p className="text-sm text-gray-900">{selectedLog.ipAddress}</p>
                </div>
              </div>

              {selectedLog.oldData && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Previous Data</label>
                  <pre className="bg-red-50 p-3 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(selectedLog.oldData, null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.newData && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Data</label>
                  <pre className="bg-green-50 p-3 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(selectedLog.newData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}