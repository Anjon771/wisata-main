import React, { useState } from 'react';
import {
  LayoutDashboard,
  Mountain,
  Waves,
  Landmark,
  Plus,
  UtensilsCrossed,
  BedDouble,
  Image,
  Users,
  Mail,
  Code2,
  ChevronDown,
  ChevronRight,
  LogOut,
  MapPin,
  Compass
} from 'lucide-react';

export type ActivePage =
  | 'dashboard'
  | 'wisata-pegunungan'
  | 'wisata-air'
  | 'wisata-religi'
  | 'tambah-wisata'
  | 'daftar-restoran'
  | 'tambah-restoran'
  | 'daftar-penginapan'
  | 'tambah-penginapan'
  | 'galeri-wisata'
  | 'galeri-restoran'
  | 'galeri-penginapan'
  | 'subscriber'
  | 'mail-info'
  | 'api-explorer';

interface SidebarProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  unreadSubscribers: number;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  isOpen,
  onCloseMobile,
  unreadSubscribers,
  onLogout,
}) => {
  const [wisataOpen, setWisataOpen] = useState(true);
  const [restoranOpen, setRestoranOpen] = useState(true);
  const [penginapanOpen, setPenginapanOpen] = useState(true);
  const [galeriOpen, setGaleriOpen] = useState(false);

  const handleNav = (page: ActivePage) => {
    onSelectPage(page);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-2xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-stone-900 text-stone-300 flex flex-col border-r border-stone-800 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand header */}
        <div className="h-16 px-5 border-b border-stone-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-xs font-mono">
              DL
            </span>
            <div>
              <h2 className="font-display font-bold text-white tracking-tight text-sm leading-tight">
                Dolano Console
              </h2>
              <span className="text-[11px] text-stone-400 font-normal">
                Sistem Tata Kelola Wisata
              </span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-xs select-none">
          {/* Dashboard */}
          <button
            onClick={() => handleNav('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              activePage === 'dashboard'
                ? 'bg-stone-800 text-white font-semibold'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-stone-300" />
            <span>Ringkasan Dashboard</span>
          </button>

          {/* Wisata Section */}
          <div className="pt-3">
            <button
              onClick={() => setWisataOpen(!wisataOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-stone-400 hover:text-stone-200 font-semibold text-[11px] tracking-wider uppercase"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-stone-400" />
                <span>Destinasi Wisata</span>
              </div>
              {wisataOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {wisataOpen && (
              <div className="pl-2 space-y-0.5 mt-1 border-l border-stone-800 ml-3">
                <button
                  onClick={() => handleNav('wisata-pegunungan')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'wisata-pegunungan'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                  }`}
                >
                  <Mountain className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Wisata Pegunungan</span>
                </button>
                <button
                  onClick={() => handleNav('wisata-air')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'wisata-air'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                  }`}
                >
                  <Waves className="w-3.5 h-3.5 text-blue-400" />
                  <span>Wisata Air & Tirta</span>
                </button>
                <button
                  onClick={() => handleNav('wisata-religi')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'wisata-religi'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-purple-400" />
                  <span>Wisata Religi & Sejarah</span>
                </button>
                <button
                  onClick={() => handleNav('tambah-wisata')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'tambah-wisata'
                      ? 'bg-stone-800 text-amber-300 font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-amber-300'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tambah Objek Wisata</span>
                </button>
              </div>
            )}
          </div>

          {/* Restoran Section */}
          <div className="pt-2">
            <button
              onClick={() => setRestoranOpen(!restoranOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-stone-400 hover:text-stone-200 font-semibold text-[11px] tracking-wider uppercase"
            >
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-3.5 h-3.5 text-stone-400" />
                <span>Kuliner & Restoran</span>
              </div>
              {restoranOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {restoranOpen && (
              <div className="pl-2 space-y-0.5 mt-1 border-l border-stone-800 ml-3">
                <button
                  onClick={() => handleNav('daftar-restoran')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'daftar-restoran'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                  }`}
                >
                  <span>Daftar Restoran</span>
                </button>
                <button
                  onClick={() => handleNav('tambah-restoran')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'tambah-restoran'
                      ? 'bg-stone-800 text-amber-300 font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-amber-300'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tambah Restoran Baru</span>
                </button>
              </div>
            )}
          </div>

          {/* Penginapan Section */}
          <div className="pt-2">
            <button
              onClick={() => setPenginapanOpen(!penginapanOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-stone-400 hover:text-stone-200 font-semibold text-[11px] tracking-wider uppercase"
            >
              <div className="flex items-center gap-2">
                <BedDouble className="w-3.5 h-3.5 text-stone-400" />
                <span>Penginapan & Hotel</span>
              </div>
              {penginapanOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {penginapanOpen && (
              <div className="pl-2 space-y-0.5 mt-1 border-l border-stone-800 ml-3">
                <button
                  onClick={() => handleNav('daftar-penginapan')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'daftar-penginapan'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                  }`}
                >
                  <span>Daftar Penginapan</span>
                </button>
                <button
                  onClick={() => handleNav('tambah-penginapan')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'tambah-penginapan'
                      ? 'bg-stone-800 text-amber-300 font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-amber-300'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tambah Penginapan Baru</span>
                </button>
              </div>
            )}
          </div>

          {/* Galeri Section */}
          <div className="pt-2">
            <button
              onClick={() => setGaleriOpen(!galeriOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-stone-400 hover:text-stone-200 font-semibold text-[11px] tracking-wider uppercase"
            >
              <div className="flex items-center gap-2">
                <Image className="w-3.5 h-3.5 text-stone-400" />
                <span>Galeri Fotografi</span>
              </div>
              {galeriOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {galeriOpen && (
              <div className="pl-2 space-y-0.5 mt-1 border-l border-stone-800 ml-3">
                <button
                  onClick={() => handleNav('galeri-wisata')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'galeri-wisata'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                  }`}
                >
                  <span>Galeri Objek Wisata</span>
                </button>
                <button
                  onClick={() => handleNav('galeri-restoran')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'galeri-restoran'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                  }`}
                >
                  <span>Galeri Restoran</span>
                </button>
                <button
                  onClick={() => handleNav('galeri-penginapan')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activePage === 'galeri-penginapan'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                  }`}
                >
                  <span>Galeri Penginapan</span>
                </button>
              </div>
            )}
          </div>

          {/* Subscribers & Messages */}
          <div className="pt-3">
            <button
              onClick={() => handleNav('subscriber')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors ${
                activePage === 'subscriber'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-stone-300" />
                <span>Pelanggan Buletin</span>
              </div>
              {unreadSubscribers > 0 && (
                <span className="font-mono tabular-nums text-[11px] text-amber-400 font-semibold">
                  {unreadSubscribers} baru
                </span>
              )}
            </button>
          </div>

          {/* Mail Broadcast */}
          <div>
            <button
              onClick={() => handleNav('mail-info')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activePage === 'mail-info'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
              }`}
            >
              <Mail className="w-4 h-4 text-stone-300" />
              <span>Broadcast Newsletter</span>
            </button>
          </div>

          {/* APIs & Developer */}
          <div>
            <button
              onClick={() => handleNav('api-explorer')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activePage === 'api-explorer'
                  ? 'bg-stone-800 text-amber-300 font-semibold'
                  : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
              }`}
            >
              <Code2 className="w-4 h-4 text-stone-300" />
              <span>Katalog API (/apis)</span>
            </button>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-stone-800/80">
          <div className="text-[11px] text-stone-400 flex items-center justify-between">
            <span>Versi Rilis</span>
            <span className="font-mono text-stone-300">1.0.0</span>
          </div>
          <button
            onClick={onLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 text-xs text-stone-400 hover:text-rose-400 hover:bg-stone-800/80 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Tutup Sesi Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
};
