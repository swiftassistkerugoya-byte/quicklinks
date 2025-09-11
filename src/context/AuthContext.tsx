import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isEmployee: boolean;
  isCustomer: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token/session
    const checkAuth = async () => {
      try {
        // This would integrate with Firebase Auth
        const savedUser = localStorage.getItem('quicklink_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // This would integrate with Firebase Auth
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: '1',
        email,
        name: email === 'admin@quicklinkservices.com' ? 'Admin User' : 'Customer User',
        role: email === 'admin@quicklinkservices.com' ? 'admin' : 'customer',
        phone: '0111679286',
        createdAt: new Date(),
        isActive: true
      };
      
      setUser(mockUser);
      localStorage.setItem('quicklink_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quicklink_user');
  };

  const value = {
    user,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isEmployee: user?.role === 'employee',
    isCustomer: user?.role === 'customer',
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}