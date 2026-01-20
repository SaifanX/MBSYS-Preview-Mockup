import React from 'react';
import MbsysLogo from './MbsysLogo';
import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 relative z-10 overflow-hidden">
      {/* Tactical Presence Section */}
      <div className="w-full border-b border-slate-800 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Tactical Presence</span>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Global Headquarters</h2>
              <div className="space-y-6 text-sm">
                <div className="flex items-center gap-4">
                  <MapPin size={18} className="text-primary" />
                  <p>JP Nagar, Bengaluru, Karnataka, India</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={18} className="text-secondary" />
                  <p>+91 98863 74122</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-primary" />
                  <p>info@mbsys.co.in</p>
                </div>
              </div>
            </div>
            
            <div className="h-[350px] w-full rounded-sm overflow-hidden border border-slate-800 shadow-2xl relative group">
              {/* Dark filter overlay for map to match industrial theme */}
              <div className="absolute inset-0 pointer-events-none z-10 bg-slate-900/40 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248897.0497830073!2d77.28269998671874!3d12.906666699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15f17ca16937%3A0x1394a04740953861!2sMBSYS!5e0!3m2!1sen!2sin!4v1768919217116!5m2!1sen!2sin" 
                className="w-full h-full grayscale invert border-0 contrast-125"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="MBSYS HQ Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
         <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="inline-block hover:scale-105 transition-transform duration-300">
           <MbsysLogo className="h-8 mb-8 brightness-200" />
         </a>
         <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-4">© 2026 MBSYS INFRASTRUCTURE CORP. ALL RIGHTS RESERVED.</p>
         
         <div className="max-w-3xl mx-auto mb-10">
            <p className="text-[9px] uppercase tracking-wider text-slate-500 font-medium leading-relaxed opacity-60">
              Disclaimer: MBSYS operates as a technical infrastructure partner. All security deployments are compliant with local regulatory frameworks. System architecture performance may vary based on environmental parameters.
            </p>
         </div>

         <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] font-mono uppercase tracking-[0.2em] opacity-30">
            <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-white hover:opacity-100 transition-all">Privacy Protocol</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-white hover:opacity-100 transition-all">Security Standards</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-white hover:opacity-100 transition-all">Support Grid</a>
            <a href="#" className="hover:text-white hover:opacity-100 transition-all">Terms of Service</a>
            <a href="#" className="hover:text-white hover:opacity-100 transition-all">Legal Disclaimer</a>
            <a href="#" className="hover:text-white hover:opacity-100 transition-all">System Architecture</a>
         </div>
      </div>
    </footer>
  );
};

export default Footer;