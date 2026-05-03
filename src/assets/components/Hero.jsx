import React from 'react';
import { LayoutDashboard, Mailbox } from 'lucide-react';

// Data defining exact positions (top/left %) and delay for varied animation
const professionalAvatars = [
  { id: 'men/32', top: 15, left: 57, size: 'w-24 h-24', delay: '0s' },
  { id: 'women/44', top: 22, left: 46, size: 'w-10 h-10', delay: '1s' },
  { id: 'men/55', top: 68, left: 50, size: 'w-24 h-24', delay: '2s' },
  { id: 'women/66', top: 65, left: 77, size: 'w-20 h-20', delay: '0.5s' },
  { id: 'men/77', top: 48, left: 85, size: 'w-10 h-10', delay: '1.5s' },
];

const centerPoint = { x: 65, y: 50 };

const VoteSetuHero = () => {
  return (
    <section className="relative w-full h-screen bg-white font-book-antiqua overflow-hidden">
      
      {/* 1. BACKGROUND GRADIENT LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[60%] left-[20%] w-[800px] h-[800px] rounded-full blur-[130px] opacity-80 mix-blend-multiply"
          style={{
            background: 'linear-gradient(160deg, rgba(239,68,68,0.6) 0%, rgba(139,92,246,0.6) 50%, rgba(59,130,246,0.4) 100%)',
          }}
        ></div>
      </div>

      <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#32136E" stopOpacity="0" />
            <stop offset="50%" stopColor="#32136E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#32136E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {professionalAvatars.map((av) => (
          <path
            key={`line-${av.id}`}
            d={`M ${av.left}% ${av.top}% L ${centerPoint.x}% ${centerPoint.y}%`}
            stroke="url(#lineGrad)"
            strokeWidth="1.5"
            strokeDasharray="5 5" 
            className="opacity-40"
          />
        ))}
      </svg>

      <div className="absolute inset-0 z-20 pointer-events-none">
        {professionalAvatars.map((av) => (
          <div 
            key={av.id}
            className={`absolute ${av.size} rounded-full border-4 border-white shadow-lg animate-float-continuous`}
            style={{ 
              top: `${av.top}%`, 
              left: `${av.left}%`,
              animationDelay: av.delay, 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <img 
              src={`https://randomuser.me/api/portraits/${av.id}.jpg`} 
              alt="VoteSetu User" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
        ))}
      </div>

      <div className="absolute top-[50%] left-[65%] z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[300px] h-[300px]">
        {/* The Pulsing Aura Ring */}
        <div className="absolute w-[80%] h-[80%] rounded-full animate-pulse-aura"></div>
        
        {/* Main Content Box */}
        <div className="absolute w-[70%] h-[70%] rounded-full bg-white shadow-xl flex items-center justify-center">
          <div className="absolute w-[70%] h-[70%] rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
            <Mailbox size={48} className="text-[#32136E]" />
          </div>
        </div>
      </div>

      {/* 5. CONTENT BLOCK (Middle-Left) */}
      <div className="relative z-30 w-full h-full flex flex-col justify-center px-16">
        <div className="max-w-xl space-y-6 mt-16">
          <h1 className="text-6xl font-bold text-black tracking-tight leading-[1.05]">
            From Confusion to<br/>Casting Your Vote.
          </h1>
          <p className="text-xl text-gray-700 font-normal leading-relaxed max-w-lg">
            VoteSetu guides you step-by-step through the entire voting process from eligibility to polling booth in your language, with AI support.
          </p>
          <button className="flex items-center gap-3 bg-black text-white px-8 py-4 font-semibold uppercase tracking-widest hover:bg-indigo-950 transition-all">
            Start My Journey <LayoutDashboard size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VoteSetuHero;