import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Calendar, Package, ChevronRight, ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-500">View and track all your FurNeater masterpieces.</p>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-500 mb-8">You haven't placed any orders yet. Start creating your dream space today!</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
            >
              Browse Shop <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-gray-100 rounded-xl">
                      <Package className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-400">Order</span>
                        <span className="text-lg font-bold text-gray-900">#{order.id}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order.status === 'paid' ? 'bg-green-50 text-green-600' : 
                          order.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-500'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-widest">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">${order.total_amount}</span>
                  </div>
                </div>

                <div className="p-6 md:px-8 py-4 bg-gray-50/30 flex justify-between items-center">
                  <div className="flex -space-x-3 overflow-hidden">
                    {/* Placeholder for item thumbnails if available */}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                      I
                    </div>
                  </div>
                  <Link 
                    to={`/orders/${order.id}`}
                    className="text-sm font-bold text-black flex items-center gap-2 hover:underline"
                  >
                    View Details <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-8 bg-black text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-1">Need help with an order?</h3>
            <p className="text-gray-400">Our support team is available 24/7 to assist you.</p>
          </div>
          <button className="relative z-10 px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800/50 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
