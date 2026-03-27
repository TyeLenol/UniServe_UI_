import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { 
  Filter, 
  Search, 
  X,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

const categories = ['All', 'Grooming', 'Cleaning', 'Food', 'Appliances', 'Tech'];

const servicesData = [
  {
    id: 1,
    name: "Premium Laundry Service",
    category: "Cleaning",
    priceRange: { min: 99, max: 299 },
    rating: 4.8,
    reviews: 234,
    verified: true,
  },
  {
    id: 2,
    name: "Hair Styling & Grooming",
    category: "Grooming",
    priceRange: { min: 299, max: 799 },
    rating: 4.9,
    reviews: 189,
    verified: true,
  },
  {
    id: 3,
    name: "Tech Repair Hub",
    category: "Tech",
    priceRange: { min: 499, max: 2999 },
    rating: 4.7,
    reviews: 312,
    verified: true,
  },
  {
    id: 4,
    name: "Healthy Meal Plans",
    category: "Food",
    priceRange: { min: 149, max: 499 },
    rating: 4.6,
    reviews: 421,
    verified: true,
  },
  {
    id: 5,
    name: "Room Cleaning Service",
    category: "Cleaning",
    priceRange: { min: 199, max: 599 },
    rating: 4.8,
    reviews: 156,
    verified: true,
  },
  {
    id: 6,
    name: "Coffee & Snacks Delivery",
    category: "Food",
    priceRange: { min: 79, max: 249 },
    rating: 4.5,
    reviews: 567,
    verified: true,
  },
  {
    id: 7,
    name: "Mini Fridge Rental",
    category: "Appliances",
    priceRange: { min: 899, max: 899 },
    rating: 4.7,
    reviews: 89,
    verified: true,
  },
  {
    id: 8,
    name: "Spa & Massage",
    category: "Grooming",
    priceRange: { min: 599, max: 1499 },
    rating: 4.9,
    reviews: 145,
    verified: false,
  },
  {
    id: 9,
    name: "Laptop Screen Replacement",
    category: "Tech",
    priceRange: { min: 2499, max: 5999 },
    rating: 4.8,
    reviews: 234,
    verified: true,
  },
  {
    id: 10,
    name: "Express Ironing",
    category: "Cleaning",
    priceRange: { min: 49, max: 149 },
    rating: 4.4,
    reviews: 178,
    verified: false,
  },
  {
    id: 11,
    name: "Microwave Rental",
    category: "Appliances",
    priceRange: { min: 599, max: 599 },
    rating: 4.6,
    reviews: 92,
    verified: true,
  },
  {
    id: 12,
    name: "Fresh Juice Bar",
    category: "Food",
    priceRange: { min: 59, max: 199 },
    rating: 4.7,
    reviews: 341,
    verified: true,
  }
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Advanced filter state
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Filter and sort logic
  let filteredServices = servicesData.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = service.priceRange.min >= priceRange.min && service.priceRange.max <= priceRange.max;
    const matchesRating = service.rating >= minRating;
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
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 bg-white border-b-2 border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block border-2 border-gray-400 px-4 py-1 mb-4 text-xs font-medium text-gray-600">
              {servicesData.length} SERVICES
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Services Wireframe
            </h1>
            <p className="text-base text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Medium-fidelity prototype showing layout and functionality
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-11 pr-10 py-3 border-2 border-gray-300 focus:border-gray-600 focus:outline-none bg-white text-gray-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
            {/* Left side - Category filters */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="flex items-center gap-2 mb-2 text-gray-700 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                <Filter size={16} />
                <span>Filter by Category</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {category}
                  </button>
                ))}
                <button
                  onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                  className={`px-4 py-2 text-sm font-medium border-2 transition-colors flex items-center gap-2 ${
                    showAdvancedFilter
                      ? 'bg-gray-200 border-gray-400'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <SlidersHorizontal size={14} />
                  Advanced
                </button>
              </div>
            </div>

            {/* Right side - Sort dropdown */}
            <div className="relative">
              <div className="text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Sort By
              </div>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="px-4 py-2 text-sm font-medium border-2 border-gray-300 bg-white hover:border-gray-500 transition-colors flex items-center gap-2 min-w-[160px] justify-between"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>
                  {sortBy === 'featured' && 'Featured'}
                  {sortBy === 'rating-high' && 'Top Rated'}
                  {sortBy === 'rating-low' && 'Lowest Rated'}
                  {sortBy === 'price-low' && 'Price: Low-High'}
                  {sortBy === 'price-high' && 'Price: High-Low'}
                  {sortBy === 'reviews' && 'Most Reviews'}
                </span>
                <ChevronDown size={14} />
              </button>
              
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-1 w-full bg-white border-2 border-gray-300 z-50"
                >
                  {[
                    { value: 'featured', label: 'Featured' },
                    { value: 'rating-high', label: 'Top Rated' },
                    { value: 'rating-low', label: 'Lowest Rated' },
                    { value: 'price-low', label: 'Price: Low-High' },
                    { value: 'price-high', label: 'Price: High-Low' },
                    { value: 'reviews', label: 'Most Reviews' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-sm font-medium text-left hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0 ${
                        sortBy === option.value ? 'bg-gray-50' : ''
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
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
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white border-2 border-gray-300 p-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Advanced Filters
                </h3>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Price Range (₹)
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                        placeholder="Min"
                        className="w-full px-3 py-2 border-2 border-gray-300 text-sm bg-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                        placeholder="Max"
                        className="w-full px-3 py-2 border-2 border-gray-300 text-sm bg-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Minimum Rating
                    </label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`px-3 py-2 border-2 text-sm font-medium transition-colors ${
                            minRating === rating
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white border-gray-300 hover:border-gray-500'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {rating === 0 ? 'All' : `${rating}★`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Verified Only */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Verification
                    </label>
                    <button
                      onClick={() => setVerifiedOnly(!verifiedOnly)}
                      className={`px-4 py-2 border-2 text-sm font-medium transition-colors ${
                        verifiedOnly
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white border-gray-300 hover:border-gray-500'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {verifiedOnly ? 'Verified Only' : 'All Services'}
                    </button>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setPriceRange({ min: 0, max: 10000 });
                      setMinRating(0);
                      setVerifiedOnly(false);
                    }}
                    className="px-4 py-2 border-2 border-gray-300 text-sm font-medium bg-white hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Reset Filters
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
          className="mb-4 text-sm font-medium text-gray-600"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Showing {filteredServices.length} services
        </motion.div>

        {/* Services Grid - Wireframe Cards */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.3, delay: index * 0.03 }
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group"
              >
                <Link to={`/service/${service.id}`}>
                  <div className="bg-white border-2 border-gray-300 hover:border-gray-600 transition-all">
                    {/* Image placeholder with diagonal lines pattern */}
                    <div className="relative h-48 bg-gray-100 border-b-2 border-gray-300 overflow-hidden">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)'
                      }}>
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 border-2 border-gray-400 rounded-full flex items-center justify-center">
                              <div className="w-8 h-8 bg-gray-300"></div>
                            </div>
                            <div className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                              Image
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Verified Badge placeholder */}
                      {service.verified && (
                        <div className="absolute top-2 right-2 bg-white border-2 border-gray-400 px-2 py-1 text-xs font-medium">
                          Verified
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      <div className="text-xs font-medium mb-1 text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {service.category.toUpperCase()}
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {service.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          ★ {service.rating} ({service.reviews})
                        </div>
                        
                        <div className="text-base font-semibold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          ₹{service.priceRange.min}
                          {service.priceRange.min !== service.priceRange.max && (
                            <span> - ₹{service.priceRange.max}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gray-100 border-t-2 border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      View Details →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block bg-white border-2 border-gray-300 p-8">
              <p className="text-xl font-semibold mb-2 text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                No services found
              </p>
              <p className="text-base text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Try adjusting your filters
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}