export type PropertyCategory = 'THE FOREST' | 'SOUTH BANK' | 'LAKE VISTA';

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  location: string;
  price: string;          // Contoh: 'Rp 6.800.000.000'
  priceNumeric: number;   // Angka murni untuk sorting (contoh: 6800000000)
  bedrooms: number;       // Jumlah Kamar Tidur (contoh: 4)
  bathrooms: number;      // Jumlah Kamar Mandi (contoh: 3)
  floors: number;         // Jumlah Lantai (contoh: 2)
  sqft?: number;          // Luas bangunan (opsional)
  yearBuilt?: number;     // Tahun dibangun (opsional)
  image: string;          // Foto utama / thumbnail (contoh: '/images/the-forest/main.jpg')
  images: string[];       // Kumpulan foto galeri unit
  description: string;    // Deskripsi lengkap unit properti
  badges?: string[];      // Label tambahan seperti 'Featured', 'Hot Deal', dll.

  // Compatibility fields
  beds?: number;
  baths?: number;
  type?: string;
  status?: string;
  isFeatured?: boolean;
  address?: string;
  city?: string;
  garage?: number;
  features?: string[];
  agent?: {
    name: string;
    title: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  beds: string;
  baths: string;
}
