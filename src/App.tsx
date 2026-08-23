import React, { useState } from 'react';
import { 
  Instagram, 
  Menu, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  Trees, 
  Building2, 
  Waves, 
  LayoutGrid, 
  List, 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Layers, 
  ArrowUpRight, 
  ArrowRight, 
  Share2, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  Award,
  Sparkles,
  Layout
} from 'lucide-react';
import { motion } from 'motion/react';
import { Property, PropertyCategory } from './types';
import { PROPERTIES, PROPERTY_CATEGORIES } from './data/properties';

const ratnaPhoto = '/images/profile/1.jpg';
const heroVillaPhoto = '/images/hero/1.jpg';
const theForestPhoto = '/images/the-forest/1.jpg';
const southBankPhoto = '/images/south-bank/1.jpg';
const lakeVistaPhoto = '/images/lake-vista/1.jpg';

const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
const FALLBACK_VILLA = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80';
const FALLBACK_FOREST = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
const FALLBACK_SOUTHBANK = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
const FALLBACK_LAKEVISTA = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
  const target = e.currentTarget;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'properties'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchPropertiesQuery, setSearchPropertiesQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [propertiesLayout, setPropertiesLayout] = useState<'grid' | 'list'>('list');
  const [favoritedProperties, setFavoritedProperties] = useState<string[]>([]);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeDetailPhoto, setActiveDetailPhoto] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mortgage estimator state variables
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  
  // Forms submit states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavoritedProperties(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  // Mortgage Amortization Formula
  const calculateMortgage = (price: number) => {
    const downPayment = price * (downPaymentPct / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;

    if (monthlyRate === 0) return Math.round(loanAmount / numberOfPayments).toLocaleString('id-ID');

    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return isNaN(monthlyPayment) ? '0' : Math.round(monthlyPayment).toLocaleString('id-ID');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMsg('');
      setSelectedProperty(null);
    }, 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    const text = encodeURIComponent(`Halo Kak Ratna, saya ${contactName} (No. Telp/WA: ${contactPhone}). ${contactMsg ? `Pesan: ${contactMsg}` : 'Mohon informasi lebih lanjut mengenai properti di SHILA SAWANGAN.'}`);
    window.open(`https://wa.me6281280055490/?text=${text}`, '_blank');
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactPhone('');
      setContactMsg('');
      setIsContactOpen(false);
    }, 2000);
  };

  const handleShare = async (property: { title: string; location: string; price: string }) => {
    const shareData = {
      title: property.title,
      text: `Cek hunian eksklusif ${property.title} di SHILA SAWANGAN - ${property.price} (${property.location})`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or share not allowed
      }
    }

    // Fallback to clipboard copy
    try {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      const notice = document.createElement('div');
      notice.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0f1c2e] text-white text-xs px-4 py-2.5 rounded shadow-lg z-50 animate-bounce';
      notice.innerText = `Tautan & info "${property.title}" berhasil disalin ke clipboard!`;
      document.body.appendChild(notice);
      setTimeout(() => notice.remove(), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProperties = PROPERTIES.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="app-wrapper" className="min-h-screen bg-white font-body-md text-[#111c2c] relative flex flex-col">
      
      {/* HEADER NAVIGATION BAR (Strict match to screen.png) */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
        <div className="h-20 max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          
          {/* Logo with custom logo image */}
          <button 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 select-none cursor-pointer bg-transparent border-none text-left focus:outline-none"
          >
            <div className="h-10 px-2.5 bg-[#0E1726] flex items-center justify-center rounded-lg shadow-md overflow-hidden relative">
              <img 
                src="/images/logo/logo.png" 
                alt="Shila Sawangan Logo" 
                className="max-h-7 w-auto object-contain brightness-200 contrast-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="logo-fallback hidden w-full h-full items-center justify-center text-[#B37B24]">
                <span className="font-extrabold text-white text-lg">S</span>
              </div>
            </div>
          </button>
          
          {/* Navigation Links centered */}
          <nav className="hidden md:flex items-center gap-10">
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`font-navigation text-[12px] tracking-[0.15em] hover:text-[#965F0E] transition-all uppercase font-bold cursor-pointer bg-transparent border-none ${currentPage === 'home' ? 'text-[#965F0E]' : 'text-gray-500'}`}
            >
              HOME
            </button>
            <button 
              onClick={() => {
                setCurrentPage('home');
                setTimeout(() => {
                  const element = document.getElementById('about');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="font-navigation text-[12px] tracking-[0.15em] hover:text-[#965F0E] transition-all uppercase text-gray-500 font-bold cursor-pointer bg-transparent border-none"
            >
              ABOUT
            </button>
            <button 
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`font-navigation text-[12px] tracking-[0.15em] hover:text-[#965F0E] transition-all uppercase font-bold cursor-pointer bg-transparent border-none ${currentPage === 'properties' ? 'text-[#965F0E]' : 'text-gray-500'}`}
            >
              PROPERTIES
            </button>
            <button 
              onClick={() => {
                setCurrentPage('home');
                setTimeout(() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="font-navigation text-[12px] tracking-[0.15em] hover:text-[#965F0E] transition-all uppercase text-gray-500 font-bold cursor-pointer bg-transparent border-none"
            >
              CONTACT US
            </button>
          </nav>
          
          {/* Header Action Button Group (Instagram Link & Profile menu) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a 
              id="instagram-header-btn"
              href="https://www.instagram.com/puriastergdc.ratna?utm_source=qr&igsi=eG11MjNjMGt1aW5l"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-full border border-gray-200 hover:border-[#E1306C] text-gray-700 hover:text-[#E1306C] bg-white hover:bg-pink-50/50 shadow-2xs transition-all duration-200 flex items-center justify-center cursor-pointer group"
              title="Kunjungi Instagram Kami"
              aria-label="Instagram Puri Aster GDC Ratna"
            >
              <Instagram className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-200 group-hover:scale-110" />
            </a>
            
            <div className="relative">
              <button 
                id="profile-action-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-3.5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full border border-gray-200 hover:border-gray-400 bg-white shadow-xs transition-all cursor-pointer focus:outline-none"
              >
                <Menu className="w-4 h-4 text-black shrink-0" />
                <img 
                  alt="Profile" 
                  className="w-7 h-7 rounded-full object-cover object-top select-none" 
                  src={ratnaPhoto}
                  onError={(e) => handleImgError(e, FALLBACK_AVATAR)}
                  referrerPolicy="no-referrer"
                />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2.5 z-50">
                  <button 
                    onClick={() => {
                      setCurrentPage('home');
                      setIsMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="w-full text-left block px-4 py-2 text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-50 hover:text-[#965F0E] transition-colors font-bold bg-transparent border-none cursor-pointer"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentPage('home');
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        const el = document.getElementById('about');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="w-full text-left block px-4 py-2 text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-50 hover:text-[#965F0E] transition-colors font-bold bg-transparent border-none cursor-pointer"
                  >
                    About Agency
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentPage('properties');
                      setIsMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="w-full text-left block px-4 py-2 text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-50 hover:text-[#965F0E] transition-colors font-bold bg-transparent border-none cursor-pointer"
                  >
                    Featured Properties
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentPage('home');
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="w-full text-left block px-4 py-2 text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-50 hover:text-[#965F0E] transition-colors font-bold bg-transparent border-none cursor-pointer"
                  >
                    Get In Touch
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CORE PAGES & SECTIONS (Layout exactly matching photo) */}
      <main className="flex-grow">
        
        {currentPage === 'home' ? (
          <>
            {/* HERO HEADER TEXT */}
            <section className="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
                
                {/* Left Header Title Block */}
                <div className="flex flex-col">
                  <span className="text-[11px] tracking-[0.25em] text-gray-400 font-bold uppercase mb-1 sm:mb-2">
                    FIND YOUR
                  </span>
                  <h1 className="font-display-lg text-black uppercase text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                    PERFECT HOME
                  </h1>
                  <p className="font-body-md text-gray-500 mt-2 sm:mt-4 max-w-sm text-xs sm:text-sm">
                    Modern living spaces di lokasi prima. Pilihan hunian terbaik dengan exceptional lifestyle.
                  </p>
                </div>
                
                {/* Right Header Trust Block */}
                <div className="flex flex-col md:pl-12 border-l-0 md:border-l border-gray-100 pt-3 md:pt-0">
                  <span className="font-bold text-xs uppercase tracking-[0.15em] text-black mb-1 sm:mb-2">
                    Trusted Since 2014
                  </span>
                  <p className="font-body-md text-gray-500 text-xs sm:text-sm leading-relaxed max-w-md">
                    Membantu ribuan keluarga menemukan dream home mereka dengan honesty, expertise, dan pelayanan terbaik.
                  </p>
                </div>

              </div>
            </section>

            {/* HERO IMAGE GRID - Side-by-Side on all screens with readable responsive sizes */}
            <section className="pb-12 sm:pb-16 px-4 md:px-6 max-w-[1200px] mx-auto w-full">
              <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-start w-full">
                
                {/* Left Side: Agent Portrait & Underneath Trust Card */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className="col-span-5 sm:col-span-4 flex flex-col gap-2.5 sm:gap-6 w-full"
                >
                  {/* Agent Portrait Image */}
                  <div className="w-full aspect-[4/5] rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <img 
                      alt="Ratna - Professional Property Consultant" 
                      className="w-full h-full object-cover object-top select-none" 
                      src={ratnaPhoto}
                      onError={(e) => handleImgError(e, FALLBACK_AVATAR)}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Slate Navy Trust Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
                    className="bg-[#0f1c2e] p-2.5 sm:p-5 md:p-6 rounded-lg shadow-sm border border-gray-800 w-full"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#965F0E]/20 flex items-center justify-center shrink-0">
                        <ShieldCheck className="text-[#965F0E] w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-headline-lg text-[9px] sm:text-xs md:text-sm leading-tight text-white uppercase tracking-wider font-extrabold truncate">
                          Support Customer
                        </h4>
                      </div>
                    </div>
                    
                    <p className="font-body-md text-gray-300 mb-2 sm:mb-3 border-b border-white/10 pb-1.5 sm:pb-2 text-[8px] sm:text-[10px] md:text-xs tracking-wide">
                      Over 12 Years of Excellence
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-1 justify-between items-start sm:items-center text-gray-300 font-label-bold text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-wider font-bold">
                      <div className="flex items-center gap-1"><CheckCircle2 className="text-[#965F0E] w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> Trusted</div>
                      <div className="flex items-center gap-1"><Eye className="text-[#965F0E] w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> Transparent</div>
                      <div className="flex items-center gap-1"><Award className="text-[#965F0E] w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> Dedicated</div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Right Side: Header White Bar and Large Twilight Villa Image */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  className="col-span-7 sm:col-span-8 flex flex-col w-full"
                >
                  <div className="bg-white border border-gray-100 rounded-t-lg px-2 sm:px-5 py-2 sm:py-3.5 flex flex-row items-center justify-between gap-1.5 sm:gap-2 shadow-2xs">
                    {/* Brand Text Logo left */}
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink min-w-0">
                      <span className="font-display-lg text-[9px] sm:text-[11px] md:text-[13px] tracking-[0.12em] sm:tracking-[0.2em] font-extrabold text-black uppercase truncate">SHILA</span>
                      <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-gray-400 font-bold border-l border-gray-200 pl-1 sm:pl-1.5 truncate">SAWANGAN</span>
                    </div>
                    {/* Gold Explore Properties button right */}
                    <button 
                      onClick={() => {
                        setCurrentPage('properties');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-[#965F0E] hover:bg-[#804f0b] text-white transition-colors font-bold text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-wider py-1.5 sm:py-2.5 px-2 sm:px-4 flex items-center gap-1 rounded cursor-pointer shadow-xs text-center whitespace-nowrap border-none focus:outline-none shrink-0"
                    >
                      <span>EXPLORE</span>
                      <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    </button>
                  </div>
                  
                  {/* Pool Twilight Villa Large Photo */}
                  <div className="w-full aspect-[16/10] md:aspect-[16/9] rounded-b-lg overflow-hidden shadow-sm border-x border-b border-gray-100">
                    <img 
                      alt="Beautiful pool twilight modern villa" 
                      className="w-full h-full object-cover select-none" 
                      src={heroVillaPhoto}
                      onError={(e) => handleImgError(e, FALLBACK_VILLA)}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>

              </div>
            </section>

            {/* CATEGORIES SECTION (THE FOREST, SOUTH BANK, LAKE VISTA) */}
            <section className="py-8 sm:py-16 px-4 sm:px-6 max-w-[1200px] mx-auto w-full border-t border-gray-100" id="clusters">
              <motion.div 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="grid grid-cols-12 gap-4 sm:gap-8 lg:gap-10 items-center"
              >
                
                {/* Left details narrative */}
                <div className="col-span-12 md:col-span-4 flex flex-col justify-center">
                  <h2 className="text-black mb-2 sm:mb-5 font-bold text-lg sm:text-2xl lg:text-[32px] leading-tight sm:leading-snug">
                    Pilihan Kategori <br className="hidden sm:block" /> Shila Sawangan
                  </h2>

                  <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <button
                      onClick={() => {
                        setSelectedCategory('ALL');
                        setCurrentPage('properties');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2.5 rounded bg-[#965F0E] hover:bg-[#804f0b] text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-sm border-none flex items-center gap-1.5"
                    >
                      <span>Buka Halaman Properti</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
                
                {/* Right side: 3 Category Cluster Cards */}
                <div className="col-span-12 md:col-span-8 grid grid-cols-3 gap-2 sm:gap-4 relative">
                  
                  {/* Category 1: THE FOREST */}
                  <div 
                    onClick={() => {
                      setSelectedCategory('THE FOREST');
                      setCurrentPage('properties');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative h-[200px] sm:h-[290px] md:h-[370px] rounded-lg overflow-hidden group shadow-md border cursor-pointer transition-all duration-300 ${
                      selectedCategory === 'THE FOREST' 
                        ? 'ring-4 ring-[#965F0E] shadow-xl scale-[1.03]' 
                        : 'border-gray-100 hover:border-[#965F0E] opacity-95 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={theForestPhoto}
                      alt="The Forest Cluster"
                      onError={(e) => handleImgError(e, FALLBACK_FOREST)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    {selectedCategory === 'THE FOREST' && (
                      <div className="absolute top-2 right-2 bg-[#965F0E] text-white text-[8px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Terpilih
                      </div>
                    )}

                    <div className="absolute bottom-2 sm:bottom-4 left-1.5 sm:left-3 right-1.5 sm:right-3 bg-[#0f1c2e]/95 backdrop-blur-xs p-2 sm:p-3 rounded border border-white/10 flex flex-col justify-center">
                      <span className="text-[#965F0E] text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider">Cluster 01</span>
                      <h4 className="text-white text-[11px] sm:text-sm font-extrabold leading-tight">THE FOREST</h4>
                      <p className="text-gray-300 text-[9px] sm:text-[10px] font-medium mt-0.5">Asri & Teduh</p>
                    </div>
                  </div>
                  
                  {/* Category 2: SOUTH BANK */}
                  <div 
                    onClick={() => {
                      setSelectedCategory('SOUTH BANK');
                      setCurrentPage('properties');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative h-[200px] sm:h-[290px] md:h-[370px] rounded-lg overflow-hidden group shadow-md border cursor-pointer transition-all duration-300 ${
                      selectedCategory === 'SOUTH BANK' 
                        ? 'ring-4 ring-[#965F0E] shadow-xl scale-[1.03]' 
                        : 'border-gray-100 hover:border-[#965F0E] opacity-95 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={southBankPhoto}
                      alt="South Bank Cluster"
                      onError={(e) => handleImgError(e, FALLBACK_SOUTHBANK)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    {selectedCategory === 'SOUTH BANK' && (
                      <div className="absolute top-2 right-2 bg-[#965F0E] text-white text-[8px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Terpilih
                      </div>
                    )}

                    <div className="absolute bottom-2 sm:bottom-4 left-1.5 sm:left-3 right-1.5 sm:right-3 bg-[#0f1c2e]/95 backdrop-blur-xs p-2 sm:p-3 rounded border border-white/10 flex flex-col justify-center">
                      <span className="text-[#965F0E] text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider">Cluster 02</span>
                      <h4 className="text-white text-[11px] sm:text-sm font-extrabold leading-tight">SOUTH BANK</h4>
                      <p className="text-gray-300 text-[9px] sm:text-[10px] font-medium mt-0.5">Modern Minimalis</p>
                    </div>
                  </div>

                  {/* Category 3: LAKE VISTA */}
                  <div 
                    onClick={() => {
                      setSelectedCategory('LAKE VISTA');
                      setCurrentPage('properties');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative h-[200px] sm:h-[290px] md:h-[370px] rounded-lg overflow-hidden group shadow-md border cursor-pointer transition-all duration-300 ${
                      selectedCategory === 'LAKE VISTA' 
                        ? 'ring-4 ring-[#965F0E] shadow-xl scale-[1.03]' 
                        : 'border-gray-100 hover:border-[#965F0E] opacity-95 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={lakeVistaPhoto}
                      alt="Lake Vista Cluster"
                      onError={(e) => handleImgError(e, FALLBACK_LAKEVISTA)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    {selectedCategory === 'LAKE VISTA' && (
                      <div className="absolute top-2 right-2 bg-[#965F0E] text-white text-[8px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Terpilih
                      </div>
                    )}

                    <div className="absolute bottom-2 sm:bottom-4 left-1.5 sm:left-3 right-1.5 sm:right-3 bg-[#0f1c2e]/95 backdrop-blur-xs p-2 sm:p-3 rounded border border-white/10 flex flex-col justify-center">
                      <span className="text-[#965F0E] text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider">Cluster 03</span>
                      <h4 className="text-white text-[11px] sm:text-sm font-extrabold leading-tight">LAKE VISTA</h4>
                      <p className="text-gray-300 text-[9px] sm:text-[10px] font-medium mt-0.5">Waterfront Luxury</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            </section>

            {/* ABOUT ME SECTION (Personalized Agent Profile) */}
            <section className="py-8 sm:py-16 px-4 sm:px-6 max-w-[1200px] mx-auto w-full border-t border-gray-100 mt-2 sm:mt-8" id="about">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-10 items-center">
                
                {/* Left Content Column */}
                <div className="sm:col-span-7 flex flex-col justify-center order-2 sm:order-1">
                  <span className="text-[#965F0E] font-bold text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">About Me</span>
                  <h2 className="text-black mb-2 sm:mb-4 font-extrabold uppercase tracking-tight text-lg sm:text-2xl md:text-3xl">
                    About Me
                  </h2>
                  <p className="font-body-md text-gray-600 mb-2 sm:mb-4 text-xs sm:text-[13px] md:text-sm leading-relaxed">
                    Halo, saya Ratna, konsultan properti profesional dan terpercaya dengan pengalaman lebih dari satu dekade dalam membantu setiap klien menemukan hunian idaman di kawasan strategis SHILA SAWANGAN.
                  </p>
                  <p className="font-body-md text-gray-600 text-xs sm:text-[13px] md:text-sm leading-relaxed">
                    Saya berkomitmen memberikan pendampingan personal dari awal konsultasi, pemilihan unit terbaik, simulasi KPR, hingga serah terima kunci dengan proses yang transparan, aman, dan nyaman.
                  </p>
                </div>
                
                {/* Right Crop Landscape Agent Image */}
                <div className="sm:col-span-5 relative h-[220px] sm:h-[280px] md:h-[380px] rounded-lg overflow-hidden shadow-md border border-gray-100 order-1 sm:order-2">
                  <img 
                    alt="Ratna Property Consultant Portrait" 
                    className="w-full h-full object-cover object-top select-none" 
                    src={ratnaPhoto}
                    onError={(e) => handleImgError(e, FALLBACK_AVATAR)}
                    referrerPolicy="no-referrer"
                  />
                </div>

              </div>
            </section>

            {/* READY TO FIND YOUR DREAM HOME BANNER */}
            <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-[1200px] mx-auto w-full relative" id="contact">
              <div className="bg-[#0f1c2e] text-white rounded-lg p-6 sm:p-10 md:p-14 text-center max-w-4xl mx-auto shadow-sm border border-gray-800">
                <h2 className="font-headline-xl text-lg sm:text-2xl lg:text-3xl mb-2 sm:mb-3 font-extrabold uppercase tracking-tight">
                  Ready to Find Your Dream Home?
                </h2>
                <p className="font-body-md text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
                  Get in touch with our expert real estate agents today and start your journey.
                </p>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="bg-[#965F0E] hover:bg-[#804f0b] text-white font-bold text-[11px] sm:text-xs uppercase tracking-widest py-3 sm:py-3.5 px-6 sm:px-8 rounded transition-all cursor-pointer shadow-sm border-none"
                >
                  CONTACT US NOW
                </button>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col w-full bg-white animate-fade-in">
            {/* Search/Filter Header */}
            <section className="bg-gray-50/50 relative py-8 sm:py-12 lg:py-16 overflow-hidden border-b border-gray-100">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full relative z-10">
                <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
                  <span className="text-[10px] tracking-[0.25em] text-gray-400 font-bold uppercase mb-1">SHILA SAWANGAN CATALOG</span>
                  <h1 className="font-display-lg text-black uppercase text-xl sm:text-3xl lg:text-[38px] font-extrabold leading-tight tracking-tight mb-2">Discover Your Perfect Home</h1>
                  <p className="font-body-md text-gray-500 max-w-2xl text-[11px] sm:text-xs">Explore our curated selection of premium properties. Filter by location, type, and price to find exactly what you're looking for.</p>
                </div>
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto w-full">
                  <div className="bg-white shadow-xs rounded-full p-1.5 flex items-center border border-gray-100 focus-within:border-[#965F0E] transition-all">
                    <div className="flex-1 flex items-center px-3 sm:px-4 min-w-0">
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 shrink-0" />
                      <input 
                        type="text" 
                        value={searchPropertiesQuery}
                        onChange={(e) => setSearchPropertiesQuery(e.target.value)}
                        placeholder="Cari properti berdasarkan nama, tipe, cluster..." 
                        className="w-full bg-transparent border-none outline-none text-[11px] sm:text-xs text-black placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <button className="bg-[#965F0E] hover:bg-[#804f0b] text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs px-4 sm:px-8 py-2 sm:py-3 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer border-none focus:outline-none shrink-0">
                      Cari
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Property Grid/List Section */}
            <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
              {/* Grid Header with Category Filter Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 pb-4 border-b border-gray-100">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg sm:text-xl font-extrabold text-black uppercase tracking-tight">
                    {selectedCategory === 'ALL' ? 'Semua Properti Shila' : `Kategori: ${selectedCategory}`}
                  </h2>
                  <p className="font-body-md text-gray-400 text-xs">Pilihan hunian premium di Shila Sawangan.</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                  {/* Custom Category Filter Dropdown */}
                  <div className="relative w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                      className={`w-full sm:w-auto justify-between sm:justify-start flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all cursor-pointer select-none ${
                        isCategoryDropdownOpen 
                          ? 'bg-white border-[#965F0E] shadow-md ring-2 ring-[#965F0E]/20' 
                          : 'bg-white hover:bg-gray-50 border-gray-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#965F0E] shrink-0" />
                        <span className="font-extrabold text-[10px] text-[#965F0E] uppercase tracking-wider">Kategori:</span>
                        <span className="font-extrabold text-xs text-black">
                          {selectedCategory === 'ALL' ? 'Semua Kategori' : selectedCategory}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-[#965F0E]' : ''}`} />
                    </button>

                    {/* Floating Dropdown Menu */}
                    {isCategoryDropdownOpen && (
                      <>
                        {/* Invisible Backdrop to close on click outside */}
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsCategoryDropdownOpen(false)}
                        />
                        
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-150 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                          <div className="px-3.5 py-2 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                              Filter Pilihan Kategori
                            </span>
                            <span className="text-[10px] bg-amber-50 text-[#965F0E] font-bold px-2 py-0.5 rounded-full">
                              3 Cluster
                            </span>
                          </div>

                          <div className="p-1.5 space-y-1">
                            {/* Option 1: Semua Kategori */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory('ALL');
                                setIsCategoryDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer border-none ${
                                selectedCategory === 'ALL'
                                  ? 'bg-[#965F0E]/10 text-[#965F0E]'
                                  : 'hover:bg-gray-50 text-gray-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                  selectedCategory === 'ALL' ? 'bg-[#965F0E] text-white' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  <Layout className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-extrabold text-xs leading-tight">Semua Kategori</div>
                                  <div className="text-[10px] text-gray-400">Tampilkan seluruh cluster ({PROPERTIES.length} unit)</div>
                                </div>
                              </div>
                              {selectedCategory === 'ALL' && (
                                <Check className="w-4 h-4 text-[#965F0E] shrink-0" />
                              )}
                            </button>

                            {/* Option 2: THE FOREST */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory('THE FOREST');
                                setIsCategoryDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer border-none ${
                                selectedCategory === 'THE FOREST'
                                  ? 'bg-[#965F0E]/10 text-[#965F0E]'
                                  : 'hover:bg-gray-50 text-gray-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                  selectedCategory === 'THE FOREST' ? 'bg-[#965F0E] text-white' : 'bg-emerald-50 text-emerald-700'
                                }`}>
                                  <Trees className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-extrabold text-xs leading-tight">THE FOREST</div>
                                  <div className="text-[10px] text-gray-400">Cluster nuansa asri & hijau</div>
                                </div>
                              </div>
                              {selectedCategory === 'THE FOREST' && (
                                <Check className="w-4 h-4 text-[#965F0E] shrink-0" />
                              )}
                            </button>

                            {/* Option 3: SOUTH BANK */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory('SOUTH BANK');
                                setIsCategoryDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer border-none ${
                                selectedCategory === 'SOUTH BANK'
                                  ? 'bg-[#965F0E]/10 text-[#965F0E]'
                                  : 'hover:bg-gray-50 text-gray-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                  selectedCategory === 'SOUTH BANK' ? 'bg-[#965F0E] text-white' : 'bg-blue-50 text-blue-700'
                                }`}>
                                  <Building2 className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-extrabold text-xs leading-tight">SOUTH BANK</div>
                                  <div className="text-[10px] text-gray-400">Cluster desain kontemporer</div>
                                </div>
                              </div>
                              {selectedCategory === 'SOUTH BANK' && (
                                <Check className="w-4 h-4 text-[#965F0E] shrink-0" />
                              )}
                            </button>

                            {/* Option 4: LAKE VISTA */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory('LAKE VISTA');
                                setIsCategoryDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer border-none ${
                                selectedCategory === 'LAKE VISTA'
                                  ? 'bg-[#965F0E]/10 text-[#965F0E]'
                                  : 'hover:bg-gray-50 text-gray-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                  selectedCategory === 'LAKE VISTA' ? 'bg-[#965F0E] text-white' : 'bg-cyan-50 text-cyan-700'
                                }`}>
                                  <Waves className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-extrabold text-xs leading-tight">LAKE VISTA</div>
                                  <div className="text-[10px] text-gray-400">Cluster luxury tepi danau</div>
                                </div>
                              </div>
                              {selectedCategory === 'LAKE VISTA' && (
                                <Check className="w-4 h-4 text-[#965F0E] shrink-0" />
                              )}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="hidden md:flex bg-gray-50 rounded-full p-1 border border-gray-200">
                    <button 
                      onClick={() => setPropertiesLayout('grid')}
                      className={`p-1.5 rounded-full transition-all border-none cursor-pointer bg-transparent ${propertiesLayout === 'grid' ? 'bg-white text-[#965F0E] shadow-xs' : 'text-gray-400 hover:text-black'}`}
                      title="Tampilan Grid"
                    >
                      <LayoutGrid className="w-4 h-4 block" />
                    </button>
                    <button 
                      onClick={() => setPropertiesLayout('list')}
                      className={`p-1.5 rounded-full transition-all border-none cursor-pointer bg-transparent ${propertiesLayout === 'list' ? 'bg-white text-[#965F0E] shadow-xs' : 'text-gray-400 hover:text-black'}`}
                      title="Tampilan List"
                    >
                      <List className="w-4 h-4 block" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid / List render content */}
              {PROPERTIES.filter(property => {
                const matchesCategory = selectedCategory === 'ALL' || property.category === selectedCategory;
                const query = searchPropertiesQuery.toLowerCase().trim();
                const matchesQuery = !query || (
                  property.title.toLowerCase().includes(query) ||
                  property.location.toLowerCase().includes(query) ||
                  property.description.toLowerCase().includes(query) ||
                  property.category.toLowerCase().includes(query)
                );
                return matchesCategory && matchesQuery;
              }).sort((a, b) => {
                if (sortOption === 'price-low') {
                  return a.priceNumeric - b.priceNumeric;
                } else if (sortOption === 'price-high') {
                  return b.priceNumeric - a.priceNumeric;
                } else if (sortOption === 'popular') {
                  return b.id.localeCompare(a.id);
                } else {
                  return (b.yearBuilt || 0) - (a.yearBuilt || 0);
                }
              }).length > 0 ? (
                <div className={propertiesLayout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-6'}>
                  {PROPERTIES.filter(property => {
                    const matchesCategory = selectedCategory === 'ALL' || property.category === selectedCategory;
                    const query = searchPropertiesQuery.toLowerCase().trim();
                    const matchesQuery = !query || (
                      property.title.toLowerCase().includes(query) ||
                      property.location.toLowerCase().includes(query) ||
                      property.description.toLowerCase().includes(query) ||
                      property.category.toLowerCase().includes(query)
                    );
                    return matchesCategory && matchesQuery;
                  }).sort((a, b) => {
                    if (sortOption === 'price-low') {
                      return a.priceNumeric - b.priceNumeric;
                    } else if (sortOption === 'price-high') {
                      return b.priceNumeric - a.priceNumeric;
                    } else if (sortOption === 'popular') {
                      return b.id.localeCompare(a.id);
                    } else {
                      return (b.yearBuilt || 0) - (a.yearBuilt || 0);
                    }
                  }).map(property => {
                    const isFav = favoritedProperties.includes(property.id);
                    return (
                      <article 
                        key={property.id}
                        className={`group bg-white rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 shadow-xs hover:shadow-md flex ${
                          propertiesLayout === 'grid' ? 'flex-col' : 'flex-col lg:flex-row'
                        }`}
                      >
                        {/* Left image area */}
                        <div className={`relative overflow-hidden shrink-0 ${
                          propertiesLayout === 'grid' ? 'w-full aspect-[16/10]' : 'w-full lg:w-[380px] xl:w-[420px] aspect-[16/10]'
                        }`}>
                          <img 
                            src={property.image}
                            alt={property.title}
                            onError={(e) => handleImgError(e, FALLBACK_FOREST)}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          
                          {/* Badges overlay */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            {property.badges && property.badges.map((badge, idx) => (
                              <span key={idx} className={`${badge === 'Featured' ? 'bg-[#965F0E]' : 'bg-[#0f1c2e]'} text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full`}>
                                {badge}
                              </span>
                            ))}
                          </div>

                          {/* Price overlay */}
                          <div className="absolute bottom-4 left-4 bg-[#0f1c2e]/90 backdrop-blur-xs px-4.5 py-1.5 rounded">
                            <span className="text-white text-lg font-extrabold font-display-lg">{property.price}</span>
                          </div>
                        </div>

                        {/* Right details content area */}
                        <div className="p-4 sm:p-6 md:p-7 flex flex-col flex-grow justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
                              <h3 className="font-extrabold uppercase text-base sm:text-xl text-black group-hover:text-[#965F0E] transition-colors tracking-tight leading-tight">
                                {property.title}
                              </h3>
                              <button 
                                onClick={() => toggleFavorite(property.id)}
                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer bg-white shrink-0 ${
                                  isFav ? 'bg-rose-50 border-rose-100 text-rose-500' : 'border-gray-200 text-gray-400 hover:text-[#965F0E] hover:border-[#965F0E]'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                              </button>
                            </div>

                            <div className="flex items-center gap-1 text-gray-400 mb-3 sm:mb-5">
                              <MapPin className="w-3.5 h-3.5 text-[#965F0E] shrink-0" />
                              <span className="text-xs font-body-md truncate">{property.location}</span>
                            </div>

                            {/* Info specification stats with separator */}
                            <div className="flex items-center gap-4 sm:gap-6 py-3 sm:py-4.5 border-y border-gray-100 mb-4 sm:mb-6 text-gray-700">
                              <div className="flex items-center gap-1.5">
                                <Bed className="w-4 h-4 text-[#965F0E] shrink-0" />
                                <span className="text-xs font-bold">{property.bedrooms} <span className="text-gray-400 font-normal">Kamar</span></span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Bath className="w-4 h-4 text-[#965F0E] shrink-0" />
                                <span className="text-xs font-bold">{property.bathrooms} <span className="text-gray-400 font-normal">Mandi</span></span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Layers className="w-4 h-4 text-[#965F0E] shrink-0" />
                                <span className="text-xs font-bold">{property.floors} <span className="text-gray-400 font-normal">Lt</span></span>
                              </div>
                            </div>
                          </div>

                          {/* Detail action link and buttons */}
                          <div className="flex items-center justify-between gap-3 mt-auto pt-1">
                            <button 
                              onClick={() => setSelectedProperty(property)}
                              className="flex items-center gap-1.5 text-[#965F0E] hover:text-[#804f0b] font-bold text-xs uppercase tracking-widest cursor-pointer bg-transparent border-none focus:outline-none"
                            >
                              <span>DETAIL PROPERTI</span>
                              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                            </button>

                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  const text = encodeURIComponent(`Halo SHILA SAWANGAN, saya tertarik dengan properti "${property.title}" (${property.price}) di ${property.location}. Mohon informasi lebih lanjut.`);
                                  window.open(`https://wa.me/6281280055490?text=${text}`, '_blank');
                                }}
                                className="w-9 h-9 flex items-center justify-center text-[#25D366] hover:scale-110 transition-all cursor-pointer border-none bg-transparent"
                                title="WhatsApp Agent"
                              >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.416 1.452 5.518 0 10.007-4.485 10.01-10.004.002-2.674-1.033-5.188-2.915-7.072C17.271 1.644 14.764.609 12.01.608 6.491.608 2.003 5.093 2.001 10.613c-.001 1.93.498 3.81 1.444 5.416L2.392 20.3l4.255-1.146zm11.396-8.21c-.32-.16-1.89-.933-2.185-1.042-.295-.11-.51-.16-.724.162-.215.32-.83.162-1.015 1.23-.185.215-.37.245-.69.085-.32-.16-1.348-.497-2.566-1.585-.948-.846-1.587-1.89-1.773-2.21-.185-.32-.02-.493.14-.652.145-.143.32-.37.48-.556.16-.186.214-.32.32-.534.11-.214.054-.4-.027-.56-.08-.16-.724-1.744-.993-2.39-.263-.632-.53-.547-.724-.556-.186-.01-.4-.01-.615-.01-.215 0-.565.08-.86.4-.295.32-1.13 1.104-1.13 2.693 0 1.59 1.157 3.12 1.317 3.33.162.215 2.277 3.478 5.517 4.88.77.333 1.37.532 1.838.68.773.245 1.478.21 2.034.127.62-.093 1.89-.773 2.156-1.48.265-.705.265-1.31.186-1.432-.08-.122-.295-.215-.615-.375z"/>
                                </svg>
                              </button>
                              <button 
                                onClick={() => handleShare(property)}
                                className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-[#965F0E] hover:text-white transition-all cursor-pointer border-none"
                                title="Share"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-extrabold text-black uppercase tracking-tight text-sm">Tidak ada properti ditemukan</h3>
                  <p className="font-body-md text-gray-400 text-xs mt-1">Coba gunakan kata kunci lain atau pilih Semua Kategori.</p>
                </div>
              )}
            </section>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0f1c2e] text-white py-14 mt-auto border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            
            {/* Centered Logo */}
            <div className="h-10 px-3 bg-white/5 border border-white/10 flex items-center justify-center rounded-lg shadow-inner overflow-hidden relative">
              <img 
                src="/images/logo/logo.png" 
                alt="Shila Sawangan Logo" 
                className="max-h-7 w-auto object-contain brightness-200 contrast-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback-footer') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="logo-fallback-footer hidden w-full h-full items-center justify-center text-[#B37B24]">
                <span className="font-extrabold text-white text-lg">S</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-2">
              <a className="font-navigation text-[11px] uppercase hover:text-[#965F0E] transition-colors tracking-widest font-bold text-gray-300" href="#about">ABOUT US</a>
              <a className="font-navigation text-[11px] uppercase hover:text-[#965F0E] transition-colors tracking-widest font-bold text-gray-300" href="#properties">PROPERTIES</a>
              <a className="font-navigation text-[11px] uppercase hover:text-[#965F0E] transition-colors tracking-widest font-bold text-gray-300" href="#contact">CONTACT</a>
              <a 
                className="font-navigation text-[11px] uppercase hover:text-[#E1306C] transition-colors tracking-widest font-bold text-gray-300 flex items-center gap-1.5" 
                href="https://www.instagram.com/puriastergdc.ratna?utm_source=qr&igsi=eG11MjNjMGt1aW5l"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-3.5 h-3.5" />
                INSTAGRAM
              </a>
              <a className="font-navigation text-[11px] uppercase hover:text-[#965F0E] transition-colors tracking-widest font-bold text-gray-300" href="#">PRIVACY POLICY</a>
            </div>
            
            <div className="w-full h-[1px] bg-white/10"></div>
            
            <p className="font-label-bold text-gray-400 text-[10px] tracking-widest text-center uppercase font-bold">
              © 2026 SHILA SAWANGAN. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

      {/* SEARCH SYSTEM MODAL OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-[#0f1c2e]/95 backdrop-blur-sm z-50 flex flex-col items-center justify-start pt-[100px] px-6">
          <div className="w-full max-w-xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-white text-lg font-extrabold uppercase tracking-widest">Search Properties</h2>
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-white hover:text-[#965F0E] transition-colors p-1 cursor-pointer"
              >
                <X className="w-6 h-6 font-bold" />
              </button>
            </div>
            
            <div className="relative mb-6">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari lokasi atau nama properti..." 
                className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/10 rounded px-4 py-3.5 pl-11 text-sm focus:outline-none focus:border-[#965F0E] transition-all"
                autoFocus
              />
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
              {filteredProperties.length > 0 ? (
                filteredProperties.map(property => (
                  <div 
                    key={property.id}
                    onClick={() => {
                      setSelectedProperty(property);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex gap-4 p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded cursor-pointer transition-all items-center group"
                  >
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      onError={(e) => handleImgError(e, FALLBACK_FOREST)}
                      className="w-12 h-12 rounded object-cover" 
                    />
                    <div className="flex-grow">
                      <h4 className="text-white font-extrabold group-hover:text-[#965F0E] transition-colors text-xs uppercase">{property.title}</h4>
                      <p className="text-gray-400 text-[11px]">{property.location}</p>
                    </div>
                    <div className="text-[#965F0E] font-extrabold text-[13px] pr-2">{property.price}</div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center text-xs py-6">Tidak ada properti yang cocok dengan "{searchQuery}"</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT EXPERT GENERAL OVERLAY */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-[#0f1c2e]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full shadow-xl p-6 relative border border-gray-100">
            <button 
              onClick={() => {
                setIsContactOpen(false);
                setContactSubmitted(false);
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-[#965F0E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 font-bold" />
            </button>
            
            <div className="flex items-center gap-3 mb-4 pr-6">
              <img 
                src={ratnaPhoto} 
                alt="Ratna" 
                onError={(e) => handleImgError(e, FALLBACK_AVATAR)}
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#965F0E] shadow-xs" 
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-headline-xl text-base text-black font-extrabold uppercase tracking-wider">Konsultasi dengan Ratna</h3>
                <p className="text-[11px] text-gray-500 font-medium">Property Consultant SHILA SAWANGAN</p>
              </div>
            </div>
            
            {contactSubmitted ? (
              <div className="bg-green-50 border border-green-100 text-green-800 p-5 rounded text-center">
                <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold uppercase mb-1">Pesan Terkirim!</h4>
                <p className="text-xs text-green-700">Terima kasih. Kami akan segera menghubungi Anda.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4.5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">Nama Anda *</label>
                  <input 
                    type="text" 
                    required 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Masukkan nama Anda" 
                    className="w-full border border-gray-200 rounded px-3.5 py-2 text-xs focus:outline-none focus:border-[#965F0E] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">Nomor Telepon / WhatsApp *</label>
                  <input 
                    type="tel" 
                    required 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="081234567890" 
                    className="w-full border border-gray-200 rounded px-3.5 py-2 text-xs focus:outline-none focus:border-[#25D366] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">Pesan</label>
                  <textarea 
                    rows={3}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Tuliskan pertanyaan atau kebutuhan properti Anda..." 
                    className="w-full border border-gray-200 rounded px-3.5 py-2 text-xs focus:outline-none focus:border-[#25D366] transition-all"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded text-xs uppercase font-extrabold tracking-widest transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.416 1.452 5.518 0 10.007-4.485 10.01-10.004.002-2.674-1.033-5.188-2.915-7.072C17.271 1.644 14.764.609 12.01.608 6.491.608 2.003 5.093 2.001 10.613c-.001 1.93.498 3.81 1.444 5.416L2.392 20.3l4.255-1.146zm11.396-8.21c-.32-.16-1.89-.933-2.185-1.042-.295-.11-.51-.16-.724.162-.215.32-.83.162-1.015 1.23-.185.215-.37.245-.69.085-.32-.16-1.348-.497-2.566-1.585-.948-.846-1.587-1.89-1.773-2.21-.185-.32-.02-.493.14-.652.145-.143.32-.37.48-.556.16-.186.214-.32.32-.534.11-.214.054-.4-.027-.56-.08-.16-.724-1.744-.993-2.39-.263-.632-.53-.547-.724-.556-.186-.01-.4-.01-.615-.01-.215 0-.565.08-.86.4-.295.32-1.13 1.104-1.13 2.693 0 1.59 1.157 3.12 1.317 3.33.162.215 2.277 3.478 5.517 4.88.77.333 1.37.532 1.838.68.773.245 1.478.21 2.034.127.62-.093 1.89-.773 2.156-1.48.265-.705.265-1.31.186-1.432-.08-.122-.295-.215-.615-.375z"/>
                  </svg>
                  <span>KIRIM VIA WHATSAPP</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* COMPREHENSIVE PROPERTY DETAIL MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-[#0f1c2e]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden relative border border-gray-100 my-4">
            
            {/* Elegant Header with Title & Explicit Close (X) Button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#965F0E] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">
                    {selectedProperty.category}
                  </span>
                  <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold block">{selectedProperty.location}</span>
                </div>
                <h3 className="font-headline-xl text-base md:text-lg font-extrabold text-black leading-tight uppercase">
                  {selectedProperty.title}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setSelectedProperty(null);
                  setActiveDetailPhoto(null);
                  setInquirySubmitted(false);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-all cursor-pointer flex items-center justify-center border-none"
                title="Tutup Halaman"
                id="close-modal-btn"
              >
                <X className="w-5 h-5 font-bold" />
              </button>
            </div>
            
            <div className="p-5 md:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Photo Area (Tetapkan foto di atas property information) */}
              <div className="space-y-3">
                <div className="h-[240px] md:h-[320px] rounded-lg overflow-hidden relative shadow-inner">
                  <img 
                    src={activeDetailPhoto || selectedProperty.image} 
                    alt={selectedProperty.title} 
                    onError={(e) => handleImgError(e, FALLBACK_FOREST)}
                    className="w-full h-full object-cover select-none" 
                  />
                  <div className="absolute top-4 left-4 bg-[#965F0E] text-white font-extrabold px-3 py-1.5 rounded text-xs tracking-wider shadow-sm">
                    {selectedProperty.price}
                  </div>
                </div>

                {/* Photo Unit Gallery */}
                {selectedProperty.images && selectedProperty.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProperty.images.map((imgUrl, idx) => {
                      const isActive = (activeDetailPhoto === imgUrl) || (!activeDetailPhoto && imgUrl === selectedProperty.image);
                      return (
                        <button 
                          key={idx}
                          onClick={() => setActiveDetailPhoto(imgUrl)}
                          className={`h-12 sm:h-14 rounded overflow-hidden relative cursor-pointer border transition-all ${
                            isActive ? 'border-2 border-[#965F0E] scale-95 shadow-sm' : 'border-gray-100 hover:opacity-85'
                          }`}
                          title={`View photo ${idx + 1}`}
                        >
                          <img 
                            src={imgUrl} 
                            alt={`Gallery visual ${idx}`} 
                            onError={(e) => handleImgError(e, FALLBACK_FOREST)}
                            className="w-full h-full object-cover select-none" 
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Property Information Specs list Grid */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-extrabold text-[10px] uppercase text-[#965F0E] tracking-widest mb-3">Informasi Properti</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-2.5 rounded border border-gray-100 flex items-center gap-2.5">
                    <Bed className="w-5 h-5 text-[#965F0E] shrink-0" />
                    <div>
                      <div className="text-[9px] text-gray-400 uppercase font-bold leading-none">Kamar Tidur</div>
                      <div className="text-xs font-extrabold text-black mt-0.5">{selectedProperty.bedrooms} Kamar</div>
                    </div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-gray-100 flex items-center gap-2.5">
                    <Bath className="w-5 h-5 text-[#965F0E] shrink-0" />
                    <div>
                      <div className="text-[9px] text-gray-400 uppercase font-bold leading-none">Kamar Mandi</div>
                      <div className="text-xs font-extrabold text-black mt-0.5">{selectedProperty.bathrooms} Kamar</div>
                    </div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-gray-100 flex items-center gap-2.5">
                    <Layers className="w-5 h-5 text-[#965F0E] shrink-0" />
                    <div>
                      <div className="text-[9px] text-gray-400 uppercase font-bold leading-none">Jumlah Lantai</div>
                      <div className="text-xs font-extrabold text-black mt-0.5">{selectedProperty.floors} Lantai</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-[10px] uppercase text-[#965F0E] tracking-widest">Deskripsi Unit</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Cluster Features & Types Breakdown if available */}
              {selectedProperty.features && selectedProperty.features.length > 0 && (
                <div className="bg-amber-50/60 p-4 rounded-lg border border-amber-200/60 space-y-2">
                  <h4 className="font-extrabold text-[10px] uppercase text-[#965F0E] tracking-widest">Pilihan Tipe & Keunggulan</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProperty.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#965F0E] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Direct WhatsApp Action Shortcut */}
              <div className="pt-2">
                <button 
                  onClick={() => {
                    const text = encodeURIComponent(`Halo Kak Na², saya tertarik dengan properti "${selectedProperty.title}" (${selectedProperty.price}) di ${selectedProperty.location}. Mohon informasi lebih lanjut.`);
                    window.open(`https://wa.me/6281280055490?text=${text}`, '_blank');
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2.5 text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer shadow-md hover:scale-[1.01] duration-150 border-none"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.416 1.452 5.518 0 10.007-4.485 10.01-10.004.002-2.674-1.033-5.188-2.915-7.072C17.271 1.644 14.764.609 12.01.608 6.491.608 2.003 5.093 2.001 10.613c-.001 1.93.498 3.81 1.444 5.416L2.392 20.3l4.255-1.146zm11.396-8.21c-.32-.16-1.89-.933-2.185-1.042-.295-.11-.51-.16-.724.162-.215.32-.83.162-1.015 1.23-.185.215-.37.245-.69.085-.32-.16-1.348-.497-2.566-1.585-.948-.846-1.587-1.89-1.773-2.21-.185-.32-.02-.493.14-.652.145-.143.32-.37.48-.556.16-.186.214-.32.32-.534.11-.214.054-.4-.027-.56-.08-.16-.724-1.744-.993-2.39-.263-.632-.53-.547-.724-.556-.186-.01-.4-.01-.615-.01-.215 0-.565.08-.86.4-.295.32-1.13 1.104-1.13 2.693 0 1.59 1.157 3.12 1.317 3.33.162.215 2.277 3.478 5.517 4.88.77.333 1.37.532 1.838.68.773.245 1.478.21 2.034.127.62-.093 1.89-.773 2.156-1.48.265-.705.265-1.31.186-1.432-.08-.122-.295-.215-.615-.375z"/>
                  </svg>
                  <span>Tanya Na²</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON WITH POPUP MESSAGE */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 group">
        {/* Chat Bubble Prompt */}
        <div className="bg-white text-gray-800 px-4 py-2.5 rounded-xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-2 max-w-[260px] relative">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping shrink-0"></div>
          <div>
            <p className="text-[11px] font-extrabold text-black uppercase tracking-tight leading-tight">Halo! Mau info Shila Sawangan?</p>
            <p className="text-[10px] text-gray-500">Yuk ngobrol dengan Kak Na² ✨</p>
          </div>
          {/* Arrow pointing right */}
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-gray-100 rotate-45"></div>
        </div>

        {/* WhatsApp Floating Button */}
        <button
          onClick={() => {
            const text = encodeURIComponent("Halo Kak Na², saya tertarik ingin mendapatkan informasi lengkap dan penawaran terbaik mengenai properti di SHILA SAWANGAN. Mohon bantuannya.");
            window.open(`https://wa.me/6281280055490?text=${text}`, '_blank');
          }}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-200 cursor-pointer relative group-hover:rotate-6"
          aria-label="Chat WhatsApp Kak Na2"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.416 1.452 5.518 0 10.007-4.485 10.01-10.004.002-2.674-1.033-5.188-2.915-7.072C17.271 1.644 14.764.609 12.01.608 6.491.608 2.003 5.093 2.001 10.613c-.001 1.93.498 3.81 1.444 5.416L2.392 20.3l4.255-1.146zm11.396-8.21c-.32-.16-1.89-.933-2.185-1.042-.295-.11-.51-.16-.724.162-.215.32-.83.162-1.015 1.23-.185.215-.37.245-.69.085-.32-.16-1.348-.497-2.566-1.585-.948-.846-1.587-1.89-1.773-2.21-.185-.32-.02-.493.14-.652.145-.143.32-.37.48-.556.16-.186.214-.32.32-.534.11-.214.054-.4-.027-.56-.08-.16-.724-1.744-.993-2.39-.263-.632-.53-.547-.724-.556-.186-.01-.4-.01-.615-.01-.215 0-.565.08-.86.4-.295.32-1.13 1.104-1.13 2.693 0 1.59 1.157 3.12 1.317 3.33.162.215 2.277 3.478 5.517 4.88.77.333 1.37.532 1.838.68.773.245 1.478.21 2.034.127.62-.093 1.89-.773 2.156-1.48.265-.705.265-1.31.186-1.432-.08-.122-.295-.215-.615-.375z"/>
          </svg>
          {/* Online badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>
      </div>

    </div>
  );
}
