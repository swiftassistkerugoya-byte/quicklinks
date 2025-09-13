import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Search, Plus, Reply, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Message } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const initialMessages: Message[] = [
  {
    id: '1',
    from: 'customer@example.com',
    to: 'admin@quicklinkservices.com',
    subject: 'Order Delivery Issue',
    content: 'My order #ORD-2025-001 was supposed to be delivered today but I haven\'t received it yet.',
    isRead: false,
    createdAt: new Date('2025-01-15T10:30:00'),
    type: 'customer-support',
    orderId: 'ORD-2025-001'
  },
  {
    id: '2',
    from: 'admin@quicklinkservices.com',
    to: 'james@quicklinkservices.com',
    subject: 'New Assignment',
    content: 'Please handle the taxi request REQ-2025-001 for airport pickup.',
    isRead: true,
    createdAt: new Date('2025-01-15T09:15:00'),
    type: 'internal',
    requestId: 'REQ-2025-001'
  },
  {
    id: '3',
    from: 'system@quicklinkservices.com',
    to: 'admin@quicklinkservices.com',
    subject: 'Payment Received',
    content: 'Payment of KES 129,999 has been received for order ORD-2025-003.',
    isRead: true,
    createdAt: new Date('2025-01-14T16:45:00'),
    type: 'system',
    orderId: 'ORD-2025-003'
  }
];

export default function MessagingSystem() {
  const [messages, setMessages] = useLocalStorage<Message[]>('admin_messages', initialMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [newMessageForm, setNewMessageForm] = useState({
    to: '',
    subject: '',
    content: '',
    type: 'internal' as Message['type']
  });

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || message.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleReadMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, isRead: true } : msg
      ));
    }
  };

  const handleSendReply = () => {
    if (!selectedMessage || !replyContent.trim()) return;

    const reply: Message = {
      id: Date.now().toString(),
      from: 'admin@quicklinkservices.com',
      to: selectedMessage.from,
      subject: `Re: ${selectedMessage.subject}`,
      content: replyContent,
      isRead: true,
      createdAt: new Date(),
      type: selectedMessage.type,
      orderId: selectedMessage.orderId,
      requestId: selectedMessage.requestId
    };

    setMessages(prev => [reply, ...prev]);
    setReplyContent('');
    setSelectedMessage(null);
  };

  const handleSendNewMessage = () => {
    if (!newMessageForm.to || !newMessageForm.subject || !newMessageForm.content) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: 'admin@quicklinkservices.com',
      to: newMessageForm.to,
      subject: newMessageForm.subject,
      content: newMessageForm.content,
      isRead: true,
      createdAt: new Date(),
      type: newMessageForm.type
    };

    setMessages(prev => [newMessage, ...prev]);
    setNewMessageForm({ to: '', subject: '', content: '', type: 'internal' });
    setShowNewMessage(false);
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const getMessageTypeColor = (type: Message['type']) => {
    switch (type) {
      case 'customer-support': return 'bg-blue-100 text-blue-800';
      case 'internal': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Messaging System</h2>
          <p className="text-gray-600">Manage customer support and internal communications</p>
        </div>
        <Button onClick={() => setShowNewMessage(true)} leftIcon={<Plus className="w-4 h-4" />}>
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">All Types</option>
                  <option value="customer-support">Customer Support</option>
                  <option value="internal">Internal</option>
                  <option value="system">System</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleReadMessage(message)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      !message.isRead ? 'bg-blue-50' : ''
                    } ${selectedMessage?.id === message.id ? 'bg-red-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm truncate">{message.from}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getMessageTypeColor(message.type)}`}>
                        {message.type}
                      </span>
                    </div>
                    <h4 className={`text-sm mb-1 truncate ${!message.isRead ? 'font-semibold' : ''}`}>
                      {message.subject}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{message.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {message.createdAt.toLocaleDateString()}
                      </span>
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedMessage.subject}</h3>
                    <p className="text-sm text-gray-600">
                      From: {selectedMessage.from} • To: {selectedMessage.to}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedMessage.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getMessageTypeColor(selectedMessage.type)}`}>
                      {selectedMessage.type}
                    </span>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      leftIcon={<Trash2 className="w-3 h-3" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>

                {selectedMessage.orderId && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Related Order: <span className="font-medium">{selectedMessage.orderId}</span>
                    </p>
                  </div>
                )}

                {selectedMessage.requestId && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      Related Request: <span className="font-medium">{selectedMessage.requestId}</span>
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="font-medium">Reply</h4>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={4}
                  />
                  <Button onClick={handleSendReply} leftIcon={<Send className="w-4 h-4" />}>
                    Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Message Selected</h3>
                <p className="text-gray-600">Select a message from the list to view its content</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">New Message</h3>
            
            <div className="space-y-4">
              <Input
                label="To"
                value={newMessageForm.to}
                onChange={(e) => setNewMessageForm(prev => ({ ...prev, to: e.target.value }))}
                placeholder="employee@quicklinkservices.com"
                required
              />
              
              <Input
                label="Subject"
                value={newMessageForm.subject}
                onChange={(e) => setNewMessageForm(prev => ({ ...prev, subject: e.target.value }))}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newMessageForm.type}
                  onChange={(e) => setNewMessageForm(prev => ({ ...prev, type: e.target.value as Message['type'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="internal">Internal</option>
                  <option value="customer-support">Customer Support</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newMessageForm.content}
                  onChange={(e) => setNewMessageForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={4}
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleSendNewMessage} className="flex-1">
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setShowNewMessage(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}