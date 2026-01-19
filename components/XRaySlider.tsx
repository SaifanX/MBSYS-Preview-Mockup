import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface XRaySliderProps {
  imageBefore: string;
  imageAfter: string;
  labelBefore?: string;
  labelAfter?: string;
}

const XRaySlider: React.FC<XRaySliderProps> = ({ 
  imageBefore, 
  imageAfter,
  labelBefore = "Visual Finish",
  labelAfter = "Infrastructure"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl border border-slate-700 shadow-2xl select-none group cursor-ew-resize"
      onClick={(e) => handleMove(e.clientX)}
    >
      {/* Before Image (Top Layer - Infrastructure) */}
      <div className="absolute inset-0 w-full h-full bg-slate-900">
         <img 
          src={imageAfter} 
          alt="Infrastructure View" 
          className="w-full h-full object-cover opacity-60 mix-blend-screen filter grayscale contrast-125 brightness-150"
          draggable={false}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"></div>
        
        {/* Tech Overlay for Infrastructure */}
        <div className="absolute top-8 left-8 bg-secondary/10 backdrop-blur-md px-4 py-2 rounded border border-secondary/50 text-secondary text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)]">
           {labelAfter}
        </div>
      </div>

      {/* After Image (Bottom Layer - Visual Finish, clipped) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={imageBefore} 
          alt="Finished View" 
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-sm px-4 py-2 rounded text-white text-xs font-mono uppercase border border-white/20">
           {labelBefore}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-20 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-110 active:scale-95">
          <MoveHorizontal className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default XRaySlider;
