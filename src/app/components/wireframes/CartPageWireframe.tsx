import { Link } from 'react-router';

export default function CartPageWireframe() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero / Header */}
      <section className="border-b-8 border-gray-400 bg-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link to="/wireframes/services">
            <div className="h-10 w-40 border-4 border-gray-500 bg-white mb-6 inline-flex"></div>
          </Link>
          {/* Title row */}
          <div className="flex items-center gap-6">
            <div className="h-16 w-72 bg-gray-800 border-8 border-gray-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)]"></div>
            <div className="h-16 w-36 bg-gray-400 border-8 border-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]"></div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left: Cart Items Column (2/3) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Column header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 bg-gray-500"></div>
                <div className="h-6 w-36 bg-gray-500"></div>
              </div>
              <div className="h-8 w-24 bg-gray-300 border-2 border-gray-400"></div>
            </div>

            {/* Cart Item Cards */}
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="bg-white border-6 border-gray-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden"
              >
                <div className="flex gap-4 p-5">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 flex-shrink-0 border-4 border-gray-400 bg-gray-300"></div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    {/* Category tag + title */}
                    <div>
                      <div className="h-5 w-20 bg-gray-300 border-2 border-gray-400 mb-2 inline-block"></div>
                      <div className="h-6 w-full bg-gray-400 border-2 border-gray-500"></div>
                    </div>

                    {/* Quantity + price row */}
                    <div className="flex items-center justify-between">
                      {/* Qty control */}
                      <div className="flex items-center border-4 border-gray-500">
                        <div className="w-12 h-10 bg-gray-200 border-r-4 border-gray-400"></div>
                        <div className="w-14 h-10 bg-white border-r-4 border-gray-400 flex items-center justify-center">
                          <div className="h-5 w-6 bg-gray-400"></div>
                        </div>
                        <div className="w-12 h-10 bg-gray-200"></div>
                      </div>

                      {/* Price */}
                      <div className="text-right space-y-1">
                        <div className="h-7 w-24 bg-gray-500"></div>
                        <div className="h-4 w-16 bg-gray-300"></div>
                      </div>
                    </div>
                  </div>

                  {/* Remove button (top right) */}
                  <div className="self-start w-10 h-10 bg-gray-200 border-2 border-gray-400 flex-shrink-0"></div>
                </div>

                {/* Bottom color strip */}
                <div className="h-2 bg-gray-400"></div>
              </div>
            ))}

            {/* Promo Code Box */}
            <div className="bg-white border-6 border-gray-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-6">
              {/* Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-5 w-5 bg-gray-400"></div>
                <div className="h-5 w-44 bg-gray-500"></div>
              </div>
              {/* Input + button */}
              <div className="flex gap-3">
                <div className="flex-1 h-12 border-4 border-gray-400 bg-white"></div>
                <div className="h-12 w-24 bg-gray-400 border-4 border-gray-500"></div>
              </div>
              {/* Suggestions */}
              <div className="flex gap-2 mt-3">
                <div className="h-7 w-28 bg-gray-200 border-2 border-gray-300"></div>
                <div className="h-7 w-24 bg-gray-200 border-2 border-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Column (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Summary Card */}
              <div className="bg-white border-6 border-gray-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)]">
                {/* Header */}
                <div className="bg-gray-700 border-b-6 border-gray-800 px-6 py-4">
                  <div className="h-6 w-40 bg-gray-500"></div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Line items */}
                  <div className="space-y-3 pb-4 border-b-4 border-gray-300">
                    <div className="flex justify-between">
                      <div className="h-5 w-36 bg-gray-300"></div>
                      <div className="h-5 w-20 bg-gray-400"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-5 w-28 bg-gray-300"></div>
                      <div className="h-5 w-16 bg-gray-400"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-5 w-32 bg-gray-200"></div>
                      <div className="h-5 w-18 bg-gray-300"></div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <div className="h-7 w-16 bg-gray-600"></div>
                    <div className="h-14 w-28 bg-gray-400 border-4 border-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"></div>
                  </div>

                  {/* Checkout button */}
                  <div className="w-full h-14 bg-gray-800 border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]"></div>

                  {/* Trust text */}
                  <div className="h-4 w-full bg-gray-200 mx-auto"></div>
                </div>

                {/* Color strip */}
                <div className="flex border-t-4 border-gray-500">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex-1 h-3 bg-gray-400"></div>
                  ))}
                </div>
              </div>

              {/* Trust badges grid */}
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="bg-white border-4 border-gray-400 p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                  >
                    <div className="h-8 w-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <div className="h-4 w-16 bg-gray-400 mx-auto"></div>
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
