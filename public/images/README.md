# PANDUAN STRUKTUR FOTO UNIT PROPERTI (GITHUB REPOSITORY)

Ketika Anda meneruskan project ini ke GitHub, Anda bisa langsung memasukkan file foto unit ke dalam folder `public/images/` sesuai kategori berikut:

```
public/
  images/
    the-forest/
      main.jpg         <-- Foto sampul utama The Forest
      galeri-1.jpg     <-- Foto kamar / interior
      galeri-2.jpg     <-- Foto ruang tamu / dapur
      galeri-3.jpg     <-- Foto halaman / toilet
      galeri-4.jpg     <-- Foto sudut lainnya

    south-bank/
      main.jpg         <-- Foto sampul utama South Bank
      galeri-1.jpg
      galeri-2.jpg
      galeri-3.jpg
      galeri-4.jpg

    lake-vista/
      main.jpg         <-- Foto sampul utama Lake Vista
      galeri-1.jpg
      galeri-2.jpg
      galeri-3.jpg
      galeri-4.jpg
```

---

## CARA MENGHUBUNGKAN DI KODE:
Buka file `src/data/properties.ts`. 

Ubah bagian `image` dan `images` menjadi:
```ts
image: '/images/the-forest/main.jpg',
images: [
  '/images/the-forest/main.jpg',
  '/images/the-forest/galeri-1.jpg',
  '/images/the-forest/galeri-2.jpg',
  '/images/the-forest/galeri-3.jpg'
]
```

## CARA MENGUBAH JUMLAH KAMAR, LANTAI & HARGA:
Di dalam `src/data/properties.ts`, Anda cukup mengubah angka-angka berikut:
```ts
bedrooms: 4,      // Jumlah kamar tidur
bathrooms: 3,     // Jumlah kamar mandi
floors: 2,        // Jumlah lantai
price: 'Rp 4.500.000.000', // Tampilan teks harga
priceNumeric: 4500000000   // Angka harga (tanpa titik)
```
Semua tampilan halaman web, kartu properti, dan popup detail unit akan langsung otomatis ter-update!
