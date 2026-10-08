import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Kapan waktu terbaik untuk berkunjung ke wisata pegunungan Bromo?',
      a: 'Musim kemarau antara Mei hingga Oktober menyuguhkan langit fajar paling bersih tanpa kabut tebal hujan. Untuk melihat fenomena matahari terbit optimal, disarankan tiba di area Penanjakan sebelum pukul 04:00 WIB.'
    },
    {
      q: 'Apakah harga tiket masuk yang tercantum di Dolano selalu diperbarui?',
      a: 'Ya, seluruh tarif masuk objek wisata, sewa kamar penginapan, dan harga menu kuliner disinkronkan secara berkala oleh pengelola sistem Dolano bersama pengelola destinasi terkait.'
    },
    {
      q: 'Bagaimana adab busana saat mengunjungi objek wisata religi seperti Masjid Tiban atau Candi?',
      a: 'Pengunjung dihimbau mengenakan pakaian sopan dan tertutup. Untuk Masjid Tiban Turen, pengunjung muslim maupun non-muslim dipersilakan masuk dengan melepas alas kaki dan menjaga ketertiban ibadah.'
    },
    {
      q: 'Apakah tersedia panduan rute navigasi Google Maps untuk setiap destinasi?',
      a: 'Setiap kartu destinasi dilengkapi tautan langsung ke Google Maps yang memandu rute berkendara dari titik awal keberangkatan Anda hingga ke area parkir lokasi.'
    },
    {
      q: 'Bagaimana cara mendaftarkan usaha restoran atau penginapan baru ke direktori Dolano?',
      a: 'Pengelola tempat usaha dapat menghubungi administrator sistem melalui form pendaftaran buletin atau konsol admin resmi untuk proses kurasi dan verifikasi data.'
    }
  ];

  return (
    <section className="space-y-6 py-4">
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
          Pusat Bantuan
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Pertanyaan yang Kerap Diajukan (FAQ)
        </h2>
        <p className="text-xs text-stone-600 mt-1">
          Informasi praktis seputar persiapan perjalanan, cuaca, tiket, dan etika berkunjung
        </p>
      </div>

      <div className="space-y-2.5 max-w-3xl">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs font-bold text-stone-900 hover:text-stone-950"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
