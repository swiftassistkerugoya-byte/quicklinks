import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Bell, Palette, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Settings {
  company: {
    name: string;
    tagline: string;
    phone1: string;
    phone2: string;
    email: string;
    address: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logo: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    orderUpdates: boolean;
    paymentAlerts: boolean;
  };
  payment: {
    mpesaPaybill: string;
    mpesaTill: string;
    currency: string;
  };
  system: {
    timezone: string;
    language: string;
    dateFormat: string;
  };
}

const defaultSettings: Settings = {
  company: {
    name: 'QUICKLINK SERVICES',
    tagline: 'Your Time, Our Priority',
    phone1: '0111679286',
    phone2: '0717562660',
    email: 'info@quicklinkservices.com',
    address: 'Nairobi, Kenya'
  },
  branding: {
    primaryColor: '#8B0000',
    secondaryColor: '#000000',
    accentColor: '#FFD700',
    logo: ''
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    paymentAlerts: true
  },
  payment: {
    mpesaPaybill: '123456',
    mpesaTill: '654321',
    currency: 'KES'
  },
  system: {
    timezone: 'Africa/Nairobi',
    language: 'en',
    dateFormat: 'DD/MM/YYYY'
  }
};

export default function SettingsModule() {
  const [settings, setSettings] = useLocalStorage<Settings>('admin_settings', defaultSettings);
  const [activeTab, setActiveTab] = useState('company');
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Phone },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment', icon: Phone },
    { id: 'system', label: 'System', icon: Phone }
  ];

  const updateSettings = (section: keyof Settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Settings are automatically saved via useLocalStorage
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings(defaultSettings);
      setHasChanges(false);
    }
  };

  const renderCompanySettings = () => (
    <div className="space-y-4">
      <Input
        label="Company Name"
        value={settings.company.name}
        onChange={(e) => updateSettings('company', 'name', e.target.value)}
      />
      <Input
        label="Tagline"
        value={settings.company.tagline}
        onChange={(e) => updateSettings('company', 'tagline', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Primary Phone"
          value={settings.company.phone1}
          onChange={(e) => updateSettings('company', 'phone1', e.target.value)}
        />
        <Input
          label="Secondary Phone"
          value={settings.company.phone2}
          onChange={(e) => updateSettings('company', 'phone2', e.target.value)}
        />
      </div>
      <Input
        label="Email"
        type="email"
        value={settings.company.email}
        onChange={(e) => updateSettings('company', 'email', e.target.value)}
      />
      <Input
        label="Address"
        value={settings.company.address}
        onChange={(e) => updateSettings('company', 'address', e.target.value)}
      />
    </div>
  );

  const renderBrandingSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.branding.primaryColor}
              onChange={(e) => updateSettings('branding', 'primaryColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              value={settings.branding.primaryColor}
              onChange={(e) => updateSettings('branding', 'primaryColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.branding.secondaryColor}
              onChange={(e) => updateSettings('branding', 'secondaryColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              value={settings.branding.secondaryColor}
              onChange={(e) => updateSettings('branding', 'secondaryColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.branding.accentColor}
              onChange={(e) => updateSettings('branding', 'accentColor', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              value={settings.branding.accentColor}
              onChange={(e) => updateSettings('branding', 'accentColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      <Input
        label="Logo URL"
        value={settings.branding.logo}
        onChange={(e) => updateSettings('branding', 'logo', e.target.value)}
        placeholder="https://example.com/logo.png"
      />
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Preview</h4>
        <div 
          className="p-4 rounded-lg text-white"
          style={{ backgroundColor: settings.branding.primaryColor }}
        >
          <h3 className="text-lg font-bold">{settings.company.name}</h3>
          <p style={{ color: settings.branding.accentColor }}>{settings.company.tagline}</p>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <p className="text-xs text-gray-500">
              {key === 'emailNotifications' && 'Receive notifications via email'}
              {key === 'smsNotifications' && 'Receive notifications via SMS'}
              {key === 'orderUpdates' && 'Get notified about order status changes'}
              {key === 'paymentAlerts' && 'Get alerts for payment transactions'}
            </p>
          </div>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => updateSettings('notifications', key, e.target.checked)}
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
        </div>
      ))}
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-4">
      <Input
        label="M-Pesa Paybill Number"
        value={settings.payment.mpesaPaybill}
        onChange={(e) => updateSettings('payment', 'mpesaPaybill', e.target.value)}
      />
      <Input
        label="M-Pesa Till Number"
        value={settings.payment.mpesaTill}
        onChange={(e) => updateSettings('payment', 'mpesaTill', e.target.value)}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <select
          value={settings.payment.currency}
          onChange={(e) => updateSettings('payment', 'currency', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="KES">Kenyan Shilling (KES)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
        </select>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
        <select
          value={settings.system.timezone}
          onChange={(e) => updateSettings('system', 'timezone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="Africa/Nairobi">Africa/Nairobi</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <select
          value={settings.system.language}
          onChange={(e) => updateSettings('system', 'language', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="en">English</option>
          <option value="sw">Swahili</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
        <select
          value={settings.system.dateFormat}
          onChange={(e) => updateSettings('system', 'dateFormat', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Manage your application settings and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Reset to Default
          </Button>
          <Button 
            onClick={handleSave} 
            leftIcon={<Save className="w-4 h-4" />}
            disabled={!hasChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-50 text-red-700 border-r-2 border-red-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold capitalize">
                {tabs.find(tab => tab.id === activeTab)?.label} Settings
              </h3>
            </CardHeader>
            <CardContent>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'company' && renderCompanySettings()}
                {activeTab === 'branding' && renderBrandingSettings()}
                {activeTab === 'notifications' && renderNotificationSettings()}
                {activeTab === 'payment' && renderPaymentSettings()}
                {activeTab === 'system' && renderSystemSettings()}
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>

      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-lg"
        >
          <p className="text-sm text-yellow-800">You have unsaved changes</p>
          <div className="flex space-x-2 mt-2">
            <Button size="sm" onClick={handleSave}>Save</Button>
            <Button size="sm" variant="outline" onClick={() => setHasChanges(false)}>Discard</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}