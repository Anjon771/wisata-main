import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const reviews = [
    {
      name: 'Aditya Pratama',
      origin: 'Jakarta Selatan',
      trip: 'Trip Keluarga Bromo & Coban Rondo',
      comment: 'Panduan jam buka dan estimasi tiket masuk di Dolano sangat presisi. Kami bisa menyaksikan matahari terbit Penanjakan tepat waktu tanpa terjebak antrean jeep.',
      date: 'Maret 2026'
    },
    {
      name: 'Nadia Rahmadhani',
      origin: 'Surabaya',
      trip: 'Eksplorasi Budaya Candi & Kuliner',
      comment: 'Rekomendasi Resto Inggil dan Candi Singosari benar-benar luar biasa. Pengalaman santap rawon di tengah galeri antik tempo doeloe adalah hal yang tak terlupakan.',
      date: 'Februari 2026'
    },
    {
      name: 'Dimas Wicaksono',
      origin: 'Bandung',
      trip: 'Staycation Shanaya Eco-Resort',
      comment: 'Informasi tarif sewa kamar dan fasilitas villa glamping sangat transparan. Pemandangan kabut pagi dari balkon persis seperti foto dokumentasi di website ini.',
      date: 'Januari 2026'
    }
  ];

  return (
    <section id="testimoni" className="space-y-8 py-4">
      {/* Proof Metrics (Claim-to-proof quantitative rigor) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-stone-900 text-white rounded-2xl border border-stone-800 shadow-lg">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block">
            Wisatawan Terlayani
          </span>
          <p className="font-mono text-3xl sm:text-4xl font-bold text-amber-300 mt-1 tabular-nums">
            42.000+
          </p>
          <p className="text-[11px] text-stone-400 mt-1">Perjalanan terencana setiap musim</p>
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block">
            Akurasi Informasi
          </span>
          <p className="font-mono text-3xl sm:text-4xl font-bold text-white mt-1 tabular-nums">
            98,4%
          </p>
          <p className="text-[11px] text-stone-400 mt-1">Tarif tiket & jam buka terverifikasi</p>
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block">
            Objek Terkurasi
          </span>
          <p className="font-mono text-3xl sm:text-4xl font-bold text-white mt-1 tabular-nums">
            30+
          </p>
          <p className="text-[11px] text-stone-400 mt-1">Alam, religi, kuliner & penginapan</p>
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block">
            Layanan Terpadu
          </span>
          <p className="font-mono text-3xl sm:text-4xl font-bold text-amber-300 mt-1 tabular-nums">
            100%
          </p>
          <p className="text-[11px] text-stone-400 mt-1">Akses informasi bebas biaya</p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Pengalaman Wisatawan
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Cerita Penjelajah Dolano
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-stone-300" />
                <p className="text-xs text-stone-700 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-xs">{rev.name}</h4>
                  <p className="text-[11px] text-stone-500">{rev.origin} · {rev.trip}</p>
                </div>
                <span className="text-[10px] text-stone-400 font-mono tabular-nums">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
