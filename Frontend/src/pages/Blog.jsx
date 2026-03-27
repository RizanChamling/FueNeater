import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User, Share2, ArrowUpRight } from 'lucide-react';

const Blog = () => {
   const posts = [
      {
         id: 1,
         title: 'The Architecture of European Oak',
         excerpt: 'Exploring the shift towards parametric headboards and bioactive linen layering in modern master-suites.',
         category: 'Design Intelligence',
         date: 'March 24, 2026',
         readTime: '6 min read',
         author: 'Julian Vane',
         image: 'https://www.ecfloorsmart.com/cdn/shop/collections/Quercus-HE01-Patraea-render-img.jpg?v=1741062492&width=750',
         color: 'bg-secondary/10'
      },
      {
         id: 2,
         title: 'Parametric Design in Modern Spaces',
         excerpt: 'How FurNeater tracks every cubic meter of Oak from the Black Forest to our workshop floor.',
         category: 'Restorative Ethos',
         date: 'March 20, 2026',
         readTime: '8 min read',
         author: 'Elena Rossi',
         image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
         color: 'bg-accent/5'
      },
      {
         id: 3,
         title: 'The Digital Twin: 3D Visualization',
         excerpt: 'Why millimeter-perfect previews are no longer a luxury, but a necessity for the modern collector.',
         category: 'Technology',
         date: 'March 15, 2026',
         readTime: '5 min read',
         author: 'Marcus Chen',
         image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80',
         color: 'bg-primary/5'
      },
      {
         id: 4,
         title: 'The Minimalist Wardrobe: A Study in Walnut',
         excerpt: 'Exploring the elimination of hardware in favor of integrated joinery for a seamless aesthetic.',
         category: 'Craftsmanship',
         date: 'March 10, 2026',
         readTime: '7 min read',
         author: 'Sarah Jenkins',
         image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80',
         color: 'bg-secondary/5'
      },
      {
         id: 5,
         title: 'Sustainable Luxury: Beyond the Label',
         category: 'Environment',
         date: 'March 5, 2026',
         readTime: '6 min read',
         author: 'David Thorne',
         image: 'https://classicoroma.com/cdn/shop/files/K001-1_x800.jpg?v=1725998692',
         color: 'bg-accent/10'
      }
   ];

   return (
      <div className="min-h-screen bg-[#FAFAFA] pt-40 pb-48">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Header */}
            <div className="mb-32 space-y-10">
               <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100 animate-fade-in">
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">FurNeater Journal</span>
               </div>
               <h1 className="text-6xl md:text-9xl font-serif font-bold text-gray-900 tracking-tighter leading-[0.85]">
                  The <span className="premium-gradient-text italic">Bespoke</span> <br /> Perspective.
               </h1>
               <p className="text-2xl text-gray-400 font-serif italic max-w-2xl leading-relaxed">
                  Thought leadership at the intersection of traditional craftsmanship and digital innovation.
               </p>
            </div>

            {/* Featured Post */}
            <div className="mb-48 group">
               <Link to={`/blog/${posts[0].id}`} className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                  <div className="aspect-[4/3] rounded-[4.5rem] overflow-hidden shadow-2xl relative">
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-1000" />
                     <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                     <div className="absolute top-12 left-12 p-8 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/40 shadow-2xl">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Featured Analysis</span>
                     </div>
                  </div>
                  <div className="space-y-12">
                     <div className="flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">
                        <span className="flex items-center gap-3"><Calendar className="w-5 h-5" /> {posts[0].date}</span>
                        <span className="flex items-center gap-3"><Clock className="w-5 h-5" /> {posts[0].readTime}</span>
                     </div>
                     <h2 className="text-5xl md:text-7xl font-serif font-bold leading-none tracking-tight group-hover:premium-gradient-text transition-all">
                        {posts[0].title}
                     </h2>
                     <p className="text-2xl text-gray-500 leading-relaxed font-light font-serif italic">
                        {posts[0].excerpt}
                     </p>
                     <div className="flex items-center justify-between pt-12 border-t border-gray-100">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-bold">JV</div>
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Author</span>
                              <span className="text-sm font-bold text-gray-900">{posts[0].author}</span>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-20 h-20 bg-black text-white rounded-[2rem] shadow-2xl flex items-center justify-center group-hover:translate-x-4 transition-all duration-700">
                              <ArrowUpRight className="w-8 h-8" />
                           </div>
                        </div>
                     </div>
                  </div>
               </Link>
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
               {posts.slice(1).map(post => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="group block space-y-10">
                     <div className="aspect-[16/10] rounded-[4rem] overflow-hidden shadow-2xl relative">
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all" />
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute top-10 right-10 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rotate-12 group-hover:rotate-0">
                           <ArrowUpRight className="w-6 h-6" />
                        </div>
                     </div>
                     <div className="px-8 space-y-6">
                        <div className="flex items-center gap-4">
                           <span className="px-5 py-2 bg-gray-50 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">{post.category}</span>
                           <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-200">{post.date}</span>
                        </div>
                        <h3 className="text-4xl font-serif font-bold group-hover:premium-gradient-text transition-all leading-tight">
                           {post.title}
                        </h3>
                     </div>
                  </Link>
               ))}
            </div>

         </div>
         <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
      </div>
   );
};

export default Blog;
