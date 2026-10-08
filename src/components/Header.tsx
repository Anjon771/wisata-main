import React, { useState, useRef, useEffect } from 'react';
import { Menu, Globe, LayoutDashboard, LogOut, Bell, Type, Check, ChevronDown } from 'lucide-react';

export type FontTheme = 'editorial' | 'adventure' | 'heritage' | 'contemporary';

interface HeaderProps {
  unreadCount: number;
  onOpenNotifications: () => void;
  onToggleSidebar: () => void;
  isVisitorMode: boolean;
  onToggleVisitorMode: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  adminName: string;
  fontTheme: FontTheme;
  onChangeFontTheme: (theme: FontTheme) => void;
}

export const Header: React.FC<HeaderProps> = ({
  unreadCount,
  onOpenNotifications,
  onToggleSidebar,
  isVisitorMode,
  onToggleVisitorMode,
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
  adminName,
  fontTheme,
  onChangeFontTheme,
}) => {
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const fontMenuRef = useRef<HTMLDivElement>(null);

  // Close font menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fontMenuRef.current && !fontMenuRef.current.contains(e.target as Node)) {
        setIsFontMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fontOptions: { id: FontTheme; label: string; preview: string; desc: string }[] = [
    {
      id: 'editorial',
      label: 'Editorial Serif',
      preview: 'Playfair Display',
      desc: 'Elegan majalah wisata mewah & klasik'
    },
    {
      id: 'adventure',
      label: 'Modern Adventure',
      preview: 'Outfit Sans',
      desc: 'Bersih, modern & bertenaga'
    },
    {
      id: 'heritage',
      label: 'Cagar & Budaya',
      preview: 'Cinzel Classic',
      desc: 'Megah & sarat nuansa historis'
    },
    {
      id: 'contemporary',
      label: 'Kontemporer',
      preview: 'Syne Display',
      desc: 'Karakter artistik studio desain'
    }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <div className="flex items-center gap-3">
          {!isVisitorMode && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 -ml-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-stone-900"
              title="Toggle Menu"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (!isVisitorMode) onToggleVisitorMode();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-sm shadow-2xs group-hover:bg-stone-800 transition-colors">
              D
            </span>
            <span className="font-display font-extrabold text-xl text-stone-900 tracking-tight">
              Dolano
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Clean text links with hover transitions, no pills) */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-stone-600 tracking-wide">
          {isVisitorMode ? (
            <>
              <a href="#destinasi" className="hover:text-stone-950 transition-colors">Destinasi</a>
              <a href="#pengalaman" className="hover:text-stone-950 transition-colors">Pengalaman</a>
              <a href="#itinerary" className="hover:text-stone-950 transition-colors">Itinerari</a>
              <a href="#kalkulator" className="hover:text-stone-950 transition-colors">Kalkulator</a>
              <a href="#kuliner" className="hover:text-stone-950 transition-colors">Kuliner</a>
              <a href="#penginapan" className="hover:text-stone-950 transition-colors">Penginapan</a>
              <a href="#panduan-cuaca" className="hover:text-stone-950 transition-colors">Cuaca & Tips</a>
              <a href="#galeri-foto" className="hover:text-stone-950 transition-colors">Galeri</a>
              <a href="#testimoni" className="hover:text-stone-950 transition-colors">Ulasan</a>
            </>
          ) : (
            <div className="flex items-center gap-2 text-stone-500 normal-case font-medium text-xs">
              <span className="text-stone-400">Konsol Pengelola</span>
              <span className="text-stone-300">/</span>
              <span className="text-stone-800 font-semibold">Pariwisata & Rekreasi Daerah</span>
            </div>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          {/* Typography Font Switcher Dropdown */}
          <div className="relative" ref={fontMenuRef}>
            <button
              onClick={() => setIsFontMenuOpen(!isFontMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200/90 hover:border-stone-400 bg-white text-stone-700 hover:text-stone-900 text-xs font-medium transition-colors"
              title="Ganti Font Teks"
              aria-label="Pilih tipografi dan jenis huruf"
            >
              <Type className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Font</span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isFontMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFontMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1.5 border-b border-stone-100 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Pilih Gaya Tipografi
                </div>
                <div className="space-y-1 mt-1">
                  {fontOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onChangeFontTheme(opt.id);
                        setIsFontMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        fontTheme === opt.id
                          ? 'bg-stone-900 text-white font-semibold'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div>
                        <div className="font-medium flex items-center gap-1.5">
                          <span>{opt.label}</span>
                          <span className={`text-[10px] ${fontTheme === opt.id ? 'text-amber-300' : 'text-stone-400'}`}>
                            ({opt.preview})
                          </span>
                        </div>
                        <p className={`text-[10px] ${fontTheme === opt.id ? 'text-stone-300' : 'text-stone-500'} mt-0.5`}>
                          {opt.desc}
                        </p>
                      </div>
                      {fontTheme === opt.id && <Check className="w-4 h-4 text-amber-300 shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mode Switcher Button */}
          <button
            onClick={onToggleVisitorMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-colors border ${
              isVisitorMode
                ? 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
                : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/80 hover:text-stone-900'
            }`}
          >
            {isVisitorMode ? (
              <>
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Admin</span>
              </>
            ) : (
              <>
                <Globe className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Website</span>
              </>
            )}
          </button>

          {!isVisitorMode && isLoggedIn && (
            <>
              {/* Unread Subscribers Notification */}
              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                title="Pesan Subscriber Baru"
                aria-label="Pemberitahuan pesan subscriber"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amber-600 text-white text-[10px] font-mono tabular-nums font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Admin profile & logout */}
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <div className="w-7 h-7 rounded-md bg-stone-900 text-amber-300 flex items-center justify-center text-xs font-bold font-mono">
                  AD
                </div>
                <div className="hidden lg:block text-left text-xs leading-none">
                  <p className="font-semibold text-stone-800 truncate max-w-[130px]">{adminName}</p>
                </div>
                <button
                  onClick={onLogoutClick}
                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Keluar Sesi"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          {isVisitorMode && (
            <a
              href="#buletin"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-amber-400 text-stone-950 font-bold text-xs hover:bg-amber-300 transition-colors"
            >
              Langganan
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
