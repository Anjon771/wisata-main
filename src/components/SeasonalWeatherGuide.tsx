import React, { useState } from 'react';
import { CloudSun, Thermometer, Wind, Compass, CheckSquare, Square, ShieldAlert, Sparkles, Check } from 'lucide-react';

export const SeasonalWeatherGuide: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'item-1': true,
    'item-2': true,
    'item-4': true,
  });

  const checklist = [
    { id: 'item-1', label: 'Jaket Tebal / Windproof', desc: 'Suhu fajar di kawah Bromo & Penanjakan dapat menyentuh 3°C–8°C.' },
    { id: 'item-2', label: 'Masker Debu & Syal', desc: 'Melindungi pernapasan dari pasir berbisik dan hembusan belerang kawah.' },
    { id: 'item-3', label: 'Sarung Tangan & Kupluk Wol', desc: 'Mencegah kram jari saat memegang kamera memotret sunrise.' },
    { id: 'item-4', label: 'Sepatu Trekking Bertekstur', desc: 'Medan pasir gembur dan tangga kawah membutuhkan grip yang kuat.' },
    { id: 'item-5', label: 'Kacamata Hitam & Sunscreen', desc: 'Cahaya matahari siang di kaldera memantul terang pada lautan pasir.' },
    { id: 'item-6', label: 'Jas Hujan Ringan / Poncho', desc: 'Waspada kabut embun basah atau gerimis mikro di area lembah air terjun.' },
    { id: 'item-7', label: 'Powerbank Ekstra', desc: 'Udara dingin mempercepat pengurangan daya baterai ponsel dan kamera.' },
    { id: 'item-8', label: 'Obat Pribadi & Minyak Hangat', desc: 'Menjaga kenyamanan tubuh dari mabuk perjalanan medan berliku.' },
  ];

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <section id="panduan-cuaca" className="space-y-8 py-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Persiapan Wisata Lapangan
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Karakter Cuaca & Checklist Perlengkapan
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Ketahui perbedaan iklim mikro antara pegunungan tinggi, lembah air terjun, dan pesisir pantai agar kunjungan Anda aman dan maksimal.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <CloudSun className="w-4 h-4 text-amber-500" />
          <span>Prakiraan Iklim Tropis Berkala</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weather Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Bromo Highlands */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Dataran Tinggi Bromo & Penanjakan</span>
              <span className="text-[11px] font-mono text-stone-500 tabular-nums">2.329 - 2.770 mdpl</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-3xl font-bold text-sky-800 tabular-nums">5°C – 16°C</div>
              <div className="text-xs text-stone-600 border-l border-stone-200 pl-4 space-y-0.5">
                <p className="font-semibold text-stone-800">Udara Dingin & Berangin</p>
                <p className="text-[11px] text-stone-500">Waktu sunrise terbaik: 04.45 - 05.30 WIB</p>
              </div>
            </div>
          </div>

          {/* Card 2: Lembah Air Terjun Pujon */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Lembah Pujon & Coban Rondo</span>
              <span className="text-[11px] font-mono text-stone-500 tabular-nums">1.135 mdpl</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-3xl font-bold text-emerald-800 tabular-nums">18°C – 24°C</div>
              <div className="text-xs text-stone-600 border-l border-stone-200 pl-4 space-y-0.5">
                <p className="font-semibold text-stone-800">Sejuk, Rindang & Lembab</p>
                <p className="text-[11px] text-stone-500">Ideal untuk jalan santai dan labirin</p>
              </div>
            </div>
          </div>

          {/* Card 3: Pesisir Selatan */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Pesisir Samudra Balekambang</span>
              <span className="text-[11px] font-mono text-stone-500 tabular-nums">0 - 15 mdpl</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-3xl font-bold text-amber-800 tabular-nums">26°C – 31°C</div>
              <div className="text-xs text-stone-600 border-l border-stone-200 pl-4 space-y-0.5">
                <p className="font-semibold text-stone-800">Hangat Tropis & Semilir Ombak</p>
                <p className="text-[11px] text-stone-500">Waktu sunset terbaik: 17.15 - 17.50 WIB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Checklist (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-display font-bold text-stone-900 text-base">
                Checklist Perlengkapan Penjelajah
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Centang barang yang sudah siap di dalam ransel Anda:
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                {completedCount}/{checklist.length} Siap
              </span>
              <span className="text-[10px] text-stone-400 block font-mono">{progressPercent}%</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Checklist items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {checklist.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-amber-50/60 border-amber-200 text-stone-900'
                      : 'bg-stone-50/40 border-stone-200/80 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <div className="w-4 h-4 rounded bg-amber-500 text-stone-950 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded border border-stone-300 bg-white" />
                    )}
                  </div>
                  <div>
                    <span className={`text-xs font-bold block ${isChecked ? 'text-stone-900' : 'text-stone-700'}`}>
                      {item.label}
                    </span>
                    <p className="text-[11px] text-stone-500 leading-normal mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
