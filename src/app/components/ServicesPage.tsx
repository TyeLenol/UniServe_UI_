import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { 
  Star, 
  CheckCircle, 
  Filter, 
  Search, 
  X,
  SlidersHorizontal,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Sparkles,
  MapPin,
  Navigation2
} from 'lucide-react';
import { useUserLocation } from '../context/LocationContext';
import LocationPicker, { shortAddress } from './LocationPicker';

const categories = ['All', 'Grooming', 'Cleaning', 'Food', 'Appliances', 'Tech'];

const servicesData = [
  {
    id: 1,
    name: "Premium Laundry Service",
    category: "Cleaning",
    priceRange: { min: 99, max: 299 },
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800",
    verified: true,
    description: "Professional laundry service with same-day delivery. We handle everything from regular clothes to delicate fabrics with care."
  },
  {
    id: 2,
    name: "Hair Styling & Grooming",
    category: "Grooming",
    priceRange: { min: 299, max: 799 },
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    verified: true,
    description: "Expert hair styling, cutting, and grooming services. Modern styles for every occasion, right on campus."
  },
  {
    id: 3,
    name: "Tech Repair Hub",
    category: "Tech",
    priceRange: { min: 499, max: 2999 },
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    verified: true,
    description: "Fast and reliable repairs for laptops, phones, and tablets. Certified technicians with quality parts."
  },
  {
    id: 4,
    name: "Healthy Meal Plans",
    category: "Food",
    priceRange: { min: 149, max: 499 },
    rating: 4.6,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    verified: true,
    description: "Nutritious and delicious meal delivery service. Customizable plans to fit your dietary needs."
  },
  {
    id: 5,
    name: "Room Cleaning Service",
    category: "Cleaning",
    priceRange: { min: 199, max: 599 },
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
    verified: true,
    description: "Deep cleaning services for dorm rooms and apartments. Professional and thorough cleaning guaranteed."
  },
  {
    id: 6,
    name: "Coffee & Snacks Delivery",
    category: "Food",
    priceRange: { min: 79, max: 249 },
    rating: 4.5,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    verified: true,
    description: "Late-night study fuel delivered to your door. Coffee, snacks, and energy drinks available 24/7."
  },
  {
    id: 7,
    name: "Mini Fridge Rental",
    category: "Appliances",
    priceRange: { min: 899, max: 899 },
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800",
    verified: true,
    description: "Rent quality appliances for your room. Mini fridges, microwaves, and more with flexible terms."
  },
  {
    id: 8,
    name: "Spa & Massage",
    category: "Grooming",
    priceRange: { min: 599, max: 1499 },
    rating: 4.9,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    verified: false,
    description: "Relaxing spa treatments and therapeutic massages. Perfect for stress relief during exam season."
  },
  {
    id: 9,
    name: "Laptop Screen Replacement",
    category: "Tech",
    priceRange: { min: 2499, max: 5999 },
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",
    verified: true,
    description: "Expert screen replacement services for all laptop brands. Quick turnaround with warranty."
  },
  {
    id: 10,
    name: "Express Ironing",
    category: "Cleaning",
    priceRange: { min: 49, max: 149 },
    rating: 4.4,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=800",
    verified: false,
    description: "Quick ironing service for shirts, pants, and formal wear. Ready in hours!"
  },
  {
    id: 11,
    name: "Microwave Rental",
    category: "Appliances",
    priceRange: { min: 599, max: 599 },
    rating: 4.6,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800",
    verified: true,
    description: "Rent microwaves for your room at student-friendly prices with flexible monthly terms."
  },
  {
    id: 12,
    name: "Fresh Juice Bar",
    category: "Food",
    priceRange: { min: 59, max: 199 },
    rating: 4.7,
    reviews: 341,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800",
    verified: true,
    description: "Freshly squeezed juices and smoothies delivered to your door. Healthy and delicious!"
  }
];

