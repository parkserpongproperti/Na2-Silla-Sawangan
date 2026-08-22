import { Property, PropertyCategory } from '../types';

/**
 * DAFTAR KATEGORI UTAMA PROPERTI
 */
export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  'THE FOREST',
  'SOUTH BANK',
  'LAKE VISTA'
];

/**
 * =======================================================================
 * DATA SEMUA PROPERTI / UNIT SILLA SAWANGAN
 * =======================================================================
 * 
 * PANDUAN PENGISIAN FOTO DI GITHUB & VERCEL:
 * Simpan file foto Anda di folder: /public/images/<nama-folder>/
 * - THE FOREST : /public/images/the-forest/main.jpg, gate.jpg, creek.jpg, dll.
 * - SOUTH BANK : /public/images/south-bank/main.jpg, dll.
 * - LAKE VISTA : /public/images/lake-vista/main.jpg, dll.
 * =======================================================================
 */

export const PROPERTIES: Property[] = [
  // ---------------------------------------------------------------------
  // 1. KATEGORI: THE FOREST
  // ---------------------------------------------------------------------
  {
    id: 'forest-1',
    title: 'The Forest Silla Sawangan',
    category: 'THE FOREST',
    location: 'Cluster The Forest, Silla Sawangan, Depok',
    price: 'Mulai Rp 2.800.000.000',
    priceNumeric: 2800000000,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    sqft: 149,
    yearBuilt: 2024,
    // Foto Utama (Tersedia di public/images/the-forest/main.jpg)
    image: '/images/the-forest/main.jpg',
    // Galeri Lengkap The Forest (Tersedia di folder public/images/the-forest/)
    images: [
      '/images/the-forest/main.jpg',
      '/images/the-forest/gate.jpg',
      '/images/the-forest/creek.jpg',
      '/images/the-forest/pv-type.jpg',
      '/images/the-forest/pc-type.jpg',
      '/images/the-forest/lm-type.jpg',
      '/images/the-forest/siteplan.jpg',
      '/images/the-forest/access-map.jpg'
    ],
    features: [
      'PV Type (LB 149m² - 4 KT, 3 KM, 2 Carport)',
      'PC Type (LB 184m² - 4 KT, 4 KM, 2 Carport)',
      'LM Type (LB 222m² - 4+1 KT, 4+1+1 KM, 2 Carport)',
      'The Gateway to Your Creation (Grand Iconic Gate)',
      'Creek Side Living, Kayaking & Sunken Deck Promenade',
      'Exclusive Facilities: Outdoor Gym, Basketball Court, Playground, Yoga Area, Edible Garden',
      'Lake Series: Picnic Lawn, Herbs Garden, Sunbathing Deck, Boat Dock & Seating Pavilion',
      'Akses Strategis: 25 Menit Serpong/Alam Sutera, 30 Menit Jakarta Selatan, 35 Menit Bandara Soekarno-Hatta'
    ],
    description: 'The Forest Silla Sawangan mengusung konsep hunian "The Gateway to Your Creation" dan "Creek Side Living". Menghadirkan 3 tipe unit prestisius (PV Type 149m², PC Type 184m², LM Type 222m²), kawasan asri dengan aliran sungai alami, private boardwalk, serta fasilitas rekreasi dan olahraga eksklusif.',
    badges: ['Featured', 'The Forest', 'Creek Side Living', '3 Unit Types']
  },

  // ---------------------------------------------------------------------
  // 2. KATEGORI: SOUTH BANK
  // ---------------------------------------------------------------------
  {
    id: 'southbank-1',
    title: 'South Bank Premium Residence',
    category: 'SOUTH BANK',
    location: 'Cluster South Bank, Silla Sawangan, Depok',
    price: 'Rp 3.500.000.000',
    priceNumeric: 3500000000,
    bedrooms: 3,     // <--- UBAH JUMLAH KAMAR TIDUR DI SINI
    bathrooms: 3,    // <--- UBAH JUMLAH KAMAR MANDI DI SINI
    floors: 2,       // <--- UBAH JUMLAH LANTAI DI SINI
    sqft: 3200,
    yearBuilt: 2024,
    // Foto Utama (Bisa ganti ke '/images/south-bank/main.jpg' setelah upload ke GitHub)
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    // Galeri Foto Unit
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Desain minimalis kontemporer di tepi area South Bank dengan layout open-space modern, pencahayaan alami maksimal, dan akses cepat menuju fasilitas clubhouse eksklusif.',
    badges: ['Popular', 'South Bank']
  },

  // ---------------------------------------------------------------------
  // 3. KATEGORI: LAKE VISTA
  // ---------------------------------------------------------------------
  {
    id: 'lakevista-1',
    title: 'Lake Vista Grand Waterfront',
    category: 'LAKE VISTA',
    location: 'Cluster Lake Vista, Silla Sawangan, Depok',
    price: 'Rp 12.500.000.000',
    priceNumeric: 12500000000,
    bedrooms: 6,     // <--- UBAH JUMLAH KAMAR TIDUR DI SINI
    bathrooms: 6,    // <--- UBAH JUMLAH KAMAR MANDI DI SINI
    floors: 3,       // <--- UBAH JUMLAH LANTAI DI SINI
    sqft: 8500,
    yearBuilt: 2024,
    // Foto Utama (Bisa ganti ke '/images/lake-vista/main.jpg' setelah upload ke GitHub)
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    // Galeri Foto Unit
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mahakarya arsitektur mewah dengan pemandangan danau yang memukau di cluster Lake Vista. Dilengkapi infinity deck, master suite balkon privat menghadap danau, serta material marmer premium.',
    badges: ['Luxury Choice', 'Lake Vista']
  }
];
