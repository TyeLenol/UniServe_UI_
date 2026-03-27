import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Zap, ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '../context/CartContext';

interface LastOrder {
  orderId: string;
  providerId?: number;
  providerName?: string;
  providerColor?: string;
  items: CartItem[];
  subtotal: number;
  serviceFee: number;
  discount: number;
  total: number;
  promoCode: string | null;
  timestamp: string;
  fulfillmentType?: 'delivery' | 'pickup';
  deliveryAddress?: { address: string; lat?: number; lon?: number } | null;
  pickupPoint?: { id: string; name: string; hours: string; icon: string } | null;
}

export default function OrderConfirmationPage() {
  const [orders, setOrders] = useState<LastOrder[]>([]);

  useEffect(() => {
    // Try lastOrders (array from multi-provider checkout)
    const multi = localStorage.getItem('lastOrders');
    if (multi) {
      const parsed = JSON.parse(multi);
      if (Array.isArray(parsed) && parsed.length > 0) { setOrders(parsed); return; }
    }
    // Fall back to legacy lastOrder (single)
    const single = localStorage.getItem('lastOrder');
    if (single) setOrders([JSON.parse(single)]);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-black mb-2">No order found</h1>
          <p className="font-bold text-gray-500 mb-6">Looks like you haven't placed an order yet.</p>
          <Link
            to="/services"
            className="inline-block bg-black text-white font-black px-6 py-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all"
          >
            BROWSE SERVICES
          </Link>
        </div>
      </div>
    );
  }

  const grandTotal = orders.reduce((s, o) => s + o.total, 0);
  const firstOrder  = orders[0];
  const fmtDate     = new Date(firstOrder.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const fmtTime     = new Date(firstOrder.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="pt-16 min-h-screen bg-lime-50 relative overflow-hidden">

      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 right-8 w-64 h-64 bg-lime-300 rounded-full opacity-25 border-2 border-black" />
        <div className="absolute bottom-32 left-6 w-48 h-48 bg-cyan-300 rotate-45 opacity-20 border-2 border-black" />
        <div className="absolute top-64 left-1/3 w-28 h-28 bg-yellow-300 opacity-20 border-2 border-black" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 relative">

        {/* Celebration header */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -8, 0], y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            className="text-8xl mb-4 inline-block"
          >
            🎉
          </motion.div>
          <div className="mb-4">
            <span className="bg-lime-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block px-5 py-2 font-black text-lg -rotate-1">
              ORDER CONFIRMED ✅
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3">You're all set bestie! 💅</h1>
          <p className="font-bold text-gray-600 text-lg">
            The provider will reach out to schedule your service.
          </p>
        </motion.div>

        {/* Per-provider order cards */}
        {orders.map((ord, oi) => {
          const accentColor = ord.providerColor ?? 'bg-gray-300';
          return (
            <motion.div
              key={ord.orderId}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + oi * 0.07 }}
              className="mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white"
            >
              {/* Provider header */}
              <div className={`${accentColor} border-b-2 border-black px-5 py-4 flex flex-wrap items-center justify-between gap-3`}>
                <div>
                  {orders.length > 1 && (
                    <p className="font-black text-[10px] text-black/50 tracking-widest mb-0.5">ORDER {oi + 1} OF {orders.length}</p>
                  )}
                  <h3 className="font-black text-xl">{ord.providerName ?? 'Your Order'}</h3>
                  <p className="font-bold text-xs text-black/60 mt-0.5">{ord.orderId} · {fmtDate} · {fmtTime}</p>
                </div>
                <Link
                  to={`/order/${ord.orderId}`}
                  className="inline-flex items-center gap-2 bg-black text-white font-black text-xs px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  TRACK ORDER →
                </Link>
              </div>

              {/* Items */}
              <div className="divide-y-2 divide-black">
                {ord.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <div className="w-14 h-14 flex-shrink-0 border-2 border-black overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-sm truncate">{item.name}</div>
                      {item.serviceOption && <div className="text-xs font-bold text-gray-500 mt-0.5">{item.serviceOption}</div>}
                      <span className="text-[10px] font-black bg-cyan-100 border border-black px-2 py-0.5 inline-block mt-1">
                        {(item.category ?? '').toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black">₹{(item.price * item.quantity).toLocaleString()}</div>
                      <div className="text-xs font-bold text-gray-500">×{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery / Pickup inline */}
              {ord.fulfillmentType && (
                <div className={`border-t-2 border-black px-5 py-3 flex items-center gap-3 ${
                  ord.fulfillmentType === 'delivery' ? 'bg-cyan-50' : 'bg-orange-50'
                }`}>
                  <span className="text-xl flex-shrink-0">
                    {ord.fulfillmentType === 'delivery' ? '🛵' : (ord.pickupPoint?.icon ?? '📦')}
                  </span>
                  <div className="min-w-0">
                    <p className="font-black text-[10px] text-gray-500 tracking-widest">
                      {ord.fulfillmentType === 'delivery' ? 'DELIVERING TO' : 'PICKUP POINT'}
                    </p>
                    <p className="font-bold text-xs truncate">
                      {ord.fulfillmentType === 'delivery'
                        ? (ord.deliveryAddress?.address ?? 'Address not saved')
                        : `${ord.pickupPoint?.name ?? 'N/A'} · Open ${ord.pickupPoint?.hours}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Compact payment footer */}
              <div className="border-t-2 border-black bg-gray-50 px-5 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-4 text-sm font-bold text-gray-500 flex-wrap">
                  <span>Subtotal ₹{ord.subtotal.toLocaleString()}</span>
                  <span>+ Fee ₹{ord.serviceFee.toLocaleString()}</span>
                  {(ord.discount ?? 0) > 0 && <span className="text-green-700">− Discount ₹{ord.discount.toLocaleString()}</span>}
                </div>
                <div className="font-black text-lg">₹{ord.total.toLocaleString()}</div>
              </div>
            </motion.div>
          );
        })}

        {/* Grand total — multi-provider only */}
        {orders.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + orders.length * 0.07 }}
            className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 mb-6 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <p className="text-xs font-black text-gray-400 tracking-widest mb-1">TOTAL ACROSS {orders.length} PROVIDERS</p>
              <p className="font-bold text-sm text-white/60">{orders.map(o => o.providerName).join(' · ')}</p>
            </div>
            <div className="bg-yellow-300 border-2 border-black text-black px-5 py-2 font-black text-2xl shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
              ₹{grandTotal.toLocaleString()}
            </div>
          </motion.div>
        )}

        {/* What's next */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 overflow-hidden"
        >
          <div className="bg-purple-300 border-b-2 border-black px-6 py-4">
            <h2 className="font-black text-lg flex items-center gap-2">
              <Zap size={18} />
              WHAT'S NEXT?
            </h2>
          </div>
          <div className="divide-y-2 divide-black">
            {[
              { emoji: '📩', step: '01', title: 'Confirmation Email', desc: 'Check your inbox for the order summary.' },
              { emoji: '📞', step: '02', title: 'Provider Contact',   desc: 'Your provider will reach out to schedule.' },
              { emoji: '⚡', step: '03', title: 'Service Delivered',  desc: 'Sit back and relax — they\'ve got you covered.' },
              { emoji: '⭐', step: '04', title: 'Leave a Review',     desc: 'Rate your experience to help future students.' },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-4 p-5">
                <div className="text-2xl flex-shrink-0">{s.emoji}</div>
                <div className="flex-1">
                  <div className="font-black text-sm">{s.title}</div>
                  <div className="font-bold text-xs text-gray-500 mt-0.5">{s.desc}</div>
                </div>
                <div className="font-black text-3xl text-black/10 flex-shrink-0 select-none">{s.step}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <Link
            to="/profile?tab=bookings"
            className="flex items-center justify-center gap-2 py-4 bg-black text-white font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all"
          >
            <ShoppingBag size={18} />
            MY BOOKINGS
          </Link>
          <Link
            to="/services"
            className="flex items-center justify-center gap-2 py-4 bg-white font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
          >
            BROWSE MORE
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Decorative footer strip */}
        <div className="mt-10 flex border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {['bg-cyan-300', 'bg-pink-300', 'bg-yellow-300', 'bg-lime-400', 'bg-purple-300'].map(c => (
            <div key={c} className={`flex-1 h-4 ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}