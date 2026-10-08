import React, { useState } from 'react';
import { User, Lock, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, pass: string) => Promise<boolean>;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [remember, setRemember] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const ok = await onLogin(username, password);
      if (!ok) {
        setErrorMsg('Maaf, periksa kembali username dan password Anda.');
      } else {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setUsername('admin');
    setPassword('admin123');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
        {/* Brand header */}
        <div className="bg-stone-900 text-white p-7 text-center space-y-2 border-b border-stone-800">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 font-display font-black text-lg mx-auto flex items-center justify-center shadow-sm">
            D
          </div>
          <h2 className="font-display text-xl font-bold tracking-tight">Konsol Admin Dolano</h2>
          <p className="text-xs text-stone-400">Masuk untuk mengelola data pariwisata daerah</p>
        </div>

        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Nama Pengguna</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Username admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-600">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded text-stone-900 border-stone-300"
                />
                <span>Ingat sesi</span>
              </label>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-stone-900 hover:underline font-semibold"
              >
                Isi Baku (admin)
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-stone-900 text-white rounded-lg font-bold hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Memverifikasi...' : 'Masuk Sesi Pengelola'}
            </button>
          </form>

          <button
            onClick={onClose}
            className="w-full text-center text-xs text-stone-400 hover:text-stone-600 py-1"
          >
            Batal / Kembali ke Portal Publik
          </button>
        </div>
      </div>
    </div>
  );
};
