import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Paperclip, Send, Phone, MoreVertical,
  CheckCheck, ImageIcon, FileText, X, Circle,
} from 'lucide-react';

// ── Provider data (keyed by service ID) ─────────────────────────────────────
const providerData: Record<string, {
  name: string; role: string; avatar: string; color: string; online: boolean;
}> = {
  '1': { name: 'CleanCo Campus',  role: 'Laundry Service',   avatar: 'CC', color: 'bg-cyan-300',   online: true  },
  '2': { name: 'StyleHub',        role: 'Hair & Grooming',   avatar: 'SH', color: 'bg-pink-300',   online: false },
  '3': { name: 'TechFix Pro',     role: 'Tech Repair',       avatar: 'TF', color: 'bg-yellow-300', online: true  },
  '4': { name: 'CampusEats',      role: 'Food Delivery',     avatar: 'CE', color: 'bg-orange-300', online: true  },
  '5': { name: 'SparkleClean',    role: 'Room Cleaning',     avatar: 'SC', color: 'bg-lime-300',   online: false },
  '6': { name: 'GrillMaster',     role: 'Food & Meals',      avatar: 'GM', color: 'bg-orange-300', online: true  },
  '7': { name: 'FixIt Appliance', role: 'Appliance Repair',  avatar: 'FA', color: 'bg-purple-300', online: false },
  '8': { name: 'GlowUp Studio',   role: 'Beauty & Grooming', avatar: 'GU', color: 'bg-pink-300',   online: true  },
};

// ── Types ────────────────────────────────────────────────────────────────────
type Message = {
  id: string;
  text?: string;
  sender: 'user' | 'provider';
  timestamp: string;
  read: boolean;
  file?: { name: string; kind: 'image' | 'doc' };
};

// ── Mock conversation ────────────────────────────────────────────────────────
const mockMessages: Message[] = [
  { id: '1',  sender: 'provider', text: 'Hi there! 👋 How can I help you today?',                                                                                   timestamp: '10:00 AM', read: true  },
  { id: '2',  sender: 'user',     text: 'Hey! I wanted to ask about your service — do you handle delicate items?',                                                   timestamp: '10:02 AM', read: true  },
  { id: '3',  sender: 'provider', text: 'Absolutely! Everything is handled with care. Delicates go through a separate gentle cycle 🧺',                              timestamp: '10:03 AM', read: true  },
  { id: '4',  sender: 'provider', text: 'For anything especially precious — silk, wool, etc. — we recommend our premium package which includes hand treatment.',      timestamp: '10:03 AM', read: true  },
  { id: '5',  sender: 'user',     text: 'That sounds great! What are your pickup timings?',                                                                          timestamp: '10:05 AM', read: true  },
  { id: '6',  sender: 'provider', text: 'Mon–Sat between 8 AM and 8 PM. Same-day delivery if dropped off before noon ⚡',                                            timestamp: '10:06 AM', read: true  },
  { id: '7',  sender: 'user',     text: 'Perfect, I\'ll go ahead and book then. Thanks!',                                                                            timestamp: '10:08 AM', read: true  },
  { id: '8',  sender: 'provider', text: 'Awesome! We\'ll send a reminder 30 mins before pickup. See you soon 🎉',                                                    timestamp: '10:09 AM', read: true  },
];

const autoReplies = [
  'Got it! I\'ll get back to you shortly 👍',
  'Thanks for reaching out! Let me check and confirm.',
  'Sure thing! Give me a moment ⏳',
  'Absolutely, happy to help! 😊',
  'On it! Will update you soon.',
];

