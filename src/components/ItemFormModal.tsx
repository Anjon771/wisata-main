import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Wisata, Restoran, Penginapan } from '../types';

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'wisata' | 'restoran' | 'penginapan';
  editItem?: Wisata | Restoran | Penginapan | null;
  onSave: (type: 'wisata' | 'restoran' | 'penginapan', data: any) => Promise<void>;
}

export const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  onClose,
  type,
  editItem,
  onSave,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editItem) {
      setFormData({ ...editItem });
    } else {
      // Default initial fields
      if (type === 'wisata') {
        setFormData({
          nama_wisata: '',
          alamat_wisata: '',
          url_lokasi: '',
          peta_area: '',
          nomor_telepon: '',
          jam_buka: '08:00 - 17:00 WIB',
          harga_tiket_dewasa: 'Rp 20.000',
          harga_tiket_anak: 'Rp 10.000',
          id_kategori_wisata: 1,
          video_youtube: '',
          facebook: '',
          instagram: '',
          youtube: '',
          deskripsi_wisata: '',
          foto_wisata: '/src/assets/images/dolano_hero_highlands_1791445064718.jpg'
        });
      } else if (type === 'restoran') {
        setFormData({
          nama_restoran: '',
          alamat_restoran: '',
          url_lokasi: '',
          peta_area: '',
          nomor_telepon: '',
          jam_buka: '09:00 - 21:00 WIB',
          menu_favorit: '',
          video_youtube: '',
          facebook: '',
          instagram: '',
          youtube: '',
          deskripsi_restoran: '',
          foto_restoran: '/src/assets/images/restaurant_indonesian_culinary_1791445115848.jpg'
        });
      } else {
        setFormData({
          nama_penginapan: '',
          alamat_penginapan: '',
          url_lokasi: '',
          peta_area: '',
          nomor_telepon: '',
          jam_buka: 'Check-in 14:00 · Check-out 12:00',
          harga_mulai: 'Rp 500.000 / malam',
          fasilitas: 'WiFi, Sarapan, Parkir',
          video_youtube: '',
          facebook: '',
          instagram: '',
          youtube: '',
          deskripsi_penginapan: '',
          foto_penginapan: '/src/assets/images/resort_villa_ecolodge_1791445128054.jpg'
        });
      }
    }
  }, [editItem, type, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === 'id_kategori_wisata' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(type, formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleText = editItem
    ? `Edit ${type === 'wisata' ? 'Objek Wisata' : type === 'restoran' ? 'Restoran' : 'Penginapan'}`
    : `Tambah ${type === 'wisata' ? 'Destinasi Wisata' : type === 'restoran' ? 'Restoran' : 'Penginapan'} Baru`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-stone-900">{titleText}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Tutup formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Main Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                {type === 'wisata' ? 'Nama Objek Wisata *' : type === 'restoran' ? 'Nama Restoran *' : 'Nama Penginapan *'}
              </label>
              <input
                type="text"
                name={type === 'wisata' ? 'nama_wisata' : type === 'restoran' ? 'nama_restoran' : 'nama_penginapan'}
                value={
                  type === 'wisata' ? formData.nama_wisata || '' :
                  type === 'restoran' ? formData.nama_restoran || '' :
                  formData.nama_penginapan || ''
                }
                onChange={handleChange}
                required
                placeholder="Contoh: Coban Rondo, Inggil Resto"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            {type === 'wisata' ? (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Kategori Wisata *</label>
                <select
                  name="id_kategori_wisata"
                  value={formData.id_kategori_wisata || 1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
                >
                  <option value={1}>Pegunungan (Gunung, Kaldera, Bukit)</option>
                  <option value={2}>Wisata Air (Air Terjun, Danau, Pantai)</option>
                  <option value={3}>Wisata Religi (Masjid, Candi, Pura)</option>
                </select>
              </div>
            ) : type === 'restoran' ? (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Menu Andalan / Rekomendasi</label>
                <input
                  type="text"
                  name="menu_favorit"
                  value={formData.menu_favorit || ''}
                  onChange={handleChange}
                  placeholder="Contoh: Gurame Bakar, Rawon Buntut"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            ) : (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Tarif Mulai</label>
                <input
                  type="text"
                  name="harga_mulai"
                  value={formData.harga_mulai || ''}
                  onChange={handleChange}
                  placeholder="Contoh: Rp 650.000 / malam"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            )}
          </div>

          {/* Alamat & Maps URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Alamat Lengkap *</label>
              <input
                type="text"
                name={type === 'wisata' ? 'alamat_wisata' : type === 'restoran' ? 'alamat_restoran' : 'alamat_penginapan'}
                value={
                  type === 'wisata' ? formData.alamat_wisata || '' :
                  type === 'restoran' ? formData.alamat_restoran || '' :
                  formData.alamat_penginapan || ''
                }
                onChange={handleChange}
                required
                placeholder="Jl. Raya Wisata, Malang"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Tautan Peta Google Maps</label>
              <input
                type="text"
                name="url_lokasi"
                value={formData.url_lokasi || ''}
                onChange={handleChange}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
          </div>

          {/* Jam & Telepon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Nomor Telepon</label>
              <input
                type="text"
                name="nomor_telepon"
                value={formData.nomor_telepon || ''}
                onChange={handleChange}
                placeholder="0812-xxxx-xxxx"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Jam Operasional</label>
              <input
                type="text"
                name="jam_buka"
                value={formData.jam_buka || ''}
                onChange={handleChange}
                placeholder="08:00 - 17:00 WIB"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            {type === 'wisata' ? (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Tiket Masuk Dewasa</label>
                <input
                  type="text"
                  name="harga_tiket_dewasa"
                  value={formData.harga_tiket_dewasa || ''}
                  onChange={handleChange}
                  placeholder="Rp 25.000"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            ) : type === 'penginapan' ? (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Fasilitas Kamar</label>
                <input
                  type="text"
                  name="fasilitas"
                  value={formData.fasilitas || ''}
                  onChange={handleChange}
                  placeholder="WiFi, Kolam Renang, Spa"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            ) : (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Titik Koordinat Peta</label>
                <input
                  type="text"
                  name="peta_area"
                  value={formData.peta_area || ''}
                  onChange={handleChange}
                  placeholder="-7.978, 112.631"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            )}
          </div>

          {/* Foto URL */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">URL / Jalur Foto Sampul</label>
            <input
              type="text"
              name={type === 'wisata' ? 'foto_wisata' : type === 'restoran' ? 'foto_restoran' : 'foto_penginapan'}
              value={
                type === 'wisata' ? formData.foto_wisata || '' :
                type === 'restoran' ? formData.foto_restoran || '' :
                formData.foto_penginapan || ''
              }
              onChange={handleChange}
              placeholder="/src/assets/images/..."
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 font-mono text-[11px]"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1">Deskripsi Naratif</label>
            <textarea
              rows={3}
              name={type === 'wisata' ? 'deskripsi_wisata' : type === 'restoran' ? 'deskripsi_restoran' : 'deskripsi_penginapan'}
              value={
                type === 'wisata' ? formData.deskripsi_wisata || '' :
                type === 'restoran' ? formData.deskripsi_restoran || '' :
                formData.deskripsi_penginapan || ''
              }
              onChange={handleChange}
              placeholder="Ulasan daya tarik keindahan, panorama khas, dan informasi bagi pengunjung..."
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-100 font-semibold transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 flex items-center gap-1.5 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Data'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
