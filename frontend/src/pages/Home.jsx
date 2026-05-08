import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Play, Users, Globe, CheckCircle, Zap, BarChart, 
  Lock, Activity, FileText, ChevronDown, Mail, Phone, MapPin,
  ExternalLink, Cpu, Trash2, ShieldCheck, Heart
} from 'lucide-react';

const Home = () => {
  // --- Counters State ---
  const [counts, setCounts] = useState({ voters: 0, elections: 0, votes: 0, blocked: 0 });
  const targets = { voters: 2847593, elections: 142, votes: 9234821, blocked: 3891 };

  useEffect(() => {
    let step = 0;
    const totalSteps = 70;
    const duration = 2800;
    
    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCounts({
        voters: Math.floor(targets.voters * easeOut),
        elections: Math.floor(targets.elections * easeOut),
        votes: Math.floor(targets.votes * easeOut),
        blocked: Math.floor(targets.blocked * easeOut),
      });
      
      if (step >= totalSteps) clearInterval(interval);
    }, duration / totalSteps);
    
    return () => clearInterval(interval);
  }, []);

  // --- Testimonials Slider ---
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    { name: "Dr. Sarah Chen", role: "Chief Electoral Officer, Singapore", text: "This platform transformed our national election. The AI fraud detection caught 3,891 suspicious attempts while maintaining 100% legitimate vote integrity. Unprecedented reliability.", stars: 5, init: "SC" },
    { name: "James Okafor", role: "Director, African Union Elections", text: "Revolutionary technology. We processed 12 million votes in under 6 hours with zero downtime. The security architecture is genuinely unmatched — a quantum leap for democratic integrity.", stars: 5, init: "JO" },
    { name: "María Rodríguez", role: "Minister of Digital Affairs, Spain", text: "The biometric verification is seamless and the UX is world-class. Even elderly voters found it intuitive. This is exactly what modern democracy needs — secure, fast, and trustworthy.", stars: 5, init: "MR" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // --- FAQ State ---
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: "How does the AI face verification work?", a: "Our system uses a 128-point facial landmark detection model trained on 50M+ faces. It performs real-time liveness detection to prevent photo or video spoofing, comparing your live scan against government-verified ID records in under 3 seconds with 99.97% accuracy." },
    { q: "Is my vote truly anonymous?", a: "Yes. We use cryptographic separation: your identity is verified independently from your ballot using zero-knowledge proofs (ZKPs). Not even our administrators can link a specific ballot to a specific voter — only that a valid voter participated." },
    { q: "What if I lose internet connection while voting?", a: "Our system saves your verified session securely with an encrypted token. You can resume from where you left off within 15 minutes. Once your vote is cryptographically submitted, it's immediately locked in the blockchain — partial submissions are impossible." },
    { q: "How is the system protected from hackers?", a: "We employ a 6-layer security architecture: blockchain immutability, air-gapped backup servers, 1Tbps DDoS protection, behavioral AI intrusion detection, real-time penetration testing by certified white-hat teams, and HSM hardware key storage." },
    { q: "Can results be tampered with after voting ends?", a: "Impossible by design. Every ballot is hashed and recorded on an immutable blockchain ledger with Merkle tree verification. Any tampering attempt breaks the hash chain, triggering immediate multi-party alerts. Results are independently auditable by any registered observer in real-time." }
  ];

  // --- Features Data ---
  const features = [
    { title: "Face Recognition", desc: "Advanced biometric verification with 99.97% accuracy ensures only eligible voters participate using 128-point facial landmark detection.", icon: <UserCircle />, color: "#3B82F6" },
    { title: "Duplicate Prevention", desc: "AI-powered deduplication and blockchain hashing prevents any voter from casting multiple ballots across all devices.", icon: <Lock />, color: "#8B5CF6" },
    { title: "AI Fraud Detection", desc: "Real-time neural networks monitor for suspicious behavioral patterns, flagging and blocking anomalies in milliseconds.", icon: <Zap />, color: "#06B6D4" },
    { title: "End-to-End Encryption", desc: "Military-grade AES-256 + RSA-4096 encryption protects every vote from the moment it's cast to final verification.", icon: <ShieldCheck />, color: "#10B981" },
    { title: "Real-Time Monitoring", desc: "24/7 AI-powered system monitoring with instant threat response, alerting security teams within 50ms of any anomaly.", icon: <Activity />, color: "#F59E0B" },
    { title: "Smart Analytics", desc: "AI-driven election insights, predictive voter turnout modeling, and real-time dashboards for full transparency.", icon: <BarChart />, color: "#EC4899" }
  ];

  const steps = [
    { num: "01", title: "Create Account", desc: "Register with your national ID for instant government-grade identity verification.", color: "#3B82F6", icon: <UserCircle /> },
    { num: "02", title: "Verify Face", desc: "Live facial recognition confirms your identity in under 3 seconds.", color: "#8B5CF6", icon: <UserCircle /> },
    { num: "03", title: "Cast Your Vote", desc: "Select your candidate and submit your cryptographically signed ballot.", color: "#06B6D4", icon: <CheckCircle /> },
    { num: "04", title: "View Results", desc: "Watch live results update in real-time as votes are counted transparently.", color: "#10B981", icon: <BarChart /> }
  ];

  return (
    <div className="bg-[#0F172A] text-white font-['Space_Grotesk'] overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="min-h-screen relative flex items-center px-6 md:px-11 pt-[130px] pb-[90px]">
        {/* Glow Orbs */}
        <div className="glow-orb w-[700px] h-[700px] bg-blue-500/10 top-[-250px] right-[-220px]" />
        <div className="glow-orb w-[500px] h-[500px] bg-purple-500/10 bottom-[-180px] left-[-180px]" />
        
        {/* Grid Background */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)', backgroundSize: '55px 55px' }} />
        
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent z-[2] animate-[scan-v_5s_ease-in-out_infinite] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] w-full mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="section-tag bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <span className="w-[7px] h-[7px] rounded-full bg-green-500 animate-pulse" />
              Government-Grade Election Platform
            </div>
            <h1 className="font-['Orbitron'] font-black text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6">
              Secure <span className="gradient-text">AI-Powered</span><br />
              Online Voting<br />
              Platform
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-[490px] mb-10">
              Fast, transparent, fraud-proof digital elections powered by advanced AI. Trusted by governments in 47+ countries with zero breach record.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="btn-p">
                <CheckCircle className="w-5 h-5" />
                Vote Now
              </button>
              <button className="btn-s">
                <Play className="w-4 h-4 fill-current" />
                Learn More
              </button>
            </div>
            
            {/* Hero Stats */}
            <div className="flex rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex-1 p-5 border-r border-white/10 text-center">
                <div className="font-['Orbitron'] text-2xl font-bold text-blue-500">47+</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Countries</div>
              </div>
              <div className="flex-1 p-5 border-r border-white/10 text-center">
                <div className="font-['Orbitron'] text-2xl font-bold text-purple-500">50M+</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Voters</div>
              </div>
              <div className="flex-1 p-5 text-center">
                <div className="font-['Orbitron'] text-2xl font-bold text-green-500">99.99%</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Uptime</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="hidden md:flex justify-center items-center relative h-[400px]"
          >
            <div className="relative w-[340px] h-[340px]">
              <div className="spin-cw absolute inset-0 rounded-full border-[1.5px] border-dashed border-blue-500/20" />
              <div className="spin-ccw absolute inset-7 rounded-full border-[1.5px] border-dashed border-purple-500/20" />
              <div className="absolute inset-14 rounded-full border border-cyan-500/25 animate-[border-glow_4s_ease_infinite]" />
              
              <div className="floating absolute inset-0 flex items-center justify-center">
                <div className="w-[172px] h-[172px] rounded-full bg-gradient-to-br from-blue-500/35 to-purple-500/25 border-2 border-blue-500/45 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.45)] animate-[pulse-glow_3.5s_ease-in-out_infinite]">
                  <Shield className="w-20 h-20 text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]" />
                </div>
              </div>

              {/* Floating Cards */}
              <div className="floating2 absolute top-[-10px] right-[-55px] bg-[#111827]/90 border border-blue-500/35 rounded-xl p-3 backdrop-blur-md flex items-center gap-2 shadow-xl">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold whitespace-nowrap">Face Verified</span>
              </div>
              <div className="absolute bottom-[30px] left-[-65px] bg-[#111827]/90 border border-purple-500/35 rounded-xl p-3 backdrop-blur-md flex items-center gap-2 shadow-xl animate-[float2_9s_ease-in-out_infinite] delay-[-4s]">
                <Lock className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-semibold whitespace-nowrap">Encrypted</span>
              </div>
              <div className="absolute top-[70px] left-[-75px] bg-[#111827]/90 border border-green-500/35 rounded-xl p-3 backdrop-blur-md flex items-center gap-2 shadow-xl animate-[float2_10s_ease-in-out_infinite] delay-[-6s]">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold whitespace-nowrap">AI Verified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 px-6 md:px-11 bg-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <div className="section-tag bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
              <Activity className="w-4 h-4" />
              Real-Time Data
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-5xl font-black mb-4">Live <span className="gradient-text">Statistics</span></h2>
            <p className="text-gray-400">Real-time metrics from active elections worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Voters', val: counts.voters, color: 'blue', icon: <Users /> },
              { label: 'Active Elections', val: counts.elections, color: 'purple', icon: <Globe /> },
              { label: 'Votes Cast Today', val: counts.votes, color: 'cyan', icon: <CheckCircle /> },
              { label: 'Threats Blocked', val: counts.blocked, color: 'green', icon: <Shield /> },
            ].map((stat, i) => (
              <div key={i} className="glass p-8 relative overflow-hidden group hover:translate-y-[-5px] transition-transform duration-300">
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${stat.color}-500 to-transparent`} />
                <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/30 flex items-center justify-center mb-5 text-${stat.color}-500`}>
                  {React.cloneElement(stat.icon, { className: 'w-6 h-6' })}
                </div>
                <div className={`font-['Orbitron'] text-3xl font-black text-${stat.color}-500 mb-2`}>
                  {stat.val.toLocaleString()}
                </div>
                <div className="font-bold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">Updated milliseconds ago</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 md:px-11 relative">
        <div className="glow-orb w-[550px] h-[550px] bg-purple-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="section-tag bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <FileText className="w-4 h-4" />
              AI-Powered Security
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-5xl font-black mb-5">Enterprise <span className="gradient-text">Security</span> Features</h2>
            <p className="text-gray-400 max-w-[520px] mx-auto leading-relaxed">
              Six layers of military-grade protection ensuring your elections are tamper-proof and completely transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="feature-card glass p-8" style={{ '--accent-c': f.color }}>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-70" style={{ color: f.color }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${f.color}18`, border: `1px solid ${f.color}35`, boxShadow: `0 0 24px ${f.color}20`, color: f.color }}>
                  {React.cloneElement(f.icon, { className: 'w-7 h-7' })}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 md:px-11 bg-white/5">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="section-tag bg-blue-500/10 border border-blue-500/25 text-blue-400">
            <Zap className="w-4 h-4" />
            Process
          </div>
          <h2 className="font-['Orbitron'] text-3xl md:text-5xl font-black mb-16">How It <span className="gradient-text">Works</span></h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {steps.map((s, i) => (
              <div key={i} className="relative px-4 text-center group">
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className={`absolute w-24 h-24 rounded-full border-[1.5px] border-dashed border-white/20 animate-[spin-anim_${10+i*3}s_linear_infinite_${i%2?'reverse':''}]`} />
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center relative z-10 shadow-2xl transition-transform duration-300 group-hover:scale-110`} 
                       style={{ background: `radial-gradient(circle at 40% 35%, ${s.color}28, ${s.color}10)`, border: `2px solid ${s.color}55`, color: s.color }}>
                    {React.cloneElement(s.icon, { className: 'w-8 h-8' })}
                  </div>
                  <div className="absolute top-[-8px] right-[-8px] w-7 h-7 rounded-full bg-current flex items-center justify-center font-['Orbitron'] text-[10px] font-black text-white z-20" style={{ backgroundColor: s.color }}>
                    {s.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[190px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-11">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-tag bg-amber-500/10 border border-amber-500/25 text-amber-500">
              <Heart className="w-4 h-4 fill-current" />
              Trusted Leaders
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-5xl font-black mb-4">What <span className="gradient-text">Leaders</span> Say</h2>
            <p className="text-gray-400">Government officials from around the world</p>
          </div>

          <div className="max-w-[820px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="glass p-12 text-center"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Zap key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-xl text-gray-300 italic leading-relaxed mb-10">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white">
                    {testimonials[activeTestimonial].init}
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">{testimonials[activeTestimonial].name}</div>
                    <div className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'w-10 bg-blue-500' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 md:px-11 bg-white/5">
        <div className="max-w-[820px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-tag bg-blue-500/10 border border-blue-500/25 text-blue-400">
              <ChevronDown className="w-4 h-4" />
              Questions
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-5xl font-black mb-4"><span className="gradient-text">FAQ</span></h2>
            <p className="text-gray-400">Everything you need to know about secure online voting</p>
          </div>

          <div className="space-y-1">
            {faqs.map((faq, i) => (
              <div key={i} className={`border-b border-white/10 overflow-hidden transition-colors duration-300 ${openFaq === i ? 'bg-blue-500/5' : ''}`}>
                <button 
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-400 text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 px-6 md:px-11 relative">
        <div className="glow-orb w-[400px] h-[400px] bg-blue-500/10 bottom-[-100px] left-1/2 -translate-x-1/2" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="section-tag bg-blue-500/10 border border-blue-500/25 text-blue-400">
              <Mail className="w-4 h-4" />
              Contact Us
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-5xl font-black mb-4">Get In <span className="gradient-text">Touch</span></h2>
            <p className="text-gray-400">Ready to modernize your elections? Let's talk.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-gray-400 leading-relaxed mt-2">VOTEX AI HQ, 100 Democracy Blvd, Washington, DC 20001</p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-gray-400">contact@votexai.gov</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-gray-400">+1 (888) VOTE-SEC</span>
                </div>
              </div>
              
              <div className="h-[210px] rounded-3xl bg-white/5 border border-blue-500/20 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_40%,rgba(59,130,246,0.14),transparent_60%)]" />
                <Globe className="w-10 h-10 text-blue-500/50 relative z-10" />
                <div className="absolute bottom-4 text-xs text-white/30 uppercase tracking-[0.2em]">Global Coverage · 47 Countries</div>
              </div>
            </div>

            <div className="glass p-10">
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                    <input className="inp" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</label>
                    <input className="inp" placeholder="john@gov.org" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Organization</label>
                  <input className="inp" placeholder="Ministry of Digital Affairs" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
                  <textarea className="inp" rows="4" placeholder="How can we help you?" />
                </div>
                <button type="button" className="btn-p w-full justify-center py-4 text-lg">
                  Send Secure Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070D1B] border-t border-white/5 pt-20 pb-10 px-6 md:px-11">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Shield className="text-white w-6 h-6" />
                </div>
                <span className="font-['Orbitron'] font-extrabold text-xl bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  VOTEX AI
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[260px]">
                The world's most secure AI-powered online voting platform. Trusted by 47 governments globally.
              </p>
              <div className="flex gap-3">
                {[Twitter, Linkedin, Github, Globe].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-blue-500 hover:border-blue-500 transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                {['Features', 'Security', 'Pricing', 'API Docs', 'Changelog'].map(item => (
                  <li key={item} className="hover:text-blue-500 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                {['About Us', 'Blog', 'Careers', 'Press', 'Partners'].map(item => (
                  <li key={item} className="hover:text-blue-500 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'GDPR', 'Compliance'].map(item => (
                  <li key={item} className="hover:text-blue-500 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-600 text-center md:text-left">
              © 2025 VOTEX AI Inc. ISO 27001 · NIST SP 800-53 · SOC 2 Certified.
            </p>
            <div className="flex gap-6 text-xs text-gray-600">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const UserCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const Twitter = (props) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = (props) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const Github = (props) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default Home;
