import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft, Package, MapPin, Clock, CheckCircle,
  Truck, MessageCircle, Phone, Star, ChevronRight,
  Navigation2,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
type OrderStatus = 'CONFIRMED' | 'PREPARING' | 'IN PROGRESS' | 'ON THE WAY' | 'DELIVERED' | 'READY FOR PICKUP' | 'PICKED UP' | 'COMPLETED' | 'CANCELLED';

interface OrderRecord {
  orderId: string;
  providerId: number;
  providerName: string;
  providerColor: string;
  items: any[];
  subtotal: number;
  serviceFee: number;
  discount: number;
  total: number;
  promoCode: string | null;
  timestamp: string;
  fulfillmentType: 'delivery' | 'pickup';
  deliveryAddress?: { address: string; lat?: number; lon?: number } | null;
  pickupPoint?: { id: string; name: string; hours: string; icon: string } | null;
  status: OrderStatus;
}

// ── Mock orders (fallback for demo IDs) ───────────────────────────────────────
const mockOrders: OrderRecord[] = [
  {
    orderId: 'ORD-ACT001', providerId: 1, providerName: 'CleanCo Campus', providerColor: 'bg-cyan-300',
    items: [
      { name: 'Premium Laundry Service', serviceOption: 'Wash & Fold', price: 99, quantity: 2, category: 'Cleaning', image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800' },
      { name: 'Express Ironing',          serviceOption: 'Express',    price: 79, quantity: 1, category: 'Cleaning', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=800' },
    ],
    subtotal: 277, serviceFee: 14, discount: 0, total: 291, promoCode: null,
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    fulfillmentType: 'delivery',
    deliveryAddress: { address: 'Hostel Block A, Room 204, Campus University', lat: 19.1336, lon: 72.9162 },
    pickupPoint: null, status: 'ON THE WAY',
  },
  {
    orderId: 'ORD-ACT002', providerId: 2, providerName: 'StyleHub', providerColor: 'bg-pink-300',
    items: [
      { name: 'Hair Styling & Grooming', serviceOption: 'Style & Cut', price: 299, quantity: 1, category: 'Grooming', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800' },
    ],
    subtotal: 299, serviceFee: 15, discount: 0, total: 314, promoCode: null,
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    fulfillmentType: 'pickup',
    deliveryAddress: null,
    pickupPoint: { id: 'main-gate', name: 'Main Gate Kiosk', hours: '8am – 10pm', icon: '🏫' }, status: 'PENDING' as OrderStatus,
  },
  {
    orderId: 'ORD-ACT003', providerId: 3, providerName: 'TechFix Pro', providerColor: 'bg-yellow-300',
    items: [
      { name: 'Tech Repair Hub',          serviceOption: 'Software Issues',    price: 499,  quantity: 1, category: 'Tech', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800' },
      { name: 'Laptop Screen Replacement', serviceOption: 'Screen Replacement', price: 2499, quantity: 1, category: 'Tech', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800' },
    ],
    subtotal: 2998, serviceFee: 150, discount: 0, total: 3148, promoCode: null,
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    fulfillmentType: 'delivery',
    deliveryAddress: { address: 'Hostel Block B, Room 105, Campus University', lat: 19.1340, lon: 72.9170 },
    pickupPoint: null, status: 'IN PROGRESS',
  },
  {
    orderId: 'ORD-HST098', providerId: 4, providerName: 'Healthy Eats', providerColor: 'bg-lime-300',
    items: [
      { name: 'Coffee & Snacks Delivery', serviceOption: 'Standard Delivery', price: 149, quantity: 1, category: 'Food', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800' },
    ],
    subtotal: 149, serviceFee: 7, discount: 0, total: 156, promoCode: null,
    timestamp: new Date('2026-02-28T15:00:00').toISOString(),
    fulfillmentType: 'delivery',
    deliveryAddress: { address: 'Library, Level 2, Campus University', lat: 19.1328, lon: 72.9155 },
    pickupPoint: null, status: 'DELIVERED',
  },
];

// ── Status helpers ─────────────────────────────────────────────────────────────
function getSteps(type: 'delivery' | 'pickup') {
  return type === 'delivery'
    ? [
        { key: 'CONFIRMED',    label: 'Order Confirmed',   icon: '✅', desc: 'Payment received, provider notified' },
        { key: 'PREPARING',    label: 'Preparing',         icon: '🔄', desc: 'Provider is getting your order ready' },
        { key: 'ON THE WAY',   label: 'On the Way',        icon: '🛵', desc: 'Your order is heading to you' },
        { key: 'DELIVERED',    label: 'Delivered',         icon: '📦', desc: 'Enjoy!' },
      ]
    : [
        { key: 'CONFIRMED',         label: 'Order Confirmed',   icon: '✅', desc: 'Payment received, provider notified' },
        { key: 'PREPARING',         label: 'Preparing',         icon: '🔄', desc: 'Provider is getting your order ready' },
        { key: 'READY FOR PICKUP',  label: 'Ready for Pickup',  icon: '📦', desc: 'Head to the pickup point!' },
        { key: 'PICKED UP',         label: 'Picked Up',         icon: '🎉', desc: 'All done!' },
      ];
}

const statusOrder: Record<string, number> = {
  CONFIRMED: 0, PENDING: 0,
  PREPARING: 1, 'IN PROGRESS': 1,
  'ON THE WAY': 2, 'READY FOR PICKUP': 2,
  DELIVERED: 3, 'PICKED UP': 3, COMPLETED: 3,
  CANCELLED: -1,
};

const providerColorMap: Record<number, string> = {
  1: 'bg-cyan-300',
  2: 'bg-pink-300',
  3: 'bg-yellow-300',
  4: 'bg-lime-300',
  5: 'bg-orange-300',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function OrderTrackingPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    // 1. Try localStorage campus-orders
    try {
      const saved: OrderRecord[] = JSON.parse(localStorage.getItem('campus-orders') || '[]');
      const found = saved.find(o => o.orderId === id);
      if (found) { setOrder(found); return; }
    } catch { /* ignore */ }
    // 2. Try mock data
    const mock = mockOrders.find(o => o.orderId === id);
    if (mock) setOrder(mock);
  }, [id]);

  if (!order) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-black mb-2">Order not found</h1>
          <p className="font-bold text-gray-500 mb-6">We couldn't find order <code className="bg-gray-100 px-2 py-0.5">{id}</code>.</p>
          <Link to="/profile?tab=bookings" className="inline-block bg-black text-white font-black px-6 py-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all">
            MY BOOKINGS
          </Link>
        </div>
      </div>
    );
  }

  const steps      = getSteps(order.fulfillmentType);
  const currentIdx = statusOrder[order.status] ?? 0;
  const isCancelled = order.status === 'CANCELLED';
  const isDone      = currentIdx === 3;

  const date    = new Date(order.timestamp);
  const fmtDate = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const fmtTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Map embed
  const lat = order.deliveryAddress?.lat ?? 19.1336;
  const lon = order.deliveryAddress?.lon ?? 72.9162;
  const delta = 0.007;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lon}`;

  const accentColor = providerColorMap[order.providerId] ?? 'bg-gray-300';

  return (
    <div className="pt-16 min-h-screen bg-gray-50">

      {/* Back bar */}
      <div className="bg-white border-b-2 border-black px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <Link
            to="/profile?tab=bookings"
            className="inline-flex items-center gap-2 font-black text-sm bg-white border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft size={15} />
            MY BOOKINGS
          </Link>
          <span className="font-black text-sm text-gray-400 tracking-widest">{order.orderId}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${accentColor} border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-black text-xs text-black/50 tracking-widest mb-1">
                {order.fulfillmentType === 'delivery' ? '🛵 DELIVERY ORDER' : '📦 PICKUP ORDER'} · {fmtDate} · {fmtTime}
              </p>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight">{order.providerName.toUpperCase()}</h1>
            </div>
            <div className={`bg-black text-white font-black text-sm px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] ${isCancelled ? 'opacity-60' : ''}`}>
              {isCancelled ? '❌ CANCELLED' : isDone ? '✅ COMPLETED' : '⚡ ACTIVE'}
            </div>
          </div>
        </motion.div>

        {/* Status Timeline */}
        {!isCancelled && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            <div className="bg-black text-white px-6 py-4">
              <h2 className="font-black text-lg flex items-center gap-2">
                {order.fulfillmentType === 'delivery' ? <Truck size={18} /> : <Package size={18} />}
                ORDER STATUS
              </h2>
            </div>
            <div className="p-6">
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-200 z-0" />
                <div
                  className="absolute left-5 top-6 w-0.5 bg-black z-0 transition-all duration-700"
                  style={{ height: `${(currentIdx / (steps.length - 1)) * 100}%` }}
                />

                <div className="relative z-10 space-y-6">
                  {steps.map((step, i) => {
                    const done    = i <= currentIdx;
                    const current = i === currentIdx;
                    return (
                      <div key={step.key} className="flex items-start gap-4">
                        {/* Dot */}
                        <div className={`w-10 h-10 border-2 border-black flex items-center justify-center text-lg font-black flex-shrink-0 transition-all ${
                          done ? (current ? `${accentColor} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]` : 'bg-black text-white') : 'bg-white text-gray-300'
                        }`}>
                          {done ? step.icon : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                        </div>
                        <div className={`pt-1.5 ${done ? '' : 'opacity-40'}`}>
                          <p className={`font-black text-sm ${current ? 'text-black' : done ? 'text-black' : 'text-gray-400'}`}>
                            {step.label}
                            {current && <span className="ml-2 text-xs font-bold text-gray-500 animate-pulse">● NOW</span>}
                          </p>
                          <p className="font-bold text-xs text-gray-500 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Map — delivery only */}
        {order.fulfillmentType === 'delivery' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            <div className={`${accentColor} border-b-2 border-black px-6 py-4 flex items-center justify-between`}>
              <h2 className="font-black text-lg flex items-center gap-2">
                <MapPin size={18} />
                DELIVERY LOCATION
              </h2>
              {!isDone && (
                <span className="text-xs font-black bg-white border-2 border-black px-3 py-1 flex items-center gap-1">
                  <Navigation2 size={11} />
                  TRACKING LIVE
                </span>
              )}
            </div>
            {/* Map iframe */}
            <div className="relative" style={{ height: 280 }}>
              <iframe
                title="Delivery map"
                src={mapSrc}
                width="100%"
                height="280"
                className="border-0 w-full"
                loading="lazy"
              />
              {/* Address overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-[10px] text-gray-500 tracking-widest mb-0.5">DELIVERING TO</p>
                <p className="font-bold text-xs leading-tight line-clamp-2">{order.deliveryAddress?.address}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pickup point — pickup only */}
        {order.fulfillmentType === 'pickup' && order.pickupPoint && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            <div className={`${accentColor} border-b-2 border-black px-6 py-4`}>
              <h2 className="font-black text-lg flex items-center gap-2">
                <Package size={18} />
                PICKUP LOCATION
              </h2>
            </div>
            <div className="p-6 flex items-center gap-5">
              <div className="text-4xl">{order.pickupPoint.icon}</div>
              <div>
                <h3 className="font-black text-xl">{order.pickupPoint.name}</h3>
                <p className="font-bold text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Clock size={12} />
                  {order.pickupPoint.hours}
                </p>
                {!isDone && (
                  <p className="mt-2 text-xs font-black bg-yellow-200 border border-black px-3 py-1 inline-block">
                    📍 Ready for you when the status says "READY FOR PICKUP"
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Order items */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        >
          <div className="bg-cyan-300 border-b-2 border-black px-6 py-4">
            <h2 className="font-black text-lg flex items-center gap-2">
              <Package size={18} />
              ORDER ITEMS
            </h2>
          </div>
          <div className="divide-y-2 divide-black">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 flex-shrink-0 border-2 border-black overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm truncate">{item.name}</div>
                  {item.serviceOption && <div className="text-xs font-bold text-gray-500 mt-0.5">{item.serviceOption}</div>}
                  <span className="text-[10px] font-black bg-gray-100 border border-black px-2 py-0.5 inline-block mt-1">
                    {item.category?.toUpperCase()}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-black">₹{(item.price * item.quantity).toLocaleString()}</div>
                  <div className="text-xs font-bold text-gray-500">×{item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        >
          <div className="bg-yellow-300 border-b-2 border-black px-6 py-4">
            <h2 className="font-black text-lg">PAYMENT BREAKDOWN</h2>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between font-bold text-sm">
              <span>Subtotal ({order.items.reduce((s: number, i: any) => s + i.quantity, 0)} items)</span>
              <span className="font-black">₹{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-sm">
              <span>Platform Fee (5%)</span>
              <span className="font-black">₹{order.serviceFee.toLocaleString()}</span>
            </div>
            {(order.discount ?? 0) > 0 && (
              <div className="flex justify-between font-bold text-sm text-green-700">
                <span>Discount {order.promoCode ? `(${order.promoCode})` : ''}</span>
                <span className="font-black">-₹{order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t-2 border-black pt-4 flex items-center justify-between">
              <span className="font-black text-xl">TOTAL PAID</span>
              <div className="bg-yellow-300 border-2 border-black px-5 py-2 font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ₹{order.total.toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          <Link
            to={`/chat/${order.providerId}`}
            className="flex items-center justify-center gap-2 py-3 bg-black text-white font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle size={16} />
            CHAT
          </Link>
          <Link
            to={`/provider/${order.providerId}`}
            className="flex items-center justify-center gap-2 py-3 bg-white font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
          >
            VIEW PROVIDER
            <ChevronRight size={14} />
          </Link>
          {isDone && (
            <Link
              to={`/provider/${order.providerId}`}
              className="flex items-center justify-center gap-2 py-3 bg-yellow-300 font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
            >
              <Star size={14} />
              LEAVE REVIEW
            </Link>
          )}
          {!isDone && !isCancelled && (
            <Link
              to="/services"
              className="flex items-center justify-center gap-2 py-3 bg-lime-300 font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
            >
              BROWSE MORE
              <ChevronRight size={14} />
            </Link>
          )}
        </motion.div>

        {/* Bottom strip */}
        <div className="flex border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {['bg-cyan-300', 'bg-pink-300', 'bg-yellow-300', 'bg-lime-400', 'bg-purple-300'].map(c => (
            <div key={c} className={`flex-1 h-4 ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}