import { Link } from 'react-router';
import { useState } from 'react';

export default function ServiceDetailPageWireframe() {
  const [selectedPricing, setSelectedPricing] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Back button bar */}
      <div className="bg-white border-b-4 border-gray-400 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/wireframes/services">
            <div className="h-10 w-40 bg-white border-4 border-gray-400 inline-flex items-center gap-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
              <div className="h-4 w-4 bg-gray-400"></div>
              <div className="h-4 w-24 bg-gray-400"></div>
            </div>
          </Link>
          <div className="h-10 w-36 bg-gray-300 border-4 border-gray-400 hidden sm:flex items-center gap-2 px-4">
            <div className="h-4 w-4 bg-gray-500"></div>
            <div className="h-4 w-20 bg-gray-500"></div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="border-b-8 border-gray-400 bg-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <div className="space-y-5">
              {/* Tags */}
              <div className="flex gap-3">
                <div className="h-7 w-24 bg-gray-700 border-2 border-gray-800"></div>
                <div className="h-7 w-32 bg-gray-400 border-2 border-gray-500"></div>
              </div>
              {/* Title block */}
              <div className="inline-block border-6 border-gray-500 bg-white px-6 py-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)]">
                <div className="h-10 w-72 bg-gray-500 mb-3"></div>
                <div className="h-10 w-56 bg-gray-500"></div>
              </div>
              {/* Rating + reviews */}
              <div className="flex gap-4">
                <div className="h-10 w-36 bg-gray-400 border-4 border-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"></div>
                <div className="h-10 w-48 bg-white border-4 border-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"></div>
              </div>
              {/* Description lines */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300"></div>
                <div className="h-4 w-11/12 bg-gray-300"></div>
                <div className="h-4 w-4/5 bg-gray-300"></div>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative">
              <div className="border-8 border-gray-500 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.25)] h-72 bg-gray-400 flex items-center justify-center font-black text-gray-600 text-xl">
                SERVICE IMAGE
              </div>
              {/* Sticker placeholder */}
              <div className="absolute -top-3 -right-3 w-24 h-10 bg-gray-500 border-4 border-gray-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left: Content column */}
          <div className="lg:col-span-2 space-y-8">

            {/* About section */}
            <div className="border-6 border-gray-400 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="border-b-6 border-gray-400 bg-gray-300 px-6 py-4">
                <div className="h-7 w-48 bg-gray-500"></div>
              </div>
              <div className="p-6 space-y-3">
                <div className="h-4 w-full bg-gray-200"></div>
                <div className="h-4 w-full bg-gray-200"></div>
                <div className="h-4 w-5/6 bg-gray-200"></div>
                <div className="h-4 w-full bg-gray-200"></div>
                <div className="h-4 w-4/5 bg-gray-200"></div>
                {/* Feature tags */}
                <div className="flex gap-3 mt-4 pt-4 border-t-2 border-gray-200">
                  <div className="h-8 w-36 bg-gray-200 border-4 border-gray-300"></div>
                  <div className="h-8 w-32 bg-gray-200 border-4 border-gray-300"></div>
                  <div className="h-8 w-40 bg-gray-200 border-4 border-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Pricing section */}
            <div className="border-6 border-gray-400 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="border-b-6 border-gray-400 bg-gray-300 px-6 py-4">
                <div className="h-7 w-52 bg-gray-500"></div>
              </div>
              <div className="divide-y-4 divide-gray-300">
                {[0,1,2,3].map(i => (
                  <button
                    key={i}
                    onClick={() => setSelectedPricing(i)}
                    className={`w-full px-6 py-5 flex items-center justify-between text-left transition-colors ${
                      selectedPricing === i ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Radio */}
                      <div className={`w-6 h-6 border-4 border-gray-500 flex-shrink-0 ${selectedPricing === i ? 'bg-gray-600' : 'bg-white'}`}></div>
                      <div className="space-y-2">
                        <div className="h-5 w-40 bg-gray-400"></div>
                        <div className="h-4 w-24 bg-gray-300"></div>
                      </div>
                    </div>
                    <div className={`h-10 w-20 ${selectedPricing === i ? 'bg-gray-700' : 'bg-gray-300'} border-2 border-gray-400`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location & Hours */}
            <div className="border-6 border-gray-400 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="border-b-6 border-gray-400 bg-gray-300 px-6 py-4">
                <div className="h-7 w-24 bg-gray-500"></div>
              </div>
              <div className="grid sm:grid-cols-2 divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-gray-300">
                {[0,1].map(i => (
                  <div key={i} className="p-6 flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-400 flex-shrink-0 mt-1"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-20 bg-gray-500"></div>
                      <div className="h-4 w-full bg-gray-300"></div>
                      <div className="h-4 w-4/5 bg-gray-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="border-6 border-gray-400 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="border-b-6 border-gray-400 bg-gray-300 px-6 py-4 flex justify-between items-center">
                <div className="h-7 w-44 bg-gray-500"></div>
                <div className="h-10 w-20 bg-gray-500 border-4 border-gray-600"></div>
              </div>
              <div className="divide-y-4 divide-gray-300">
                {[0,1,2,3].map(i => (
                  <div key={i} className="p-6 bg-gray-50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-600 border-4 border-gray-700 flex-shrink-0"></div>
                        <div className="space-y-1">
                          <div className="h-4 w-28 bg-gray-500"></div>
                          <div className="h-3 w-20 bg-gray-300"></div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[0,1,2,3,4].map(s => (
                          <div key={s} className="w-5 h-5 border-2 border-gray-400 bg-gray-300"></div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200"></div>
                      <div className="h-4 w-11/12 bg-gray-200"></div>
                    </div>
                    <div className="h-8 w-28 bg-gray-300 border-2 border-gray-400"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <div className="border-6 border-gray-400 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,0.25)]">
                {/* Header */}
                <div className="border-b-6 border-gray-400 bg-gray-300 px-6 py-4">
                  <div className="h-6 w-28 bg-gray-600 mb-1"></div>
                  <div className="h-4 w-40 bg-gray-400 mt-2"></div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Selected package display */}
                  <div className="bg-gray-100 border-4 border-gray-400 p-4 space-y-2">
                    <div className="h-3 w-28 bg-gray-400"></div>
                    <div className="h-6 w-full bg-gray-500"></div>
                    <div className="flex justify-between">
                      <div className="h-4 w-20 bg-gray-300"></div>
                      <div className="h-7 w-16 bg-gray-600"></div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-500"></div>
                    <div className="flex border-4 border-gray-500 w-fit">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-12 h-12 bg-gray-200 border-r-4 border-gray-400 hover:bg-gray-300 transition-colors"
                      ></button>
                      <div className="w-14 h-12 bg-white border-r-4 border-gray-400 flex items-center justify-center">
                        <div className="h-6 w-8 bg-gray-400"></div>
                      </div>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="w-12 h-12 bg-gray-200 hover:bg-gray-300 transition-colors"
                      ></button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center border-4 border-gray-400 p-4 bg-gray-100">
                    <div className="h-5 w-16 bg-gray-500"></div>
                    <div className="h-8 w-24 bg-gray-600"></div>
                  </div>

                  {/* Add to Cart button */}
                  <div className="w-full h-14 bg-gray-800 border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3">
                    <div className="h-5 w-5 bg-gray-500"></div>
                    <div className="h-5 w-28 bg-gray-500"></div>
                  </div>

                  {/* Contact */}
                  <div className="pt-4 border-t-4 border-gray-300 space-y-3">
                    <div className="h-4 w-32 bg-gray-500"></div>
                    <div className="h-12 w-full bg-gray-100 border-4 border-gray-300"></div>
                    <div className="h-12 w-full border-4 border-gray-300"></div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[0,1,2].map(i => (
                  <div key={i} className="bg-white border-4 border-gray-400 p-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    <div className="h-8 w-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <div className="h-3 w-12 bg-gray-400 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
