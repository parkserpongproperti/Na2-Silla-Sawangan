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
 * PANDUAN PENAMAAN FOTO DI PUBLIC (1.jpg, 2.jpg, dst):
 * - THE FOREST : public/images/the-forest/ (1.jpg = Foto Utama, 2.jpg, 3.jpg, dst)
 * - SOUTH BANK : public/images/south-bank/ (1.jpg = Foto Utama, 2.jpg, 3.jpg, dst)
 * - LAKE VISTA : public/images/lake-vista/ (1.jpg = Foto Utama, 2.jpg, 3.jpg, dst)
 * =======================================================================
 */

export const PROPERTIES: Property[] = [
  // ---------------------------------------------------------------------
  // 1. KATEGORI: THE FOREST
  // ---------------------------------------------------------------------
  {
    id: 'forest-1',
    title: 'The Forest SHILA SAWANGAN',
    category: 'THE FOREST',
    location: 'Cluster The Forest, SHILA SAWANGAN, Depok',
    price: 'Mulai Rp 2.995.000.000',
    priceNumeric: 2995000000,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    sqft: 149,
    yearBuilt: 2024,
    // Foto Utama (1.jpg)
    image: '/images/the-forest/1.jpg',
    // Galeri Lengkap The Forest (1.jpg sampai 8.jpg)
    images: [
      '/images/the-forest/1.jpg', // 1.jpg: Foto Utama Fasad
      '/images/the-forest/2.jpg', // 2.jpg: Gerbang Masuk
      '/images/the-forest/3.jpg', // 3.jpg: Fasilitas Creek & Boardwalk
      '/images/the-forest/4.jpg', // 4.jpg: Tipe PV (149m²)
      '/images/the-forest/5.jpg', // 5.jpg: Tipe PC (184m²)

    ],
   
    description: 'The Forest SHILA SAWANGAN mengusung konsep hunian "The Gateway to Your Creation" dan "Creek Side Living". Menghadirkan 3 tipe unit prestisius (PV Type 149m², PC Type 184m², LM Type 222m²), kawasan asri dengan aliran sungai alami, private boardwalk, serta fasilitas rekreasi dan olahraga eksklusif.',
    badges: ['Featured', 'The Forest', 'Creek Side Living', '3 Unit Types']
  },

  // ---------------------------------------------------------------------
  // 2. KATEGORI: SOUTH BANK
  // ---------------------------------------------------------------------
  {
    id: 'southbank-1',
    title: 'South Bank Premium Residence',
    category: 'SOUTH BANK',
    location: 'Cluster South Bank, SHILA SAWANGAN, Depok',
    price: 'Rp 2.990.000.000',
    priceNumeric: 2990000000,
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
  // 3. KATEGORI: LAKE VISTA (TUDOR, PORTICO, PAVILION)
  // ---------------------------------------------------------------------
  {
    id: 'lakevista-tudor',
    title: 'Lake Vista Tudor Type',
    category: 'LAKE VISTA',
    location: 'Cluster Lake Vista, SHILA SAWANGAN, Depok',
    price: 'Mulai Rp 2.642.000.000',
    priceNumeric: 2642000000,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    sqft: 165,
    yearBuilt: 2024,
    image: '/images/lake-vista/tudor/1.jpg',
    images: [
      '/images/lake-vista/tudor/1.jpg',
      '/images/lake-vista/1.jpg',
      '/images/lake-vista/2.jpg'
    ],
    features: [
      'Tudor Type (LB 165m² - 4 KT, 3 KM, 2 Carport)',
      'Classic Tudor Architectural Accents & Gable Rooflines',
      'Direct Access to Lake Vista Promenade & Jogging Track',
      'Smart Home System & Private Garden'
    ],
    description: 'Lake Vista Tudor mengusung arsitektur klasik modern bergaya Inggris dengan sentuhan elegan di tepi danau. Menawarkan kenyamanan ruang keluarga terbuka dan pemandangan hijau yang menenangkan.',
    badges: ['Lake Vista', 'Tudor Type', 'Waterfront']
  },
  {
    id: 'lakevista-portico',
    title: 'Lake Vista Portico Type',
    category: 'LAKE VISTA',
    location: 'Cluster Lake Vista, SHILA SAWANGAN, Depok',
    price: 'Mulai Rp 4.200.000.000',
    priceNumeric: 4200000000,
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    sqft: 198,
    yearBuilt: 2024,
    image: '/images/lake-vista/portico/1.jpg',
    images: [
      '/images/lake-vista/portico/1.jpg',
      '/images/lake-vista/2.jpg',
      '/images/lake-vista/3.jpg'
    ],
    features: [
      'Portico Type (LB 198m² - 4 KT, 4 KM, 2 Carport)',
      'Grand Entrance Portico & High Ceiling Living Room',
      'Private Balcony Overlooking Lake Vista Waterbody',
      'Premium Marble Flooring & Sanitary Fixtures'
    ],
    description: 'Lake Vista Portico menghadirkan fasad megah dengan pilar-pilar elegan dan teras luas. Dirancang khusus bagi Anda yang mendambakan kemewahan hunian tepi danau dengan sirkulasi udara optimal.',
    badges: ['Lake Vista', 'Portico Type', 'Luxury Choice']
  },
  {
    id: 'lakevista-pavilion',
    title: 'Lake Vista Pavilion Type',
    category: 'LAKE VISTA',
    location: 'Cluster Lake Vista, SHILA SAWANGAN, Depok',
    price: 'Mulai Rp 2.357.000.000',
    priceNumeric: 2357000000,
    bedrooms: 4,
    bathrooms: 3,
    floors: 3,
    sqft: 250,
    yearBuilt: 2024,
    image: '/images/lake-vista/pavilion/1.jpg',
    images: [
      '/images/lake-vista/pavilion/1.jpg',
      '/images/lake-vista/3.jpg',
      '/images/lake-vista/4.jpg'
    ],
    
    description: 'Lake Vista Pavilion adalah tipe hunian tertinggi dan paling prestisius di cluster Lake Vista. Menawarkan 3 lantai kemewahan dengan rooftop deck pribadi untuk menikmati panorama danau secara langsung.',
    badges: ['Lake Vista', 'Pavilion Type', 'Signature Collection']
  }
];
