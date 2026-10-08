import React, { useState } from 'react';
import { Search, Mountain, Waves, Landmark, UtensilsCrossed, BedDouble, MapPin, ExternalLink, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Wisata, Restoran, Penginapan } from '../types';
import { getSafeImageUrl, handleImageFallback, localAssets } from '../utils/imageHelper';

interface VisitorPortalViewProps {
  wisataList: Wisata[];
  restoranList: Restoran[];
  penginapanList: Penginapan[];
  onSubscribe: (email: string, nama: string) => Promise<boolean>;
}

export const VisitorPortalView: React.FC<VisitorPortalViewProps> = ({
  wisataList,
  restoranList,
  penginapanList,
  onSubscribe,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pegunungan' | 'air' | 'religi' | 'resto' | 'penginapan'>('all');
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

  // Combine data items
  type CardItem = {
    id: string;
    title: string;
    type: 'pegunungan' | 'air' | 'religi' | 'resto' | 'penginapan';
    categoryLabel: string;
    address: string;
    image: string;
    desc: string;
    price?: string;
    hours?: string;
    phone?: string;
    mapsUrl?: string;
  };

  const allCards: CardItem[] = [
    ...wisataList.map(w => ({
      id: `w-${w.id_wisata}`,
      title: w.nama_wisata,
      type: (w.id_kategori_wisata === 1 ? 'pegunungan' : w.id_kategori_wisata === 2 ? 'air' : 'religi') as any,
      categoryLabel: w.kategori_wisata || 'Wisata',
      address: w.alamat_wisata,
      image: w.foto_wisata,
      desc: w.deskripsi_wisata,
      price: w.harga_tiket_dewasa,
      hours: w.jam_buka,
      phone: w.nomor_telepon,
      mapsUrl: w.url_lokasi
    })),
    ...restoranList.map(r => ({
      id: `r-${r.id_restoran}`,
      title: r.nama_restoran,
      type: 'resto' as const,
      categoryLabel: 'Kuliner & Restoran',
      address: r.alamat_restoran,
      image: r.foto_restoran,
      desc: r.deskripsi_restoran,
      price: r.menu_favorit,
      hours: r.jam_buka,
      phone: r.nomor_telepon,
      mapsUrl: r.url_lokasi
    })),
    ...penginapanList.map(p => ({
      id: `p-${p.id_penginapan}`,
      title: p.nama_penginapan,
      type: 'penginapan' as const,
      categoryLabel: 'Akomodasi Penginapan',
      address: p.alamat_penginapan,
      image: p.foto_penginapan,
      desc: p.deskripsi_penginapan,
      price: p.harga_mulai,
      hours: p.jam_buka,
      phone: p.nomor_telepon,
      mapsUrl: p.url_lokasi
    }))
  ];

  const filteredCards = allCards
    .filter(c => activeCategory === 'all' || c.type === activeCategory)
    .filter(c =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section (Cinematic 16:9 visual focal point, unboxed typography) */}
      <section className="relative rounded-2xl overflow-hidden bg-stone-950 text-white min-h-[460px] flex items-center justify-center p-8 sm:p-14 border border-stone-800 shadow-xl">
        <img
          src={localAssets.highlands}
          alt="Lanskap Wisata Dolano"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
          referrerPolicy="no-referrer"
          onError={(e) => handleImageFallback(e, 'highlands')}
        />
        <div className="relative z-10 max-w-3xl text-center space-y-4">
          <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
            Pariwisata & Budaya Nusantara
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Jelajahi Kemegahan Alam & Kehangatan Dolano
          </h1>
          <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Panduan terlengkap destinasi kaldera pegunungan, segarnya wisata air, keagungan situs bersejarah, hidangan kuliner otentik, dan resor penginapan asri.
          </p>

          {/* Clean Search Input */}
          <div className="relative max-w-lg mx-auto pt-3">
            <Search className="w-4 h-4 absolute left-4 top-6 text-stone-400" />
            <input
              type="text"
              placeholder="Cari objek wisata, menu kuliner, atau hotel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-stone-900 text-xs font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
        </div>
      </section>

      {/* Filter Segmented Controls (Buttons, not colored candy pills) */}
      <section id="destinasi" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-200 pb-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-stone-900 tracking-tight">
              Katalog Destinasi Rekomendasi
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Pilih kategori untuk memfilter destinasi sesuai preferensi perjalanan Anda
            </p>
          </div>
          <span className="text-xs text-stone-500 font-mono tabular-nums">
            {filteredCards.length} Destinasi Ditampilkan
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl max-w-fit flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Semua ({allCards.length})
          </button>
          <button
            onClick={() => setActiveCategory('pegunungan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === 'pegunungan'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Mountain className="w-3.5 h-3.5 text-stone-500" />
            <span>Pegunungan</span>
          </button>
          <button
            onClick={() => setActiveCategory('air')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === 'air'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-stone-500" />
            <span>Wisata Air</span>
          </button>
          <button
            onClick={() => setActiveCategory('religi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === 'religi'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-stone-500" />
            <span>Religi & Budaya</span>
          </button>
          <button
            onClick={() => setActiveCategory('resto')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === 'resto'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-stone-500" />
            <span>Kuliner</span>
          </button>
          <button
            onClick={() => setActiveCategory('penginapan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === 'penginapan'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BedDouble className="w-3.5 h-3.5 text-stone-500" />
            <span>Penginapan</span>
          </button>
        </div>
      </section>

      {/* Grid Cards (4:3 ratio, unboxed metadata with · separators, no pill badge sandwich) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <article
            key={card.id}
            onClick={() => setSelectedItem({
              title: card.title,
              category: card.categoryLabel,
              address: card.address,
              phone: card.phone,
              hours: card.hours,
              price: card.price,
              desc: card.desc,
              image: card.image,
              mapsUrl: card.mapsUrl
            })}
            className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs hover:border-stone-400 transition-colors flex flex-col cursor-pointer"
          >
            {/* 4:3 Aspect Ratio Image Frame */}
            <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
              <img
                src={getSafeImageUrl(card.image, 'highlands')}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageFallback(e, 'highlands')}
              />
            </div>

            {/* Content Body: Clean unboxed metadata with · separator */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                  <span>{card.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="line-clamp-1">{card.address.split(',')[0]}</span>
                </div>
                <h3 className="font-display font-bold text-stone-900 text-base mt-1 group-hover:text-stone-950 line-clamp-1">
                  {card.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  {card.price || 'Informasi Tersedia'}
                </span>
                <span className="text-stone-800 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                  <span>Rincian</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Newsletter Lead Capture Section (Concrete copy, validated, no pill badges) */}
      <section id="buletin" className="rounded-2xl bg-stone-900 text-white p-8 sm:p-12 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md space-y-2 text-left">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block">
            Buletin Pariwisata Dolano
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dapatkan Rencana Perjalanan & Warta Destinasi
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Kami mengirimkan ulasan destinasi baru, rekomendasi kuliner lokal, dan informasi tiket masuk terverifikasi langsung ke kotak masuk surel Anda.
          </p>
        </div>

        <div className="w-full md:w-auto min-w-[320px]">
          {subSuccess ? (
            <div className="bg-stone-800 border border-stone-700 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-xs text-stone-100">Pendaftaran Berhasil</p>
                <p className="text-[11px] text-stone-300">Surel Anda telah tercatat dalam sistem pelanggan Dolano.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubSubmit} className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Nama Lengkap Anda"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Alamat surel Anda..."
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  disabled={subLoading}
                  className="px-4 py-2.5 bg-amber-400 text-stone-950 font-bold rounded-lg text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{subLoading ? '...' : 'Langganan'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Modal Detail */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="relative h-60 bg-stone-900">
              <img
                src={getSafeImageUrl(selectedItem.image, 'highlands')}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageFallback(e, 'highlands')}
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                aria-label="Tutup jendela rincian"
              >
                ✕
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
                    <span className="text-stone-400 text-[10px] uppercase font-semibold">Tarif / Menu</span>
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
