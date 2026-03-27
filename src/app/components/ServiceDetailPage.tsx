import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  ShoppingCart,
  Plus,
  Minus,
  MessageCircle,
  Phone,
  ThumbsUp,
  Zap,
  Shield,
} from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const serviceDetails: Record<string, any> = {
  '1': {
    name: "Premium Laundry Service",
    category: "Cleaning",
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1200",
    verified: true,
    color: 'bg-cyan-300',
    description: "Professional laundry service with same-day delivery. We handle everything from regular clothes to delicate fabrics with care.",
    fullDescription: "Our premium laundry service offers comprehensive cleaning solutions for students. We use eco-friendly detergents and state-of-the-art equipment to ensure your clothes are cleaned to perfection. With flexible pickup and delivery options, we make laundry day stress-free.",
    pricing: [
      { service: "Wash & Fold", price: 99, duration: "Same Day" },
      { service: "Wash & Iron", price: 149, duration: "24 Hours" },
      { service: "Dry Clean", price: 199, duration: "48 Hours" },
      { service: "Delicate Items", price: 249, duration: "48 Hours" },
    ],
    location: "Block A, Campus Building 2",
    hours: "Mon-Sat: 8AM-8PM, Sun: 9AM-6PM",
    phone: "+91 98765 43210",
  },
  '2': {
    name: "Hair Styling & Grooming",
    category: "Grooming",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200",
    verified: true,
    color: 'bg-pink-300',
    description: "Expert hair styling, cutting, and grooming services. Modern styles for every occasion, right on campus.",
    fullDescription: "Transform your look with our professional hair styling and grooming services. Our experienced stylists stay updated with the latest trends and techniques to give you the perfect look for any occasion.",
    pricing: [
      { service: "Basic Haircut", price: 199, duration: "30 min" },
      { service: "Style & Cut", price: 299, duration: "45 min" },
      { service: "Hair Coloring", price: 799, duration: "2 hours" },
      { service: "Full Grooming", price: 499, duration: "1 hour" },
    ],
    location: "Block C, Campus Mall",
    hours: "Mon-Sat: 10AM-7PM, Sun: Closed",
    phone: "+91 98765 43211",
  },
  '3': {
    name: "Tech Repair Hub",
    category: "Tech",
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200",
    verified: true,
    color: 'bg-yellow-300',
    description: "Fast and reliable repairs for laptops, phones, and tablets. Certified technicians with quality parts.",
    fullDescription: "Our certified technicians provide expert repair services for all your devices. We use genuine parts and offer warranties on all repairs. Fast turnaround times ensure you're never without your devices for long.",
    pricing: [
      { service: "Screen Replacement", price: 2499, duration: "2-3 days" },
      { service: "Battery Replacement", price: 1299, duration: "Same Day" },
      { service: "Software Issues", price: 499, duration: "2 hours" },
      { service: "Data Recovery", price: 1999, duration: "3-5 days" },
    ],
    location: "Block D, Tech Center",
    hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    phone: "+91 98765 43212",
  },
  '4': {
    name: "Healthy Meal Plans",
    category: "Food",
    rating: 4.6,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
    verified: true,
    color: 'bg-lime-300',
    description: "Nutritious and delicious meal delivery service. Customizable plans to fit your dietary needs.",
    fullDescription: "Fuel your study sessions with our nutritionist-designed meal plans. Choose from vegetarian, vegan, or non-veg options. All meals are freshly prepared and delivered to your door.",
    pricing: [
      { service: "Basic Plan (1 meal/day)", price: 149, duration: "Daily" },
      { service: "Standard (2 meals/day)", price: 249, duration: "Daily" },
      { service: "Full Plan (3 meals/day)", price: 349, duration: "Daily" },
      { service: "Weekly Bundle", price: 1499, duration: "7 days" },
    ],
    location: "Central Kitchen, Block E",
    hours: "7 days: 7AM-9PM",
    phone: "+91 98765 43213",
  },
  '5': {
    name: "Room Cleaning Service",
    category: "Cleaning",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
    verified: true,
    color: 'bg-orange-300',
    description: "Deep cleaning services for dorm rooms and apartments. Professional and thorough cleaning guaranteed.",
    fullDescription: "Our professional cleaning team provides thorough deep cleaning for dorm rooms and student apartments. We use eco-friendly products and pay attention to every corner.",
    pricing: [
      { service: "Basic Clean", price: 199, duration: "1-2 hours" },
      { service: "Deep Clean", price: 399, duration: "3-4 hours" },
      { service: "Move-in/out Clean", price: 599, duration: "4-6 hours" },
      { service: "Weekly Regular", price: 1299, duration: "Monthly" },
    ],
    location: "Service available in all blocks",
    hours: "Mon-Sat: 9AM-6PM",
    phone: "+91 98765 43214",
  },
};

