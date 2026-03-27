import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, ChevronRight } from 'lucide-react';

// ─── COLOR DATA ───────────────────────────────────────────────────────────────
const brandColors = [
  {
    name: 'Cyan',
    description: 'Primary accent — tech, trust, highlights',
    role: 'Primary',
    shades: [
      { shade: '50',  hex: '#ECFEFF' },
      { shade: '100', hex: '#CFFAFE' },
      { shade: '200', hex: '#A5F3FC' },
      { shade: '300', hex: '#67E8F9', main: true },
      { shade: '400', hex: '#22D3EE' },
      { shade: '500', hex: '#06B6D4' },
      { shade: '600', hex: '#0891B2' },
      { shade: '700', hex: '#0E7490' },
    ],
  },
  {
    name: 'Pink',
    description: 'Secondary accent — fun, beauty, grooming',
    role: 'Secondary',
    shades: [
      { shade: '50',  hex: '#FFF0F6' },
      { shade: '100', hex: '#FFD6E7' },
      { shade: '200', hex: '#FBCFE8' },
      { shade: '300', hex: '#F9A8D4', main: true },
      { shade: '400', hex: '#F472B6' },
      { shade: '500', hex: '#EC4899' },
      { shade: '600', hex: '#DB2777' },
      { shade: '700', hex: '#BE185D' },
    ],
  },
  {
    name: 'Yellow',
    description: 'Tertiary accent — warnings, stars, attention',
    role: 'Tertiary',
    shades: [
      { shade: '50',  hex: '#FEFCE8' },
      { shade: '100', hex: '#FEF9C3' },
      { shade: '200', hex: '#FEF08A' },
      { shade: '300', hex: '#FDE047', main: true },
      { shade: '400', hex: '#FACC15' },
      { shade: '500', hex: '#EAB308' },
      { shade: '600', hex: '#CA8A04' },
      { shade: '700', hex: '#A16207' },
    ],
  },
  {
    name: 'Lime',
    description: 'Success, nature, positive states',
    role: 'Success',
    shades: [
      { shade: '50',  hex: '#F7FEE7' },
      { shade: '100', hex: '#ECFCCB' },
      { shade: '200', hex: '#D9F99D' },
      { shade: '300', hex: '#BEF264', main: true },
      { shade: '400', hex: '#A3E635' },
      { shade: '500', hex: '#84CC16' },
      { shade: '600', hex: '#65A30D' },
      { shade: '700', hex: '#4D7C0F' },
    ],
  },
  {
    name: 'Orange',
    description: 'CTAs, energy, food category',
    role: 'Energy',
    shades: [
      { shade: '50',  hex: '#FFF7ED' },
      { shade: '100', hex: '#FFEDD5' },
      { shade: '200', hex: '#FED7AA' },
      { shade: '300', hex: '#FDBA74', main: true },
      { shade: '400', hex: '#FB923C' },
      { shade: '500', hex: '#F97316' },
      { shade: '600', hex: '#EA580C' },
      { shade: '700', hex: '#C2410C' },
    ],
  },
  {
    name: 'Purple',
    description: 'Premium, creative, brand identity',
    role: 'Premium',
    shades: [
      { shade: '50',  hex: '#FAF5FF' },
      { shade: '100', hex: '#F3E8FF' },
      { shade: '200', hex: '#DDD6FE' },
      { shade: '300', hex: '#C4B5FD', main: true },
      { shade: '400', hex: '#A78BFA' },
      { shade: '500', hex: '#8B5CF6' },
      { shade: '600', hex: '#7C3AED' },
      { shade: '700', hex: '#6D28D9' },
    ],
  },
];

const neutrals = [
  { shade: '0 · White', hex: '#FFFFFF', tw: 'white' },
  { shade: '50', hex: '#F9FAFB', tw: 'gray-50' },
  { shade: '100', hex: '#F3F4F6', tw: 'gray-100' },
  { shade: '200', hex: '#E5E7EB', tw: 'gray-200' },
  { shade: '300', hex: '#D1D5DB', tw: 'gray-300' },
  { shade: '400', hex: '#9CA3AF', tw: 'gray-400' },
  { shade: '500', hex: '#6B7280', tw: 'gray-500' },
  { shade: '600', hex: '#4B5563', tw: 'gray-600' },
  { shade: '700', hex: '#374151', tw: 'gray-700' },
  { shade: '800', hex: '#1F2937', tw: 'gray-800' },
  { shade: '900', hex: '#111827', tw: 'gray-900' },
  { shade: '950 · Black', hex: '#000000', tw: 'black' },
];

