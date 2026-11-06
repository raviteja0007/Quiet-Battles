import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  Shirt,
  Image as ImageIcon,
  ShoppingBag,
  ExternalLink,
  LogOut,
  Shield,
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !isLoginPage && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, loading, isLoginPage, navigate]);

  if (isLoginPage) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center text-[#B49A75] text-xs tracking-widest">
        VERIFYING PERMISSIONS...
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const navItems = [
    { name: 'OVERVIEW', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'SERIES', path: '/admin/series', icon: Layers },
    { name: 'CHAPTERS', path: '/admin/chapters', icon: BookOpen },
    { name: 'PRODUCTS', path: '/admin/products', icon: Shirt },
    { name: 'MEDIA', path: '/admin/media', icon: ImageIcon },
    { name: 'ORDERS', path: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111111] border-r border-[#292929] flex flex-col justify-between p-6">
        <div>
          {/* Admin Header */}
          <div className="pb-8 border-b border-[#292929]">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#B49A75]" />
              <span className="font-serif text-lg tracking-[0.15em] text-[#F5F2EC]">
                QB STUDIO CMS
              </span>
            </div>
            <p className="text-[10px] tracking-[0.25em] text-[#A5A5A5] uppercase mt-1">
              {user?.name || 'ADMINISTRATOR'}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 text-xs tracking-widest transition-all ${
                    isActive
                      ? 'bg-[#B49A75]/15 text-[#B49A75] border-r-2 border-[#B49A75]'
                      : 'text-[#A5A5A5] hover:text-[#F5F2EC] hover:bg-[#151515]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-[#292929] space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center space-x-2 text-xs tracking-wider text-[#A5A5A5] hover:text-[#B49A75] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>VIEW LIVE STORE</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center space-x-2 text-xs tracking-wider text-red-400 hover:text-red-300 transition-colors pt-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

