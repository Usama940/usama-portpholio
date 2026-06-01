/**
 * QrCodeTool.jsx
 * QR Code Generator UI — presets show a live mini QR preview.
 * No separate fg/bg pickers; color is chosen only via presets.
 */
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export const COLOR_PRESETS = [
  { label: 'Classic',  fg: '#000000', bg: '#ffffff' },
  { label: 'Ocean',    fg: '#0ea5e9', bg: '#f0f9ff' },
  { label: 'Forest',   fg: '#16a34a', bg: '#f0fdf4' },
  { label: 'Violet',   fg: '#7c3aed', bg: '#f5f3ff' },
  { label: 'Sunset',   fg: '#ea580c', bg: '#fff7ed' },
  { label: 'Rose',     fg: '#e11d48', bg: '#fff1f2' },
  { label: 'Midnight', fg: '#1e293b', bg: '#e2e8f0' },
  { label: 'Gold',     fg: '#b45309', bg: '#fffbeb' },
  { label: 'Teal',     fg: '#0d9488', bg: '#f0fdfa' },
  { label: 'Indigo',   fg: '#4338ca', bg: '#eef2ff' },
];

/** Renders a tiny QR canvas inside each preset swatch */
function QrSwatch({ fg, bg, active, label, onClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, 'QR', {
      width: 52,
      margin: 1,
      color: { dark: fg, light: bg },
    }).catch(() => {});
  }, [fg, bg]);

  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-1.5 transition ${
        active
          ? 'border-slate-950 shadow-lg dark:border-white'
          : 'border-transparent hover:border-slate-300'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="rounded-md"
        style={{ width: 52, height: 52 }}
      />
      <span className="text-[10px] leading-none text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </button>
  );
}

export default function QrCodeTool({ qrText, setQrText, qrFg, setQrFg, qrBg, setQrBg }) {
  return (
    <div className="space-y-5">
      {/* Text / URL input */}
      <label className="block text-sm">
        <span className="mb-2 block font-medium text-slate-600 dark:text-slate-300">
          Text or URL
        </span>
        <textarea
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
          rows={4}
          placeholder="https://example.com"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
      </label>

      {/* Color presets — 10 in one row, each shows a real mini QR */}
      <div>
        <span className="mb-3 block text-sm font-medium text-slate-600 dark:text-slate-300">
          Color preset
        </span>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {COLOR_PRESETS.map((preset) => (
            <QrSwatch
              key={preset.label}
              fg={preset.fg}
              bg={preset.bg}
              label={preset.label}
              active={qrFg === preset.fg && qrBg === preset.bg}
              onClick={() => { setQrFg(preset.fg); setQrBg(preset.bg); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
