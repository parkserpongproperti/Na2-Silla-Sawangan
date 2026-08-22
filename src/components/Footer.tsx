import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0E1726] text-white py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {/* Centered logo icon */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 bg-white/5 border border-white/10 text-[#B37B24] flex items-center justify-center rounded-xl shadow-inner">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <span className="font-display-lg text-lg font-bold tracking-widest uppercase block text-white">
              HOMELAND
            </span>
            <span className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase block mt-0.5">
              REAL ESTATE
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold tracking-wider uppercase text-neutral-300">
          <a href="/#about" className="hover:text-[#B37B24] transition-colors duration-300">
            About Us
          </a>
          <Link to="/properties" className="hover:text-[#B37B24] transition-colors duration-300">
            Properties
          </Link>
          <a href="/#contact" className="hover:text-[#B37B24] transition-colors duration-300">
            Contact
          </a>
          <a href="#" className="hover:text-[#B37B24] transition-colors duration-300">
            Privacy Policy
          </a>
        </div>

        <div className="max-w-md mx-auto h-[1px] bg-white/10" />

        {/* Copyright line */}
        <p className="text-xs text-neutral-400 tracking-wider font-semibold uppercase">
          &copy; 2026 HOMELAND REAL ESTATE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
