import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, Pin, AlertTriangle, Calendar, ChevronRight, Tag, Bell, Star, Zap, Clock } from 'lucide-react';

const categories = ['ALL', 'EVENTS', 'ACADEMIC', 'HOUSING', 'SPORTS', 'LOST & FOUND', 'URGENT'];

const announcements = [
  {
    id: 1,
    title: 'Campus Fest 2026 is ACTUALLY HAPPENING fr fr 🎉',
    category: 'EVENTS',
    date: 'Mar 5, 2026',
    time: '2 hours ago',
    pinned: true,
    urgent: false,
    new: true,
    description: "Yoooo the most anticipated event of the semester is HERE. Live music, food stalls, games, and surprise celebrity performance?? no cap. Register NOW before spots fill up!!",
    author: 'Student Council',
    color: 'bg-cyan-300',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    rotation: '-rotate-1',
    readCount: '1.2k reads',
  },
  {
    id: 2,
    title: '⚠️ URGENT: Library Access Changes from March 10',
    category: 'URGENT',
    date: 'Mar 5, 2026',
    time: '5 hours ago',
    pinned: true,
    urgent: true,
    new: false,
    description: "Starting March 10, the Central Library will implement a NEW booking system for study rooms. Walk-ins NO LONGER allowed during peak hours (9AM-5PM). Book your slot online NOW.",
    author: 'Library Admin',
    color: 'bg-red-200',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    rotation: 'rotate-1',
    readCount: '3.4k reads',
  },
  {
    id: 3,
    title: 'Hostel Wi-Fi Upgrade — Finally bestie 📶',
    category: 'HOUSING',
    date: 'Mar 4, 2026',
    time: '1 day ago',
    pinned: false,
    urgent: false,
    new: true,
    description: "After 84 years of 3 Mbps speed (ok exaggerating but still), Block A through D is getting fiber optic internet. Expect some downtime on March 12 from 2AM to 6AM. slay.",
    author: 'Housing Office',
    color: 'bg-lime-300',
    shadow: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    rotation: '-rotate-1',
    readCount: '892 reads',
  },
  {
    id: 4,
    title: 'Mid-Semester Exams Schedule — Drop has arrived 😤',
    category: 'ACADEMIC',
    date: 'Mar 4, 2026',
    time: '1 day ago',
    pinned: false,
    urgent: false,
    new: false,
    description: "The official mid-sem timetable is live on the academic portal. Semester 4 exams start March 20. Check your department specific schedule + make sure your admit card is downloaded.",
    author: 'Academics Office',
    color: 'bg-yellow-300',
    shadow: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    rotation: 'rotate-1',
    readCount: '4.1k reads',
  },
  {
    id: 5,
    title: 'Inter-College Basketball Tournament 🏀',
    category: 'SPORTS',
    date: 'Mar 3, 2026',
    time: '2 days ago',
    pinned: false,
    urgent: false,
    new: false,
    description: "Our college is hosting the regional inter-college basketball championship. Come cheer for our team!! Matches on March 15-17 at the main sports complex. Entry is FREE for students.",
    author: 'Sports Committee',
    color: 'bg-orange-300',
    shadow: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    rotation: '-rotate-1',
    readCount: '678 reads',
  },
  {
    id: 6,
    title: 'Lost: MacBook Pro Sticker Covered 💻 (REWARD!)',
    category: 'LOST & FOUND',
    date: 'Mar 3, 2026',
    time: '2 days ago',
    pinned: false,
    urgent: false,
    new: false,
    description: "Left my MacBook Pro (has a bunch of stickers including a big frog one lol) in the cafeteria yesterday around 4PM. If you found it PLEASE contact me. There's a legit reward ok.",
    author: 'Arjun Mehta (B.Tech CS-3)',
    color: 'bg-purple-300',
    shadow: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    rotation: 'rotate-2',
    readCount: '345 reads',
  },
  {
    id: 7,
    title: 'Hackathon 2026 — 48hrs to build something legendary 💻',
    category: 'EVENTS',
    date: 'Mar 2, 2026',
    time: '3 days ago',
    pinned: false,
    urgent: false,
    new: false,
    description: "The annual campus hackathon is BACK. Theme: AI for Social Good. Form teams of 2-4, register on the portal. Prizes worth ₹2 LAKHS. Plus internship opportunities from sponsors!",
    author: 'Tech Club',
    color: 'bg-pink-300',
    shadow: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    rotation: '-rotate-2',
    readCount: '2.3k reads',
  },
  {
    id: 8,
    title: 'Fee Payment Deadline Extension — you\'re welcome 🙏',
    category: 'ACADEMIC',
    date: 'Mar 1, 2026',
    time: '4 days ago',
    pinned: false,
    urgent: false,
    new: false,
    description: "Due to the server crash last week (iconic), the semester fee payment deadline has been extended to March 15. Late fee waiver requests must be submitted by March 10.",
    author: 'Finance Office',
    color: 'bg-cyan-200',
    shadow: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    rotation: 'rotate-1',
    readCount: '5.6k reads',
  },
];

