import { Product, FoodItem, Order, ServiceRequest, Employee, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Latest flagship smartphone with AI features and S Pen',
    price: 129999,
    stock: 25,
    category: 'Smartphones',
    imageUrl: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'MacBook Pro M3 16"',
    description: 'Powerful laptop for professionals with M3 chip',
    price: 299999,
    stock: 12,
    category: 'Laptops',
    imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '3',
    name: 'LG OLED 65" Smart TV',
    description: '4K Ultra HD Smart TV with webOS and AI ThinQ',
    price: 189999,
    stock: 8,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg',
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise-canceling wireless headphones',
    price: 24999,
    stock: 45,
    category: 'Audio',
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '5',
    name: 'HP Pavilion Gaming Desktop',
    description: 'High-performance desktop for gaming and work',
    price: 89999,
    stock: 15,
    category: 'Computers',
    imageUrl: 'https://images.pexels.com/photos/2148222/pexels-photo-2148222.jpeg',
    isActive: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '6',
    name: 'Samsung Smart Refrigerator',
    description: 'French door refrigerator with smart features',
    price: 159999,
    stock: 6,
    category: 'Appliances',
    imageUrl: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg',
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-19')
  }
];

export const mockFoodItems: FoodItem[] = [
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
  },
  {
    id: '4',
    name: 'Vegetable Stir Fry',
    description: 'Fresh mixed vegetables in savory sauce with rice',
    price: 750,
    category: 'Asian',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    isAvailable: true,
    prepTime: 18,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-23')
  },
  {
    id: '5',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with roasted vegetables',
    price: 1850,
    category: 'Seafood',
    imageUrl: 'https://images.pexels.com/photos/1179442/pexels-photo-1179442.jpeg',
    isAvailable: true,
    prepTime: 25,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-27')
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 650,
    category: 'Desserts',
    imageUrl: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    isAvailable: true,
    prepTime: 12,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-28')
  }
];

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'James Mwangi',
    email: 'james@quicklinkservices.com',
    phone: '0712345678',
    role: 'driver',
    isActive: true,
    rating: 4.8,
    totalJobs: 234,
    joinedAt: new Date('2023-06-15'),
    skills: ['Navigation', 'Customer Service', 'Time Management']
  },
  {
    id: '2',
    name: 'Mary Wanjiku',
    email: 'mary@quicklinkservices.com',
    phone: '0723456789',
    role: 'delivery',
    isActive: true,
    rating: 4.9,
    totalJobs: 189,
    joinedAt: new Date('2023-08-22'),
    skills: ['Fast Delivery', 'Package Handling', 'Route Optimization']
  },
  {
    id: '3',
    name: 'Peter Kiprotich',
    email: 'peter@quicklinkservices.com',
    phone: '0734567890',
    role: 'cleaner',
    isActive: true,
    rating: 4.7,
    totalJobs: 156,
    joinedAt: new Date('2023-09-10'),
    skills: ['Deep Cleaning', 'Laundry', 'Organization']
  },
  {
    id: '4',
    name: 'Grace Akinyi',
    email: 'grace@quicklinkservices.com',
    phone: '0745678901',
    role: 'admin',
    isActive: true,
    rating: 4.9,
    totalJobs: 0,
    joinedAt: new Date('2023-05-01'),
    skills: ['Management', 'Customer Relations', 'Operations']
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    customerId: 'cust1',
    customerName: 'John Doe',
    customerPhone: '0701234567',
    customerEmail: 'john@example.com',
    items: [
      {
        id: '1',
        productId: '1',
        quantity: 1,
        price: 129999,
        name: 'Samsung Galaxy S24 Ultra',
        imageUrl: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'
      }
    ],
    totalAmount: 129999,
    status: 'pending',
    orderType: 'product',
    deliveryAddress: 'Westlands, Nairobi',
    paymentMethod: 'mpesa',
    paymentStatus: 'pending',
    createdAt: new Date('2025-01-15T10:30:00'),
    updatedAt: new Date('2025-01-15T10:30:00')
  },
  {
    id: 'ORD-2025-002',
    customerId: 'cust2',
    customerName: 'Jane Smith',
    customerPhone: '0712345678',
    customerEmail: 'jane@example.com',
    items: [
      {
        id: '2',
        foodId: '1',
        quantity: 2,
        price: 1200,
        name: 'Chicken Biryani',
        imageUrl: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg'
      }
    ],
    totalAmount: 2400,
    status: 'delivered',
    orderType: 'food',
    deliveryAddress: 'Karen, Nairobi',
    paymentMethod: 'mpesa',
    paymentStatus: 'paid',
    assignedTo: '2',
    createdAt: new Date('2025-01-14T15:45:00'),
    updatedAt: new Date('2025-01-14T17:20:00')
  }
];

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'REQ-2025-001',
    customerId: 'cust3',
    customerName: 'Michael Johnson',
    customerPhone: '0723456789',
    customerEmail: 'michael@example.com',
    serviceType: 'taxi',
    title: 'Airport Pickup',
    description: 'Need pickup from JKIA to Westlands',
    pickupLocation: 'Jomo Kenyatta International Airport',
    dropoffLocation: 'Westlands, Nairobi',
    scheduledDate: new Date('2025-01-16T08:00:00'),
    budget: 3000,
    status: 'assigned',
    assignedTo: '1',
    createdAt: new Date('2025-01-15T20:15:00'),
    updatedAt: new Date('2025-01-15T20:30:00')
  },
  {
    id: 'REQ-2025-002',
    customerId: 'cust4',
    customerName: 'Sarah Wilson',
    customerPhone: '0734567890',
    customerEmail: 'sarah@example.com',
    serviceType: 'cleaning',
    title: 'House Deep Cleaning',
    description: 'Need thorough cleaning for 3-bedroom apartment',
    scheduledDate: new Date('2025-01-17T09:00:00'),
    budget: 5000,
    status: 'completed',
    assignedTo: '3',
    createdAt: new Date('2025-01-12T11:20:00'),
    updatedAt: new Date('2025-01-17T14:45:00'),
    completedAt: new Date('2025-01-17T14:45:00')
  }
];