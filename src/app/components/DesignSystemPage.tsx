import { motion } from 'motion/react';
import { Palette, Type, Check, Copy } from 'lucide-react';
import { useState } from 'react';

const colorPalette = [
  { name: 'Cyan', hex: '#67E8F9', tailwind: 'cyan-300', usage: 'Primary accents, tech-related' },
  { name: 'Pink', hex: '#F9A8D4', tailwind: 'pink-300', usage: 'Secondary accents, highlights' },
  { name: 'Yellow', hex: '#FDE047', tailwind: 'yellow-300', usage: 'Tertiary accents, warnings' },
  { name: 'Lime', hex: '#BEF264', tailwind: 'lime-300', usage: 'Success states, nature' },
  { name: 'Orange', hex: '#FDBA74', tailwind: 'orange-300', usage: 'CTAs, energy' },
  { name: 'Purple', hex: '#C4B5FD', tailwind: 'purple-300', usage: 'Premium, creative' },
  { name: 'Black', hex: '#000000', tailwind: 'black', usage: 'Borders, text, emphasis' },
  { name: 'White', hex: '#FFFFFF', tailwind: 'white', usage: 'Background, contrast' },
];

const brighterColors = [
  { name: 'Cyan 400', hex: '#22D3EE', tailwind: 'cyan-400' },
  { name: 'Pink 400', hex: '#F472B6', tailwind: 'pink-400' },
  { name: 'Yellow 400', hex: '#FACC15', tailwind: 'yellow-400' },
  { name: 'Lime 400', hex: '#A3E635', tailwind: 'lime-400' },
  { name: 'Orange 400', hex: '#FB923C', tailwind: 'orange-400' },
  { name: 'Purple 400', hex: '#A78BFA', tailwind: 'purple-400' },
];

const lighterColors = [
  { name: 'Cyan 200', hex: '#A5F3FC', tailwind: 'cyan-200' },
  { name: 'Pink 200', hex: '#FBCFE8', tailwind: 'pink-200' },
  { name: 'Yellow 200', hex: '#FEF08A', tailwind: 'yellow-200' },
  { name: 'Lime 200', hex: '#D9F99D', tailwind: 'lime-200' },
  { name: 'Orange 200', hex: '#FED7AA', tailwind: 'orange-200' },
  { name: 'Purple 200', hex: '#DDD6FE', tailwind: 'purple-200' },
];

