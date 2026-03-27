import { Link } from 'react-router';
import { motion } from 'motion/react';

export default function HomePageWireframe() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="border-b-4 border-gray-400 bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-block border-2 border-gray-400 px-6 py-2 bg-gray-200">
              <div className="h-4 w-48 bg-gray-400"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <div className="h-20 w-full max-w-2xl mx-auto bg-gray-300 border-4 border-gray-500"></div>
              <div className="h-20 w-full max-w-2xl mx-auto bg-gray-300 border-4 border-gray-500"></div>
            </div>

            {/* Subheading */}
            <div className="h-6 w-full max-w-xl mx-auto bg-gray-200"></div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center">
              <Link to="/wireframes/services">
                <div className="h-12 w-40 bg-gray-800 border-4 border-gray-900 flex items-center justify-center">
                  <div className="h-4 w-32 bg-gray-600"></div>
                </div>
              </Link>
              <div className="h-12 w-40 bg-white border-4 border-gray-400 flex items-center justify-center">
                <div className="h-4 w-32 bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Decorative shapes wireframe */}
          <div className="mt-12 grid grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="h-32 border-4 border-gray-400 bg-gray-100"></div>
            <div className="h-32 border-4 border-gray-400 bg-gray-100 rounded-full"></div>
            <div className="h-32 border-4 border-gray-400 bg-gray-100"></div>
            <div className="h-32 border-4 border-gray-400 bg-gray-100 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Services Horizontal Scroll */}
      <section className="py-16 border-b-4 border-gray-400 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-10 w-64 bg-gray-800 border-4 border-gray-900 mb-4"></div>
            <div className="h-6 w-96 bg-gray-200"></div>
          </div>

          {/* Service Cards */}
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 border-4 border-gray-400 bg-white">
                {/* Image */}
                <div className="h-48 bg-gray-300 border-b-4 border-gray-400 flex items-center justify-center">
                  <div className="text-gray-500 font-bold">IMAGE</div>
                </div>
                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="h-3 w-20 bg-gray-300"></div>
                  <div className="h-6 w-full bg-gray-400"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-gray-300"></div>
                    <div className="h-4 w-16 bg-gray-400"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 border-b-4 border-gray-400 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-96 bg-gray-800 border-4 border-gray-900 mx-auto mb-4"></div>
            <div className="h-6 w-64 bg-gray-300 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border-4 border-gray-400 bg-white p-6 space-y-4">
                <div className="h-12 w-12 bg-gray-300 border-2 border-gray-400 rounded-full"></div>
                <div className="h-6 w-40 bg-gray-400"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200"></div>
                  <div className="h-3 w-5/6 bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 border-b-4 border-gray-400 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-80 bg-gray-800 border-4 border-gray-900 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-4 border-gray-400 bg-gray-50 p-6 space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="h-5 w-5 bg-gray-300 border border-gray-400"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-300"></div>
                  <div className="h-4 w-full bg-gray-300"></div>
                  <div className="h-4 w-3/4 bg-gray-300"></div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-300">
                  <div className="h-12 w-12 bg-gray-300 rounded-full border-2 border-gray-400"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-400"></div>
                    <div className="h-3 w-20 bg-gray-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-b-4 border-gray-400 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-96 bg-gray-800 border-4 border-gray-900 mx-auto mb-4"></div>
            <div className="h-6 w-64 bg-gray-300 mx-auto"></div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border-4 border-gray-400 bg-white">
                <div className="p-6 flex justify-between items-center border-b-2 border-gray-300">
                  <div className="h-5 w-64 bg-gray-400"></div>
                  <div className="h-8 w-8 bg-gray-800 border-2 border-gray-400"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="border-4 border-gray-400 bg-gray-100 p-12 space-y-6">
            <div className="h-12 w-full max-w-lg mx-auto bg-gray-800 border-4 border-gray-900"></div>
            <div className="h-6 w-full max-w-md mx-auto bg-gray-300"></div>
            <div className="h-6 w-full max-w-md mx-auto bg-gray-300"></div>
            <Link to="/wireframes/auth">
              <div className="h-12 w-48 bg-gray-800 border-4 border-gray-900 mx-auto mt-8"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
