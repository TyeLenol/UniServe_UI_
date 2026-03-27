import { Link } from 'react-router';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-0 mb-4">
              <span className="bg-yellow-300 text-black font-black text-xl px-2 py-0.5">CAMPUS</span>
              <span className="font-black text-xl text-white ml-1">SERVICES</span>
            </div>
            <p className="font-bold text-gray-400 text-sm leading-relaxed">
              A peer-powered service platform built for students, by students.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-black text-sm mb-5 text-yellow-300 tracking-widest">PLATFORM</h4>
            <ul className="space-y-3 font-bold text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">→ Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">→ Browse Services</Link></li>
              <li><Link to="/announcements" className="text-gray-300 hover:text-white transition-colors">→ Announcements</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white transition-colors">→ Cart</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-black text-sm mb-5 text-pink-300 tracking-widest">ACCOUNT</h4>
            <ul className="space-y-3 font-bold text-sm">
              <li><Link to="/auth" className="text-gray-300 hover:text-white transition-colors">→ Sign In / Register</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text-white transition-colors">→ My Profile</Link></li>
              <li><Link to="/notifications" className="text-gray-300 hover:text-white transition-colors">→ Notifications</Link></li>
              <li><Link to="/order-confirmation" className="text-gray-300 hover:text-white transition-colors">→ My Orders</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-black text-sm mb-5 text-cyan-300 tracking-widest">INFO</h4>
            <ul className="space-y-3 font-bold text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">→ About</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">→ Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">→ Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">→ Terms of Use</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-2 border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-black text-sm text-gray-400">
            © {year} CAMPUS SERVICES. ALL RIGHTS RESERVED.
          </p>
          <p className="font-bold text-xs text-gray-500">
            MADE WITH 💜 BY STUDENTS, FOR STUDENTS
          </p>
        </div>
      </div>
    </footer>
  );
}