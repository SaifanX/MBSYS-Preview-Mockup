import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Moon, Sun, Lock } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'glass-panel border-slate-700/50 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
             <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-primary/50'}`} />
                ))}
             </div>
             <div className="flex flex-col">
                <span className="text-2xl font-display font-bold tracking-widest text-slate-900 dark:text-white">MBSYS</span>
                <span className="text-[10px] uppercase tracking-wider text-secondary font-bold">Connecting Dots</span>
             </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-700">
               <div className="text-right hidden lg:block">
                  <p className="text-[10px] uppercase text-slate-500 dark:text-slate-400">Secure Line</p>
                  <p className="font-tech font-bold text-lg text-slate-900 dark:text-white">+91 988-6374-122</p>
               </div>
               <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                 <Phone size={20} />
               </div>
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
             <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
               <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Lock size={14} />
                  <span className="text-xs uppercase">Connection Secure</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
