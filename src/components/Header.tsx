import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, X, Landmark, Heart } from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
}

export default function Header({ favoritesCount }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#0E1726] text-[#B37B24] flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-md overflow-hidden relative">
            <img 
              src="/images/logo/logo.png" 
              alt="Shila Sawangan Logo" 
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="logo-fallback hidden w-full h-full items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-[#0E1726] tracking-widest uppercase">
              Shila Sawangan
            </h1>
            <p className="text-[10px] text-neutral-400 font-semibold tracking-wider uppercase -mt-0.5">
              Real Estate
            </p>
          </div>
        </Link>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-[#B37B24]' : 'text-neutral-600 hover:text-[#0E1726]'}`}>
            Beranda
          </NavLink>
          <NavLink to="/properties" className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-[#B37B24]' : 'text-neutral-600 hover:text-[#0E1726]'}`}>
            Kategori Cluster
          </NavLink>
        </nav>

        {/* Favorites Icon & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/favorites" className="relative p-2 text-neutral-600 hover:text-[#B37B24] transition-colors">
            <Heart className="w-6 h-6" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B37B24] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-neutral-600 hover:text-[#0E1726]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>
    </header>
  );
}
