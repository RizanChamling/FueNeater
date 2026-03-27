import React, { useState } from 'react';
import { Save, ShieldCheck, CreditCard, Bell } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const { addToast } = useToast();
  
  const handleSave = (e) => {
    e.preventDefault();
    addToast('Settings Saved', 'Your store configuration has been successfully updated.', 'success');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Store Settings</h2>
        <button onClick={handleSave} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-gray-800 transition-colors">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar nav */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {[
            { id: 'General', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'Notifications', icon: <Bell className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.id}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          
          {activeTab === 'General' && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Store Profile</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Store Name</label>
                    <input type="text" defaultValue="FurNeater" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Support Email</label>
                    <input type="email" defaultValue="support@furneater.com" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Store Address</label>
                    <textarea defaultValue="123 Furniture Way\nDesign District, NY 10001" rows={3} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Payments' && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">eSewa API Configuration</h3>
                <p className="text-sm text-gray-500 mb-6">Configure your active eSewa merchant credentials. These keys process real-world checkout transactions for your store.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Merchant Code</label>
                    <input type="text" defaultValue="EPAYTEST" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Secret Key</label>
                    <input type="password" defaultValue="8gBm/:&EnhH.1/q" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black font-mono" />
                  </div>
                  <div className="flex items-center gap-3 mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <input type="checkbox" id="testmode" defaultChecked className="w-4 h-4 accent-black" />
                    <label htmlFor="testmode" className="text-sm font-medium text-yellow-800">Enable Sandbox/Test Mode</label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold mb-4">Email Alerts</h3>
              <div className="space-y-4">
                {[
                  'New Order Received',
                  'Customer Account Created',
                  'Inventory Low Stock Warning',
                  'Daily Revenue Report'
                ].map(alert => (
                  <div key={alert} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-sm font-medium text-gray-700">{alert}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
