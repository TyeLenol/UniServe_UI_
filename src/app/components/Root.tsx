import { Outlet, useLocation } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';
import { CartProvider } from '../context/CartContext';
import { LocationProvider } from '../context/LocationContext';

export default function Root() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <LocationProvider>
      <CartProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <Navigation />
          <div className="flex-1">
            <Outlet />
          </div>
          {isHomePage && <Footer />}
        </div>
      </CartProvider>
    </LocationProvider>
  );
}