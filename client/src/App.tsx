import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Archive from './pages/Archive';
import SeriesPage from './pages/Series/[slug]';
import ChapterPage from './pages/Chapter/[slug]';
import ProductPage from './pages/Product/[slug]';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin CMS Pages
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import SeriesManagement from './admin/SeriesManagement';
import ChapterManagement from './admin/ChapterManagement';
import ProductManagement from './admin/ProductManagement';
import MediaManagement from './admin/MediaManagement';
import OrderManagement from './admin/OrderManagement';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Brand Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/archive/:seriesSlug" element={<SeriesPage />} />
              <Route path="/archive/:seriesSlug/:chapterSlug" element={<ChapterPage />} />
              <Route path="/product/:productSlug" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin CMS Routes */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/series" element={<SeriesManagement />} />
              <Route path="/admin/chapters" element={<ChapterManagement />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/media" element={<MediaManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