const defaultService = serviceDetails['1'];

const reviewsData = [
  {
    name: "Priya Sharma",
    rating: 5,
    date: "2 days ago",
    comment: "bestie this service is ELITE. My clothes came back smelling like heaven and folded perfectly. 100% coming back!!",
    avatar: "PS",
    helpful: 23,
    color: 'bg-cyan-200',
  },
  {
    name: "Rahul Verma",
    rating: 5,
    date: "1 week ago",
    comment: "no cap, the best service on campus. Staff is friendly, quality is top tier. My hostel room looks brand new fr.",
    avatar: "RV",
    helpful: 18,
    color: 'bg-pink-200',
  },
  {
    name: "Ananya Patel",
    rating: 4,
    date: "2 weeks ago",
    comment: "Pretty good ngl. Slightly delayed but the quality made up for it. Will def use again before exams!",
    avatar: "AP",
    helpful: 11,
    color: 'bg-yellow-200',
  },
  {
    name: "Karan Singh",
    rating: 5,
    date: "3 weeks ago",
    comment: "Absolutely slayed. The team is so professional and nice. Pricing is student-friendly too which is a major W.",
    avatar: "KS",
    helpful: 34,
    color: 'bg-lime-200',
  },
];

const ratingColors = ['bg-red-300', 'bg-orange-300', 'bg-yellow-300', 'bg-lime-300', 'bg-green-300'];

