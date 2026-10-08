import React from 'react';
import { Mountain, Waves, Landmark, UtensilsCrossed, BedDouble, Users, ArrowUpRight, Plus, Eye, Send, ArrowRight } from 'lucide-react';
import { Wisata, Restoran, Penginapan, Subscriber } from '../types';
import { ActivePage } from './Sidebar';

interface DashboardViewProps {
  wisataList: Wisata[];
  restoranList: Restoran[];
  penginapanList: Penginapan[];
  subscribers: Subscriber[];
  onNavigate: (page: ActivePage) => void;
  onOpenAddModal: (type: 'wisata' | 'restoran' | 'penginapan') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  wisataList,
  restoranList,
  penginapanList,
  subscribers,
  onNavigate,
  onOpenAddModal,
}) => {
  const countPegunungan = wisataList.filter(w => w.id_kategori_wisata === 1).length;
  const countAir = wisataList.filter(w => w.id_kategori_wisata === 2).length;
  const countReligi = wisataList.filter(w => w.id_kategori_wisata === 3).length;
  const activeSubscribers = subscribers.filter(s => s.status === 'Mengikuti').length;
  const unreadMessages = subscribers.filter(s => s.status_pesan === 'Belum terbaca').length;

  return (
    <div className="space-y-8">
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Ringkasan Sistem
          </span>
          <h1 className="font-display text-3xl font-bold text-stone-900 tracking-tight">
            Dashboard Pengelolaan Dolano
          </h1>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Sensus terpadu objek pariwisata alam, kebudayaan religi, mitra kuliner khas, serta fasilitas akomodasi penginapan daerah.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onOpenAddModal('wisata')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Tambah Data Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Quantitative Metric Cards (Tabular figures, Single-Elevation, Zero-Pill) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Wisata */}
        <div
          onClick={() => onNavigate('wisata-pegunungan')}
          className="bg-white rounded-xl border border-stone-200/90 p-5 hover:border-stone-400 transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 tracking-wide uppercase">Destinasi Wisata</span>
            <Mountain className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
          </div>
          <div className="my-4">
            <p className="font-mono text-3xl font-bold text-stone-900 tracking-tight tabular-nums">
              {wisataList.length}
            </p>
          </div>
          <div className="text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-100 pt-2.5">
            <span>Pegunungan, Air, Religi</span>
            <span className="text-stone-800 font-medium group-hover:translate-x-0.5 transition-transform">Kelola →</span>
          </div>
        </div>

        {/* Metric 2: Restoran */}
        <div
          onClick={() => onNavigate('daftar-restoran')}
          className="bg-white rounded-xl border border-stone-200/90 p-5 hover:border-stone-400 transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 tracking-wide uppercase">Kuliner & Resto</span>
            <UtensilsCrossed className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
          </div>
          <div className="my-4">
            <p className="font-mono text-3xl font-bold text-stone-900 tracking-tight tabular-nums">
              {restoranList.length}
            </p>
          </div>
          <div className="text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-100 pt-2.5">
            <span>Mitra Rumah Makan</span>
            <span className="text-stone-800 font-medium group-hover:translate-x-0.5 transition-transform">Kelola →</span>
          </div>
        </div>

        {/* Metric 3: Penginapan */}
        <div
          onClick={() => onNavigate('daftar-penginapan')}
          className="bg-white rounded-xl border border-stone-200/90 p-5 hover:border-stone-400 transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 tracking-wide uppercase">Akomodasi Kamar</span>
            <BedDouble className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
          </div>
          <div className="my-4">
            <p className="font-mono text-3xl font-bold text-stone-900 tracking-tight tabular-nums">
              {penginapanList.length}
            </p>
          </div>
          <div className="text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-100 pt-2.5">
            <span>Hotel, Resort & Villa</span>
            <span className="text-stone-800 font-medium group-hover:translate-x-0.5 transition-transform">Kelola →</span>
          </div>
        </div>

        {/* Metric 4: Subscriber */}
        <div
          onClick={() => onNavigate('subscriber')}
          className="bg-white rounded-xl border border-stone-200/90 p-5 hover:border-stone-400 transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 tracking-wide uppercase">Pelanggan Buletin</span>
            <Users className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
          </div>
          <div className="my-4">
            <p className="font-mono text-3xl font-bold text-stone-900 tracking-tight tabular-nums">
              {activeSubscribers}
            </p>
          </div>
          <div className="text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-100 pt-2.5">
            <span>{unreadMessages} pesan baru</span>
            <span className="text-stone-800 font-medium group-hover:translate-x-0.5 transition-transform">Kelola →</span>
          </div>
        </div>
      </div>

      {/* Tourism Category Roster (Zero-Pill, clean unboxed typographic metadata) */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-base text-stone-900">
              Klasifikasi Kategori Wisata
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Sebaran data objek wisata Dolano berdasarkan karakteristik geografis dan tematik
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('wisata-pegunungan')}
            className="p-4 rounded-lg border border-stone-200 hover:border-stone-900 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-stone-600" />
                  Wisata Pegunungan
                </span>
                <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">{countPegunungan} entri</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed mt-2">
                Dataran tinggi, kaldera vulkanik Bromo, kebun teh terasering, serta puncak panorama alam.
              </p>
            </div>
            <div className="text-[11px] text-stone-600 font-semibold mt-4 flex items-center gap-1">
              <span>Buka Daftar</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('wisata-air')}
            className="p-4 rounded-lg border border-stone-200 hover:border-stone-900 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-stone-600" />
                  Wisata Air & Bahari
                </span>
                <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">{countAir} entri</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed mt-2">
                Curahan air terjun alami, sumber mata air jernih, danau wisata, serta garis pesisir pantai selatan.
              </p>
            </div>
            <div className="text-[11px] text-stone-600 font-semibold mt-4 flex items-center gap-1">
              <span>Buka Daftar</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('wisata-religi')}
            className="p-4 rounded-lg border border-stone-200 hover:border-stone-900 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1">
                <span className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-stone-600" />
                  Wisata Religi & Sejarah
                </span>
                <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">{countReligi} entri</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed mt-2">
                Arsitektur masjid bersejarah, candi kerajaan abad pertengahan, dan situs cagar budaya sakral.
              </p>
            </div>
            <div className="text-[11px] text-stone-600 font-semibold mt-4 flex items-center gap-1">
              <span>Buka Daftar</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Structured Action & Recent Catalog Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Management Shortcuts */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-5 space-y-4">
          <h2 className="font-display font-bold text-sm text-stone-900 pb-2 border-b border-stone-100">
            Aksi Manajemen Cepat
          </h2>

          <div className="space-y-2">
            <button
              onClick={() => onOpenAddModal('wisata')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-colors text-left group"
            >
              <div>
                <p className="text-xs font-semibold text-stone-900 group-hover:text-stone-950">
                  + Objek Wisata Baru
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">Input tarif masuk, jam operasional & titik koordinat</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 shrink-0" />
            </button>

            <button
              onClick={() => onOpenAddModal('restoran')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-colors text-left group"
            >
              <div>
                <p className="text-xs font-semibold text-stone-900 group-hover:text-stone-950">
                  + Kuliner & Restoran
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">Daftarkan rumah makan khas, menu andalan & jam buka</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 shrink-0" />
            </button>

            <button
              onClick={() => onOpenAddModal('penginapan')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-colors text-left group"
            >
              <div>
                <p className="text-xs font-semibold text-stone-900 group-hover:text-stone-950">
                  + Penginapan / Hotel
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">Tambah akomodasi villa, tarif sewa & fasilitas kamar</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 shrink-0" />
            </button>

            <button
              onClick={() => onNavigate('mail-info')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-colors text-left group"
            >
              <div>
                <p className="text-xs font-semibold text-stone-900 group-hover:text-stone-950">
                  Broadcast Buletin
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">Kirim info promosi wisata ke subscriber terdaftar</p>
              </div>
              <Send className="w-4 h-4 text-stone-400 group-hover:text-stone-900 shrink-0" />
            </button>
          </div>
        </div>

        {/* High-Density Data Grid: Recent Catalog Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200/90 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div>
              <h2 className="font-display font-bold text-sm text-stone-900">
                Katalog Destinasi Terdaftar
              </h2>
              <p className="text-xs text-stone-500">Objek pariwisata aktif dalam pangkalan data</p>
            </div>
            <button
              onClick={() => onNavigate('wisata-pegunungan')}
              className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1"
            >
              <span>Semua Wisata</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 text-stone-500 uppercase text-[10px] font-semibold tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Objek Wisata</th>
                  <th className="py-2.5 px-3">Kategori</th>
                  <th className="py-2.5 px-3 text-right">Tiket Masuk</th>
                  <th className="py-2.5 px-3">Jam Operasional</th>
                  <th className="py-2.5 px-3 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {wisataList.slice(0, 5).map((item) => (
                  <tr key={item.id_wisata} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                          <img
                            src={item.foto_wisata}
                            alt={item.nama_wisata}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/src/assets/images/dolano_hero_highlands_1791445064718.jpg';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900 line-clamp-1">{item.nama_wisata}</p>
                          <p className="text-[11px] text-stone-500 line-clamp-1">{item.alamat_wisata}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-stone-600 font-medium">
                        {item.kategori_wisata || 'Wisata'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-stone-900 tabular-nums">
                      {item.harga_tiket_dewasa}
                    </td>
                    <td className="py-3 px-3 text-stone-600">
                      {item.jam_buka}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onNavigate(
                          item.id_kategori_wisata === 1 ? 'wisata-pegunungan' : item.id_kategori_wisata === 2 ? 'wisata-air' : 'wisata-religi'
                        )}
                        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                        title="Buka Rincian"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
