import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation2, Search, X, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUserLocation } from '../context/LocationContext';

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

/** Returns the first N comma-separated parts of a Nominatim display_name */
export function shortAddress(full: string, parts = 3): string {
  return full.split(', ').slice(0, parts).join(', ');
}

interface Props {
  onClose?: () => void;
}

export default function LocationPicker({ onClose }: Props) {
  const { location, setLocation } = useUserLocation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const doSearch = (q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 3) { setSuggestions([]); setShowDrop(false); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
        setShowDrop(data.length > 0);
      } catch { setSuggestions([]); }
      finally { setSearching(false); }
    }, 450);
  };

  const handleGPS = () => {
    setGpsError('');
    if (!navigator.geolocation) {
      setGpsError('Geolocation not supported by this browser.');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          setLocation({ address: data.display_name, lat: coords.latitude, lon: coords.longitude });
          onClose?.();
        } catch {
          setGpsError('Could not resolve your address. Try typing it instead.');
        } finally { setGpsLoading(false); }
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(
          err.code === 1
            ? 'Location permission denied. Please type your address below.'
            : 'Could not get your location. Please type it instead.'
        );
      },
      { timeout: 10000 }
    );
  };

  const handleSelect = (s: NominatimResult) => {
    setLocation({ address: s.display_name, lat: +s.lat, lon: +s.lon });
    setQuery(''); setSuggestions([]); setShowDrop(false);
    onClose?.();
  };

  return (
    <div className="bg-white border-2 border-black p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-sm flex items-center gap-2">
          <MapPin size={15} />
          SET YOUR LOCATION
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 border-2 border-transparent hover:border-black hover:bg-gray-100 transition-all"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Current location display */}
      {location && (
        <div className="mb-4 p-3 bg-lime-100 border-2 border-black flex items-start gap-2">
          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-green-700" />
          <div className="min-w-0">
            <p className="font-black text-[10px] text-green-800 tracking-widest mb-0.5">CURRENT LOCATION</p>
            <p className="font-bold text-xs text-gray-700 line-clamp-2">{shortAddress(location.address)}</p>
          </div>
        </div>
      )}

      {/* GPS Button */}
      <button
        onClick={handleGPS}
        disabled={gpsLoading}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-cyan-300 border-2 border-black font-black text-xs hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed mb-3"
      >
        {gpsLoading ? <Loader2 size={13} className="animate-spin" /> : <Navigation2 size={13} />}
        {gpsLoading ? 'DETECTING LOCATION...' : 'USE MY CURRENT LOCATION'}
      </button>
      {gpsError && (
        <p className="text-red-600 font-bold text-xs mb-3 -mt-1">{gpsError}</p>
      )}

      {/* Divider */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-px bg-black opacity-20" />
        <span className="font-black text-[9px] text-gray-400 tracking-widest">OR TYPE ADDRESS</span>
        <div className="flex-1 h-px bg-black opacity-20" />
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); doSearch(e.target.value); }}
          placeholder="Type your address or area..."
          className="w-full pl-9 pr-9 py-2.5 border-2 border-black font-bold text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
        />
        {searching && (
          <Loader2 size={13} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />
        )}
        {query && !searching && (
          <button
            onClick={() => { setQuery(''); setSuggestions([]); setShowDrop(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showDrop && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-2 border-t-0 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-h-52 overflow-y-auto"
          >
            {suggestions.map(s => (
              <button
                key={s.place_id}
                onClick={() => handleSelect(s)}
                className="w-full text-left px-4 py-2.5 font-bold text-xs hover:bg-yellow-100 border-b border-gray-100 last:border-b-0 flex items-start gap-2 transition-colors"
              >
                <MapPin size={11} className="mt-0.5 shrink-0 text-gray-400" />
                <span className="leading-tight">{s.display_name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-3 text-[9px] font-bold text-gray-400 text-center">
        📍 Geocoding by OpenStreetMap / Nominatim
      </p>
    </div>
  );
}