export default function DesignSystemPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-400 rounded-full border-4 border-black opacity-20" />
        <div className="absolute top-60 right-20 w-32 h-32 bg-lime-400 rotate-45 border-4 border-black opacity-20" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-orange-400 border-4 border-black opacity-20" />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-cyan-400 rounded-full border-4 border-black opacity-20" />
      </div>

      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 border-b-8 border-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-black text-white px-6 py-2 font-black text-sm border-4 border-black rotate-1 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] mb-6">
              ✨ DESIGN SYSTEM ✨
            </div>
            <h1 className="inline-block text-5xl sm:text-6xl lg:text-7xl font-black mb-4 bg-white border-8 border-black px-8 py-4 -rotate-1 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              TYPOGRAPHY & COLORS
            </h1>
            <p className="text-xl font-bold mt-8">
              Neo-Brutalist design language for campus services 🎨
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Typography Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-white border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Type size={32} className="font-black" />
              <h2 className="text-4xl font-black">TYPOGRAPHY</h2>
            </div>

            {/* Space Grotesk - Headings */}
            <div className="mb-12 pb-12 border-b-4 border-black">
              <div className="mb-6">
                <div className="inline-block bg-purple-200 border-4 border-black px-4 py-2 font-black text-sm mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  HEADINGS & TITLES
                </div>
                <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Space Grotesk
                </h3>
                <p className="text-base font-bold text-gray-700 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Used for all headings, titles, buttons, and emphasis text
                </p>
                <div className="flex gap-3 flex-wrap mb-6">
                  <span className="px-3 py-1 bg-gray-100 border-2 border-black text-xs font-black">BOLD (700)</span>
                  <span className="px-3 py-1 bg-gray-100 border-2 border-black text-xs font-black">SEMIBOLD (600)</span>
                  <span className="px-3 py-1 bg-gray-100 border-2 border-black text-xs font-black">MEDIUM (500)</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-7xl font-black mb-2 leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Hero Title
                  </div>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    7xl / 72px / Bold
                  </p>
                </div>

                <div>
                  <div className="text-5xl font-black mb-2 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Page Heading
                  </div>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    5xl / 48px / Bold
                  </p>
                </div>

                <div>
                  <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Section Title
                  </div>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    3xl / 30px / Bold
                  </p>
                </div>

                <div>
                  <div className="text-xl font-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Card Title / Subheading
                  </div>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    xl / 20px / Bold
                  </p>
                </div>

                <div>
                  <div className="text-base font-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    BUTTON TEXT / LABEL
                  </div>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    base / 16px / Bold / UPPERCASE
                  </p>
                </div>
              </div>
            </div>

            {/* Inter - Body Text */}
            <div>
              <div className="mb-6">
                <div className="inline-block bg-cyan-200 border-4 border-black px-4 py-2 font-black text-sm mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  BODY & UI TEXT
                </div>
                <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Inter
                </h3>
                <p className="text-base font-bold text-gray-700 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Used for body copy, descriptions, and interface elements
                </p>
                <div className="flex gap-3 flex-wrap mb-6">
                  <span className="px-3 py-1 bg-gray-100 border-2 border-black text-xs font-black">BOLD (700)</span>
                  <span className="px-3 py-1 bg-gray-100 border-2 border-black text-xs font-black">SEMIBOLD (600)</span>
                  <span className="px-3 py-1 bg-gray-100 border-2 border-black text-xs font-black">MEDIUM (500)</span>
                  <span className="px-3 py-1 bg-gray-100 border-2 border-black text-xs font-black">REGULAR (400)</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Large body text for important paragraphs and introductions. This is xl size at 20px with bold weight.
                  </p>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    xl / 20px / Bold
                  </p>
                </div>

                <div>
                  <p className="text-base font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Standard body text for descriptions and general content. This is base size at 16px with bold weight for emphasis.
                  </p>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    base / 16px / Bold
                  </p>
                </div>

                <div>
                  <p className="text-base mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Regular body text for longer paragraphs and detailed descriptions. This is base size at 16px with regular weight for readability.
                  </p>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    base / 16px / Regular
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Small text for captions, labels, and secondary information. This is sm size at 14px.
                  </p>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    sm / 14px / Medium
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Extra small text for metadata, tags, and fine print. This is xs size at 12px.
                  </p>
                  <p className="text-sm text-gray-600 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    xs / 12px / Medium
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Color Palette Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="flex items-center gap-3 mb-8">
              <Palette size={32} className="font-black" />
              <h2 className="text-4xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                COLOR PALETTE
              </h2>
            </div>

            {/* Main Colors */}
            <div className="mb-10">
              <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Primary Colors (300 Shade)
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {colorPalette.map((color, index) => (
                  <motion.div
                    key={color.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all overflow-hidden">
                      <div 
                        className="h-32 border-b-4 border-black relative"
                        style={{ backgroundColor: color.hex }}
                      >
                        <button
                          onClick={() => copyToClipboard(color.hex, color.name)}
                          className="absolute top-2 right-2 bg-white border-2 border-black p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                        >
                          {copiedColor === color.name ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="font-black text-lg mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {color.name}
                        </h4>
                        <p className="text-xs font-bold mb-2 font-mono" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {color.hex}
                        </p>
                        <p className="text-xs font-medium mb-2 bg-gray-100 px-2 py-1 border-2 border-black inline-block" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {color.tailwind}
                        </p>
                        {color.usage && (
                          <p className="text-xs text-gray-600 font-bold mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {color.usage}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Brighter Shades */}
            <div className="mb-10 pb-10 border-b-4 border-black">
              <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Brighter Accents (400 Shade)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {brighterColors.map((color, index) => (
                  <motion.div
                    key={color.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all overflow-hidden">
                      <div 
                        className="h-20 border-b-4 border-black relative"
                        style={{ backgroundColor: color.hex }}
                      >
                        <button
                          onClick={() => copyToClipboard(color.hex, color.name)}
                          className="absolute top-1 right-1 bg-white border-2 border-black p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedColor === color.name ? (
                            <Check size={12} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-black mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {color.name}
                        </p>
                        <p className="text-[10px] font-mono font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {color.hex}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Lighter Shades */}
            <div>
              <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Softer Backgrounds (200 Shade)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {lighterColors.map((color, index) => (
                  <motion.div
                    key={color.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all overflow-hidden">
                      <div 
                        className="h-20 border-b-4 border-black relative"
                        style={{ backgroundColor: color.hex }}
                      >
                        <button
                          onClick={() => copyToClipboard(color.hex, color.name)}
                          className="absolute top-1 right-1 bg-white border-2 border-black p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedColor === color.name ? (
                            <Check size={12} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-black mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {color.name}
                        </p>
                        <p className="text-[10px] font-mono font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {color.hex}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">
            <h2 className="text-4xl font-black mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              NEO-BRUTALIST PRINCIPLES
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'THICK BORDERS',
                  desc: 'Use 4-8px black borders on all major elements',
                  color: 'bg-cyan-200'
                },
                {
                  title: 'HARD SHADOWS',
                  desc: 'Drop shadows: 6px-12px offset, no blur, pure black',
                  color: 'bg-pink-200'
                },
                {
                  title: 'BOLD TYPOGRAPHY',
                  desc: 'All-caps for emphasis, bold weights, Space Grotesk',
                  color: 'bg-yellow-200'
                },
                {
                  title: 'FLAT COLORS',
                  desc: 'No gradients on cards, pure color blocks',
                  color: 'bg-lime-200'
                },
                {
                  title: 'ASYMMETRIC LAYOUTS',
                  desc: 'Rotate elements 1-3°, playful positioning',
                  color: 'bg-purple-200'
                },
                {
                  title: 'GEN-Z LANGUAGE',
                  desc: 'Casual tone, emojis, "fr fr" and "no cap"',
                  color: 'bg-orange-200'
                },
              ].map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className={`${principle.color} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6`}
                >
                  <h3 className="text-xl font-black mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {principle.title}
                  </h3>
                  <p className="font-bold leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {principle.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
