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
            <h1 className="text-base sm:text-lg font-extrabold text-[#0E1726] tracking-widest uppercase">
              Homeland
            </h1>
            <p className="text-[10px] text-neutral-400 font-semibold tracking-wider uppercase -mt-0.5">
              Real Estate
            </p>
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
          {/* Favorites Badge Link */}
          <Link
            to="/properties?favorites=true"
            className="p-2.5 rounded-full hover:bg-neutral-50 text-neutral-600 hover:text-rose-500 relative transition-colors"
            title="My Saved Favorites"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Search Trigger (focuses on input) */}
          <Link
            to="/properties"
            className="p-2.5 rounded-full hover:bg-neutral-50 text-neutral-600 hover:text-[#B37B24] transition-colors"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* User Profile avatar toggle */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-neutral-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="User profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#B37B24]/40"
            />
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-[#1E293B] hover:text-[#B37B24] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-6 space-y-4 shadow-inner animate-fade-in">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-bold tracking-widest uppercase text-[#1E293B] hover:text-[#B37B24] transition-colors py-2"
          >
            Home
          </Link>
          <a
            href="/#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-bold tracking-widest uppercase text-[#1E293B] hover:text-[#B37B24] transition-colors py-2"
          >
            About
          </a>
          <Link
            to="/properties"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-bold tracking-widest uppercase text-[#1E293B] hover:text-[#B37B24] transition-colors py-2"
          >
            Properties
          </Link>
          <a
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-bold tracking-widest uppercase text-[#1E293B] hover:text-[#B37B24] transition-colors py-2"
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
}
