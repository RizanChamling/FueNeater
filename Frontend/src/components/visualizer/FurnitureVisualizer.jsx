import React from 'react';

const FurnitureVisualizer = ({ 
  type, 
  dimensions, 
  material, 
  frameColor, 
  shelves,
  shapeUp = 'standard',
  shapeDown = 'standard',
  legStyle = 'standard',
  layering = 'none'
}) => {
  const { width, height, depth } = dimensions;
  const viewWidth = 600;
  const viewHeight = 400;
  const scale = 1.6;

  // Material and Frame definitions
  const materials = {
    oak: { color: '#D4A373', contrast: '#B5835A' },
    walnut: { color: '#5B3E31', contrast: '#3D2B22' },
    maple: { color: '#FAEDCD', contrast: '#D4A373' },
    ash: { color: '#E8E8E4', contrast: '#D1D1D1' },
    velvet_navy: { color: '#1B263B', contrast: '#0D1B2A' },
    velvet_emerald: { color: '#064E3B', contrast: '#022C22' },
  };

  const frames = {
    'matte-black': '#111111',
    'brushed-steel': '#A8A9AD',
    'brass': '#E1C16E',
    'white': '#F8F9FA',
    'brushed-gold': '#D4AF37',
  };

  const currentMat = materials[material] || materials.oak;
  const frameHex = frames[frameColor] || frames['matte-black'];

  const w = width * scale;
  const h = height * scale;
  const dOffset = (depth / 100) * 45;

  const renderDesk = () => {
    const topT = 12;
    const legW = legStyle === 'tapered' ? 10 : 12;

    return (
      <g transform={`translate(${viewWidth/2 - w/2}, ${viewHeight/2 + 60})`}>
        {/* Shadow */}
        <ellipse cx={w/2 + dOffset/2} cy={10} rx={w/2 + 20} ry={dOffset/2 + 10} fill="black" opacity="0.1" filter="url(#softBlur)" />
        
        {/* Legs */}
        {/* Back Legs */}
        <rect x={dOffset} y={-h - dOffset} width={legW} height={h} fill={frameHex} opacity="0.7" rx={legStyle === 'round' ? legW/2 : 0} />
        <rect x={w - legW + dOffset} y={-h - dOffset} width={legW} height={h} fill={frameHex} opacity="0.7" rx={legStyle === 'round' ? legW/2 : 0} />
        
        {/* Front Legs */}
        <rect x={0} y={-h} width={legW} height={h} fill={frameHex} rx={legStyle === 'round' ? legW/2 : 1} />
        <rect x={w - legW} y={-h} width={legW} height={h} fill={frameHex} rx={legStyle === 'round' ? legW/2 : 1} />

        {/* Top */}
        <g transform={`translate(0, ${-h})`}>
          {/* Top Surface */}
          <polygon points={`0,0 ${dOffset},${-dOffset} ${w + dOffset},${-dOffset} ${w},0`} fill={currentMat.color} filter="url(#woodGrain)" />
          {/* Front Edge */}
          <rect x={0} y={0} width={w} height={topT} fill={currentMat.color} filter="url(#woodGrain)" rx="2" />
          <rect x={0} y={0} width={w} height={topT} fill="url(#edgeShadow)" rx="2" />
          {/* Side Edge */}
          <polygon points={`${w},0 ${w + dOffset},${-dOffset} ${w + dOffset},${-dOffset + topT} ${w},${topT}`} fill={currentMat.contrast} opacity="0.8" />
        </g>
      </g>
    );
  };

  const renderBed = () => {
    const headH = shapeUp === 'tall' ? h * 1.5 : h;
    const baseH = 40;
    const mattressH = 25;

    return (
      <g transform={`translate(${viewWidth/2 - w/2}, ${viewHeight/2 + 80})`}>
        {/* Floor Shadow */}
        <ellipse cx={w/2 + dOffset/2} cy={0} rx={w/2 + 30} ry={dOffset + 15} fill="black" opacity="0.12" filter="url(#softBlur)" />

        {/* Headboard (Upward Part) */}
        <g transform={`translate(dOffset, ${-headH - dOffset})`}>
          {shapeUp === 'curved' ? (
            <path d={`M 0,${headH} L 0,20 Q ${w/2},-20 ${w},20 L ${w},${headH} Z`} fill={currentMat.color} filter="url(#leatherTexture)" />
          ) : (
            <rect width={w} height={headH} fill={currentMat.color} rx="4" filter="url(#leatherTexture)" />
          )}
          {/* Headboard Detail (Tufting or Lining) */}
          <line x1={0} y1={headH/2} x2={w} y2={headH/2} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        </g>

        {/* Bed Base (Downward Part) */}
        <g transform={`translate(0, 0)`}>
           {/* Side Rail */}
           <polygon points={`0,0 ${dOffset},${-dOffset} ${dOffset},${-dOffset+baseH} 0,${baseH}`} fill={currentMat.contrast} />
           {/* Footboard / End Rail */}
           <rect x={0} y={0} width={w} height={baseH} fill={currentMat.color} rx="2" />
        </g>

        {/* Mattress & Linens (Layering) */}
        <g transform={`translate(5, ${-mattressH + 5})`}>
           {/* Mattress Top */}
           <polygon points={`0,0 ${dOffset},${-dOffset} ${w-10+dOffset},${-dOffset} ${w-10},0`} fill="#FFFFFF" fillOpacity="0.95" />
           {/* Front Edge */}
           <rect x={0} y={0} width={w-10} height={mattressH} fill="#F0F0F0" rx="4" />
           {/* Pillow detail if relevant */}
           {layering === 'cushions' && (
             <g transform={`translate(${dOffset + 20}, ${-dOffset})`}>
                <rect width={w/3} height={15} rx="5" fill="#FFF" />
                <rect x={w/2} width={w/3} height={15} rx="5" fill="#FFF" />
             </g>
           )}
        </g>
      </g>
    );
  };

  const renderChair = () => {
    const seatH = 45 * scale;
    const backH = shapeUp === 'high' ? 60 * scale : 45 * scale;
    const legW = 10;

    return (
      <g transform={`translate(${viewWidth/2 - w/2}, ${viewHeight/2 + 100})`}>
        {/* legs */}
        <rect x={0} y={-seatH} width={legW} height={seatH} fill={frameHex} rx={legStyle === 'round' ? legW/2 : 1} />
        <rect x={w-legW} y={-seatH} width={legW} height={seatH} fill={frameHex} rx={legStyle === 'round' ? legW/2 : 1} />
        <rect x={dOffset} y={-seatH - dOffset} width={legW} height={seatH} fill={frameHex} opacity="0.7" />
        <rect x={w-legW+dOffset} y={-seatH - dOffset} width={legW} height={seatH} fill={frameHex} opacity="0.7" />

        {/* Seat */}
        <g transform={`translate(0, ${-seatH})`}>
           <polygon points={`0,0 ${dOffset},${-dOffset} ${w+dOffset},${-dOffset} ${w},0`} fill={currentMat.color} filter="url(#leatherTexture)" />
           <rect x={0} y={0} width={w} height={15} fill={currentMat.color} rx="5" filter="url(#leatherTexture)" />
        </g>

        {/* Backrest */}
        <g transform={`translate(dOffset, ${-seatH - dOffset - backH})`}>
          {shapeUp === 'oval' ? (
             <ellipse cx={w/2} cy={backH/2} rx={w/2} ry={backH/2} fill={currentMat.color} filter="url(#leatherTexture)" />
          ) : (
             <rect width={w} height={backH} fill={currentMat.color} rx="8" filter="url(#leatherTexture)" />
          )}
        </g>
      </g>
    );
  };

  const renderBookshelf = () => {
    const shelfT = 10;
    const count = parseInt(shelves) || 4;

    return (
      <g transform={`translate(${viewWidth/2 - w/2}, ${viewHeight/2 + h/2})`}>
        {/* Frame */}
        <rect x={0} y={-h} width={10} height={h} fill={frameHex} />
        <rect x={w-10} y={-h} width={10} height={h} fill={frameHex} />
        
        {/* Shelves */}
        {Array.from({ length: count }).map((_, i) => {
          const y = -h + (i * (h - shelfT) / (count - 1));
          return (
            <g key={i} transform={`translate(0, ${y})`}>
              <polygon points={`0,0 ${dOffset},${-dOffset} ${w+dOffset},${-dOffset} ${w},0`} fill={currentMat.color} filter="url(#woodGrain)" />
              <rect x={0} y={0} width={w} height={shelfT} fill={currentMat.color} filter="url(#woodGrain)" />
              <rect x={0} y={0} width={w} height={shelfT} fill="url(#edgeShadow)" />
            </g>
          );
        })}
      </g>
    );
  }

  return (
    <div className="relative w-full aspect-video flex items-center justify-center bg-[#f8f9fa] rounded-3xl overflow-hidden shadow-inner group">
      {/* Background Room Silhouette */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
        <svg viewBox="0 0 600 400" className="w-full h-full">
           <line x1="0" y1="300" x2="600" y2="300" stroke="black" strokeWidth="2" />
           <line x1="150" y1="0" x2="150" y2="300" stroke="black" strokeWidth="1" />
           <line x1="150" y1="100" x2="300" y2="100" stroke="black" strokeWidth="1" />
           <line x1="300" y1="100" x2="300" y2="300" stroke="black" strokeWidth="1" />
        </svg>
      </div>

      <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="w-full h-full max-w-2xl drop-shadow-xl transition-all duration-700 ease-in-out">
        <defs>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <filter id="woodGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.15" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
            <feBlend mode="multiply" in2="SourceGraphic" />
          </filter>
          <filter id="leatherTexture">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" />
            <feBlend mode="overlay" in2="SourceGraphic" />
          </filter>
          <linearGradient id="edgeShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.1" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="luxShine" cx="50%" cy="50%" r="50%">
             <stop offset="0%" stopColor="white" stopOpacity="0.2" />
             <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {type === 'desk' && renderDesk()}
        {type === 'bed' && renderBed()}
        {type === 'chair' && renderChair()}
        {type === 'bookshelf' && renderBookshelf()}
      </svg>
      
      {/* Premium Badge */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-white/50 rounded-full shadow-sm">
        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Premium Render</span>
      </div>
    </div>
  );
};

export default FurnitureVisualizer;
