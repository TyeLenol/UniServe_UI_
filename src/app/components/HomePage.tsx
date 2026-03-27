import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  ArrowRight, 
  Clock, 
  Shield, 
  DollarSign, 
  Users, 
  Star, 
  Zap,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Shirt,
  Utensils,
  Smartphone,
  Scissors,
  Coffee,
  BookOpen,
  Sticker,
  Heart,
  ThumbsUp,
  Plus,
  Minus
} from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    id: 1,
    name: "Laundry",
    icon: Shirt,
    color: "bg-cyan-400",
    description: "Fresh clothes, zero effort",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&q=80",
    rotation: "-rotate-2"
  },
  {
    id: 2,
    name: "Grooming",
    icon: Scissors,
    color: "bg-pink-400",
    description: "Look sharp, feel good",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    rotation: "rotate-1"
  },
  {
    id: 3,
    name: "Tech Support",
    icon: Smartphone,
    color: "bg-purple-400",
    description: "Fix it fast",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    rotation: "rotate-2"
  },
  {
    id: 4,
    name: "Food Delivery",
    icon: Utensils,
    color: "bg-orange-400",
    description: "Hungry? Sorted.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    rotation: "-rotate-1"
  },
  {
    id: 5,
    name: "Coffee Run",
    icon: Coffee,
    color: "bg-lime-400",
    description: "Caffeine on demand",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    rotation: "rotate-3"
  },
  {
    id: 6,
    name: "Tutoring",
    icon: BookOpen,
    color: "bg-yellow-400",
    description: "Ace those exams",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    rotation: "-rotate-2"
  }
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Same-day service on most requests",
    color: "bg-yellow-300",
    borderColor: "border-yellow-600"
  },
  {
    icon: Shield,
    title: "100% Verified",
    description: "All providers are campus-approved",
    color: "bg-green-300",
    borderColor: "border-green-600"
  },
  {
    icon: DollarSign,
    title: "Student Deals",
    description: "Exclusive discounts for students",
    color: "bg-blue-300",
    borderColor: "border-blue-600"
  },
  {
    icon: Users,
    title: "Community First",
    description: "Built by students, for students",
    color: "bg-purple-300",
    borderColor: "border-purple-600"
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "4.9★ average across all services",
    color: "bg-pink-300",
    borderColor: "border-pink-600"
  },
  {
    icon: TrendingUp,
    title: "Growing Fast",
    description: "10K+ students already onboard",
    color: "bg-orange-300",
    borderColor: "border-orange-600"
  }
];

const testimonials = [
  {
    name: "Priya S.",
    role: "CS Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    quote: "This app is literally a lifesaver! No cap 🔥",
    rating: 5,
    color: "bg-pink-200",
    rotation: "rotate-1"
  },
  {
    name: "Rahul V.",
    role: "Business Major",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    quote: "Finally, someone gets what students need fr fr ✨",
    rating: 5,
    color: "bg-cyan-200",
    rotation: "-rotate-2"
  },
  {
    name: "Ananya P.",
    role: "Engineering",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    quote: "Best decision I made this semester 💯",
    rating: 5,
    color: "bg-yellow-200",
    rotation: "rotate-2"
  }
];