// Card background colors and rotations for variety
const cardStyles = [
  { bg: 'bg-cyan-200', rotation: 'rotate-1', borderColor: 'border-cyan-500' },
  { bg: 'bg-pink-200', rotation: '-rotate-1', borderColor: 'border-pink-500' },
  { bg: 'bg-yellow-200', rotation: 'rotate-2', borderColor: 'border-yellow-500' },
  { bg: 'bg-lime-200', rotation: '-rotate-2', borderColor: 'border-lime-500' },
  { bg: 'bg-purple-200', rotation: 'rotate-1', borderColor: 'border-purple-500' },
  { bg: 'bg-orange-200', rotation: '-rotate-1', borderColor: 'border-orange-500' },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Advanced filter state
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Location
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const { location } = useUserLocation();

  // Filter and sort logic
  let filteredServices = servicesData.filter(service => {
    // Category filter
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    
    // Search filter
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price range filter
    const matchesPrice = service.priceRange.min >= priceRange.min && service.priceRange.max <= priceRange.max;
    
    // Rating filter
    const matchesRating = service.rating >= minRating;
    
    // Verified filter
    const matchesVerified = !verifiedOnly || service.verified;
    
    return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesVerified;
  });

  // Sort logic
  if (sortBy === 'rating-high') {
    filteredServices = [...filteredServices].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'rating-low') {
    filteredServices = [...filteredServices].sort((a, b) => a.rating - b.rating);
  } else if (sortBy === 'price-low') {
    filteredServices = [...filteredServices].sort((a, b) => a.priceRange.min - b.priceRange.min);
  } else if (sortBy === 'price-high') {
    filteredServices = [...filteredServices].sort((a, b) => b.priceRange.min - a.priceRange.min);
  } else if (sortBy === 'reviews') {
    filteredServices = [...filteredServices].sort((a, b) => b.reviews - a.reviews);
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-400 rounded-full border-2 border-black opacity-30" />
        <div className="absolute top-60 right-20 w-32 h-32 bg-lime-400 rotate-45 border-2 border-black opacity-30" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-orange-400 border-2 border-black opacity-30" />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-cyan-400 rounded-full border-2 border-black opacity-30" />
        
        {/* Floating stickers */}
        <motion.div 
          animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-32 right-1/4 bg-pink-400 border-2 border-black px-4 py-2 font-black text-sm rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          DEALS! 🔥
        </motion.div>
        <motion.div 
          animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute bottom-60 left-20 bg-yellow-300 border-2 border-black px-4 py-2 font-black text-sm -rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          FAST! ⚡
        </motion.div>
      </div>

      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 border-b-4 border-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            
            <h1 className="inline-block text-5xl sm:text-6xl lg:text-7xl font-black mb-4 bg-white border-2 border-black px-8 py-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              ALL SERVICES
            </h1>
            <p className="text-xl font-bold mt-8">Browse, filter, find what you need.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Location Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 border-2 border-black ${location ? 'bg-lime-300' : 'bg-yellow-300'}`}>
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-black text-[10px] text-gray-500 tracking-widest mb-0.5">SERVICES NEAR</p>
                {location ? (
                  <p className="font-black text-sm">{shortAddress(location.address)}</p>
                ) : (
                  <p className="font-bold text-sm text-gray-400 italic">Set your location to find services near you</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className={`shrink-0 flex items-center gap-2 font-black text-sm px-4 py-2 border-2 border-black transition-all ${
                showLocationPicker
                  ? 'bg-black text-white'
                  : 'bg-yellow-300 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
              }`}
            >
              <Navigation2 size={14} />
              {location ? 'CHANGE LOCATION' : 'SET LOCATION'}
            </button>
          </div>

          {/* Inline Location Picker */}
          <AnimatePresence>
            {showLocationPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="border-2 border-t-0 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <LocationPicker onClose={() => setShowLocationPicker(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services..."
                className="w-full pl-14 pr-12 py-4 text-lg font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Left side - Category filters and advanced filter button */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="flex items-center gap-2 mb-3">
                <Filter size={20} className="font-black" />
                <span className="font-black text-sm">CATEGORIES:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Advanced Filter Button - Left-most position */}
                <button
                  onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                  className={`px-4 py-2 font-black text-sm border-2 border-black transition-all flex items-center gap-2 ${
                    showAdvancedFilter
                      ? 'bg-orange-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
                      : 'bg-lime-300 text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                  }`}
                >
                  <SlidersHorizontal size={16} />
                  ADVANCED
                </button>
                
                {/* Spacer */}
                <div className="w-4" />
                
                {/* Category Buttons */}
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 font-black text-sm border-2 border-black transition-all ${
                      selectedCategory === category
                        ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
                        : 'bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                    }`}
                  >
                    {category.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Sort dropdown */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={20} className="font-black" />
                <span className="font-black text-sm">SORT BY:</span>
              </div>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="px-6 py-2 font-black text-sm border-2 border-black bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex items-center gap-2 min-w-[180px] justify-between"
              >
                <span>
                  {sortBy === 'featured' && 'FEATURED'}
                  {sortBy === 'rating-high' && 'TOP RATED ★'}
                  {sortBy === 'rating-low' && 'LOWEST RATED'}
                  {sortBy === 'price-low' && 'PRICE: LOW'}
                  {sortBy === 'price-high' && 'PRICE: HIGH'}
                  {sortBy === 'reviews' && 'MOST REVIEWS'}
                </span>
                <ChevronDown size={16} />
              </button>
              
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50"
                >
                  {[
                    { value: 'featured', label: 'FEATURED', icon: Sparkles },
                    { value: 'rating-high', label: 'TOP RATED ★', icon: TrendingUp },
                    { value: 'rating-low', label: 'LOWEST RATED', icon: TrendingDown },
                    { value: 'price-low', label: 'PRICE: LOW → HIGH', icon: DollarSign },
                    { value: 'price-high', label: 'PRICE: HIGH → LOW', icon: DollarSign },
                    { value: 'reviews', label: 'MOST REVIEWS', icon: Star },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full px-4 py-3 font-black text-sm text-left hover:bg-yellow-200 transition-colors border-b-2 border-black last:border-b-0 flex items-center gap-2 ${
                        sortBy === option.value ? 'bg-yellow-300' : ''
                      }`}
                    >
                      <option.icon size={16} />
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Advanced Filter Panel */}
        <AnimatePresence>
          {showAdvancedFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-200 to-pink-200 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                  <SlidersHorizontal size={24} />
                  ADVANCED FILTERS
                </h3>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="font-black text-sm mb-3 block">PRICE RANGE (₹)</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                        placeholder="Min"
                        className="w-full px-3 py-2 border-2 border-black font-black text-sm bg-white"
                      />
                      <span className="font-black">-</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                        placeholder="Max"
                        className="w-full px-3 py-2 border-2 border-black font-black text-sm bg-white"
                      />
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="font-black text-sm mb-3 block">MINIMUM RATING</label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`px-4 py-2 border-2 border-black font-black text-sm transition-all ${
                            minRating === rating
                              ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
                              : 'bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                          }`}
                        >
                          {rating === 0 ? 'ALL' : `${rating}★+`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Verified Only */}
                  <div>
                    <label className="font-black text-sm mb-3 block">VERIFICATION STATUS</label>
                    <button
                      onClick={() => setVerifiedOnly(!verifiedOnly)}
                      className={`px-6 py-2 border-2 border-black font-black text-sm transition-all flex items-center gap-2 ${
                        verifiedOnly
                          ? 'bg-green-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
                          : 'bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                      }`}
                    >
                      <CheckCircle size={16} />
                      {verifiedOnly ? 'VERIFIED ONLY' : 'ALL SERVICES'}
                    </button>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setPriceRange({ min: 0, max: 10000 });
                      setMinRating(0);
                      setVerifiedOnly(false);
                    }}
                    className="px-6 py-2 border-2 border-black font-black text-sm bg-white hover:bg-red-200 transition-all"
                  >
                    RESET FILTERS
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 font-black text-lg"
        >
          Showing <span className="bg-yellow-300 px-2 py-1 border-2 border-black">{filteredServices.length}</span> services
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const styleIndex = index % cardStyles.length;
              const style = cardStyles[styleIndex];
              
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.4, delay: index * 0.05 }
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative"
                >
                  <Link to={`/service/${service.id}`}>
                    <div className={`relative overflow-hidden bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 ${style.rotation} hover:rotate-0`}>
                      {/* Image Section */}
                      <div className="relative h-56 overflow-hidden border-b-2 border-black">
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 ${style.bg} opacity-20 mix-blend-multiply`} />
                        
                        {/* Verified Badge */}
                        {service.verified && (
                          <div className="absolute top-3 right-3 bg-green-300 border-2 border-black px-3 py-1 flex items-center gap-1 text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
                            <CheckCircle size={14} />
                            VERIFIED
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className={`p-5 ${style.bg} border-b-2 border-black`}>
                        <div className="text-xs font-black mb-2 opacity-75">{service.category.toUpperCase()}</div>
                        <h3 className="text-xl font-black mb-3 leading-tight">{service.name}</h3>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1 bg-yellow-300 border-2 border-black px-2 py-1">
                            <Star size={14} className="fill-black text-black" />
                            <span className="font-black text-sm">{service.rating}</span>
                            <span className="font-black text-xs opacity-75">({service.reviews})</span>
                          </div>
                          
                          <div className="font-black text-lg">
                            ₹{service.priceRange.min}
                            {service.priceRange.min !== service.priceRange.max && (
                              <span> - ₹{service.priceRange.max}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hover overlay with description */}
                      <motion.div
                        className="absolute inset-0 bg-black/95 p-6 flex flex-col justify-center text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === service.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ pointerEvents: hoveredId === service.id ? 'auto' : 'none' }}
                      >
                        <div className="text-xs font-black mb-2 text-cyan-300">{service.category.toUpperCase()}</div>
                        <h3 className="text-2xl font-black mb-4">{service.name}</h3>
                        <p className="font-bold mb-4 leading-relaxed text-sm">{service.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 bg-yellow-300 text-black border-2 border-white px-3 py-1">
                            <Star size={14} className="fill-black text-black" />
                            <span className="font-black text-sm">{service.rating}</span>
                            <span className="font-black text-xs">({service.reviews})</span>
                          </div>
                          
                          <div className="font-black text-xl text-cyan-300">
                            ₹{service.priceRange.min}
                            {service.priceRange.min !== service.priceRange.max && (
                              <span> - ₹{service.priceRange.max}</span>
                            )}
                          </div>
                        </div>

                        <div className="text-sm font-black text-yellow-300">
                          CLICK TO VIEW DETAILS →
                        </div>
                      </motion.div>

                      {/* Bottom CTA strip */}
                      <div className="bg-black text-white px-5 py-3 text-center font-black text-sm border-t-2 border-black">
                        VIEW DETAILS →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block bg-white border-2 border-black p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2">
              <p className="text-3xl font-black mb-4">NO SERVICES FOUND 😢</p>
              <p className="text-lg font-bold">Try adjusting your filters!</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}