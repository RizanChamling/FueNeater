import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Palette, Eye, Sparkles, Box, ShieldCheck, Quote, Star, Calendar, User, ArrowUpRight } from 'lucide-react';

const Home = () => {
   const [scrollPos, setScrollPos] = useState(0);

   useEffect(() => {
      const handleScroll = () => setScrollPos(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const reviews = [
      { name: "Vivek Thapa", role: "Interior Architect", text: "The 3D customization tool is second to none. I was able to design a dining table that fits perfectly in my client's minimalist space.", rating: 5 },
      { name: "Sophia Müller", role: "Digital Director", text: "Premium quality and millimeter precision. The walnut finish is even better in person than in the 3D preview.", rating: 5 },
      { name: "Rajesh Hamal", role: "Furniture Enthusiast", text: "The wood quality and finishing are outstanding. It was the best choice for my living room.", rating: 5 }
   ];

   const journals = [
      { title: "The Art of European Oak", date: "MAR 22, 2026", image: "https://www.harperfloors.com/cdn/shop/files/GENEVA_EngineeredHardwood_EuropeanOak_Harperfloors.com-Japandi.jpg?v=1713569782" },
      { title: "Parametric Design in Modern Spaces", date: "MAR 15, 2026", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" }
   ];

   return (
      <div className="w-full bg-[#FAFAFA] overflow-x-hidden">
         {/* Hero Section */}
         <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-[120px] animate-pulse" />
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay grayscale" />
            </div>

            <div className="relative z-10 text-center max-w-5xl px-6">
               <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-md rounded-full border border-white/20 shadow-sm mb-10 animate-fade-in">
                  <Sparkles className="w-4 h-4 text-black" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">FurNeater: Design Your Legacy</span>
               </div>

               <h1 className="text-6xl md:text-9xl font-serif font-bold text-gray-900 mb-10 leading-[0.9] tracking-tight">
                  Design Your <br /> <span className="premium-gradient-text italic">Masterpiece.</span>
               </h1>

               <p className="text-2xl text-gray-400 mb-14 max-w-2xl mx-auto font-serif italic leading-relaxed">
                  Millimeter-precision 3D craftsmanship. <br /> From the screen to your sanctuary.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Link to="/custom-models" className="px-14 py-7 bg-black text-white text-[11px] font-bold tracking-[0.3em] uppercase shadow-2xl hover:scale-105 transition-all rounded-[2rem] flex items-center gap-3 group">
                     Start Configuration <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
         </section>

         {/* Featured Categories */}
         <section className="py-48 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                  <div className="space-y-6">
                     <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">Curated Templates</h2>
                     <p className="text-xl text-gray-400 font-serif italic max-w-lg">Transform a blueprint into your bespoke reality.</p>
                  </div>
                  <Link to="/custom-models" className="px-10 py-5 bg-gray-50 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all">
                     View All Models
                  </Link>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[900px]">
                  <Link to="/customize/table-01" className="md:col-span-12 lg:col-span-8 relative group overflow-hidden rounded-[4rem] shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                     <div className="absolute bottom-16 left-16">
                        <h3 className="text-5xl font-serif font-bold text-white mb-6">Dining & Work Tables</h3>
                        <div className="flex items-center gap-3 text-white text-[11px] font-bold tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                           CONFIGURE NOW <ArrowUpRight className="w-5 h-5" />
                        </div>
                     </div>
                  </Link>

                  <Link to="/customize/storage-01" className="md:col-span-6 lg:col-span-4 relative group overflow-hidden rounded-[4rem] shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                     <div className="absolute bottom-12 left-12"><h3 className="text-3xl font-serif font-bold text-white">Storage & Shelving</h3></div>
                  </Link>

                  <Link to="/customize/bed-01" className="md:col-span-6 lg:col-span-4 relative group overflow-hidden rounded-[4rem] shadow-2xl">
                     <img src="https://www.thebedcentre.com/wp-content/uploads/2017/06/Burgess_Bedsteads_Bespoke-e1546436792196.jpg" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                     <div className="absolute bottom-12 left-12"><h3 className="text-3xl font-serif font-bold text-white">Bespoke Beds</h3></div>
                  </Link>

                  <Link to="/customize/chair-01" className="md:col-span-12 lg:col-span-8 relative group overflow-hidden rounded-[4rem] shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                     <div className="absolute bottom-16 left-16"><h3 className="text-5xl font-serif font-bold text-white">Artisan Seating</h3></div>
                  </Link>
               </div>
            </div>
         </section>

         {/* Reviews Section */}
         <section className="py-48 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <div className="text-center mb-24 space-y-6">
                  <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">Client Stories</h2>
                  <p className="text-xl text-gray-400 font-serif italic">The tactile reality of FurNeater within modern spaces.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {reviews.map((r, i) => (
                     <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-black/5 flex flex-col justify-between border border-gray-50 hover:scale-105 transition-all duration-700">
                        <div className="space-y-8">
                           <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-black text-black" />)}
                           </div>
                           <p className="text-xl text-gray-600 leading-relaxed font-serif italic">"{r.text}"</p>
                        </div>
                        <div className="mt-12 pt-8 border-t border-gray-50 flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-300">
                              {r.name.charAt(0)}
                           </div>
                           <div>
                              <h4 className="font-bold text-sm text-gray-900 tracking-tight">{r.name}</h4>
                              <p className="text-[10px] uppercase font-bold text-gray-300 tracking-[0.2em]">{r.role}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Journal Preview */}
         <section className="py-48 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                  <div className="space-y-6">
                     <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">The Journal</h2>
                     <p className="text-xl text-gray-400 font-serif italic max-w-lg">Insights into material science, architecture, and craft.</p>
                  </div>
                  <Link to="/blog" className="px-12 py-6 border-2 border-black rounded-[2rem] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all shadow-2xl">
                     Explore Editorial
                  </Link>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {journals.map((j, i) => (
                     <Link key={i} to="/blog" className="group block space-y-8">
                        <div className="aspect-[16/10] rounded-[4rem] overflow-hidden shadow-2xl relative">
                           <img src={j.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                           <div className="absolute top-8 right-8 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rotate-12 group-hover:rotate-0">
                              <ArrowUpRight className="w-6 h-6" />
                           </div>
                        </div>
                        <div className="space-y-4 px-4">
                           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">{j.date}</span>
                           <h3 className="text-4xl font-serif font-bold text-gray-900 group-hover:premium-gradient-text transition-all leading-tight">
                              {j.title}
                           </h3>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>

         {/* Trust Manifesto */}
         <section className="py-64 bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-16">
               <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none">
                  "Bespoke is the ultimate form of self-expression."
               </h2>
               <div className="flex flex-col items-center gap-8">
                  <div className="w-20 h-px bg-white/20" />
                  <p className="text-[11px] font-bold tracking-[0.5em] uppercase text-gray-500">FurNeater Architectural Studio</p>
               </div>
            </div>
         </section>

         <style>{`
        .animate-fade-in { animation: fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      </div>
   );
};

export default Home;
