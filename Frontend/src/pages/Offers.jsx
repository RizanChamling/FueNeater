import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tag, Clock, Percent, ShoppingCart, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const featuredDeals = [
   {
      id: 'deal-desk',
      name: 'Minimalist Artisan Desk',
      price: 380,
      originalPrice: 520,
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80',
      percent: 27,
      category: 'Workspace'
   },
   {
      id: 'deal-chair',
      name: 'Nordic Lounge Chair',
      price: 240,
      originalPrice: 320,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80',
      percent: 25,
      category: 'Seating'
   },
   {
      id: 'deal-shelf',
      name: 'Modular Storage Unit',
      price: 420,
      originalPrice: 600,
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80',
      percent: 30,
      category: 'Storage'
   },
   {
      id: 'deal-table',
      name: 'Sleek Dining Surface',
      price: 650,
      originalPrice: 850,
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80',
      percent: 23,
      category: 'Tables'
   },
   {
      id: 'deal-bed',
      name: 'Velvet Platform Bed',
      price: 890,
      originalPrice: 1200,
      image: 'https://ak1.ostkcdn.com/images/products/is/images/direct/579be97277ba62312b7c1183f84b5249e8a90aae/Queen--King-Size-Velvet-Platform-Bed-Frame-with-Headboard%2C-Striped-Button-Design%2C-Solid-Frame-%26-Nightstand%2C-Adjustable-Lamp.jpg?impolicy=medium',
      percent: 26,
      category: 'Bedroom'
   },
   {
      id: 'deal-lamp',
      name: 'Architectural Floor Lamp',
      price: 190,
      originalPrice: 280,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80',
      percent: 32,
      category: 'Lighting'
   }
];

const Offers = () => {
   const { addToCart, toggleFavorite, isFavorite } = useCart();
   const { addToast } = useToast();
   const navigate = useNavigate();

   const handleAddToCart = (deal) => {
      addToCart({
         id: `offer_${deal.id}`,
         name: deal.name,
         price: deal.price,
         quantity: 1,
         image: deal.image,
         customizations: null
      });
      addToast('Secret Deal Unlocked', `${deal.name} has been added to your sanctuary.`, 'success');
   };

   return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-48">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Luxury Hero Banner */}
            <div className="relative h-[60vh] rounded-[5rem] overflow-hidden mb-24 bg-black group">
               <div className="absolute inset-0 opacity-40">
                  <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Offers Banner" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

               <div className="absolute inset-0 flex flex-col justify-center px-24 space-y-8 max-w-4xl">
                  <div className="inline-flex items-center gap-3 px-6 py-2 bg-accent/20 backdrop-blur-xl rounded-full border border-accent/30 w-fit">
                     <Percent className="w-4 h-4 text-accent" />
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Exclusive Opportunities</span>
                  </div>
                  <h1 className="text-7xl md:text-9xl font-serif font-bold text-white tracking-tight leading-[0.8]">
                     Artisanal <br /> <span className="premium-gradient-text italic">Reductions.</span>
                  </h1>
                  <p className="text-xl text-gray-300 font-light max-w-xl leading-relaxed">
                     For a limited time, we've select pieces from our archival collections at extraordinary valuations. Millimeter precision, now more accessible.
                  </p>
                  <div className="flex gap-6">
                     <div className="flex items-center gap-3 text-white/60 text-xs font-bold uppercase tracking-widest">
                        <Clock className="w-4 h-4 text-accent" /> Offer Ends in 48h
                     </div>
                  </div>
               </div>
            </div>

            {/* Large Storytelling Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
               <div className="group relative h-[500px] rounded-[4rem] overflow-hidden bg-white border border-gray-100 shadow-sm p-16 flex flex-col justify-center space-y-8">
                  <div className="absolute top-[-10%] right-[-10%] text-[20rem] font-serif font-bold text-gray-50 opacity-10 rotate-12 group-hover:rotate-0 transition-all duration-1000">30</div>
                  <div className="relative z-10 space-y-6">
                     <h2 className="text-5xl font-serif font-bold tracking-tight">The Workspace <br /> <span className="premium-gradient-text">Symposium.</span></h2>
                     <p className="text-lg text-gray-400 max-w-md font-light">
                        Elevate your professional sanctuary with 30% off on all customizable desks and ergonomic seating.
                     </p>
                     <Link to="/shop?category=Workspace" className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all">
                        Collect the Look <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
               </div>

               <div className="group relative h-[500px] rounded-[4rem] overflow-hidden bg-black p-16 flex flex-col justify-center space-y-8">
                  <div className="absolute inset-0 opacity-20">
                     <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" alt="Offers" />
                  </div>
                  <div className="relative z-10 space-y-6">
                     <h2 className="text-5xl font-serif font-bold tracking-tight text-white">The Midnight <br /> <span className="text-accent italic">Collection.</span></h2>
                     <p className="text-lg text-gray-200/60 max-w-md font-light">
                        Select velvet and noir oak pieces at 20% off. Because luxury is best served in the dark.
                     </p>
                     <button className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all">
                        View Nightfall <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
               {featuredDeals.map((deal) => (
                  <div key={deal.id} className="luxury-card group flex flex-col bg-white">
                     <div className="relative aspect-[4/5] overflow-hidden">
                        <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                           <div className="px-4 py-2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl">-{deal.percent}%</div>
                           <div className="px-4 py-2 bg-white/80 backdrop-blur-xl text-black text-[9px] font-bold uppercase tracking-[0.2em] rounded-full">{deal.category}</div>
                        </div>
                        <img
                           src={deal.image}
                           alt={deal.name}
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <button
                           onClick={() => toggleFavorite(deal)}
                           className="absolute top-8 right-8 z-20 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                        >
                           <Tag className={`w-4 h-4 ${isFavorite(`offer_${deal.id}`) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                        </button>
                     </div>

                     <div className="p-10 space-y-6">
                        <div className="flex justify-between items-start">
                           <div>
                              <h3 className="text-2xl font-serif font-bold group-hover:premium-gradient-text transition-all">{deal.name}</h3>
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mt-1">Limited Availability</p>
                           </div>
                           <div className="text-right">
                              <div className="text-xl font-bold text-gray-900">${deal.price}</div>
                              <div className="text-xs text-gray-400 line-through">${deal.originalPrice}</div>
                           </div>
                        </div>

                        <button
                           onClick={() => handleAddToCart(deal)}
                           className="w-full py-5 bg-black text-white rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gray-800 shadow-xl transition-all"
                        >
                           <ShoppingCart className="w-4 h-4" /> Secure This Deal
                        </button>
                     </div>
                  </div>
               ))}
            </div>

         </div>
      </div>
   );
};

export default Offers;
