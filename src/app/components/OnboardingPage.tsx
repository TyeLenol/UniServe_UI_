import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ShoppingCart, Wrench, ChevronRight, ArrowLeft, User, Phone, FileText, Building2, Tag, Upload, Check } from 'lucide-react';

type Role = 'customer' | 'provider';
type Step = 'role' | 'profile' | 'success';

interface CustomerProfile {
  displayName: string;
  bio: string;
  phone: string;
  profileImage?: string;
}

interface ProviderProfile {
  businessName: string;
  serviceCategory: string;
  serviceDescription: string;
  phone: string;
  profileImage?: string;
}

const SERVICE_CATEGORIES = [
  'Cleaning',
  'Tutoring',
   'Hair and Grooming',
   'Beauty Products',
  'Tech Support',
  'Food & Beverages',
  'Photography',
  'Laundry',
  'Repairs',
  'Moving',
  'Design',
  'Other',
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  const [customerData, setCustomerData] = useState<CustomerProfile>({
    displayName: '',
    bio: '',
    phone: '',
  });

  const [providerData, setProviderData] = useState<ProviderProfile>({
    businessName: '',
    serviceCategory: '',
    serviceDescription: '',
    phone: '',
  });

  const handleCompleteCustomer = () => {
    if (!customerData.displayName.trim() || !customerData.phone.trim()) return;

    const session = JSON.parse(localStorage.getItem('campus-auth-session') || '{}');
    localStorage.setItem('campus-auth-session', JSON.stringify({
      ...session,
      role: 'customer',
      userProfile: customerData,
      onboardedAt: new Date().toISOString(),
    }));
    
    setStep('success');
  };

  const handleCompleteProvider = () => {
    if (!providerData.businessName.trim() || !providerData.serviceCategory || !providerData.serviceDescription.trim() || !providerData.phone.trim()) return;

    const session = JSON.parse(localStorage.getItem('campus-auth-session') || '{}');
    localStorage.setItem('campus-auth-session', JSON.stringify({
      ...session,
      role: 'provider',
      providerProfile: providerData,
      onboardedAt: new Date().toISOString(),
    }));
    
    setStep('success');
  };

  const proceedToNextStep = () => {
    if (step === 'role' && selectedRole) {
      setStep('profile');
    }
  };

  const goBack = () => {
    if (step === 'profile') {
      setStep('role');
    }
  };

  const handleSuccess = () => {
    if (selectedRole === 'customer') {
      navigate('/');
    } else {
      navigate('/provider-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-16 px-4 py-12 relative overflow-hidden">

      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 opacity-[0.45] -translate-x-1/2 -translate-y-1/2 rotate-12 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400 opacity-[0.3] translate-x-1/3 translate-y-1/3 -rotate-12 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-pink-400 opacity-[0.5] -translate-x-1/2 -rotate-6 pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <img src="/transparent-logo.svg" alt="UniServe" className="h-20 w-auto mb-8" />
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="w-full max-w-2xl"
      >
        <AnimatePresence mode="wait">

          {/* ════════════════════════════════════════════════════════
              STEP 1: ROLE SELECTION
          ════════════════════════════════════════════════════════ */}
          {step === 'role' && (
            <motion.div
              key="role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-12">
                <div className="inline-block mb-4 px-3 py-1.5 border-2 border-black font-black text-xs uppercase bg-yellow-300 shadow[2px_2px_0px_0px_rgba(0,0,0)]">
                  Step 1 / 3
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-3">
                  YOU'RE IN!{' '}
                  <span className="bg-yellow-300 px-2 border-b-4 border-black">🎉</span>
                </h1>
                <p className="text-lg font-bold text-gray-600 max-w-md mx-auto">
                  Now tell us what you're here to do. Your choice shapes your experience.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Customer card */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setSelectedRole('customer')}
                  className={`text-left p-7 border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    selectedRole === 'customer'
                      ? 'bg-yellow-300 shadow-[3px_3px_0px_0px_rgba(0,0,0)]'
                      : 'bg-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)]'
                  }`}
                >
                  <div className="flex items-start gap-5 mb-4">
                    <div className={`w-14 h-14 border-2 border-black flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedRole === 'customer' ? 'bg-black' : 'bg-yellow-100'
                    }`}>
                      <ShoppingCart size={24} className={selectedRole === 'customer' ? 'text-yellow-300' : 'text-gray-600'} />
                    </div>
                    {selectedRole === 'customer' && (
                      <div className="w-7 h-7 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
                        <span className="text-yellow-300 text-sm font-black">✓</span>
                      </div>
                    )}
                  </div>
                  <h2 className="font-black text-xl uppercase tracking-wide mb-2">CUSTOMER</h2>
                  <p className="font-bold text-sm text-gray-700 leading-relaxed mb-4">
                    Browse services, book appointments, and get things done on your schedule.
                  </p>
                  <div className="space-y-2 text-xs font-bold text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📱</span> Browse 50+ local services
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💳</span> Secure booking & payments
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⭐</span> Rate & review providers
                    </div>
                  </div>
                </motion.button>

                {/* Provider card */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setSelectedRole('provider')}
                  className={`text-left p-7 border-2 border-black transition-all shadow[2px_2rpx_0px_0px_rgba(0,0,0)] ${
                    selectedRole === 'provider'
                      ? 'bg-cyan-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <div className="flex items-start gap-5 mb-4">
                    <div className={`w-14 h-14 border-2 border-black flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedRole === 'provider' ? 'bg-black' : 'bg-cyan-100'
                    }`}>
                      <Wrench size={24} className={selectedRole === 'provider' ? 'text-cyan-300' : 'text-gray-600'} />
                    </div>
                    {selectedRole === 'provider' && (
                      <div className="w-7 h-7 bg-black border-1 border-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
                        <span className="text-cyan-300 text-sm font-black">✓</span>
                      </div>
                    )}
                  </div>
                  <h2 className="font-black text-xl uppercase tracking-wide mb-2">PROVIDER</h2>
                  <p className="font-bold text-sm text-gray-700 leading-relaxed mb-4">
                    Turn your skills into income. List services and build your campus presence.
                  </p>
                  <div className="space-y-2 text-xs font-bold text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚀</span> Launch your service business
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💰</span> Earn on your own terms
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📊</span> Track bookings & earnings
                    </div>
                  </div>
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!selectedRole}
                onClick={proceedToNextStep}
                className={`w-full py-5 font-black text-sm border-3 border-black flex items-center justify-center gap-3 transition-all uppercase tracking-wide ${
                  selectedRole
                    ? 'bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                }`}
              >
                Continue to setup <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════
              STEP 2: PROFILE SETUP
          ════════════════════════════════════════════════════════ */}
          {step === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-wider mb-6 hover:underline text-gray-700"
              >
                <ArrowLeft size={14} /> BACK
              </button>

              <div className="mb-8">
                <div className="inline-block mb-4 px-3 py-1.5 border-2 border-black font-black text-xs uppercase bg-cyan-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Step 2 / 3
                </div>
                <h1 className="text-3xl md:text-4xl font-black mb-2">
                  COMPLETE YOUR{' '}
                  <span className={`px-2 border-b-4 border-black ${selectedRole === 'customer' ? 'bg-yellow-300' : 'bg-cyan-300'}`}>
                    PROFILE
                  </span>
                </h1>
                <p className="font-bold text-gray-600 text-sm">Fill in your details below</p>
              </div>

              {selectedRole === 'customer' ? (
                // CUSTOMER FORM
                <div className="space-y-5 mb-8">
                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Display Name *</label>
                    <input
                      type="text"
                      placeholder="How should we call you?"
                      value={customerData.displayName}
                      onChange={e => setCustomerData({ ...customerData, displayName: e.target.value })}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                    />
                    <p className="text-xs text-gray-500 mt-1.5 font-bold">This appears when you review providers</p>
                  </div>

                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={customerData.phone}
                      onChange={e => setCustomerData({ ...customerData, phone: e.target.value })}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                    />
                    <p className="text-xs text-gray-500 mt-1.5 font-bold">Providers use this to contact you</p>
                  </div>

                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Bio (Optional)</label>
                    <textarea
                      placeholder="Tell providers about yourself... (e.g. 'Computer Science freshman, always busy!')"
                      value={customerData.bio}
                      onChange={e => setCustomerData({ ...customerData, bio: e.target.value })}
                      maxLength={150}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-yellow-50 resize-none"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1.5 font-bold">{customerData.bio.length}/150 characters</p>
                  </div>

                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-3 text-gray-900">Profile Picture (Optional)</label>
                    <button className="w-full py-8 border-3 border-dashed border-black flex flex-col items-center justify-center gap-2 hover:bg-yellow-50 transition-colors font-bold text-sm">
                      <Upload size={20} />
                      Click to upload image
                    </button>
                  </div>

                  <button
                    onClick={handleCompleteCustomer}
                    disabled={!customerData.displayName.trim() || !customerData.phone.trim()}
                    className={`w-full py-5 font-black text-sm border-3 border-black flex items-center justify-center gap-2 transition-all uppercase tracking-wide ${
                      customerData.displayName.trim() && customerData.phone.trim()
                        ? 'bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                    }`}
                  >
                    Complete Profile <ChevronRight size={18} />
                  </button>
                </div>
              ) : (
                // PROVIDER FORM
                <div className="space-y-5 mb-8">
                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Business/Provider Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., CleanCo Campus, StyleHub"
                      value={providerData.businessName}
                      onChange={e => setProviderData({ ...providerData, businessName: e.target.value })}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-cyan-50"
                    />
                    <p className="text-xs text-gray-500 mt-1.5 font-bold">How customers will know you</p>
                  </div>

                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Service Category *</label>
                    <select
                      value={providerData.serviceCategory}
                      onChange={e => setProviderData({ ...providerData, serviceCategory: e.target.value })}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-cyan-50 bg-white cursor-pointer"
                    >
                      <option value="">Select a category...</option>
                      {SERVICE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Service Description *</label>
                    <textarea
                      placeholder="What services do you offer? What's your approach?"
                      value={providerData.serviceDescription}
                      onChange={e => setProviderData({ ...providerData, serviceDescription: e.target.value })}
                      maxLength={250}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-cyan-50 resize-none"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1.5 font-bold">{providerData.serviceDescription.length}/250 characters</p>
                  </div>

                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-2 text-gray-900">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={providerData.phone}
                      onChange={e => setProviderData({ ...providerData, phone: e.target.value })}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm font-bold focus:outline-none focus:bg-cyan-50"
                    />
                    <p className="text-xs text-gray-500 mt-1.5 font-bold">Customers use this to contact you</p>
                  </div>

                  <div className="bg-white border-2 border-black p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <label className="block font-black text-xs uppercase tracking-wider mb-3 text-gray-900">Business Picture (Optional)</label>
                    <button className="w-full py-8 border-3 border-dashed border-black flex flex-col items-center justify-center gap-2 hover:bg-cyan-50 transition-colors font-bold text-sm">
                      <Upload size={20} />
                      Click to upload image
                    </button>
                  </div>

                  <button
                    onClick={handleCompleteProvider}
                    disabled={!providerData.businessName.trim() || !providerData.serviceCategory || !providerData.serviceDescription.trim() || !providerData.phone.trim()}
                    className={`w-full py-5 font-black text-sm border-3 border-black flex items-center justify-center gap-2 transition-all uppercase tracking-wide ${
                      providerData.businessName.trim() && providerData.serviceCategory && providerData.serviceDescription.trim() && providerData.phone.trim()
                        ? 'bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                    }`}
                  >
                    Complete Profile <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════
              STEP 3: SUCCESS
          ════════════════════════════════════════════════════════ */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto bg-emerald-300 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Check size={48} className="text-black" />
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-black mb-3">
                YOU'RE ALL SET!{' '}
                <span className="bg-emerald-300 px-2 border-b-4 border-black">✨</span>
              </h1>
              <p className="text-lg font-bold text-gray-600 max-w-md mx-auto mb-2">
                Your profile is complete and ready to go.
              </p>
              <p className="font-bold text-gray-500 text-sm max-w-md mx-auto mb-10">
                {selectedRole === 'customer'
                  ? 'Start exploring services and booking providers today!'
                  : 'You can now add services and start accepting bookings!'}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSuccess}
                className={`w-full py-5 font-black text-sm border-3 border-black flex items-center justify-center gap-2 transition-all uppercase tracking-wide bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer`}
              >
                {selectedRole === 'customer' ? '🏠 GO HOME' : '📊 OPEN DASHBOARD'}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
