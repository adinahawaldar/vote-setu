import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRight } from 'lucide-react';

const VoteSetuHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen bg-white font-book-antiqua flex items-center">
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left: Content */}
        <div className="flex-1 space-y-8 relative z-30">
          <div className="space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
               Official Voting Assistant
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tighter uppercase leading-[1.1]">
              Simplified Voting. <br />
              Personalized for You.
            </h1>
            <p className="text-base text-gray-500 font-normal leading-relaxed max-w-md">
              A minimalist AI consultant helping you navigate the Indian voting process with precision and clarity.
            </p>
          </div>

          <div className="flex pt-2">
            <Link to="/dashboard" className="bg-black text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-3 group">
              Start Journey <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right: Constantly Moving 3D Visual */}
        <div className="flex-1 hidden lg:flex justify-center items-center perspective-[1200px]">
           <div 
            className="w-96 h-96 flex flex-col items-center justify-center relative animate-[heroFloat_8s_ease-in-out_infinite]"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y * -1}deg)` 
            }}
           >
              
              {/* Ballots in a Constant 3D Cycle */}
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="absolute w-20 h-28 border border-black bg-white shadow-xl flex flex-col p-3 z-10 pointer-events-none"
                  style={{ 
                    animation: `voteCycle 6s linear infinite`,
                    animationDelay: `${i * 1.5}s`,
                    opacity: 0,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="h-0.5 w-full bg-gray-100 mb-1"></div>
                  <div className="h-0.5 w-1/3 bg-gray-100 mb-1"></div>
                  <div className="flex-1 border border-dashed border-gray-100 flex items-center justify-center mt-1">
                    <div className="w-3 h-3 rounded-full border border-gray-100"></div>
                  </div>
                </div>
              ))}

              {/* Central Box with Constant Orbiting Ring */}
              <div className="relative z-20 flex flex-col items-center">
                 {/* The Orbiting Path / Ring */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-black/[0.03] rounded-full animate-[spin_10s_linear_infinite]"></div>
                 
                 {/* Ballot Box Slot */}
                 <div className="w-56 h-12 bg-white border-x-2 border-t-2 border-black mt-16 relative z-20 flex items-center justify-center shadow-lg">
                    <div className="w-40 h-2.5 bg-black rounded-full relative overflow-hidden">
                       <div className="absolute inset-0 bg-indigo-500/20 animate-pulse"></div>
                    </div>
                 </div>

                 {/* The Box Body */}
                 <div className="w-56 h-32 bg-gray-50 border-2 border-black relative z-0 flex flex-col items-center justify-center group shadow-2xl">
                    <div className="text-[8px] font-black uppercase tracking-[0.5em] text-black/10">Secure Vault</div>
                    <div className="mt-4 flex gap-1">
                       {[1,2,3].map(i => (
                         <div key={i} className="w-1 h-1 bg-black/5 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Reactive Floor Shadow */}
              <div className="absolute -bottom-12 w-48 h-8 bg-black/[0.04] rounded-[100%] blur-2xl animate-[shadowPulse_8s_ease-in-out_infinite]"></div>

           </div>
        </div>

      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translate(0, 0) rotateY(var(--tw-rotate-y, 0deg)) rotateX(var(--tw-rotate-x, 0deg)); }
          50% { transform: translate(0, -20px) rotateY(var(--tw-rotate-y, 5deg)) rotateX(var(--tw-rotate-x, -5deg)); }
        }
        @keyframes voteCycle {
          0% { transform: translate3d(0, -180px, -100px) rotateX(10deg); opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          85% { transform: translate3d(0, 20px, 50px) rotateX(-20deg); opacity: 0; }
          100% { transform: translate3d(0, 100px, 100px) rotateX(-30deg); opacity: 0; }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
      `}</style>
    </section>
  );
};

export default VoteSetuHero;