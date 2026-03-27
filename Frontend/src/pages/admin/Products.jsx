import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Tag, ShieldCheck, DownloadCloud, X } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([
    { id: '1001', name: 'Velvet Cloud Sofa', category: 'Readymade', type: 'Sofa', price: 1290, stock: 14, status: 'Active' },
    { id: '1002', name: 'Nordic Lounge Chair', category: 'Customizable', type: 'Chair', price: 450, stock: 'Infinite', status: 'Active' },
    { id: '1003', name: 'Oak Reading Table', category: 'Readymade', type: 'Table', price: 320, stock: 4, status: 'Low Stock' },
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: 'Readymade', type: 'Sofa', price: '', stock: '', status: 'Active' });

  // Handlers
  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', category: 'Readymade', type: 'Sofa', price: '', stock: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Math.floor(2000 + Math.random() * 9000).toString() }]);
    }
    setIsModalOpen(false);
  };

  // Filtering
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery);
    if (activeTab === 'All') return matchesSearch;
    return p.category === activeTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search products by Name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm shadow-sm focus:border-black outline-none transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
        
        <div className="flex space-x-3 w-full md:w-auto">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-colors flex-1 md:flex-none">
            <DownloadCloud className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold shadow-md hover:bg-gray-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex-1 md:flex-none"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto hide-scrollbar">
        <nav className="flex space-x-8 min-w-max">
          <button 
            onClick={() => setActiveTab('All')}
            className={`py-4 px-1 text-sm font-bold flex items-center gap-2 border-b-2 ${activeTab === 'All' ? 'border-black text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <PackageIcon className="w-4 h-4" /> All Inventory
          </button>
          <button 
            onClick={() => setActiveTab('Customizable')}
            className={`py-4 px-1 text-sm font-bold flex items-center gap-2 border-b-2 ${activeTab === 'Customizable' ? 'border-black text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <ShieldCheck className="w-4 h-4" /> Customizable Templates
          </button>
          <button 
            onClick={() => setActiveTab('Readymade')}
            className={`py-4 px-1 text-sm font-bold flex items-center gap-2 border-b-2 ${activeTab === 'Readymade' ? 'border-black text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Tag className="w-4 h-4" /> Fixed Readymade
          </button>
        </nav>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product Info</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Base Price</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Inventory</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8 text-gray-500">No products found.</td></tr>
            ) : filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 shrink-0 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-400 overflow-hidden border border-gray-200">
                       IMG
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">ID: #{product.id} • {product.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${product.category === 'Customizable' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  ${product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${product.status === 'Active' ? 'bg-green-100 text-green-800' : product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleOpenModal(product)} className="text-gray-400 hover:text-black transition-colors mr-3" title="Edit Product"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete Product"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Product Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-black outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-black outline-none">
                    <option>Readymade</option>
                    <option>Customizable</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Type</label>
                  <input required type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-black outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Base Price ($)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-black outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Stock</label>
                  <input required type="text" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-black outline-none" placeholder="e.g. 14 or 'Infinite'" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-black outline-none">
                  <option>Active</option>
                  <option>Low Stock</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold text-sm bg-black text-white hover:bg-gray-800 shadow-lg">{editingProduct ? 'Save Changes' : 'Create Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const PackageIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;

export default AdminProducts;
