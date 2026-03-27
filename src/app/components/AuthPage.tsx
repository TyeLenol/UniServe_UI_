import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Phone, ChevronRight, ShoppingCart, Wrench } from 'lucide-react';

// ── Shared style tokens ──────────────────────────────────────────────────────
const inputCls =
  'w-full pl-11 pr-4 py-3 border-2 border-black font-bold text-sm bg-gray-50 ' +
  'focus:outline-none focus:bg-yellow-50 ' +
  'focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ' +
  'transition-all placeholder:font-normal placeholder:text-gray-400';

const submitCls =
  'w-full py-4 bg-black text-white font-black text-sm border-2 border-black ' +
  'shadow-[4px_4px_0px_0px_#fde047] hover:shadow-[5px_5px_0px_0px_#fde047] ' +
  'hover:-translate-y-0.5 transition-all';

// ── Reusable sub-components ──────────────────────────────────────────────────
function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-black text-xs uppercase tracking-wider mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="flex-1 h-0.5 bg-black" />
      <span className="font-black text-xs">OR</span>
      <div className="flex-1 h-0.5 bg-black" />
    </div>
  );
}

function GoogleButton() {
  return (
    <button className="w-full py-3.5 bg-white border-2 border-black font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      CONTINUE WITH GOOGLE
    </button>
  );
}

type View = 'signin' | 'signup-form' | 'forgot';