const semanticColors = [
  { name: 'Success', hex: '#84CC16', light: '#D9F99D', token: '--color-success', usage: 'Verified badges, success states, checkmarks' },
  { name: 'Warning', hex: '#EAB308', light: '#FEF08A', token: '--color-warning', usage: 'Alerts, pending states, warnings' },
  { name: 'Error', hex: '#EF4444', light: '#FEE2E2', token: '--color-error', usage: 'Errors, destructive actions, urgent' },
  { name: 'Info', hex: '#06B6D4', light: '#CFFAFE', token: '--color-info', usage: 'Informational messages, tips' },
];

// ─── TYPOGRAPHY DATA ──────────────────────────────────────────────────────────
const typeScale = [
  { name: 'Display',   size: '72px', tw: 'text-7xl',  weight: '900 Black', sample: 'CAMPUS SERVICES', token: '--text-display' },
  { name: 'H1',        size: '60px', tw: 'text-6xl',  weight: '900 Black', sample: 'ALL SERVICES',    token: '--text-h1' },
  { name: 'H2',        size: '48px', tw: 'text-5xl',  weight: '900 Black', sample: 'Find Your Vibe',  token: '--text-h2' },
  { name: 'H3',        size: '36px', tw: 'text-4xl',  weight: '900 Black', sample: 'Section Title',   token: '--text-h3' },
  { name: 'H4',        size: '30px', tw: 'text-3xl',  weight: '700 Bold',  sample: 'Card Heading',    token: '--text-h4' },
  { name: 'H5',        size: '24px', tw: 'text-2xl',  weight: '700 Bold',  sample: 'Subheading',      token: '--text-h5' },
  { name: 'Label',     size: '14px', tw: 'text-sm',   weight: '900 Black', sample: 'BUTTON LABEL',    token: '--text-label', caps: true },
  { name: 'Body LG',   size: '18px', tw: 'text-lg',   weight: '700 Bold',  sample: 'Body large intro text.', token: '--text-body-lg' },
  { name: 'Body MD',   size: '16px', tw: 'text-base', weight: '700 Bold',  sample: 'Standard body text for reading.',  token: '--text-body-md' },
  { name: 'Body SM',   size: '14px', tw: 'text-sm',   weight: '400 Regular', sample: 'Small body / supporting text.', token: '--text-body-sm' },
  { name: 'Caption',   size: '12px', tw: 'text-xs',   weight: '700 Bold',  sample: 'Caption / meta text 12px', token: '--text-caption' },
];

const fontFamilies = [
  {
    name: 'Space Grotesk',
    role: 'Headings & Display',
    weights: ['500 Medium', '600 SemiBold', '700 Bold'],
    fallback: 'sans-serif',
    token: '--font-display',
    color: 'bg-purple-200',
    preview: 'CAMPUS BRUTALIST',
  },
  {
    name: 'Inter',
    role: 'Body & UI',
    weights: ['400 Regular', '500 Medium', '600 SemiBold', '700 Bold'],
    fallback: 'sans-serif',
    token: '--font-body',
    color: 'bg-cyan-200',
    preview: 'Easy reading at all sizes',
  },
];

// ─── SPACING DATA ─────────────────────────────────────────────────────────────
const spacingTokens = [
  { token: '--spacing-1', tw: 'p-1 / gap-1', px: '4px', usage: 'Tight inline gaps' },
  { token: '--spacing-2', tw: 'p-2 / gap-2', px: '8px', usage: 'Badge padding' },
  { token: '--spacing-3', tw: 'p-3 / gap-3', px: '12px', usage: 'Small components' },
  { token: '--spacing-4', tw: 'p-4 / gap-4', px: '16px', usage: 'Default padding' },
  { token: '--spacing-6', tw: 'p-6 / gap-6', px: '24px', usage: 'Card padding' },
  { token: '--spacing-8', tw: 'p-8 / gap-8', px: '32px', usage: 'Section spacing' },
  { token: '--spacing-12', tw: 'p-12',        px: '48px', usage: 'Hero sections' },
  { token: '--spacing-16', tw: 'p-16',        px: '64px', usage: 'Large sections' },
];

