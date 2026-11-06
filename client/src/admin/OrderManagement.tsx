import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ShoppingBag, Eye, X, CheckCircle2, Clock } from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const fetchOrders = () => {
    setLoading(true);
    api.get('/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetails = async (id: string) => {
    try {
      const res = await api.get(`/orders/${id}`);
      setSelectedOrder(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to fetch order details');
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/orders/${id}`, { orderStatus: status });
      fetchOrders();
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder({ ...selectedOrder, orderStatus: status });
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update order status');
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[#292929] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
            COMMERCE FULFILLMENT
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
            ORDER MANAGEMENT
          </h1>
        </div>
      </div>

      <div className="border border-[#292929] bg-[#121212] overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs tracking-widest text-[#B49A75]">
            RETRIEVING ORDER DISPATCHES...
          </div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#A5A5A5]">
            No order dispatches have been registered yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-wider">
              <thead>
                <tr className="border-b border-[#292929] text-[#A5A5A5] bg-[#0E0E0E]">
                  <th className="p-4 font-medium">IDENTIFIER</th>
                  <th className="p-4 font-medium">CUSTOMER</th>
                  <th className="p-4 font-medium">EMAIL</th>
                  <th className="p-4 font-medium">DATE</th>
                  <th className="p-4 font-medium">TOTAL</th>
                  <th className="p-4 font-medium">STATUS</th>
                  <th className="p-4 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#151515] transition-colors">
                    <td className="p-4 font-mono text-[11px] text-[#A5A5A5]">
                      {o.id.slice(0, 8)}...
                    </td>
                    <td className="p-4 text-[#F5F2EC] font-medium">
                      {o.customerName}
                    </td>
                    <td className="p-4 text-[#A5A5A5]">
                      {o.customerEmail}
                    </td>
                    <td className="p-4 text-[#A5A5A5]">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-serif text-[#B49A75]">
                      ${o.totalAmount?.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        className="bg-[#0B0B0B] border border-[#292929] px-2.5 py-1 text-[11px] text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleViewDetails(o.id)}
                        className="p-1.5 text-[#B49A75] hover:text-[#F5F2EC] transition-colors"
                        title="View Full Order Breakdown"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-2xl w-full border border-[#292929] bg-[#121212] p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#292929] pb-4">
              <div>
                <span className="text-[10px] tracking-widest text-[#B49A75] uppercase block">
                  ORDER DETAILS
                </span>
                <h2 className="font-serif text-2xl text-[#F5F2EC]">
                  ID: {selectedOrder.id}
                </h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#A5A5A5] hover:text-[#F5F2EC]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#0B0B0B] p-4 border border-[#292929]">
              <div>
                <p className="text-[#A5A5A5]">Customer Name:</p>
                <p className="text-[#F5F2EC] font-medium">{selectedOrder.customerName}</p>
              </div>
              <div>
                <p className="text-[#A5A5A5]">Customer Email:</p>
                <p className="text-[#F5F2EC] font-medium">{selectedOrder.customerEmail}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-[#292929]">
                <p className="text-[#A5A5A5]">Shipping Destination:</p>
                <p className="text-[#F5F2EC]">{selectedOrder.shippingAddress}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs tracking-widest text-[#F5F2EC] uppercase font-semibold">
                ACQUIRED GARMENTS
              </h3>
              <div className="border border-[#292929] divide-y divide-[#292929] bg-[#0B0B0B]">
                {selectedOrder.items?.map((item: any) => (
                  <div key={item.id} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-serif text-[#F5F2EC] text-sm">{item.productName}</p>
                      <p className="text-[#A5A5A5] text-[11px]">Size: {item.size} · Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-serif text-[#B49A75]">${(item.price * item.quantity).toFixed(2)} USD</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 text-sm">
              <span className="text-xs tracking-widest text-[#A5A5A5] uppercase">Total Order Value:</span>
              <span className="font-serif text-2xl text-[#B49A75]">${selectedOrder.totalAmount?.toFixed(2)} USD</span>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-[#B49A75] text-[#0B0B0B] text-xs uppercase tracking-wider font-semibold hover:bg-[#F5F2EC]"
              >
                CLOSE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

