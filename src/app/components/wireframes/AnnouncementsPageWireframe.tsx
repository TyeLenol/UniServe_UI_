export default function AnnouncementsPageWireframe() {
  const categories = ['ALL', 'EVENTS', 'ACADEMIC', 'HOUSING', 'SPORTS', 'URGENT'];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="border-b-8 border-gray-400 bg-gray-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-block border-4 border-gray-500 px-6 py-2 bg-gray-600">
            <div className="h-4 w-64 bg-gray-400"></div>
          </div>
          {/* Title Block */}
          <div className="inline-block border-8 border-gray-500 px-8 py-4 bg-gray-800">
            <div className="h-16 w-80 bg-gray-600 mb-3"></div>
            <div className="h-16 w-64 bg-gray-600 mx-auto"></div>
          </div>
          {/* Subtext */}
          <div className="h-6 w-72 bg-gray-600 mx-auto"></div>
        </div>
      </section>

      {/* Pinned Section */}
      <section className="border-b-8 border-gray-400 bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-6 bg-gray-500"></div>
            <div className="h-6 w-52 bg-gray-600"></div>
          </div>
          {/* Two pinned cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="border-6 border-gray-400 bg-white p-6 space-y-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
                {/* Tags row */}
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-gray-600 border-2 border-gray-700"></div>
                  {i === 2 && <div className="h-6 w-16 bg-gray-400 border-2 border-gray-500"></div>}
                </div>
                {/* Title */}
                <div className="h-7 w-full bg-gray-400 border-2 border-gray-500"></div>
                <div className="h-7 w-4/5 bg-gray-400 border-2 border-gray-500"></div>
                {/* Body lines */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200"></div>
                  <div className="h-4 w-5/6 bg-gray-200"></div>
                </div>
                {/* Footer */}
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 w-28 bg-gray-400"></div>
                  <div className="h-6 w-20 bg-gray-300 border-2 border-gray-400"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-5 bg-gray-500"></div>
            <div className="h-5 w-44 bg-gray-500"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, i) => (
              <div
                key={cat}
                className={`h-10 w-24 border-4 border-gray-400 ${
                  i === 0 ? 'bg-gray-600' : 'bg-white'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Count bar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 w-24 bg-gray-700 border-4 border-gray-800"></div>
          <div className="h-5 w-52 bg-gray-300"></div>
        </div>

        {/* Announcement Feed */}
        <div className="space-y-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`border-6 border-gray-400 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden`}
            >
              {/* Card content */}
              <div className="p-6">
                {/* Tags + date row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex gap-2 flex-wrap">
                    <div className="h-6 w-20 bg-gray-700 border-2 border-gray-800"></div>
                    {i % 3 === 0 && <div className="h-6 w-14 bg-gray-400 border-2 border-gray-500"></div>}
                    {i % 4 === 0 && <div className="h-6 w-16 bg-gray-300 border-2 border-gray-400"></div>}
                  </div>
                  <div className="flex gap-3">
                    <div className="h-5 w-24 bg-gray-300"></div>
                    <div className="h-5 w-20 bg-gray-300"></div>
                  </div>
                </div>

                {/* Title */}
                <div className="h-8 w-full bg-gray-500 border-2 border-gray-600 mb-2"></div>
                {i % 2 === 0 && <div className="h-8 w-4/5 bg-gray-500 border-2 border-gray-600 mb-2"></div>}

                {/* Body */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-200"></div>
                  <div className="h-4 w-11/12 bg-gray-200"></div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="h-5 w-40 bg-gray-400"></div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-24 bg-gray-200 border-2 border-gray-400"></div>
                    <div className="h-10 w-20 bg-gray-700 border-4 border-gray-800"></div>
                  </div>
                </div>
              </div>

              {/* Bottom accent strip */}
              <div className={`h-2 ${
                i % 5 === 0 ? 'bg-gray-500' :
                i % 5 === 1 ? 'bg-gray-400' :
                i % 5 === 2 ? 'bg-gray-600' :
                i % 5 === 3 ? 'bg-gray-300' : 'bg-gray-500'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
