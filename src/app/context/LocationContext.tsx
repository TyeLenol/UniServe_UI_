import { createContext, useContext, useState, type ReactNode } from 'react';

export interface UserLocation {
  address: string;
  lat?: number;
  lon?: number;
}

interface LocationContextType {
  location: UserLocation | null;
  setLocation: (loc: UserLocation | null) => void;
  fulfillmentType: 'delivery' | 'pickup';
  setFulfillmentType: (type: 'delivery' | 'pickup') => void;
  selectedPickup: string;
  setSelectedPickup: (id: string) => void;
}

const LocationCtx = createContext<LocationContextType | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedPickup, setSelectedPickup] = useState('main-gate');

  return (
    <LocationCtx.Provider
      value={{ location, setLocation, fulfillmentType, setFulfillmentType, selectedPickup, setSelectedPickup }}
    >
      {children}
    </LocationCtx.Provider>
  );
}

export function useUserLocation(): LocationContextType {
  const ctx = useContext(LocationCtx);
  if (!ctx) throw new Error('useUserLocation must be used inside LocationProvider');
  return ctx;
}
