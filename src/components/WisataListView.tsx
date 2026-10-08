import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, ExternalLink, Search, Eye, Phone, Clock } from 'lucide-react';
import { Wisata } from '../types';
import { getSafeImageUrl, handleImageFallback } from '../utils/imageHelper';

interface WisataListViewProps {
  kategoriId: number; // 1: Pegunungan, 2: Air, 3: Religi
  title: string;
  wisataList: Wisata[];
  onOpenAddModal: () => void;
  onOpenEditModal: (item: Wisata) => void;
  onDeleteItem: (id: number) => void;
}

export const WisataListView: React.FC<WisataListViewProps> = ({
  kategoriId,
  title,
  wisataList,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteItem,
}) => {
  const [search, setSearch] = useState('');
  const [selectedPreview, setSelectedPreview] = useState<Wisata | null>(null);

  const filtered = wisataList
    .filter(item => item.id_kategori_wisata === kategoriId)
    .filter(item =>
      item.nama_wisata.toLowerCase().includes(search.toLowerCase()) ||
      item.alamat_wisata.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Katalog Destinasi
          </span>
          <h1 className="font-display text-3xl font-bold text-stone-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Inventarisasi pangkalan data objek wisata, tarif tiket masuk, peta lokasi dan dokumentasi foto
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Tambah {title}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder={`Cari dalam ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
          />
        </div>
        <div className="text-xs text-stone-600 font-medium">
          Menampilkan <span className="font-mono font-bold text-stone-900 tabular-nums">{filtered.length}</span> entri terdaftar
        </div>
      </div>

      {/* High-Density Data Grid */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 uppercase text-[10px] font-semibold tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Objek Wisata</th>
                <th className="py-3 px-4">Alamat & Titik Lokasi</th>
                <th className="py-3 px-4 text-right">Tiket Masuk</th>
                <th className="py-3 px-4">Jam Buka</th>
                <th className="py-3 px-4 text-center">Foto</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400 text-xs">
                    Belum ada destinasi wisata yang terdaftar dalam kategori ini.
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr key={item.id_wisata} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-stone-400 tabular-nums">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900 text-xs">{item.nama_wisata}</div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{item.nomor_telepon || 'Kontak tidak dicantumkan'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="line-clamp-1 text-stone-700">{item.alamat_wisata}</p>
                      {item.url_lokasi && (
                        <a
                          href={item.url_lokasi}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-stone-700 hover:text-stone-950 hover:underline mt-0.5 font-medium"
                        >
                          <MapPin className="w-3 h-3 text-rose-500" />
                          <span>Peta Google Maps</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="font-mono font-bold text-stone-900 tabular-nums">
                        {item.harga_tiket_dewasa || 'Gratis'}
                      </div>
                      <div className="text-[10px] text-stone-500 tabular-nums">
                        Anak: {item.harga_tiket_anak || 'Gratis'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{item.jam_buka}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div
                        onClick={() => setSelectedPreview(item)}
                        className="w-12 h-10 rounded-md overflow-hidden bg-stone-100 mx-auto border border-stone-200 cursor-pointer hover:opacity-85 transition-opacity"
                      >
                        <img
                          src={getSafeImageUrl(item.foto_wisata, item.id_kategori_wisata === 2 ? 'waterfall' : item.id_kategori_wisata === 3 ? 'temple' : 'highlands')}
                          alt={item.nama_wisata}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageFallback(e, item.id_kategori_wisata === 2 ? 'waterfall' : item.id_kategori_wisata === 3 ? 'temple' : 'highlands')}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedPreview(item)}
                          className="p-1.5 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenEditModal(item)}
                          className="p-1.5 rounded-md text-stone-500 hover:text-amber-600 hover:bg-stone-100 transition-colors"
                          title="Edit Wisata"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Yakin ingin menghapus objek wisata "${item.nama_wisata}"?`)) {
                              onDeleteItem(item.id_wisata);
                            }
                          }}
                          className="p-1.5 rounded-md text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Wisata"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Preview */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="relative h-56 bg-stone-900">
              <img
                src={getSafeImageUrl(selectedPreview.foto_wisata, selectedPreview.id_kategori_wisata === 2 ? 'waterfall' : selectedPreview.id_kategori_wisata === 3 ? 'temple' : 'highlands')}
                alt={selectedPreview.nama_wisata}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageFallback(e, selectedPreview.id_kategori_wisata === 2 ? 'waterfall' : selectedPreview.id_kategori_wisata === 3 ? 'temple' : 'highlands')}
              />
              <button
                onClick={() => setSelectedPreview(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                aria-label="Tutup jendela rincian"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-xs text-stone-500 flex items-center gap-2 mb-1">
                  <span>{selectedPreview.kategori_wisata || 'Wisata'}</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">ID #{selectedPreview.id_wisata}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-stone-900">
                  {selectedPreview.nama_wisata}
                </h3>
                <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{selectedPreview.alamat_wisata}</span>
                </p>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                {selectedPreview.deskripsi_wisata}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Tiket Dewasa</span>
                  <p className="font-mono font-bold text-stone-900 text-sm mt-0.5 tabular-nums">
                    {selectedPreview.harga_tiket_dewasa}
                  </p>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Tiket Anak</span>
                  <p className="font-mono font-bold text-stone-900 text-sm mt-0.5 tabular-nums">
                    {selectedPreview.harga_tiket_anak}
                  </p>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Jam Operasional</span>
                  <p className="font-bold text-stone-900 mt-0.5">{selectedPreview.jam_buka}</p>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Nomor Telepon</span>
                  <p className="font-bold text-stone-900 mt-0.5">{selectedPreview.nomor_telepon || '-'}</p>
                </div>
              </div>

              {selectedPreview.url_lokasi && (
                <a
                  href={selectedPreview.url_lokasi}
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
