import express, { Request, Response } from 'express';
import cors from 'cors';
import { initialWisata, initialRestoran, initialPenginapan, initialSubscribers } from './src/data/mockData';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets for reliable image delivery (supports GitHub Pages, local dev, & direct links)
app.use('/assets/images', express.static(path.join(__dirname, 'public', 'assets', 'images')));
app.use('/src/assets/images', express.static(path.join(__dirname, 'src', 'assets', 'images')));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
let wisataList = [...initialWisata];
let restoranList = [...initialRestoran];
let penginapanList = [...initialPenginapan];
let subscriberList = [...initialSubscribers];

// Helper to find category name
function getKategoriName(id: number): string {
  if (id === 1) return 'Pegunungan';
  if (id === 2) return 'Air';
  if (id === 3) return 'Religi';
  return 'Umum';
}

const parseParamId = (id: unknown): number => parseInt(String(id), 10);

// ----------------------------------------------------
// ORIGINAL PHP COMPATIBILITY ROUTES (/apis/*.php and /admin-dolano/apis/*.php)
// ----------------------------------------------------

const handleViews = (req: Request, res: Response) => {
  // Returns raw array matching MySQL result in views.php
  res.json(wisataList);
};

app.get('/apis/views.php', handleViews);
app.get('/admin-dolano/apis/views.php', handleViews);

const handleCreate = (req: Request, res: Response) => {
  const body = req.body || {};
  const newId = wisataList.length > 0 ? Math.max(...wisataList.map(w => w.id_wisata)) + 1 : 1;
  const katId = parseInt(body.id_kategori_wisata || '1', 10);
  
  const newItem = {
    id_wisata: newId,
    nama_wisata: body.nama_wisata || 'Wisata Baru',
    alamat_wisata: body.alamat_wisata || '',
    url_lokasi: body.url_lokasi || '',
    peta_area: body.peta_area || '',
    nomor_telepon: body.nomor_telepon || '',
    jam_buka: body.jam_buka || '08:00 - 17:00 WIB',
    harga_tiket_dewasa: body.harga_tiket_dewasa || 'Rp 0',
    harga_tiket_anak: body.harga_tiket_anak || 'Rp 0',
    id_kategori_wisata: katId,
    kategori_wisata: getKategoriName(katId),
    video_youtube: body.video_youtube || '',
    facebook: body.facebook || '',
    twitter: body.twitter || '',
    instagram: body.instagram || '',
    youtube: body.youtube || '',
    deskripsi_wisata: body.deskripsi_wisata || '',
    foto_wisata: body.foto_wisata || '/src/assets/images/dolano_hero_highlands_1791445064718.jpg',
    galeri: []
  };

  wisataList.unshift(newItem);
  res.json({
    code: 1,
    message: 'Success! New data is added.',
    item: newItem
  });
};

app.post('/apis/create.php', handleCreate);
app.post('/admin-dolano/apis/create.php', handleCreate);

const handleUpdate = (req: Request, res: Response) => {
  const body = req.body || {};
  const id = parseInt(body.id_wisata || req.query.id || '0', 10);
  const index = wisataList.findIndex(w => w.id_wisata === id);

  if (index !== -1) {
    const katId = parseInt(body.id_kategori_wisata || `${wisataList[index].id_kategori_wisata}`, 10);
    wisataList[index] = {
      ...wisataList[index],
      ...body,
      id_wisata: id,
      id_kategori_wisata: katId,
      kategori_wisata: getKategoriName(katId)
    };
    res.json({ code: 1, message: 'Success! Data is updated.', item: wisataList[index] });
  } else {
    res.status(404).json({ code: 0, message: 'Item not found' });
  }
};

app.post('/apis/update.php', handleUpdate);
app.put('/apis/update.php', handleUpdate);
app.post('/admin-dolano/apis/update.php', handleUpdate);

const handleDelete = (req: Request, res: Response) => {
  const id = parseInt(req.body?.id_wisata || req.query?.id || '0', 10);
  wisataList = wisataList.filter(w => w.id_wisata !== id);
  res.json({ code: 1, message: 'Success! Data is deleted.' });
};

app.post('/apis/delete.php', handleDelete);
app.delete('/apis/delete.php', handleDelete);
app.post('/admin-dolano/apis/delete.php', handleDelete);

// ----------------------------------------------------
// REST API ENDPOINTS FOR DOLANO PORTAL & ADMIN
// ----------------------------------------------------

