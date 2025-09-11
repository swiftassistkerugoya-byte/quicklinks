import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Package, 
  Clock, 
  Shield, 
  Phone,
  Truck,
  Smartphone,
  Laptop,
  Shirt,
  Home as HomeIcon
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const services = [
  {
    id: 1,
    title: 'Taxi Services',
    description: 'Reliable transportation anywhere in the city',
    icon: Car,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Grocery Shopping',
    description: 'We shop for your groceries and deliver to your door',
    icon: ShoppingBag,
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Laundry Services',
    description: 'Professional laundry and dry cleaning services',
    icon: Shirt,
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'House Cleaning',
    description: 'Thorough cleaning services for your home or office',
    icon: HomeIcon,
    color: 'bg-orange-500'
  },
  {
    id: 5,
    title: 'General Delivery',
    description: 'Fast and secure delivery of packages and documents',
    icon: Package,
    color: 'bg-red-500'
  },
  {
    id: 6,
    title: 'Food Delivery',
    description: 'Fresh meals delivered hot to your location',
    icon: Utensils,
    color: 'bg-yellow-500'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Samsung Galaxy S24',
    price: 89999,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    category: 'Smartphones'
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    price: 199999,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
    category: 'Laptops'
  },
  {
    id: 3,
    name: 'LG Smart TV 55"',
    price: 65999,
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg',
    category: 'Electronics'
  },
  {
    id: 4,
    name: 'Sony Headphones',
    price: 12999,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    category: 'Audio'
  }
];

const foodItems = [
  {
    id: 1,
    name: 'Chicken Biryani',
    price: 850,
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg',
    prepTime: 30
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    price: 1200,
    image: 'https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg',
    prepTime: 25
  },
  {
    id: 3,
    name: 'Beef Burger',
    price: 650,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    prepTime: 15
  },
  {
    id: 4,
    name: 'Vegetable Stir Fry',
    price: 550,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    prepTime: 20
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-800 via-red-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              QUICKLINK <span className="text-yellow-400">SERVICES</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Your Time, Our Priority
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              From electronics and appliances to food delivery and personal errands, 
              we're your one-stop solution for everything you need.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link to="/services">
                <Button size="lg" variant="primary" className="w-full">
                  <Package className="mr-2" />
                  Book a Service
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="secondary" className="w-full">
                  <ShoppingBag className="mr-2" />
                  Shop Products
                </Button>
              </Link>
              <Link to="/food">
                <Button size="lg" variant="outline" className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                  <Utensils className="mr-2" />
                  Order Food
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="ghost" className="w-full text-white hover:bg-white hover:text-red-800">
                  <Phone className="mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose QuickLink?</h2>
            <p className="text-lg text-gray-600">We make your life easier with reliable, fast, and affordable services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Quick turnaround times with dependable service you can count on</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your items and information are protected with our secure processes</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for all your needs</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive solutions for all your daily needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <Link to="/services">
                        <Button variant="outline">Request Service</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600">Quality electronics and appliances at great prices</p>
            </div>
            <Link to="/marketplace">
              <Button rightIcon={<ShoppingBag className="w-4 h-4" />}>
                View All Products
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-red-800">
                        KES {product.price.toLocaleString()}
                      </span>
                      <Button size="sm">Shop Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Food */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Food Items</h2>
              <p className="text-gray-600">Fresh, delicious meals delivered to your doorstep</p>
            </div>
            <Link to="/food">
              <Button rightIcon={<Utensils className="w-4 h-4" />}>
                View Menu
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.prepTime}m
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-red-800">
                        KES {item.price}
                      </span>
                      <Button size="sm">Order Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-red-100">
              Join thousands of satisfied customers who trust QuickLink Services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-lg">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span>Call: 0111679286 / 0717562660</span>
              </div>
              <span className="hidden sm:block text-yellow-400">|</span>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}