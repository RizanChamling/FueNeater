import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Quote } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();

  // In a real app, this would be fetched from an API
  const posts = {
    '1': {
      title: 'The Architecture of European Oak',
      category: 'Design Intelligence',
      date: 'March 24, 2026',
      readTime: '6 min read',
      author: 'Julian Vane',
      image: 'https://www.harperfloors.com/cdn/shop/files/GENEVA_EngineeredHardwood_EuropeanOak_Harperfloors.com-Japandi.jpg?v=1713569782',
      content: [
        "European Oak (Quercus robur) has been the cornerstone of structural artistry for centuries. At FurNeater, we don't just see it as a material; we see it as a biological blueprint for longevity.",
        "The shift towards parametric design has allowed us to explore the cellular density of Oak in ways previously impossible. By analyzing the grain pattern via 3D scanning, our algorithms can determine the optimal orientation for weight distribution in bespoke headboards.",
        "This marriage of ancient timber and modern math results in pieces that aren't just furniture, but structural poetry. In this deep dive, we explore how bioactive linen layering completes the restorative experience of an Oak-based master suite."
      ]
    },
    '2': {
      title: 'Parametric Design in Modern Spaces',
      category: 'Restorative Ethos',
      date: 'March 20, 2026',
      readTime: '8 min read',
      author: 'Elena Rossi',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      content: [
        "Parametric design is more than a buzzword; it's a fundamental shift in how we inhabit space. By using mathematical parameters to define forms, we can create furniture that adapts to the specific cubic volume of a room.",
        "At FurNeater, our tracking system monitors every cubic meter of Oak from the Black Forest. This traceability ensures that every curve in your bespoke desk is a direct result of sustainable harvesting and precision engineering.",
        "We believe that the future of interior design lies in this digital-physical bridge—where your vision is translated into millimeter-perfect reality through algorithmic craft."
      ]
    },
    '3': {
      title: 'The Digital Twin: 3D Visualization',
      category: 'Technology',
      date: 'March 15, 2026',
      readTime: '5 min read',
      author: 'Marcus Chen',
      image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80',
      content: [
        "In the realm of high-end collectibles, the 'Digital Twin' has become an essential asset. A 1:1 digital representation of a physical object allows for unprecedented precision in architectural integration.",
        "FurNeater's 3D engine provides a millimetric preview that is no longer a luxury but a necessity. Collectors can now visualize heartwood grain patterns and joint tolerances before a single saw blade touches the timber.",
        "This transparency builds a new level of trust between the artisan and the collector, ensuring that the final piece is exactly as envisioned, both in form and in soul."
      ]
    },
    '4': {
      title: 'The Minimalist Wardrobe: A Study in Walnut',
      category: 'Craftsmanship',
      date: 'March 10, 2026',
      readTime: '7 min read',
      author: 'Sarah Jenkins',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80',
      content: [
        "American Walnut offers a depth of tone that is unparalleled in the world of hardwoods. Its deep chocolates and swirling sapwoods create a visual rhythm that is both grounding and sophisticated.",
        "In our latest study of minimalist wardrobes, we focus on the elimination of hardware in favor of integrated joinery. The result is a seamless surface that showcases the natural beauty of the wood.",
        "Crafting with Walnut requires a delicate touch and a deep respect for the material's character. Each piece we create is a tribute to the tree's history and the collector's discerning eye."
      ]
    },
    '5': {
      title: 'Sustainable Luxury: Beyond the Label',
      category: 'Environment',
      date: 'March 5, 2026',
      readTime: '6 min read',
      author: 'David Thorne',
      image: 'https://images.unsplash.com/photo-1441333346627-0346086cb811?auto=format&fit=crop&q=80',
      content: [
        "Sustainability is often used as a marketing shield, but at FurNeater, it is our foundational logic. True luxury cannot exist without ethical sourcing and environmental stewardship.",
        "We explore the full lifecycle of our furniture—from the FSC-certified forests to the non-toxic architectural lacquers we use for finishing. Our goal is to create pieces that last for generations, reducing the need for replacement and waste.",
        "By investing in high-quality, bespoke furniture, you are not just buying a product; you are participating in a movement towards a more conscious and enduring way of living."
      ]
    }
  };

  const post = posts[id] || posts['1'];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-40 pb-48">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        <Link to="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        <div className="space-y-8 mb-16">
          <span className="px-6 py-2 bg-white rounded-full text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 border border-gray-100 shadow-sm">{post.category}</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 tracking-tighter leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs">{post.author.split(' ').map(n => n[0]).join('')}</div>
              <span className="text-sm font-bold text-gray-900">{post.author}</span>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl mb-20">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-12">
          {post.content.map((p, i) => (
            <p key={i} className="text-2xl text-gray-600 leading-relaxed font-serif font-light italic">
              {p}
            </p>
          ))}

          <div className="p-12 bg-white rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-gray-50 opacity-50" />
            <p className="text-xl font-serif italic text-gray-800 relative z-10">
              "Bespoke is not just a measurement; it is a conversation between the hand and the mind."
            </p>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center">
          <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all">
            <Share2 className="w-5 h-5" /> Share Insight
          </button>
          <Link to="/custom-models" className="text-[10px] font-bold uppercase tracking-[0.3em] px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition-all shadow-xl">
            Start Your Bespoke Journey
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
