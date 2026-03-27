import { useState } from 'react';
import { Link } from 'react-router';

export default function AuthPageWireframe() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-200 border-r-4 border-gray-400 p-12 flex-col justify-between">
        <div>
          <Link to="/wireframes">
            <div className="h-10 w-40 bg-white border-4 border-gray-400 mb-8"></div>
          </Link>
          
          <div className="space-y-6">
            <div className="h-16 w-full max-w-md bg-gray-800 border-4 border-gray-900"></div>
            <div className="h-16 w-full max-w-md bg-gray-800 border-4 border-gray-900"></div>
            <div className="space-y-2 pt-4">
              <div className="h-4 w-full max-w-md bg-gray-400"></div>
              <div className="h-4 w-5/6 max-w-md bg-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-4 w-32 bg-gray-400"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-12 w-full bg-gray-300 border-2 border-gray-400"></div>
                <div className="h-3 w-16 bg-gray-400"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Toggle */}
          <div className="flex gap-2 p-2 bg-gray-200 border-4 border-gray-400">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 h-12 border-2 border-gray-400 ${
                isSignIn ? 'bg-white' : 'bg-gray-100'
              }`}
            >
              <div className="h-5 w-24 bg-gray-400 mx-auto"></div>
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 h-12 border-2 border-gray-400 ${
                !isSignIn ? 'bg-white' : 'bg-gray-100'
              }`}
            >
              <div className="h-5 w-24 bg-gray-400 mx-auto"></div>
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="h-10 w-48 bg-gray-800 border-4 border-gray-900"></div>
            <div className="h-6 w-64 bg-gray-300"></div>

            <div className="space-y-4">
              {!isSignIn && (
                <div>
                  <div className="h-4 w-20 bg-gray-400 mb-2"></div>
                  <div className="h-12 w-full bg-white border-4 border-gray-400 flex items-center px-4">
                    <div className="h-5 w-5 bg-gray-300 mr-3"></div>
                    <div className="h-4 w-32 bg-gray-200"></div>
                  </div>
                </div>
              )}

              <div>
                <div className="h-4 w-20 bg-gray-400 mb-2"></div>
                <div className="h-12 w-full bg-white border-4 border-gray-400 flex items-center px-4">
                  <div className="h-5 w-5 bg-gray-300 mr-3"></div>
                  <div className="h-4 w-40 bg-gray-200"></div>
                </div>
              </div>

              <div>
                <div className="h-4 w-24 bg-gray-400 mb-2"></div>
                <div className="h-12 w-full bg-white border-4 border-gray-400 flex items-center px-4 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-300"></div>
                    <div className="h-4 w-20 bg-gray-200"></div>
                  </div>
                  <div className="h-5 w-5 bg-gray-400"></div>
                </div>
              </div>

              {isSignIn && (
                <div className="flex justify-end">
                  <div className="h-4 w-32 bg-gray-400"></div>
                </div>
              )}
            </div>

            <div className="h-14 w-full bg-gray-800 border-4 border-gray-900"></div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="h-6 w-20 bg-gray-100 border-2 border-gray-300"></div>
              </div>
            </div>

            <div className="h-12 w-full bg-white border-4 border-gray-400 flex items-center justify-center gap-2">
              <div className="h-6 w-6 bg-gray-300 border border-gray-400"></div>
              <div className="h-4 w-40 bg-gray-300"></div>
            </div>

            <div className="text-center">
              <div className="h-4 w-64 bg-gray-300 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
