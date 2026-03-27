import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import {
  LayoutDashboard, Package, Calendar, BarChart3, Star, Settings,
  Plus, Edit2, Trash2, LogOut, ChevronRight, TrendingUp, Users,
  MessageSquare, Clock
} from 'lucide-react';

type ProviderTab = 'overview' | 'services' | 'bookings' | 'analytics' | 'reviews' | 'settings';
type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  timesBooked: number;
  rating: number;
}

interface Booking {
  id: string;
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: number;
  customerRating?: number;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock data
const INIT_SERVICES: Service[] = [
  { id: 'S1', name: 'Room Deep Clean', description: 'Comprehensive dorm cleaning', price: 45, duration: '2 hours', timesBooked: 12, rating: 4.8 },
  { id: 'S2', name: 'Laundry Service', description: 'Wash, dry, fold & deliver', price: 25, duration: '1 day', timesBooked: 8, rating: 4.9 },
  { id: 'S3', name: 'Quick Tidy', description: '30-min room organization', price: 20, duration: '30 mins', timesBooked: 5, rating: 4.7 },
];

const INIT_BOOKINGS: Booking[] = [
  { id: 'B1', customerName: 'Marilyn Andrews', serviceName: 'Room Deep Clean', date: 'Mar 15, 2026', time: '2:00 PM', status: 'confirmed', price: 45, customerRating: 5 },
  { id: 'B2', customerName: 'James Okafor', serviceName: 'Laundry Service', date: 'Mar 16, 2026', time: '10:00 AM', status: 'pending', price: 25 },
  { id: 'B3', customerName: 'Priya Sharma', serviceName: 'Quick Tidy', date: 'Mar 13, 2026', time: '3:00 PM', status: 'completed', price: 20, customerRating: 4 },
  { id: 'B4', customerName: 'Kofi Mensah', serviceName: 'Room Deep Clean', date: 'Mar 10, 2026', time: '1:00 PM', status: 'completed', price: 45, customerRating: 5 },
];

const INIT_REVIEWS: Review[] = [
  { id: 'R1', customerName: 'Marilyn Andrews', rating: 5, comment: 'Excellent service! Very thorough and professional.', date: 'Mar 13, 2026' },
  { id: 'R2', customerName: 'Kofi Mensah', rating: 5, comment: 'Amazing work! My room looks brand new.', date: 'Mar 10, 2026' },
  { id: 'R3', customerName: 'Priya Sharma', rating: 4, comment: 'Good job overall, very quick.', date: 'Mar 8, 2026' },
];

const bookingStatusStyles: Record<BookingStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border border-blue-200',
  'in-progress': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border border-red-200',
};

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProviderTab>('overview');
  const [services, setServices] = useState<Service[]>(INIT_SERVICES);
  const [bookings, setBookings] = useState<Booking[]>(INIT_BOOKINGS);
  const [bookingFilter, setBookingFilter] = useState<'all' | BookingStatus>('all');
  const [reviews] = useState<Review[]>(INIT_REVIEWS);

  const handleLogout = () => {
    localStorage.removeItem('campus-auth-session');
    navigate('/auth');
  };

  const totalEarnings = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  const tabCls = (id: ProviderTab) =>
    `w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
      activeTab === id
        ? 'bg-white/10 text-white font-semibold border-l-4 border-yellow-300'
        : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
    }`;

  const filteredBookings = bookingFilter === 'all'
    ? bookings
    : bookings.filter(b => b.status === bookingFilter);

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex flex-col w-56 bg-gray-900 fixed top-16 bottom-0 z-30 overflow-y-auto border-r-4 border-black">
        <div className="px-4 py-5 border-b-4 border-black bg-purple-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
              <Package size={15} className="text-purple-300" />
            </div>
            <div>
              <p className="text-black font-black text-sm leading-none">PROVIDER HUB</p>
              <p className="text-black text-[10px] font-bold mt-0.5">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {([
            { id: 'overview' as ProviderTab, label: 'Overview', icon: LayoutDashboard },
            { id: 'services' as ProviderTab, label: 'Services', icon: Package },
            { id: 'bookings' as ProviderTab, label: 'Bookings', icon: Calendar, badge: bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length },
            { id: 'analytics' as ProviderTab, label: 'Analytics', icon: BarChart3 },
            { id: 'reviews' as ProviderTab, label: 'Reviews', icon: Star },
            { id: 'settings' as ProviderTab, label: 'Settings', icon: Settings },
          ] as { id: ProviderTab; label: string; icon: React.ElementType; badge?: number }[]).map(({ id, label, icon: Icon, badge }) => (
            <button key={id} onClick={() => setActiveTab(id)} className={tabCls(id)}>
              <span className="flex items-center gap-3"><Icon size={15} />{label}</span>
              {badge && badge > 0 && (
                <span className="bg-yellow-400 text-gray-900 text-[10px] font-bold px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-2 py-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-400 hover:text-red-400 hover:bg-red-900/10 transition-colors font-medium"
          >
            <span className="flex items-center gap-3"><LogOut size={15} />Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 md:ml-56">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">

            {/* ══════════════════════════════════════════════════════
                OVERVIEW
            ══════════════════════════════════════════════════════ */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <h1 className="text-3xl font-black text-gray-900 mb-8">OVERVIEW</h1>

                {/* Stat cards */}
                <div className="grid md:grid-cols-4 gap-5 mb-8">
                  {[
                    { label: 'Total Earnings', value: `$${totalEarnings}`, icon: '💰', bg: 'bg-emerald-100', color: 'text-emerald-600' },
                    { label: 'Completed', value: completedBookings, icon: '✓', bg: 'bg-blue-100', color: 'text-blue-600' },
                    { label: 'Avg Rating', value: `${averageRating}⭐`, icon: '⭐', bg: 'bg-yellow-100', color: 'text-yellow-600' },
                    { label: 'Active Services', value: services.length, icon: '📦', bg: 'bg-purple-100', color: 'text-purple-600' },
                  ].map(({ label, value, bg, color }) => (
                    <div key={label} className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                      <p className={`text-3xl font-black ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Upcoming bookings */}
                <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 overflow-hidden">
                  <div className="px-5 py-4 border-b-3 border-black bg-cyan-300">
                    <h2 className="font-black text-sm text-black uppercase tracking-wide">📅 UPCOMING BOOKINGS</h2>
                  </div>
                  <div className="divide-y divide-black">
                    {bookings
                      .filter(b => b.status === 'confirmed' || b.status === 'in-progress')
                      .slice(0, 3)
                      .map(booking => (
                        <div key={booking.id} className="px-5 py-4 flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900">{booking.serviceName}</p>
                            <p className="text-xs text-gray-600 font-medium">{booking.customerName} • {booking.date} at {booking.time}</p>
                          </div>
                          <span className="text-xs font-black text-cyan-700 bg-cyan-100 border border-cyan-300 px-3 py-1.5 whitespace-nowrap">
                            {booking.status === 'confirmed' ? 'CONFIRMED' : 'IN PROGRESS'}
                          </span>
                        </div>
                      ))}
                    {bookings.filter(b => b.status === 'confirmed' || b.status === 'in-progress').length === 0 && (
                      <div className="px-5 py-8 text-center text-sm text-gray-400 font-bold">No upcoming bookings</div>
                    )}
                  </div>
                </div>

                {/* Recent reviews */}
                <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="px-5 py-4 border-b-3 border-black bg-pink-300">
                    <h2 className="font-black text-sm text-black uppercase tracking-wide">⭐ RECENT REVIEWS</h2>
                  </div>
                  <div className="divide-y divide-black">
                    {reviews.slice(0, 3).map(review => (
                      <div key={review.id} className="px-5 py-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{review.customerName}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                          <div className="text-lg">{'⭐'.repeat(review.rating)}</div>
                        </div>
                        <p className="text-sm text-gray-700 font-bold">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                SERVICES
            ══════════════════════════════════════════════════════ */}
            {activeTab === 'services' && (
              <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-black text-gray-900">YOUR SERVICES</h1>
                  <button className="flex items-center gap-2 px-5 py-3 font-black text-sm text-white bg-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <Plus size={16} /> ADD SERVICE
                  </button>
                </div>

                <div className="space-y-3">
                  {services.map(service => (
                    <div key={service.id} className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-black text-gray-900">{service.name}</h3>
                            <span className="text-xs font-bold text-yellow-700 bg-yellow-100 border border-yellow-300 px-2 py-0.5">${service.price}</span>
                          </div>
                          <p className="text-sm text-gray-600 font-bold mb-2">{service.description}</p>
                          <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                            <span>⏱️ {service.duration}</span>
                            <span>📅 Booked {service.timesBooked} times</span>
                            <span>⭐ {service.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors border-2 border-gray-200">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors border-2 border-gray-200">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                BOOKINGS
            ══════════════════════════════════════════════════════ */}
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <h1 className="text-3xl font-black text-gray-900 mb-6">BOOKINGS</h1>

                {/* Filter tabs */}
                <div className="flex border-b-3 border-black mb-6 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {(['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'] as (typeof bookingFilter)[]).map(f => {
                    const cnt = f === 'all' ? bookings.length : bookings.filter(b => b.status === f).length;
                    return (
                      <button
                        key={f}
                        onClick={() => setBookingFilter(f)}
                        className={`px-5 py-3 text-sm font-black uppercase flex items-center gap-2 border-r-2 border-black transition-colors ${
                          bookingFilter === f
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {f.replace('-', ' ')}
                        <span className={`text-[10px] font-bold px-2 py-0.5 leading-none ${
                          bookingFilter === f ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
                        }`}>{cnt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Bookings table */}
                <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-black text-white border-b-3 border-black">
                          <th className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider">Customer</th>
                          <th className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider">Service</th>
                          <th className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider">Date & Time</th>
                          <th className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider">Status</th>
                          <th className="text-right px-5 py-3 text-[11px] font-black uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-black">
                        {filteredBookings.map(booking => (
                          <tr key={booking.id}>
                            <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{booking.customerName}</td>
                            <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{booking.serviceName}</td>
                            <td className="px-5 py-3.5 text-xs font-bold text-gray-600">{booking.date} at {booking.time}</td>
                            <td className="px-5 py-3.5">
                              <span className={`text-[10px] font-bold px-2 py-1 uppercase ${bookingStatusStyles[booking.status]}`}>
                                {booking.status.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <button className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 hover:bg-blue-100 transition-colors">
                                VIEW
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                ANALYTICS
            ══════════════════════════════════════════════════════ */}
            {activeTab === 'analytics' && (
              <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <h1 className="text-3xl font-black text-gray-900 mb-8">ANALYTICS</h1>

                {/* Key metrics */}
                <div className="grid md:grid-cols-3 gap-5 mb-8">
                  <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-4 mb-3">
                      <TrendingUp className="text-emerald-600" size={20} />
                      <p className="text-xs font-black text-gray-500 uppercase">Revenue</p>
                    </div>
                    <p className="text-3xl font-black text-emerald-600">${totalEarnings}</p>
                    <p className="text-xs text-gray-500 font-bold mt-2">+12% from last month</p>
                  </div>

                  <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-4 mb-3">
                      <Users className="text-blue-600" size={20} />
                      <p className="text-xs font-black text-gray-500 uppercase">Bookings</p>
                    </div>
                    <p className="text-3xl font-black text-blue-600">{completedBookings}</p>
                    <p className="text-xs text-gray-500 font-bold mt-2">Completed this month</p>
                  </div>

                  <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-4 mb-3">
                      <Clock className="text-cyan-600" size={20} />
                      <p className="text-xs font-black text-gray-500 uppercase">Avg Response</p>
                    </div>
                    <p className="text-3xl font-black text-cyan-600">2.3h</p>
                    <p className="text-xs text-gray-500 font-bold mt-2">Response time</p>
                  </div>
                </div>

                {/* Charts placeholder */}
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="font-black text-sm uppercase tracking-wide mb-6 text-gray-900">Bookings Trend</h2>
                    <div className="h-48 flex items-end justify-around gap-2 px-4">
                      {[3, 5, 4, 7, 6, 8, 5].map((h, i) => (
                        <div key={i} className="flex-1 bg-black" style={{ height: `${(h / 8) * 100}%` }} />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="font-black text-sm uppercase tracking-wide mb-6 text-gray-900">Revenue Trend</h2>
                    <div className="h-48 flex items-end justify-around gap-2 px-4">
                      {[180, 240, 200, 320, 280, 360, 250].map((h, i) => (
                        <div key={i} className="flex-1 bg-emerald-500" style={{ height: `${(h / 400) * 100}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top services */}
                <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="px-6 py-4 border-b-3 border-black bg-purple-300">
                    <h2 className="font-black text-sm text-black uppercase tracking-wide">🏆 TOP SERVICES</h2>
                  </div>
                  <div className="divide-y-2 divide-black">
                    {services.sort((a, b) => b.timesBooked - a.timesBooked).map((s, i) => (
                      <div key={s.id} className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-black">{i + 1}</span>
                          <div>
                            <p className="font-bold text-gray-900">{s.name}</p>
                            <p className="text-xs text-gray-500 font-bold">{s.timesBooked} bookings • ⭐ {s.rating}</p>
                          </div>
                        </div>
                        <p className="text-lg font-black text-emerald-600">${s.price * s.timesBooked}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                REVIEWS
            ══════════════════════════════════════════════════════ */}
            {activeTab === 'reviews' && (
              <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <h1 className="text-3xl font-black text-gray-900 mb-8">CUSTOMER REVIEWS</h1>

                {/* Rating summary */}
                <div className="bg-white border-3 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 text-center">
                  <p className="text-xs font-black text-gray-500 uppercase mb-2">OVERALL RATING</p>
                  <p className="text-6xl font-black text-yellow-600 mb-2">{averageRating}</p>
                  <p className="text-sm font-bold text-gray-600">Based on {reviews.length} reviews</p>
                </div>

                {/* Reviews list */}
                <div className="space-y-3">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-bold text-gray-900">{review.customerName}</p>
                          <p className="text-xs text-gray-500 font-bold">{review.date}</p>
                        </div>
                        <div className="text-xl">{'⭐'.repeat(review.rating)}</div>
                      </div>
                      <p className="text-sm text-gray-700 font-bold leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                SETTINGS
            ══════════════════════════════════════════════════════ */}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <h1 className="text-3xl font-black text-gray-900 mb-8">SETTINGS</h1>

                <div className="max-w-2xl space-y-6">
                  <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 overflow-hidden">
                    <div className="px-0 py-0 border-b-3 border-black pb-4 mb-5">
                      <h2 className="font-black text-lg text-gray-900 uppercase">PROFILE INFORMATION</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Business Name</label>
                        <input type="text" defaultValue="CleanCo Campus" className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-yellow-50" />
                      </div>
                      <div>
                        <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Phone Number</label>
                        <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-yellow-50" />
                      </div>
                      <button className="w-full py-3 font-black text-sm bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                        SAVE CHANGES
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 overflow-hidden">
                    <div className="px-0 py-0 border-b-3 border-black pb-4 mb-5">
                      <h2 className="font-black text-lg text-gray-900 uppercase">AVAILABILITY</h2>
                    </div>
                    <div className="space-y-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <div key={day} className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">{day}</span>
                          <div className="flex gap-3">
                            <input type="time" defaultValue="09:00" className="border-2 border-black px-2 py-1 text-xs font-bold" />
                            <span className="font-bold text-gray-600">-</span>
                            <input type="time" defaultValue="18:00" className="border-2 border-black px-2 py-1 text-xs font-bold" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
