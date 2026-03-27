import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Zap, Tag, ChevronRight, BadgePercent, MapPin, Truck, Package, Navigation2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUserLocation } from '../context/LocationContext';
import LocationPicker, { shortAddress } from './LocationPicker';
import { useState } from 'react';

const promoData = [
  { code: 'CAMPUSBRO', discount: 10, label: '10% off for students' },
  { code: 'FIRST50', discount: 50, label: '₹50 off your first order' },
];

const pickupPoints = [
  { id: 'main-gate', name: 'Main Gate Kiosk',     hours: '8am – 10pm', icon: '🏫' },
  { id: 'library',   name: 'Library Entrance',    hours: '9am – 9pm',  icon: '📚' },
  { id: 'hostel-a',  name: 'Hostel A Block',       hours: '7am – 11pm', icon: '🏠' },
  { id: 'canteen',   name: 'Central Canteen',      hours: '8am – 8pm',  icon: '🍽️' },
];

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<typeof promoData[0] | null>(null);
  const [promoError, setPromoError] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [deliveryError, setDeliveryError] = useState('');
  const { location, fulfillmentType, setFulfillmentType, selectedPickup, setSelectedPickup } = useUserLocation();

  const serviceFee = Math.round(totalPrice * 0.05);
  const discount = appliedPromo
    ? appliedPromo.discount > 100
      ? appliedPromo.discount
      : Math.round(totalPrice * (appliedPromo.discount / 100))
    : 0;
  const finalTotal = totalPrice + serviceFee - discount;

  const applyPromo = () => {
    const found = promoData.find(p => p.code === promoCode.toUpperCase());
    if (found) {
      setAppliedPromo(found);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code bestie 😭');
      setAppliedPromo(null);
    }
  };

  // Group items by provider
  const providerGroups = Object.values(
    items.reduce((groups, item) => {
      const key = item.providerId;
      if (!groups[key]) {
        groups[key] = { providerId: item.providerId, providerName: item.providerName, providerColor: item.providerColor, items: [] as typeof items };
      }
      groups[key].items.push(item);
      return groups;
    }, {} as Record<number, { providerId: number; providerName: string; providerColor: string; items: typeof items }>)
  );

  const handleCheckout = () => {
    if (fulfillmentType === 'delivery' && !location) {
      setDeliveryError('Please set a delivery address before checking out. 📍');
      document.getElementById('delivery-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setDeliveryError('');
    const pickupPoint = fulfillmentType === 'pickup'
      ? (pickupPoints.find(p => p.id === selectedPickup) ?? null)
      : null;
    const ts = Date.now();
    const orders = providerGroups.map((group, i) => {
      const gSubtotal = group.items.reduce((s, it) => s + it.price * it.quantity, 0);
      const gFee = Math.round(gSubtotal * 0.05);
      const gDiscount = appliedPromo
        ? appliedPromo.discount > 100
          ? Math.round(appliedPromo.discount * (gSubtotal / totalPrice))
          : Math.round(gSubtotal * (appliedPromo.discount / 100))
        : 0;
      return {
        orderId:         `ORD-${(ts + i).toString(36).toUpperCase()}`,
        providerId:      group.providerId,
        providerName:    group.providerName,
        providerColor:   group.providerColor,
        items:           group.items,
        subtotal:        gSubtotal,
        serviceFee:      gFee,
        discount:        gDiscount,
        total:           gSubtotal + gFee - gDiscount,
        promoCode:       appliedPromo?.code ?? null,
        timestamp:       new Date().toISOString(),
        fulfillmentType,
        deliveryAddress: fulfillmentType === 'delivery' ? location : null,
        pickupPoint,
        status:          'CONFIRMED',
      };
    });
    const existing = JSON.parse(localStorage.getItem('campus-orders') || '[]');
    localStorage.setItem('campus-orders', JSON.stringify([...existing, ...orders]));
    localStorage.setItem('lastOrders', JSON.stringify(orders));
    localStorage.setItem('lastOrder',  JSON.stringify(orders[0]));
    clearCart();
    if (orders.length === 1) {
      navigate(`/order/${orders[0].orderId}`);
    } else {
      navigate('/order-confirmation');
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-yellow-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-48 h-48 bg-pink-300 rounded-full border-2 border-black opacity-20" />
        <div className="absolute bottom-40 left-8 w-36 h-36 bg-cyan-400 rotate-45 border-2 border-black opacity-20" />
        <div className="absolute top-60 left-1/3 w-24 h-24 bg-lime-400 border-2 border-black opacity-20" />
      </div>

      {/* Floating sticker */}
      <motion.div
        animate={{ rotate: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute top-28 right-16 bg-orange-400 border-2 border-black px-4 py-2 font-black text-sm rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-10 hidden lg:block"
      >
        SLAY 💅
      </motion.div>

      {/* Hero Header */}
      <section className="py-14 bg-pink-300 border-b-4 border-black relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-black text-sm bg-white border-2 border-black px-4 py-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all mb-6"
          >
            <ArrowLeft size={16} />
            BACK TO SERVICES
          </Link>
          <div className="flex items-center gap-6">
            <h1 className="text-5xl sm:text-6xl font-black bg-black text-white border-2 border-black px-6 py-3 rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] inline-block">
              YOUR CART 🛒
            </h1>
            {totalItems > 0 && (
              <div className="bg-yellow-300 border-2 border-black px-5 py-3 font-black text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                {totalItems} ITEM{totalItems !== 1 ? 'S' : ''}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Empty State */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="inline-block bg-white border-2 border-black p-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              <ShoppingBag size={80} className="mx-auto mb-6 opacity-30" />
              <h2 className="text-4xl font-black mb-3">IT'S LONELY HERE 😭</h2>
              <p className="font-black text-lg mb-2 text-gray-600">your cart is giving empty vibes</p>
              <p className="font-bold text-gray-500 mb-8">go find something that sparks joy fr</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-black text-white font-black text-lg px-8 py-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
              >
                <ShoppingCart size={20} />
                BROWSE SERVICES
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items — grouped by provider */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black flex items-center gap-2">
                  <ShoppingCart size={24} />
                  YOUR ORDER
                  <span className="font-bold text-sm text-gray-500">
                    ({providerGroups.length} provider{providerGroups.length !== 1 ? 's' : ''})
                  </span>
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm font-black text-red-500 border-2 border-red-400 px-4 py-2 hover:bg-red-100 transition-colors"
                >
                  CLEAR ALL
                </button>
              </div>

              <AnimatePresence>
                {providerGroups.map((group, gi) => {
                  const groupSubtotal = group.items.reduce((s, it) => s + it.price * it.quantity, 0);
                  const groupFee = Math.round(groupSubtotal * 0.05);
                  return (
                    <motion.div
                      key={group.providerId}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3, delay: gi * 0.08 }}
                      className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                    >
                      {/* Provider header */}
                      <div className={`${group.providerColor} border-b-2 border-black px-5 py-3 flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-base">{group.providerName.toUpperCase()}</span>
                          <span className="font-bold text-xs bg-white border-2 border-black px-2 py-0.5">
                            {group.items.reduce((s, i) => s + i.quantity, 0)} item{group.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <span className="font-black text-sm">₹{groupSubtotal.toLocaleString()}</span>
                      </div>

                      {/* Items in this provider group */}
                      <div className="divide-y-2 divide-black">
                        <AnimatePresence>
                          {group.items.map((item) => (
                            <motion.div
                              key={item.cartKey}
                              layout
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex gap-4 p-5"
                            >
                              {/* Image */}
                              <div className="w-20 h-20 flex-shrink-0 border-2 border-black overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div>
                                    <span className="text-xs font-black bg-gray-100 border border-black px-2 py-0.5">
                                      {item.category.toUpperCase()}
                                    </span>
                                    <h3 className="text-base font-black leading-tight mt-1">{item.name}</h3>
                                    {item.serviceOption && (
                                      <p className="text-xs font-bold text-gray-600 mt-0.5">{item.serviceOption}</p>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => removeItem(item.cartKey)}
                                    className="flex-shrink-0 p-1.5 bg-red-100 border-2 border-black hover:bg-red-300 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-0 border-2 border-black">
                                    <button
                                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                                      className="px-2.5 py-1.5 bg-pink-200 hover:bg-pink-300 transition-colors font-black border-r-2 border-black"
                                    >
                                      <Minus size={13} />
                                    </button>
                                    <span className="px-3 py-1.5 font-black text-base bg-white min-w-[2.5rem] text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                                      className="px-2.5 py-1.5 bg-lime-200 hover:bg-lime-300 transition-colors font-black border-l-2 border-black"
                                    >
                                      <Plus size={13} />
                                    </button>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-black text-lg">₹{(item.price * item.quantity).toLocaleString()}</div>
                                    {item.quantity > 1 && (
                                      <div className="text-xs font-bold text-gray-500">₹{item.price.toLocaleString()} each</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Provider group subtotal footer */}
                      <div className="border-t-2 border-black px-5 py-3 bg-gray-50 flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-500 flex items-center gap-1">
                          Platform fee (5%): <span className="font-black text-black">₹{groupFee.toLocaleString()}</span>
                        </span>
                        <span className="font-black text-sm">
                          Group total: ₹{(groupSubtotal + groupFee).toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Promo Code */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6"
              >
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <BadgePercent size={20} />
                  GOT A PROMO CODE?
                </h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="CAMPUSBRO"
                    className="flex-1 px-4 py-3 border-2 border-black font-black text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-6 py-3 bg-yellow-300 border-2 border-black font-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                  >
                    APPLY
                  </button>
                </div>
                {promoError && (
                  <p className="mt-2 text-red-600 font-black text-sm">{promoError}</p>
                )}
                {appliedPromo && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-green-700 font-black text-sm flex items-center gap-1"
                  >
                    <Zap size={14} />
                    {appliedPromo.label} applied! 🎉
                  </motion.p>
                )}
                <div className="mt-3 flex gap-2 flex-wrap">
                  {promoData.map(p => (
                    <button
                      key={p.code}
                      onClick={() => { setPromoCode(p.code); setPromoError(''); }}
                      className="text-xs font-black bg-gray-100 border-2 border-black px-3 py-1 hover:bg-gray-200 transition-colors flex items-center gap-1"
                    >
                      <Tag size={10} />
                      {p.code}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Delivery Method */}
              <motion.div
                id="delivery-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                <div className="bg-cyan-300 border-b-2 border-black px-6 py-4">
                  <h3 className="font-black text-lg flex items-center gap-2">
                    <Truck size={18} />
                    DELIVERY METHOD
                  </h3>
                </div>

                <div className="p-6">
                  {/* DELIVERY | PICKUP toggle */}
                  <div className="flex border-2 border-black mb-6">
                    <button
                      onClick={() => { setFulfillmentType('delivery'); setDeliveryError(''); }}
                      className={`flex-1 py-3 font-black text-sm flex items-center justify-center gap-2 transition-all ${
                        fulfillmentType === 'delivery' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <Truck size={15} />
                      DELIVERY
                    </button>
                    <div className="w-0.5 bg-black" />
                    <button
                      onClick={() => { setFulfillmentType('pickup'); setDeliveryError(''); }}
                      className={`flex-1 py-3 font-black text-sm flex items-center justify-center gap-2 transition-all ${
                        fulfillmentType === 'pickup' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <Package size={15} />
                      PICK-UP
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {fulfillmentType === 'delivery' ? (
                      <motion.div
                        key="delivery"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        className="space-y-4"
                      >
                        {location ? (
                          <div className="p-4 bg-lime-100 border-2 border-black flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="bg-lime-300 border-2 border-black p-1.5 shrink-0">
                                <MapPin size={15} />
                              </div>
                              <div className="min-w-0">
                                <p className="font-black text-[10px] text-green-800 tracking-widest mb-0.5">DELIVERING TO</p>
                                <p className="font-bold text-sm leading-tight line-clamp-2">{shortAddress(location.address)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setShowLocationPicker(!showLocationPicker)}
                              className="shrink-0 font-black text-xs px-3 py-1.5 border-2 border-black hover:bg-yellow-200 transition-colors"
                            >
                              CHANGE
                            </button>
                          </div>
                        ) : (
                          <div className="p-4 bg-yellow-50 border-2 border-dashed border-black">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin size={15} />
                              <p className="font-black text-sm">NO ADDRESS SET</p>
                            </div>
                            <p className="font-bold text-xs text-gray-500 mb-3">Set your address so we know where to deliver.</p>
                            <button
                              onClick={() => setShowLocationPicker(true)}
                              className="font-black text-xs px-4 py-2 bg-yellow-300 border-2 border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
                            >
                              <Navigation2 size={12} />
                              SET DELIVERY ADDRESS
                            </button>
                          </div>
                        )}

                        {deliveryError && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 font-black text-xs flex items-center gap-1.5 bg-red-50 border-2 border-red-400 px-3 py-2"
                          >
                            ⚠️ {deliveryError}
                          </motion.p>
                        )}

                        {/* Inline location picker expands here */}
                        <AnimatePresence>
                          {showLocationPicker && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="border-2 border-black">
                                <LocationPicker onClose={() => setShowLocationPicker(false)} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <p className="font-bold text-xs text-gray-500 flex items-center gap-1.5">
                          <Truck size={11} />
                          Estimated delivery: 30–60 min after confirmation
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="pickup"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="space-y-3"
                      >
                        <p className="font-bold text-sm text-gray-600 mb-1">Choose a pickup point on campus:</p>
                        {pickupPoints.map(point => (
                          <button
                            key={point.id}
                            onClick={() => setSelectedPickup(point.id)}
                            className={`w-full flex items-center gap-4 p-4 border-2 border-black text-left transition-all ${
                              selectedPickup === point.id
                                ? 'bg-yellow-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                                : 'bg-white hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-2xl">{point.icon}</span>
                            <div className="flex-1">
                              <p className="font-black text-sm">{point.name}</p>
                              <p className="font-bold text-xs text-gray-500">{point.hours}</p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 border-black shrink-0 ${
                              selectedPickup === point.id ? 'bg-yellow-400' : 'bg-white'
                            }`} />
                          </button>
                        ))}
                        <p className="font-bold text-xs text-gray-500 flex items-center gap-1.5 pt-1">
                          <Package size={11} />
                          Ready for pickup 1–2 hours after confirmation
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-24"
              >
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {/* Header */}
                  <div className="bg-black text-white px-6 py-4 border-b-2 border-black">
                    <h2 className="text-xl font-black">ORDER SUMMARY</h2>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Per-provider breakdown */}
                    <div className="space-y-2 pb-3 border-b-2 border-black">
                      {providerGroups.map(group => {
                        const gSub = group.items.reduce((s, it) => s + it.price * it.quantity, 0);
                        const gFee = Math.round(gSub * 0.05);
                        return (
                          <div key={group.providerId}>
                            <div className={`flex items-center gap-2 mb-1 px-2 py-1 ${group.providerColor} border border-black`}>
                              <span className="font-black text-xs">{group.providerName}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xs text-gray-600 px-2">
                              <span>Items</span><span>₹{gSub.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xs text-gray-600 px-2">
                              <span>Platform fee</span><span>₹{gFee.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 pb-3 border-b-2 border-black">
                      <div className="flex justify-between font-bold text-sm">
                        <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                        <span className="font-black">₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm">
                        <span>Platform Fees</span>
                        <span className="font-black">₹{serviceFee.toLocaleString()}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between font-bold text-sm text-green-600">
                          <span className="flex items-center gap-1">
                            <BadgePercent size={14} />
                            Discount ({appliedPromo.code})
                          </span>
                          <span className="font-black">-₹{discount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center py-2">
                      <span className="font-black text-xl">TOTAL</span>
                      <div className="bg-yellow-300 border-2 border-black px-4 py-2 font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        ₹{finalTotal.toLocaleString()}
                      </div>
                    </div>

                    {/* Delivery summary */}
                    <div className="py-3 border-t-2 border-gray-200">
                      {fulfillmentType === 'delivery' ? (
                        <div className="flex items-center gap-2">
                          <Truck size={13} className="shrink-0" />
                          <div className="min-w-0">
                            <p className="font-black text-xs">DELIVERY</p>
                            <p className={`font-bold text-xs truncate ${
                              location ? 'text-gray-600' : 'text-red-500'
                            }`}>
                              {location ? shortAddress(location.address, 2) : '⚠️ No address set'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Package size={13} className="shrink-0" />
                          <div className="min-w-0">
                            <p className="font-black text-xs">PICK-UP</p>
                            <p className="font-bold text-xs text-gray-600 truncate">
                              {pickupPoints.find(p => p.id === selectedPickup)?.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 bg-black text-white font-black text-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      CHECKOUT NOW
                      <ChevronRight size={20} />
                    </button>

                    <p className="text-xs font-bold text-gray-500 text-center">
                      🔒 Secure checkout • No hidden fees
                    </p>
                  </div>

                  {/* Bottom decorative strip */}
                  <div className="flex border-t-2 border-black">
                    {['bg-cyan-300', 'bg-pink-300', 'bg-yellow-300', 'bg-lime-300', 'bg-purple-300'].map(c => (
                      <div key={c} className={`flex-1 h-3 ${c}`} />
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { emoji: '🔒', label: 'SECURE' },
                    { emoji: '⚡', label: 'INSTANT' },
                    { emoji: '✅', label: 'VERIFIED' },
                    { emoji: '💯', label: 'LEGIT' },
                  ].map(badge => (
                    <div
                      key={badge.label}
                      className="bg-white border-2 border-black p-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="text-2xl mb-1">{badge.emoji}</div>
                      <div className="font-black text-xs">{badge.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}