// ─── SHADOW DATA ──────────────────────────────────────────────────────────────
const shadows = [
  { name: 'XS', value: '4px 4px 0px 0px #000', token: '--shadow-xs', usage: 'Buttons, badges' },
  { name: 'SM', value: '6px 6px 0px 0px #000', token: '--shadow-sm', usage: 'Small cards' },
  { name: 'MD', value: '8px 8px 0px 0px #000', token: '--shadow-md', usage: 'Standard cards' },
  { name: 'LG', value: '12px 12px 0px 0px #000', token: '--shadow-lg', usage: 'Feature cards' },
  { name: 'XL', value: '16px 16px 0px 0px #000', token: '--shadow-xl', usage: 'Hero elements' },
];

// ─── NAV SECTIONS ─────────────────────────────────────────────────────────────
const sections = [
  'Overview', 'Colors', 'Typography', 'Spacing', 'Shadows', 'Components',
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function TypographyColorPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('Overview');

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const CopyButton = ({ value, label }: { value: string; label: string }) => (
    <button
      onClick={() => copy(value, label)}
      className="inline-flex items-center gap-1 text-xs font-black bg-white border-2 border-black px-2 py-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      {copied === label ? <Check size={11} /> : <Copy size={11} />}
      {copied === label ? 'COPIED' : 'COPY'}
    </button>
  );

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* ── COVER ───────────────────────────────────────────────── */}
      <div className="bg-black text-white border-b-8 border-black relative overflow-hidden">
        {/* Rainbow strip */}
        <div className="absolute bottom-0 left-0 right-0 flex h-3">
          {['#67E8F9','#F9A8D4','#FDE047','#BEF264','#FDBA74','#C4B5FD'].map(c => (
            <div key={c} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="inline-block bg-yellow-300 text-black border-4 border-yellow-300 px-5 py-2 font-black text-sm mb-8 rotate-1 shadow-[6px_6px_0px_0px_rgba(253,224,71,0.5)]">
                DESIGN SYSTEM v2.0
              </div>
              <h1 className="text-7xl sm:text-8xl font-black leading-none mb-6">
                CAMPUS<br />
                <span className="text-cyan-300">SERVICES</span>
              </h1>
              <p className="font-bold text-gray-400 text-xl max-w-md">
                Neo-Brutalist design language — typography, colour, spacing & components in one place.
              </p>
            </div>

            {/* Meta panel */}
            <div className="border-4 border-gray-700 p-6 space-y-4 bg-gray-900">
              {[
                ['Design Language', 'Neo-Brutalism'],
                ['Version', '2.0 — March 2026'],
                ['Primary Font', 'Space Grotesk'],
                ['Body Font', 'Inter'],
                ['Color Mode', 'Light only'],
                ['Target', 'University Students (Gen-Z)'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-start border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-400 font-bold text-sm">{k}</span>
                  <span className="font-black text-sm text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ──────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex overflow-x-auto gap-0 no-scrollbar">
            {sections.map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`flex-shrink-0 px-6 py-4 font-black text-sm border-r-2 border-black transition-all ${
                  activeSection === s
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-24">

        {/* ── OVERVIEW ────────────────────────────────────────────── */}
        <section id="overview">
          <SectionHeader
            label="01 — OVERVIEW"
            title="Design Principles"
            color="bg-purple-300"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[
              { n: '01', title: 'THICK BORDERS', desc: '4–8px solid black borders on all interactive and structural elements.', col: 'bg-cyan-200' },
              { n: '02', title: 'HARD SHADOWS', desc: 'Offset drop shadows (4–16px), zero blur, pure black. No soft glow.', col: 'bg-pink-200' },
              { n: '03', title: 'FLAT COLORS', desc: 'No gradients on cards or content blocks. Pure color fills only.', col: 'bg-yellow-200' },
              { n: '04', title: 'BOLD TYPE', desc: 'All-caps for labels and CTAs. Black (900) weight for headings.', col: 'bg-lime-200' },
              { n: '05', title: 'ASYMMETRY', desc: 'Intentional 1–3° rotations on accent elements for a collage feel.', col: 'bg-orange-200' },
              { n: '06', title: 'GEN-Z VOICE', desc: 'Casual, punchy copy. Emojis used intentionally. "fr fr no cap".', col: 'bg-purple-200' },
            ].map(p => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`${p.col} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6`}
              >
                <div className="text-4xl font-black opacity-20 mb-3">{p.n}</div>
                <h3 className="font-black text-lg mb-2">{p.title}</h3>
                <p className="font-bold text-sm leading-relaxed text-gray-700">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── COLORS ──────────────────────────────────────────────── */}
        <section id="colors">
          <SectionHeader label="02 — COLORS" title="Color System" color="bg-yellow-300" />

          {/* Brand palette — color scale rows */}
          <div className="mt-10 space-y-8">
            <h3 className="font-black text-xl border-b-4 border-black pb-3">BRAND PALETTE</h3>
            {brandColors.map(color => (
              <div key={color.name} className="border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                {/* Color info header */}
                <div className="grid grid-cols-[200px_1fr] sm:grid-cols-[240px_1fr]">
                  <div
                    className="p-5 border-r-4 border-black flex flex-col justify-between"
                    style={{ backgroundColor: color.shades[3].hex }}
                  >
                    <div>
                      <div className="font-black text-xl">{color.name.toUpperCase()}</div>
                      <div className="bg-black text-white font-black text-xs px-2 py-1 inline-block mt-2">{color.role.toUpperCase()}</div>
                    </div>
                    <p className="font-bold text-xs mt-4 leading-relaxed">{color.description}</p>
                  </div>

                  {/* Shade strip */}
                  <div className="flex overflow-x-auto">
                    {color.shades.map(s => (
                      <div
                        key={s.shade}
                        className={`flex-1 min-w-[60px] relative group cursor-pointer ${s.main ? 'ring-4 ring-inset ring-black' : ''}`}
                        style={{ backgroundColor: s.hex }}
                        onClick={() => copy(s.hex, s.hex)}
                      >
                        <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 bg-black/80 transition-opacity">
                          <div className="text-white font-black text-[10px]">{s.shade}</div>
                          <div className="text-white/70 font-mono text-[9px]">{s.hex}</div>
                        </div>
                        <div className="h-20 sm:h-24" />
                        <div className="bg-white/90 border-t-2 border-black/20 px-2 py-1.5">
                          <div className="font-black text-[11px]">{s.shade}</div>
                          <div className="font-mono text-[10px] text-gray-600">{s.hex}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Neutrals */}
          <div className="mt-12">
            <h3 className="font-black text-xl border-b-4 border-black pb-3 mb-6">NEUTRALS</h3>
            <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="flex flex-wrap">
                {neutrals.map((n, i) => (
                  <div
                    key={n.shade}
                    className="flex-1 min-w-[60px] group cursor-pointer"
                    style={{ backgroundColor: n.hex, border: n.hex === '#FFFFFF' ? '0' : '0' }}
                    onClick={() => copy(n.hex, n.shade)}
                  >
                    <div className="h-16 border-r border-gray-300 last:border-r-0" style={{ backgroundColor: n.hex }} />
                    <div className={`px-2 py-2 border-t-2 border-gray-200 ${i > 6 ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                      <div className="font-black text-[10px]">{n.shade}</div>
                      <div className="font-mono text-[9px] opacity-60">{n.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mt-12">
            <h3 className="font-black text-xl border-b-4 border-black pb-3 mb-6">SEMANTIC COLORS</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {semanticColors.map(s => (
                <div key={s.name} className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  {/* Swatch pair */}
                  <div className="flex h-20 border-b-4 border-black">
                    <div className="flex-1" style={{ backgroundColor: s.hex }} />
                    <div className="flex-1 border-l-4 border-black" style={{ backgroundColor: s.light }} />
                  </div>
                  <div className="p-4">
                    <div className="font-black text-base mb-1">{s.name.toUpperCase()}</div>
                    <code className="text-xs font-mono bg-gray-100 border-2 border-black px-2 py-0.5 block mb-2">{s.token}</code>
                    <p className="text-xs font-bold text-gray-600">{s.usage}</p>
                    <div className="flex gap-2 mt-3">
                      <CopyButton value={s.hex} label={`${s.name}-main`} />
                      <CopyButton value={s.light} label={`${s.name}-light`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color usage — DO / DON'T */}
          <div className="mt-12">
            <h3 className="font-black text-xl border-b-4 border-black pb-3 mb-6">COLOR USAGE</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="bg-lime-400 border-b-4 border-black px-5 py-3 font-black">✅ DO</div>
                <div className="p-5 space-y-3">
                  {[
                    'Use flat color fills — no gradients on cards',
                    'Pair bright colors with black borders',
                    'Use 300-shade for card backgrounds',
                    'Use black text on all colored backgrounds',
                    'Reserve Red for errors and urgent states only',
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2 font-bold text-sm">
                      <span className="text-lime-600 font-black flex-shrink-0">→</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="bg-red-400 border-b-4 border-black px-5 py-3 font-black">❌ DON'T</div>
                <div className="p-5 space-y-3">
                  {[
                    'Apply gradient backgrounds to content cards',
                    'Use light grays as primary text color',
                    'Mix more than 3 accent colors per section',
                    'Use white text on yellow / lime backgrounds',
                    'Use color alone to convey meaning — add icons',
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2 font-bold text-sm">
                      <span className="text-red-600 font-black flex-shrink-0">→</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TYPOGRAPHY ──────────────────────────────────────────── */}
        <section id="typography">
          <SectionHeader label="03 — TYPOGRAPHY" title="Type System" color="bg-cyan-300" />

          {/* Font Families */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6 mb-12">
            {fontFamilies.map(f => (
              <div key={f.name} className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className={`${f.color} border-b-4 border-black px-6 py-5`}>
                  <div className="text-5xl font-black mb-2" style={{ fontFamily: f.name }}>
                    {f.preview}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-black text-xl">{f.name}</h3>
                      <p className="font-bold text-sm text-gray-600">{f.role}</p>
                    </div>
                    <code className="text-xs font-mono bg-gray-100 border-2 border-black px-2 py-1">{f.token}</code>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {f.weights.map(w => (
                      <span key={w} className="text-xs font-black bg-black text-white border-2 border-black px-3 py-1">
                        {w}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-xs font-mono text-gray-500 border-2 border-gray-200 px-3 py-2 bg-gray-50">
                    font-family: '{f.name}', {f.fallback};
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Type Scale table */}
          <h3 className="font-black text-xl border-b-4 border-black pb-3 mb-6">TYPE SCALE</h3>
          <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[120px_1fr_100px_140px] border-b-4 border-black bg-black text-white">
              {['TOKEN', 'SPECIMEN', 'SIZE', 'WEIGHT'].map(h => (
                <div key={h} className="px-4 py-3 font-black text-xs border-r-2 border-gray-700 last:border-r-0">{h}</div>
              ))}
            </div>
            {typeScale.map((t, i) => (
              <div
                key={t.name}
                className={`grid grid-cols-[120px_1fr_100px_140px] border-b-4 border-black last:border-b-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="px-4 py-4 border-r-4 border-black">
                  <code className="font-mono text-xs bg-gray-100 border-2 border-black px-2 py-1 block truncate">{t.name}</code>
                </div>
                <div className="px-5 py-4 border-r-4 border-black flex items-center overflow-hidden">
                  <span
                    className={`font-black leading-none truncate ${t.tw} ${t.caps ? 'uppercase tracking-wider' : ''}`}
                    style={{ fontFamily: t.name.startsWith('Body') || t.name === 'Caption' ? 'Inter' : 'Space Grotesk' }}
                  >
                    {t.sample}
                  </span>
                </div>
                <div className="px-4 py-4 border-r-4 border-black flex items-center">
                  <span className="font-mono text-xs font-bold">{t.size}</span>
                </div>
                <div className="px-4 py-4 flex items-center">
                  <span className="font-bold text-xs">{t.weight}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Specimen */}
          <div className="mt-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="bg-pink-300 border-b-4 border-black px-6 py-4 font-black">
              FULL SPECIMEN — Space Grotesk
            </div>
            <div className="p-8 space-y-8">
              {[
                { label: 'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj', size: 'text-4xl' },
                { label: 'Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt', size: 'text-3xl' },
                { label: 'Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7 8 9', size: 'text-2xl' },
                { label: '! @ # $ % ^ & * ( ) - _ + = [ ] { }', size: 'text-xl' },
              ].map((row, i) => (
                <div key={i} className={`font-black ${row.size}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {row.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPACING ─────────────────────────────────────────────── */}
        <section id="spacing">
          <SectionHeader label="04 — SPACING" title="Spacing Scale" color="bg-lime-300" />
          <div className="mt-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="grid grid-cols-[160px_1fr_80px_1fr] border-b-4 border-black bg-black text-white">
              {['TOKEN', 'TAILWIND CLASS', 'VALUE', 'USAGE'].map(h => (
                <div key={h} className="px-4 py-3 font-black text-xs border-r-2 border-gray-700 last:border-r-0">{h}</div>
              ))}
            </div>
            {spacingTokens.map((s, i) => (
              <div
                key={s.token}
                className={`grid grid-cols-[160px_1fr_80px_1fr] border-b-4 border-black last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="px-4 py-4 border-r-4 border-black">
                  <code className="font-mono text-xs">{s.token}</code>
                </div>
                <div className="px-4 py-4 border-r-4 border-black flex items-center gap-3">
                  <div
                    className="bg-orange-300 border-2 border-black flex-shrink-0"
                    style={{ width: s.px, height: '20px', minWidth: '4px' }}
                  />
                  <code className="font-mono text-xs text-gray-600">{s.tw}</code>
                </div>
                <div className="px-4 py-4 border-r-4 border-black flex items-center">
                  <span className="font-black text-sm">{s.px}</span>
                </div>
                <div className="px-4 py-4 flex items-center">
                  <span className="font-bold text-sm text-gray-700">{s.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SHADOWS ─────────────────────────────────────────────── */}
        <section id="shadows">
          <SectionHeader label="05 — SHADOWS" title="Shadow System" color="bg-orange-300" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {shadows.map(s => (
              <div key={s.name} className="space-y-4">
                <div
                  className="bg-white border-4 border-black h-24 flex items-center justify-center font-black text-xl"
                  style={{ boxShadow: s.value }}
                >
                  {s.name}
                </div>
                <div>
                  <code className="text-xs font-mono bg-gray-100 border-2 border-black px-2 py-1 block mb-2">{s.token}</code>
                  <p className="text-xs font-mono text-gray-500">{s.value}</p>
                  <p className="text-xs font-bold text-gray-600 mt-1">{s.usage}</p>
                </div>
                <CopyButton value={s.value} label={s.name} />
              </div>
            ))}
          </div>

          {/* Border widths */}
          <h3 className="font-black text-xl border-b-4 border-black pb-3 mt-12 mb-6">BORDER WIDTHS</h3>
          <div className="flex flex-wrap gap-6">
            {[
              { w: '2px', tw: 'border-2', usage: 'Inner / nested' },
              { w: '4px', tw: 'border-4', usage: 'Standard' },
              { w: '6px', tw: 'border-6', usage: 'Featured cards' },
              { w: '8px', tw: 'border-8', usage: 'Hero sections' },
            ].map(b => (
              <div key={b.w} className="text-center space-y-2">
                <div
                  className="w-32 h-16 bg-white flex items-center justify-center font-black"
                  style={{ border: `${b.w} solid black` }}
                >
                  {b.w}
                </div>
                <code className="text-xs font-mono">{b.tw}</code>
                <p className="text-xs font-bold text-gray-600">{b.usage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPONENTS ──────────────────────────────────────────── */}
        <section id="components">
          <SectionHeader label="06 — COMPONENTS" title="Component Library" color="bg-pink-300" />

          {/* Buttons */}
          <div className="mt-10">
            <h3 className="font-black text-lg mb-5">BUTTONS</h3>
            <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              {[
                {
                  label: 'Primary', bg: 'bg-black', text: 'text-white',
                  border: 'border-black', shadow: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]',
                  note: 'Main CTA — checkout, sign in, primary actions',
                },
                {
                  label: 'Secondary', bg: 'bg-yellow-300', text: 'text-black',
                  border: 'border-black', shadow: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
                  note: 'Secondary CTA — add to cart, browse',
                },
                {
                  label: 'Outline', bg: 'bg-white', text: 'text-black',
                  border: 'border-black', shadow: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
                  note: 'Ghost / outline — cancel, contact',
                },
                {
                  label: 'Category', bg: 'bg-white', text: 'text-black',
                  border: 'border-black', shadow: '',
                  note: 'Filter / tag button — categories, toggles',
                },
                {
                  label: 'Danger', bg: 'bg-red-400', text: 'text-white',
                  border: 'border-black', shadow: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
                  note: 'Destructive — delete, remove, urgent',
                },
              ].map((btn, i) => (
                <div key={btn.label} className={`flex items-center gap-8 px-6 py-5 border-b-4 border-black last:border-b-0 ${i % 2 === 0 ? '' : 'bg-gray-50'}`}>
                  <div className="w-48 flex-shrink-0">
                    <button className={`px-6 py-3 font-black text-sm border-4 ${btn.border} ${btn.bg} ${btn.text} ${btn.shadow} hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                      {btn.label.toUpperCase()}
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-sm mb-1">{btn.label}</div>
                    <p className="font-bold text-xs text-gray-600">{btn.note}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="mt-10">
            <h3 className="font-black text-lg mb-5">BADGES & TAGS</h3>
            <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 bg-white flex flex-wrap gap-4 items-center">
              {[
                { label: 'VERIFIED ✅', bg: 'bg-lime-300', text: 'text-black' },
                { label: 'URGENT ⚠️', bg: 'bg-red-400', text: 'text-white' },
                { label: 'NEW ⚡', bg: 'bg-yellow-300', text: 'text-black' },
                { label: 'PINNED 📌', bg: 'bg-orange-300', text: 'text-black' },
                { label: 'FEATURED 🔥', bg: 'bg-pink-300', text: 'text-black' },
                { label: 'SALE 💸', bg: 'bg-cyan-300', text: 'text-black' },
                { label: 'CLEANING', bg: 'bg-white', text: 'text-black' },
                { label: 'TECH', bg: 'bg-purple-300', text: 'text-black' },
              ].map(badge => (
                <span
                  key={badge.label}
                  className={`${badge.bg} ${badge.text} font-black text-xs border-2 border-black px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="mt-10">
            <h3 className="font-black text-lg mb-5">CARD STYLES</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Service Card', bg: 'bg-cyan-200', shadow: '[8px_8px_0px_0px_rgba(0,0,0,1)]', rotation: '-rotate-1', border: 'border-6' },
                { label: 'Feature Card', bg: 'bg-pink-200', shadow: '[12px_12px_0px_0px_rgba(0,0,0,1)]', rotation: 'rotate-1', border: 'border-6' },
                { label: 'Info Card', bg: 'bg-yellow-200', shadow: '[6px_6px_0px_0px_rgba(0,0,0,1)]', rotation: '-rotate-2', border: 'border-4' },
              ].map(card => (
                <div
                  key={card.label}
                  className={`${card.bg} ${card.border} border-black shadow-${card.shadow} ${card.rotation} p-6 hover:rotate-0 hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] transition-all`}
                >
                  <div className="h-24 bg-white/60 border-4 border-black mb-4 flex items-center justify-center font-black text-sm opacity-60">
                    IMAGE
                  </div>
                  <div className="font-black">{card.label}</div>
                  <p className="font-bold text-xs mt-1 text-gray-700">Rotated, hard shadow, flat color</p>
                </div>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="mt-10">
            <h3 className="font-black text-lg mb-5">INPUT FIELDS</h3>
            <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 bg-white grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-black text-sm block">SEARCH INPUT</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for services..."
                    className="w-full pl-4 pr-4 py-3 border-4 border-black font-black text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all"
                    readOnly
                  />
                </div>
                <p className="text-xs font-bold text-gray-500">border-4, hard shadow, focus: larger shadow</p>
              </div>
              <div className="space-y-2">
                <label className="font-black text-sm block">SELECT / DROPDOWN</label>
                <div className="flex items-center border-4 border-black bg-white px-4 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
                  <span className="font-black text-sm flex-1">SORT BY: FEATURED</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <p className="text-xs font-bold text-gray-500">Custom dropdown with neo-brutalist border</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-8 border-black bg-black text-white p-10 flex flex-wrap items-center justify-between gap-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)]">
          <div>
            <div className="font-black text-3xl mb-2">CAMPUS SERVICES</div>
            <div className="font-bold text-gray-400">Design System · v2.0 · March 2026</div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {['#67E8F9','#F9A8D4','#FDE047','#BEF264','#FDBA74','#C4B5FD'].map(c => (
              <div key={c} className="w-10 h-10 border-4 border-gray-600" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HELPER ────────────────────────────────────────────────────────────────────
function SectionHeader({ label, title, color }: { label: string; title: string; color: string }) {
  return (
    <div className="flex items-start gap-6 flex-wrap">
      <div>
        <div className="font-mono text-xs font-bold text-gray-400 mb-2 tracking-widest">{label}</div>
        <h2 className={`text-5xl font-black inline-block ${color} border-6 border-black px-6 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1`}>
          {title.toUpperCase()}
        </h2>
      </div>
    </div>
  );
}