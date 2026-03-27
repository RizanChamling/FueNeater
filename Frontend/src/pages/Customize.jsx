import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Maximize2, Move3d, Sparkles, Box, Layers, MousePointer2, ChevronRight, ChevronLeft, Check, Ruler, Palette, Settings, Star, User, Quote, BoxSelect, Drill, MousePointerClick, LayoutGrid, Columns, Rows, Monitor, Cpu } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Furniture3D from '../components/visualizer/Furniture3D';
import { useToast } from '../context/ToastContext';

const Customize = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const type = id?.split('-')[0] || 'table';
  const isBookshelf = type === 'bookshelf' || type === 'storage';
  const isTable = type === 'table';
  const isDesk = type === 'desk';
  const isBed = type === 'bed';
  const isChair = type === 'chair';

  const [currentStep, setCurrentStep] = useState(1);

  // --- Pickawood Advanced State ---
  const [dimensions, setDimensions] = useState({
    width: isBed ? 160 : isTable ? 160 : isBookshelf ? 100 : isChair ? 55 : 140,
    height: isBed ? 40 : isTable ? 75 : isBookshelf ? 180 : isChair ? 85 : 75,
    depth: isBed ? 200 : isTable ? 90 : isBookshelf ? 35 : isChair ? 55 : 80
  });

  const [material, setMaterial] = useState({ id: 'oak', name: 'European Oak', color: '#B08D57' });
  const [edgeProfile, setEdgeProfile] = useState('straight');
  const [cornerRadius, setCornerRadius] = useState(0);
  const [legStyle, setLegStyle] = useState('standard');
  const [legMaterial, setLegMaterial] = useState('wood');
  const [frameColor, setFrameColor] = useState('#111');
  const [shapeUp, setShapeUp] = useState('standard');
  const [layering, setLayering] = useState('none');
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(1);
  const [drawers, setDrawers] = useState(0);
  const [tableShape, setTableShape] = useState('rectangular');
  const [bookshelfStyle, setBookshelfStyle] = useState('classic');
  // --------------------------------

  const steps = [
    { id: 1, name: 'Dimensions', icon: <Ruler className="w-4 h-4" /> },
    { id: 2, name: 'Material', icon: <Palette className="w-4 h-4" /> },
    { id: 3, name: 'Frame / Style', icon: <Settings className="w-4 h-4" /> },
    { id: 4, name: 'Precision', icon: <Sparkles className="w-4 h-4" /> },
  ];

  const woodSpecies = [
    { id: 'oak', name: 'European Oak', color: '#B08D57', price: 0 },
    { id: 'walnut', name: 'American Walnut', color: '#5D4037', price: 250 },
    { id: 'ash', name: 'White Ash', color: '#E8E4D9', price: 120 },
    { id: 'beech', name: 'Steamed Beech', color: '#D2B48C', price: 80 },
  ];

  const lacquerColors = [
    { id: 'pure-white', name: 'RAL 9010 White', color: '#F7F7F7', price: 150 },
    { id: 'anthracite', name: 'RAL 7016 Anthracite', color: '#31373D', price: 150 },
    { id: 'forest', name: 'RAL 6005 Forest', color: '#0E4431', price: 180 },
    { id: 'navy', name: 'RAL 5003 Navy', color: '#1B263B', price: 180 },
  ];

  const shelfStyles = [
    { id: 'classic', name: 'Classic Grid', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'offset', name: 'Offset Shelves', icon: <Columns className="w-5 h-5" /> },
    { id: 'asymmetric', name: 'Asymmetric', icon: <Rows className="w-5 h-5" /> }
  ];

  const bedFrames = [
    { id: 'standard', name: 'Standard Frame', img: 'https://images.unsplash.com/photo-1505693419148-40bcf797e5ad?auto=format&fit=crop&q=80' },
    { id: 'tall', name: 'Tall Headboard', img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80' },
    { id: 'wingback', name: 'Wingback luxury', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80' }
  ];

  const getPrice = () => {
    // Base prices for premium bespoke furniture
    let price = isBed ? 1800 : isTable ? 1200 : isBookshelf ? 1400 : isChair ? 450 : 800;
    
    // Surface area based pricing ($ per square meter)
    const surfaceArea = (dimensions.width * dimensions.depth) / 10000;
    price += surfaceArea * 450;

    // Material premiums
    if (material.id === 'walnut') price += 600;
    if (material.id === 'ash') price += 250;
    if (material.type === 'lacquer') price += 300;
    
    // Design premiums
    if (edgeProfile !== 'straight') price += 120;
    if (cornerRadius > 20) price += 80;
    if (legStyle === 'spider') price += 550;
    if (legStyle === 'u-frame') price += 350;
    if (legMaterial === 'steel') price += 220;
    if (shapeUp === 'wingback') price += 450;
    if (shapeUp === 'tall') price += 200;
    if (layering === 'office') price += 180;
    
    // Bookshelf specific
    if (isBookshelf) price += (rows * 65) + (cols * 85) + (drawers * 150);
    if (bookshelfStyle !== 'classic') price += 180;

    return Math.round(price);
  };
   const finalPrice = getPrice();

  const handleAddToCart = () => {
    if (!user) {
      addToast('Authentication Required', 'Please login to save your bespoke design to the cart.', 'info');
      navigate('/login', { state: { from: `/customize/${id}` } });
      return;
    }

    addToCart({
      id: 100, // Using a consistent ID for all bespoke items to allow merging in the cart if customizations match
      name: `Bespoke ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      price: finalPrice,
      quantity: 1,
      customizations: { dimensions, material, edgeProfile, cornerRadius, legStyle, legMaterial, rows, cols, drawers, tableShape, shapeUp, layering, bookshelfStyle }
    });
    addToast('Success', 'Your bespoke furniture has been added to the cart.', 'success');
    navigate('/cart');
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      
      {/* 3D Viewport */}
      <div className="w-full lg:w-[60%] h-[50vh] lg:h-screen sticky top-0 bg-[#FAFAFA] border-r border-gray-100">
         <div className="absolute top-12 left-12 z-20">
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-black text-white text-[8px] font-bold tracking-[0.4em] uppercase px-4 py-2 rounded-full">Precision Studio 2026</span>
               <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">{type} Configurator</span>
            </div>
            <h1 className="text-6xl font-serif font-bold tracking-tighter text-gray-900 leading-[0.8]">
               Master <br/> <span className="premium-gradient-text italic">{type}</span>
            </h1>
         </div>

         <Furniture3D 
            type={type} 
            config={{ dimensions, material, edgeProfile, cornerRadius, legStyle, legMaterial, rows, cols, drawers, tableShape, shapeUp, layering, frameColor, bookshelfStyle }} 
         />

         <div className="absolute top-12 right-12 z-20 text-right">
            <div className="p-10 bg-white/70 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl space-y-2">
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">Total Valuation</p>
               <p className="text-5xl font-serif font-bold text-black tracking-tighter">${finalPrice}</p>
            </div>
         </div>
      </div>

      {/* Configurator Controls */}
      <div className="w-full lg:w-[40%] flex flex-col bg-white overflow-hidden">
         <div className="px-12 py-10 border-b border-gray-50 sticky top-0 z-40 bg-white">
            <div className="flex justify-between items-center max-w-sm mx-auto">
               {steps.map(step => (
                  <div key={step.id} className="flex flex-col items-center gap-2">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${currentStep >= step.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-300'}`}>
                        {currentStep > step.id ? <Check className="w-3 h-3" /> : step.icon}
                     </div>
                     <span className={`text-[7px] font-bold uppercase tracking-widest ${currentStep === step.id ? 'text-black' : 'text-gray-300'}`}>{step.name}</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-12 space-y-16 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {currentStep === 1 && (
               <div className="space-y-16 animate-fade-in">
                  <div className="space-y-4">
                     <h2 className="text-3xl font-serif font-bold">Dimensions & Shape</h2>
                     <p className="text-sm text-gray-400 font-light">Millimeter-accurate parametric scaling.</p>
                  </div>
                  <div className="space-y-12">
                     {['width', 'height', 'depth'].map(k => {
                        const min = k === 'height' ? (isBed ? 30 : isChair ? 80 : 60) : (isChair ? 40 : 60);
                        const max = k === 'height' ? (isBookshelf ? 240 : isChair ? 110 : 300) : (isChair ? 70 : 300);
                        return (
                          <div key={k} className="space-y-6">
                             <div className="flex justify-between items-end">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{k}</label>
                                <span className="text-3xl font-serif font-bold">{dimensions[k]}cm</span>
                             </div>
                             <input type="range" min={min} max={max} value={dimensions[k]} onChange={e => setDimensions({...dimensions, [k]: Number(e.target.value)})} className="w-full h-2 bg-gray-100 appearance-none accent-black rounded-full cursor-pointer" />
                          </div>
                        );
                     })}
                  </div>

                  {isTable && (
                     <div className="space-y-6">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Geometric Silhouette</label>
                        <div className="grid grid-cols-2 gap-3">
                           {[
                             { id: 'rectangular', name: 'Rectangular' },
                             { id: 'round', name: 'Circular' }
                           ].map(s => (
                              <button key={s.id} onClick={() => setTableShape(s.id)} className={`py-6 rounded-2xl text-[9px] font-bold uppercase tracking-widest border-2 transition-all ${tableShape === s.id ? 'bg-black text-white border-black' : 'border-gray-50 text-gray-400 hover:border-gray-200'}`}>{s.name}</button>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            )}

            {currentStep === 2 && (
               <div className="space-y-16 animate-fade-in">
                  <div className="space-y-4">
                     <h2 className="text-3xl font-serif font-bold">Material & Finish</h2>
                     <p className="text-sm text-gray-400 font-light">Natural timber or architectural lacquer.</p>
                  </div>
                  <div className="space-y-12">
                     <div className="space-y-6">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Wood Species</label>
                        <div className="grid grid-cols-1 gap-4">
                           {woodSpecies.map(w => (
                              <button key={w.id} onClick={() => setMaterial({...w, type: 'wood'})} className={`flex items-center gap-6 p-6 rounded-3xl border-2 transition-all ${material.id === w.id && material.type === 'wood' ? 'border-black bg-gray-50' : 'border-gray-50 hover:bg-gray-50'}`}>
                                 <div className="w-16 h-16 rounded-2xl shadow-xl shadow-black/5" style={{ backgroundColor: w.color }} />
                                 <div className="text-left flex-1"><h4 className="font-bold text-base tracking-tight">{w.name}</h4></div>
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {currentStep === 3 && (
               <div className="space-y-16 animate-fade-in">
                  <div className="space-y-4">
                     <h2 className="text-3xl font-serif font-bold">Frame & Structure</h2>
                     <p className="text-sm text-gray-400 font-light">Structural design options.</p>
                  </div>
                  <div className="space-y-12">
                     {(isTable || isDesk || isChair) && (
                        <>
                           <div className="space-y-6">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Base Design</label>
                              <div className="grid grid-cols-2 gap-4">
                                 {['standard', 'spider', 'u-frame', 'x-frame'].map(f => (
                                    <button key={f} onClick={() => setLegStyle(f)} className={`py-8 rounded-3xl text-[10px] font-bold uppercase border-2 transition-all ${legStyle === f ? 'bg-black text-white border-black' : 'border-gray-50 hover:border-gray-200'}`}>{f}</button>
                                 ))}
                              </div>
                           </div>
                           <div className="space-y-6">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Leg Material</label>
                              <div className="flex gap-4">
                                 {['wood', 'steel'].map(m => (
                                    <button key={m} onClick={() => setLegMaterial(m)} className={`flex-1 py-5 border-2 rounded-2xl text-[10px] font-bold uppercase transition-all ${legMaterial === m ? 'bg-black text-white border-black' : 'border-gray-50 hover:border-gray-200'}`}>{m}</button>
                                 ))}
                              </div>
                           </div>
                        </>
                     )}
                     {isBed && (
                        <div className="space-y-8">
                           <label className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Headboard Silhouette</label>
                           <div className="grid grid-cols-1 gap-6">
                              {bedFrames.map(s => (
                                 <button key={s.id} onClick={() => setShapeUp(s.id)} className={`group relative h-48 rounded-[2.5rem] overflow-hidden border-2 transition-all ${shapeUp === s.id ? 'border-black' : 'border-gray-50 hover:border-gray-200'}`}>
                                    <img src={s.img} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                       <span className="text-white text-[11px] font-bold uppercase tracking-[0.3em] drop-shadow-lg">{s.name}</span>
                                    </div>
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                     {isBookshelf && (
                        <div className="space-y-8">
                           <label className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Shelving Style</label>
                           <div className="grid grid-cols-3 gap-4">
                              {shelfStyles.map(s => (
                                 <button key={s.id} onClick={() => setBookshelfStyle(s.id)} className={`flex flex-col items-center gap-4 p-8 border-2 rounded-3xl transition-all ${bookshelfStyle === s.id ? 'bg-black text-white border-black' : 'border-gray-50 hover:border-gray-200'}`}>
                                    {s.icon}
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-center">{s.name}</span>
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            )}

            {currentStep === 4 && (
               <div className="space-y-16 animate-fade-in">
                  <div className="space-y-4">
                     <h2 className="text-3xl font-serif font-bold">Functional Details</h2>
                     <p className="text-sm text-gray-400 font-light">Custom features for specific utility.</p>
                  </div>
                  <div className="space-y-12">
                     {isDesk && (
                        <div className="space-y-8">
                           <button onClick={() => setLayering(layering === 'office' ? 'none' : 'office')} className={`w-full p-10 border-2 rounded-[3rem] transition-all flex flex-col items-center gap-4 ${layering === 'office' ? 'bg-black text-white border-black shadow-2xl' : 'text-gray-400 border-dashed hover:border-black'}`}>
                              <Monitor className="w-8 h-8" />
                              <div className="text-center">
                                 <span className="block text-[10px] font-bold uppercase tracking-widest">Add Modesty Panel</span>
                                 <span className="text-[8px] opacity-60">Back privacy wall for office use.</span>
                              </div>
                           </button>
                           <div className="p-8 bg-gray-50 rounded-3xl flex items-center gap-4">
                              <Cpu className="w-6 h-6 text-black" />
                              <div>
                                 <p className="text-[10px] font-bold uppercase tracking-widest">Cable Grommet Included</p>
                                 <p className="text-[8px] text-gray-400 uppercase">Standard feature for bespoke desks.</p>
                              </div>
                           </div>
                        </div>
                     )}
                     {isTable && (
                        <div className="space-y-6">
                           <label className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Edge Profile</label>
                           <div className="grid grid-cols-2 gap-4">
                              {['straight', 'beveled', 'rounded'].map(e => (
                                 <button key={e} onClick={() => setEdgeProfile(e)} className={`py-6 border-2 rounded-3xl text-[10px] font-bold uppercase transition-all ${edgeProfile === e ? 'bg-black text-white' : 'border-gray-50'}`}>{e}</button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>

         <div className="px-12 py-10 border-t border-gray-50 bg-white">
            <div className="flex gap-4">
               {currentStep > 1 && <button onClick={prevStep} className="w-20 h-24 border-2 border-gray-50 rounded-3xl flex items-center justify-center hover:border-black transition-all"><ChevronLeft className="w-8 h-8" /></button>}
               {currentStep < 4 ? (
                 <button onClick={nextStep} className={`flex-1 bg-black text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-3xl flex items-center justify-center gap-3 shadow-2xl transition-transform active:scale-95 ${currentStep === 1 ? 'py-10 border-[6px] border-black/10' : 'py-8'}`}>
                    Next Phase <ChevronRight className="w-5 h-5" />
                 </button>
               ) : (
                 <button onClick={handleAddToCart} className="flex-1 bg-black text-white py-10 text-[11px] font-bold uppercase tracking-[0.4em] rounded-3xl flex items-center justify-center gap-3 shadow-2xl transition-transform active:scale-95">
                    Finalize Vision <ShoppingCart className="w-6 h-6" />
                 </button>
               )}
            </div>
         </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Customize;
