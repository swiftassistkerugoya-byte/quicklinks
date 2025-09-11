import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ children, className = '', hover = true, ...props }: CardProps) {
  const Component = hover ? motion.div : 'div';
  
  const motionProps = hover ? {
    whileHover: { y: -4, shadow: '0 10px 25px rgba(0,0,0,0.1)' },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...(hover ? motionProps : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
}