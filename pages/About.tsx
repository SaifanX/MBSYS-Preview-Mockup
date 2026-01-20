import React, { useEffect, useState, useRef } from 'react';
import { Terminal, ArrowRight, Zap } from 'lucide-react';
import { TimelineItem } from '../types';

interface AboutProps {
  timeline: TimelineItem[];
  onNavigate: (path: string) => void;
}

const TimelineCard = ({ item, index, isVisible }: { item: TimelineItem, index: number, isVisible: boolean }) => {
  const [scrollY, setScrollY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerOffset = (window.innerHeight / 2 - rect.top) * 0.1;
        setScrollY(centerOffset);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div 
      ref={cardRef}
      className={`timeline-item-trigger flex flex-col md:flex-row items-center justify-between group transition-all duration-1000 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transform: isVisible ? `translateY(${scrollY}px)` : 'translateY(80px)' }}
    >
      <div className="w-full md:w-5/12 mb-10 md:mb-0">
        <div className={`p-10 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark group-hover:border-primary transition-all duration-500 shadow-xl ${index % 2 === 0 ? 'md:text-right md:border-r-4 md:border-r-primary' : 'md:text-left md:border-l-4 md:border-l-secondary'}`}>
          <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4 group-hover:text-glow transition-all">{item.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed">{item.description}</p>
        </div>
      </div>
      
      <div className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-slate-200 dark:border-slate-700 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] group-hover:scale-110 transition-all duration-500`}>
        <span className="font-tech font-bold text-lg text-secondary">{item.year}</span>
      </div>
      
      <div className="w-full md:w-5/12"></div>
    </div>
  );
};

const About: React.FC<AboutProps> = ({ timeline, onNavigate }) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleItems((prev) => new Set([...prev, index]));
        }
      });
    }, { threshold: 0.1 });

    const items = timelineRef.current?.querySelectorAll('.timeline-item-trigger-zone');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-32 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8 animate-in slide-in-from-left-4 duration-1000">
            <span className="text-secondary font-tech font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Legacy Trace</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-8">Connecting The Decades</h2>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-lg leading-relaxed mb-6">
              Founded in Bangalore, MBSYS has spent a decade pioneering the integration of advanced IT infrastructure into physical environments. We believe that technology should be as invisible as it is essential.
            </p>
            <div className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 group transition-colors hover:border-secondary">
               <Terminal className="text-secondary group-hover:animate-pulse" />
               <span className="font-tech text-xs uppercase tracking-widest text-slate-500 font-bold">Status: Operational // Uptime: 10 Years</span>
            </div>
          </div>
          <div className="relative animate-in zoom-in-95 duration-1000">
             <div className="absolute -inset-4 bg-secondary/10 blur-3xl rounded-full"></div>
             <div className="relative overflow-hidden rounded-sm group">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaCS6QAEFXR8oMkrxKqgSagkYINwmXT8HZymGlz7-jnqb-LTTYhVgRqc3XLw9hYyZQtcSth9NQlbDdpR0MnL_I9nIv6gI9VmsUkbbS00jliNwa_i2dUnpt5M5H_r3Pn6ZaXrfGJjcSr28qlJVbpcpLP9ZxocER5gF4xZtw55EdUVIq0QaC4Dsfc3T_DHUwMYC7ObfUA1CLFncRxgtIvvHvPUm8df6xZjkHzd0CcQFVZdG5Xj6eyWIGovBUEr_TPj14q7wa8DpY0h8e" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt="MBSYS HQ" />
             </div>
          </div>
        </div>

        <div className="relative mb-40" ref={timelineRef}>
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block"></div>
          
          <div className="space-y-32">
            {timeline.map((item, index) => (
              <div key={index} data-index={index} className="timeline-item-trigger-zone">
                <TimelineCard item={item} index={index} isVisible={visibleItems.has(index)} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bottom Section */}
        <div className="relative p-12 lg:p-20 bg-slate-900 border border-slate-800 rounded-sm overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full group-hover:bg-secondary/20 transition-all duration-700"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <span className="text-secondary font-tech font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Ready for the Next Phase?</span>
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Initialize Your Infrastructure Sync</h2>
              <p className="text-slate-400 font-sans text-lg">Our legacy is built on the success of our clients. Let's start building yours today with a customized technical blueprint.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button 
                onClick={() => onNavigate('#services')}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-900 font-tech font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-secondary hover:text-white transition-all shadow-2xl"
              >
                Explore Stack <Zap size={18} />
              </button>
              <button 
                onClick={() => onNavigate('#contact')}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-slate-700 text-white font-tech font-bold uppercase tracking-[0.2em] rounded-sm hover:border-primary hover:bg-primary/5 transition-all"
              >
                Establish Link <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;