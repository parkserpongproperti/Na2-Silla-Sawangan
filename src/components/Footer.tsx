import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0E1726] text-white py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="h-12 px-3 bg-white/5 border border-white/10 flex items-center justify-center rounded-xl shadow-inner overflow-hidden relative">
            <img 
              src="/images/logo/logo.png" 
              alt="Shila Sawangan Logo" 
              className="max-h-8 w-auto object-contain brightness-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback-footer') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="logo-fallback-footer hidden w-full h-full items-center justify-center text-[#B37B24]">
              <Landmark className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold tracking-wider uppercase text-neutral-300">
          <a href="/#about" className="hover:text-[#B37B24] transition-colors duration-300">About Us</a>
          <Link to="/properties" className="hover:text-[#B37B24] transition-colors duration-300">Properties</Link>
          <a href="/#contact" className="hover:text-[#B37B24] transition-colors duration-300">Contact</a>
        </div>

        <div className="max-w-md mx-auto h-[1px] bg-white/10" />

        <p className="text-xs text-neutral-400 tracking-wider font-semibold uppercase">
          &copy; 2026 SHILA SAWANGAN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
