export interface Wisata {
  id_wisata: number;
  nama_wisata: string;
  alamat_wisata: string;
  url_lokasi: string;
  peta_area: string;
  nomor_telepon: string;
  jam_buka: string;
  harga_tiket_dewasa: string;
  harga_tiket_anak: string;
  id_kategori_wisata: number; // 1: Pegunungan, 2: Air, 3: Religi
  kategori_wisata?: string;
  video_youtube: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  deskripsi_wisata: string;
  foto_wisata: string;
  galeri?: string[];
}

export interface Restoran {
  id_restoran: number;
  nama_restoran: string;
  alamat_restoran: string;
  url_lokasi: string;
  peta_area: string;
  nomor_telepon: string;
  jam_buka: string;
  video_youtube: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  deskripsi_restoran: string;
  foto_restoran: string;
  menu_favorit?: string;
}

export interface Penginapan {
  id_penginapan: number;
  nama_penginapan: string;
  alamat_penginapan: string;
  url_lokasi: string;
  peta_area: string;
  nomor_telepon: string;
  jam_buka: string;
  harga_mulai?: string;
  fasilitas?: string;
  video_youtube: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  deskripsi_penginapan: string;
  foto_penginapan: string;
}

export interface Subscriber {
  id_subscriber: number;
  email: string;
  nama: string;
  status: 'Mengikuti' | 'Berhenti';
  status_pesan: 'Belum terbaca' | 'Terbaca';
  tanggal_bergabung: string;
}

export interface GaleriItem {
  id: number;
  tipe: 'wisata' | 'restoran' | 'penginapan';
  id_kategori?: number; // 1: Pegunungan, 2: Air, 3: Religi
  judul: string;
  foto: string;
}