// ── Typing Indicator ─────────────────────────────────────────────────────────
function TypingDots({ color }: { color: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-4 py-3 border-2 border-black ${color} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-black rounded-full block"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ChatPage() {
  const { id } = useParams();
  const provider = providerData[id || '1'] || providerData['1'];

  const [messages, setMessages]           = useState<Message[]>(mockMessages);
  const [input, setInput]                 = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isTyping, setIsTyping]           = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef    = useRef<HTMLTextAreaElement>(null);
  const fileInputRef   = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-grow textarea
  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 128) + 'px';
  };

  const canSend = input.trim().length > 0 || attachedFiles.length > 0;

  const sendMessage = () => {
    if (!canSend) return;

    const now     = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const outgoing: Message[] = [];

    if (input.trim()) {
      outgoing.push({ id: Date.now().toString(), sender: 'user', text: input.trim(), timestamp: timeStr, read: false });
    }
    attachedFiles.forEach((file, i) => {
      outgoing.push({
        id: (Date.now() + i + 1).toString(),
        sender: 'user',
        timestamp: timeStr,
        read: false,
        file: { name: file.name, kind: file.type.startsWith('image/') ? 'image' : 'doc' },
      });
    });

    setMessages(prev => [...prev, ...outgoing]);
    setInput('');
    setAttachedFiles([]);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Simulate provider typing → reply
    setTimeout(() => setIsTyping(true), 600);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: (Date.now() + 999).toString(),
        sender: 'provider',
        text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
      };
      setMessages(prev => [...prev, reply]);
    }, 2400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
    e.target.value = '';
  };

  return (
    <div className="pt-16 h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* ── Chat Header ── */}
      <div className="flex-shrink-0 bg-white border-b-2 border-black px-4 py-3 flex items-center gap-3 shadow-[0_2px_0_0_rgba(0,0,0,1)]">
        <Link
          to={`/service/${id}`}
          className="p-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0"
        >
          <ArrowLeft size={18} />
        </Link>

        {/* Provider avatar + info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`relative w-11 h-11 flex-shrink-0 ${provider.color} border-2 border-black flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
            {provider.avatar}
            {provider.online && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-lime-400 border-2 border-black rounded-full" />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="font-black text-base leading-tight truncate">{provider.name}</h2>
            <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
              {provider.online ? (
                <>
                  <Circle size={8} className="fill-lime-500 text-lime-500" />
                  Online
                </>
              ) : (
                <>
                  <Circle size={8} className="fill-gray-400 text-gray-400" />
                  Last seen recently
                </>
              )}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={`tel:+919876543210`}
            className="p-2 border-2 border-black bg-white hover:bg-lime-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Phone size={16} />
          </a>
          <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
        {/* Date divider */}
        <div className="flex items-center gap-3 my-2 mb-5">
          <div className="flex-1 h-px bg-black/15" />
          <span className="text-[11px] font-black bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">TODAY</span>
          <div className="flex-1 h-px bg-black/15" />
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18 }}
              className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Provider avatar on left */}
              {msg.sender === 'provider' && (
                <div className={`w-7 h-7 flex-shrink-0 ${provider.color} border-2 border-black flex items-center justify-center font-black text-[10px]`}>
                  {provider.avatar[0]}
                </div>
              )}

              <div className={`flex flex-col gap-1 max-w-[70%] sm:max-w-[58%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Bubble */}
                {msg.file ? (
                  <div className={`flex items-center gap-2.5 px-4 py-3 border-2 border-black font-bold text-sm ${
                    msg.sender === 'user'
                      ? 'bg-yellow-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  }`}>
                    {msg.file.kind === 'image'
                      ? <ImageIcon size={16} className="flex-shrink-0" />
                      : <FileText size={16} className="flex-shrink-0" />}
                    <span className="truncate max-w-[160px]">{msg.file.name}</span>
                  </div>
                ) : (
                  <div className={`px-4 py-3 border-2 border-black font-bold text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-yellow-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  }`}>
                    {msg.text}
                  </div>
                )}

                {/* Timestamp + read tick */}
                <div className={`flex items-center gap-1 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] font-bold text-gray-400">{msg.timestamp}</span>
                  {msg.sender === 'user' && (
                    <CheckCheck
                      size={12}
                      className={msg.read ? 'text-cyan-500' : 'text-gray-400'}
                    />
                  )}
                </div>
              </div>

              {/* User avatar (small dot) on right */}
              {msg.sender === 'user' && (
                <div className="w-7 h-7 flex-shrink-0 bg-black border-2 border-black flex items-center justify-center font-black text-[10px] text-white">
                  ME
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-end gap-2 justify-start"
            >
              <div className={`w-7 h-7 flex-shrink-0 ${provider.color} border-2 border-black flex items-center justify-center font-black text-[10px]`}>
                {provider.avatar[0]}
              </div>
              <TypingDots color="bg-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="flex-shrink-0 bg-white border-t-2 border-black px-4 py-3">

        {/* Attached files preview chips */}
        <AnimatePresence>
          {attachedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 mb-3 flex-wrap overflow-hidden"
            >
              {attachedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-2 bg-cyan-100 border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {file.type.startsWith('image/') ? <ImageIcon size={11} /> : <FileText size={11} />}
                  <span className="max-w-[100px] truncate">{file.name}</span>
                  <button
                    onClick={() => setAttachedFiles(prev => prev.filter((_, j) => j !== i))}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-2">

          {/* Attach button + popover */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowAttachMenu(prev => !prev)}
              className={`p-3 border-2 border-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                showAttachMenu ? 'bg-yellow-300' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Paperclip size={18} />
            </button>

            <AnimatePresence>
              {showAttachMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute bottom-full left-0 mb-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden w-44 z-20"
                >
                  <button
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.accept = 'image/*,video/*';
                        fileInputRef.current.click();
                      }
                      setShowAttachMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 font-black text-sm hover:bg-cyan-100 transition-colors w-full border-b-2 border-black"
                  >
                    <ImageIcon size={15} />
                    PHOTO / VIDEO
                  </button>
                  <button
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.accept = '.pdf,.doc,.docx,.txt,.xlsx';
                        fileInputRef.current.click();
                      }
                      setShowAttachMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 font-black text-sm hover:bg-yellow-100 transition-colors w-full"
                  >
                    <FileText size={15} />
                    DOCUMENT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden file input — lives outside the menu so it persists */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Type a message…"
            rows={1}
            className="flex-1 px-4 py-3 border-2 border-black font-bold text-sm resize-none focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50 overflow-y-auto"
            style={{ maxHeight: '128px' }}
          />

          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={!canSend}
            className={`flex-shrink-0 p-3 border-2 border-black font-black transition-all ${
              canSend
                ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}