// Stats Dashboard
app.get('/api/stats', (req: Request, res: Response) => {
  const aktifSubscribers = subscriberList.filter(s => s.status === 'Mengikuti').length;
  const unreadMessages = subscriberList.filter(s => s.status_pesan === 'Belum terbaca').length;

  res.json({
    wisata: wisataList.length,
    restoran: restoranList.length,
    penginapan: penginapanList.length,
    subscriber: aktifSubscribers,
    pesan_baru: unreadMessages,
    kategori: {
      pegunungan: wisataList.filter(w => w.id_kategori_wisata === 1).length,
      air: wisataList.filter(w => w.id_kategori_wisata === 2).length,
      religi: wisataList.filter(w => w.id_kategori_wisata === 3).length
    }
  });
});

// Wisata CRUD
app.get('/api/wisata', (req: Request, res: Response) => {
  const kat = req.query.kategori;
  if (kat) {
    const katId = parseInt(kat as string, 10);
    return res.json(wisataList.filter(w => w.id_kategori_wisata === katId));
  }
  res.json(wisataList);
});

app.get('/api/wisata/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  const item = wisataList.find(w => w.id_wisata === id);
  if (!item) return res.status(404).json({ error: 'Wisata tidak ditemukan' });
  res.json(item);
});

app.post('/api/wisata', (req: Request, res: Response) => {
  const body = req.body;
  const newId = wisataList.length > 0 ? Math.max(...wisataList.map(w => w.id_wisata)) + 1 : 1;
  const katId = parseInt(body.id_kategori_wisata || '1', 10);

  const newItem = {
    id_wisata: newId,
    nama_wisata: body.nama_wisata || 'Wisata Baru',
    alamat_wisata: body.alamat_wisata || '',
    url_lokasi: body.url_lokasi || '',
    peta_area: body.peta_area || '',
    nomor_telepon: body.nomor_telepon || '',
    jam_buka: body.jam_buka || '08:00 - 17:00 WIB',
    harga_tiket_dewasa: body.harga_tiket_dewasa || 'Rp 0',
    harga_tiket_anak: body.harga_tiket_anak || 'Rp 0',
    id_kategori_wisata: katId,
    kategori_wisata: getKategoriName(katId),
    video_youtube: body.video_youtube || '',
    facebook: body.facebook || '',
    twitter: body.twitter || '',
    instagram: body.instagram || '',
    youtube: body.youtube || '',
    deskripsi_wisata: body.deskripsi_wisata || '',
    foto_wisata: body.foto_wisata || '/src/assets/images/dolano_hero_highlands_1791445064718.jpg',
    galeri: body.galeri || []
  };

  wisataList.unshift(newItem);
  res.status(201).json(newItem);
});

app.put('/api/wisata/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  const index = wisataList.findIndex(w => w.id_wisata === id);
  if (index === -1) return res.status(404).json({ error: 'Wisata tidak ditemukan' });

  const katId = parseInt(req.body.id_kategori_wisata || `${wisataList[index].id_kategori_wisata}`, 10);
  wisataList[index] = {
    ...wisataList[index],
    ...req.body,
    id_wisata: id,
    id_kategori_wisata: katId,
    kategori_wisata: getKategoriName(katId)
  };
  res.json(wisataList[index]);
});

app.delete('/api/wisata/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  wisataList = wisataList.filter(w => w.id_wisata !== id);
  res.json({ message: 'Wisata berhasil dihapus' });
});

// Restoran CRUD
app.get('/api/restoran', (req: Request, res: Response) => {
  res.json(restoranList);
});

app.get('/api/restoran/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  const item = restoranList.find(r => r.id_restoran === id);
  if (!item) return res.status(404).json({ error: 'Restoran tidak ditemukan' });
  res.json(item);
});

app.post('/api/restoran', (req: Request, res: Response) => {
  const body = req.body;
  const newId = restoranList.length > 0 ? Math.max(...restoranList.map(r => r.id_restoran)) + 1 : 1;

  const newItem = {
    id_restoran: newId,
    nama_restoran: body.nama_restoran || 'Restoran Baru',
    alamat_restoran: body.alamat_restoran || '',
    url_lokasi: body.url_lokasi || '',
    peta_area: body.peta_area || '',
    nomor_telepon: body.nomor_telepon || '',
    jam_buka: body.jam_buka || '09:00 - 21:00 WIB',
    video_youtube: body.video_youtube || '',
    facebook: body.facebook || '',
    twitter: body.twitter || '',
    instagram: body.instagram || '',
    youtube: body.youtube || '',
    deskripsi_restoran: body.deskripsi_restoran || '',
    foto_restoran: body.foto_restoran || '/src/assets/images/restaurant_indonesian_culinary_1791445115848.jpg',
    menu_favorit: body.menu_favorit || 'Makanan Tradisional'
  };

  restoranList.unshift(newItem);
  res.status(201).json(newItem);
});

app.put('/api/restoran/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  const index = restoranList.findIndex(r => r.id_restoran === id);
  if (index === -1) return res.status(404).json({ error: 'Restoran tidak ditemukan' });

  restoranList[index] = { ...restoranList[index], ...req.body, id_restoran: id };
  res.json(restoranList[index]);
});