const faqs = [
  {
    question: "How does this even work? 🤔",
    answer: "Super simple! Browse services, pick what you need, book it. We connect you with verified campus providers. That's it, no complicated stuff.",
    color: "bg-cyan-200",
    rotation: "rotate-1"
  },
  {
    question: "Is it actually safe tho?",
    answer: "100%! Every provider is verified by campus admin. We run background checks and only work with trusted peeps. Your safety = our priority.",
    color: "bg-pink-200",
    rotation: "-rotate-1"
  },
  {
    question: "What about payment? 💸",
    answer: "Multiple options! Cash, UPI, cards—whatever works for you. Payments are secure and you only pay after the service. No shady business here.",
    color: "bg-yellow-200",
    rotation: "rotate-2"
  },
  {
    question: "Can I cancel if plans change?",
    answer: "Yep! Cancel anytime before the service starts. No questions asked. We get it, student life is unpredictable.",
    color: "bg-lime-200",
    rotation: "-rotate-2"
  },
  {
    question: "How fast is 'fast'? ⚡",
    answer: "Most services are same-day or next-day. Laundry? 24hrs. Tech repair? Depends on the issue. We'll always give you a realistic timeline upfront.",
    color: "bg-purple-200",
    rotation: "rotate-1"
  },
  {
    question: "Do you have student discounts?",
    answer: "Absolutely! All our prices are student-friendly. Plus, we run special deals every month. Follow us to stay updated on the latest offers.",
    color: "bg-orange-200",
    rotation: "-rotate-1"
  }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`${faq.color} border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${faq.rotation} hover:rotate-0 transition-all hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 font-black text-lg"
      >
        <span>{faq.question}</span>
        <div className="flex-shrink-0 w-10 h-10 bg-black border-2 border-black flex items-center justify-center">
          {isOpen ? (
            <Minus className="text-white" size={20} />
          ) : (
            <Plus className="text-white" size={20} />
          )}
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold text-base leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FAQSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-100 to-purple-100 border-b-4 border-black relative overflow-hidden">
      {/* Decorative stickers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 bg-yellow-300 border-2 border-black px-4 py-2 font-black text-sm rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          FAQ! 📚
        </div>
        <div className="absolute bottom-20 left-10 bg-pink-400 border-2 border-black px-4 py-2 font-black text-sm -rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          ANSWERS! 💡
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="inline-block text-5xl sm:text-6xl font-black mb-4 bg-white border-2 border-black px-8 py-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            GOT QUESTIONS?
          </h2>
          <p className="text-xl font-bold mt-8">
            We got answers! Check these out 👇
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-pink-300 to-orange-300 border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
            <p className="font-black text-xl mb-4">
              Still got questions? 🤷
            </p>
            <a 
              href="#" 
              className="inline-block bg-black text-white px-6 py-3 font-black border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all"
            >
              HIT US UP →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="pt-16 bg-white">
      {/* Hero Section - Neo-Brutalism Style */}
      <section className="relative min-h-screen flex items-center justify-center bg-purple-100 overflow-hidden border-b-4 border-black">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full border-2 border-black" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400 rotate-45 border-2 border-black" />
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-cyan-400 border-2 border-black" />
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-lime-300 rounded-full border-2 border-black" />
          
          {/* Sticker-like elements */}
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-32 right-1/4 bg-orange-400 border-2 border-black px-4 py-2 font-black text-lg rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            HOT! 🔥
          </motion.div>
          <motion.div 
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-40 left-20 bg-pink-300 border-2 border-black px-4 py-2 font-black -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            NEW ⚡
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-block mb-8">
              <div className="bg-black text-white px-8 py-3 font-black text-sm border-2 border-black rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                ✨ 10,000+ STUDENTS TRUST US ✨
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black mb-8 leading-none tracking-tighter">
              <span className="inline-block bg-white border-2 border-black px-8 py-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                CAMPUS
              </span>
              <br />
              <span className="inline-block bg-yellow-300 border-2 border-black px-8 py-4 rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                LIFE
              </span>
              <br />
              <span className="inline-block bg-pink-400 border-2 border-black px-8 py-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-6">
                SIMPLIFIED!
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-bold max-w-3xl mx-auto mb-12 leading-relaxed">
              Everything you need on campus—laundry, food, tech fixes—all in one place. 
              No BS, just services that work. 🎯
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link 
                to="/services"
                className="group relative"
              >
                <div className="bg-black text-white px-10 py-6 font-black text-xl border-2 border-black hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
                  BROWSE SERVICES
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
              <Link 
                to="/auth"
                className="relative"
              >
                <div className="bg-cyan-300 text-black px-10 py-6 font-black text-xl border-2 border-black hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  SIGN UP FREE
                </div>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { value: "10K+", label: "Students", color: "bg-blue-300" },
                { value: "50+", label: "Providers", color: "bg-purple-300" },
                { value: "99%", label: "Happy", color: "bg-orange-300" },
                { value: "24/7", label: "Available", color: "bg-green-300" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`${stat.color} border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                >
                  <div className="text-4xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm font-black uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services - Horizontal Scroll with Neo-Brutalism */}
      <section className="py-24 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="inline-block text-5xl sm:text-6xl font-black mb-4 bg-yellow-300 border-2 border-black px-8 py-4 rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              WHAT WE OFFER
            </h2>
            <p className="text-xl font-bold mt-8 max-w-2xl mx-auto">
              All the essentials, zero hassle 💪
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-8 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-8 scrollbar-hide">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 sm:w-96"
                >
                  <Link to={`/service/${service.id}`}>
                    <div className={`group relative h-[500px] border-2 border-black ${service.rotation} hover:rotate-0 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 overflow-hidden`}>
                      {/* Image */}
                      <div className="absolute inset-0">
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Color overlay */}
                        <div className={`absolute inset-0 ${service.color} mix-blend-multiply opacity-60`} />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 h-full p-6 flex flex-col">
                        {/* Icon Badge */}
                        <div className={`w-20 h-20 ${service.color} border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4`}>
                          <Icon className="text-black" size={36} />
                        </div>
                        
                        {/* Service Name */}
                        <div className="mt-auto">
                          <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-3">
                            <h3 className="text-3xl font-black mb-1">
                              {service.name}
                            </h3>
                            <p className="font-bold text-sm">
                              {service.description}
                            </p>
                          </div>
                          
                          {/* Action Button */}
                          <div className={`${service.color} border-2 border-black px-4 py-3 font-black text-sm flex items-center justify-between group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                            <span>LEARN MORE</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/services"
            className="inline-block"
          >
            <div className="bg-pink-300 border-2 border-black px-8 py-4 font-black text-lg hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
              VIEW ALL SERVICES →
            </div>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-lime-100 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="inline-block text-5xl sm:text-6xl font-black mb-4 bg-white border-2 border-black px-8 py-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              WHY WE ROCK
            </h2>
            <p className="text-xl font-bold mt-8">
              Because your time is precious ⏰
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`${feature.color} border-2 ${feature.borderColor} p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0`}
                >
                  <div className={`w-16 h-16 bg-black border-2 border-black flex items-center justify-center mb-6 rotate-12`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-black mb-3 uppercase">{feature.title}</h3>
                  <p className="font-bold text-lg">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Mixed Media Style */}
      <section className="py-24 bg-orange-100 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="inline-block text-5xl sm:text-6xl font-black mb-4 bg-pink-300 border-2 border-black px-8 py-4 rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              STUDENT LOVE
            </h2>
            <p className="text-xl font-bold mt-8">
              Real talk from real students 💬
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`${testimonial.color} border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all ${testimonial.rotation} hover:rotate-0`}>
                  {/* Quote */}
                  <div className="bg-white border-2 border-black p-6 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-bold text-lg leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 border-2 border-black object-cover shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      />
                      {/* Sticker badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 border-2 border-black rounded-full flex items-center justify-center rotate-12">
                        <CheckCircle size={16} className="text-black" />
                      </div>
                    </div>
                    <div>
                      <div className="font-black text-lg">{testimonial.name}</div>
                      <div className="font-bold text-sm">{testimonial.role}</div>
                      {/* Stars */}
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-black text-black" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative stickers */}
                {index === 1 && (
                  <div className="absolute -top-4 -right-4 bg-lime-300 border-2 border-black px-3 py-1 font-black text-sm rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    BEST! ⭐
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Creative Neo-Brutalism */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-32 bg-cyan-300 border-b-4 border-black relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400 border-2 border-black rotate-45" />
          <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-300 rounded-full border-2 border-black" />
          <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-orange-400 border-2 border-black" />
          <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-lime-300 border-2 border-black rotate-12" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="inline-block bg-white border-2 border-black px-6 py-3 rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                READY TO
              </span>
              <br />
              <span className="inline-block bg-pink-400 border-2 border-black px-6 py-3 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                UPGRADE YOUR
              </span>
              <br />
              <span className="inline-block bg-yellow-300 border-2 border-black px-6 py-3 rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-4">
                CAMPUS LIFE?
              </span>
            </h2>
            <p className="text-2xl font-bold mb-12">
              Join 10,000+ students living their best life 🚀
            </p>
            <Link 
              to="/auth"
              className="inline-block"
            >
              <div className="bg-black text-white px-12 py-6 font-black text-2xl border-2 border-black hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0">
                GET STARTED FREE →
              </div>
            </Link>
            <p className="mt-8 font-bold text-lg">
              No credit card • No BS • Just vibes ✨
            </p>
          </motion.div>
        </div>
      </section>


    </div>
  );
}