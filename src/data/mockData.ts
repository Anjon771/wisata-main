import { Wisata, Restoran, Penginapan, Subscriber } from '../types';

export const initialWisata: Wisata[] = [
  {
    id_wisata: 1,
    nama_wisata: "Gunung Bromo & Kawah Pasir Berbisik",
    alamat_wisata: "Kawasan Taman Nasional Bromo Tengger Semeru",
    url_lokasi: "https://maps.google.com/?q=Gunung+Bromo",
    peta_area: "-7.942493,112.953012",
    nomor_telepon: "0812-3456-7890",
    jam_buka: "24 Jam",
    harga_tiket_dewasa: "Rp 35.000",
    harga_tiket_anak: "Rp 20.000",
    id_kategori_wisata: 1, // Pegunungan
    kategori_wisata: "Pegunungan",
    video_youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    facebook: "https://facebook.com/dolano.bromo",
    twitter: "https://twitter.com/dolano_bromo",
    instagram: "https://instagram.com/dolano.bromo",
    youtube: "https://youtube.com/c/DolanoBromo",
    deskripsi_wisata: "Keindahan panorama kaldera Bromo purba, pemandangan matahari terbit spektakuler dari Penanjakan, serta hamparan bisikan lautan pasir vulkanik di Jawa Timur.",
    foto_wisata: "/src/assets/images/dolano_hero_highlands_1791445064718.jpg",
    galeri: [
      "/src/assets/images/dolano_hero_highlands_1791445064718.jpg",
      "/src/assets/images/wisata_waterfall_nature_1791445087445.jpg"
    ]
  },
  {
    id_wisata: 2,
    nama_wisata: "Puncak B29 Negeri di Atas Awan",
    alamat_wisata: "Desa Argosari, Senduro, Lumajang",
    url_lokasi: "https://maps.google.com/?q=Puncak+B29",
    peta_area: "-7.982145,112.981240",
    nomor_telepon: "0813-9876-5432",
    jam_buka: "05:00 - 18:00 WIB",
    harga_tiket_dewasa: "Rp 15.000",
    harga_tiket_anak: "Rp 10.000",
    id_kategori_wisata: 1, // Pegunungan
    kategori_wisata: "Pegunungan",
    video_youtube: "",
    facebook: "https://facebook.com/b29dolano",
    twitter: "",
    instagram: "https://instagram.com/puncakb29",
    youtube: "",
    deskripsi_wisata: "Puncak berketinggian 2.900 mdpl yang menyuguhkan hamparan lautan awan putih serta panorama kaldera Bromo dan perkebunan terasering suku Tengger.",
    foto_wisata: "/src/assets/images/dolano_hero_highlands_1791445064718.jpg",
    galeri: [
      "/src/assets/images/dolano_hero_highlands_1791445064718.jpg"
    ]
  },
  {
    id_wisata: 3,
    nama_wisata: "Air Terjun Coban Rondo & Labirin Hijau",
    alamat_wisata: "Jl. Coban Rondo, Pandesari, Pujon, Malang",
    url_lokasi: "https://maps.google.com/?q=Coban+Rondo",
    peta_area: "-7.884511,112.477612",
    nomor_telepon: "0851-2345-6789",
    jam_buka: "08:00 - 17:00 WIB",
    harga_tiket_dewasa: "Rp 30.000",
    harga_tiket_anak: "Rp 20.000",
    id_kategori_wisata: 2, // Air
    kategori_wisata: "Air",
    video_youtube: "",
    facebook: "https://facebook.com/cobanrondo",
    twitter: "",
    instagram: "https://instagram.com/cobanrondo_official",
    youtube: "",
    deskripsi_wisata: "Curahan air terjun alami setinggi 84 meter berhawa sejuk pegunungan, dikelilingi hutan pinus rindang dan wahana petualangan taman labirin hijau.",
    foto_wisata: "/src/assets/images/wisata_waterfall_nature_1791445087445.jpg",
    galeri: [
      "/src/assets/images/wisata_waterfall_nature_1791445087445.jpg"
    ]
  },
  {
    id_wisata: 4,
    nama_wisata: "Pantai Balekambang (Tanah Lot Jawa)",
    alamat_wisata: "Dusun Sumber Jambe, Srigonco, Bantur, Malang",
    url_lokasi: "https://maps.google.com/?q=Pantai+Balekambang",
    peta_area: "-8.403487,112.539821",
    nomor_telepon: "0822-4567-8910",
    jam_buka: "24 Jam",
    harga_tiket_dewasa: "Rp 20.000",
    harga_tiket_anak: "Rp 15.000",
    id_kategori_wisata: 2, // Air
    kategori_wisata: "Air",
    video_youtube: "",
    facebook: "https://facebook.com/pantai.balekambang",
    twitter: "",
    instagram: "https://instagram.com/balekambangbeach",
    youtube: "",
    deskripsi_wisata: "Pantai Samudra Hindia dengan pulau karang di tengah laut yang terhubung jembatan panjang menuju Pura Ismoyo megah.",
    foto_wisata: "/src/assets/images/wisata_waterfall_nature_1791445087445.jpg",
    galeri: [
      "/src/assets/images/wisata_waterfall_nature_1791445087445.jpg"
    ]
  },
  {
    id_wisata: 5,
    nama_wisata: "Masjid Tiban Turen (Arsitektur 10 Lantai)",
    alamat_wisata: "Jl. KH. Wachid Hasyim Jl. Anggur No.10, Sananrejo, Turen",
    url_lokasi: "https://maps.google.com/?q=Masjid+Tiban+Turen",
    peta_area: "-8.167812,112.705432",
    nomor_telepon: "0812-7890-1234",
    jam_buka: "06:00 - 21:00 WIB",
    harga_tiket_dewasa: "Gratis (Infaq)",
    harga_tiket_anak: "Gratis",
    id_kategori_wisata: 3, // Religi
    kategori_wisata: "Religi",
    video_youtube: "",
    facebook: "https://facebook.com/masjidtibanturen",
    twitter: "",
    instagram: "https://instagram.com/masjidtiban_turen",
    youtube: "",
    deskripsi_wisata: "Arsitektur megah bergaya perpaduan Timur Tengah, ornamen keramik dan ukiran kaligrafi bertingkat 10 lantai dengan sentuhan seni Islam unik.",
    foto_wisata: "/src/assets/images/wisata_temple_heritage_1791445102118.jpg",
    galeri: [
      "/src/assets/images/wisata_temple_heritage_1791445102118.jpg"
    ]
  },
  {
    id_wisata: 6,
    nama_wisata: "Candi Singosari Bersejarah",
    alamat_wisata: "Jl. Kertanegara No.148, Candirenggo, Singosari",
    url_lokasi: "https://maps.google.com/?q=Candi+Singosari",
    peta_area: "-7.892433,112.664562",
    nomor_telepon: "0819-2345-6712",
    jam_buka: "07:00 - 17:00 WIB",
    harga_tiket_dewasa: "Rp 10.000",
    harga_tiket_anak: "Rp 5.000",
    id_kategori_wisata: 3, // Religi
    kategori_wisata: "Religi",
    video_youtube: "",
    facebook: "",
    twitter: "",
    instagram: "https://instagram.com/candi_singosari",
    youtube: "",
    deskripsi_wisata: "Candi peninggalan wangsa Kerajaan Singhasari abad ke-13 yang sakral dengan arsitektur batu andesit berrelief arca Dwarapala purba.",
    foto_wisata: "/src/assets/images/wisata_temple_heritage_1791445102118.jpg",
    galeri: [
      "/src/assets/images/wisata_temple_heritage_1791445102118.jpg"
    ]
  }
];

