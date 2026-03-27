import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Star, CheckCircle, MapPin, Clock, Phone, MessageCircle,
  ArrowLeft, Zap, ShieldCheck, TrendingUp, ThumbsUp,
} from 'lucide-react';

// ── Provider data (indexed by service/provider ID) ───────────────────────────
const providerDetails: Record<string, any> = {
  '1': {
    name: 'CleanCo Campus', tagline: 'Your campus laundry, sorted.',
    color: 'bg-cyan-300', avatar: 'CC', category: 'Cleaning',
    verified: true, rating: 4.8, reviewCount: 234, totalOrders: 1200,
    responseTime: '< 30 min', memberSince: 'Jan 2024',
    location: 'Block A, Campus Building 2',
    hours: 'Mon–Sat: 8AM–8PM, Sun: 9AM–6PM',
    phone: '+91 98765 43210',
    bio: 'CleanCo Campus has been serving students since 2024. We\'re a student-run initiative that believes nobody should have to stress about laundry during exam season. Our trained team handles everything — from your favourite hoodies to delicate fabrics — with care and precision. Eco-friendly detergents, state-of-the-art equipment, flexible pickup & delivery.',
    tags: ['Eco-Friendly', 'Same-Day Option', 'Student-Run', 'Doorstep Pickup'],
    services: [
      { id: 1, name: 'Premium Laundry Service', priceFrom: 99, image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800', rating: 4.8 },
    ],
    reviewData: [
      { name: 'Aditya R.', rating: 5, comment: 'Best laundry on campus no cap. Everything came back folded perfectly 😭', date: '1 week ago', avatar: 'AR', color: 'bg-cyan-100', helpful: 18 },
      { name: 'Priya M.', rating: 5, comment: 'My delicates came back in perfect condition. Will always use CleanCo!', date: '2 weeks ago', avatar: 'PM', color: 'bg-pink-100', helpful: 14 },
      { name: 'Rahul K.', rating: 4, comment: 'Great service, slight delay on one order but they communicated well.', date: '3 weeks ago', avatar: 'RK', color: 'bg-yellow-100', helpful: 7 },
    ],
  },
  '2': {
    name: 'StyleHub', tagline: 'Slay on campus, every day.',
    color: 'bg-pink-300', avatar: 'SH', category: 'Grooming',
    verified: true, rating: 4.9, reviewCount: 189, totalOrders: 890,
    responseTime: '< 1 hr', memberSince: 'Mar 2024',
    location: 'Block C, Campus Mall',
    hours: 'Mon–Sat: 10AM–7PM, Sun: Closed',
    phone: '+91 98765 43211',
    bio: 'StyleHub is the go-to grooming destination for campus students. Our stylists are trained in the latest trends and techniques. We\'re obsessed with making you look and feel your absolute best — whether it\'s a quick trim before an interview or a full glow-up for the annual fest.',
    tags: ['Trending Styles', 'Walk-ins Welcome', 'No-Wait Slots', 'Student Discounts'],
    services: [
      { id: 2, name: 'Hair Styling & Grooming', priceFrom: 199, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800', rating: 4.9 },
    ],
    reviewData: [
      { name: 'Isha P.', rating: 5, comment: 'Literally obsessed with my new cut!! The stylist understood my vision immediately.', date: '3 days ago', avatar: 'IP', color: 'bg-pink-100', helpful: 22 },
      { name: 'Arjun S.', rating: 5, comment: 'Best fade I\'ve ever gotten. Professional, fast, and affordable.', date: '1 week ago', avatar: 'AS', color: 'bg-lime-100', helpful: 15 },
      { name: 'Kavya N.', rating: 4, comment: 'Had to wait a bit but totally worth it for the quality.', date: '2 weeks ago', avatar: 'KN', color: 'bg-cyan-100', helpful: 8 },
    ],
  },
  '3': {
    name: 'TechFix Pro', tagline: 'Your devices, back to life.',
    color: 'bg-yellow-300', avatar: 'TF', category: 'Tech',
    verified: true, rating: 4.7, reviewCount: 312, totalOrders: 1560,
    responseTime: '< 2 hrs', memberSince: 'Nov 2023',
    location: 'Block D, Tech Center',
    hours: 'Mon–Fri: 9AM–6PM, Sat: 10AM–4PM',
    phone: '+91 98765 43212',
    bio: 'TechFix Pro provides certified repair services for all devices — laptops, phones, tablets, and more. We use genuine parts and back every repair with a warranty. Our technicians are trained and campus-vetted, so you know your gear is in safe hands.',
    tags: ['Genuine Parts', 'Warranty Included', 'Certified Technicians', 'Fast Turnaround'],
    services: [
      { id: 3, name: 'Tech Repair Hub', priceFrom: 499, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', rating: 4.7 },
    ],
    reviewData: [
      { name: 'Karan M.', rating: 5, comment: 'Fixed my laptop screen in 2 days. Works like new, and the warranty is a huge plus!', date: '4 days ago', avatar: 'KM', color: 'bg-yellow-100', helpful: 31 },
      { name: 'Sneha R.', rating: 4, comment: 'Battery replacement was quick and affordable. Transparent pricing, no hidden charges.', date: '2 weeks ago', avatar: 'SR', color: 'bg-lime-100', helpful: 12 },
      { name: 'Dev P.', rating: 5, comment: 'Recovered all my data after a crash. Absolutely saved my semester.', date: '3 weeks ago', avatar: 'DP', color: 'bg-cyan-100', helpful: 45 },
    ],
  },
  '4': {
    name: 'CampusEats', tagline: 'Hot food, zero steps.',
    color: 'bg-orange-300', avatar: 'CE', category: 'Food',
    verified: true, rating: 4.6, reviewCount: 421, totalOrders: 3400,
    responseTime: '< 15 min', memberSince: 'Sep 2023',
    location: 'Food Court, Block B',
    hours: 'Mon–Sun: 7AM–11PM',
    phone: '+91 98765 43213',
    bio: 'CampusEats is your campus food delivery hero. From morning coffee and snacks to full meal plans, we deliver to your dorm or study spot. Student-friendly pricing, quick delivery, and a menu that actually slaps.',
    tags: ['24/7 Delivery', 'Student Pricing', 'Healthy Options', 'Late Night'],
    services: [
      { id: 4, name: 'Healthy Meal Plans', priceFrom: 149, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', rating: 4.6 },
      { id: 6, name: 'Coffee & Snacks Delivery', priceFrom: 79, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800', rating: 4.5 },
      { id: 12, name: 'Fresh Juice Bar', priceFrom: 59, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800', rating: 4.7 },
    ],
    reviewData: [
      { name: 'Meera S.', rating: 5, comment: 'The meal plan is so convenient. Fresh, tasty, and delivered right to my hostel door!', date: '5 days ago', avatar: 'MS', color: 'bg-orange-100', helpful: 27 },
      { name: 'Rohan V.', rating: 4, comment: 'Coffee order came super fast. The late-night delivery is a lifesaver during exams.', date: '1 week ago', avatar: 'RV', color: 'bg-yellow-100', helpful: 19 },
      { name: 'Nisha T.', rating: 5, comment: 'Fresh juices every morning 🤌 The mango smoothie is elite fr.', date: '2 weeks ago', avatar: 'NT', color: 'bg-lime-100', helpful: 33 },
    ],
  },
};

const defaultProvider = providerDetails['1'];
const ratingColors    = ['bg-red-300', 'bg-orange-300', 'bg-yellow-300', 'bg-lime-300', 'bg-green-300'];

export default function ProviderProfilePage() {
  const { id } = useParams();
  const provider = providerDetails[id || '1'] || defaultProvider;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">

      {/* Back bar */}
      <div className="bg-white border-b-2 border-black px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-5xl mx-auto">
          <Link
            to={`/service/${id}`}
            className="inline-flex items-center gap-2 font-black text-sm bg-white border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft size={15} />
            BACK TO SERVICE
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className={`${provider.color} border-b-4 border-black relative overflow-hidden`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-28 h-28 bg-black text-white border-2 border-black flex items-center justify-center font-black text-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] flex-shrink-0"
            >
              {provider.avatar}
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-black text-white font-black text-xs px-3 py-1.5 border-2 border-black">
                  {provider.category.toUpperCase()}
                </span>
                {provider.verified && (
                  <span className="bg-green-300 font-black text-xs px-3 py-1.5 border-2 border-black flex items-center gap-1">
                    <CheckCircle size={11} /> VERIFIED PROVIDER
                  </span>
                )}
              </div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl sm:text-5xl font-black mb-2 leading-tight"
              >
                {provider.name.toUpperCase()}
              </motion.h1>
              <p className="font-black text-lg opacity-75 mb-5">{provider.tagline}</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-yellow-300 border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <Star size={16} className="fill-black text-black" />
                  <span className="font-black">{provider.rating} ({provider.reviewCount} reviews)</span>
                </div>
                <div className="bg-white border-2 border-black px-4 py-2 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  🛒 {provider.totalOrders.toLocaleString()}+ orders
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating sticker */}
        <motion.div
          animate={{ rotate: [0, 8, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 right-8 bg-white border-2 border-black px-4 py-2 font-black text-sm rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hidden sm:block"
        >
          TOP RATED ⭐
        </motion.div>
      </section>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left col */}
          <div className="lg:col-span-2 space-y-8">

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { label: 'TOTAL ORDERS',   value: `${provider.totalOrders}+`, emoji: '📦', color: 'bg-cyan-200'   },
                { label: 'RESPONSE TIME',  value: provider.responseTime,      emoji: '⚡', color: 'bg-yellow-200' },
                { label: 'MEMBER SINCE',   value: provider.memberSince,       emoji: '🎖️', color: 'bg-pink-200'   },
              ].map(s => (
                <div key={s.label} className={`${s.color} border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center`}>
                  <div className="text-2xl mb-1">{s.emoji}</div>
                  <div className="font-black text-lg leading-tight">{s.value}</div>
                  <div className="text-[10px] font-black text-gray-600 mt-1 tracking-wider">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="bg-purple-300 border-b-2 border-black px-6 py-4">
                <h2 className="text-xl font-black">ABOUT THE PROVIDER</h2>
              </div>
              <div className="p-6">
                <p className="font-bold leading-relaxed text-gray-800 text-base mb-5">{provider.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {provider.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gray-100 border-2 border-black font-black text-xs px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="bg-lime-300 border-b-2 border-black px-6 py-4">
                <h2 className="text-xl font-black">SERVICES OFFERED</h2>
              </div>
              <div className="divide-y-2 divide-black">
                {provider.services.map((svc: any) => (
                  <Link
                    key={svc.id}
                    to={`/service/${svc.id}`}
                    className="flex items-center gap-4 p-5 hover:bg-lime-50 transition-colors group"
                  >
                    <div className="w-16 h-16 border-2 border-black overflow-hidden flex-shrink-0">
                      <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-base truncate">{svc.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{svc.rating}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-lg">From ₹{svc.priceFrom}</div>
                      <div className="text-xs font-black text-gray-400 group-hover:text-black transition-colors mt-1">
                        BOOK NOW →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="bg-pink-300 border-b-2 border-black px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-black">STUDENT REVIEWS 🗣️</h2>
                <div className="bg-yellow-300 border-2 border-black px-3 py-1.5 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  ★ {provider.rating}/5
                </div>
              </div>
              <div className="divide-y-2 divide-black">
                {provider.reviewData.map((review: any, i: number) => (
                  <div key={i} className={`p-6 ${review.color}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center font-black text-xs flex-shrink-0">
                          {review.avatar}
                        </div>
                        <div>
                          <h3 className="font-black text-sm">{review.name}</h3>
                          <p className="text-xs font-bold text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <div key={s} className={`w-4 h-4 border-2 border-black ${s < review.rating ? ratingColors[review.rating - 1] : 'bg-white'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="font-bold text-sm leading-relaxed mb-3">{review.comment}</p>
                    <button className="flex items-center gap-2 text-xs font-black bg-white border-2 border-black px-3 py-1.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <ThumbsUp size={11} />
                      HELPFUL ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                <div className={`${provider.color} border-b-2 border-black px-5 py-4`}>
                  <h3 className="font-black text-lg">CONTACT</h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3 font-bold text-sm">
                    <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-start gap-3 font-bold text-sm">
                    <Clock size={15} className="mt-0.5 flex-shrink-0" />
                    <span>{provider.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 font-bold text-sm">
                    <Phone size={15} className="flex-shrink-0" />
                    <a href={`tel:${provider.phone}`} className="hover:underline">{provider.phone}</a>
                  </div>
                  <Link
                    to={`/chat/${id}`}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-3 bg-black text-white border-2 border-black font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all"
                  >
                    <MessageCircle size={15} />
                    SEND MESSAGE
                  </Link>
                </div>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5"
              >
                <h3 className="font-black text-sm mb-4">WHY TRUST THEM?</h3>
                <div className="space-y-3">
                  {[
                    { Icon: ShieldCheck, label: 'Background Verified',                     cls: 'text-green-600'  },
                    { Icon: Star,        label: `${provider.rating} Avg Rating`,           cls: 'text-yellow-600' },
                    { Icon: TrendingUp,  label: `${provider.totalOrders}+ Completed`,      cls: 'text-blue-600'   },
                    { Icon: Zap,         label: `Responds in ${provider.responseTime}`,    cls: 'text-purple-600' },
                  ].map(({ Icon, label, cls }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon size={16} className={cls} />
                      <span className="font-bold text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Book CTA */}
              <Link
                to={`/service/${id}`}
                className="block w-full py-4 bg-black text-white border-2 border-black font-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all"
              >
                BOOK A SERVICE →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
