import React, { useEffect, useState } from 'react';
import { ShoppingCart, Heart, Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const products = [
   { id: 1, name: 'Velvet Cloud Sofa', category: 'Seating', price: 1290, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80', badge: 'Bestseller' },
   { id: 2, name: 'Danish Oak Dining Set', category: 'Tables', price: 1849, image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80', badge: 'New In' },
   { id: 3, name: 'Lounge Accent Chair', category: 'Seating', price: 420, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80', badge: null },
   { id: 4, name: 'Modular Library Wall', category: 'Storage', price: 2450, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80', badge: 'Architectural' },
   { id: 5, name: 'Minimalist Work Desk', category: 'Workspace', price: 580, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80', badge: null },
   { id: 6, name: 'Noir Oak Coffee Table', category: 'Tables', price: 390, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80', badge: 'Limited' },
   { id: 7, name: 'Scandi Platform Bed', category: 'Bedroom', price: 1100, image: 'https://images.thdstatic.com/productImages/07f0c19f-f2a3-4a0e-958e-873f9a4b8df8/svn/scandinavian-oak-camaflexi-platform-beds-md1410-64_1000.jpg', badge: null },
   { id: 8, name: 'Industrial Sideboard', category: 'Storage', price: 890, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80', badge: null },
   { id: 9, name: 'Bouclé Swivel Chair', category: 'Seating', price: 550, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80', badge: 'Trending' }
];

const categories = ['All', 'Seating', 'Tables', 'Storage', 'Workspace', 'Bedroom'];

const Shop = () => {
   const [activeCategory, setActiveCategory] = useState('All');
   const [filterOpen, setFilterOpen] = useState(false);
   const [sortBy, setSortBy] = useState('Featured');
   const [searchQuery, setSearchQuery] = useState('');
   const { addToCart, toggleFavorite, isFavorite } = useCart();
   const { user } = useAuth();
   const { addToast } = useToast();
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const params = new URLSearchParams(location.search);
      const q = params.get('q');
      const cat = params.get('category');
      if (q) setSearchQuery(q);
      if (cat) setActiveCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
   }, [location.search]);

   let filteredProducts = activeCategory === 'All'
      ? [...products]
      : products.filter(p => p.category === activeCategory);

   if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
         p.name.toLowerCase().includes(q) ||
         p.category.toLowerCase().includes(q)
      );
   }

   if (sortBy === 'Price: Low to High') {
      filteredProducts.sort((a, b) => a.price - b.price);
   } else if (sortBy === 'Price: High to Low') {
      filteredProducts.sort((a, b) => b.price - a.price);
   }

   const handleAddToCart = (product) => {
      if (!user) {
         addToast('Authentication Required', 'Please login to add items to your sanctuary.', 'info');
         navigate('/login', { state: { from: '/shop' } });
         return;
      }

      addToCart({
         id: `ready_${product.id}`,
         name: product.name,
         price: product.price,
         quantity: 1,
         image: product.image,
         customizations: null
      });
      addToast('Added to Cart', `${product.name} is now in your cart.`, 'success');
   };

   return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-48">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Editorial Header */}
            <div className="mb-24 space-y-8">
               <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                  <div className="space-y-6 max-w-2xl">
                     <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">The Readymade Series</span>
                     </div>
                     <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-900 tracking-tight leading-[0.9]">
                        Curated <br /> <span className="premium-gradient-text italic">Masterpieces.</span>
                     </h1>
                     <p className="text-xl text-gray-500 font-light leading-relaxed">
                        A selection of our most celebrated designs, hand-crafted and ready for immediate placement in your architectural space.
                     </p>
                  </div>

                  <div className="flex gap-4">
                     <div className="relative">
                        <input
                           type="text"
                           placeholder="Search collections..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full md:w-80 px-10 py-5 bg-white rounded-[2rem] border-none shadow-sm focus:ring-2 focus:ring-black/5 transition-all outline-none text-sm"
                        />
                        <Search className="w-4 h-4 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" />
                     </div>
                     <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="px-8 py-5 bg-white rounded-[2rem] shadow-sm flex items-center gap-3 text-xs font-bold uppercase tracking-widest relative"
                     >
                        <Filter className="w-4 h-4 text-gray-300" /> {sortBy}
                        {filterOpen && (
                           <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-gray-50 p-4 z-50">
                              {['Featured', 'Price: Low to High', 'Price: High to Low'].map(opt => (
                                 <button key={opt} onClick={() => { setSortBy(opt); setFilterOpen(false); }} className="w-full text-left p-3 hover:bg-gray-50 rounded-xl text-[10px] uppercase font-bold tracking-widest leading-none">
                                    {opt}
                                 </button>
                              ))}
                           </div>
                        )}
                     </button>
                  </div>
               </div>

               {/* Quick Categories */}
               <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {categories.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-black text-white shadow-xl scale-105' : 'bg-white text-gray-400 border border-gray-50 hover:border-gray-200'}`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
               {filteredProducts.map(product => (
                  <div key={product.id} className="luxury-card group flex flex-col">
                     <div className="relative aspect-[4/5] overflow-hidden">
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-1000 z-10" />
                        <img
                           src={product.image}
                           alt={product.name}
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        {product.badge && (
                           <div className="absolute top-8 left-8 z-20">
                              <span className="px-4 py-2 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full">{product.badge}</span>
                           </div>
                        )}
                        <button
                           onClick={() => toggleFavorite(product)}
                           className="absolute top-8 right-8 z-20 w-10 h-10 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all"
                        >
                           <Heart className={`w-4 h-4 ${isFavorite(`ready_${product.id}`) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                     </div>

                     <div className="p-10 space-y-6">
                        <div className="flex justify-between items-start">
                           <div>
                              <h3 className="text-2xl font-serif font-bold group-hover:premium-gradient-text transition-all">{product.name}</h3>
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mt-1">{product.category}</p>
                           </div>
                           <div className="text-xl font-bold text-gray-900">${product.price}</div>
                        </div>

                        <button
                           onClick={() => handleAddToCart(product)}
                           className="w-full py-5 bg-black text-white rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gray-800 shadow-xl transition-all active:scale-95"
                        >
                           <ShoppingCart className="w-4 h-4" /> Add to Sanctuary
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            {/* Custom CTA */}
            <div className="mt-48 p-24 bg-white border border-gray-100 rounded-[5rem] text-center space-y-12 relative overflow-hidden group">
               <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
               <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                  <h2 className="text-5xl font-serif font-bold">Standard is just a <span className="italic underline underline-offset-8 decoration-accent">Starting Point.</span></h2>
                  <p className="text-xl text-gray-400 font-light">
                     None of these quite right? Our configurator remains the core of the FurNeater experience. Transform any idea into a physical masterpiece.
                  </p>
                  <Link to="/custom-models" className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-2xl">
                     Enter 3D Studio <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>

         </div>
      </div>
   );
};

export default Shop;
