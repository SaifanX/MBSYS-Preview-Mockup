import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import XRaySlider from './components/XRaySlider';
import Counter from './components/Counter';
import { 
  Server, Shield, Wifi, Home, PenTool, Radio, 
  MapPin, Mail, ArrowRight, Zap, CheckCircle, Loader2
} from 'lucide-react';
import { Service, TimelineItem } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Parallax and Mouse Tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0, color: '' });
  const heroRef = useRef<HTMLElement>(null);
  
  // Timeline Animation State
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update interactive grid variables
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for Timeline staggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set([...prev, index]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = timelineRef.current?.querySelectorAll('.timeline-item-trigger');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const nextTheme = !darkMode;
    
    // Trigger Ripple
    setRipple({ 
      active: true, 
      x, 
      y, 
      color: darkMode ? '#F8FAFC' : '#0B1120' 
    });

    // Wait for ripple to expand before switching theme class
    setTimeout(() => {
      setDarkMode(nextTheme);
      if (nextTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, 400);

    // Reset Ripple
    setTimeout(() => {
      setRipple(prev => ({ ...prev, active: false }));
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Simulated Asynchronous Protocol Transmission
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 5% failure rate for robustness
          if (Math.random() > 0.95) reject(new Error("Link error"));
          else resolve(true);
        }, 1800);
      });
      
      setFormStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  const services: Service[] = [
    {
      id: 'it-infra',
      title: 'IT Infrastructure & AMC',
      description: 'End-to-end IT infrastructure setup and management backed by reliable AMC services for continuous performance.',
      icon: Server,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXj8gxNJhjjU8oMNuvWSDjpnnJLjsX0Edb8Z7UU1tx2fS4ygW3gbJuOZdnwz1jIdcjvoCQVY4WUoWnPD3ra2Ozx-9wVt_QlER7-ARYYcvd2cXgpsA4o0rq14U_-yM4EKQZNFWnN-x7DCjVhu-mmwQjv6I4wp91ovPqoGh6XPg1pIaVRU1tSE1yWyc2aOfywrgQN5tkA3D6CF47L0jaS7qQe7WsQqPsys1_ETnWb0-13esR9SWP8qV9onFFcyuBa5D8fQtdsynfZgr3'
    },
    {
      id: 'cctv',
      title: 'CCTV Solutions',
      description: 'AI-powered CCTV networks with facial recognition capabilities and secure cloud storage for uncompromised security.',
      icon: Radio,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrI9rRN6Z_rnUQN2rGxs7E0Bwtbj0WzK3HYnQOvdyyqipmvRqCQYXPrNxWufZASa3DZs1Q6pKisM30GyVpXADNra9SB9C2LeNA8KQnRew7cCFg-IoW1EKdidw92u6ub1ABTdkIYOK7IX48gviv7DHrG73qwKHf-aFnB4GWb5_8rDI_k4bzcLUmrSeCwJxO-oWNKYUiVGmMENku1_eamuXN5A1KMB8TCXJsJ1BkUD7ldVeuxTWp8M4QvOwCyKXxJZyRpCJxDqli1-Ua'
    },
    {
      id: 'network',
      title: 'Network & Wi-Fi',
      description: 'Design and deployment of secure, scalable LAN and Wi-Fi networks for reliable high-speed connectivity.',
      icon: Wifi,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLxvb08RXp2ArikEX1KWL02CWK9Xrf-or5MBttZp0UYuGZxNFucxVwP90HD0LoxAhx-VVXzNLBuZsbAdyzLlWy7-W8cOVqRAP0WX1ypCxrdIq2a2QatR7H4svG1rHJdJumYltcnfjRNOgPqZbXGsRyCN8bv89xpfLisZj0cL8xv5iqdQzkJ_R93Ii_UlIt3v7Yhxt_qfifNjEL9kr0P_B7DPpxRs7SWX1lhDGRXtY5Aw0XcHG1ovudol_x-lQXXu452j1YykMeVF9G'
    },
    {
      id: 'firewall',
      title: 'Firewall & Security',
      description: 'Implementation of firewall and network security solutions to protect systems, data, and users from cyber threats.',
      icon: Shield,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkRkqsui71Ij1VZwZGNVSggH9C_3pffYxMmI0AYzZ20DdRT9MxdJusYT5G6V3pWR7DuVeitPhp9orXYgNRB7UX3n-AQHybtyLW8Q0o3WHW91_zL5RisMZLOcAB-IcI2he4xu0bv2VJycgR94OBOCI0DCDdrecjsdNsjnpGBcyiUFeV_Cpf8YZF8esbRc5mc5sqIJ-qZcOHiAmLlLoxBHISCoSlXmBC4R7N6QCNIzGV_q-M3pxj7AwY6TGy5V1tJ-3vpBesDc3xg2jM'
    },
    {
      id: 'automation',
      title: 'Home Automation',
      description: 'Smart automation solutions for lighting, security, access control, and connected devices for modern living.',
      icon: Home,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuR5v-KbaL95Q9Pi1iSkLRhtj1nGVkVkn2hO4_RzlovGHhbaV99uY88gJij90HaHMLPnPsqqLhDl4E8YHxN7A9VKmQshuLbxaG-j00kfngSfFlo5TjTXyZ1kTAru4qGkaFpa2TGlUD1ucdn5wMvbUAPet6XQBu6-OB0e8CHXvDi6jdhIZFxrwebhjGzjT8o0i47TtQ_ycU3rxNK4BQoEpf_M3wl3oGGDVng8PU4IAPUWmuOxEbF2iR7H45GxfuUzFT5mRzzgdfMXkt'
    },
    {
      id: 'renovation',
      title: 'Interiors & Renovation',
      description: 'Office interior and renovation solutions integrated seamlessly with IT, networking, and security infrastructure.',
      icon: PenTool,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApTlE9PSWg9H9sWebuh9veRtVWbTCRJM1vKYCUe3_n0JmMhsu6WW9By3G44ph36WaXWO8XR0lE6_UP32PZDD7H5GBD7YLSlwGe41dm0qknWad876GdHxBPyiZtLIvGy-v5Tn6UvBtKkNxp2nAMSObRf41iH5u4cjRVhD_P8Mn7o9Y0fD_wZR66n6B66fhNE23V_nBvve1cmBKCOsCr_00QXNILQFidFQ6vM4d3oq-HztrhACoIiDGcEai7r9uvMz2qW0obrwO3_Byd'
    }
  ];

  const timeline: TimelineItem[] = [
    { year: '2016', title: 'Inception', description: 'Founded with a vision to simplify IT infrastructure for businesses in Bangalore.' },
    { year: '2018', title: 'Expansion', description: 'Expanded services to include CCTV surveillance and advanced security systems.' },
    { year: '2021', title: 'Automation Era', description: 'Launched Home & Office Automation division, integrating IoT solutions.' },
    { year: '2024', title: 'Full Spectrum', description: 'Established the Interiors wing, offering end-to-end office setup.' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Theme Ripple Overlay */}
      <div 
        className={`ripple-overlay ${ripple.active ? 'ripple-active' : ''}`}
        style={{ 
          '--x': `${ripple.x}px`, 
          '--y': `${ripple.y}px`,
          backgroundColor: ripple.color
        } as React.CSSProperties}
      />

      {/* Hero Interactive Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 tech-grid opacity-10"></div>
        <div className="absolute inset-0 interactive-grid opacity-60"></div>
      </div>
      
      <Navbar darkMode={darkMode} onToggleTheme={handleToggleTheme} />

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 transition-transform duration-75 ease-out"
          style={{ 
            transform: `translate(${mousePos.x * -0.01}px, ${mousePos.y * -0.01}px)` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background-light/95 via-background-light/80 to-transparent dark:from-background-dark dark:via-background-dark/95 dark:to-transparent z-10"></div>
          <img 
            alt="Server Room" 
            className="w-full h-full object-cover object-center opacity-40 dark:opacity-20 mix-blend-overlay scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTqkol8X3MJvNI0vQTk2GbxdKX4aybM56NXGFZan_EcXnwfHQLVO326G0kaEUF9Qt0Hh3sYfXW1-KFpxMknQdAfjzSn66hBTU31ArM7_zdVa5mU0HPUPOQq_m5lbV45JdHyr9P5pG6L81ople-gTSVC77KNFJIcgxDEeXk8vtuh5R1c54LTHPyydhtrwMmNvJk0F_Zx0ejeX2NBZQEFjhJ9HPGpFU7ZJmUl27ZAgw_qAhKoExVuSKoe4zutZyRLpJTKZ5lOqOKCl-s"
          />
        </div>
        
        {/* Floating Decorative Elements Parallax */}
        <div 
           className="absolute top-1/4 right-10 w-96 h-96 border border-secondary/20 rounded-full animate-[spin_30s_linear_infinite] hidden lg:block border-dashed"
           style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-24 w-80 h-80 border border-primary/20 rounded-full hidden lg:block animate-pulse-slow"
          style={{ transform: `translate(${mousePos.x * -0.03}px, ${mousePos.y * -0.03}px)` }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">System Interface 4.0 // Online</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight">
                Trusted <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-blue-400 to-white text-glow">Infrastructure</span> <br/>
                Partner
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl border-l-4 border-primary pl-6 py-2 leading-relaxed">
                We empower physical spaces through high-precision digital integration. Connecting the dots between your vision and a robust technological reality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#services" className="relative overflow-hidden group inline-flex items-center justify-center px-10 py-5 bg-primary text-white font-bold tracking-widest uppercase rounded-sm transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                  <span className="relative z-10">Explore Solutions</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                  <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-slate-300 dark:border-slate-700 hover:border-secondary text-slate-900 dark:text-white hover:text-secondary transition-all font-bold tracking-widest uppercase rounded-sm backdrop-blur-xl">
                  Get Quote
                </a>
              </div>
            </div>

            {/* Stats Grid - Floating Animation */}
            <div className="hidden lg:grid grid-cols-2 gap-6 animate-float">
               {[
                 { label: 'Years Experience', value: 10, icon: Zap, color: 'text-secondary', bColor: 'border-secondary' },
                 { label: 'Projects Delivered', value: 100, icon: CheckCircle, color: 'text-primary', bColor: 'border-primary' },
                 { label: 'Installations Done', value: 50, icon: Server, color: 'text-secondary', bColor: 'border-secondary' },
                 { label: 'Support Uptime', value: 99, suffix: '%', icon: Shield, color: 'text-primary', bColor: 'border-primary' },
               ].map((stat, i) => (
                 <div key={i} className={`glass-panel p-8 rounded-sm border-l-4 ${stat.bColor} transform hover:-translate-y-2 hover:scale-105 transition-all duration-500`}>
                    <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                    <div className="text-5xl font-display font-bold text-white mb-2">
                      <Counter end={stat.value} suffix={stat.suffix || '+'} />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Dynamic Bottom Information */}
        <div className="absolute bottom-0 w-full h-16 glass-panel border-t border-slate-700/50 flex items-center justify-between px-10 text-[10px] font-mono uppercase text-slate-500 tracking-widest hidden md:flex">
          <div className="flex items-center gap-8">
             <span className="flex items-center gap-2"><span className="w-1 h-1 bg-secondary rounded-full"></span>LAT: 12.9716° N</span>
             <span className="flex items-center gap-2"><span className="w-1 h-1 bg-secondary rounded-full"></span>LNG: 77.5946° E</span>
             <span className="flex items-center gap-2"><span className="w-1 h-1 bg-secondary rounded-full"></span>ALT: 920M</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
                <span className="opacity-50">SYNC STATUS</span>
                <div className="w-24 h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                   <div className="h-full bg-secondary animate-scan w-1/3 shadow-[0_0_10px_#06B6D4]"></div>
                </div>
             </div>
             <span className="text-secondary font-bold">CORE_LOAD: 24.1%</span>
          </div>
        </div>
      </section>

      {/* Services Section with Staggered Visuals */}
      <section id="services" className="py-32 relative bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Architectural Solutions</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">Expertise Stack</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <div 
                key={service.id} 
                className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)] transition-all duration-700 hover:border-secondary/30"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125 group-hover:rotate-2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 p-3 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/40">
                    <service.icon className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-4 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed opacity-80">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-all group/link">
                    Protocol Details <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </a>
                </div>
                {/* Visual scan effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent h-10 w-full translate-y-[-100%] group-hover:translate-y-[600%] transition-transform duration-[3s] pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* X-Ray / Project Section */}
      <section className="py-32 bg-slate-100 dark:bg-[#080d1a] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="max-w-2xl">
                <span className="text-secondary font-mono text-xs font-bold tracking-[0.4em] mb-4 block">SCAN_MODULE_X_RAY.v3</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">Unveiling The Grid</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Every seamless finish is backed by an intricate, precisely engineered infrastructure network. Toggle the visualizer to see the core systems behind the surface.</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold font-mono text-slate-500 uppercase bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700">
                 <MoveHorizontal className="w-4 h-4 text-primary animate-pulse" />
                 Active Scanner
              </div>
           </div>

           <XRaySlider 
              imageBefore="https://lh3.googleusercontent.com/aida-public/AB6AXuAaCS6QAEFXR8oMkrxKqgSagkYINwmXT8HZymGlz7-jnqb-LTTYhVgRqc3XLw9hYyZQtcSth9NQlbDdpR0MnL_I9nIv6gI9VmsUkbbS00jliNwa_i2dUnpt5M5H_r3Pn6ZaXrfGJjcSr28qlJVbpcpLP9ZxocER5gF4xZtw55EdUVIq0QaC4Dsfc3T_DHUwMYC7ObfUA1CLFncRxgtIvvHvPUm8df6xZjkHzd0CcQFVZdG5Xj6eyWIGovBUEr_TPj14q7wa8DpY0h8e"
              imageAfter="https://lh3.googleusercontent.com/aida-public/AB6AXuBmRTBh8JzHa8ksbtStBCAImHMnt6QWptJC2oGa0OtfyVkf5WxBhCATka8THF1zwfbjAJK3tV1eQ7r52M4cILKqZu9vdVPIIJaop4K8VcyV3doN9FJn4cyfZA7hbAm2IaoiLu5Tit2-JbvdoxTsB8OKtudHXcIgC6loZnDM7-UIxwyBIDwxhucssiwFUEC20VdWrcPzi80bPEGJjJLopVHREDFT5784kENNeXF5KjgMOldl8XZWZgFkNcgQJpIAtGt7qDTgo5prr0b3"
           />
        </div>
      </section>

      {/* About Section - Staggered Scroll Animations Added */}
      <section id="about" className="py-32 relative bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Timeline</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white">Connecting The Decades</h2>
          </div>

          <div className="relative" ref={timelineRef}>
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block"></div>
            
            <div className="space-y-20">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  data-index={index}
                  className={`timeline-item-trigger flex flex-col md:flex-row items-center justify-between group transition-all duration-700 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} ${visibleItems.has(index) ? 'timeline-item-visible' : 'timeline-item-hidden'}`}
                >
                  <div className="w-full md:w-5/12 mb-10 md:mb-0">
                    <div className={`p-10 rounded-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:border-primary transition-all duration-500 shadow-xl ${index % 2 === 0 ? 'md:text-right md:border-r-4 md:border-r-primary' : 'md:text-left md:border-l-4 md:border-l-secondary'}`}>
                      <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-slate-200 dark:border-slate-700 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-500`}>
                    <span className="font-tech font-bold text-lg text-secondary">{item.year}</span>
                  </div>
                  
                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Async logic and visual feedback enhanced */}
      <section id="contact" className="py-32 bg-slate-50 dark:bg-[#050b14] relative border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <div className="inline-block py-2 px-4 border border-primary/30 rounded-full text-[10px] font-black tracking-widest text-primary mb-8 bg-primary/5 uppercase">
                Initialization Point
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-8">
                Sync with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-yellow-500">MBSYS</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg leading-relaxed max-w-lg">
                Start your infrastructure transformation today. Our tactical team is standing by to translate your blueprint into a high-performance grid.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                {[
                  { icon: MapPin, title: 'Tactical Base', content: 'JP Nagar, Bengaluru – 560111', color: 'bg-primary/10 text-primary' },
                  { icon: Mail, title: 'Secure Channel', content: 'info@mbsys.co.in', color: 'bg-secondary/10 text-secondary' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 rounded-sm bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 hover:border-secondary transition-colors group">
                    <div className={`p-4 rounded-full ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] text-[10px] mb-1">{item.title}</h4>
                      <p className="text-base text-slate-600 dark:text-slate-400 font-medium">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-lg blur opacity-20 animate-pulse"></div>
               <div className="relative bg-white dark:bg-surface-dark p-12 rounded-sm border border-slate-200 dark:border-slate-800 shadow-2xl">
                 <form onSubmit={handleSubmit} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Operator ID</label>
                       <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-4 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder-slate-400 text-sm"
                          placeholder="Full Name"
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">COMMS Frequency</label>
                       <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-4 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder-slate-400 text-sm"
                          placeholder="Email Address"
                       />
                     </div>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Asset Entity</label>
                       <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-4 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder-slate-400 text-sm"
                          placeholder="Company (Optional)"
                       />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Encryption Message</label>
                       <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-4 rounded-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder-slate-400 text-sm"
                          placeholder="Message parameters..."
                       ></textarea>
                   </div>
                   
                   <button 
                     type="submit" 
                     disabled={formStatus === 'submitting'}
                     className={`w-full py-5 font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 shadow-xl flex items-center justify-center gap-2 ${
                       formStatus === 'success' 
                         ? 'bg-green-600 text-white' 
                         : formStatus === 'error'
                         ? 'bg-orange-600 text-white'
                         : 'bg-primary text-white hover:bg-red-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                     }`}
                   >
                     {formStatus === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
                     {formStatus === 'submitting' ? 'UPLOADING...' : 
                      formStatus === 'success' ? 'SYNC SUCCESSFUL' : 
                      formStatus === 'error' ? 'PROTOCOL ERROR' : 'INITIALIZE TRANSFER'}
                   </button>
                   
                   {formStatus === 'success' && (
                     <p className="text-center text-green-500 text-[10px] font-bold tracking-widest animate-pulse">CHANNEL ESTABLISHED: EXPECT COMMS WITHIN 24H</p>
                   )}
                   {formStatus === 'error' && (
                     <p className="text-center text-orange-500 text-[10px] font-bold tracking-widest animate-pulse">HANDSHAKE FAILED: RETRY TRANSMISSION</p>
                   )}
                 </form>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Integrated with real Google Maps Embed */}
      <section className="h-[500px] w-full relative bg-slate-900 overflow-hidden group">
        <iframe
          title="MBSYS Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.891104332912!2d77.5912343!3d12.9146543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150819000001%3A0x7d0a3d3c8c6a0c0e!2sJP%20Nagar%20Metro%20Station!5e0!3m2!1sen!2sin!4v1700000000000"
          className="w-full h-full border-0 opacity-60 dark:opacity-30 grayscale contrast-125 dark:invert brightness-90 transition-opacity duration-700 group-hover:opacity-100 dark:group-hover:opacity-50"
          allowFullScreen
          loading="lazy"
        ></iframe>
        
        {/* Overlay Gradients for UI Integration */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900 via-transparent to-slate-900 opacity-60"></div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-900 via-transparent to-slate-900 opacity-40"></div>
        
        <div className="absolute inset-0 interactive-grid pointer-events-none opacity-20"></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <div className="relative group/pin">
            <div className="absolute -inset-6 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
            <MapPin className="text-primary w-16 h-16 animate-bounce relative z-10 drop-shadow-[0_0_20px_rgba(239,68,68,1)]" />
          </div>
          <div className="mt-8 bg-slate-900/90 backdrop-blur-xl border border-secondary/50 text-secondary px-8 py-4 text-[11px] font-black font-mono rounded-full shadow-2xl tracking-[0.3em] uppercase">
             TARGET_LOC: JP NAGAR, BENGALURU
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-16">
            <div className="col-span-1 md:col-span-2">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpYFp78-p19I6f851-g_p9XmNf6t_28vD2e99eS4-o8o1eR2i6d1eR2i6d1eR2i6d1eR2i6d1eR2i6d1eR2i6d1eR2i6d1eR2i6d1eR2i6d1eR2i6d1eR2i6d=s0" 
                alt="MBSYS Logo" 
                className="h-10 mb-8 filter brightness-200"
              />
              <p className="text-sm leading-relaxed max-w-sm font-medium opacity-60">
                Redefining the relationship between space and technology through advanced infrastructure, security, and automation protocols.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8">Capabilities</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-primary transition-colors">IT Frameworks</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tactical Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">IoT Automation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Industrial Interior</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8">Social Grid</h4>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-slate-800/50 border border-slate-700 rounded-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer group shadow-xl">
                   <span className="font-bold text-xs group-hover:scale-110">LI</span>
                 </div>
                 <div className="w-10 h-10 bg-slate-800/50 border border-slate-700 rounded-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer group shadow-xl">
                   <span className="font-bold text-xs group-hover:scale-110">FB</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black tracking-widest opacity-40">
            <p>© 2026 MBSYS INFRASTRUCTURE CORP. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <p>PRIVACY PROTOCOL</p>
               <p>SYS_VER_2.9.5_STABLE</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { MoveHorizontal } from 'lucide-react';

export default App;