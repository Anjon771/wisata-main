import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, ExternalLink, Search, Eye, Phone, Clock } from 'lucide-react';
import { Restoran } from '../types';

interface RestoranListViewProps {
  restoranList: Restoran[];
  onOpenAddModal: () => void;
  onOpenEditModal: (item: Restoran) => void;
  onDeleteItem: (id: number) => void;
}

export const RestoranListView: React.FC<RestoranListViewProps> = ({
  restoranList,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteItem,
}) => {
  const [search, setSearch] = useState('');
  const [selectedPreview, setSelectedPreview] = useState<Restoran | null>(null);

  const filtered = restoranList.filter(item =>
    item.nama_restoran.toLowerCase().includes(search.toLowerCase()) ||
    item.alamat_restoran.toLowerCase().includes(search.toLowerCase()) ||
    (item.menu_favorit && item.menu_favorit.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Mitra Kuliner
          </span>
          <h1 className="font-display text-3xl font-bold text-stone-900 tracking-tight">
            Daftar Kuliner & Restoran
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Pengelolaan rumah makan tradisional, menu andalan khas Jawa Timur, jam operasional serta kontak
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Tambah Restoran</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Cari restoran atau menu hidangan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
          />
        </div>
        <div className="text-xs text-stone-600 font-medium">
          Menampilkan <span className="font-mono font-bold text-stone-900 tabular-nums">{filtered.length}</span> tempat makan
        </div>
      </div>

      {/* High-Density Data Grid */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 uppercase text-[10px] font-semibold tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Restoran</th>
                <th className="py-3 px-4">Alamat & Lokasi</th>
                <th className="py-3 px-4">Jam Buka</th>
                <th className="py-3 px-4">Menu Andalan</th>
                <th className="py-3 px-4 text-center">Foto</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400 text-xs">
                    Tidak ditemukan restoran yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr key={item.id_restoran} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-stone-400 tabular-nums">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900 text-xs">{item.nama_restoran}</div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{item.nomor_telepon || 'Kontak tidak dicantumkan'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="line-clamp-1 text-stone-700">{item.alamat_restoran}</p>
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
                    <td className="py-3 px-4 text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{item.jam_buka}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs text-stone-700 font-medium">
                      <p className="line-clamp-1">{item.menu_favorit || 'Masakan Tradisional'}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div
                        onClick={() => setSelectedPreview(item)}
                        className="w-12 h-10 rounded-md overflow-hidden bg-stone-100 mx-auto border border-stone-200 cursor-pointer hover:opacity-85 transition-opacity"
                      >
                        <img
                          src={item.foto_restoran}
                          alt={item.nama_restoran}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/src/assets/images/restaurant_indonesian_culinary_1791445115848.jpg';
                          }}
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
                          title="Edit Restoran"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus restoran "${item.nama_restoran}"?`)) {
                              onDeleteItem(item.id_restoran);
                            }
                          }}
                          className="p-1.5 rounded-md text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Restoran"
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
                src={selectedPreview.foto_restoran}
                alt={selectedPreview.nama_restoran}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/restaurant_indonesian_culinary_1791445115848.jpg';
                }}
              />
              <button
                onClick={() => setSelectedPreview(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-xs text-stone-500 flex items-center gap-2 mb-1">
                  <span>Kuliner & Restoran</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">ID #{selectedPreview.id_restoran}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-stone-900">
                  {selectedPreview.nama_restoran}
                </h3>
                <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{selectedPreview.alamat_restoran}</span>
                </p>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                {selectedPreview.deskripsi_restoran}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Jam Buka</span>
                  <p className="font-bold text-stone-900 mt-0.5">{selectedPreview.jam_buka}</p>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Nomor Telepon</span>
                  <p className="font-bold text-stone-900 mt-0.5">{selectedPreview.nomor_telepon || '-'}</p>
                </div>
              </div>

              {selectedPreview.menu_favorit && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold block">Menu Andalan / Rekomendasi</span>
                  <p className="text-xs font-semibold text-stone-900 mt-1">{selectedPreview.menu_favorit}</p>
                </div>
              )}

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
