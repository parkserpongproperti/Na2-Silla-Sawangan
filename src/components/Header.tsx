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
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 px-2.5 bg-[#0E1726] flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-md overflow-hidden relative">
            <img 
              src="/images/logo/logo.png" 
              alt="Shila Sawangan Logo" 
              className="max-h-7 w-auto object-contain brightness-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="logo-fallback hidden w-full h-full items-center justify-center text-[#B37B24]">
              <Landmark className="w-5 h-5" />
            </div>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                isActive ? 'text-[#B37B24]' : 'text-[#1E293B] hover:text-[#B37B24]'
              }`
            }
          >
            Home
          </NavLink>
          <a
            href="/#about"
            className="text-xs font-bold tracking-widest uppercase text-[#1E293B] hover:text-[#B37B24] transition-colors duration-300"
          >
            About
          </a>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                isActive ? 'text-[#B37B24]' : 'text-[#1E293B] hover:text-[#B37B24]'
              }`
            }
          >
            Properties
          </NavLink>
          <a
            href="/#contact"
            className="text-xs font-bold tracking-widest uppercase text-[#1E293B] hover:text-[#B37B24] transition-colors duration-300"
          >
            Contact Us
          </a>
        </nav>

        {/* Right UI Controls */}
        <div className="flex items-center gap-3">
          <Link
            to="/properties?favorites=true"
            className="p-2.5 rounded-full hover:bg-neutral-50 text-neutral-600 hover:text-rose-500 relative transition-colors"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            to="/properties"
            className="p-2.5 rounded-full hover:bg-neutral-50 text-neutral-600 hover:text-[#B37B24] transition-colors"
          >
            <Search className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-[#1E293B] hover:text-[#B37B24] transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