app.delete('/api/restoran/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  restoranList = restoranList.filter(r => r.id_restoran !== id);
  res.json({ message: 'Restoran berhasil dihapus' });
});

// Penginapan CRUD
app.get('/api/penginapan', (req: Request, res: Response) => {
  res.json(penginapanList);
});

app.get('/api/penginapan/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  const item = penginapanList.find(p => p.id_penginapan === id);
  if (!item) return res.status(404).json({ error: 'Penginapan tidak ditemukan' });
  res.json(item);
});

app.post('/api/penginapan', (req: Request, res: Response) => {
  const body = req.body;
  const newId = penginapanList.length > 0 ? Math.max(...penginapanList.map(p => p.id_penginapan)) + 1 : 1;

  const newItem = {
    id_penginapan: newId,
    nama_penginapan: body.nama_penginapan || 'Penginapan Baru',
    alamat_penginapan: body.alamat_penginapan || '',
    url_lokasi: body.url_lokasi || '',
    peta_area: body.peta_area || '',
    nomor_telepon: body.nomor_telepon || '',
    jam_buka: body.jam_buka || 'Check-in 14:00 | Check-out 12:00',
    harga_mulai: body.harga_mulai || 'Rp 500.000 / malam',
    fasilitas: body.fasilitas || 'WiFi, Sarapan, Parkir',
    video_youtube: body.video_youtube || '',
    facebook: body.facebook || '',
    twitter: body.twitter || '',
    instagram: body.instagram || '',
    youtube: body.youtube || '',
    deskripsi_penginapan: body.deskripsi_penginapan || '',
    foto_penginapan: body.foto_penginapan || '/src/assets/images/resort_villa_ecolodge_1791445128054.jpg'
  };

  penginapanList.unshift(newItem);
  res.status(201).json(newItem);
});

app.put('/api/penginapan/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  const index = penginapanList.findIndex(p => p.id_penginapan === id);
  if (index === -1) return res.status(404).json({ error: 'Penginapan tidak ditemukan' });

  penginapanList[index] = { ...penginapanList[index], ...req.body, id_penginapan: id };
  res.json(penginapanList[index]);
});

app.delete('/api/penginapan/:id', (req: Request, res: Response) => {
  const id = parseParamId(req.params.id);
  penginapanList = penginapanList.filter(p => p.id_penginapan !== id);
  res.json({ message: 'Penginapan berhasil dihapus' });
});

// Subscribers
app.get('/api/subscribers', (req: Request, res: Response) => {
  res.json(subscriberList);
});

app.post('/api/subscribers', (req: Request, res: Response) => {
  const { email, nama } = req.body;
  if (!email) return res.status(400).json({ error: 'Email wajib diisi' });

  const existing = subscriberList.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    existing.status = 'Mengikuti';
    return res.json({ message: 'Email sudah terdaftar dan status diaktifkan', subscriber: existing });
  }

  const newSub = {
    id_subscriber: subscriberList.length + 1,
    email,
    nama: nama || email.split('@')[0],
    status: 'Mengikuti' as const,
    status_pesan: 'Belum terbaca' as const,
    tanggal_bergabung: new Date().toISOString().split('T')[0]
  };

  subscriberList.unshift(newSub);
  res.status(201).json({ message: 'Terima kasih telah berlangganan!', subscriber: newSub });
});

app.post('/api/subscribers/mark-read', (req: Request, res: Response) => {
  subscriberList = subscriberList.map(s => ({ ...s, status_pesan: 'Terbaca' }));
  res.json({ message: 'Semua pesan ditandai telah dibaca' });
});

app.post('/api/subscribers/send-newsletter', (req: Request, res: Response) => {
  const { type, subject, message } = req.body;
  // Simulating PHPMailer
  const count = subscriberList.filter(s => s.status === 'Mengikuti').length;
  res.json({
    success: true,
    message: `Notifikasi newsletter info ${type || 'wisata'} berhasil dikirim ke ${count} subscriber aktif!`,
    sent_count: count,
    subject: subject || 'Info Terbaru Dolano'
  });
});

// Admin Authentication
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Support default admin credentials or any credentials for demo
  if ((username === 'admin' && password === 'admin123') || (username && password)) {
    return res.json({
      success: true,
      user: {
        id_admin: 1,
        username: username || 'admin',
        nama_lengkap: 'Administrator Dolano',
        role: 'Superadmin'
      },
      token: 'dolano-session-token-' + Date.now()
    });
  }
  res.status(401).json({ success: false, message: 'Username atau password tidak valid.' });
});

// ----------------------------------------------------
// VITE DEV SERVER / PRODUCTION STATIC SERVING
// ----------------------------------------------------

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI Studio] Dolano server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
