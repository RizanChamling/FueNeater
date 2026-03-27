import React from 'react';
import { DollarSign, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$24,590', trend: '+12.5%', icon: <DollarSign className="w-6 h-6 text-green-600" /> },
    { title: 'Active Orders', value: '34', trend: '+5.2%', icon: <ShoppingCart className="w-6 h-6 text-blue-600" /> },
    { title: 'Total Products', value: '112', trend: '+2.1%', icon: <Package className="w-6 h-6 text-orange-600" /> },
    { title: 'New Customers', value: '89', trend: '+18.2%', icon: <Users className="w-6 h-6 text-purple-600" /> },
  ];

  return (
    <div className="space-y-8">
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold font-serif text-gray-900">{stat.value}</h3>
              <div className="flex items-center mt-2 text-xs font-bold text-green-600 bg-green-50 w-max px-2 py-0.5 rounded">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.trend}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table Component */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold font-serif text-gray-900">Recent Custom Orders</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#ORD-7023', user: 'Alex Bowman', type: 'Custom Desk', amt: 890, stat: 'Processing' },
                  { id: '#ORD-7022', user: 'Maria Garcia', type: 'Readymade Sofa', amt: 1290, stat: 'Shipped' },
                  { id: '#ORD-7021', user: 'Sam Smith', type: 'Custom Table', amt: 540, stat: 'Delivered' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-4 font-mono text-gray-900 font-medium">{row.id}</td>
                    <td className="px-4 py-4 text-gray-600">{row.user}</td>
                    <td className="px-4 py-4 text-gray-600">{row.type}</td>
                    <td className="px-4 py-4 text-right font-bold">${row.amt}</td>
                    <td className="px-4 py-4 text-right">
                       <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                         row.stat === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                         row.stat === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                       }`}>
                         {row.stat}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Materials Chart Mockup */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
           <h3 className="text-lg font-bold font-serif text-gray-900 mb-6">Popular Finishes</h3>
           <div className="space-y-4">
              {[
                { name: 'Premium Oak', pct: 45, color: 'bg-amber-600' },
                { name: 'Dark Walnut', pct: 30, color: 'bg-amber-900' },
                { name: 'Matte Black', pct: 15, color: 'bg-gray-900' },
                { name: 'White Ash', pct: 10, color: 'bg-gray-300' },
              ].map(item => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <span className="font-bold text-gray-900">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
