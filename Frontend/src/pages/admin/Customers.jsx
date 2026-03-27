import React, { useState } from 'react';
import { Search, MapPin, Mail, Phone, MoreVertical } from 'lucide-react';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([
    { id: 'CUS-001', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '+1 (555) 123-4567', location: 'New York, NY', orders: 4, spent: 5420.50, joined: '2025-11-12' },
    { id: 'CUS-002', name: 'David Smith', email: 'david.smith99@example.com', phone: '+1 (555) 987-6543', location: 'Austin, TX', orders: 1, spent: 475.50, joined: '2026-02-28' },
    { id: 'CUS-003', name: 'Emma Watson', email: 'emma.w@example.com', phone: '+44 20 7123 4567', location: 'London, UK', orders: 7, spent: 12450.00, joined: '2024-05-15' },
    { id: 'CUS-004', name: 'Michael Chen', email: 'm.chen.design@example.com', phone: '+1 (415) 555-0198', location: 'San Francisco, CA', orders: 2, spent: 1698.00, joined: '2026-01-05' },
    { id: 'CUS-005', name: 'Sarah Miller', email: 'smiller@company.com', phone: '+1 (312) 555-7890', location: 'Chicago, IL', orders: 0, spent: 0, joined: '2026-03-20' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <h2 className="text-xl font-bold font-serif">Customer Directory</h2>
        <div className="relative w-full md:w-80">
           <input 
             type="text" 
             placeholder="Search customers by name or email..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm shadow-sm focus:border-black outline-none" 
           />
           <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500">ID: {customer.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center gap-2 mb-1"><Mail className="w-3 h-3 text-gray-400"/> {customer.email}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2"><Phone className="w-3 h-3 text-gray-400"/> {customer.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center gap-2"><MapPin className="w-3 h-3 text-gray-400"/> {customer.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                  {customer.orders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  ${customer.spent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                   {customer.joined}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
