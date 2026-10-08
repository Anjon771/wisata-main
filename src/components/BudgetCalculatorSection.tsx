import React, { useState } from 'react';
import { Calculator, Users, Clock, Sparkles, Check, DollarSign, ArrowRight, ShieldCheck, Copy, CheckCircle2 } from 'lucide-react';

type TravelStyle = 'backpacker' | 'comfort' | 'luxury';
type Duration = '1d' | '2d1n' | '3d2n';

export const BudgetCalculatorSection: React.FC<{
  onExploreDestinations?: () => void;
}> = ({ onExploreDestinations }) => {
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('comfort');
  const [duration, setDuration] = useState<Duration>('2d1n');
  const [travelers, setTravelers] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  // Pricing constants (in IDR)
  const styleMultipliers = {
    backpacker: {
      label: 'Backpacker Hemat',
      desc: 'Transportasi mandiri, santap warung tradisional legendaris, homestay alam hangat',
      transportPerDay: 85000,
      foodPerPersonPerDay: 75000,
      lodgingPerNight: 150000,
      ticketAveragePerPerson: 35000,
    },
    comfort: {
      label: 'Keluarga Nyaman',
      desc: 'Sewa mobil/jeep bersama, resto keluarga terfavorit, resort/hotel pemandangan alam',
      transportPerDay: 250000,
      foodPerPersonPerDay: 150000,
      lodgingPerNight: 450000,
      ticketAveragePerPerson: 45000,
    },
    luxury: {
      label: 'Eksklusif Sultan',
      desc: 'Private 4x4 Land Cruiser Bromo, resort glamping bintang 5, sajian istimewa',
      transportPerDay: 650000,
      foodPerPersonPerDay: 320000,
      lodgingPerNight: 1250000,
      ticketAveragePerPerson: 65000,
    }
  };

  const durationData = {
    '1d': { days: 1, nights: 0, label: '1 Hari Wisata' },
    '2d1n': { days: 2, nights: 1, label: '2 Hari 1 Malam' },
    '3d2n': { days: 3, nights: 2, label: '3 Hari 2 Malam' },
  };

  const selectedStyle = styleMultipliers[travelStyle];
  const selectedDuration = durationData[duration];

  // Calculation formulas
  const ticketCost = selectedStyle.ticketAveragePerPerson * 2 * selectedDuration.days * travelers;
  const foodCost = selectedStyle.foodPerPersonPerDay * selectedDuration.days * travelers;
  // Shared lodging: 2 travelers per room ceiling
  const roomsNeeded = Math.ceil(travelers / 2);
  const lodgingCost = selectedStyle.lodgingPerNight * selectedDuration.nights * roomsNeeded;
  // Shared transport
  const transportCost = selectedStyle.transportPerDay * selectedDuration.days;

  const totalCost = ticketCost + foodCost + lodgingCost + transportCost;
  const costPerPerson = Math.round(totalCost / travelers);

  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleCopySummary = () => {
    const text = `Rencana Anggaran Dolano:
- Gaya Liburan: ${selectedStyle.label}
- Durasi: ${selectedDuration.label}
- Jumlah Peserta: ${travelers} Orang
- Estimasi Total: ${formatIDR(totalCost)}
- Estimasi Per Orang: ${formatIDR(costPerPerson)}
Rincian:
· Tiket Destinasi: ${formatIDR(ticketCost)}
· Transportasi: ${formatIDR(transportCost)}
· Kuliner & Resto: ${formatIDR(foodCost)}
· Penginapan: ${formatIDR(lodgingCost)}
Dibuat di Dolano Portal Wisata.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="kalkulator" className="space-y-8 py-6">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
            Simulasi Anggaran Pintar
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Kalkulator Biaya Liburan Dolano
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Rencanakan bujet perjalanan Anda secara transparan berdasarkan gaya berwisata, lama kunjungan, dan jumlah rombongan.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono tabular-nums">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Estimasi Realistis & Terkalibrasi</span>
        </div>
      </div>

      {/* Main Interactive Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
        {/* Left Form: Parameters (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Gaya Liburan */}
          <div>
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2.5">
              1. Pilih Gaya & Kenyamanan Perjalanan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['backpacker', 'comfort', 'luxury'] as TravelStyle[]).map((styleKey) => {
                const info = styleMultipliers[styleKey];
                const active = travelStyle === styleKey;
                return (
                  <button
                    key={styleKey}
                    type="button"
                    onClick={() => setTravelStyle(styleKey)}
                    className={`p-3.5 rounded-xl border text-left transition-colors flex flex-col justify-between ${
                      active
                        ? 'border-stone-900 bg-stone-900 text-white shadow-2xs'
                        : 'border-stone-200 bg-stone-50/60 text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">{info.label}</span>
                        {active && <Check className="w-3.5 h-3.5 text-amber-300" />}
                      </div>
                      <p className={`text-[11px] leading-relaxed line-clamp-3 ${active ? 'text-stone-300' : 'text-stone-500'}`}>
                        {info.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Durasi Perjalanan */}
          <div>
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2.5">
              2. Durasi Kunjungan
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['1d', '2d1n', '3d2n'] as Duration[]).map((durKey) => {
                const active = duration === durKey;
                return (
                  <button
                    key={durKey}
                    type="button"
                    onClick={() => setDuration(durKey)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-colors text-xs font-semibold ${
                      active
                        ? 'border-stone-900 bg-stone-900 text-white shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {durationData[durKey].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Jumlah Wisatawan */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                3. Jumlah Wisatawan / Rombongan
              </label>
              <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                {travelers} Orang
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 4, 6, 8, 12].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTravelers(num)}
                  className={`flex-1 py-2 rounded-lg border text-xs font-mono font-bold tabular-nums transition-colors ${
                    travelers === num
                      ? 'border-stone-900 bg-amber-400 text-stone-950 shadow-2xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Estimated Breakdown Result (5 cols) */}
        <div className="lg:col-span-5 bg-stone-900 text-white rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Ringkasan Simulasi
              </span>
              <span className="text-xs text-amber-300 font-mono">
                {selectedDuration.label} · {travelers} Pax
              </span>
            </div>

            {/* Big Total */}
            <div className="pt-4">
              <span className="text-xs text-stone-400 block font-medium">Estimasi Biaya Per Orang</span>
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-300 tabular-nums mt-0.5">
                {formatIDR(costPerPerson)}
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Total keseluruhan rombongan: <strong className="text-white font-mono">{formatIDR(totalCost)}</strong>
              </p>
            </div>

            {/* Line items */}
            <div className="space-y-2.5 pt-5 text-xs">
              <div className="flex justify-between items-center text-stone-300 border-b border-stone-800/80 pb-1.5">
                <span>Tiket Masuk Wisata</span>
                <span className="font-mono tabular-nums text-white">{formatIDR(ticketCost)}</span>
              </div>
              <div className="flex justify-between items-center text-stone-300 border-b border-stone-800/80 pb-1.5">
                <span>Transportasi & Mobil/Jeep</span>
                <span className="font-mono tabular-nums text-white">{formatIDR(transportCost)}</span>
              </div>
              <div className="flex justify-between items-center text-stone-300 border-b border-stone-800/80 pb-1.5">
                <span>Konsumsi & Resto Pilihan</span>
                <span className="font-mono tabular-nums text-white">{formatIDR(foodCost)}</span>
              </div>
              <div className="flex justify-between items-center text-stone-300 border-b border-stone-800/80 pb-1.5">
                <span>Penginapan ({selectedDuration.nights} Malam, {roomsNeeded} Kamar)</span>
                <span className="font-mono tabular-nums text-white">{formatIDR(lodgingCost)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleCopySummary}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-stone-700"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Rincian Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-300" />
                  <span>Salin Rincian Estimasi Biaya</span>
                </>
              )}
            </button>

            {onExploreDestinations && (
              <button
                onClick={onExploreDestinations}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>Lihat Destinasi Terkait</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
