import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  Layers,
  BookOpen,
  Shirt,
  ShoppingBag,
  DollarSign,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs tracking-widest text-[#B49A75]">
        GATHERING SYSTEM METRICS...
      </div>
    );
  }

  const statCards = [
    { label: 'TOTAL SERIES', value: stats?.totalSeries || 0, icon: Layers, link: '/admin/series' },
    { label: 'TOTAL CHAPTERS', value: stats?.totalChapters || 0, icon: BookOpen, link: '/admin/chapters' },
    { label: 'TOTAL PRODUCTS', value: stats?.totalProducts || 0, icon: Shirt, link: '/admin/products' },
    { label: 'TOTAL ORDERS', value: stats?.totalOrders || 0, icon: ShoppingBag, link: '/admin/orders' },
    { label: 'TOTAL REVENUE', value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`, icon: DollarSign, link: '/admin/orders' },
  ];

  return (
    <div className="space-y-12">
      {/* Overview Heading */}
      <div className="border-b border-[#292929] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
            CONTROL CENTER
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
            ATELIER CMS OVERVIEW
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-xs tracking-wider text-[#A5A5A5] flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PRODUCTION SYSTEM LIVE</span>
          </div>
          <button
            onClick={async () => {
              if (window.confirm('Reload and verify demonstration records?')) {
                await api.post('/stats/reset-demo');
                window.location.reload();
              }
            }}
            className="text-[10px] tracking-widest text-[#B49A75] border border-[#B49A75]/40 px-3 py-1 hover:bg-[#B49A75]/10 uppercase transition-colors"
          >
            VERIFY DEMO DATA
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className="border border-[#292929] bg-[#121212] p-6 space-y-4 hover:border-[#B49A75]/60 transition-colors group"
            >
              <div className="flex items-center justify-between text-[#A5A5A5]">
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
                  {card.label}
                </span>
                <Icon className="w-4 h-4 text-[#B49A75]" />
              </div>
              <div className="font-serif text-3xl text-[#F5F2EC] group-hover:text-[#B49A75] transition-colors">
                {card.value}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity / Recent Orders */}
      <div className="border border-[#292929] bg-[#121212] p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#292929] pb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-[#B49A75]" />
            <h2 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold">
              RECENT COMMERCE ACTIVITY
            </h2>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs text-[#B49A75] hover:text-[#F5F2EC] tracking-wider uppercase flex items-center space-x-1"
          >
            <span>VIEW ALL ORDERS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats?.recentOrders?.length === 0 ? (
          <p className="text-xs text-[#A5A5A5] py-6 text-center">No recent order transactions recorded.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-wider">
              <thead>
                <tr className="border-b border-[#292929] text-[#A5A5A5]">
                  <th className="py-3 font-medium">ORDER ID</th>
                  <th className="py-3 font-medium">CUSTOMER</th>
                  <th className="py-3 font-medium">DATE</th>
                  <th className="py-3 font-medium">AMOUNT</th>
                  <th className="py-3 font-medium">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]/50">
                {stats?.recentOrders?.map((order: any) => (
                  <tr key={order.id} className="hover:bg-[#151515] transition-colors">
                    <td className="py-3.5 font-mono text-[#A5A5A5]">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="py-3.5 text-[#F5F2EC] font-medium">
                      {order.customerName}
                    </td>
                    <td className="py-3.5 text-[#A5A5A5]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 font-serif text-[#B49A75]">
                      ${order.totalAmount?.toFixed(2)}
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/series"
          className="border border-[#292929] bg-[#121212] p-6 space-y-2 hover:border-[#B49A75] transition-colors"
        >
          <h3 className="font-serif text-xl text-[#F5F2EC]">Curate Series</h3>
          <p className="text-xs text-[#A5A5A5] leading-relaxed">
            Create or edit collection master releases and cover photography.
          </p>
        </Link>
        <Link
          to="/admin/chapters"
          className="border border-[#292929] bg-[#121212] p-6 space-y-2 hover:border-[#B49A75] transition-colors"
        >
          <h3 className="font-serif text-xl text-[#F5F2EC]">Draft Chapters</h3>
          <p className="text-xs text-[#A5A5A5] leading-relaxed">
            Write long-form storytelling narratives and assign them to collections.
          </p>
        </Link>
        <Link
          to="/admin/products"
          className="border border-[#292929] bg-[#121212] p-6 space-y-2 hover:border-[#B49A75] transition-colors"
        >
          <h3 className="font-serif text-xl text-[#F5F2EC]">Manage Inventory</h3>
          <p className="text-xs text-[#A5A5A5] leading-relaxed">
            Configure product pricing, available sizes, image galleries, and stock.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

