import React from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Settings2, ShieldCheck, ArrowRight, Box, Compass } from 'lucide-react';

const CustomModels = () => {
   const models = [
      {
         id: 'table-01',
         name: 'Architectural Dining Table',
         description: 'A masterpiece of balance. Solid hardwood tabletop with customizable proportions and designer leg silhouettes.',
         priceStart: 620,
         image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80',
         category: 'Dining'
      },
      {
         id: 'bed-01',
         name: 'Grand Master Bed',
         description: 'The pinnacle of resting design. Featuring customizable headboard heights and premium structural layering.',
         priceStart: 1400,
         image: 'https://masterbedroomideas.eu/wp-content/uploads/2021/06/turner-pendant2.jpg',
         category: 'Bedroom'
      },
      {
         id: 'desk-01',
         name: 'Executive Home Desk',
         description: 'Precision-engineered for the modern creative. Millimeter-accurate work surfaces with integrated hardware options.',
         priceStart: 580,
         image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80',
         category: 'Workspace'
      },
      {
         id: 'storage-01',
         name: 'Modular Library / Storage',
         description: 'Sophisticated shelving systems designed to adapt. Define your height and depth for a perfect architectural fit.',
         priceStart: 420,
         image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80',
         category: 'Storage'
      },
      {
         id: 'chair-01',
         name: 'Artisan Lounge Seating',
         description: 'Ergonomic forms met with bespoke capability. Customize the stance and finish of your primary relaxation piece.',
         priceStart: 350,
         image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80',
         category: 'Living'
      }
   ];

   return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-48">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Architectural Header */}
            <div className="mb-24 flex flex-col lg:flex-row items-end justify-between gap-12">
               <div className="max-w-3xl space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                     <Compass className="w-4 h-4 text-accent" />
                     <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Template Selection</span>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-900 leading-[0.9] tracking-tight">
                     Design Your <br /> <span className="premium-gradient-text italic">Foundation.</span>
                  </h1>
                  <p className="text-xl text-gray-500 font-light leading-relaxed max-w-xl">
                     Every masterpiece begins with a template. Select your base form below and enter the 3D Configuration Studio to manipulate every dimension.
                  </p>
               </div>
               <div className="hidden lg:block text-right">
                  <div className="flex items-center gap-2 justify-end mb-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Live Studio Available</span>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">Bespoke Production Queue: 12-14 Days</p>
               </div>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {models.map(model => (
                  <Link
                     key={model.id}
                     to={`/customize/${model.id}`}
                     className="luxury-card group overflow-hidden flex flex-col"
                  >
                     <div className="relative h-80 overflow-hidden">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-1000 z-10" />
                        <img
                           src={model.image}
                           alt={model.name}
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 z-20">
                           <span className="px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-black">
                              {model.category}
                           </span>
                        </div>
                        <div className="absolute bottom-6 right-6 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                           <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-2xl">
                              <ArrowRight className="w-5 h-5" />
                           </div>
                        </div>
                     </div>

                     <div className="p-10 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                           <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:premium-gradient-text transition-all">{model.name}</h3>
                           <span className="text-xs font-bold text-gray-300">S01</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-10 flex-1 leading-relaxed font-light">{model.description}</p>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                           <div className="space-y-1">
                              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Base Investment</p>
                              <p className="text-xl font-bold text-gray-900">${model.priceStart}</p>
                           </div>
                           <div className="flex -space-x-3">
                              {[1, 2, 3].map(i => (
                                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 shadow-sm overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${model.id}${i}`} className="w-full h-full object-cover grayscale" />
                                 </div>
                              ))}
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-black flex items-center justify-center text-[8px] font-bold text-white">
                                 +12
                              </div>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>

            {/* Manufacturing Guarantee Section */}
            <div className="mt-48 p-20 bg-white border border-gray-100 rounded-[5rem] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -mr-32 -mt-32" />
               <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                  <div className="shrink-0 relative">
                     <div className="w-32 h-32 bg-black rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                        <ShieldCheck className="w-14 h-14 text-accent" />
                     </div>
                     <div className="absolute -bottom-4 -right-4 p-4 bg-white rounded-2xl shadow-xl flex items-center gap-2">
                        <Box className="w-4 h-4 text-gray-300" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Pixel-Perfect</span>
                     </div>
                  </div>
                  <div className="flex-1 space-y-6 text-center lg:text-left">
                     <h4 className="text-3xl font-serif font-bold text-gray-900">The Geometric Integrity Oath</h4>
                     <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl">
                        At FurNeater, our 3D configurator isn't a suggestion—it's the blueprint. Every parameter you set is directly ingested by our CNC routing arrays, ensuring that the physical piece matches your digital vision down to the last millimeter.
                     </p>
                     <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black">
                           <div className="w-2 h-2 rounded-full bg-accent" /> Millimeter Accuracy
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black">
                           <div className="w-2 h-2 rounded-full bg-accent" /> 100% Timber Sourcing
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black">
                           <div className="w-2 h-2 rounded-full bg-accent" /> Artisan Hand-Finish
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

export default CustomModels;
