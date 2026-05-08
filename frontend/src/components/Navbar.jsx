import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] px-6 md:px-11 py-4 md:py-5 flex items-center justify-between transition-all duration-400 border-b ${
          isScrolled 
            ? 'bg-[#0A0F1C]/90 backdrop-blur-[24px] saturate-[180%] border-white/10 py-3 md:py-3' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-[0_0_22px_rgba(59,130,246,0.45)]">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="font-['Orbitron'] font-extrabold text-xl bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-widest">
            VOTEX AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Elections', 'Results', 'Security', 'FAQ', 'Contact'].map((item) => (
            <button key={item} className="nav-link-v">{item}</button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="btn-s !py-2 !px-5 text-sm">Login</button>
          <Link to="/register" className="btn-p !py-2 !px-6 text-sm">Register</Link>
        </div>

        <button 
          className="md:hidden text-white p-1"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1001] bg-[#0A0F1E]/97 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 p-6">
          <button 
            className="absolute top-6 right-6 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="font-['Orbitron'] text-2xl text-blue-500 mb-2">VOTEX AI</div>
          {['Home', 'About', 'Elections', 'Results', 'Security', 'FAQ', 'Contact'].map((item) => (
            <button 
              key={item} 
              className="text-2xl text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </button>
          ))}
          <div className="flex flex-col gap-4 w-full max-w-xs mt-4">
            <button className="btn-s w-full justify-center text-lg">Login</button>
            <Link to="/register" className="btn-p w-full justify-center text-lg" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