const ADMIN_CREDENTIALS = {
  email: 'admin@uniserve.com',
  password: 'Admin@123',
};

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView]                         = useState<View>('signin');
  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirm, setShowConfirm]           = useState(false);
  const [rememberMe, setRememberMe]             = useState(false);
  const [signInError, setSignInError]           = useState('');
  const [forgotSent, setForgotSent]             = useState(false);
  const [forgotEmail, setForgotEmail]           = useState('');
  const [signInData, setSignInData]             = useState({ email: '', password: '' });
  const [signUpData, setSignUpData]             = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
  });

  const goToSignIn = () => { setView('signin'); };
  const goToSignUp = () => { setView('signup-form'); };

  const handleSignIn  = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');

    const email = signInData.email.trim().toLowerCase();
    const password = signInData.password;

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('campus-auth-session', JSON.stringify({
        role: 'admin',
        email,
        signedAt: new Date().toISOString(),
      }));

      const next = new URLSearchParams(location.search).get('next');
      navigate(next && next.startsWith('/') ? next : '/admin');
      return;
    }

    if (email && password) {
      localStorage.setItem('campus-auth-session', JSON.stringify({
        role: 'user',
        email,
        signedAt: new Date().toISOString(),
      }));
      navigate('/');
      return;
    }

    setSignInError('Please enter a valid email and password.');
  };
  const handleSignUp  = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.email.trim() || !signUpData.password.trim() || signUpData.password !== signUpData.confirmPassword) {
      return;
    }
    localStorage.setItem('campus-auth-session', JSON.stringify({
      role: 'user',
      email: signUpData.email.trim().toLowerCase(),
      signedAt: new Date().toISOString(),
    }));
    navigate('/onboarding');
  };
  const handleForgot  = (e: React.FormEvent) => { e.preventDefault(); setForgotSent(true); };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-16 px-4 py-12 relative overflow-hidden">

      {/* ── Background shapes — faint, corners only ── */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 opacity-[0.45] -translate-x-1/2 -translate-y-1/2 rotate-12 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400 opacity-[0.3] translate-x-1/3 translate-y-1/3 -rotate-12 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-pink-400 opacity-[0.5] -translate-x-1/2 -rotate-6 pointer-events-none" />
      <div className="absolute top-[18%] right-8 w-20 h-20 bg-lime-400 opacity-[0.5] rotate-45 pointer-events-none" />
      <div className="absolute bottom-[12%] left-[8%] w-14 h-14 bg-purple-400 opacity-[0.5] rotate-12 rounded-full pointer-events-none" />

      {/* ── Brand mark ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        
      >
        <Link
            to="/"
          >
            <img
              src="/transparent-logo.svg"
              alt="UniServe"
              className="h-30 w-auto"
            />
          </Link>
      </motion.div>

      {/* ── Form card ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="w-full flex-wrap max-w-md bg-white border-2 border-black shadow-[3px_3px_0px_0px] relative z-10"
      >
        <div className="p-8.5">
          <AnimatePresence mode="wait">

            {/* ════════════════════════════════════════════════════════
                SIGN IN
            ════════════════════════════════════════════════════════ */}
            {view === 'signin' && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                {/* Tab switcher */}
                <div className="flex border-2 border-black mb-9 shadow-[3px_3px_0px_0px]">
                  <button className="flex-1 py-3 font-black text-sm bg-black text-white">
                    SIGN IN
                  </button>
                  <button
                    onClick={goToSignUp}
                    className="flex-1 py-3 font-black text-sm border-l-4 border-black bg-white hover:bg-gray-100 transition-colors"
                  >
                    SIGN UP
                  </button>
                </div>

                <h2 className="text-3xl font-black mb-8">
                  WELCOME{' '}
                  <span className="bg-yellow-300 px-1 border-b-4 border-black">BACK! 👋</span>
                </h2>

                <div className="mb-5 border-2 border-black bg-cyan-50 p-3">
                  <p className="font-black text-[11px] uppercase tracking-wider">Admin access</p>
                  <p className="font-bold text-xs text-gray-600 mt-1">Email: admin@uniserve.com · Password: Admin@123</p>
                  <button
                    type="button"
                    onClick={() => setSignInData({ email: ADMIN_CREDENTIALS.email, password: ADMIN_CREDENTIALS.password })}
                    className="mt-2 text-xs font-black underline hover:no-underline"
                  >
                    USE ADMIN CREDENTIALS
                  </button>
                </div>
              
                <form onSubmit={handleSignIn} className="space-y-7">
                  <Field label="Email Address" icon={<Mail size={16} />}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={signInData.email}
                      onChange={e => setSignInData({ ...signInData, email: e.target.value })}
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Password" icon={<Lock size={16} />}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={signInData.password}
                      onChange={e => setSignInData({ ...signInData, password: e.target.value })}
                      className={`${inputCls} pr-12`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </Field>

                  {/* Remember / Forgot */}
                  <div className="flex items-center justify-between pt-1">
                    <label
                      className="flex items-center gap-2 cursor-pointer font-black text-xs uppercase tracking-wider select-none"
                      onClick={() => setRememberMe(v => !v)}
                    >
                      <div className={`w-4 h-4 border-2 border-black flex items-center justify-center transition-colors ${rememberMe ? 'bg-black' : 'bg-white'}`}>
                        {rememberMe && <span className="text-white text-[10px] leading-none">✓</span>}
                      </div>
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="font-black text-xs uppercase tracking-wider underline hover:text-blue-700 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button type="submit" className={submitCls}>SIGN IN →</button>

                  {signInError && (
                    <p className="text-xs font-bold text-red-600 -mt-2">{signInError}</p>
                  )}
                </form>

                <Divider />
                <GoogleButton />
              </motion.div>
            )}



            {/* ════════════════════════════════════════════════════════
                SIGN UP — STEP 2: DETAILS FORM
            ════════════════════════════════════════════════════════ */}
            {view === 'signup-form' && (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-black mb-1">
                  CREATE AN{' '}
                  <span className="bg-cyan-300 px-1.5 border-b-4 border-black">
                    ACCOUNT
                  </span>
                </h2>
                <p className="font-bold text-gray-500 text-sm mb-5">Fill in your details below</p>

                <form onSubmit={handleSignUp} className="space-y-3">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="First Name" icon={<User size={15} />}>
                      <input
                        type="text"
                        placeholder="First"
                        value={signUpData.firstName}
                        onChange={e => setSignUpData({ ...signUpData, firstName: e.target.value })}
                        className={inputCls}
                        required
                      />
                    </Field>
                    <Field label="Last Name" icon={<User size={15} />}>
                      <input
                        type="text"
                        placeholder="Last"
                        value={signUpData.lastName}
                        onChange={e => setSignUpData({ ...signUpData, lastName: e.target.value })}
                        className={inputCls}
                        required
                      />
                    </Field>
                  </div>

                  <Field label="Email Address" icon={<Mail size={15} />}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={signUpData.email}
                      onChange={e => setSignUpData({ ...signUpData, email: e.target.value })}
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Phone Number" icon={<Phone size={15} />}>
                    <input
                      type="tel"
                      placeholder="(+233) 000-000-000"
                      value={signUpData.phone}
                      onChange={e => setSignUpData({ ...signUpData, phone: e.target.value })}
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Password" icon={<Lock size={15} />}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      value={signUpData.password}
                      onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
                      className={`${inputCls} pr-12`}
                      required
                      minLength={8}
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </Field>

                  <Field label="Confirm Password" icon={<Lock size={15} />}>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={signUpData.confirmPassword}
                      onChange={e => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      className={`${inputCls} pr-12`}
                      required
                    />
                    <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </Field>

                  <div className="pt-4">
                    <button type="submit" className={submitCls}>CREATE ACCOUNT →</button>
                  </div>
                </form>

                <p className="mt-4 text-xs font-bold text-gray-500 text-center">
                  By signing up you agree to our{' '}
                  <a href="#" className="font-black underline hover:text-black">Terms</a>
                  {' '}&{' '}
                  <a href="#" className="font-black underline hover:text-black">Privacy Policy</a>
                </p>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════
                FORGOT PASSWORD
            ════════════════════════════════════════════════════════ */}
            {view === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={goToSignIn}
                  className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest mb-8 hover:underline"
                >
                  <ArrowLeft size={13} /> BACK TO SIGN IN
                </button>

                {!forgotSent ? (
                  <>
                    <h2 className="text-4xl font-black mb-1">
                      FORGOT{' '}
                      <span className="bg-pink-300 px-1.5 border-b-4 border-black">PASSWORD?</span>
                    </h2>
                    <p className="font-bold text-gray-400 text-sm mb-8">
                      Enter your email and we'll send you a reset link
                    </p>
                    <form onSubmit={handleForgot} className="space-y-4">
                      <Field label="Email Address" icon={<Mail size={16} />}>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={forgotEmail}
                          onChange={e => setForgotEmail(e.target.value)}
                          className={inputCls}
                          required
                        />
                      </Field>
                      <button type="submit" className={submitCls}>SEND RESET LINK →</button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border-4 border-black p-8 bg-lime-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="text-5xl mb-4">📬</div>
                    <h3 className="text-2xl font-black mb-2">CHECK YOUR INBOX!</h3>
                    <p className="font-bold text-sm leading-relaxed mb-6">
                      We sent a reset link to{' '}
                      <span className="font-black underline">{forgotEmail}</span>.
                      {' '}It expires in 15 minutes.
                    </p>
                    <button
                      onClick={() => { setForgotSent(false); setForgotEmail(''); goToSignIn(); }}
                      className="font-black text-xs uppercase tracking-widest underline hover:no-underline"
                    >
                      ← BACK TO SIGN IN
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>

      

    </div>
  );
}
