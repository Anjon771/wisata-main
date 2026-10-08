import React, { useState } from 'react';
import {
  Search,
  Mountain,
  Waves,
  Landmark,
  UtensilsCrossed,
  BedDouble,
  MapPin,
  Clock,
  Phone,
  ExternalLink,
  ArrowRight,
  Send,
  CheckCircle2,
  Compass,
  Sparkles,
  Calendar,
  Share2,
  Calculator,
  Download,
  BookOpen,
  X
} from 'lucide-react';
import { Wisata, Restoran, Penginapan } from '../types';
import { ItinerarySection } from './ItinerarySection';
import { BudgetCalculatorSection } from './BudgetCalculatorSection';
import { SeasonalWeatherGuide } from './SeasonalWeatherGuide';
import { PhotoMomentsGallery } from './PhotoMomentsGallery';
import { TestimonialSection } from './TestimonialSection';
import { FaqSection } from './FaqSection';

interface LandingPageViewProps {
  wisataList: Wisata[];
  restoranList: Restoran[];
  penginapanList: Penginapan[];
  onSubscribe: (email: string, nama: string) => Promise<boolean>;
  onOpenAdmin: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  wisataList,
  restoranList,
  penginapanList,
  onSubscribe,
  onOpenAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pegunungan' | 'air' | 'religi'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    category: string;
    address: string;
    phone?: string;
    hours?: string;
    price?: string;
    desc: string;
    image: string;
    mapsUrl?: string;
    extra?: string;
  } | null>(null);

  // Digital Guide Modal
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Newsletter state
  const [subEmail, setSubEmail] = useState('');
  const [subName, setSubName] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const handleSubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;
    setSubLoading(true);
    try {
      const ok = await onSubscribe(subEmail, subName);
      if (ok) {
        setSubSuccess(true);
        setSubEmail('');
        setSubName('');
      }
    } finally {
      setSubLoading(false);
    }
  };

  // Filter Wisata
  const filteredWisata = wisataList
    .filter(w => {
      if (activeTab === 'pegunungan') return w.id_kategori_wisata === 1;
      if (activeTab === 'air') return w.id_kategori_wisata === 2;
      if (activeTab === 'religi') return w.id_kategori_wisata === 3;
      return true;
    })
    .filter(w =>
      w.nama_wisata.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.alamat_wisata.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.deskripsi_wisata.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleFindPlaceByName = (name: string) => {
    const foundW = wisataList.find(w => w.nama_wisata.toLowerCase().includes(name.toLowerCase()));
    if (foundW) {
      setSelectedItem({
        title: foundW.nama_wisata,
        category: foundW.kategori_wisata || 'Wisata',
        address: foundW.alamat_wisata,
        phone: foundW.nomor_telepon,
        hours: foundW.jam_buka,
        price: foundW.harga_tiket_dewasa,
        desc: foundW.deskripsi_wisata,
        image: foundW.foto_wisata,
        mapsUrl: foundW.url_lokasi
      });
      return;
    }
    const foundR = restoranList.find(r => r.nama_restoran.toLowerCase().includes(name.toLowerCase()));
    if (foundR) {
      setSelectedItem({
        title: foundR.nama_restoran,
        category: 'Kuliner & Restoran',
        address: foundR.alamat_restoran,
        phone: foundR.nomor_telepon,
        hours: foundR.jam_buka,
        price: foundR.menu_favorit,
        desc: foundR.deskripsi_restoran,
        image: foundR.foto_restoran,
        mapsUrl: foundR.url_lokasi
      });
      return;
    }
    const foundP = penginapanList.find(p => p.nama_penginapan.toLowerCase().includes(name.toLowerCase()));
    if (foundP) {
      setSelectedItem({
        title: foundP.nama_penginapan,
        category: 'Akomodasi Penginapan',
        address: foundP.alamat_penginapan,
        phone: foundP.nomor_telepon,
        hours: foundP.jam_buka,
        price: foundP.harga_mulai,
        desc: foundP.deskripsi_penginapan,
        image: foundP.foto_penginapan,
        mapsUrl: foundP.url_lokasi
      });
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION (16:9 dominant visual focal point with measured contrast scrim) */}
      <section className="relative rounded-3xl overflow-hidden bg-stone-950 text-white min-h-[540px] sm:min-h-[600px] flex items-center justify-center p-8 sm:p-16 border border-stone-800 shadow-2xl">
        <img
          src="/src/assets/images/dolano_hero_highlands_1791445064718.jpg"
          alt="Bentang Alam Kaldera Dolano"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/20" />

        <div className="relative z-10 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-xs font-semibold text-amber-300">
            <Compass className="w-3.5 h-3.5" />
            <span>PORTAL PARIWISATA & PETUALANGAN DOLANO</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Jelajahi Kemegahan Nirwana Jawa Timur Bersama Dolano
          </h1>

          <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Panduan resmi dan terkurasi menyusuri kaldera purba berkabut, segarnya air terjun alami, peninggalan candi sakral, kuliner legendaris, dan penginapan alam nan tenang.
          </p>

          {/* Action Points */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#destinasi"
              className="px-6 py-3 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-md flex items-center gap-2"
            >
              <span>Mulai Jelajah Destinasi</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#itinerary"
              className="px-6 py-3 rounded-xl bg-stone-900/90 text-stone-100 font-semibold text-xs hover:bg-stone-800 transition-colors border border-stone-700 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Rencana Rute 1-3 Hari</span>
            </a>
            <a
              href="#kalkulator"
              className="px-6 py-3 rounded-xl bg-stone-900/90 text-stone-100 font-semibold text-xs hover:bg-stone-800 transition-colors border border-stone-700 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Kalkulator Liburan</span>
            </a>
          </div>

          {/* Quick Search Bar inside Hero */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-white/20 flex items-center">
              <Search className="w-4 h-4 ml-3 text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Cari gunung, air terjun, candi, resto, hotel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-4 py-2.5 bg-transparent text-stone-900 text-xs font-medium placeholder:text-stone-400 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mr-2 text-xs text-stone-400 hover:text-stone-700 font-medium"
                >
                  Bersihkan
                </button>
              )}
            </div>
          </div>

          {/* Editorial Quick Trust Strip */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-stone-300 text-xs">
            <span className="font-mono tabular-nums font-semibold text-white">30+ Destinasi Pilihan</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-semibold text-white">42.000+ Wisatawan Terlayani</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-amber-300">100% Akses Terbuka</span>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID: 3 PILAR UTAMA DOLANO */}
      <section id="pengalaman" className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Pesona Unggulan
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Tiga Pilar Nirwana Dolano
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Kombinasi harmonis antara keajaiban alam vulkanik, ketenangan air terjun alami, dan kedalaman spiritual sejarah
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Pegunungan */}
          <div
            onClick={() => {
              setActiveTab('pegunungan');
              const el = document.getElementById('destinasi');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/90 min-h-[320px] flex flex-col justify-end p-6 cursor-pointer shadow-xs hover:border-stone-900 transition-colors"
          >
            <img
              src="/src/assets/images/dolano_hero_highlands_1791445064718.jpg"
              alt="Wisata Pegunungan"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            <div className="relative z-10 space-y-2 text-white">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest">
                01. Kaldera & Perbukitan
              </span>
              <h3 className="font-display text-2xl font-bold">
                Eksplorasi Dataran Tinggi
              </h3>
              <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                Puncak Bromo berpasir bisik, sunrise Penanjakan, dan negeri di atas awan B29 berketinggian 2.900 mdpl.
              </p>
              <div className="pt-2 text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Jelajahi Pegunungan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Wisata Air */}
          <div
            onClick={() => {
              setActiveTab('air');
              const el = document.getElementById('destinasi');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/90 min-h-[320px] flex flex-col justify-end p-6 cursor-pointer shadow-xs hover:border-stone-900 transition-colors"
          >
            <img
              src="/src/assets/images/wisata_waterfall_nature_1791445087445.jpg"
              alt="Wisata Air"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            <div className="relative z-10 space-y-2 text-white">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest">
                02. Gemericik Tirta
              </span>
              <h3 className="font-display text-2xl font-bold">
                Air Terjun & Pesisir Samudra
              </h3>
              <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                Curahan air terjun Coban Rondo 84 meter, labirin hijau rimbun, dan pantai karang Pura Ismoyo Balekambang.
              </p>
              <div className="pt-2 text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Jelajahi Wisata Air</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Religi & Sejarah */}
          <div
            onClick={() => {
              setActiveTab('religi');
              const el = document.getElementById('destinasi');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/90 min-h-[320px] flex flex-col justify-end p-6 cursor-pointer shadow-xs hover:border-stone-900 transition-colors"
          >
            <img
              src="/src/assets/images/wisata_temple_heritage_1791445102118.jpg"
              alt="Wisata Religi"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            <div className="relative z-10 space-y-2 text-white">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest">
                03. Nilai Luhur Budaya
              </span>
              <h3 className="font-display text-2xl font-bold">
                Situs Sakral & Arca Purba
              </h3>
              <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                Arsitektur kaligrafi 10 lantai Masjid Tiban Turen dan kemegahan batu andesit peninggalan Kerajaan Singhasari.
              </p>
              <div className="pt-2 text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Jelajahi Wisata Religi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIREKTORI LENGKAP KATALOG WISATA (Interactive Filter & Clean Cards) */}
      <section id="destinasi" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
              Daftar Objek Wisata
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Eksplorasi Destinasi Terkurasi
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Klik pada kartu destinasi untuk melihat panduan tarif, jam buka, kontak dan rute Google Maps
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl self-start sm:self-auto flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Semua ({wisataList.length})
            </button>
            <button
              onClick={() => setActiveTab('pegunungan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'pegunungan'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-stone-500" />
              <span>Pegunungan</span>
            </button>
            <button
              onClick={() => setActiveTab('air')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'air'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-stone-500" />
              <span>Wisata Air</span>
            </button>
            <button
              onClick={() => setActiveTab('religi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'religi'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-stone-500" />
              <span>Religi & Budaya</span>
            </button>
          </div>
        </div>

        {/* 4:3 Ratio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWisata.map((item) => (
            <article
              key={item.id_wisata}
              onClick={() => setSelectedItem({
                title: item.nama_wisata,
                category: item.kategori_wisata || 'Wisata',
                address: item.alamat_wisata,
                phone: item.nomor_telepon,
                hours: item.jam_buka,
                price: item.harga_tiket_dewasa,
                desc: item.deskripsi_wisata,
                image: item.foto_wisata,
                mapsUrl: item.url_lokasi
              })}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:border-stone-400 transition-colors flex flex-col cursor-pointer"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
                <img
                  src={item.foto_wisata}
                  alt={item.nama_wisata}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/dolano_hero_highlands_1791445064718.jpg';
                  }}
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                    <span>{item.kategori_wisata || 'Wisata'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="line-clamp-1">{item.alamat_wisata.split(',')[0]}</span>
                  </div>
                  <h3 className="font-display font-bold text-stone-900 text-base mt-1 group-hover:text-stone-950 line-clamp-1">
                    {item.nama_wisata}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {item.deskripsi_wisata}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Tiket Masuk</span>
                    <span className="font-mono font-bold text-stone-900 tabular-nums">
                      {item.harga_tiket_dewasa}
                    </span>
                  </div>
                  <span className="text-stone-800 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                    <span>Rincian</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. ITINERARY SECTION (Curated Multi-Day Plans) */}
      <ItinerarySection onSelectPlace={handleFindPlaceByName} />

      {/* 5. INTERACTIVE BUDGET CALCULATOR SECTION */}
      <BudgetCalculatorSection
        onExploreDestinations={() => {
          const el = document.getElementById('destinasi');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. KULINER DAERAH & WARISAN RASA */}
      <section id="kuliner" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
              Santap Khas Tradisional
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Pusat Kuliner & Restoran Pilihan
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Cita rasa rempah asli Jawa Timur di tempat santap legendaris dan kaya nuansa tempo doeloe
            </p>
          </div>
          <span className="text-xs text-stone-500 font-mono tabular-nums">
            {restoranList.length} Restoran Terdaftar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restoranList.map((resto) => (
            <div
              key={resto.id_restoran}
              onClick={() => setSelectedItem({
                title: resto.nama_restoran,
                category: 'Kuliner & Restoran',
                address: resto.alamat_restoran,
                phone: resto.nomor_telepon,
                hours: resto.jam_buka,
                price: resto.menu_favorit,
                desc: resto.deskripsi_restoran,
                image: resto.foto_restoran,
                mapsUrl: resto.url_lokasi
              })}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:border-stone-400 transition-colors flex flex-col cursor-pointer"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
                <img
                  src={resto.foto_restoran}
                  alt={resto.nama_restoran}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/restaurant_indonesian_culinary_1791445115848.jpg';
                  }}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span>Kuliner Otentik</span>
                    <span>·</span>
                    <span className="line-clamp-1">{resto.alamat_restoran.split(',')[0]}</span>
                  </div>
                  <h3 className="font-display font-bold text-stone-900 text-base mt-1 line-clamp-1">
                    {resto.nama_restoran}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {resto.deskripsi_restoran}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Menu Populer</span>
                    <span className="font-medium text-stone-900 line-clamp-1 max-w-[170px]">
                      {resto.menu_favorit}
                    </span>
                  </div>
                  <span className="text-stone-800 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                    <span>Rincian</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. AKOMODASI & PENGINAPAN BERKONSEP ALAM */}
      <section id="penginapan" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
              Bermalam Dekat Nirwana
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Pilihan Penginapan, Glamping & Hotel
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Istirahat berkualitas dengan panorama perbukitan berkabut, fasilitas lengkap dan keramahan lokal
            </p>
          </div>
          <span className="text-xs text-stone-500 font-mono tabular-nums">
            {penginapanList.length} Akomodasi Tersedia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {penginapanList.map((hotel) => (
            <div
              key={hotel.id_penginapan}
              onClick={() => setSelectedItem({
                title: hotel.nama_penginapan,
                category: 'Akomodasi Penginapan',
                address: hotel.alamat_penginapan,
                phone: hotel.nomor_telepon,
                hours: hotel.jam_buka,
                price: hotel.harga_mulai,
                desc: hotel.deskripsi_penginapan,
                image: hotel.foto_penginapan,
                mapsUrl: hotel.url_lokasi
              })}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:border-stone-400 transition-colors flex flex-col cursor-pointer"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
                <img
                  src={hotel.foto_penginapan}
                  alt={hotel.nama_penginapan}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/resort_villa_ecolodge_1791445128054.jpg';
                  }}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span>Resor & Villa</span>
                    <span>·</span>
                    <span className="line-clamp-1">{hotel.alamat_penginapan.split(',')[0]}</span>
                  </div>
                  <h3 className="font-display font-bold text-stone-900 text-base mt-1 line-clamp-1">
                    {hotel.nama_penginapan}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {hotel.deskripsi_penginapan}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Tarif Mulai</span>
                    <span className="font-mono font-bold text-stone-900 tabular-nums">
                      {hotel.harga_mulai}
                    </span>
                  </div>
                  <span className="text-stone-800 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                    <span>Rincian</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. PANDUAN MUSIM & CHECKLIST PERLENGKAPAN */}
      <SeasonalWeatherGuide />

      {/* 9. GALERI FOTO & SUDUT ESTETIKA */}
      <PhotoMomentsGallery onSelectDestination={handleFindPlaceByName} />

      {/* 10. SOCIAL PROOF & TESTIMONI PELANCONG */}
      <TestimonialSection />

      {/* 11. FAQ PERTANYAAN UMUM */}
      <FaqSection />

      {/* 12. LEAD CAPTURE & DIGITAL GUIDE DOWNLOAD */}
      <section id="buletin" className="rounded-3xl bg-stone-900 text-white p-8 sm:p-14 border border-stone-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-3 text-left">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block">
            Warta & Panduan Digital Dolano
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dapatkan Rencana Perjalanan & Warta Destinasi Terkini
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Daftarkan surel Anda untuk menerima rekomendasi tiket promo, rute tersembunyi, dan unduh panduan saku wisata Jawa Timur dalam format digital.
          </p>

          <div className="pt-1">
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Pratinjau Buku Panduan Saku Dolano (Edisi 2026)</span>
            </button>
          </div>
        </div>

        <div className="w-full lg:w-auto min-w-[320px] max-w-md">
          {subSuccess ? (
            <div className="bg-stone-800 border border-stone-700 p-5 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-xs text-stone-100">Pendaftaran Berhasil!</p>
                <p className="text-[11px] text-stone-300 mt-0.5">
                  Surel Anda telah tersimpan. Panduan awal telah disiapkan untuk Anda.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Nama Lengkap Anda"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Alamat surel Anda..."
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  disabled={subLoading}
                  className="px-5 py-2.5 bg-amber-400 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{subLoading ? '...' : 'Langganan'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 13. DIGITAL GUIDE PREVIEW MODAL */}
      {isGuideModalOpen && (
        <div
          onClick={() => setIsGuideModalOpen(false)}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <h3 className="font-display font-bold text-stone-900 text-base">
                  Panduan Saku Wisata Jawa Timur 2026
                </h3>
              </div>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
              <p>
                Buku panduan digital Dolano mencakup rangkuman ringkas:
              </p>
              <ul className="space-y-1.5 pl-4 list-disc text-stone-700">
                <li>Rute navigasi Jeep 4x4 Sukapura & Tumpang menuju kaldera Bromo</li>
                <li>Jadwal buka loket tiket resmi Coban Rondo dan Pantai Balekambang</li>
                <li>Daftar kuliner wajib: Rawon Brintik, Oen 1930, dan Pos Ketan Batu</li>
                <li>Daftar nomor telepon posko darurat dan pemandu lokal terverifikasi</li>
              </ul>
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                Tip: Simpan halaman website ini di bookmark ponsel Anda untuk akses peta dan tarif cepat saat berada di lokasi tanpa sinyal tinggi.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 14. DETAIL MODAL (Fully detailed item popup) */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="relative h-60 bg-stone-900">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/dolano_hero_highlands_1791445064718.jpg';
                }}
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                aria-label="Tutup jendela rincian"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-xs text-stone-500 font-medium">
                  {selectedItem.category}
                </div>
                <h3 className="font-display text-xl font-bold text-stone-900 mt-1">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{selectedItem.address}</span>
                </p>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                {selectedItem.desc}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {selectedItem.price && (
                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                    <span className="text-stone-400 text-[10px] uppercase font-semibold">Tarif Masuk / Menu</span>
                    <p className="font-mono font-bold text-stone-900 mt-0.5 tabular-nums">{selectedItem.price}</p>
                  </div>
                )}
                {selectedItem.hours && (
                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                    <span className="text-stone-400 text-[10px] uppercase font-semibold">Jam Layanan</span>
                    <p className="font-bold text-stone-900 mt-0.5">{selectedItem.hours}</p>
                  </div>
                )}
                {selectedItem.phone && (
                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-100 col-span-2">
                    <span className="text-stone-400 text-[10px] uppercase font-semibold">Kontak Layanan</span>
                    <p className="font-bold text-stone-900 mt-0.5">{selectedItem.phone}</p>
                  </div>
                )}
              </div>

              {selectedItem.mapsUrl && (
                <a
                  href={selectedItem.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Buka Petunjuk Arah di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
