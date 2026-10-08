import React, { useState } from 'react';
import { Camera, ZoomIn, X, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { getSafeImageUrl, handleImageFallback, localAssets } from '../utils/imageHelper';

interface GalleryPhoto {
  id: number;
  title: string;
  category: 'pegunungan' | 'air' | 'religi' | 'kuliner' | 'resor';
  categoryLabel: string;
  location: string;
  image: string;
  caption: string;
}

export const PhotoMomentsGallery: React.FC<{
  onSelectDestination?: (name: string) => void;
}> = ({ onSelectDestination }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: 1,
      title: 'Fajar Emas di Kaldera Bromo',
      category: 'pegunungan',
      categoryLabel: 'Pegunungan',
      location: 'Penanjakan 1, Bromo Tengger',
      image: localAssets.highlands,
      caption: 'Kilau mentari pertama membelah kabut putih di atas kawah vulkanik purba Bromo dan Semeru.'
    },
    {
      id: 2,
      title: 'Curahan Tirta Rindang Coban Rondo',
      category: 'air',
      categoryLabel: 'Wisata Air',
      location: 'Kecamatan Pujon, Malang',
      image: localAssets.waterfall,
      caption: 'Air terjun setinggi 84 meter dilingkupi vegetasi pinus hijau segar dan udara sejuk pegunungan.'
    },
    {
      id: 3,
      title: 'Kemegahan Peninggalan Singhasari',
      category: 'religi',
      categoryLabel: 'Cagar Budaya',
      location: 'Candirenggo, Singosari',
      image: localAssets.temple,
      caption: 'Karya pahat batu andesit sakral peninggalan wangsa Rajasa dari abad ke-13 yang masih berdiri kokoh.'
    },
    {
      id: 4,
      title: 'Cita Rasa Tradisional Nusantara',
      category: 'kuliner',
      categoryLabel: 'Kuliner',
      location: 'Pusat Kota & Kawasan Budaya',
      image: localAssets.culinary,
      caption: 'Racikan bumbu rempah otentik dalam hidangan rawon hitam, kuah hangat, dan sambal terasi khas Jawa Timur.'
    },
    {
      id: 5,
      title: 'Kedamaian Villa & Resor Alam',
      category: 'resor',
      categoryLabel: 'Akomodasi',
      location: 'Ngadas & Lembah Karangploso',
      image: localAssets.resort,
      caption: 'Kenyamanan bermalam di kabin kayu dengan balkon menghadap perbukitan hijau berkabut pagi.'
    },
    {
      id: 6,
      title: 'Pura Karang di Tepi Samudra',
      category: 'air',
      categoryLabel: 'Wisata Air',
      location: 'Pantai Balekambang, Malang Selatan',
      image: localAssets.waterfall,
      caption: 'Jembatan panjang di atas ombak samudra menghubungkan pesisir pasir putih dengan pulau karang Pura Ismoyo.'
    }
  ];

  const filteredPhotos = photos.filter(p => activeCategory === 'all' || p.category === activeCategory);

  return (
    <section id="galeri-foto" className="space-y-8 py-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Dokumentasi Visual
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Sudut Estetika & Keindahan Lapangan
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Rangkuman potret lanskap alam, arsitektur bersejarah, serta kuliner khas yang menanti kedatangan Anda.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl self-start sm:self-auto flex-wrap">
          {[
            { id: 'all', label: 'Semua Sudut' },
            { id: 'pegunungan', label: 'Pegunungan' },
            { id: 'air', label: 'Air & Tirta' },
            { id: 'religi', label: 'Budaya' },
            { id: 'kuliner', label: 'Kuliner' },
            { id: 'resor', label: 'Penginapan' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setLightboxPhoto(photo)}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 aspect-4/3 cursor-pointer shadow-2xs hover:border-stone-400 transition-colors"
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageFallback(e, 'highlands')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

            <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-amber-300">
                  {photo.categoryLabel}
                </span>
                <div className="w-7 h-7 rounded-full bg-stone-900/70 backdrop-blur-2xs flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-stone-300 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{photo.location}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="relative aspect-16/10 bg-stone-900">
              <img
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-950/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                aria-label="Tutup foto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                  {lightboxPhoto.categoryLabel}
                </span>
                <span className="text-stone-500 flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{lightboxPhoto.location}</span>
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                {lightboxPhoto.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                {lightboxPhoto.caption}
              </p>
              {onSelectDestination && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      onSelectDestination(lightboxPhoto.title);
                      setLightboxPhoto(null);
                    }}
                    className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5"
                  >
                    <span>Cari Informasi Terkait</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
