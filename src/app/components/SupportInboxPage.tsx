import { useState } from 'react';
import { Link } from 'react-router';
import {
  Inbox, Search, Send, CheckCircle, ArrowLeft,
  Shield, AlertCircle, Clock, MailOpen, X,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
type TicketStatus   = 'open' | 'pending' | 'resolved';
type TicketPriority = 'high' | 'medium' | 'low';

interface Message { sender: 'user' | 'admin'; content: string; time: string; }
interface Ticket {
  id: string; subject: string; from: string; email: string;
  date: string; status: TicketStatus; priority: TicketPriority;
  preview: string; messages: Message[];
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const INIT_TICKETS: Ticket[] = [
  {
    id: 'TKT001', subject: 'Order not delivered', from: 'Marilyn Andrews',
    email: 'marilynandrews10@gmail.com', date: 'Mar 13, 2026', status: 'open', priority: 'high',
    preview: "I placed an order yesterday and it still hasn't arrived.",
    messages: [
      { sender: 'user', content: "Hi, I placed an order yesterday (ORD-ACT001) and it still hasn't been delivered. The tracking page shows 'On the Way' but nothing has arrived at my room. It's been over 18 hours. Can you please look into this?", time: 'Mar 13 · 10:24 AM' },
    ],
  },
  {
    id: 'TKT002', subject: "Provider didn't show up", from: 'James Okafor',
    email: 'jamesokafor@campus.ac', date: 'Mar 12, 2026', status: 'open', priority: 'high',
    preview: 'I booked a room cleaning for 10am. It is now 1pm and no one showed.',
    messages: [
      { sender: 'user', content: "I booked a room cleaning service for 10am today. It is now 1pm and the provider has still not showed up or responded to messages. This is completely unacceptable.", time: 'Mar 12 · 1:05 PM' },
    ],
  },
  {
    id: 'TKT003', subject: 'Wrong item delivered', from: 'Priya Sharma',
    email: 'priyasharma@campus.ac', date: 'Mar 11, 2026', status: 'pending', priority: 'medium',
    preview: "I ordered the Healthy Meal Plan but received something completely different.",
    messages: [
      { sender: 'user',  content: "I ordered the 'Healthy Meal Plan' option but received a completely different meal. This is the second time this has happened this month. Very disappointed.", time: 'Mar 11 · 2:30 PM' },
      { sender: 'admin', content: "Hi Priya, I'm sorry about this. I've escalated the issue to the provider and they've acknowledged the mix-up. A replacement delivery or full refund will be processed within 24 hours. I'll follow up with you once it's confirmed.", time: 'Mar 11 · 4:15 PM' },
    ],
  },
  {
    id: 'TKT004', subject: 'Refund not received after cancellation', from: 'Kofi Mensah',
    email: 'kofimensah@campus.ac', date: 'Mar 10, 2026', status: 'pending', priority: 'medium',
    preview: 'I cancelled a booking 5 days ago and still have not received my refund.',
    messages: [
      { sender: 'user',  content: "I cancelled my booking (B-096) 5 days ago and have not received my refund yet. The cancellation confirmation email said it would take 2–3 business days. It has been 5.", time: 'Mar 10 · 9:00 AM' },
      { sender: 'admin', content: "Hi Kofi, I can confirm the cancellation and refund were processed on our end. The delay may be on your bank's side. If it doesn't reflect by March 15, please let us know and we'll escalate directly.", time: 'Mar 10 · 11:30 AM' },
    ],
  },
  {
    id: 'TKT005', subject: 'Double charge on my account', from: 'Amara Nwosu',
    email: 'amaranwosu@campus.ac', date: 'Mar 9, 2026', status: 'resolved', priority: 'low',
    preview: 'I was charged twice for the same order.',
    messages: [
      { sender: 'user',  content: "I was charged twice for the same order (ORD-ACT002). My bank shows two deductions of the same amount. Please help resolve this.", time: 'Mar 9 · 8:45 AM' },
      { sender: 'admin', content: "Hi Amara, we've verified the duplicate charge and have issued a full refund for the extra payment. It should reflect in your account within 2 business days.", time: 'Mar 9 · 10:00 AM' },
      { sender: 'user',  content: "The refund came through — thank you so much!", time: 'Mar 9 · 4:30 PM' },
      { sender: 'admin', content: "Great! Glad we could help. Marking this ticket as resolved. Feel free to reach out if anything else comes up.", time: 'Mar 9 · 5:00 PM' },
    ],
  },
  {
    id: 'TKT006', subject: 'Cannot log in — password reset not working', from: 'Emmanuel Osei',
    email: 'emmaosei@campus.ac', date: 'Mar 8, 2026', status: 'resolved', priority: 'low',
    preview: "Password reset emails aren't arriving. I've been locked out for 2 days.",
    messages: [
      { sender: 'user',  content: "I've been trying to reset my password for two days. The reset email never arrives, not even in spam. I'm completely locked out of my account.", time: 'Mar 8 · 11:00 AM' },
      { sender: 'admin', content: "Hi Emmanuel, we found a synchronisation issue with your email address in our system. It's now corrected. Please try the password reset again — the email should arrive within a few minutes.", time: 'Mar 8 · 1:30 PM' },
      { sender: 'user',  content: "Got it! Logged in successfully. Thank you.", time: 'Mar 8 · 2:00 PM' },
    ],
  },
];

// ── Style helpers ──────────────────────────────────────────────────────────────
const statusStyle: Record<TicketStatus, { badge: string; label: string; icon: React.ElementType }> = {
  open:     { badge: 'bg-red-50 text-red-700 border border-red-200',       label: 'Open',     icon: AlertCircle   },
  pending:  { badge: 'bg-amber-50 text-amber-700 border border-amber-200', label: 'Pending',  icon: Clock         },
  resolved: { badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200', label: 'Resolved', icon: CheckCircle },
};

const priorityDot: Record<TicketPriority, string> = {
  high:   'bg-red-500',
  medium: 'bg-amber-400',
  low:    'bg-gray-300',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function SupportInboxPage() {
  const [tickets, setTickets]         = useState<Ticket[]>(INIT_TICKETS);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [search, setSearch]           = useState('');
  const [selectedId, setSelectedId]   = useState<string>(INIT_TICKETS[0].id);
  const [reply, setReply]             = useState('');
  const [showDetail, setShowDetail]   = useState(false); // mobile toggle

  const counts = {
    all:      tickets.length,
    open:     tickets.filter(t => t.status === 'open').length,
    pending:  tickets.filter(t => t.status === 'pending').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  };

  const filtered = tickets.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return t.subject.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.email.toLowerCase().includes(q);
    }
    return true;
  });

  const selected = tickets.find(t => t.id === selectedId) ?? null;

  const handleSendReply = () => {
    if (!reply.trim()) return;
    const time = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    setTickets(prev => prev.map(t =>
      t.id === selectedId
        ? { ...t, messages: [...t.messages, { sender: 'admin', content: reply.trim(), time }], status: t.status === 'open' ? 'pending' : t.status }
        : t
    ));
    setReply('');
  };

  const setStatus = (id: string, status: TicketStatus) =>
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));

  return (
    <div className="pt-16 h-screen flex flex-col bg-white">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="p-1 text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
              <Inbox size={14} className="text-gray-500" />
              Support Inbox
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">{counts.open} open · {counts.pending} pending · {counts.resolved} resolved</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-yellow-400 flex items-center justify-center">
            <Shield size={13} className="text-gray-900" />
          </div>
          <span className="text-xs font-medium text-gray-500 hidden sm:block">Admin</span>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: ticket list */}
        <div className={`flex flex-col w-full md:w-80 lg:w-96 border-r border-gray-200 flex-shrink-0 ${showDetail ? 'hidden md:flex' : 'flex'}`}>

          {/* Search + status filters */}
          <div className="p-3 border-b border-gray-100 space-y-2 flex-shrink-0">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-8 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-900 bg-gray-50"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  <X size={12} />
                </button>
              )}
            </div>
            <div className="flex gap-1">
              {(['all', 'open', 'pending', 'resolved'] as (TicketStatus | 'all')[]).map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-wide transition-colors leading-none ${
                    statusFilter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {f}
                  {f !== 'all' && counts[f] > 0 && ` (${counts[f]})`}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket rows */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filtered.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => { setSelectedId(ticket.id); setShowDetail(true); }}
                className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 transition-colors border-l-2 ${
                  selectedId === ticket.id ? 'bg-blue-50/60 border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priorityDot[ticket.priority]}`} />
                    <p className={`text-xs truncate ${ticket.status === 'open' ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                      {ticket.subject}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{ticket.date.replace(', 2026', '')}</span>
                </div>
                <p className="text-xs text-gray-600 font-medium ml-3 mb-1">{ticket.from}</p>
                <p className="text-xs text-gray-400 truncate ml-3">{ticket.preview}</p>
                <div className="mt-1.5 ml-3">
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 ${statusStyle[ticket.status].badge}`}>
                    {statusStyle[ticket.status].label.toUpperCase()}
                  </span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <MailOpen size={28} className="mx-auto text-gray-300 mb-2" />
                <p className="text-xs text-gray-400">No tickets found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: ticket detail */}
        <div className={`flex-1 flex flex-col min-w-0 bg-white ${!showDetail ? 'hidden md:flex' : 'flex'}`}>
          {selected ? (
            <>
              {/* Ticket header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between gap-4 flex-shrink-0">
                <div className="flex items-start gap-3 min-w-0">
                  <button onClick={() => setShowDetail(false)} className="md:hidden p-1 text-gray-400 hover:text-gray-700 mt-0.5">
                    <ArrowLeft size={15} />
                  </button>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-900">{selected.subject}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">{selected.from} · <span className="text-gray-400">{selected.email}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-1 ${statusStyle[selected.status].badge}`}>
                    {statusStyle[selected.status].label.toUpperCase()}
                  </span>
                  {selected.status !== 'resolved' ? (
                    <button
                      onClick={() => setStatus(selected.id, 'resolved')}
                      className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle size={10} /> Mark Resolved
                    </button>
                  ) : (
                    <button
                      onClick={() => setStatus(selected.id, 'open')}
                      className="text-[10px] font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>

              {/* Ticket info strip */}
              <div className="px-6 py-2.5 border-b border-gray-100 bg-gray-50 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-[10px] text-gray-400 font-medium">Ticket <span className="text-gray-600 font-semibold">{selected.id}</span></span>
                <span className="text-[10px] text-gray-400">Received {selected.date}</span>
                <span className={`flex items-center gap-1 text-[10px] font-semibold`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[selected.priority]}`} />
                  {selected.priority.charAt(0).toUpperCase() + selected.priority.slice(1)} priority
                </span>
              </div>

              {/* Message thread */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                {selected.messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.sender === 'admin' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                      msg.sender === 'admin' ? 'bg-gray-900 text-yellow-400' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {msg.sender === 'admin' ? 'A' : selected.from[0]}
                    </div>
                    {/* Bubble */}
                    <div className={`max-w-[75%] flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                      <div className={`text-[10px] font-semibold mb-1 flex items-center gap-2 ${msg.sender === 'admin' ? 'flex-row-reverse text-gray-500' : 'text-gray-700'}`}>
                        <span>{msg.sender === 'admin' ? 'Admin' : selected.from}</span>
                        <span className="font-normal text-gray-400">{msg.time}</span>
                      </div>
                      <div className={`px-4 py-3 text-sm leading-relaxed ${
                        msg.sender === 'admin'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply box */}
              {selected.status !== 'resolved' ? (
                <div className="border-t border-gray-200 p-4 flex-shrink-0">
                  <textarea
                    rows={3}
                    placeholder="Write your reply…"
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSendReply(); }}
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gray-900 resize-none mb-3"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-gray-400">Ctrl + Enter to send</p>
                    <button
                      onClick={handleSendReply}
                      disabled={!reply.trim()}
                      className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-4 py-2 hover:bg-gray-800 transition-colors disabled:opacity-40"
                    >
                      <Send size={13} /> Send Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-center gap-2 text-xs text-gray-400 flex-shrink-0">
                  <CheckCircle size={13} className="text-emerald-500" />
                  This ticket has been resolved
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Inbox size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-gray-400">Select a ticket to view the conversation</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
