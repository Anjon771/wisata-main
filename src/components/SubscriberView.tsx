import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, Search, Users } from 'lucide-react';
import { Subscriber } from '../types';

interface SubscriberViewProps {
  subscribers: Subscriber[];
  onMarkAllRead: () => void;
  onSendNewsletter: (type: 'wisata' | 'restoran' | 'penginapan', subject: string, message: string) => Promise<boolean>;
}

export const SubscriberView: React.FC<SubscriberViewProps> = ({
  subscribers,
  onMarkAllRead,
  onSendNewsletter,
}) => {
  const [search, setSearch] = useState('');
  const [mailType, setMailType] = useState<'wisata' | 'restoran' | 'penginapan'>('wisata');
  const [subject, setSubject] = useState('Pembaruan Kalender Wisata & Rekreasi Dolano');
  const [message, setMessage] = useState('Salam hangat penjelajah Dolano! Kami telah memperbarui daftar objek wisata pegunungan, reservasi glamping, dan rekomendasi kuliner terbaru untuk perjalanan Anda.');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.nama.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = subscribers.filter(s => s.status_pesan === 'Belum terbaca').length;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendSuccess(null);
    try {
      await onSendNewsletter(mailType, subject, message);
      setSendSuccess(`Surel pemberitahuan berhasil dikirimkan kepada ${subscribers.filter(s => s.status === 'Mengikuti').length} pelanggan aktif terdaftar.`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Komunikasi & Pelanggan
          </span>
          <h1 className="font-display text-3xl font-bold text-stone-900 tracking-tight">
            Data Pelanggan Buletin & Broadcast
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Pengelolaan kontak surel pengunjung, status langganan buletin berkala dan mesin pengiriman info
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-stone-600" />
            <span>Tandai Semua Terbaca ({unreadCount})</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Subscribers */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-center justify-between shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                placeholder="Cari email atau nama pelanggan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <span className="text-xs text-stone-600 font-medium">
              Total <span className="font-mono font-bold text-stone-900 tabular-nums">{filtered.length}</span> Pelanggan
            </span>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 uppercase text-[10px] font-semibold tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">No</th>
                    <th className="py-3 px-4">Nama Pelanggan</th>
                    <th className="py-3 px-4">Alamat Surel</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Pesan</th>
                    <th className="py-3 px-4 text-right">Tanggal Gabung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-stone-400 text-xs">
                        Tidak ditemukan data pelanggan buletin yang sesuai.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item, idx) => (
                      <tr key={item.id_subscriber} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3 px-4 text-center font-mono text-stone-400 tabular-nums">{idx + 1}</td>
                        <td className="py-3 px-4 font-semibold text-stone-900">{item.nama}</td>
                        <td className="py-3 px-4 font-mono text-stone-700 text-[11px]">{item.email}</td>
                        <td className="py-3 px-4">
                          <span className="text-stone-700 font-medium">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-medium ${
                            item.status_pesan === 'Belum terbaca' ? 'text-amber-700 font-semibold' : 'text-stone-400'
                          }`}>
                            {item.status_pesan}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-stone-500 font-mono text-[11px] tabular-nums">
                          {item.tanggal_bergabung}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mail Sender Form */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
            <span className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-display font-bold text-sm text-stone-900">Kirim Broadcast Buletin</h3>
              <p className="text-[11px] text-stone-500">Kirim surel pemberitahuan ke subscriber aktif</p>
            </div>
          </div>

          {sendSuccess && (
            <div className="p-3 bg-stone-100 border border-stone-300 rounded-lg flex items-start gap-2 text-xs text-stone-900">
              <CheckCircle2 className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
              <span>{sendSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Kategori Buletin</label>
              <select
                value={mailType}
                onChange={(e) => setMailType(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
              >
                <option value="wisata">Pembaruan Wisata & Destinasi</option>
                <option value="restoran">Rekomendasi Kuliner & Restoran</option>
                <option value="penginapan">Promo Akomodasi & Penginapan</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Subjek Surel</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Isi Pesan Siaran</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>{isSending ? 'Sedang Mengirimkan...' : 'Kirim Siaran Sekarang'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
