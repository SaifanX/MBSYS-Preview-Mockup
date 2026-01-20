import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Moon, Sun, Lock } from 'lucide-react';
import MbsysLogo from './MbsysLogo';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: (event: React.MouseEvent) => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleTheme, onNavigate, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) left-0 right-0 mx-auto ${
        scrolled 
          ? 'top-4 w-[92%] md:w-[85%] max-w-7xl rounded-2xl glass-panel border border-slate-200 dark:border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-3 px-6' 
          : 'top-0 w-full bg-transparent border-b border-transparent py-6 px-4 sm:px-8'
      }`}
    >
      <div className={`w-full ${scrolled ? '' : 'max-w-7xl mx-auto'}`}>
        <div className="flex justify-between items-center">
          
          <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center gap-3 group relative z-10">
             <div className="h-10 md:h-12 flex items-center transition-transform duration-300 group-hover:scale-105">
                <MbsysLogo className="h-full w-auto" />
             </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors relative group py-2 ${
                  currentPath === link.href ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                } hover:text-primary`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${currentPath === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            ))}
            
            <button 
              onClick={onToggleTheme}
              className="p-2.5 rounded-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300 shadow-inner group"
              aria-label="Toggle Theme"
            >
              {darkMode ? 
                <Sun size={18} className="group-hover:text-yellow-400 transition-colors" /> : 
                <Moon size={18} className="group-hover:text-secondary transition-colors" />
              }
            </button>

            <div className={`flex items-center gap-4 pl-6 border-l ${scrolled ? 'border-slate-300 dark:border-slate-500/30' : 'border-slate-200 dark:border-slate-700'}`}>
               <div className="text-right hidden lg:block">
                  <p className="text-[9px] uppercase tracking-tighter text-slate-500 dark:text-slate-400 font-bold">Secure Support</p>
                  <p className="font-tech font-bold text-lg text-slate-900 dark:text-white leading-none tabular-nums">+91 988-6374-122</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse-slow hover:scale-110 transition-transform cursor-pointer">
                 <Phone size={18} />
               </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={onToggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 mt-4 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 space-y-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block text-lg font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
             <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
               <div className="flex items-center justify-center gap-2 text-slate-500">
                  <Lock size={14} />
                  <span className="text-[10px] uppercase font-bold">Encrypted Session</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;