import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { notification, clearNotification } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      <NavBar />

      {/* Cart Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#151515] border border-[#B49A75] text-[#F5F2EC] px-5 py-3.5 shadow-2xl flex items-center space-x-3 text-xs tracking-wider animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-[#B49A75]" />
          <span>{notification}</span>
          <button onClick={clearNotification} className="ml-2 hover:text-[#B49A75]">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
