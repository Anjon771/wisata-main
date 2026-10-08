# Dolano - Portal & Admin Wisata

Sistem Informasi dan Manajemen Wisata, Restoran, dan Penginapan Dolano (migrated to Node.js 22 + Express + Vite React SPA).

## Fitur Utama

- **Dashboard Admin Dolano**: Ringkasan data statistik destinasi wisata, restoran, penginapan, dan subscriber buletin.
- **Manajemen Wisata**:
  - Wisata Pegunungan (Bromo, B29, dll.)
  - Wisata Air (Coban Rondo, Pantai Balekambang, dll.)
  - Wisata Religi (Masjid Tiban, Candi Singosari, dll.)
  - Tambah, Edit, Hapus, dan Pratinjau Detail Destinasi.
- **Manajemen Restoran**: Pengelolaan nama kuliner, jam operasional, lokasi Google Maps, menu favorit, foto, dan kontak.
- **Manajemen Penginapan**: Pengelolaan hotel, resort, villa, tarif kamar per malam, fasilitas, dan detail pemesanan.
- **Galeri Foto Ekko Lightbox**: Galeri foto terpadu dengan filter kategori (Pegunungan, Air, Religi, Restoran, Penginapan) dan modal pembesar foto.
- **Subscriber & Broadcast Email**: Pengelolaan daftar email pelanggan dan pengiriman info newsletter.
- **Kompatibilitas API Asli**:
  - `GET /apis/views.php` & `GET /admin-dolano/apis/views.php`
  - `POST /apis/create.php`
  - `POST /apis/update.php`
  - `POST /apis/delete.php`
  - REST Endpoints: `/api/stats`, `/api/wisata`, `/api/restoran`, `/api/penginapan`, `/api/subscribers`
- **Portal Publik Pengunjung**: Antarmuka katalog wisata modern bagi wisatawan untuk mencari destinasi dan mendaftar buletin.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Server berjalan pada port `3000` (host `0.0.0.0`).

