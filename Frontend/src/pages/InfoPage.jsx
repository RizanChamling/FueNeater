import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Leaf, HelpCircle, Mail, Info, FileText, ArrowRight, TreeDeciduous, Microscope, MapPin, Phone, Clock, Globe, Facebook, Instagram, Twitter, Linkedin, Building2, Receipt } from 'lucide-react';

const InfoPage = () => {
   const { slug } = useParams();

   const content = {
      'about': {
         title: 'Our Heritage',
         subtitle: 'The Intersection of Data & Craft',
         icon: <Info className="w-12 h-12 text-black" />,
         text: [
            'FurNeater was founded with a singular vision: to bridge the gap between architectural precision and artisanal soul. We believe that your home should be an exact reflection of your lifestyle, not a compromise on a showroom floor.',
            'Our workshop combines generations of woodworking knowledge with cutting-edge 3D parametric design. This allows us to offer true bespoke furniture that is as technically perfect as it is aesthetically stunning.',
            'Total customization and quality are our commitments to your living space.'
         ],
         image: 'https://st2.depositphotos.com/1014680/11547/i/950/depositphotos_115472416-stock-photo-furniture-making-craft.jpg',
         extra: {
            title: 'Manufacturing 4.0',
            desc: 'Our proprietary 3D engine sends your designs directly to our CNC routing machines for millimeter-perfect cuts.'
         }
      },
      'wood-study': {
         title: 'Wood Study',
         subtitle: 'The Science and Soul of Timber',
         icon: <TreeDeciduous className="w-12 h-12 text-black" />,
         text: [
            'Every piece of furniture we craft begins with a deep understanding of the timber’s biological and aesthetic properties. We select only the finest A-grade sustainable hardwoods.',
         ],
         image: 'https://www.lakkadhaara.com/cdn/shop/products/Jaipur-Solid-Wood-Study-Table-With-Three-Drawers-Lakkadhaara-9287824343120.jpg?v=1744021999&width=1946',
         species: [
            {
               name: "European Oak",
               desc: "Known for its strong grain and timeless durability. High resistance to warping and a distinct 'cathedral' grain pattern.",
               img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHEIFRTlkZ02_e2Txf4KPw5nyUbdpm6QEiDJlYytXDhs6WAs5C0l4afr_2u-5C_Y4b0_krblTr93wBm5z00bpouEmM-03zQk94fLl-DDjcyNSm-48BQ3op1Eo8Qn8yFlf9tnje6c6tWvY/s1600/Old+oak.jpg"
            },
            {
               name: "American Walnut",
               desc: "The aristocrat of hardwoods. Deep chocolate tones and smooth, swirling grain for sophisticated, mid-century modern designs.",
               img: "https://fieldreport.caes.uga.edu/wp-content/uploads/2025/08/shorthand/83220/O0kGIg3Xwv/assets/KacJwBqqcl/blackwalnuttreelarge-2124x1411.jpg"
            },
            {
               name: "White Ash",
               desc: "A bright, resilient timber with exceptional shock resistance. Clean, contemporary look that holds subtle stains beautifully.",
               img: "https://fgca.net/wp-content/uploads/BB-01-06-06-Aw-Clinton-SB-1.jpg"
            },
            {
               name: "Steamed Beech",
               desc: "Uniform grain and warm salmon-pink tones. Highly stable and excellent for detailed joinery Work.",
               img: "https://www.homestratosphere.com/wp-content/uploads/2019/02/1-27-2.jpg"
            }
         ],
         features: [
            { icon: <ShieldCheck className="text-black" />, title: "Grade A", desc: "Premium knot-free selection" },
            { icon: <Microscope className="text-black" />, title: "Scan", desc: "Internal moisture analysis" },
            { icon: <Leaf className="text-green-600" />, title: "FSC", desc: "100% Sustainable sourcing" }
         ]
      },
      'contact': {
         title: 'The Studio',
         subtitle: 'Where Visions Become Physical',
         icon: <Mail className="w-12 h-12 text-black" />,
         text: [
            'Our design studio and workshop are located in the heart of the Artisan District. We welcome planned visits from clients who wish to see the craftsmanship firsthand.',
         ],
         contactInfo: [
            { icon: <MapPin className="w-5 h-5" />, label: "Headquarters", value: "450 Artisan Way, Hudson Valley, NY 12534" },
            { icon: <Phone className="w-5 h-5" />, label: "Support Line", value: "+1 (888) 555-0192" },
            { icon: <Clock className="w-5 h-5" />, label: "Studio Hours", value: "Mon - Fri: 9am - 6pm EST" },
            { icon: <Globe className="w-5 h-5" />, label: "Kathmandu Hub", value: "New Baneshwor, Kathmandu, Nepal" }
         ],
         socials: [
            { icon: <Facebook className="w-5 h-5" />, href: "#" },
            { icon: <Instagram className="w-5 h-5" />, href: "#" },
            { icon: <Twitter className="w-5 h-5" />, href: "#" },
            { icon: <Linkedin className="w-5 h-5" />, href: "#" }
         ],
         legal: [
            { icon: <Building2 className="w-4 h-4" />, label: "Registration", value: "Reg No: 129384-NEP" },
            { icon: <Receipt className="w-4 h-4" />, label: "Tax / VAT", value: "VAT: 60239485" }
         ],
         form: true
      }
   };

   const page = content[slug] || content['about'];

   return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-48">
         {/* Hero Section */}
         <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
            <div className="flex flex-col lg:flex-row items-center gap-20">
               <div className="flex-1 space-y-8">
                  <div className="inline-flex p-5 bg-white rounded-[2.5rem] shadow-xl shadow-black/5 animate-fade-in">
                     {page.icon}
                  </div>
                  <h1 className="text-6xl md:text-7xl font-serif font-bold text-gray-900 tracking-tight leading-[1.1]">
                     {page.title}
                  </h1>
                  <p className="text-xl text-gray-400 font-serif italic max-w-xl">
                     {page.subtitle}
                  </p>
               </div>
               {page.image && (
                  <div className="flex-1 w-full aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl relative group">
                     <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-1000" />
                     <img src={page.image} alt={page.title} className="w-full h-full object-cover transition-all duration-1000" />
                  </div>
               )}
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
               <div className="lg:col-span-7 space-y-16">
                  {page.text && page.text.map((p, i) => (
                     <p key={i} className="text-3xl text-gray-600 leading-relaxed font-light font-serif">
                        {p}
                     </p>
                  ))}

                  {/* Wood Species Special Section - Gallery Layout */}
                  {page.species && (
                     <div className="grid grid-cols-1 gap-12 pt-8">
                        {page.species.map((s, i) => (
                           <div key={i} className="bg-white rounded-[4rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-700 group">
                              <div className="aspect-[21/9] overflow-hidden relative">
                                 <img src={s.img} alt={s.name} className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-110" />
                                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                 <div className="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-white">
                                    <h3 className="text-2xl font-serif font-bold">{s.name}</h3>
                                 </div>
                              </div>
                              <div className="p-12">
                                 <p className="text-xl text-gray-500 leading-relaxed font-serif italic">{s.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  {page.contactInfo && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {page.contactInfo.map((info, i) => (
                           <div key={i} className="flex items-start gap-4 p-8 bg-white rounded-3xl border border-gray-50 shadow-sm">
                              <div className="p-4 bg-gray-50 rounded-2xl text-black">
                                 {info.icon}
                              </div>
                              <div>
                                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-1">{info.label}</p>
                                 <p className="text-base font-medium text-gray-900">{info.value}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>

               <div className="lg:col-span-5">
                  {page.form && (
                     <div className="sticky top-32 space-y-8">
                        <div className="glass-panel p-12 rounded-[4rem] shadow-2xl bg-white/80 border border-white">
                           <h3 className="text-3xl font-serif font-bold mb-8">Initiate Inquiry</h3>
                           <form className="space-y-4">
                              <input placeholder="Personal / Trade Name" className="w-full bg-gray-50/50 px-8 py-6 rounded-[2rem] border-none focus:ring-2 focus:ring-black/10 transition-all" />
                              <input placeholder="Email Path" className="w-full bg-gray-50/50 px-8 py-6 rounded-[2rem] border-none focus:ring-2 focus:ring-black/10 transition-all" />
                              <textarea placeholder="Describe your bespoke vision..." rows="4" className="w-full bg-gray-50/50 px-8 py-8 rounded-[2rem] border-none focus:ring-2 focus:ring-black/10 transition-all" />
                              <button className="w-full bg-black text-white font-bold py-7 rounded-[2.5rem] shadow-2xl hover:bg-gray-800 transition-all uppercase tracking-[0.3em] text-[11px]">
                                 Dispatch Vision
                              </button>
                           </form>
                        </div>

                        {page.socials && (
                           <div className="p-10 bg-black rounded-[3rem] text-white flex justify-between items-center">
                              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Connect</span>
                              <div className="flex gap-4">
                                 {page.socials.map((s, i) => (
                                    <a key={i} href={s.href} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                       {s.icon}
                                    </a>
                                 ))}
                              </div>
                           </div>
                        )}

                        {page.legal && (
                           <div className="p-10 bg-gray-50 rounded-[3rem] space-y-4">
                              {page.legal.map((l, i) => (
                                 <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <span className="flex items-center gap-2">{l.icon} {l.label}</span>
                                    <span className="text-gray-900">{l.value}</span>
                                 </div>
                              ))}
                           </div>
                        )}

                        {/* Map Placeholder */}
                        <div className="w-full aspect-video rounded-[3rem] bg-gray-200 overflow-hidden relative group">
                           <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-serif italic text-xl">Interactive Map coming soon...</div>
                           <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" className="w-full h-full object-cover blur-sm" />
                        </div>
                     </div>
                  )}

                  {page.species && (
                     <div className="sticky top-32 p-12 bg-black text-white rounded-[3rem] shadow-2xl space-y-8">
                        <ShieldCheck className="w-12 h-12 text-white mb-4" />
                        <h3 className="text-3xl font-serif font-bold">Standard Certification</h3>
                        <p className="text-gray-400 leading-relaxed">
                           All woods are FSC Certified and kiln-dried to 8% moisture content for maximum structural stability in changing climates.
                        </p>
                        <div className="pt-8 border-t border-white/10 space-y-6">
                           {page.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-4">
                                 {f.icon}
                                 <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest">{f.title}</h4>
                                    <p className="text-[10px] text-gray-500">{f.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Common Navigation Footer */}
         <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-48">
            <div className="p-20 bg-white border border-gray-100 rounded-[4rem] text-center space-y-10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-10" />
               <FileText className="w-12 h-12 mx-auto text-gray-200" />
               <h2 className="text-4xl font-serif font-bold">Interested in the Process?</h2>
               <div className="flex flex-wrap justify-center gap-8">
                  {[
                     { slug: 'about', label: 'About' },
                     { slug: 'wood-study', label: 'Wood Study' },
                     { slug: 'contact', label: 'Contact' }
                  ].filter(s => s.slug !== slug).map(s => (
                     <Link key={s.slug} to={`/info/${s.slug}`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all pb-2">
                        {s.label}
                     </Link>
                  ))}
               </div>
               <div className="pt-10">
                  <Link to="/custom-models" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] px-14 py-7 bg-black text-white rounded-[2.5rem] hover:scale-105 transition-all shadow-2xl">
                     Start Your Design <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>
         </div>

         <style>{`
         @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
         .animate-fade-in { animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
       `}</style>
      </div>
   );
};

export default InfoPage;
