import React, { useState } from 'react';
import { ZoomIn, Mountain, Waves, Landmark, UtensilsCrossed, BedDouble } from 'lucide-react';
import { Wisata, Restoran, Penginapan } from '../types';
import { getSafeImageUrl, handleImageFallback } from '../utils/imageHelper';

interface GaleriViewProps {
  wisataList: Wisata[];
  restoranList: Restoran[];
  penginapanList: Penginapan[];
  defaultCategory?: 'wisata' | 'restoran' | 'penginapan';
}

export const GaleriView: React.FC<GaleriViewProps> = ({
  wisataList,
  restoranList,
  penginapanList,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | '1' | '2' | '3' | 'resto' | 'penginapan'>('all');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; category: string } | null>(null);

  // Collect all gallery photos
  const items: { id: string; title: string; src: string; filterKey: '1' | '2' | '3' | 'resto' | 'penginapan'; categoryName: string }[] = [];

  wisataList.forEach((w) => {
    const key = `${w.id_kategori_wisata}` as '1' | '2' | '3';
    items.push({
      id: `w-${w.id_wisata}-main`,
      title: w.nama_wisata,
      src: w.foto_wisata,
      filterKey: key,
      categoryName: w.kategori_wisata || 'Wisata'
    });
    if (w.galeri) {
      w.galeri.forEach((gSrc, gIdx) => {
        items.push({
          id: `w-${w.id_wisata}-g-${gIdx}`,
          title: `${w.nama_wisata} (${gIdx + 1})`,
          src: gSrc,
          filterKey: key,
          categoryName: w.kategori_wisata || 'Wisata'
        });
      });
    }
  });

  restoranList.forEach((r) => {
    items.push({
      id: `r-${r.id_restoran}`,
      title: r.nama_restoran,
      src: r.foto_restoran,
      filterKey: 'resto',
      categoryName: 'Kuliner & Restoran'
    });
  });

  penginapanList.forEach((p) => {
    items.push({
      id: `p-${p.id_penginapan}`,
      title: p.nama_penginapan,
      src: p.foto_penginapan,
      filterKey: 'penginapan',
      categoryName: 'Akomodasi Penginapan'
    });
  });

  const filteredItems = activeTab === 'all' ? items : items.filter(it => it.filterKey === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
          Dokumentasi Visual
        </span>
        <h1 className="font-display text-3xl font-bold text-stone-900 tracking-tight">
          Galeri Fotografi Dolano
        </h1>
        <p className="text-xs text-stone-600 mt-1">
          Arsip visual resolusi tinggi meliputi bentang alam pegunungan, rekreasi air, situs religi, kehangatan kuliner dan kenyamanan penginapan
        </p>
      </div>

      {/* Segmented Filter Bar (Clean unboxed buttons, not colored pill badges) */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl max-w-fit flex-wrap">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Semua Foto ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('1')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === '1'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Mountain className="w-3.5 h-3.5 text-stone-500" />
          <span>Pegunungan</span>
        </button>
        <button
          onClick={() => setActiveTab('2')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === '2'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Waves className="w-3.5 h-3.5 text-stone-500" />
          <span>Wisata Air</span>
        </button>
        <button
          onClick={() => setActiveTab('3')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === '3'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Landmark className="w-3.5 h-3.5 text-stone-500" />
          <span>Religi & Cagar Budaya</span>
        </button>
        <button
          onClick={() => setActiveTab('resto')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'resto'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <UtensilsCrossed className="w-3.5 h-3.5 text-stone-500" />
          <span>Kuliner</span>
        </button>
        <button
          onClick={() => setActiveTab('penginapan')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'penginapan'
              ? 'bg-white text-stone-900 shadow-2xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BedDouble className="w-3.5 h-3.5 text-stone-500" />
          <span>Penginapan</span>
        </button>
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImage({ src: item.src, title: item.title, category: item.categoryName })}
            className="group relative h-48 bg-stone-900 rounded-xl overflow-hidden cursor-pointer border border-stone-200/90 shadow-2xs"
          >
            <img
              src={getSafeImageUrl(item.src, 'highlands')}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageFallback(e, 'highlands')}
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
              <span className="text-[10px] font-semibold text-amber-300 tracking-wider uppercase">
                {item.categoryName}
              </span>
              <p className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                {item.title}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-stone-300">
                <ZoomIn className="w-3 h-3" />
                <span>Perbesar Foto</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-xs flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
          >
            <div className="relative max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={getSafeImageUrl(lightboxImage.src, 'highlands')}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageFallback(e, 'highlands')}
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                aria-label="Tutup foto"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-white">
              <div>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                  {lightboxImage.category}
                </span>
                <h3 className="font-display font-bold text-base text-stone-100">
                  {lightboxImage.title}
                </h3>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 rounded-lg text-xs font-semibold text-stone-200 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
