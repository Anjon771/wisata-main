import React, { useState } from 'react';
import { Clock, MapPin, Compass, ArrowRight, Check } from 'lucide-react';

interface ItineraryPlan {
  id: string;
  title: string;
  duration: string;
  tagline: string;
  badge: string;
  stops: {
    time: string;
    place: string;
    category: string;
    desc: string;
  }[];
  included: string[];
}

export const ItinerarySection: React.FC<{
  onSelectPlace?: (name: string) => void;
}> = ({ onSelectPlace }) => {
  const [activePlanId, setActivePlanId] = useState<string>('plan-1');

  const plans: ItineraryPlan[] = [
    {
      id: 'plan-1',
      title: 'Sunrise Bromo & Lembah Pujon',
      duration: '1 Hari Penuh',
      badge: 'Paling Diminati',
      tagline: 'Petualangan fajar kaldera gunung berapi dilanjutkan kesegaran air terjun pegunungan',
      stops: [
        {
          time: '03:30 WIB',
          place: 'Penanjakan Sunrise Bromo',
          category: 'Pegunungan',
          desc: 'Menyaksikan fajar jingga menyinari lautan pasir dan puncak kawah Bromo yang mengepul.'
        },
        {
          time: '08:30 WIB',
          place: 'Pasir Berbisik & Bukit Teletubbies',
          category: 'Pegunungan',
          desc: 'Berfoto di hamparan padang pasir vulkanik dan bukit hijau savana Tengger.'
        },
        {
          time: '12:00 WIB',
          place: 'Resto Tradisional Inggil',
          category: 'Kuliner',
          desc: 'Makan siang kuliner khas Jawa Timur (Rawon Buntut & Nasi Jagung) di galeri barang antik.'
        },
        {
          time: '14:30 WIB',
          place: 'Air Terjun Coban Rondo & Labirin',
          category: 'Wisata Air',
          desc: 'Menikmati udara sejuk rimbun pinus dan menjelajahi labirin tanaman hijau alami.'
        }
      ],
      included: ['Pemandu lokal tersertifikasi', 'Rekomendasi rute Google Maps', 'Informasi jam buka akurat', 'Daftar menu andalan']
    },
    {
      id: 'plan-2',
      title: 'Kembara Budaya & Cagar Religi',
      duration: '2 Hari 1 Malam',
      badge: 'Wisata Sejarah',
      tagline: 'Napak tilas keagungan wangsa Singhasari dan arsitektur religi 10 lantai yang memesona',
      stops: [
        {
          time: 'Hari 1 - 09:00',
          place: 'Candi Singosari Bersejarah',
          category: 'Religi & Sejarah',
          desc: 'Mempelajari peninggalan Kerajaan Singhasari abad ke-13 dan arca Dwarapala raksasa.'
        },
        {
          time: 'Hari 1 - 13:00',
          place: 'Depot Bakso Bakar Dolano',
          category: 'Kuliner',
          desc: 'Santap bakso bakar bumbu rempah gurih pedas legendaris khas kota Malang.'
        },
        {
          time: 'Hari 1 - 16:00',
          place: 'Shanaya Resort & Lembah Hills',
          category: 'Penginapan',
          desc: 'Check-in kamar villa kayu etnik dengan pemandangan langsung ke bukit hijau asri.'
        },
        {
          time: 'Hari 2 - 09:30',
          place: 'Masjid Tiban Turen 10 Lantai',
          category: 'Religi & Arsitektur',
          desc: 'Mengagumi ornamen mosaik kaligrafi, arsitektur megah Timur Tengah, dan galeri keramik.'
        }
      ],
      included: ['Rencana waktu kunjungan optimal', 'Akses petunjuk arah rute', 'Rekomendasi hotel ramah keluarga', 'Panduan adab busana religi']
    },
    {
      id: 'plan-3',
      title: 'Relaksasi Tirta & Pesisir Selatan',
      duration: '1 Hari Santai',
      badge: 'Pilihan Santai',
      tagline: 'Melarung penat di pantai karang berbalut pura laut eksotis dan santap ikan bakar',
      stops: [
        {
          time: '08:00 WIB',
          place: 'Waroeng Dau Garden & Kopi Lembah',
          category: 'Kuliner',
          desc: 'Sarapan pagi santai dikelilingi kebun hijau dengan kopi tubruk lokal hangat.'
        },
        {
          time: '11:00 WIB',
          place: 'Pantai Balekambang (Tanah Lot Jawa)',
          category: 'Wisata Air',
          desc: 'Menikmati deburan ombak Samudra Hindia dan jembatan karang menuju Pura Ismoyo.'
        },
        {
          time: '15:30 WIB',
          place: 'Puncak Sunset & Kuliner Pesisir',
          category: 'Wisata Bahari',
          desc: 'Menyantap kelapa muda segar dan ikan bakar bumbu pesisir di tepi tebing senja.'
        }
      ],
      included: ['Peta lokasi pantai selatan', 'Jadwal pasang surut air laut', 'Informasi tiket terverifikasi', 'Rekomendasi warung ikan segar']
    }
  ];

  const currentPlan = plans.find(p => p.id === activePlanId) || plans[0];

  return (
    <section id="itinerary" className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Panduan Rencana Perjalanan
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Rekomendasi Itinerari Terkurasi
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Rangkaian rute perjalanan efisien yang dirancang agar Anda dapat menikmati destinasi terbaik tanpa terburu-buru.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl self-start sm:self-auto">
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePlanId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activePlanId === p.id
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {p.title.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Card Detail */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
              <span>{currentPlan.badge}</span>
              <span>·</span>
              <span className="font-mono tabular-nums">{currentPlan.duration}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900">
              {currentPlan.title}
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
              {currentPlan.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-200/70 shrink-0">
            {currentPlan.included.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                <Check className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                <span>{item}</span>
                {idx < currentPlan.included.length - 1 && <span className="text-stone-300 ml-1">·</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Stops */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentPlan.stops.map((stop, index) => (
            <div
              key={index}
              onClick={() => onSelectPlace && onSelectPlace(stop.place)}
              className="p-4 rounded-xl border border-stone-200 hover:border-stone-400 transition-colors bg-stone-50/50 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-stone-900 tabular-nums text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {stop.time}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">{stop.category}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-stone-900 group-hover:text-stone-950 line-clamp-1">
                  {stop.place}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mt-1.5 line-clamp-3">
                  {stop.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/60 mt-3 text-[11px] text-stone-800 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Lihat info lokasi</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
