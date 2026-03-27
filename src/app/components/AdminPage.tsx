import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  LayoutDashboard, Users, UserPlus, Megaphone, Inbox,
  CheckCircle, XCircle, Trash2, Plus, Search, Edit2,
  Shield, X, Save, Clock, AlertCircle, ChevronRight, User,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
type AdminTab    = 'overview' | 'users' | 'signups' | 'announcements';
type UserRole    = 'user' | 'provider';
type UserStatus  = 'active' | 'suspended';
type SignupStatus = 'pending' | 'approved' | 'declined';
type AnnPriority = 'normal' | 'important' | 'critical';
type AnnCategory = 'General' | 'Event' | 'Maintenance' | 'Promotion' | 'Alert';

interface AppUser {
  id: string; name: string; email: string; role: UserRole;
  joined: string; status: UserStatus; bookings: number;
  rating?: number; category?: string;
}
interface SignupRequest {
  id: string; name: string; email: string; businessName: string;
  category: string; submittedDate: string; status: SignupStatus; phone: string;
}
interface AdminAnn {
  id: string; title: string; category: AnnCategory;
  content: string; date: string; priority: AnnPriority; author: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const INIT_USERS: AppUser[] = [
  { id: 'U001', name: 'Marilyn Andrews',  email: 'marilynandrews10@gmail.com',  role: 'user',     joined: 'Jan 12, 2026', status: 'active',    bookings: 12 },
  { id: 'U002', name: 'James Okafor',     email: 'jamesokafor@campus.ac',       role: 'user',     joined: 'Jan 18, 2026', status: 'active',    bookings: 5  },
  { id: 'U003', name: 'Priya Sharma',     email: 'priyasharma@campus.ac',       role: 'user',     joined: 'Feb 2, 2026',  status: 'active',    bookings: 8  },
  { id: 'U004', name: 'Kofi Mensah',      email: 'kofimensah@campus.ac',        role: 'user',     joined: 'Feb 14, 2026', status: 'suspended', bookings: 1  },
  { id: 'U005', name: 'Zara Ibrahim',     email: 'zaraibrahim@campus.ac',       role: 'user',     joined: 'Feb 20, 2026', status: 'active',    bookings: 3  },
  { id: 'P001', name: 'CleanCo Campus',   email: 'cleancocampus@services.ac',   role: 'provider', joined: 'Jan 5, 2026',  status: 'active',    bookings: 89,  rating: 4.8, category: 'Cleaning'        },
  { id: 'P002', name: 'StyleHub',         email: 'stylehub@services.ac',        role: 'provider', joined: 'Jan 8, 2026',  status: 'active',    bookings: 67,  rating: 4.9, category: 'Grooming'        },
  { id: 'P003', name: 'TechFix Pro',      email: 'techfixpro@services.ac',      role: 'provider', joined: 'Jan 15, 2026', status: 'active',    bookings: 45,  rating: 4.7, category: 'Tech'            },
  { id: 'P004', name: 'Healthy Eats',     email: 'healthyeats@services.ac',     role: 'provider', joined: 'Jan 20, 2026', status: 'active',    bookings: 112, rating: 4.6, category: 'Food & Beverages'},
  { id: 'P005', name: 'CampusRent',       email: 'campusrent@services.ac',      role: 'provider', joined: 'Feb 1, 2026',  status: 'suspended', bookings: 23,  rating: 3.9, category: 'Rentals'         },
];

const INIT_SIGNUPS: SignupRequest[] = [
  { id: 'SR001', name: 'Tolu Adeyemi',   email: 'toluadeyemi@gmail.com',     businessName: "Tolu's Tutoring Hub",  category: 'Education',   submittedDate: 'Mar 10, 2026', status: 'pending',  phone: '+234 812 345 6789' },
  { id: 'SR002', name: 'Amara Nwosu',    email: 'amaranwosu@campus.ac',      businessName: 'FreshEats Campus',     category: 'Food',        submittedDate: 'Mar 11, 2026', status: 'pending',  phone: '+234 701 234 5678' },
  { id: 'SR003', name: 'Emmanuel Osei',  email: 'emmaosei@campus.ac',        businessName: 'QuickFix Electronics', category: 'Tech',        submittedDate: 'Mar 12, 2026', status: 'pending',  phone: '+234 901 234 5678' },
  { id: 'SR004', name: 'David Kim',      email: 'davidkim@campus.ac',        businessName: 'DK Photography',       category: 'Photography', submittedDate: 'Mar 8, 2026',  status: 'approved', phone: '+234 803 456 7890' },
  { id: 'SR005', name: 'Sara Bello',     email: 'sarabellocampus@gmail.com', businessName: "Sara's Craft Studio",  category: 'Arts',        submittedDate: 'Mar 5, 2026',  status: 'declined', phone: '+234 805 678 9012' },
];

const INIT_ANNS: AdminAnn[] = [
  { id: 'ANN001', title: 'Platform Maintenance Scheduled', category: 'Maintenance', content: 'The platform will undergo scheduled maintenance on March 15, 2026 from 2:00 AM – 5:00 AM. Services will be temporarily unavailable during this window.', date: 'Mar 13, 2026', priority: 'important', author: 'Admin' },
  { id: 'ANN002', title: 'New Services Now Available',     category: 'General',     content: "We're excited to announce that Photography and Tutoring services are now live on the platform. Check out the new providers under the Services tab!", date: 'Mar 10, 2026', priority: 'normal',    author: 'Admin' },
  { id: 'ANN003', title: 'End of Semester Promotion',      category: 'Promotion',   content: 'Enjoy 20% off all cleaning and laundry services this week. Use code ENDSEM20 at checkout. Valid until March 20, 2026.', date: 'Mar 5, 2026', priority: 'normal', author: 'Admin' },
  { id: 'ANN004', title: 'Campus Wide Service Disruption', category: 'Alert',       content: 'Due to ongoing construction in Block C, delivery services to that area may experience delays. Expected normalisation by March 20.', date: 'Mar 2, 2026', priority: 'critical', author: 'Admin' },
];

const OPEN_TICKETS = 2;

// ── Style helpers ──────────────────────────────────────────────────────────────
const annCategoryStyle: Record<AnnCategory, string> = {
  General:     'bg-gray-100 text-gray-600',
  Event:       'bg-purple-100 text-purple-700',
  Maintenance: 'bg-orange-100 text-orange-700',
  Promotion:   'bg-emerald-100 text-emerald-700',
  Alert:       'bg-red-100 text-red-700',
};

const priorityBar: Record<AnnPriority, string> = {
  normal:    'bg-gray-200',
  important: 'bg-amber-400',
  critical:  'bg-red-500',
};

const priorityBadge: Record<AnnPriority, { cls: string; label: string } | null> = {
  normal:    null,
  important: { cls: 'bg-amber-50 text-amber-700 border border-amber-200', label: 'Important' },
  critical:  { cls: 'bg-red-50 text-red-700 border border-red-200', label: 'Critical' },
};

const signupStatusCls: Record<SignupStatus, string> = {
  pending:  'bg-amber-50 text-amber-700 border border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  declined: 'bg-red-50 text-red-700 border border-red-200',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Users state
  const [users, setUsers]       = useState<AppUser[]>(INIT_USERS);
  const [userFilter, setUF]     = useState<'all' | UserRole>('all');
  const [userSearch, setUS]     = useState('');

  // Sign-ups state
  const [signups, setSignups]         = useState<SignupRequest[]>(INIT_SIGNUPS);
  const [signupFilter, setSignupFilter] = useState<SignupStatus | 'all'>('pending');

  // Announcements state
  const [anns, setAnns]             = useState<AdminAnn[]>(INIT_ANNS);
  const [annFormOpen, setAnnFormOpen] = useState(false);
  const [editingAnn, setEditingAnn]   = useState<AdminAnn | null>(null);
  const [annForm, setAnnForm]         = useState({ title: '', category: 'General' as AnnCategory, content: '', priority: 'normal' as AnnPriority });
  const [deleteId, setDeleteId]       = useState<string | null>(null);

  // Derived
  const totalUsers     = users.filter(u => u.role === 'user').length;
  const totalProviders = users.filter(u => u.role === 'provider').length;
  const pending        = useMemo(() => signups.filter(s => s.status === 'pending'), [signups]);

  const filteredUsers = useMemo(() => {
    let list = userFilter === 'all' ? users : users.filter(u => u.role === userFilter);
    if (userSearch) {
      const q = userSearch.toLowerCase();
      list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return list;
  }, [users, userFilter, userSearch]);

  const filteredSignups = signupFilter === 'all' ? signups : signups.filter(s => s.status === signupFilter);

  // Handlers
  const approveSignup = (id: string) => setSignups(p => p.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  const declineSignup = (id: string) => setSignups(p => p.map(s => s.id === id ? { ...s, status: 'declined' } : s));
  const toggleSuspend = (id: string) => setUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));

  const openAnnForm = (ann?: AdminAnn) => {
    setEditingAnn(ann ?? null);
    setAnnForm(ann
      ? { title: ann.title, category: ann.category, content: ann.content, priority: ann.priority }
      : { title: '', category: 'General', content: '', priority: 'normal' });
    setAnnFormOpen(true);
  };

  const saveAnn = () => {
    if (!annForm.title.trim() || !annForm.content.trim()) return;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (editingAnn) {
      setAnns(p => p.map(a => a.id === editingAnn.id ? { ...a, ...annForm, date: today } : a));
    } else {
      setAnns(p => [{ id: `ANN${Date.now()}`, ...annForm, date: today, author: 'Admin' }, ...p]);
    }
    setAnnFormOpen(false);
    setEditingAnn(null);
  };

  const deleteAnn = (id: string) => { setAnns(p => p.filter(a => a.id !== id)); setDeleteId(null); };

  const sidebarItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'overview',      label: 'Overview',          icon: LayoutDashboard },
    { id: 'users',         label: 'Users & Providers', icon: Users           },
    { id: 'signups',       label: 'Sign-up Requests',  icon: UserPlus,       badge: pending.length },
    { id: 'announcements', label: 'Announcements',     icon: Megaphone       },
  ];

  // Shared sidebar/tab item renderer helper
  const tabCls = (id: AdminTab) =>
    `w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
      activeTab === id ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
    }`;

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex">

      {/* ── Desktop sidebar ───────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-56 bg-gray-900 fixed top-16 bottom-0 z-30 overflow-y-auto border-r-4 border-black">
        <div className="px-4 py-5 border-b-4 border-black bg-yellow-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
              <Shield size={15} className="text-yellow-300" />
            </div>
            <div>
              <p className="text-black font-black text-sm leading-none">ADMIN PANEL</p>
              <p className="text-black text-[10px] font-bold mt-0.5">System Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {sidebarItems.map(({ id, label, icon: Icon, badge }) => (
            <button key={id} onClick={() => setActiveTab(id)} className={tabCls(id)}>
              <span className="flex items-center gap-3"><Icon size={15} />{label}</span>
              {!!badge && (
                <span className="bg-yellow-400 text-gray-900 text-[10px] font-bold px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-2 py-3 border-t border-white/10">
          <Link
            to="/support-inbox"
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            <span className="flex items-center gap-3"><Inbox size={15} />Support Inbox</span>
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 min-w-[18px] text-center leading-none">
              {OPEN_TICKETS}
            </span>
          </Link>
        </div>
      </aside>

      {/* ── Mobile tab strip ──────────────────────────────────────────────── */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-30 bg-gray-900 overflow-x-auto border-b border-white/10">
        <div className="flex min-w-max px-2">
          {sidebarItems.map(({ id, label, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${
                activeTab === id ? 'text-white border-yellow-400' : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {label}
              {!!badge && <span className="bg-yellow-400 text-gray-900 text-[9px] font-bold px-1 py-0.5 leading-none">{badge}</span>}
            </button>
          ))}
          <Link to="/support-inbox" className="px-4 py-3 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 border-transparent text-gray-400 hover:text-white">
            Support <span className="bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 leading-none">{OPEN_TICKETS}</span>
          </Link>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="flex-1 md:ml-56">
        <div className="h-10 md:hidden" />
        <div className="p-6 md:p-8 max-w-5xl">

          <AnimatePresence mode="wait">

            {/* ══════════════════════════════════════════════ OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <h1 className="text-xl font-bold text-gray-900 mb-6">Overview</h1>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
                  {([
                    { label: 'Total Users',      value: totalUsers,     icon: User,         bg: 'bg-blue-50',    color: 'text-blue-600'    },
                    { label: 'Total Providers',  value: totalProviders, icon: Shield,       bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { label: 'Pending Requests', value: pending.length, icon: Clock,        bg: 'bg-amber-50',   color: 'text-amber-600'   },
                    { label: 'Open Tickets',     value: OPEN_TICKETS,   icon: AlertCircle,  bg: 'bg-red-50',     color: 'text-red-600'     },
                  ] as { label: string; value: number; icon: React.ElementType; bg: string; color: string }[]).map(({ label, value, icon: Icon, bg, color }) => (
                    <div key={label} className="bg-white border-2 border-black p-5 hover:-translate-y-0.5 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-9 h-9 ${bg} flex items-center justify-center`}>
                          <Icon size={16} className={color} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{value}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-500">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="bg-white border-2 border-black mb-7 overflow-hidden">
                  <div className="px-5 py-4 border-b-2 border-black bg-cyan-300">
                    <h2 className="font-black text-sm text-black uppercase tracking-wide">⚡ QUICK ACTIONS</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
                    {([
                      { label: 'Review Sign-ups', count: pending.length, tab: 'signups', icon: UserPlus,  iconColor: 'text-amber-600',  countBg: 'bg-amber-600'  },
                      { label: 'View Users',      count: null,           tab: 'users',   icon: Users,     iconColor: 'text-blue-600',   countBg: ''              },
                      { label: 'Announcements',   count: anns.length,    tab: 'announcements', icon: Megaphone, iconColor: 'text-purple-600', countBg: 'bg-purple-600' },
                    ] as { label: string; count: number | null; tab: AdminTab; icon: React.ElementType; iconColor: string; countBg: string }[]).map(({ label, count, tab, icon: Icon, iconColor, countBg }) => (
                      <button key={label} onClick={() => setActiveTab(tab)} className="flex flex-col items-center gap-2 py-5 hover:bg-grey-50 transition-colors">
                        <Icon size={20} className={iconColor} />
                        <span className="text-xs font-medium text-gray-700">{label}</span>
                        {count !== null && count > 0 && (
                          <span className={`text-xs font-bold text-white ${countBg} px-2 py-0.5`}>{count}</span>
                        )}
                      </button>
                    ))}
                    <Link to="/support-inbox" className="flex flex-col items-center gap-2 py-5 hover:bg-gray-50 transition-colors">
                      <Inbox size={20} className="text-red-600" />
                      <span className="text-xs font-medium text-gray-700">Support Inbox</span>
                      <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5">{OPEN_TICKETS} open</span>
                    </Link>
                  </div>
                </div>

                {/* Recent pending sign-ups */}
                <div className="bg-white border-2 border-black">
                  <div className="px-5 py-4 border-b-2 border-black bg-pink-300 flex items-center justify-between">
                    <h2 className="font-black text-sm text-black uppercase tracking-wide">📋 RECENT SIGNUPS</h2>
                    <button onClick={() => setActiveTab('signups')} className="text-xs font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1 transition-colors">
                      View all <ChevronRight size={12} />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {pending.slice(0, 3).map(req => (
                      <div key={req.id} className="px-5 py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">
                            {req.name[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{req.name}</p>
                            <p className="text-xs text-gray-500 truncate">{req.businessName} · {req.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400 hidden sm:block font-bold">{req.submittedDate}</span>
                          <button onClick={() => approveSignup(req.id)} className="text-xs font-black text-emerald-700 bg-emerald-300 border-2 border-black px-2.5 py-1 hover:-translate-y-0.5 transition-all">
                            ✓ APPROVE
                          </button>
                          <button onClick={() => declineSignup(req.id)} className="text-xs font-black text-red-700 bg-red-300 border-2 border-black px-2.5 py-1 hover:-translate-y-0.5 transition-all">
                            ✕ DECLINE
                          </button>
                        </div>
                      </div>
                    ))}
                    {pending.length === 0 && (
                      <div className="px-5 py-8 text-center text-sm text-gray-400">No pending requests — all clear ✓</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════ USERS & PROVIDERS */}
            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <h1 className="text-xl font-bold text-gray-900 mb-6">Users & Providers</h1>

                {/* Toolbar */}
                <div className="border-0 border-black mb-4 p-3 flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-40">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or email…"
                      value={userSearch}
                      onChange={e => setUS(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm border-2 border-black focus:outline-none focus:bg-yellow-50 font-bold bg-white"
                    />
                  </div>
                  <div className="flex border border-gray-300 overflow-hidden divide-x divide-gray-300">
                    {([
                      ['all',      'All',       users.length      ],
                      ['user',     'Users',     totalUsers        ],
                      ['provider', 'Providers', totalProviders    ],
                    ] as [typeof userFilter, string, number][]).map(([v, l, c]) => (
                      <button
                        key={v}
                        onClick={() => setUF(v)}
                        className={`px-3 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          userFilter === v ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {l}
                        <span className={`text-[10px] px-1.5 py-0.5 font-bold ${userFilter === v ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{c}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white border-2 border-black overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-black text-white border-b-3 border-black">
                          <th className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider">Name</th>
                          <th className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider hidden md:table-cell">Role</th>
                          <th className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider hidden sm:table-cell">Joined</th>
                          <th className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider">Status</th>
                          <th className="text-right px-5 py-3 text-[11px] font-black uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-black">
                        {filteredUsers.map(u => (
                          <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                                  {u.name[0]}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900 text-sm">{u.name}</p>
                                  <p className="text-xs text-gray-400 hidden sm:block">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 hidden md:table-cell">
                              <span className={`text-xs font-medium px-2 py-0.5 ${
                                u.role === 'provider' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {u.role === 'provider' ? 'Provider' : 'User'}
                              </span>
                              {u.category && <span className="ml-1.5 text-xs text-gray-400">{u.category}</span>}
                            </td>
                            <td className="px-5 py-3.5 text-xs text-gray-500 hidden sm:table-cell">{u.joined}</td>
                            <td className="px-5 py-3.5">
                              <span className={`text-xs font-medium px-2 py-0.5 ${
                                u.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                              }`}>
                                {u.status === 'active' ? 'Active' : 'Suspended'}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <button
                                onClick={() => toggleSuspend(u.id)}
                                className={`text-xs font-semibold px-3 py-1.5 border transition-colors ${
                                  u.status === 'active'
                                    ? 'border-red-200 text-red-700 hover:bg-red-50'
                                    : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                                }`}
                              >
                                {u.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                          <tr>
                            <td colSpan={5} className="text-center text-sm text-gray-400 py-10">No accounts found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 py-3 border-t border-gray-100 bg-black">
                    <p className="text-xs text-white">Showing {filteredUsers.length} of {users.length} accounts</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════ SIGN-UP REQUESTS */}
            {activeTab === 'signups' && (
              <motion.div key="signups" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <h1 className="text-xl font-bold text-gray-900 mb-6">Sign-up Requests</h1>

                {/* Filter tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                  {(['pending', 'approved', 'declined', 'all'] as (SignupStatus | 'all')[]).map(f => {
                    const cnt = f === 'all' ? signups.length : signups.filter(s => s.status === f).length;
                    return (
                      <button
                        key={f}
                        onClick={() => setSignupFilter(f)}
                        className={`px-4 py-2.5 text-sm font-semibold capitalize flex items-center gap-2 border-b-2 -mb-px transition-colors ${
                          signupFilter === f ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 leading-none ${
                          signupFilter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>{cnt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Request cards */}
                <div className="space-y-3">
                  {filteredSignups.map(req => (
                    <div key={req.id} className="bg-white border-2 border-black p-5 transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0">
                          <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0 font-bold text-gray-600 text-sm">
                            {req.name[0]}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <h3 className="font-semibold text-gray-900">{req.name}</h3>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 ${signupStatusCls[req.status]}`}>
                                {req.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">{req.businessName}</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-400">
                              <span className="bg-gray-100 text-gray-600 font-medium px-2 py-0.5">{req.category}</span>
                              <span>{req.email}</span>
                              <span>{req.phone}</span>
                              <span>Submitted {req.submittedDate}</span>
                            </div>
                          </div>
                        </div>

                        {req.status === 'pending' && (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => declineSignup(req.id)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-2 hover:bg-red-100 hover:-translate-y-0.5 transition-colors"
                            >
                              <XCircle size={13} /> Decline
                            </button>
                            <button
                              onClick={() => approveSignup(req.id)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gray-900 border border-gray-900 px-3 py-2 hover:bg-gray-800 hover:-translate-y-0.5 transition-colors"
                            >
                              <CheckCircle size={13} /> Approve
                            </button>
                          </div>
                        )}

                        {req.status !== 'pending' && (
                          <div className={`text-xs font-semibold px-3 py-2 flex items-center gap-1.5 ${
                            req.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {req.status === 'approved' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {req.status === 'approved' ? 'Approved' : 'Declined'}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredSignups.length === 0 && (
                    <div className="bg-white border border-gray-200 p-10 text-center text-sm text-gray-400">
                      No {signupFilter !== 'all' ? signupFilter : ''} requests
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════ ANNOUNCEMENTS */}
            {activeTab === 'announcements' && (
              <motion.div key="announcements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-xl font-bold text-gray-900">Announcements</h1>
                  <button
                    onClick={() => openAnnForm()}
                    className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 hover:-translate-y-0.5 transition-colors"
                  >
                    <Plus size={14} /> New Announcement
                  </button>
                </div>

                {/* Inline form */}
                <AnimatePresence>
                  {annFormOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="bg-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0)] mb-5 overflow-hidden"
                    >
                      <div className="px-5 py-4 border-b-2 border-black bg-purple-300 flex items-center justify-between">
                        <h2 className="font-black text-sm text-black uppercase tracking-wider">
                          {editingAnn ? '✏️ EDIT' : '📝 NEW'} ANNOUNCEMENT
                        </h2>
                        <button onClick={() => setAnnFormOpen(false)} className="text-black hover:scale-125 transition-transform">
                          <X size={18} />
                        </button>
                      </div>
                      <div className="p-5 space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Title</label>
                          <input
                            type="text"
                            placeholder="Announcement title…"
                            value={annForm.title}
                            onChange={e => setAnnForm(p => ({ ...p, title: e.target.value }))}
                            className="w-full border-2 border-black px-3 py-2 text-sm focus:outline-none focus:bg-yellow-50 font-bold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                            <select
                              value={annForm.category}
                              onChange={e => setAnnForm(p => ({ ...p, category: e.target.value as AnnCategory }))}
                              className="w-full border-2 border-black px-3 py-2 text-sm focus:outline-none focus:bg-yellow-50 font-bold bg-white"
                            >
                              {(['General', 'Event', 'Maintenance', 'Promotion', 'Alert'] as AnnCategory[]).map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Priority</label>
                            <select
                              value={annForm.priority}
                              onChange={e => setAnnForm(p => ({ ...p, priority: e.target.value as AnnPriority }))}
                              className="w-full border-2 border-black px-3 py-2 text-sm focus:outline-none focus:bg-yellow-50 font-bold bg-white"
                            >
                              <option value="normal">Normal</option>
                              <option value="important">Important</option>
                              <option value="critical">Critical</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Content</label>
                          <textarea
                            rows={4}
                            placeholder="Announcement content…"
                            value={annForm.content}
                            onChange={e => setAnnForm(p => ({ ...p, content: e.target.value }))}
                            className="w-full border-2 border-black px-3 py-2 text-sm focus:outline-none focus:bg-yellow-50 font-bold resize-none"
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => setAnnFormOpen(false)}
                            className="text-sm font-semibold px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveAnn}
                            disabled={!annForm.title.trim() || !annForm.content.trim()}
                            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-40"
                          >
                            <Save size={13} />
                            {editingAnn ? 'Save Changes' : 'Publish'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Announcements list */}
                <div className="space-y-2">
                  {anns.map(ann => (
                    <div key={ann.id} className="bg-white border-2 border-black flex overflow-hidden transition-all">
                      {/* Priority bar */}
                      <div className={`w-1 flex-shrink-0 ${priorityBar[ann.priority]}`} />
                      {/* Content */}
                      <div className="flex-1 px-5 py-4 flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 text-sm">{ann.title}</h3>
                            <span className={`text-[10px] font-medium px-2 py-0.5 ${annCategoryStyle[ann.category]}`}>
                              {ann.category}
                            </span>
                            {priorityBadge[ann.priority] && (
                              <span className={`text-[10px] font-semibold px-2 py-0.5 ${priorityBadge[ann.priority]!.cls}`}>
                                {priorityBadge[ann.priority]!.label}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{ann.content}</p>
                          <p className="text-[10px] text-gray-400 mt-2">{ann.date} · by {ann.author}</p>
                        </div>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          {deleteId === ann.id ? (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5">
                              <span className="text-xs font-semibold text-red-700">Delete?</span>
                              <button onClick={() => deleteAnn(ann.id)} className="text-xs font-bold text-red-700 hover:underline">Yes</button>
                              <span className="text-red-300 text-xs">/</span>
                              <button onClick={() => setDeleteId(null)} className="text-xs font-bold text-gray-600 hover:underline">No</button>
                            </div>
                          ) : (
                            <>
                              <button onClick={() => openAnnForm(ann)} className="p-2 text-gray-700 hover:bg-gray-100 transition-colors" title="Edit">
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => setDeleteId(ann.id)} className="p-2 text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                                <Trash2 size={14}  />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {anns.length === 0 && (
                    <div className="bg-white border border-gray-200 p-10 text-center">
                      <Megaphone size={32} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-sm text-gray-400">No announcements yet. Create one above.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
