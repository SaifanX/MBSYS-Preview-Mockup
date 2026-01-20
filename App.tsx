import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import { 
  Server, Shield, Wifi, Radio, Home as HomeIcon, PenTool, ArrowUp, Terminal, Loader2
} from 'lucide-react';
import { Service, TimelineItem } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [systemStatus, setSystemStatus] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  const statuses = [
    { label: 'NETWORK SYNCED', color: 'bg-green-500', glow: 'shadow-[0_0_10px_#22c55e]' },
    { label: 'SECURITY ACTIVE', color: 'bg-blue-500', glow: 'shadow-[0_0_10px_#3b82f6]' },
    { label: 'LATENCY: 12ms', color: 'bg-primary', glow: 'shadow-[0_0_10px_#ef4444]' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsBooting(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#');
    };
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll);
    
    const statusInterval = setInterval(() => {
      setSystemStatus((prev) => (prev + 1) % statuses.length);
    }, 4000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(statusInterval);
    };
  }, []);

  const handleToggleTheme = (e: React.MouseEvent) => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    if (nextTheme) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const services: Service[] = [
    { 
      id: 'infra', 
      title: 'IT Infrastructure', 
      description: 'Enterprise-grade setup and management for resilient operations.', 
      longDescription: 'Our infrastructure solutions provide the foundation for your digital enterprise. We handle everything from server room design to virtualization and hybrid cloud integration.',
      features: ['Server Room Design', 'Hyper-V & VMWare Virtualization', 'Active Directory Management', 'NAS/SAN Storage Solutions'],
      icon: Server, 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXj8gxNJhjjU8oMNuvWSDjpnnJLjsX0Edb8Z7UU1tx2fS4ygW3gbJuOZdnwz1jIdcjvoCQVY4WUoWnPD3ra2Ozx-9wVt_QlER7-ARYYcvd2cXgpsA4o0rq14U_-yM4EKQZNFWnN-x7DCjVhu-mmwQjv6I4wp91ovPqoGh6XPg1pIaVRU1tSE1yWyc2aOfywrgQN5tkA3D6CF47L0jaS7qQe7WsQqPsys1_ETnWb0-13esR9SWP8qV9onFFcyuBa5D8fQtdsynfZgr3' 
    },
    { 
      id: 'cctv', 
      title: 'CCTV AI Solutions', 
      description: 'Smart surveillance with facial recognition and secure cloud storage.', 
      longDescription: 'Beyond simple recording, our AI-powered vision systems detect anomalies, recognize unauthorized access, and provide real-time thermal analysis for critical environments.',
      features: ['Object Detection & Tracking', 'Facial Recognition API', 'Night Vision Optimized', 'Secure Off-site Archival'],
      icon: Radio, 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrI9rRN6Z_rnUQN2rGxs7E0Bwtbj0WzK3HYnQOvdyyqipmvRqCQYXPrNxWufZASa3DZs1Q6pKisM30GyVpXADNra9SB9C2LeNA8KQnRew7cCFg-IoW1EKdidw92u6ub1ABTdkIYOK7IX48gviv7DHrG73qwKHf-aFnB4GWb5_8rDI_k4bzcLUmrSeCwJxO-oWNKYUiVGmMENku1_eamuXN5A1KMB8TCXJsJ1BkUD7ldVeuxTWp8M4QvOwCyKXxJZyRpCJxDqli1-Ua' 
    },
    { 
      id: 'network', 
      title: 'Network Deployment', 
      description: 'High-speed secure LAN/Wi-Fi architecture for modern enterprises.', 
      longDescription: 'We design zero-trust network architectures that prioritize performance and security. Our mesh Wi-Fi and fiber backbones ensure total connectivity with zero dead zones.',
      features: ['Zero-Trust Architecture', 'SD-WAN Implementation', 'Optical Fiber Backbones', 'Enterprise Wi-Fi 6E Mesh'],
      icon: Wifi, 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLxvb08RXp2ArikEX1KWL02CWK9Xrf-or5MBttZp0UYuGZxNFucxVwP90HD0LoxAhx-VVXzNLBuZsbAdyzLlWy7-W8cOVqRAP0WX1ypCxrdIq2a2QatR7H4svG1rHJdJumYltcnfjRNOgPqZbXGsRyCN8bv89xpfLisZj0cL8xv5iqdQzkJ_R93Ii_UlIt3v7Yhxt_qfifNjEL9kr0P_B7DPpxRs7SWX1lhDGRXtY5Aw0XcHG1ovudol_x-lQXXu452j1YykMeVF9G' 
    },
    { 
      id: 'firewall', 
      title: 'Cyber Defense', 
      description: 'Advanced firewalls and threat mitigation strategies for data safety.', 
      longDescription: 'Protecting your perimeter is just the start. We deploy deep packet inspection, automated intrusion prevention, and regular penetration testing to keep your data siloed and safe.',
      features: ['Next-Gen Firewalls (NGFW)', 'Endpoint Detection & Response', 'DDoS Protection', 'Phishing Awareness Simulation'],
      icon: Shield, 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkRkqsui71Ij1VZwZGNVSggH9C_3pffYxMmI0AYzZ20DdRT9MxdJusYT5G6V3pWR7DuVeitPhp9orXYgNRB7UX3n-AQHybtyLW8Q0o3WHW91_zL5RisMZLOcAB-IcI2he4xu0bv2VJycgR94OBOCI0DCDdrecjsdNsjnpGBcyiUFeV_Cpf8YZF8esbRc5mc5sqIJ-qZcOHiAmLlLoxBHISCoSlXmBC4R7N6QCNIzGV_q-M3pxj7AwY6TGy5V1tJ-3vpBesDc3xg2jM' 
    },
    { 
      id: 'automation', 
      title: 'IoT Integration', 
      description: 'Smart office automation controlling lighting, HVAC, and access.', 
      longDescription: 'Turn your workplace into a sentient environment. Our IoT systems optimize energy usage based on occupancy and allow centralized control of all building peripherals via a single HUD.',
      features: ['Smart Lighting Control', 'Occupancy-Based HVAC', 'Biometric Access Control', 'Environmental Monitoring'],
      icon: HomeIcon, 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuR5v-KbaL95Q9Pi1iSkLRhtj1nGVkVkn2hO4_RzlovGHhbaV99uY88gJij90HaHMLPnPsqqLhDl4E8YHxN7A9VKmQshuLbxaG-j00kfngSfFlo5TjTXyZ1kTAru4qGkaFpa2TGlUD1ucdn5wMvbUAPet6XQBu6-OB0e8CHXvDi6jdhIZFxrwebhjGzjT8o0i47TtQ_ycU3rxNK4BQoEpf_M3wl3oGGDVng8PU4IAPUWmuOxEbF2iR7H45GxfuUzFT5mRzzgdfMXkt' 
    },
    { 
      id: 'interiors', 
      title: 'Industrial Renovation', 
      description: 'Seamlessly integrating tech infrastructure with modern interiors.', 
      longDescription: 'We specialize in "Invisible Tech" interiors. Our renovation team works alongside our IT engineers to ensure cables are hidden, rack space is optimized, and aesthetics match performance.',
      features: ['Invisible Cabling Solutions', 'Modular Workspace Design', 'Acoustic Panel Integration', 'Ergonomic Technical Furniture'],
      icon: PenTool, 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApTlE9PSWg9H9sWebuh9veRtVWbTCRJM1vKYCUe3_n0JmMhsu6WW9By3G44ph36WaXWO8XR0lE6_UP32PZDD7H5GBD7YLSlwGe41dm0qknWad876GdHxBPyiZtLIvGy-v5Tn6UvBtKkNxp2nAMSObRf41iH5u4cjRVhD_P8Mn7o9Y0fD_wZR66n6B66fhNE23V_nBvve1cmBKCOsCr_00QXNILQFidFQ6vM4d3oq-HztrhACoIiDGcEai7r9uvMz2qW0obrwO3_Byd' 
    }
  ];

  const timeline: TimelineItem[] = [
    { year: '2016', title: 'Core Initialization', description: 'MBSYS launches as a dedicated IT hardware and support entity in Bangalore.' },
    { year: '2018', title: 'Strategic Growth', description: 'Expansion into high-definition security surveillance and network auditing.' },
    { year: '2021', title: 'Automation Milestone', description: 'Introduction of IoT-based facility management and smart access protocols.' },
    { year: '2024', title: 'Full Grid Integration', description: 'Launch of the Interiors division, completing the end-to-end office setup ecosystem.' },
  ];

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-background-dark z-[100] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-secondary tracking-widest uppercase">
            <span>System.Boot()</span>
            <span>{Math.floor(bootProgress)}%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${bootProgress}%` }}></div>
          </div>
          <div className="font-mono text-[10px] text-slate-500 uppercase leading-relaxed h-12 overflow-hidden">
            {bootProgress > 20 && <p className="animate-in fade-in slide-in-from-bottom-1">Initialising Kernel... OK</p>}
            {bootProgress > 50 && <p className="animate-in fade-in slide-in-from-bottom-1">Loading Assets (UI_v2.9)... OK</p>}
            {bootProgress > 80 && <p className="animate-in fade-in slide-in-from-bottom-1">Secure Channel Established... OK</p>}
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentPath) {
      case '#services': return <Services services={services} onNavigate={navigate} />;
      case '#about': return <About timeline={timeline} onNavigate={navigate} />;
      case '#contact': return <Contact onNavigate={navigate} />;
      default: return <Home services={services} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-500">
      <CursorTrail />
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-16 right-8 z-40 p-4 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-500 hover:scale-110 active:scale-95 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 tech-grid opacity-10"></div>
        <div className="absolute inset-0 interactive-grid opacity-60"></div>
      </div>
      
      <Navbar darkMode={darkMode} onToggleTheme={handleToggleTheme} onNavigate={navigate} currentPath={currentPath} />

      <main className="relative z-10 min-h-screen">
        {renderContent()}
      </main>

      <div className="fixed bottom-0 w-full h-12 glass-panel border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 text-[9px] font-mono uppercase text-slate-500 tracking-widest z-40">
        <div className="flex items-center gap-6">
           <span className="flex items-center gap-2 transition-all duration-500">
             <span className={`w-2 h-2 rounded-full ${statuses[systemStatus].color} ${statuses[systemStatus].glow}`}></span>
             {statuses[systemStatus].label}
           </span>
           <span className="hidden sm:inline">LOC: 12.91° N / 77.59° E</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-secondary font-bold">CORE_LOAD: 24%</span>
           <span className="opacity-40">SYS_VER_2.9.5_STABLE</span>
        </div>
      </div>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;