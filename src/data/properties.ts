import { Property, PropertyCategory } from '../types';

// The Forest Images (1.jpg to 8.jpg)
import forest1 from '../assets/images/the-forest/1.jpg';
import forest2 from '../assets/images/the-forest/2.jpg';
import forest3 from '../assets/images/the-forest/3.jpg';
import forest4 from '../assets/images/the-forest/4.jpg';
import forest5 from '../assets/images/the-forest/5.jpg';
import forest6 from '../assets/images/the-forest/6.jpg';
import forest7 from '../assets/images/the-forest/7.jpg';
import forest8 from '../assets/images/the-forest/8.jpg';

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
 * PANDUAN PENAMAAN FOTO (SANGAT MUDAH DENGAN ANGKA):
 * - THE FOREST : Simpan di folder /the-forest/ (1.jpg = Foto Utama, 2.jpg, 3.jpg, dst)
 * - SOUTH BANK : Simpan di folder /south-bank/ (1.jpg = Foto Utama, 2.jpg, 3.jpg, dst)
 * - LAKE VISTA : Simpan di folder /lake-vista/ (1.jpg = Foto Utama, 2.jpg, 3.jpg, dst)
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
    // Foto Utama (1.jpg)
    image: forest1,
    // Galeri Lengkap The Forest (1.jpg sampai 8.jpg)
    images: [
      forest1, // 1.jpg: Foto Utama Fasad
      forest2, // 2.jpg: Gerbang Masuk
      forest3, // 3.jpg: Fasilitas Creek & Boardwalk
      forest4, // 4.jpg: Tipe PV (149m²)
      forest5, // 5.jpg: Tipe PC (184m²)
      forest6, // 6.jpg: Tipe LM (222m²)
      forest7, // 7.jpg: Denah / Siteplan
      forest8  // 8.jpg: Peta Akses Tol
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
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    sqft: 180,
    yearBuilt: 2024,
    // Foto Utama: '/images/south-bank/1.jpg' (dengan cadangan online)
    image: '/images/south-bank/1.jpg',
    // Galeri Foto South Bank (1.jpg, 2.jpg, 3.jpg, 4.jpg)
    images: [
      '/images/south-bank/1.jpg',
      '/images/south-bank/2.jpg',
      '/images/south-bank/3.jpg',
      '/images/south-bank/4.jpg'
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
    price: 'Rp 4.500.000.000',
    priceNumeric: 4500000000,
    bedrooms: 5,
    bathrooms: 4,
    floors: 2,
    sqft: 250,
    yearBuilt: 2024,
    // Foto Utama: '/images/lake-vista/1.jpg' (dengan cadangan online)
    image: '/images/lake-vista/1.jpg',
    // Galeri Foto Lake Vista (1.jpg, 2.jpg, 3.jpg, 4.jpg)
    images: [
      '/images/lake-vista/1.jpg',
      '/images/lake-vista/2.jpg',
      '/images/lake-vista/3.jpg',
      '/images/lake-vista/4.jpg'
    ],
    description: 'Mahakarya arsitektur mewah dengan pemandangan danau yang memukau di cluster Lake Vista. Dilengkapi infinity deck, master suite balkon privat menghadap danau, serta material marmer premium.',
    badges: ['Luxury Choice', 'Lake Vista']
  }
];
