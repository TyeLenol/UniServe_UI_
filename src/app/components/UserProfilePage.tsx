import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router';
import {
  User, Mail, Lock, Phone, Camera, Eye, EyeOff,
  Star, Edit3, Save, X, Calendar, Trash2,
  ShoppingBag, CheckCircle, AlertTriangle, LogOut, ChevronRight,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────
type TabId        = 'profile' | 'bookings' | 'settings';
type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED';
type BookingSubTab = 'active' | 'history';

// ── Shared style tokens ──────────────────────────────────────────────────────
const inputCls =
  'w-full pl-11 pr-4 py-3 border-2 border-black font-bold text-sm bg-white ' +
  'focus:outline-none focus:bg-yellow-50 ' +
  'shadow-[1px_1px_0px_0px_rgba(0,0,0)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0)] ' +
  'transition-all placeholder:font-normal placeholder:text-gray-400';

// ── Status badge config ──────────────────────────────────────────────────────
const statusStyle: Record<BookingStatus, { bg: string }> = {
  'PENDING':     { bg: 'bg-yellow-300' },
  'CONFIRMED':   { bg: 'bg-cyan-300'   },
  'IN PROGRESS': { bg: 'bg-purple-300' },
  'COMPLETED':   { bg: 'bg-lime-300'   },
  'CANCELLED':   { bg: 'bg-red-300'    },
};

// ── Mock data ────────────────────────────────────────────────────────────────
const activeBookings = [
  {
    id: 'B-001', orderId: 'ORD-ACT001', service: 'Premium Laundry Service', category: 'Cleaning',
    option: 'Wash & Fold', date: 'Mar 10, 2026', time: '10:00 AM',
    price: 99,  status: 'CONFIRMED'   as BookingStatus, provider: 'CleanCo Campus',
  },
  {
    id: 'B-002', orderId: 'ORD-ACT002', service: 'Hair Styling & Grooming', category: 'Grooming',
    option: 'Style & Cut',     date: 'Mar 12, 2026', time: '2:30 PM',
    price: 299, status: 'PENDING'     as BookingStatus, provider: 'StyleHub',
  },
  {
    id: 'B-003', orderId: 'ORD-ACT003', service: 'Tech Repair Hub',         category: 'Tech',
    option: 'Software Issues', date: 'Mar 8, 2026',  time: '11:00 AM',
    price: 499, status: 'IN PROGRESS' as BookingStatus, provider: 'TechFix Pro',
  },
];

const historyBookings = [
  { id: 'B-098', orderId: 'ORD-HST098', service: 'Coffee & Snacks Delivery', category: 'Food',     option: 'Standard Delivery', date: 'Feb 28, 2026', price: 149, status: 'COMPLETED' as BookingStatus, rating: 5    },
  { id: 'B-097', orderId: 'ORD-HST097', service: 'Room Cleaning Service',    category: 'Cleaning', option: 'Basic Clean',       date: 'Feb 22, 2026', price: 199, status: 'COMPLETED' as BookingStatus, rating: 4    },
  { id: 'B-096', orderId: 'ORD-HST096', service: 'Healthy Meal Plans',       category: 'Food',     option: '2 meals/day',       date: 'Feb 15, 2026', price: 249, status: 'CANCELLED' as BookingStatus, rating: null },
  { id: 'B-095', orderId: 'ORD-HST095', service: 'Express Ironing',          category: 'Cleaning', option: 'Express',           date: 'Feb 10, 2026', price: 79,  status: 'COMPLETED' as BookingStatus, rating: 5    },
  { id: 'B-094', orderId: 'ORD-HST094', service: 'Fresh Juice Bar',          category: 'Food',     option: 'Smoothie Bundle',   date: 'Feb 5, 2026',  price: 199, status: 'COMPLETED' as BookingStatus, rating: 5    },
];

// ── Sub-components ───────────────────────────────────────────────────────────
function NeoToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-12 h-7 border-4 border-black transition-colors flex-shrink-0 ${checked ? 'bg-lime-300' : 'bg-gray-200'} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-black transition-all ${checked ? 'left-[calc(100%-18px)]' : 'left-0.5'}`} />
    </button>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-black text-xs uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function SectionHeading({ label, accentColor }: { label: string; accentColor: string }) {
  return (
    <h2 className="text-lg font-black uppercase tracking-wider mb-4 flex items-center gap-2">
      <div className={`w-1.5 h-6 ${accentColor}`} />
      {label}
    </h2>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function UserProfilePage() {
  const { search } = useLocation();
  const urlTab = new URLSearchParams(search).get('tab') as TabId | null;
  const [activeTab, setActiveTab]           = useState<TabId>(urlTab && ['profile','bookings','settings'].includes(urlTab) ? urlTab : 'profile');
  const [bookingSubTab, setBookingSubTab]   = useState<BookingSubTab>('active');
  const [isEditingProfile, setIsEditing]   = useState(false);
  const [profileSaved, setProfileSaved]    = useState(false);
  const [pwSaved, setPwSaved]              = useState(false);
  const [deleteText, setDeleteText]        = useState('');

  // Password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Notification prefs
  const [notifs, setNotifs] = useState({
    bookingConfirmed: true,
    bookingReminder:  true,
    providerMessages: true,
    promotions:       false,
    announcements:    true,
  });

  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'Marilyn',
    lastName:  'Andrews',
    email:     'marilynandrews10@gmail.com',
    phone:     '+1 (555) 012-3456',
  });
  const [editProfile, setEditProfile] = useState({ ...profile });

  // Password form
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();

  const handleSaveProfile = () => {
    setProfile({ ...editProfile });
    setIsEditing(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleCancelEdit = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwForm({ current: '', newPw: '', confirm: '' });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2500);
  };

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="pt-16 min-h-screen bg-gray-50">

      {/* ── PROFILE HERO ─────────────────────────────────────────── */}
      <div className="bg-black border-b-8 border-black relative overflow-hidden">
        {/* Faint background accents */}
        <div className="absolute top-0 right-0 w-72 h-full bg-yellow-300 opacity-[0.04] pointer-events-none" />
        <div className="absolute -bottom-8 left-1/3 w-48 h-48 bg-cyan-400 opacity-[0.05] rotate-12 pointer-events-none" />
        <div className="absolute top-4 left-8 w-20 h-20 bg-pink-400 opacity-[0.06] rotate-45 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 bg-yellow-300 border-4 border-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(255,255,255,0.12)]">
                <span className="font-black text-3xl text-black tracking-tight">{initials}</span>
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-4 border-black flex items-center justify-center hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                <Camera size={13} />
              </button>
            </div>

            {/* Name + meta */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-white leading-none tracking-tight">
                  {profile.firstName} {profile.lastName}
                </h1>
                <span className="bg-yellow-300 px-2.5 py-1 font-black text-black text-[10px] uppercase tracking-[0.15em] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] border-2 border-yellow-400">
                  CUSTOMER
                </span>
              </div>
              <p className="font-bold text-white/90 text-sm">{profile.email}</p>
              <p className="font-bold text-white/40 text-xs uppercase tracking-[0.18em] mt-1">Member since January 2026</p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3 sm:ml-auto">
              {[
                { value: '12',    label: 'BOOKINGS',  bg: 'bg-cyan-300',  rot: 'rotate-1'  },
                { value: '8',     label: 'COMPLETED', bg: 'bg-lime-300',  rot: '-rotate-1' },
                { value: '₹4,240', label: 'SPENT',   bg: 'bg-pink-300',  rot: 'rotate-1'  },
              ].map(({ value, label, bg, rot }) => (
                <div
                  key={label}
                  className={`${bg} ${rot} border-4 border-white px-4 py-3 text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.12)] min-w-[70px]`}
                >
                  <div className="font-black text-xl text-black leading-none">{value}</div>
                  <div className="font-black text-[9px] text-black/60 tracking-[0.15em] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB BAR ──────────────────────────────────────────────── */}
      <div className="bg-white border-b-4 border-black sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {(
              [
                { id: 'profile',  label: 'MY PROFILE', badge: null                  },
                { id: 'bookings', label: 'BOOKINGS',   badge: activeBookings.length },
                { id: 'settings', label: 'SETTINGS',   badge: null                  },
              ] as { id: TabId; label: string; badge: number | null }[]
            ).map(({ id, label, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative flex-1 sm:flex-none sm:px-8 py-4 font-black text-xs uppercase tracking-widest transition-colors border-r-4 border-black last:border-r-0 flex items-center justify-center gap-2 ${
                  activeTab === id ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {label}
                {badge !== null && (
                  <span className={`w-5 h-5 border-2 border-black font-black text-[10px] flex items-center justify-center ${activeTab === id ? 'bg-yellow-300 text-black border-yellow-300' : 'bg-cyan-300 text-black'}`}>
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">

          {/* ══════════════════════════════════════════════════════
              MY PROFILE TAB
          ══════════════════════════════════════════════════════ */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.18 }}
            >
              {/* Section header */}
              <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-black">PERSONAL INFO</h2>
                  <p className="font-bold text-gray-400 text-sm mt-0.5">Your account details and contact info</p>
                </div>
                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all bg-white flex-shrink-0"
                  >
                    <Edit3 size={13} /> EDIT PROFILE
                  </button>
                ) : (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={handleCancelEdit}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-black font-black text-xs uppercase tracking-wider bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0)]"
                    >
                      <X size={13} /> CANCEL
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border-4 border-black font-black text-xs uppercase tracking-wider bg-black text-white hover:-translate-y-0.5 transition-all shadow-[4px_4px_0px_0px_#fde047]"
                    >
                      <Save size={13} /> SAVE
                    </button>
                  </div>
                )}
              </div>

              {/* Saved toast */}
              <AnimatePresence>
                {profileSaved && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-5 flex items-center gap-3 bg-lime-300 border-2 border-black px-5 py-3 font-black text-sm shadow-[1px_1px_0px_0px_rgba(0,0,0)]"
                  >
                    <CheckCircle size={16} /> PROFILE UPDATED! ✓
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Profile card */}
              <div className="bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]">
                <AnimatePresence mode="wait">
                  {isEditingProfile ? (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-6 space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="First Name" icon={<User size={15} />}>
                          <input type="text" value={editProfile.firstName} onChange={e => setEditProfile({ ...editProfile, firstName: e.target.value })} className={inputCls} />
                        </Field>
                        <Field label="Last Name" icon={<User size={15} />}>
                          <input type="text" value={editProfile.lastName} onChange={e => setEditProfile({ ...editProfile, lastName: e.target.value })} className={inputCls} />
                        </Field>
                      </div>
                      <Field label="Email Address" icon={<Mail size={15} />}>
                        <input type="email" value={editProfile.email} onChange={e => setEditProfile({ ...editProfile, email: e.target.value })} className={inputCls} />
                      </Field>
                      <Field label="Phone Number" icon={<Phone size={15} />}>
                        <input type="tel" value={editProfile.phone} onChange={e => setEditProfile({ ...editProfile, phone: e.target.value })} className={inputCls} />
                      </Field>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="grid grid-cols-1 sm:grid-cols-2 divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-gray-100"
                    >
                      {[
                        { label: 'FIRST NAME',    value: profile.firstName, icon: <User  size={13} /> },
                        { label: 'LAST NAME',     value: profile.lastName,  icon: <User  size={13} /> },
                        { label: 'EMAIL ADDRESS', value: profile.email,     icon: <Mail  size={13} /> },
                        { label: 'PHONE NUMBER',  value: profile.phone,     icon: <Phone size={13} /> },
                      ].map(({ label, value, icon }) => (
                        <div key={label} className="p-6">
                          <div className="flex items-center gap-1.5 font-black text-[10px] text-gray-400 uppercase tracking-[0.18em] mb-2">
                            {icon} {label}
                          </div>
                          <div className="font-black text-base">{value}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Role info card */}
              <div className="mt-5 bg-yellow-50 border-2 border-black p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 border-3 border-black flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <div className="font-black text-xs uppercase tracking-wider mb-1">YOUR ROLE: CUSTOMER</div>
                  <p className="font-bold text-xs text-gray-500 leading-relaxed">
                    You browse and book campus services.{' '}
                    
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════
              BOOKINGS TAB
          ══════════════════════════════════════════════════════ */}
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.18 }}
            >
              {/* Sub-tabs */}
              <div className="flex border-2 border-black mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-xs">
                <button
                  onClick={() => setBookingSubTab('active')}
                  className={`flex-1 py-3 font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${bookingSubTab === 'active' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
                >
                  ACTIVE
                  <span className={`w-5 h-5 border-2 border-black font-black text-[10px] flex items-center justify-center ${bookingSubTab === 'active' ? 'bg-yellow-300 text-black border-yellow-300' : 'bg-cyan-200'}`}>
                    {activeBookings.length}
                  </span>
                </button>
                <button
                  onClick={() => setBookingSubTab('history')}
                  className={`flex-1 py-3 font-black text-xs uppercase tracking-widest border-l-4 border-black transition-colors ${bookingSubTab === 'history' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
                >
                  HISTORY
                </button>
              </div>

              <AnimatePresence mode="wait">
                {/* Active bookings */}
                {bookingSubTab === 'active' && (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    {activeBookings.map((b, i) => (
                      <motion.div
                        key={b.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 transition-all"
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="min-w-0">
                              <span className="font-black text-[10px] text-gray-400 uppercase tracking-widest">{b.category} · {b.id}</span>
                              <h3 className="font-black text-lg leading-tight mt-0.5 truncate">{b.service}</h3>
                              <p className="font-bold text-xs text-gray-500 mt-0.5">{b.option} · by {b.provider}</p>
                            </div>
                            <span className={`${statusStyle[b.status].bg} border-1 border-black px-3 py-1.5 font-black text-[10px] uppercase tracking-widest flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                              {b.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 font-bold text-xs text-gray-500">
                                <Calendar size={12} /> {b.date} · {b.time}
                              </div>
                              <div className="font-black text-sm">₹{b.price}</div>
                            </div>
                            <div className="flex gap-2">
                              {b.status !== 'IN PROGRESS' && (
                                <button className="font-black text-[10px] uppercase tracking-wider px-3 py-2 border-2 border-red-400 text-red-500 hover:bg-red-80 transition-colors">
                                  CANCEL
                                </button>
                              )}
                              <Link to={`/order/${b.orderId}`} className="font-black text-[10px] uppercase tracking-wider px-3 py-2 border-2 border-black hover:bg-gray-100 transition-colors">
                                DETAILS
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* History */}
                {bookingSubTab === 'history' && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-3"
                  >
                    {historyBookings.map((b, i) => (
                      <motion.div
                        key={b.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="bg-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                      >
                        <div className="p-4 flex items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <span className="font-black text-[10px] text-gray-500 uppercase tracking-widest">{b.category} · {b.id}</span>
                              <span className={`${statusStyle[b.status].bg} border-2 border-black px-2 py-0.5 font-black text-[9px] uppercase tracking-wider`}>
                                {b.status}
                              </span>
                            </div>
                            <h3 className="font-black text-base leading-tight truncate">{b.service}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="font-bold text-xs text-gray-500">{b.date}</span>
                              <span className="font-black text-sm">₹{b.price}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            {b.rating !== null ? (
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <Star key={j} size={12} className={j < b.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                                ))}
                              </div>
                            ) : (
                              <span className="font-black text-[9px] text-gray-300 uppercase tracking-wider">No review</span>
                            )}
                            {b.status === 'COMPLETED' && (
                              <button className="font-black text-[10px] uppercase tracking-wider px-3 py-1.5 border-2 border-black hover:bg-gray-100 transition-colors whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                REBOOK
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Lifetime summary */}
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        { value: historyBookings.filter(b => b.status === 'COMPLETED').length, label: 'Completed', bg: 'bg-lime-300' },
                        { value: historyBookings.filter(b => b.status === 'CANCELLED').length, label: 'Cancelled',  bg: 'bg-red-300'  },
                        { value: `₹${historyBookings.reduce((s, b) => s + (b.status === 'COMPLETED' ? b.price : 0), 0)}`, label: 'Total spent', bg: 'bg-cyan-300' },
                      ].map(({ value, label, bg }, i) => (
                        <div key={label} className={`${bg} border-3 border-black p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                          <div className="font-black text-xl">{value}</div>
                          <div className="font-black text-[10px] text-black/80 uppercase tracking-wider mt-0.5">{label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════
              SETTINGS TAB
          ══════════════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.18 }}
              className="space-y-8 max-w-2xl"
            >
              {/* ── Change Password ── */}
              <div>
                <SectionHeading label="CHANGE PASSWORD" accentColor="bg-yellow-300" />
                <div className="bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-6">
                  <AnimatePresence>
                    {pwSaved && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-5 flex items-center gap-3 bg-lime-300 border-4 border-black px-4 py-3 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <CheckCircle size={15} /> PASSWORD UPDATED! ✓
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <form onSubmit={handleSavePassword} className="space-y-4">
                    <Field label="Current Password" icon={<Lock size={15} />}>
                      <input
                        type={showCurrent ? 'text' : 'password'}
                        placeholder="Enter current password"
                        value={pwForm.current}
                        onChange={e => setPwForm({ ...pwForm, current: e.target.value })}
                        className={`${inputCls} pr-12`}
                        required
                      />
                      <button type="button" onClick={() => setShowCurrent(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                        {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="New Password" icon={<Lock size={15} />}>
                        <input
                          type={showNew ? 'text' : 'password'}
                          placeholder="Min. 8 characters"
                          value={pwForm.newPw}
                          onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })}
                          className={`${inputCls} pr-12`}
                          required minLength={8}
                        />
                        <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                          {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </Field>
                      <Field label="Confirm New Password" icon={<Lock size={15} />}>
                        <input
                          type={showConfirm ? 'text' : 'password'}
                          placeholder="Repeat password"
                          value={pwForm.confirm}
                          onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
                          className={`${inputCls} pr-12`}
                          required
                        />
                        <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                          {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </Field>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-black text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#fde047] hover:shadow-[5px_5px_0px_0px_#fde047] hover:-translate-y-0.5 transition-all"
                    >
                      UPDATE PASSWORD →
                    </button>
                  </form>
                </div>
              </div>

              {/* ── Notifications ── */}
              <div>
                <SectionHeading label="NOTIFICATIONS" accentColor="bg-cyan-300" />
                <div className="bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] divide-y-4 divide-gray-100">
                  {[
                    { key: 'bookingConfirmed', label: 'Booking Confirmed',    desc: 'When a provider confirms your booking'           },
                    { key: 'bookingReminder',  label: 'Booking Reminders',    desc: '1 hour before your scheduled service'            },
                    { key: 'providerMessages', label: 'Provider Messages',    desc: 'Direct messages from your service providers'     },
                    { key: 'promotions',       label: 'Deals & Promotions',   desc: 'Student discounts and special offers'            },
                    { key: 'announcements',    label: 'Campus Announcements', desc: 'Important campus-wide updates from admin'        },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-4">
                      <div className="min-w-0">
                        <div className="font-black text-sm">{label}</div>
                        <div className="font-bold text-xs text-gray-400 mt-0.5">{desc}</div>
                      </div>
                      <NeoToggle
                        checked={notifs[key as keyof typeof notifs]}
                        onChange={() => toggleNotif(key as keyof typeof notifs)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Account ── */}
              <div>
                <SectionHeading label="ACCOUNT" accentColor="bg-gray-300" />
                <div className="bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]">
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left border-b-4 border-gray-100">
                    <div className="flex items-center gap-3">
                      <LogOut size={15} className="text-gray-500" />
                      <div className="font-black text-sm">Sign Out</div>
                    </div>
                    <ChevronRight size={15} className="text-gray-400" />
                  </button>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 bg-gray-300 border-2 border-gray-400" />
                      <div>
                        <div className="font-black text-sm">Account ID</div>
                        <div className="font-bold text-xs text-gray-400 font-mono">USR-20260113-7842</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Danger Zone ── */}
              <div>
                <SectionHeading label="DANGER ZONE" accentColor="bg-red-400" />
                <div className="bg-white border-4 border-red-600 shadow-[6px_6px_0px_0px_rgba(248,113,113,0.45)] p-6">
                  <div className="flex items-start gap-3 mb-6">
                    <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-black text-sm mb-1">Delete Account</div>
                      <p className="font-bold text-xs text-gray-500 leading-relaxed">
                        Permanent. All your bookings, profile, and history will be wiped. There is no undo.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block font-black text-xs uppercase tracking-wider mb-1.5 text-red-500">
                        Type DELETE to confirm
                      </label>
                      <input
                        type="text"
                        placeholder="DELETE"
                        value={deleteText}
                        onChange={e => setDeleteText(e.target.value)}
                        className="w-full px-4 py-3 border-4 border-red-300 font-bold text-sm bg-red-50 focus:outline-none focus:border-red-500 transition-colors max-w-xs"
                      />
                    </div>
                    <button
                      disabled={deleteText !== 'DELETE'}
                      className={`flex items-center gap-2 px-5 py-3 font-black text-xs uppercase tracking-wider border-4 transition-all ${
                        deleteText === 'DELETE'
                          ? 'bg-red-500 text-white border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 cursor-pointer'
                          : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                      }`}
                    >
                      <Trash2 size={13} /> DELETE MY ACCOUNT
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}