import { Link, useLocation } from 'react-router';
import { Menu, X, ShoppingCart, UserCircle, Bell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home',          to: '/' },
    { label: 'Services',      to: '/services' },
    { label: 'Announcements', to: '/announcements' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            
          >
            <img
              src="/transparent-logo.svg"
              alt="UniServe"
              className="h-28 w-auto"
            />
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`font-black text-sm transition-all px-3 py-1.5 border-2 ${
                    isActive(link.to)
                      ? 'bg-black text-white border-black'
                      : 'border-transparent hover:border-black hover:bg-gray-100'
                  }`}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}

              {/* Cart Button */}
              <Link
                to="/cart"
                className={`relative font-black text-sm px-4 py-2 border-4 border-black transition-all flex items-center gap-2 ${
                  isActive('/cart')
                    ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                    : 'bg-white hover:bg-yellow-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                }`}
              >
                <ShoppingCart size={16} />
                CART
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-pink-400 text-black font-black text-xs w-5 h-5 border-2 border-black flex items-center justify-center rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Notifications Bell */}
              <Link
                to="/notifications"
                className={`relative font-black text-sm px-3 py-2 border-2 transition-all flex items-center gap-1.5 ${
                  isActive('/notifications')
                    ? 'bg-yellow-300 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'border-transparent hover:border-black hover:bg-yellow-50'
                }`}
              >
                <Bell size={16} />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-pink-400 text-black font-black text-[9px] w-4 h-4 border-2 border-black flex items-center justify-center rounded-full"
                >
                  3
                </motion.span>
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className={`font-black text-sm transition-all px-3 py-1.5 border-2 flex items-center gap-1.5 ${
                  isActive('/profile')
                    ? 'bg-cyan-300 text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'border-transparent hover:border-black hover:bg-cyan-50'
                }`}
              >
                <UserCircle size={15} />
                PROFILE
              </Link>

              {/* Auth */}
              <Link
                to="/auth"
                className="px-5 py-2 bg-black text-white font-black text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all"
              >
                SIGN IN
              </Link>
            </div>

            {/* Mobile: Cart + Menu */}
            <div className="md:hidden flex items-center gap-3">
              <Link
                to="/cart"
                className="relative p-2 border-4 border-black bg-white"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-400 text-black font-black text-xs w-5 h-5 border-2 border-black flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border-4 border-black"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t-4 border-black"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 font-black text-sm border-4 transition-all ${
                      isActive(link.to)
                        ? 'bg-black text-white border-black'
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                ))}

                <Link
                  to="/notifications"
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 font-black text-sm border-4 border-gray-200 hover:border-black flex items-center gap-2"
                >
                  <Bell size={16} />
                  NOTIFICATIONS
                  <span className="ml-auto bg-pink-400 border-2 border-black font-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">3</span>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 font-black text-sm border-4 border-gray-200 hover:border-black flex items-center gap-2"
                >
                  <UserCircle size={16} />
                  PROFILE
                </Link>

                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 font-black text-sm bg-black text-white border-4 border-black text-center"
                >
                  SIGN IN
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
  );
}