export const initialRestoran: Restoran[] = [
  {
    id_restoran: 1,
    nama_restoran: "Resto Tradisional Inggil & Heritage Museum",
    alamat_restoran: "Jl. Gajah Mada No.4, Kiduldalem, Klojen, Malang",
    url_lokasi: "https://maps.google.com/?q=Inggil+Resto+Malang",
    peta_area: "-7.978912,112.631245",
    nomor_telepon: "0341-332110",
    jam_buka: "10:00 - 22:00 WIB",
    video_youtube: "",
    facebook: "https://facebook.com/inggilresto",
    twitter: "",
    instagram: "https://instagram.com/inggilresto",
    youtube: "",
    deskripsi_restoran: "Menyajikan hidangan otentik Jawa Timur di tengah galeri museum artefak tempo doeloe, wayang kulit, dan alunan gamelan tradisional.",
    foto_restoran: "/src/assets/images/restaurant_indonesian_culinary_1791445115848.jpg",
    menu_favorit: "Nasi Jagung Komplit, Rawon Buntut, Es Cao Blewah"
  },
  {
    id_restoran: 2,
    nama_restoran: "Waroeng Dau Garden & Kopi Lembah",
    alamat_restoran: "Jl. Raya Sumbersekar No.88, Dau, Malang",
    url_lokasi: "https://maps.google.com/?q=Waroeng+Dau+Malang",
    peta_area: "-7.923411,112.562145",
    nomor_telepon: "0812-4455-6677",
    jam_buka: "09:00 - 21:00 WIB",
    video_youtube: "",
    facebook: "https://facebook.com/waroengdau",
    twitter: "",
    instagram: "https://instagram.com/waroengdau",
    youtube: "",
    deskripsi_restoran: "Suasana santap santai dikelilingi taman hijau berhawa sejuk dengan menu andalan gurame bakar bumbu madu dan racikan kopi tubruk lokal.",
    foto_restoran: "/src/assets/images/restaurant_indonesian_culinary_1791445115848.jpg",
    menu_favorit: "Gurame Bakar Sambal Kecap, Ayam Lodho, Wedang Uwuh"
  },
  {
    id_restoran: 3,
    nama_restoran: "Depot Bakso Bakar & Spesial Campur Dolano",
    alamat_restoran: "Jl. Pahlawan Trip No.12, Oro-oro Dowo, Malang",
    url_lokasi: "https://maps.google.com/?q=Bakso+Dolano",
    peta_area: "-7.965412,112.624512",
    nomor_telepon: "0341-556677",
    jam_buka: "09:00 - 21:30 WIB",
    video_youtube: "",
    facebook: "",
    twitter: "",
    instagram: "https://instagram.com/baksodolano",
    youtube: "",
    deskripsi_restoran: "Bakso khas Malang legendaris dengan racikan saus karamel panggang pedas gurih, pangsit renyah, dan kaldu sumsum sapi asli.",
    foto_restoran: "/src/assets/images/restaurant_indonesian_culinary_1791445115848.jpg",
    menu_favorit: "Bakso Bakar Pedas Manis, Bakso Urat Kuah Rawon, Siomay Kukus"
  }
];

