import React, { useState } from 'react';
import { Code2, Play, CheckCircle, Copy, Terminal } from 'lucide-react';

export const ApiExplorerView: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/apis/views.php');
  const [responseJson, setResponseJson] = useState<string>('Pilih salah satu endpoint di sebelah kiri atau tekan "Jalankan Query" untuk mengambil data langsung dari server.');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      path: '/apis/views.php',
      method: 'GET',
      desc: 'Endpoint PHP asli Dolano untuk mengambil seluruh data tbl_wisata dalam format JSON array.'
    },
    {
      path: '/admin-dolano/apis/views.php',
      method: 'GET',
      desc: 'Alias path kompatibilitas folder admin-dolano.'
    },
    {
      path: '/api/stats',
      method: 'GET',
      desc: 'Statistik agregat dashboard (wisata, restoran, penginapan, subscriber).'
    },
    {
      path: '/api/wisata',
      method: 'GET',
      desc: 'REST API untuk mengambil daftar wisata (mendukung ?kategori=1, 2, atau 3).'
    },
    {
      path: '/api/restoran',
      method: 'GET',
      desc: 'REST API untuk daftar restoran dan rekomendasi kuliner.'
    },
    {
      path: '/api/penginapan',
      method: 'GET',
      desc: 'REST API untuk daftar penginapan, villa dan hotel.'
    }
  ];

  const handleTestApi = async (path: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(path);
      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseJson(`Error fetching API: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
          Konsol Pengembang
        </span>
        <h1 className="font-display text-3xl font-bold text-stone-900 tracking-tight">
          Katalog API & Live Runner
        </h1>
        <p className="text-xs text-stone-600 mt-1">
          Endpoint kompatibilitas arsitektur PHP Dolano (<code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-800">apis/views.php</code>, <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-800">create.php</code>, <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-800">update.php</code>, <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-800">delete.php</code>)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="space-y-3">
          <h2 className="font-display font-bold text-xs uppercase tracking-wider text-stone-700">
            Daftar Endpoint Aktif
          </h2>
          <div className="space-y-2">
            {endpoints.map((ep) => (
              <div
                key={ep.path}
                onClick={() => {
                  setSelectedEndpoint(ep.path);
                  handleTestApi(ep.path);
                }}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                  selectedEndpoint === ep.path
                    ? 'border-stone-900 bg-stone-50'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-stone-900 text-[11px]">{ep.path}</span>
                  <span className="font-mono text-[10px] font-bold text-stone-600">
                    {ep.method}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">{ep.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Runner / Output Viewer */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-stone-700" />
              <h2 className="font-display font-bold text-xs uppercase tracking-wider text-stone-700">
                Respon JSON Server (Port 3000)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTestApi(selectedEndpoint)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>{isLoading ? 'Mengambil...' : 'Jalankan Query'}</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium hover:bg-stone-200 transition-colors border border-stone-200"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin JSON'}</span>
              </button>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl p-4 overflow-hidden border border-stone-800 font-mono text-xs text-amber-300 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800 text-[10px] text-stone-400">
              <span>GET {selectedEndpoint}</span>
              <span className="tabular-nums">Status: 200 OK</span>
            </div>
            <pre className="overflow-x-auto max-h-[460px] p-2 select-text leading-relaxed font-mono">
              {responseJson}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
