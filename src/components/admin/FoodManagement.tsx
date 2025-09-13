import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { FoodItem } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const initialFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken and spices',
    price: 1200,
    category: 'Indian',
    imageUrl: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg',
    isAvailable: true,
    prepTime: 35,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 1450,
    category: 'Italian',
    imageUrl: 'https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg',
    isAvailable: true,
    prepTime: 20,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-24')
  },
  {
    id: '3',
    name: 'Beef Burger Deluxe',
    description: 'Juicy beef patty with lettuce, tomato, and cheese',
    price: 890,
    category: 'Fast Food',
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    isAvailable: true,
    prepTime: 15,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-26')
  }
];

export default function FoodManagement() {
  const [foodItems, setFoodItems] = useLocalStorage<FoodItem[]>('admin_food_items', initialFoodItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    prepTime: 0,
    isAvailable: true,
    imageUrl: ''
  });

  const categories = [...new Set(foodItems.map(item => item.category))];

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      prepTime: 0,
      isAvailable: true,
      imageUrl: ''
    });
    setShowModal(true);
  };

  const handleEditItem = (item: FoodItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      prepTime: item.prepTime,
      isAvailable: item.isAvailable,
      imageUrl: item.imageUrl
    });
    setShowModal(true);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      setFoodItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, updatedAt: new Date() }
          : item
      ));
    } else {
      const newItem: FoodItem = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setFoodItems(prev => [...prev, newItem]);
    }
    setShowModal(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this food item?')) {
      setFoodItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleAvailability = (id: string) => {
    setFoodItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, isAvailable: !item.isAvailable, updatedAt: new Date() }
        : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Food Management</h2>
          <p className="text-gray-600">Manage your food menu items</p>
        </div>
        <Button onClick={handleAddItem} leftIcon={<Plus className="w-4 h-4" />}>
          Add Food Item
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {filteredItems.length} of {foodItems.length} items
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <div className="aspect-square overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className="text-sm text-gray-500">{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-red-800">
                    KES {item.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.prepTime} min prep
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditItem(item)}
                    leftIcon={<Edit className="w-3 h-3" />}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant={item.isAvailable ? 'danger' : 'secondary'}
                    onClick={() => toggleAvailability(item.id)}
                  >
                    {item.isAvailable ? 'Disable' : 'Enable'}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteItem(item.id)}
                    leftIcon={<Trash2 className="w-3 h-3" />}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Edit Food Item' : 'Add Food Item'}
            </h3>
            
            <div className="space-y-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price (KES)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  required
                />
                <Input
                  label="Prep Time (min)"
                  type="number"
                  value={formData.prepTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, prepTime: Number(e.target.value) }))}
                  required
                />
              </div>
              
              <Input
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              />
              
              <Input
                label="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="isAvailable" className="ml-2 text-sm text-gray-700">
                  Available for ordering
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleSaveItem} className="flex-1">
                {editingItem ? 'Update' : 'Add'} Item
              </Button>
              <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}