export const initialPenginapan: Penginapan[] = [
  {
    id_penginapan: 1,
    nama_penginapan: "Shanaya Resort & Lembah Hills Dolano",
    alamat_penginapan: "Jl. Griya Permata Asri, Ngijo, Karangploso, Malang",
    url_lokasi: "https://maps.google.com/?q=Shanaya+Resort",
    peta_area: "-7.901234,112.592341",
    nomor_telepon: "0341-465758",
    jam_buka: "Check-in 14:00 · Check-out 12:00",
    harga_mulai: "Rp 650.000 / malam",
    fasilitas: "Infinity Pool, WiFi 100Mbps, Resto Glamping, Taman Bermain, Area Api Unggun",
    video_youtube: "",
    facebook: "https://facebook.com/shanayaresort",
    twitter: "",
    instagram: "https://instagram.com/shanayaresortmalang",
    youtube: "",
    deskripsi_penginapan: "Resort berkonsep glamping mewah dan villa kayu etnik dengan pemandangan terbuka langsung menghadap lembah hijau dan gemericik sungai.",
    foto_penginapan: "/src/assets/images/resort_villa_ecolodge_1791445128054.jpg"
  },
  {
    id_penginapan: 2,
    nama_penginapan: "Hotel Heritage Dolano Tugu",
    alamat_penginapan: "Jl. Tugu No.3, Kauman, Klojen, Malang",
    url_lokasi: "https://maps.google.com/?q=Hotel+Tugu+Malang",
    peta_area: "-7.978120,112.633412",
    nomor_telepon: "0341-363891",
    jam_buka: "24 Jam Resepsionis",
    harga_mulai: "Rp 1.100.000 / malam",
    fasilitas: "Spa Tradisional, Kolam Renang Tropis, Restoran Bersejarah, Tur Budaya",
    video_youtube: "",
    facebook: "https://facebook.com/hoteltugumalang",
    twitter: "",
    instagram: "https://instagram.com/hoteltugumalang",
    youtube: "",
    deskripsi_penginapan: "Hotel butik mewah penuh koleksi karya seni nusantara dan layanan kelas dunia di pusat kebudayaan kota.",
    foto_penginapan: "/src/assets/images/resort_villa_ecolodge_1791445128054.jpg"
  },
  {
    id_penginapan: 3,
    nama_penginapan: "Omah Kayu Eco-Lodge Batu Dolano",
    alamat_penginapan: "Gunung Banyak, Songgokerto, Batu",
    url_lokasi: "https://maps.google.com/?q=Omah+Kayu+Batu",
    peta_area: "-7.868912,112.498712",
    nomor_telepon: "0811-2334-5566",
    jam_buka: "Check-in 14:00 · Check-out 11:30",
    harga_mulai: "Rp 400.000 / malam",
    fasilitas: "Balkon View Lembah, Area Api Unggun, Akses Paralayang, Sarapan Lokal",
    video_youtube: "",
    facebook: "",
    twitter: "",
    instagram: "https://instagram.com/omahkayubatu",
    youtube: "",
    deskripsi_penginapan: "Penginapan rumah pohon kayu alami dengan sudut pandang eksotis menghadap gemerlap lampu kota dan hutan pinus pegunungan.",
    foto_penginapan: "/src/assets/images/resort_villa_ecolodge_1791445128054.jpg"
  }
];

export const initialSubscribers: Subscriber[] = [
  {
    id_subscriber: 1,
    email: "budi.santoso@gmail.com",
    nama: "Budi Santoso",
    status: "Mengikuti",
    status_pesan: "Belum terbaca",
    tanggal_bergabung: "2025-01-15"
  },
  {
    id_subscriber: 2,
    email: "siti.rahmawati@yahoo.co.id",
    nama: "Siti Rahmawati",
    status: "Mengikuti",
    status_pesan: "Belum terbaca",
    tanggal_bergabung: "2025-02-01"
  },
  {
    id_subscriber: 3,
    email: "agus.pratama@outlook.com",
    nama: "Agus Pratama",
    status: "Mengikuti",
    status_pesan: "Terbaca",
    tanggal_bergabung: "2025-02-18"
  },
  {
    id_subscriber: 4,
    email: "dewi.lestari@gmail.com",
    nama: "Dewi Lestari",
    status: "Mengikuti",
    status_pesan: "Terbaca",
    tanggal_bergabung: "2025-03-05"
  }
];
