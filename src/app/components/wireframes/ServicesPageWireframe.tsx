import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

const categories = ['All', 'Grooming', 'Cleaning', 'Food', 'Appliances', 'Tech'];

export default function ServicesPageWireframe() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gray-200 border-b-4 border-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block border-2 border-gray-400 px-6 py-2 bg-white mb-6">
            <div className="h-4 w-48 bg-gray-400"></div>
          </div>
          <div className="h-16 w-full max-w-2xl mx-auto bg-gray-800 border-4 border-gray-900 mb-4"></div>
          <div className="h-6 w-64 bg-gray-300 mx-auto"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="h-14 w-full bg-white border-4 border-gray-400 flex items-center px-4">
            <div className="h-6 w-6 bg-gray-300 mr-4"></div>
            <div className="h-4 w-48 bg-gray-200"></div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Left - Categories */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-5 bg-gray-400"></div>
                <div className="h-4 w-32 bg-gray-400"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Advanced Filter */}
                <button
                  onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                  className={`h-10 w-32 border-4 border-gray-400 ${
                    showAdvancedFilter ? 'bg-gray-300' : 'bg-white'
                  }`}
                />
                <div className="w-4" />
                {/* Category buttons */}
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`h-10 w-28 border-4 border-gray-400 ${
                      selectedCategory === category ? 'bg-gray-800' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right - Sort */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-5 bg-gray-400"></div>
                <div className="h-4 w-24 bg-gray-400"></div>
              </div>
              <div className="h-10 w-44 bg-white border-4 border-gray-400 flex items-center justify-between px-4">
                <div className="h-4 w-24 bg-gray-300"></div>
                <div className="h-4 w-4 bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filter Panel */}
        <AnimatePresence>
          {showAdvancedFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-gray-200 border-4 border-gray-400 p-6">
                <div className="h-6 w-64 bg-gray-500 mb-6"></div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <div className="h-4 w-32 bg-gray-400 mb-3"></div>
                    <div className="flex gap-3">
                      <div className="h-10 flex-1 bg-white border-4 border-gray-400"></div>
                      <div className="h-4 w-4 bg-gray-400 self-center"></div>
                      <div className="h-10 flex-1 bg-white border-4 border-gray-400"></div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <div className="h-4 w-32 bg-gray-400 mb-3"></div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-16 bg-white border-4 border-gray-400"></div>
                      ))}
                    </div>
                  </div>

                  {/* Verified */}
                  <div>
                    <div className="h-4 w-32 bg-gray-400 mb-3"></div>
                    <div className="h-10 w-40 bg-white border-4 border-gray-400"></div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <div className="h-10 w-32 bg-white border-4 border-gray-400"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="mb-6">
          <div className="h-5 w-48 bg-gray-400"></div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Link key={i} to={`/wireframes/service/${i}`}>
              <div className="bg-white border-4 border-gray-400 hover:border-gray-600 transition-all">
                {/* Image */}
                <div className="h-56 bg-gray-300 border-b-4 border-gray-400 flex items-center justify-center relative">
                  <div className="text-gray-500 font-bold">IMAGE</div>
                  {/* Verified badge */}
                  {i % 3 !== 0 && (
                    <div className="absolute top-3 right-3 h-8 w-24 bg-gray-100 border-2 border-gray-400"></div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 bg-gray-100 border-b-4 border-gray-400 space-y-3">
                  <div className="h-3 w-24 bg-gray-300"></div>
                  <div className="h-6 w-full bg-gray-400"></div>
                  
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-24 bg-gray-300 border-2 border-gray-400"></div>
                    <div className="h-5 w-28 bg-gray-400"></div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-800 border-t-4 border-gray-400 px-5 py-3">
                  <div className="h-4 w-32 bg-gray-600 mx-auto"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
