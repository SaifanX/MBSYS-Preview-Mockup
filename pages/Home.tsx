import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Zap, CheckCircle, Shield, Server, Wifi, Quote, Activity, Globe, Star, ExternalLink } from 'lucide-react';
import Counter from '../components/Counter';
import XRaySlider from '../components/XRaySlider';
import MbsysLogo from '../components/MbsysLogo';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Service, Testimonial } from '../types';

interface HomeProps {
  services: Service[];
  onNavigate: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ services, onNavigate }) => {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const testimonials: Testimonial[] = [
    { id: '1', author: 'Arjun Mehta', role: 'CTO', company: 'Nexus FinTech', quote: "MBSYS didn't just install hardware; they architected a nervous system for our headquarters. Unmatched precision." },
    { id: '2', author: 'Sarah Jenkins', role: 'Operations Director', company: 'CloudCore Labs', quote: "The IoT integration reduced our facility energy overhead by 30%. Their technical foresight is extraordinary." },
    { id: '3', author: 'Vikram Singh', role: 'Head of Security', company: 'Indigo Retail', quote: "Our surveillance grid is now proactive rather than reactive. The AI integration provided by MBSYS is game-changing." }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 120) {
      setMagneticPos({ x: distanceX * 0.3, y: distanceY * 0.3 });
    } else {
      setMagneticPos({ x: 0, y: 0 });
    }
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="animate-in fade-in duration-700 fill-mode-both" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow delay-700"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 xl:col-span-8 space-y-8 lg:space-y-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-in slide-in-from-left-4 duration-500">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[10px] lg:text-[11px] font-bold text-secondary tracking-widest uppercase font-tech">Connecting_Dots // v2.9</span>
              </div>
              
              <div className="relative">
                <h1 className="text-6xl md:text-8xl xl:text-9xl font-display font-bold leading-[0.85] select-none tracking-tighter animate-in slide-in-from-left-4 duration-700 delay-100 max-w-fit">
                  <span className="text-slate-900 dark:text-white">Connecting</span> <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-blue-700 to-primary dark:via-blue-400 dark:to-white drop-shadow-2xl">Dots</span>
                </h1>
              </div>
              
              <div className="max-w-xl space-y-8 animate-in slide-in-from-left-4 duration-1000 delay-200">
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 border-l-4 border-primary pl-6 lg:pl-8 py-2 leading-relaxed font-sans">
                  High-precision digital integration for mission-critical physical environments. Connecting architectural vision with modular technical reality since 2016.
                </p>
                
                <div className="flex flex-wrap gap-4 lg:gap-6 pt-4">
                  <a 
                    ref={ctaRef}
                    href="#services" 
                    onClick={(e) => handleLinkClick(e, '#services')}
                    style={{ transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)` }}
                    className="relative overflow-hidden group inline-flex items-center justify-center px-8 lg:px-10 py-4 lg:py-5 bg-primary text-white font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.7)] font-tech text-xs lg:text-sm"
                  >
                    <span className="relative z-10">Discover Our Services</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                    <ArrowRight className="ml-3 w-4 h-4 lg:w-5 lg:h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <button 
                    onClick={(e) => handleLinkClick(e, '#about')}
                    className="inline-flex items-center justify-center px-8 lg:px-10 py-4 lg:py-5 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-tech text-xs lg:text-sm"
                  >
                    Explore Core
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6 animate-in slide-in-from-right-12 duration-1000">
               {/* Stat 1: Experience */}
               <div className="group relative glass-panel p-6 rounded-sm border-l-[4px] border-secondary overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] dark:hover:border-l-white bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-transparent">
                  <div className="flex justify-between items-start mb-4 lg:mb-6">
                    <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-secondary group-hover:scale-125 transition-all duration-300 group-hover:animate-pulse" />
                    <span className="text-[10px] font-tech opacity-40 group-hover:opacity-100 transition-opacity">SYS_X1</span>
                  </div>
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-slate-900 dark:text-white mb-1 lg:mb-2 tracking-tighter transition-transform group-hover:scale-110 origin-left">
                    <Counter end={10} suffix="+" />
                  </div>
                  <p className="text-[9px] lg:text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] lg:tracking-[0.25em] group-hover:text-secondary transition-colors font-tech">Years Experience</p>
                  <div className="absolute bottom-0 left-0 h-1 bg-secondary w-0 group-hover:w-full transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>

               {/* Stat 2: Projects */}
               <div className="group relative glass-panel p-6 rounded-sm border-l-[4px] border-primary overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] dark:hover:border-l-white bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-transparent">
                  <div className="flex justify-between items-start mb-4 lg:mb-6">
                    <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-primary group-hover:scale-125 transition-all duration-300 group-hover:rotate-[360deg] duration-1000" />
                    <span className="text-[10px] font-tech opacity-40 group-hover:opacity-100 transition-opacity">SYS_X2</span>
                  </div>
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-slate-900 dark:text-white mb-1 lg:mb-2 tracking-tighter transition-transform group-hover:scale-110 origin-left">
                    <Counter end={100} suffix="+" />
                  </div>
                  <p className="text-[9px] lg:text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] lg:tracking-[0.25em] group-hover:text-primary transition-colors font-tech">Projects Done</p>
                  <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>

               {/* Stat 3: Installations */}
               <div className="group relative glass-panel p-6 rounded-sm border-l-[4px] border-secondary overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] dark:hover:border-l-white bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-transparent">
                  <div className="flex justify-between items-start mb-4 lg:mb-6">
                    <Activity className="w-6 h-6 lg:w-8 lg:h-8 text-secondary group-hover:scale-125 transition-all duration-300" />
                    <span className="text-[10px] font-tech opacity-40 group-hover:opacity-100 transition-opacity">SYS_X3</span>
                  </div>
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-slate-900 dark:text-white mb-1 lg:mb-2 tracking-tighter transition-transform group-hover:scale-110 origin-left">
                    <Counter end={500} suffix="+" />
                  </div>
                  <p className="text-[9px] lg:text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] lg:tracking-[0.25em] group-hover:text-secondary transition-colors font-tech">Installations</p>
                  <div className="absolute bottom-0 left-0 h-1 bg-secondary w-0 group-hover:w-full transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>

               {/* Stat 4: Support */}
               <div className="group relative glass-panel p-6 rounded-sm border-l-[4px] border-primary overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] dark:hover:border-l-white bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-transparent">
                  <div className="flex justify-between items-start mb-4 lg:mb-6">
                    <Globe className="w-6 h-6 lg:w-8 lg:h-8 text-primary group-hover:scale-125 transition-all duration-300 group-hover:animate-spin-slow" />
                    <span className="text-[10px] font-tech opacity-40 group-hover:opacity-100 transition-opacity">SYS_X4</span>
                  </div>
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-slate-900 dark:text-white mb-1 lg:mb-2 tracking-tighter transition-transform group-hover:scale-110 origin-left font-tech">
                    24/7
                  </div>
                  <p className="text-[9px] lg:text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] lg:tracking-[0.25em] group-hover:text-primary transition-colors font-tech">Direct Support</p>
                  <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Protocol (Review Embedding) */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-10">
               <div className="w-24 h-24 md:w-28 md:h-28 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-700 p-5 transition-all hover:rotate-6 hover:scale-110">
                  <MbsysLogo className="w-full h-auto" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Network Sentiment</h3>
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#FACC15" className="text-yellow-400" />)}
                     </div>
                     <span className="ml-3 font-tech text-base font-bold text-slate-600 dark:text-slate-400">5.0/5.0 Google Presence</span>
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold opacity-60 font-tech">Synced with Global Ecosystem</p>
               </div>
            </div>
            <a 
              href="https://maps.app.goo.gl/7aEp8tyHSyCm8fUh6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-12 py-6 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm text-xs font-black uppercase tracking-[0.25em] hover:border-secondary hover:text-secondary transition-all group shadow-2xl hover:-translate-y-2 font-tech"
            >
              Verify Deployment <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-24 bg-background-light dark:bg-background-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block font-tech">Client Endorsements</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white">Validation Protocol</h2>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Grid Overview Section */}
      <section className="py-32 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6 group p-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/20 transition-all duration-500">
              <Server className="text-primary w-12 h-12 group-hover:rotate-12 transition-transform duration-500" />
              <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Scalable IT</h3>
              <p className="text-slate-500 font-sans leading-relaxed text-lg font-light">Enterprise-grade infrastructure designed to grow synchronously with your operational demands, ensuring zero latency as you scale.</p>
            </div>
            <div className="space-y-6 group p-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/20 transition-all duration-500">
              <Shield className="text-secondary w-12 h-12 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Smart Security</h3>
              <p className="text-slate-500 font-sans leading-relaxed text-lg font-light">Advanced AI-driven surveillance and network fortification providing a proactive defense grid for physical and digital assets.</p>
            </div>
            <div className="space-y-6 group p-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/20 transition-all duration-500">
              <Wifi className="text-primary w-12 h-12 group-hover:-translate-y-2 transition-transform duration-500" />
              <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Unified Control</h3>
              <p className="text-slate-500 font-sans leading-relaxed text-lg font-light">Seamless IoT integration providing centralized mastery over environment parameters through a single tactical interface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* X-Ray Section */}
      <section className="py-32 bg-slate-100 dark:bg-[#080d1a] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-20 max-w-2xl">
              <span className="text-secondary font-tech text-xs font-bold tracking-[0.5em] mb-4 block">SCAN_MODULE.v4 // ANALYZE</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-8">Unveiling The Grid</h2>
              <p className="text-slate-500 dark:text-slate-400 font-sans text-lg leading-relaxed">Every high-performance environment is built on a foundation of invisible, precisely engineered technical complexity.</p>
           </div>
           <XRaySlider 
              imageBefore="https://lh3.googleusercontent.com/aida-public/AB6AXuAaCS6QAEFXR8oMkrxKqgSagkYINwmXT8HZymGlz7-jnqb-LTTYhVgRqc3XLw9hYyZQtcSth9NQlbDdpR0MnL_I9nIv6gI9VmsUkbbS00jliNwa_i2dUnpt5M5H_r3Pn6ZaXrfGJjcSr28qlJVbpcpLP9ZxocER5gF4xZtw55EdUVIq0QaC4Dsfc3T_DHUwMYC7ObfUA1CLFncRxgtIvvHvPUm8df6xZjkHzd0CcQFVZdG5Xj6eyWIGovBUEr_TPj14q7wa8DpY0h8e"
              imageAfter="https://lh3.googleusercontent.com/aida-public/AB6AXuBmRTBh8JzHa8ksbtStBCAImHMnt6QWptJC2oGa0OtfyVkf5WxBhCATka8THF1zwfbjAJK3tV1eQ7r52M4cILKqZu9vdVPIIJaop4K8VcyV3doN9FJn4cyfZA7hbAm2IaoiLu5Tit2-JbvdoxTsB8OKtudHXcIgC6loZnDM7-UIxwyBIDwxhucssiwFUEC20VdWrcPzi80bPEGJjJLopVHREDFT5784kENNeXF5KjgMOldl8XZWZgFkNcgQJpIAtGt7qDTgo5prr0b3"
           />
        </div>
      </section>
    </div>
  );
};

export default Home;