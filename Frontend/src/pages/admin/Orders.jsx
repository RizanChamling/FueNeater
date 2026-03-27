import React, { useState } from 'react';
import { Search, ChevronDown, CheckCircle, Package, Truck, Clock } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-5X9Q', customer: 'Alice Johnson', date: '2026-03-21', total: 1290, status: 'Pending', items: 1, type: 'Readymade' },
    { id: 'ORD-2M4L', customer: 'David Smith', date: '2026-03-20', total: 475.50, status: 'Processing', items: 1, type: 'Custom Customization' },
    { id: 'ORD-9R1P', customer: 'Emma Watson', date: '2026-03-19', total: 2450, status: 'Shipped', items: 3, type: 'Mixed' },
    { id: 'ORD-1K8J', customer: 'Michael Chen', date: '2026-03-15', total: 849, status: 'Delivered', items: 1, type: 'Readymade' },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pending Orders', count: orders.filter(o=>o.status==='Pending').length, icon: <Clock className="w-5 h-5 text-yellow-600"/>, bg: 'bg-yellow-50' },
          { label: 'In Production', count: orders.filter(o=>o.status==='Processing').length, icon: <Package className="w-5 h-5 text-blue-600"/>, bg: 'bg-blue-50' },
          { label: 'En Route', count: orders.filter(o=>o.status==='Shipped').length, icon: <Truck className="w-5 h-5 text-purple-600"/>, bg: 'bg-purple-50' },
          { label: 'Completed', count: orders.filter(o=>o.status==='Delivered').length, icon: <CheckCircle className="w-5 h-5 text-green-600"/>, bg: 'bg-green-50' },
        ].map(stat => (
          <div key={stat.label} className={`rounded-xl p-5 border border-gray-100 ${stat.bg} flex items-center gap-4`}>
             <div className="p-3 bg-white rounded-lg shadow-sm">{stat.icon}</div>
             <div>
               <div className="text-2xl font-bold">{stat.count}</div>
               <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
             </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-serif">Recent Orders</h2>
        <div className="relative w-64">
           <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm shadow-sm focus:border-black outline-none" />
           <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-mono text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">{order.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-full border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   <select 
                     value={order.status}
                     onChange={(e) => updateStatus(order.id, e.target.value)}
                     className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-bold px-2 py-1 outline-none"
                   >
                     <option>Pending</option>
                     <option>Processing</option>
                     <option>Shipped</option>
                     <option>Delivered</option>
                   </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminOrders;
