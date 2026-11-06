import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount } = useCart();
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ARCHIVE', path: '/archive' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#292929] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="group flex flex-col">
          <span className="font-serif text-xl md:text-2xl tracking-[0.2em] font-medium text-[#F5F2EC] group-hover:text-[#B49A75] transition-colors">
            QUIET BATTLES<span className="text-xs align-top ml-1 text-[#B49A75]">™</span>
          </span>
          <span className="text-[9px] tracking-[0.35em] text-[#A5A5A5] uppercase font-sans">
            WEAR YOUR BATTLES
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs tracking-[0.25em] font-medium transition-colors relative py-1 ${
                  isActive ? 'text-[#B49A75]' : 'text-[#A5A5A5] hover:text-[#F5F2EC]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B49A75]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-6">
          {isAdmin ? (
            <Link
              to="/admin/dashboard"
              title="Admin CMS"
              className="hidden md:flex items-center space-x-1 text-xs tracking-widest text-[#B49A75] border border-[#B49A75]/30 px-3 py-1.5 hover:bg-[#B49A75]/10 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CMS</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              title="Admin Login"
              className="hidden lg:block text-[10px] tracking-widest text-[#A5A5A5]/60 hover:text-[#A5A5A5] transition-colors"
            >
              ADMIN
            </Link>
          )}

          <Link
            to="/cart"
            className="relative p-2 text-[#F5F2EC] hover:text-[#B49A75] transition-colors flex items-center"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B49A75] text-[#0B0B0B] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F5F2EC] p-2 hover:text-[#B49A75] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-[#0B0B0B] z-40 border-t border-[#292929] px-8 py-10 flex flex-col justify-between animate-fadeIn">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg tracking-[0.25em] text-[#F5F2EC] hover:text-[#B49A75] py-2 border-b border-[#292929]/50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="text-lg tracking-[0.25em] text-[#B49A75] py-2 border-b border-[#292929]/50 flex items-center justify-between"
            >
              <span>SHOPPING BAG</span>
              <span>({totalCount})</span>
            </Link>
          </div>

          <div className="pt-8 border-t border-[#292929]">
            <Link
              to={isAdmin ? '/admin/dashboard' : '/admin/login'}
              className="block text-xs tracking-widest text-[#A5A5A5] hover:text-[#B49A75] uppercase"
            >
              {isAdmin ? '→ Return to Admin CMS' : '→ Brand Owner & CMS Login'}
            </Link>
            <p className="text-[11px] text-[#A5A5A5]/60 mt-4 tracking-widest">
              © {new Date().getFullYear()} QUIET BATTLES™
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;

