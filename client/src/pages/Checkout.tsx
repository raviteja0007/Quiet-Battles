import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { CheckCircle2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : 'Marcus',
    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : 'Vance',
    email: user?.email || 'marcus@quietbattles.com',
    address: '445 Lafayette Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10003',
    country: 'United States',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const orderPayload = {
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
        customerEmail: formData.email,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`,
        totalAmount: subtotal,
        items: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const res = await api.post('/orders', orderPayload);
      setCompletedOrder(res.data);
      clearCart();
    } catch (err: any) {
      console.error('Order creation failed', err);
      setErrorMessage(err.response?.data?.error || 'Failed to place demonstration order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC] pt-36 pb-24 px-6 md:px-12 flex items-center justify-center">
        <div className="max-w-2xl w-full border border-[#B49A75] bg-[#121212] p-8 md:p-14 text-center space-y-8 animate-fadeIn">
          <CheckCircle2 className="w-16 h-16 text-[#B49A75] mx-auto stroke-[1.2]" />

          <div className="space-y-3">
            <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block">
              ACQUISITION CONFIRMED
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-[#F5F2EC]">
              WEAR YOUR BATTLES.
            </h1>
            <p className="text-xs tracking-widest text-[#A5A5A5] pt-1">
              ORDER IDENTIFIER: <span className="text-[#F5F2EC] font-mono font-medium">{completedOrder.id}</span>
            </p>
          </div>

          <div className="border-y border-[#292929] py-6 text-xs text-[#A5A5A5] leading-relaxed space-y-2 text-left">
            <p><span className="text-[#F5F2EC]">Recipient:</span> {completedOrder.customerName}</p>
            <p><span className="text-[#F5F2EC]">Dispatch To:</span> {completedOrder.shippingAddress}</p>
            <p><span className="text-[#F5F2EC]">Total Valued:</span> ${completedOrder.totalAmount?.toFixed(2)} USD (Paid Demo)</p>
            <p className="text-[11px] text-[#B49A75] pt-2">
              * A simulated confirmation has been recorded in the database. You can review this live entry in the Admin CMS Order Management console.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/archive"
              className="px-8 py-3.5 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase transition-colors"
            >
              RETURN TO ARCHIVE
            </Link>
            <Link
              to="/admin/orders"
              className="px-8 py-3.5 border border-[#292929] hover:border-[#B49A75] text-xs tracking-[0.25em] text-[#F5F2EC] uppercase transition-colors"
            >
              VIEW IN ADMIN CMS
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC] flex flex-col items-center justify-center px-6 text-center pt-24">
        <ShoppingBag className="w-12 h-12 text-[#B49A75] mb-4 stroke-[1.2]" />
        <h1 className="font-serif text-3xl text-[#F5F2EC] mb-2">NO ITEMS TO DISPATCH</h1>
        <p className="text-xs text-[#A5A5A5] tracking-wider mb-6">Your shopping bag is empty.</p>
        <Link
          to="/archive"
          className="px-8 py-3.5 bg-[#B49A75] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase"
        >
          EXPLORE THE ARCHIVE
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="border-b border-[#292929] pb-6">
          <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
            DEMONSTRATION DISPATCH
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#F5F2EC]">
            CHECKOUT ACQUISITION
          </h1>
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs tracking-wider">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Customer & Shipping Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
            <div className="border border-[#292929] bg-[#121212] p-8 space-y-6">
              <h2 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold border-b border-[#292929] pb-3">
                01. RECIPIENT INFORMATION
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                />
              </div>
            </div>

            <div className="border border-[#292929] bg-[#121212] p-8 space-y-6">
              <h2 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold border-b border-[#292929] pb-3">
                02. SHIPPING SPECIFICATIONS
              </h2>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                    State / Region
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border border-[#292929] bg-[#121212] p-6 flex items-start space-x-3 text-xs text-[#A5A5A5]">
              <ShieldCheck className="w-5 h-5 text-[#B49A75] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#F5F2EC] font-medium uppercase tracking-wider mb-1">
                  Demonstration Protocol
                </p>
                <p>
                  No real credit card will be charged. Clicking "Confirm Acquisition" writes a verified demonstration order directly to PostgreSQL.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase transition-colors shadow-xl flex items-center justify-center space-x-2"
            >
              <span>{isSubmitting ? 'TRANSMITTING ORDER...' : `CONFIRM ACQUISITION — $${subtotal.toFixed(2)} USD`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Order Summary Column */}
          <div className="lg:col-span-5">
            <div className="border border-[#292929] bg-[#121212] p-8 space-y-6 sticky top-28">
              <h2 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold border-b border-[#292929] pb-3">
                SUMMARY OF GARMENTS
              </h2>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center justify-between text-xs border-b border-[#292929]/50 pb-3">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-14 object-cover border border-[#292929]" />
                      <div>
                        <p className="font-serif text-[#F5F2EC]">{item.name}</p>
                        <p className="text-[#A5A5A5] text-[11px]">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-serif text-[#B49A75]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#292929] pt-4 space-y-2 text-xs text-[#A5A5A5]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#F5F2EC] font-serif">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Archival Courier</span>
                  <span className="text-[#B49A75]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 text-[#F5F2EC] text-sm">
                  <span>Total</span>
                  <span className="font-serif text-xl text-[#B49A75]">${subtotal.toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

