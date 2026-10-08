import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, ExternalLink, Search, Eye, Phone, Clock, BedDouble } from 'lucide-react';
import { Penginapan } from '../types';
import { getSafeImageUrl, handleImageFallback } from '../utils/imageHelper';

interface PenginapanListViewProps {
  penginapanList: Penginapan[];
  onOpenAddModal: () => void;
  onOpenEditModal: (item: Penginapan) => void;
  onDeleteItem: (id: number) => void;
}

export const PenginapanListView: React.FC<PenginapanListViewProps> = ({
  penginapanList,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteItem,
}) => {
  const [search, setSearch] = useState('');
  const [selectedPreview, setSelectedPreview] = useState<Penginapan | null>(null);

  const filtered = penginapanList.filter(item =>
    item.nama_penginapan.toLowerCase().includes(search.toLowerCase()) ||
    item.alamat_penginapan.toLowerCase().includes(search.toLowerCase()) ||
    (item.fasilitas && item.fasilitas.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Akomodasi & Inap
          </span>
          <h1 className="font-display text-3xl font-bold text-stone-900 tracking-tight">
            Daftar Penginapan & Hotel
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Data resort pegunungan, villa glamping, kamar hotel berbintang dan homestay rekanan Dolano
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Tambah Penginapan</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Cari hotel, villa atau fasilitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
          />
        </div>
        <div className="text-xs text-stone-600 font-medium">
          Menampilkan <span className="font-mono font-bold text-stone-900 tabular-nums">{filtered.length}</span> tempat menginap
        </div>
      </div>

      {/* High-Density Data Grid */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 uppercase text-[10px] font-semibold tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Penginapan</th>
                <th className="py-3 px-4">Alamat & Lokasi</th>
                <th className="py-3 px-4 text-right">Tarif Mulai</th>
                <th className="py-3 px-4">Fasilitas Utama</th>
                <th className="py-3 px-4 text-center">Foto</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400 text-xs">
                    Belum ada fasilitas penginapan yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr key={item.id_penginapan} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-stone-400 tabular-nums">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900 text-xs">{item.nama_penginapan}</div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{item.nomor_telepon || 'Kontak tidak dicantumkan'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="line-clamp-1 text-stone-700">{item.alamat_penginapan}</p>
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
                        {item.harga_mulai || 'Hubungi Kontak'}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {item.jam_buka}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs text-stone-700">
                      <p className="line-clamp-1 text-[11px]">{item.fasilitas || 'Standar Hotel'}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div
                        onClick={() => setSelectedPreview(item)}
                        className="w-12 h-10 rounded-md overflow-hidden bg-stone-100 mx-auto border border-stone-200 cursor-pointer hover:opacity-85 transition-opacity"
                      >
                        <img
                          src={getSafeImageUrl(item.foto_penginapan, 'resort')}
                          alt={item.nama_penginapan}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageFallback(e, 'resort')}
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
                          title="Edit Penginapan"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus penginapan "${item.nama_penginapan}"?`)) {
                              onDeleteItem(item.id_penginapan);
                            }
                          }}
                          className="p-1.5 rounded-md text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Penginapan"
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
                src={getSafeImageUrl(selectedPreview.foto_penginapan, 'resort')}
                alt={selectedPreview.nama_penginapan}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageFallback(e, 'resort')}
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
                  <span>Akomodasi Inap</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">ID #{selectedPreview.id_penginapan}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-stone-900">
                  {selectedPreview.nama_penginapan}
                </h3>
                <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{selectedPreview.alamat_penginapan}</span>
                </p>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                {selectedPreview.deskripsi_penginapan}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Tarif Mulai</span>
                  <p className="font-mono font-bold text-stone-900 text-sm mt-0.5 tabular-nums">
                    {selectedPreview.harga_mulai}
                  </p>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Waktu Layanan</span>
                  <p className="font-bold text-stone-900 mt-0.5">{selectedPreview.jam_buka}</p>
                </div>
              </div>

              {selectedPreview.fasilitas && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold block">Fasilitas Akomodasi</span>
                  <p className="text-xs font-semibold text-stone-900 mt-1">{selectedPreview.fasilitas}</p>
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