const pinnedAnnouncements = announcements.filter(a => a.pinned);

const categoryColors: Record<string, string> = {
  'EVENTS': 'bg-cyan-300',
  'ACADEMIC': 'bg-yellow-300',
  'HOUSING': 'bg-lime-300',
  'SPORTS': 'bg-orange-300',
  'LOST & FOUND': 'bg-purple-300',
  'URGENT': 'bg-red-400',
  'ALL': 'bg-white',
};

export default function AnnouncementsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = activeCategory === 'ALL'
    ? announcements
    : announcements.filter(a => a.category === activeCategory);

  return (
    <div className="pt-16 min-h-screen bg-yellow-50 relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 right-10 w-52 h-52 bg-pink-300 rounded-full border-2 border-black opacity-20" />
        <div className="absolute top-80 left-8 w-36 h-36 bg-cyan-400 rotate-12 border-2 border-black opacity-20" />
        <div className="absolute bottom-60 right-1/4 w-28 h-28 bg-lime-400 border-2 border-black opacity-20" />
        <div className="absolute bottom-20 left-1/3 w-44 h-44 bg-orange-300 rounded-full border-2 border-black opacity-20" />
      </div>

      {/* Floating stickers */}
      <motion.div
        animate={{ rotate: [0, 8, 0], y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-28 left-12 bg-pink-400 border-2 border-black px-4 py-2 font-black text-sm rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-10 hidden lg:block"
      >
        READ UP! 📖
      </motion.div>
      <motion.div
        animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-44 right-16 bg-lime-300 border-2 border-black px-4 py-2 font-black text-sm -rotate-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-10 hidden lg:block"
      >
        STAY LIT 🔥
      </motion.div>

      {/* Hero Header */}
      <section className="py-16 bg-black border-b-4 border-black relative overflow-hidden">
        {/* Colorful stripes */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-cyan-400 opacity-20" />
          <div className="flex-1 bg-pink-400 opacity-20" />
          <div className="flex-1 bg-yellow-400 opacity-20" />
          <div className="flex-1 bg-lime-400 opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-yellow-300 border-2 border-yellow-300 px-6 py-2 font-black text-sm text-black rotate-1 shadow-[3px_3px_0px_0px_rgba(234,179,8,0.5)] mb-6">
              <Bell size={16} className="animate-bounce" />
              CAMPUS UPDATES — NO FILTER, ALL REAL
            </div>
            <div className="flex justify-center">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white border-2 border-yellow-300 px-8 py-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(253,224,71,1)] inline-block">
                ANNOUNCE<br className="sm:hidden" />MENTS 📢
              </h1>
            </div>
            <p className="text-white font-black text-xl mt-8 opacity-80">
              What's popping on campus rn? catch up bestie ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pinned Section */}
      {pinnedAnnouncements.length > 0 && (
        <section className="border-b-4 border-black bg-orange-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Pin size={24} className="rotate-45" />
              <h2 className="text-2xl font-black">PINNED ANNOUNCEMENTS</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {pinnedAnnouncements.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`${item.color} border-2 border-black ${item.shadow} p-6 ${item.rotation} hover:rotate-0 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-black text-white px-3 py-1 font-black text-xs border-2 border-black flex items-center gap-1">
                        <Pin size={10} />
                        PINNED
                      </span>
                      {item.urgent && (
                        <span className="bg-red-500 text-white px-3 py-1 font-black text-xs border-2 border-black flex items-center gap-1">
                          <AlertTriangle size={10} />
                          URGENT
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-black opacity-60 flex items-center gap-1">
                      <Clock size={12} />
                      {item.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-2 leading-tight">{item.title}</h3>
                  <p className="font-bold text-sm opacity-80 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black">— {item.author}</span>
                    <span className="text-xs font-black bg-white border-2 border-black px-2 py-1">{item.readCount}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag size={20} />
            <span className="font-black text-sm">FILTER BY CATEGORY:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 font-black text-sm border-2 border-black transition-all ${
                  activeCategory === cat
                    ? `${categoryColors[cat] || 'bg-white'} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-1`
                    : 'bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 mb-8 flex-wrap"
        >
          <div className="bg-black text-white px-4 py-2 font-black text-sm border-2 border-black">
            {filtered.length} POSTS
          </div>
          <div className="flex items-center gap-2 font-black text-sm">
            <Megaphone size={16} />
            <span>from your campus community</span>
          </div>
        </motion.div>

        {/* Announcements Feed */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div
                  className={`${item.color} border-2 border-black ${item.shadow} hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer overflow-hidden`}
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-black text-white px-3 py-1 font-black text-xs border-2 border-black">
                          {item.category}
                        </span>
                        {item.new && (
                          <span className="bg-white text-black px-3 py-1 font-black text-xs border-2 border-black flex items-center gap-1">
                            <Zap size={10} className="fill-yellow-400 text-yellow-400" />
                            NEW
                          </span>
                        )}
                        {item.urgent && (
                          <span className="bg-red-500 text-white px-3 py-1 font-black text-xs border-2 border-black flex items-center gap-1">
                            <AlertTriangle size={10} />
                            URGENT
                          </span>
                        )}
                        {item.pinned && (
                          <span className="bg-orange-400 text-black px-3 py-1 font-black text-xs border-2 border-black flex items-center gap-1">
                            <Pin size={10} />
                            PINNED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-black opacity-70">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {item.time}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black mb-3 leading-tight">{item.title}</h3>

                    <p className={`font-bold text-sm leading-relaxed mb-4 ${expandedId === item.id ? '' : 'line-clamp-2'}`}>
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black opacity-70">📌 {item.author}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black bg-white/60 border-2 border-black px-3 py-1 flex items-center gap-1">
                          <Star size={10} className="fill-black" />
                          {item.readCount}
                        </span>
                        <button className="flex items-center gap-1 font-black text-sm bg-black text-white px-4 py-2 border-2 border-black hover:bg-gray-800 transition-colors">
                          {expandedId === item.id ? 'LESS' : 'MORE'}
                          <ChevronRight size={14} className={`transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t-2 border-black"
                      >
                        <div className="p-6 bg-black/10">
                          <p className="font-bold leading-relaxed mb-4">{item.description}</p>
                          <button className="font-black text-sm bg-black text-white px-6 py-3 border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all">
                            SHARE THIS 🔗
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block bg-white border-2 border-black p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2">
                <p className="text-4xl mb-4">😴</p>
                <p className="text-2xl font-black mb-2">NOTHING HERE</p>
                <p className="font-bold">No posts in this category rn!</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}