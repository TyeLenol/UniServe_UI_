import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  Bell, Package, MessageCircle, Tag, Clock,
  CheckCheck, Trash2, BellOff, ArrowRight,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
type NotifType = 'order' | 'message' | 'promo' | 'reminder';
type TabId     = 'ALL' | 'ORDERS' | 'MESSAGES' | 'PROMOS';

interface Notification {
  id: number;
  type: NotifType;
  icon: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  color: string;
  actionLabel?: string;
  actionTo?: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const initialNotifications: Notification[] = [
  {
    id: 1, type: 'order', icon: 'order', read: false, color: 'bg-lime-200',
    title: 'Order Confirmed! 🎉',
    body: 'Your laundry order B-001 with CleanCo Campus has been confirmed. Pickup scheduled for Mar 10, 10:00 AM.',
    time: '2 min ago', actionLabel: 'VIEW BOOKING', actionTo: '/profile',
  },
  {
    id: 2, type: 'message', icon: 'message', read: false, color: 'bg-cyan-100',
    title: 'New message from StyleHub',
    body: 'Hey! Just confirming your Style & Cut appointment for Mar 12 at 2:30 PM. See you then! ✂️',
    time: '15 min ago', actionLabel: 'REPLY', actionTo: '/chat/2',
  },
  {
    id: 3, type: 'order', icon: 'order', read: false, color: 'bg-yellow-100',
    title: 'Service In Progress ⚡',
    body: 'TechFix Pro is working on your Software Issues ticket (B-003). ETA: ~2 hours.',
    time: '1 hr ago', actionLabel: 'TRACK ORDER', actionTo: '/profile',
  },
  {
    id: 4, type: 'promo', icon: 'promo', read: true, color: 'bg-pink-100',
    title: 'Flash Sale: 20% off Grooming 💅',
    body: 'Today only! Use code GLOWUP20 at checkout on any grooming service. Valid until midnight.',
    time: '3 hrs ago', actionLabel: 'SHOP NOW', actionTo: '/services',
  },
  {
    id: 5, type: 'reminder', icon: 'reminder', read: true, color: 'bg-purple-100',
    title: 'Booking Reminder 🔔',
    body: 'Your Hair Styling appointment with StyleHub is tomorrow at 2:30 PM. Don\'t forget!',
    time: '5 hrs ago', actionLabel: 'VIEW DETAILS', actionTo: '/profile',
  },
  {
    id: 6, type: 'order', icon: 'order', read: true, color: 'bg-lime-100',
    title: 'Order Completed ✅',
    body: 'Your Coffee & Snacks order from CampusEats (B-098) has been delivered. Hope you enjoyed it!',
    time: 'Yesterday', actionLabel: 'LEAVE REVIEW', actionTo: '/services',
  },
  {
    id: 7, type: 'message', icon: 'message', read: true, color: 'bg-cyan-100',
    title: 'TechFix Pro sent a file',
    body: 'Raj from TechFix Pro shared a diagnostic report for your device. Tap to view.',
    time: 'Yesterday', actionLabel: 'VIEW', actionTo: '/chat/3',
  },
  {
    id: 8, type: 'promo', icon: 'promo', read: true, color: 'bg-pink-100',
    title: 'Weekend Deal: ₹50 Off 🛍️',
    body: 'Book any cleaning service this weekend and get ₹50 off automatically. No code needed!',
    time: '2 days ago', actionLabel: 'BROWSE DEALS', actionTo: '/services',
  },
  {
    id: 9, type: 'order', icon: 'order', read: true, color: 'bg-red-100',
    title: 'Order Cancelled',
    body: 'Your Healthy Meal Plans order (B-096) was cancelled as requested. Refund in 3–5 working days.',
    time: '3 days ago',
  },
];

// ── Tab config ────────────────────────────────────────────────────────────────
const tabs: { id: TabId; label: string; types: NotifType[] }[] = [
  { id: 'ALL',      label: 'All',      types: ['order', 'message', 'promo', 'reminder'] },
  { id: 'ORDERS',   label: 'Orders',   types: ['order', 'reminder']                     },
  { id: 'MESSAGES', label: 'Messages', types: ['message']                               },
  { id: 'PROMOS',   label: 'Promos',   types: ['promo']                                 },
];

// ── Icon map ──────────────────────────────────────────────────────────────────
const iconMap: Record<NotifType, { Icon: React.ElementType; bg: string }> = {
  order:    { Icon: Package,       bg: 'bg-lime-300'   },
  message:  { Icon: MessageCircle, bg: 'bg-cyan-300'   },
  promo:    { Icon: Tag,           bg: 'bg-pink-300'   },
  reminder: { Icon: Clock,         bg: 'bg-yellow-300' },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function NotificationsPage() {
  const [activeTab, setActiveTab]       = useState<TabId>('ALL');
  const [notifications, setNotifications] = useState(initialNotifications);

  const currentTypes = tabs.find(t => t.id === activeTab)!.types;
  const filtered     = notifications.filter(n => currentTypes.includes(n.type));
  const unreadCount  = notifications.filter(n => !n.read).length;

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const markRead = (id: number) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const deleteNotif = (id: number) =>
    setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <div className="pt-16 min-h-screen bg-gray-50">

      {/* Hero header */}
      <section className="bg-yellow-300 border-b-4 border-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-full bg-black/[0.03] pointer-events-none" />
        <div className="absolute -bottom-8 left-1/4 w-40 h-40 bg-pink-300/30 rotate-12 border-2 border-black/10 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start sm:items-center justify-between gap-4 flex-wrap"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-black text-white p-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)]">
                  <Bell size={20} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black">NOTIFICATIONS</h1>
              </div>
              <p className="font-black text-lg">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''} 👀`
                  : 'All caught up! Nothing new here 🎉'}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-2 bg-black text-white font-black text-sm px-5 py-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all"
              >
                <CheckCheck size={15} />
                MARK ALL READ
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Tabs */}
        <div className="flex border-2 border-black mb-8 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {tabs.map((tab) => {
            const unread = notifications.filter(n => tab.types.includes(n.type) && !n.read).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 font-black text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border-r-2 border-black last:border-r-0 ${
                  activeTab === tab.id ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
                }`}
              >
                {tab.label.toUpperCase()}
                {unread > 0 && (
                  <span className={`w-5 h-5 border-2 font-black text-[10px] flex items-center justify-center ${
                    activeTab === tab.id
                      ? 'bg-yellow-300 text-black border-yellow-300'
                      : 'bg-pink-300 text-black border-pink-400'
                  }`}>
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notification list */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-16 text-center"
            >
              <BellOff size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-black text-lg text-gray-400">Nothing here yet</p>
              <p className="font-bold text-sm text-gray-400 mt-1">Check back later 👀</p>
            </motion.div>
          ) : (
            filtered.map((notif, index) => {
              const { Icon, bg } = iconMap[notif.icon];
              return (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.22, delay: index * 0.03 }}
                  className={`mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden cursor-pointer transition-all hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 ${
                    notif.read ? 'bg-white' : notif.color
                  }`}
                  onClick={() => markRead(notif.id)}
                >
                  <div className="flex gap-4 p-5">

                    {/* Type icon */}
                    <div className={`w-11 h-11 flex-shrink-0 ${bg} border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                      <Icon size={18} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-black text-sm leading-tight">{notif.title}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notif.read && (
                            <div className="w-2.5 h-2.5 bg-pink-500 border-2 border-black rounded-full" />
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                            className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <p className="font-bold text-sm text-gray-600 leading-relaxed mb-3">
                        {notif.body}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-gray-400 flex items-center gap-1">
                          <Clock size={10} />
                          {notif.time}
                        </span>
                        {notif.actionLabel && notif.actionTo && (
                          <Link
                            to={notif.actionTo}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 font-black text-xs bg-black text-white px-3 py-1.5 border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] transition-all"
                          >
                            {notif.actionLabel}
                            <ArrowRight size={10} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accent strip on unread items */}
                  {!notif.read && (
                    <div className={`h-1.5 ${bg} border-t-2 border-black`} />
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}