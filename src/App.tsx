import React, { useState, useEffect } from 'react';
import { Header, FontTheme } from './components/Header';
import { Sidebar, ActivePage } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { WisataListView } from './components/WisataListView';
import { RestoranListView } from './components/RestoranListView';
import { PenginapanListView } from './components/PenginapanListView';
import { GaleriView } from './components/GaleriView';
import { SubscriberView } from './components/SubscriberView';
import { ApiExplorerView } from './components/ApiExplorerView';
import { LandingPageView } from './components/LandingPageView';
import { LoginModal } from './components/LoginModal';
import { ItemFormModal } from './components/ItemFormModal';
import { initialWisata, initialRestoran, initialPenginapan, initialSubscribers } from './data/mockData';
import { Wisata, Restoran, Penginapan, Subscriber } from './types';

export function App() {
  const [wisataList, setWisataList] = useState<Wisata[]>(initialWisata);
  const [restoranList, setRestoranList] = useState<Restoran[]>(initialRestoran);
  const [penginapanList, setPenginapanList] = useState<Penginapan[]>(initialPenginapan);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);

  // Navigation & UI state - Defaults to the Full Landing Page Website
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [isVisitorMode, setIsVisitorMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState({ name: 'Administrator Dolano', role: 'Superadmin' });

  // Font Theme State (Editorial Playfair Display default, with Outfit, Cinzel, and Syne options)
  const [fontTheme, setFontTheme] = useState<FontTheme>(() => {
    try {
      return (localStorage.getItem('dolano_font_theme') as FontTheme) || 'editorial';
    } catch {
      return 'editorial';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-font-theme', fontTheme);
    try {
      localStorage.setItem('dolano_font_theme', fontTheme);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [fontTheme]);

  // Modal State for Add / Edit
  const [formModalState, setFormModalState] = useState<{
    isOpen: boolean;
    type: 'wisata' | 'restoran' | 'penginapan';
    editItem: any | null;
  }>({
    isOpen: false,
    type: 'wisata',
    editItem: null
  });

  // Fetch initial data from server APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wRes, rRes, pRes, sRes] = await Promise.all([
          fetch('/api/wisata').then(r => r.ok ? r.json() : null),
          fetch('/api/restoran').then(r => r.ok ? r.json() : null),
          fetch('/api/penginapan').then(r => r.ok ? r.json() : null),
          fetch('/api/subscribers').then(r => r.ok ? r.json() : null),
        ]);
        if (wRes) setWisataList(wRes);
        if (rRes) setRestoranList(rRes);
        if (pRes) setPenginapanList(pRes);
        if (sRes) setSubscribers(sRes);
      } catch (err) {
        console.warn('Using local fallback state:', err);
      }
    };
    fetchData();
  }, []);

  const unreadCount = subscribers.filter(s => s.status_pesan === 'Belum terbaca').length;

  // Handle Login
  const handleLogin = async (username: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass })
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        setAdminUser({ name: data.user.nama_lengkap, role: data.user.role });
        setIsVisitorMode(false);
        return true;
      }
      return false;
    } catch {
      // Local fallback
      setIsLoggedIn(true);
      setIsVisitorMode(false);
      return true;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsVisitorMode(true);
  };

  // Add / Edit Action Handlers
  const openAddModal = (type: 'wisata' | 'restoran' | 'penginapan') => {
    setFormModalState({ isOpen: true, type, editItem: null });
  };

  const openEditModal = (type: 'wisata' | 'restoran' | 'penginapan', item: any) => {
    setFormModalState({ isOpen: true, type, editItem: item });
  };

  const handleSaveItem = async (type: 'wisata' | 'restoran' | 'penginapan', data: any) => {
    const isEdit = !!formModalState.editItem;
    const url = isEdit
      ? `/api/${type}/${formModalState.editItem.id_wisata || formModalState.editItem.id_restoran || formModalState.editItem.id_penginapan}`
      : `/api/${type}`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const saved = await res.json();
        if (type === 'wisata') {
          setWisataList(prev => isEdit
            ? prev.map(w => w.id_wisata === saved.id_wisata ? saved : w)
            : [saved, ...prev]
          );
        } else if (type === 'restoran') {
          setRestoranList(prev => isEdit
            ? prev.map(r => r.id_restoran === saved.id_restoran ? saved : r)
            : [saved, ...prev]
          );
        } else {
          setPenginapanList(prev => isEdit
            ? prev.map(p => p.id_penginapan === saved.id_penginapan ? saved : p)
            : [saved, ...prev]
          );
        }
      }
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  // Delete Action Handlers
  const handleDeleteWisata = async (id: number) => {
    try {
      await fetch(`/api/wisata/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setWisataList(prev => prev.filter(w => w.id_wisata !== id));
  };

  const handleDeleteRestoran = async (id: number) => {
    try {
      await fetch(`/api/restoran/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setRestoranList(prev => prev.filter(r => r.id_restoran !== id));
  };

  const handleDeletePenginapan = async (id: number) => {
    try {
      await fetch(`/api/penginapan/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setPenginapanList(prev => prev.filter(p => p.id_penginapan !== id));
  };

  // Subscriber handlers
  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/subscribers/mark-read', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    setSubscribers(prev => prev.map(s => ({ ...s, status_pesan: 'Terbaca' })));
  };

  const handleSendNewsletter = async (type: string, subject: string, message: string): Promise<boolean> => {
    try {
      await fetch('/api/subscribers/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, subject, message })
      });
      return true;
    } catch {
      return true;
    }
  };

  const handleSubscribe = async (email: string, nama: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nama })
      });
      if (res.ok) {
        const data = await res.json();
        setSubscribers(prev => [data.subscriber, ...prev.filter(s => s.email !== email)]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col antialiased selection:bg-stone-900 selection:text-white">
      {/* Top Header */}
      <Header
        unreadCount={unreadCount}
        onOpenNotifications={() => {
          setIsVisitorMode(false);
          setActivePage('subscriber');
        }}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isVisitorMode={isVisitorMode}
        onToggleVisitorMode={() => setIsVisitorMode(!isVisitorMode)}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={handleLogout}
        adminName={adminUser.name}
        fontTheme={fontTheme}
        onChangeFontTheme={setFontTheme}
      />

      {/* Main Body */}
      {isVisitorMode ? (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LandingPageView
            wisataList={wisataList}
            restoranList={restoranList}
            penginapanList={penginapanList}
            onSubscribe={handleSubscribe}
            onOpenAdmin={() => setIsVisitorMode(false)}
          />
        </main>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Admin Sidebar */}
          <Sidebar
            activePage={activePage}
            onSelectPage={(p) => {
              if (p === 'tambah-wisata') {
                openAddModal('wisata');
              } else if (p === 'tambah-restoran') {
                openAddModal('restoran');
              } else if (p === 'tambah-penginapan') {
                openAddModal('penginapan');
              } else {
                setActivePage(p);
              }
            }}
            isOpen={isSidebarOpen}
            onCloseMobile={() => setIsSidebarOpen(false)}
            unreadSubscribers={unreadCount}
            onLogout={handleLogout}
          />

          {/* Admin Main Content Container */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 bg-stone-50">
            <div className="max-w-7xl mx-auto">
              {activePage === 'dashboard' && (
                <DashboardView
                  wisataList={wisataList}
                  restoranList={restoranList}
                  penginapanList={penginapanList}
                  subscribers={subscribers}
                  onNavigate={setActivePage}
                  onOpenAddModal={openAddModal}
                />
              )}

              {activePage === 'wisata-pegunungan' && (
                <WisataListView
                  kategoriId={1}
                  title="Wisata Pegunungan"
                  wisataList={wisataList}
                  onOpenAddModal={() => openAddModal('wisata')}
                  onOpenEditModal={(item) => openEditModal('wisata', item)}
                  onDeleteItem={handleDeleteWisata}
                />
              )}

              {activePage === 'wisata-air' && (
                <WisataListView
                  kategoriId={2}
                  title="Wisata Air"
                  wisataList={wisataList}
                  onOpenAddModal={() => openAddModal('wisata')}
                  onOpenEditModal={(item) => openEditModal('wisata', item)}
                  onDeleteItem={handleDeleteWisata}
                />
              )}

              {activePage === 'wisata-religi' && (
                <WisataListView
                  kategoriId={3}
                  title="Wisata Religi"
                  wisataList={wisataList}
                  onOpenAddModal={() => openAddModal('wisata')}
                  onOpenEditModal={(item) => openEditModal('wisata', item)}
                  onDeleteItem={handleDeleteWisata}
                />
              )}

              {activePage === 'daftar-restoran' && (
                <RestoranListView
                  restoranList={restoranList}
                  onOpenAddModal={() => openAddModal('restoran')}
                  onOpenEditModal={(item) => openEditModal('restoran', item)}
                  onDeleteItem={handleDeleteRestoran}
                />
              )}

              {activePage === 'daftar-penginapan' && (
                <PenginapanListView
                  penginapanList={penginapanList}
                  onOpenAddModal={() => openAddModal('penginapan')}
                  onOpenEditModal={(item) => openEditModal('penginapan', item)}
                  onDeleteItem={handleDeletePenginapan}
                />
              )}

              {(activePage === 'galeri-wisata' || activePage === 'galeri-restoran' || activePage === 'galeri-penginapan') && (
                <GaleriView
                  wisataList={wisataList}
                  restoranList={restoranList}
                  penginapanList={penginapanList}
                  defaultCategory={activePage === 'galeri-restoran' ? 'restoran' : activePage === 'galeri-penginapan' ? 'penginapan' : 'wisata'}
                />
              )}

              {activePage === 'subscriber' && (
                <SubscriberView
                  subscribers={subscribers}
                  onMarkAllRead={handleMarkAllRead}
                  onSendNewsletter={handleSendNewsletter}
                />
              )}

              {activePage === 'mail-info' && (
                <SubscriberView
                  subscribers={subscribers}
                  onMarkAllRead={handleMarkAllRead}
                  onSendNewsletter={handleSendNewsletter}
                />
              )}

              {activePage === 'api-explorer' && (
                <ApiExplorerView />
              )}
            </div>
          </main>
        </div>
      )}

      {/* Footer Section */}
      {isVisitorMode ? (
        <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-14 pb-10 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Col 1: Brand & Narrative */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-sm shadow-2xs">
                    D
                  </span>
                  <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                    Dolano
                  </span>
                </div>
                <p className="text-stone-400 leading-relaxed text-xs">
                  Sistem informasi & portal kurasi pariwisata resmi. Memandu pelancong menjelajahi kaldera vulkanik Bromo, keasrian air terjun, peninggalan kerajaan kuno, dan kekayaan cita rasa Jawa Timur.
                </p>
                <div className="text-[11px] text-stone-500 font-mono">
                  Dolano Wisata Nusantara · Terbuka & Terverifikasi
                </div>
              </div>

              {/* Col 2: Jalur Cepat Destinasi */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-white text-sm">
                  Destinasi Terpopuler
                </h4>
                <ul className="space-y-2 text-stone-400">
                  <li><a href="#destinasi" className="hover:text-amber-300 transition-colors">Kawah Gunung Bromo & Pasir Berbisik</a></li>
                  <li><a href="#destinasi" className="hover:text-amber-300 transition-colors">Puncak Sunrise Penanjakan 1</a></li>
                  <li><a href="#destinasi" className="hover:text-amber-300 transition-colors">Air Terjun Coban Rondo & Labirin</a></li>
                  <li><a href="#destinasi" className="hover:text-amber-300 transition-colors">Masjid Tiban Turen 10 Lantai</a></li>
                  <li><a href="#destinasi" className="hover:text-amber-300 transition-colors">Pantai Karang Balekambang</a></li>
                  <li><a href="#destinasi" className="hover:text-amber-300 transition-colors">Candi Singosari Peninggalan Abad 13</a></li>
                </ul>
              </div>

              {/* Col 3: Layanan Wisatawan */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-white text-sm">
                  Layanan & Perencanaan
                </h4>
                <ul className="space-y-2 text-stone-400">
                  <li><a href="#itinerary" className="hover:text-amber-300 transition-colors">Rencana Perjalanan 1-3 Hari</a></li>
                  <li><a href="#kalkulator" className="hover:text-amber-300 transition-colors">Kalkulator Bujet Liburan</a></li>
                  <li><a href="#panduan-cuaca" className="hover:text-amber-300 transition-colors">Prakiraan Cuaca & Suhu Kaldera</a></li>
                  <li><a href="#panduan-cuaca" className="hover:text-amber-300 transition-colors">Checklist Perlengkapan Penjelajah</a></li>
                  <li><a href="#kuliner" className="hover:text-amber-300 transition-colors">Daftar Restoran & Warisan Rasa</a></li>
                  <li><a href="#penginapan" className="hover:text-amber-300 transition-colors">Resor Alam & Glamping Rekomendasi</a></li>
                </ul>
              </div>

              {/* Col 4: Posko Informasi & Keamanan */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-white text-sm">
                  Posko Informasi & Kontak
                </h4>
                <div className="space-y-2.5 text-stone-400 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Posko Informasi Wisata</span>
                    <p className="text-stone-300 font-medium">Jl. Raya Bromo No. 12, Jawa Timur</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Layanan Darurat & SAR</span>
                    <p className="text-amber-300 font-mono font-bold tabular-nums">115 / (0341) 551-999</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Jam Operasional Layanan</span>
                    <p className="text-stone-300">Setiap Hari, 06.00 – 21.00 WIB</p>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() => setIsVisitorMode(false)}
                      className="text-stone-400 hover:text-white underline text-[11px]"
                    >
                      Akses Konsol Pengelola Sistem
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
              <div className="flex items-center gap-2">
                <span>Hak Cipta &copy; {new Date().getFullYear()} Dolano Portal Wisata Jawa Timur</span>
                <span>·</span>
                <span>Seluruh Data Terverifikasi</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Standar Tarif Resmi</span>
                <span>·</span>
                <span>Privasi & Ketentuan Pelancong</span>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        <footer className="bg-white border-t border-stone-200 py-4 px-6 text-xs text-stone-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-stone-900">Dolano</span>
              <span>·</span>
              <span>Konsol Pengelola Sistem Informasi Wisata</span>
            </div>
            <div className="flex items-center gap-4 text-stone-400 text-[11px]">
              <span>Hak Cipta &copy; {new Date().getFullYear()} dolano.web.id</span>
              <span>·</span>
              <span>Status Operasional Aktif</span>
            </div>
          </div>
        </footer>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Add / Edit Item Modal */}
      <ItemFormModal
        isOpen={formModalState.isOpen}
        onClose={() => setFormModalState(prev => ({ ...prev, isOpen: false, editItem: null }))}
        type={formModalState.type}
        editItem={formModalState.editItem}
        onSave={handleSaveItem}
      />
    </div>
  );
}

export default App;
