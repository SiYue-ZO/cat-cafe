'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { AIProvider } from '@/context/AIContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <AIProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AIProvider>
      </CartProvider>
    </AuthProvider>
  );
}
