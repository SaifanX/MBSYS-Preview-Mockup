import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  onNavigate: (path: string) => void;
}

const ServiceCard = ({ 
  service, 
  idx, 
  onExpand 
}: { 
  service: Service, 
  idx: number, 
  onExpand: (s: Service) => void 
}) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)] transition-all duration-700 hover:border-secondary/30"
      style={{ transitionDelay: `${idx * 100}ms` }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.15), transparent 80%)`
        }}
      />

      <div className="h-56 overflow-hidden relative">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125 group-hover:rotate-2" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 p-3 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/40">
          <service.icon className="text-white w-6 h-6" />
        </div>
      </div>
      <div className="p-10 relative z-20">
        <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-4 group-hover:text-secondary transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 font-sans text-sm mb-8 leading-relaxed opacity-80">
          {service.description}
        </p>
        <button 
          onClick={() => onExpand(service)}
          className="inline-flex items-center text-[10px] font-tech font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all group/link"
        >
          Explore Protocol <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
        </button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent h-10 w-full translate-y-[-100%] group-hover:translate-y-[600%] transition-transform duration-[3s] pointer-events-none"></div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ services, onNavigate }) => {
  const [expandedService, setExpandedService] = useState<Service | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (expandedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [expandedService]);

  return (
    <div className="pt-32 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <span className="text-primary font-tech font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Architectural Solutions</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6 text-glow">Expertise Stack</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              idx={idx} 
              onExpand={setExpandedService} 
            />
          ))}
        </div>
      </div>

      {/* Expanded Details Overlay */}
      {expandedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setExpandedService(null)}
          ></div>
          
          <div className="relative w-full max-w-4xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 max-h-[90vh] lg:max-h-[80vh]">
            
            {/* Improved Close Button Position */}
            <button 
              onClick={() => setExpandedService(null)}
              className="absolute top-4 right-4 z-[110] p-2 bg-slate-900/50 hover:bg-primary text-white backdrop-blur-md rounded-full transition-all border border-white/10"
              aria-label="Close details"
            >
              <X size={20} />
            </button>
            
            <div className="w-full lg:w-2/5 h-48 lg:h-auto overflow-hidden relative flex-shrink-0">
              <img src={expandedService.image} alt={expandedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-dark/60 via-transparent to-transparent"></div>
            </div>

            <div className="w-full lg:w-3/5 p-6 lg:p-12 space-y-6 lg:space-y-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-secondary">
                  <expandedService.icon size={22} />
                  <span className="font-tech text-[10px] uppercase font-bold tracking-[0.3em]">System_Expansion // Core</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{expandedService.title}</h2>
              </div>

              <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                {expandedService.longDescription}
              </p>

              <div className="space-y-4">
                <h4 className="text-[9px] font-tech font-black uppercase tracking-[0.3em] text-slate-500">Service Parameters</h4>
                <ul className="grid grid-cols-1 gap-2 lg:gap-3">
                  {expandedService.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-sm group/feature">
                      <CheckCircle2 size={16} className="text-secondary shrink-0 group-hover/feature:scale-110 transition-transform" />
                      <span className="text-xs lg:text-sm font-sans text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => {
                    setExpandedService(null);
                    onNavigate('#contact');
                  }}
                  className="w-full py-4 bg-primary text-white font-tech font-bold uppercase tracking-[0.3em] text-xs hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-[0.98] group"
                >
                  Initiate Secure Sync <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;