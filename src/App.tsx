import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Placeholder routes for future pages */}
          <Route path="/marketplace" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Marketplace - Coming Soon</h1></div>} />
          <Route path="/food" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Food Delivery - Coming Soon</h1></div>} />
          <Route path="/services" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Services - Coming Soon</h1></div>} />
          <Route path="/cart" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Shopping Cart - Coming Soon</h1></div>} />
          <Route path="/orders" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">My Orders - Coming Soon</h1></div>} />
          <Route path="/register" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Register - Coming Soon</h1></div>} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;