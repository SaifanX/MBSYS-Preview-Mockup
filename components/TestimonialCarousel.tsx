import React, { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const TRANSITION_DURATION = 600;

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (direction === 'next') {
          return (prev + 1) % testimonials.length;
        } else {
          return (prev - 1 + testimonials.length) % testimonials.length;
        }
      });
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, [isAnimating, testimonials.length]);

  const next = useCallback(() => changeSlide('next'), [changeSlide]);
  const prev = useCallback(() => changeSlide('prev'), [changeSlide]);

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[currentIndex];

  return (
    <div className="relative group max-w-4xl mx-auto">
      <div 
        className={`transition-all duration-[600ms] ease-in-out transform ${
          isAnimating 
            ? 'opacity-0 translate-y-8 scale-95 blur-sm' 
            : 'opacity-100 translate-y-0 scale-100 blur-0'
        }`}
      >
        <div className="relative p-12 lg:p-16 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.1)] overflow-hidden">
          <Quote className="absolute top-8 right-8 w-24 h-24 text-slate-100 dark:text-slate-800/20" />
          
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className={`w-3 h-3 rounded-full bg-secondary animate-pulse`}></div>
            <span className="font-tech text-[10px] text-slate-400 tracking-tighter uppercase font-bold">Encrypted_Transmission_{currentIndex + 1}</span>
          </div>
          
          <p className="text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 italic mb-12 relative z-10 leading-relaxed font-sans font-light">
            "{t.quote}"
          </p>
          
          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 relative z-10">
            <p className="font-display font-bold text-slate-900 dark:text-white text-xl tracking-tight">{t.author}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-secondary font-black uppercase tracking-[0.25em] font-tech">{t.role}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.25em] font-tech">{t.company}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="flex justify-center mt-12 gap-4">
        <button 
          onClick={prev}
          disabled={isAnimating}
          className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white hover:border-secondary transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={next}
          disabled={isAnimating}
          className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white hover:border-secondary transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx === currentIndex || isAnimating) return;
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex(idx);
                setIsAnimating(false);
              }, TRANSITION_DURATION);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? 'w-12 bg-primary' : 'w-4 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;