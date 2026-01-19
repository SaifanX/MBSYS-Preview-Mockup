import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import XRaySlider from './components/XRaySlider';
import Counter from './components/Counter';
import { 
  Server, Shield, Wifi, Home, PenTool, Radio, 
  MapPin, Mail, ArrowRight, Zap, CheckCircle 
} from 'lucide-react';
import { Service, TimelineItem } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
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
    { year: '2016', title: 'Inception', description: 'Founded with a vision to simplify IT infrastructure for small businesses in Bangalore.' },
    { year: '2018', title: 'Expansion', description: 'Expanded services to include CCTV surveillance and advanced security systems.' },
    { year: '2021', title: 'Automation Era', description: 'Launched Home & Office Automation division, integrating IoT solutions.' },
    { year: '2024', title: 'Full Spectrum', description: 'Established the Interiors & Renovation wing, offering end-to-end office setup.' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Tech Grid */}
      <div className="fixed inset-0 tech-grid opacity-10 pointer-events-none z-0"></div>
      
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background-light/95 via-background-light/80 to-transparent dark:from-background-dark dark:via-background-dark/95 dark:to-transparent z-10"></div>
          <img 
            alt="Server Room" 
            className="w-full h-full object-cover object-center opacity-40 dark:opacity-20 mix-blend-overlay" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTqkol8X3MJvNI0vQTk2GbxdKX4aybM56NXGFZan_EcXnwfHQLVO326G0kaEUF9Qt0Hh3sYfXW1-KFpxMknQdAfjzSn66hBTU31ArM7_zdVa5mU0HPUPOQq_m5lbV45JdHyr9P5pG6L81ople-gTSVC77KNFJIcgxDEeXk8vtuh5R1c54LTHPyydhtrwMmNvJk0F_Zx0ejeX2NBZQEFjhJ9HPGpFU7ZJmUl27ZAgw_qAhKoExVuSKoe4zutZyRLpJTKZ5lOqOKCl-s"
          />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/2 right-10 w-96 h-96 border border-secondary/20 rounded-full animate-[spin_20s_linear_infinite] hidden lg:block border-dashed"></div>
        <div className="absolute top-1/2 right-10 w-80 h-80 border border-primary/20 rounded-full hidden lg:block animate-pulse"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-secondary/30 bg-secondary/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-xs font-bold text-secondary tracking-widest uppercase">System Status: Optimal</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                Trusted <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-blue-400 to-white text-glow">Infrastructure</span> <br/>
                Partner
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl border-l-2 border-primary pl-6">
                We bridge the gap between physical space and digital reality. Creating seamless, future-ready spaces driven by advanced infrastructure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#services" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-sm hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] group">
                  Explore Solutions
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 hover:border-secondary text-slate-900 dark:text-white hover:text-secondary transition-all font-bold tracking-widest uppercase rounded-sm backdrop-blur-md">
                  Get Quote
                </a>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
               {[
                 { label: 'Years Experience', value: 10, icon: Zap, color: 'text-secondary' },
                 { label: 'Projects Delivered', value: 100, icon: CheckCircle, color: 'text-primary' },
                 { label: 'Installations Done', value: 50, icon: Server, color: 'text-secondary' },
                 { label: 'Support Uptime', value: 99, suffix: '%', icon: Shield, color: 'text-primary' },
               ].map((stat, i) => (
                 <div key={i} className={`glass-panel p-6 rounded-sm border-l-2 ${i % 2 === 0 ? 'border-secondary' : 'border-primary'} transform hover:-translate-y-1 transition-transform duration-300`}>
                    <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                    <div className="text-4xl font-display font-bold text-white mb-1">
                      <Counter end={stat.value} suffix={stat.suffix || '+'} />
                    </div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 w-full h-12 glass-panel border-t border-slate-700/50 flex items-center justify-between px-8 text-[10px] font-mono uppercase text-slate-500 tracking-widest hidden md:flex">
          <div className="flex items-center gap-4">
             <span>Lat: 12.9716° N</span>
             <span>Long: 77.5946° E</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-20 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-secondary animate-[scan_2s_linear_infinite] w-1/3"></div>
             </div>
             <span>System Integrity: 100%</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">Core Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 hover:border-secondary/50">
                <div className="h-48 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 p-2 bg-slate-900/50 backdrop-blur-sm rounded border border-white/10">
                    <service.icon className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors group/link">
                    View Specs <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
                {/* Scanning line effect on hover */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#06B6D4]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* X-Ray / Project Section */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-12 flex flex-col md:flex-row justify-between items-end">
              <div>
                <span className="text-secondary font-mono text-xs tracking-widest mb-2 block">/// PROJECT X-RAY</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">Beneath The Surface</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500 uppercase">
                 <MoveHorizontal className="w-4 h-4" />
                 Drag slider to reveal infrastructure
              </div>
           </div>

           <XRaySlider 
              imageBefore="https://lh3.googleusercontent.com/aida-public/AB6AXuAaCS6QAEFXR8oMkrxKqgSagkYINwmXT8HZymGlz7-jnqb-LTTYhVgRqc3XLw9hYyZQtcSth9NQlbDdpR0MnL_I9nIv6gI9VmsUkbbS00jliNwa_i2dUnpt5M5H_r3Pn6ZaXrfGJjcSr28qlJVbpcpLP9ZxocER5gF4xZtw55EdUVIq0QaC4Dsfc3T_DHUwMYC7ObfUA1CLFncRxgtIvvHvPUm8df6xZjkHzd0CcQFVZdG5Xj6eyWIGovBUEr_TPj14q7wa8DpY0h8e"
              imageAfter="https://lh3.googleusercontent.com/aida-public/AB6AXuBmRTBh8JzHa8ksbtStBCAImHMnt6QWptJC2oGa0OtfyVkf5WxBhCATka8THF1zwfbjAJK3tV1eQ7r52M4cILKqZu9vdVPIIJaop4K8VcyV3doN9FJn4cyfZA7hbAm2IaoiLu5Tit2-JbvdoxTsB8OKtudHXcIgC6loZnDM7-UIxwyBIDwxhucssiwFUEC20VdWrcPzi80bPEGJjJLopVHREDFT5784kENNeXF5KjgMOldl8XZWZgFkNcgQJpIAtGt7qDTgo5prr0b3"
           />
        </div>
      </section>

      {/* About / Timeline Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">Evolution of Excellence</h2>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-slate-300 dark:bg-slate-700 hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center justify-between group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-5/12 mb-6 md:mb-0">
                    <div className={`p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:border-secondary transition-colors ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-slate-200 dark:border-slate-700 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all">
                    <span className="font-display font-bold text-xs text-secondary">{item.year}</span>
                  </div>
                  
                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-[#050b14] relative border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-block py-1 px-3 border border-primary/30 rounded-full text-xs font-semibold tracking-wider text-primary mb-6 bg-primary/5">
                SYSTEM: READY
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
                Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Protocol</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Use the secure channel below to request information about our services. Our team will analyze your requirements and establish a connection.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
                   <div className="p-3 rounded bg-primary/10 text-primary">
                     <MapPin size={24} />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-1">Head Office</h4>
                     <p className="text-sm text-slate-600 dark:text-slate-400">Near JP Nagar Metro Station, J.P. Nagar, Bengaluru – 560111</p>
                   </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
                   <div className="p-3 rounded bg-secondary/10 text-secondary">
                     <Mail size={24} />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-1">Electronic Mail</h4>
                     <p className="text-sm text-slate-600 dark:text-slate-400">info@mbsys.co.in</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
               {/* Decorative line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
               
               <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">ID / Name</label>
                     <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white p-3 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder-slate-400"
                        placeholder="Enter identification"
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Contact Frequency</label>
                     <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white p-3 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder-slate-400"
                        placeholder="Enter email address"
                     />
                   </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Organization</label>
                     <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white p-3 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder-slate-400"
                        placeholder="Company name"
                     />
                 </div>
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Transmission Data</label>
                     <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white p-3 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder-slate-400"
                        placeholder="Enter your requirements..."
                     ></textarea>
                 </div>
                 
                 <button 
                   type="submit" 
                   disabled={formStatus === 'submitting'}
                   className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                     formStatus === 'success' 
                       ? 'bg-green-500 text-white' 
                       : 'bg-primary text-white hover:bg-red-600'
                   }`}
                 >
                   {formStatus === 'submitting' ? 'Transmitting...' : formStatus === 'success' ? 'Transmission Complete' : 'Initiate Transfer'}
                 </button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 md:h-[500px] w-full relative bg-slate-900 overflow-hidden group">
        <img 
          alt="Map Location" 
          className="w-full h-full object-cover opacity-60 dark:opacity-40 filter grayscale contrast-125 dark:invert dark:sepia dark:hue-rotate-180 dark:saturate-200" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZiGxp_FU_SnDKD7neFN5hkS44l3rnkbnaQErSVfASdQaLixpq1p3yZ4n8bvmn8Fw_wUHpvYEOnvj9lxzBh_ANQnXoTLYbtU9PJrLsCgRvM3-4XxJ_fdulQPZ6OGSoq3VMnryDZvSyLsnmgRVQKJU4Hc51v_5x1F69KMcDUPzSYOOOvzC3dXdQW0IPDTeygxo55zTd80VlYh4dPh-UpRrRrFFtP8DzeloToiPhzEv8Srr2IwcTnfpgGlqKFLit9Np9u4RK4EUmyLZR"
        />
        <div className="absolute inset-0 bg-grid-pattern-blue bg-[length:40px_40px] pointer-events-none opacity-30"></div>
        <div className="hidden dark:block absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan opacity-50"></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative">
            <MapPin className="text-primary w-12 h-12 animate-bounce relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="mt-4 bg-surface-dark/90 backdrop-blur border border-secondary/30 text-secondary px-4 py-2 text-xs font-mono rounded shadow-lg">
             LOC: 12.9141° N, 77.6101° E
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-display font-bold text-white tracking-widest mb-4 block">MBSyS</span>
              <p className="text-sm leading-relaxed max-w-sm">
                Advanced infrastructure solutions for the modern world. Connecting dots between technology and reality.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">IT Infrastructure</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security Systems</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Automation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Renovation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
              <div className="flex gap-4">
                 {/* Social placeholders */}
                 <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                   <span className="font-bold text-xs">IN</span>
                 </div>
                 <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                   <span className="font-bold text-xs">X</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>© 2026 MBSYS. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0 font-mono">SYSTEM_VER_2.4.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper component for MoveHorizontal icon not exported by lucide-react in some versions,
// or just re-using the import if available. Using the imported one.
import { MoveHorizontal } from 'lucide-react';

export default App;