// Map service id → provider info
const providerMap: Record<string, { providerId: number; providerName: string; providerColor: string }> = {
  '1':  { providerId: 1, providerName: 'CleanCo Campus', providerColor: 'bg-cyan-300'   },
  '2':  { providerId: 2, providerName: 'StyleHub',       providerColor: 'bg-pink-300'   },
  '3':  { providerId: 3, providerName: 'TechFix Pro',    providerColor: 'bg-yellow-300' },
  '4':  { providerId: 4, providerName: 'Healthy Eats',   providerColor: 'bg-lime-300'   },
  '5':  { providerId: 1, providerName: 'CleanCo Campus', providerColor: 'bg-cyan-300'   },
  '6':  { providerId: 4, providerName: 'Healthy Eats',   providerColor: 'bg-lime-300'   },
  '7':  { providerId: 5, providerName: 'CampusRent',     providerColor: 'bg-orange-300' },
  '8':  { providerId: 2, providerName: 'StyleHub',       providerColor: 'bg-pink-300'   },
  '9':  { providerId: 3, providerName: 'TechFix Pro',    providerColor: 'bg-yellow-300' },
  '10': { providerId: 1, providerName: 'CleanCo Campus', providerColor: 'bg-cyan-300'   },
  '11': { providerId: 5, providerName: 'CampusRent',     providerColor: 'bg-orange-300' },
  '12': { providerId: 4, providerName: 'Healthy Eats',   providerColor: 'bg-lime-300'   },
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const service = serviceDetails[id || '1'] || defaultService;
  const { addItem, items } = useCart();
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>({});
  const [addedToCart, setAddedToCart] = useState(false);

  const cartItemsForService = items.filter(i => i.id === parseInt(id || '1'));
  const cartItemsTotal = cartItemsForService.reduce((sum, i) => sum + i.quantity, 0);

  const totalSelected = Object.values(itemQuantities).reduce((sum, q) => sum + q, 0);
  const totalSelectedPrice = Object.entries(itemQuantities).reduce((sum, [indexStr, qty]) => {
    return sum + (service.pricing[parseInt(indexStr)]?.price || 0) * qty;
  }, 0);

  const setItemQty = (index: number, delta: number) => {
    setItemQuantities(prev => ({
      ...prev,
      [index]: Math.max(0, (prev[index] || 0) + delta),
    }));
  };

  const handleAddToCart = () => {
    const providerInfo = providerMap[id || '1'] ?? { providerId: 1, providerName: 'CleanCo Campus', providerColor: 'bg-cyan-300' };
    Object.entries(itemQuantities).forEach(([indexStr, qty]) => {
      if (qty > 0) {
        const option = service.pricing[parseInt(indexStr)];
        addItem({
          cartKey: `${parseInt(id || '1')}-${option.service}`,
          id: parseInt(id || '1'),
          name: service.name,
          price: option.price,
          image: service.image,
          category: service.category,
          serviceOption: option.service,
          providerId:    providerInfo.providerId,
          providerName:  providerInfo.providerName,
          providerColor: providerInfo.providerColor,
        }, qty);
      }
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 relative">
      {/* Back Button Bar */}
      <div className="bg-white border-b-2 border-black px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-black text-sm bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
          >
            <ArrowLeft size={16} />
            ALL SERVICES
          </Link>
          {cartItemsTotal > 0 && (
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 font-black text-sm bg-yellow-300 border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
            >
              <ShoppingCart size={16} />
              VIEW CART ({cartItemsTotal})
            </Link>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className={`${service.color} border-b-4 border-black relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-black text-white font-black text-xs px-4 py-2 border-2 border-black">
                  {service.category.toUpperCase()}
                </span>
                {service.verified && (
                  <span className="bg-green-300 text-black font-black text-xs px-4 py-2 border-2 border-black flex items-center gap-1">
                    <CheckCircle size={12} />
                    VERIFIED PROVIDER
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-black mb-6 bg-white border-2 border-black px-6 py-4 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 leading-tight">
                {service.name.toUpperCase()}
              </h1>

              {/* Rating Row */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2 bg-yellow-300 border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Star size={20} className="fill-black text-black" />
                  <span className="font-black text-xl">{service.rating}</span>
                  <span className="font-black text-sm opacity-70">({service.reviews} reviews)</span>
                </div>
                <div className="bg-white border-2 border-black px-4 py-2 font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  🚀 {service.reviews}+ HAPPY STUDENTS
                </div>
              </div>

              <p className="mt-6 font-black text-lg leading-relaxed max-w-lg">
                {service.description}
              </p>

              <Link
                to={`/provider/${id}`}
                className="mt-4 inline-flex items-center gap-2 font-black text-sm bg-white border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
              >
                VIEW PROVIDER PROFILE →
              </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden rotate-1">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-80 object-cover"
                />
              </div>
              {/* Floating sticker */}
              <motion.div
                animate={{ rotate: [0, 8, 0], y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-pink-400 border-2 border-black px-4 py-2 font-black text-sm rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                POPULAR! 🔥
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="bg-purple-300 border-b-2 border-black px-6 py-4">
                  <h2 className="text-2xl font-black">ABOUT THIS SERVICE</h2>
                </div>
                <div className="p-6">
                  <p className="font-bold leading-relaxed text-gray-800 text-lg">
                    {service.fullDescription}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      { icon: Shield, label: 'QUALITY GUARANTEED' },
                      { icon: Zap, label: 'FAST TURNAROUND' },
                      { icon: CheckCircle, label: 'CAMPUS VERIFIED' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 bg-gray-100 border-2 border-black px-4 py-2 font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <Icon size={14} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Pricing */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="bg-cyan-300 border-b-2 border-black px-6 py-4">
                  <h2 className="text-2xl font-black">PRICING & PACKAGES</h2>
                </div>
                <div className="divide-y-2 divide-black">
                  {service.pricing.map((item: any, index: number) => {
                    const pricingColors = ['bg-cyan-100', 'bg-pink-100', 'bg-yellow-100', 'bg-lime-100'];
                    const qty = itemQuantities[index] || 0;
                    return (
                      <div
                        key={index}
                        className={`p-5 flex items-center justify-between transition-all ${
                          qty > 0
                            ? `${pricingColors[index % pricingColors.length]}`
                            : 'bg-white'
                        }`}
                      >
                        <div>
                          <h3 className="font-black text-lg">{item.service}</h3>
                          <p className="font-bold text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Clock size={12} />
                            {item.duration}
                          </p>
                          <p className="font-black text-xl mt-1">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-0 border-2 border-black flex-shrink-0">
                          <button
                            onClick={() => setItemQty(index, -1)}
                            className="px-3 py-2 bg-pink-200 hover:bg-pink-300 transition-colors font-black border-r-2 border-black"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 py-2 font-black text-lg bg-white min-w-[3rem] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => setItemQty(index, +1)}
                            className="px-3 py-2 bg-lime-200 hover:bg-lime-300 transition-colors font-black border-l-2 border-black"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.section>

            {/* Location & Hours */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="bg-orange-300 border-b-2 border-black px-6 py-4">
                  <h2 className="text-2xl font-black">FIND US</h2>
                </div>
                <div className="grid sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <MapPin size={24} className="flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-black text-sm mb-2">LOCATION</h3>
                        <p className="font-bold text-gray-800">{service.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <Clock size={24} className="flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-black text-sm mb-2">HOURS</h3>
                        <p className="font-bold text-gray-800">{service.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="bg-pink-300 border-b-2 border-black px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black">STUDENT REVIEWS 🗣️</h2>
                  <div className="bg-yellow-300 border-2 border-black px-4 py-2 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    ★ {service.rating}/5
                  </div>
                </div>
                <div className="divide-y-2 divide-black">
                  {reviewsData.map((review, index) => (
                    <div key={index} className={`p-6 ${review.color}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center font-black text-sm flex-shrink-0">
                            {review.avatar}
                          </div>
                          <div>
                            <h3 className="font-black text-base">{review.name}</h3>
                            <p className="text-xs font-bold opacity-60">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-5 h-5 border-2 border-black ${
                                i < review.rating ? ratingColors[review.rating - 1] : 'bg-white'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-bold leading-relaxed mb-4">{review.comment}</p>
                      <button className="flex items-center gap-2 text-xs font-black bg-white border-2 border-black px-3 py-1.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <ThumbsUp size={12} />
                        HELPFUL ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {/* Book & Add to Cart Card */}
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className={`${service.color} border-b-2 border-black px-6 py-4`}>
                  <h3 className="text-xl font-black">BOOK NOW</h3>
                </div>

                <div className="p-6 space-y-5">
                  {/* Order Summary */}
                  <div className="bg-gray-100 border-2 border-black p-4">
                    <div className="text-xs font-black mb-2 text-gray-500">YOUR ORDER</div>
                    {totalSelected === 0 ? (
                      <p className="font-bold text-sm text-gray-500 text-center py-2">
                        
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {Object.entries(itemQuantities)
                          .filter(([, qty]) => qty > 0)
                          .map(([indexStr, qty]) => {
                            const option = service.pricing[parseInt(indexStr)];
                            return (
                              <div key={indexStr} className="flex items-center justify-between text-sm">
                                <span className="font-bold">{qty}× {option.service}</span>
                                <span className="font-black">₹{(option.price * qty).toLocaleString()}</span>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between border-2 border-black p-4 bg-yellow-100">
                    <span className="font-black">TOTAL</span>
                    <span className="font-black text-2xl">₹{totalSelectedPrice.toLocaleString()}</span>
                  </div>

                  {/* Add to Cart Button */}
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.div
                        key="added"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full py-4 bg-lime-400 border-2 border-black font-black text-lg text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      >
                        ADDED TO CART! ✅
                      </motion.div>
                    ) : (
                      <motion.button
                        key="add"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={handleAddToCart}
                        disabled={totalSelected === 0}
                        className={`w-full py-4 border-2 border-black font-black text-lg flex items-center justify-center gap-3 transition-all ${
                          totalSelected === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1'
                        }`}
                      >
                        <ShoppingCart size={22} />
                        ADD TO CART{totalSelected > 0 ? ` (${totalSelected})` : ''}
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* View Cart Link */}
                  {cartItemsTotal > 0 && (
                    <Link
                      to="/cart"
                      className="block w-full py-3 bg-yellow-300 border-2 border-black font-black text-sm text-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                    >
                      VIEW CART ({cartItemsTotal} added) →
                    </Link>
                  )}

                  {/* Contact */}
                  <div className="pt-4 border-t-2 border-black space-y-3">
                    <h4 className="font-black text-sm">CONTACT PROVIDER</h4>
                    <a
                      href={`tel:${service.phone}`}
                      className="flex items-center gap-3 font-bold text-sm bg-gray-100 border-2 border-black p-3 hover:bg-gray-200 transition-colors"
                    >
                      <Phone size={16} />
                      {service.phone}
                    </a>
                    <Link
                      to={`/chat/${id}`}
                      className="w-full flex items-center justify-center gap-2 py-3 border-2 border-black font-black text-sm hover:bg-gray-100 transition-colors"
                    >
                      <MessageCircle size={16} />
                      SEND MESSAGE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { emoji: '✅', label: 'VERIFIED' },
                  { emoji: '⚡', label: 'FAST' },
                  { emoji: '💯', label: 'LEGIT' },
                ].map(b => (
                  <div
                    key={b.label}
                    className="bg-white border-2 border-black p-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="text-2xl mb-1">{b.emoji}</div>
                    <div className="font-black text-xs">{b.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}