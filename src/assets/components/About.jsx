import React from 'react';
import { UserCircle, Bot, MapPin, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: "01", title: "Tell Us", description: "Age, location, and voting status.", icon: UserCircle },
  { id: "02", title: "Get Guidance", description: "AI-driven decision analysis.", icon: Bot },
  { id: "03", title: "Track Path", description: "Progress from start to end.", icon: MapPin },
  { id: "04", title: "Vote Secure", description: "Confidence on election day.", icon: CheckCircle2 }
];

const VoteSetuJourney = () => {
  return (
    <section className="relative w-full py-32 bg-white font-sans overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-8 mb-24 text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#32136E] mb-4">The Civic Bridge</h2>
        <h3 className="text-5xl font-bold text-black tracking-tighter">Your Journey, Simplified.</h3>
      </div>

      {/* HORIZONTAL TIMELINE */}
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Connecting Line */}
        <div className="absolute top-12 left-24 right-24 h-px bg-gray-200 hidden md:block"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center group">
              
              {/* Step Circle */}
              <div className="w-24 h-24 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-8 z-10 group-hover:border-[#32136E] group-hover:shadow-lg transition-all duration-300">
                <step.icon size={32} className="text-gray-400 group-hover:text-[#32136E] transition-colors" />
              </div>

              {/* Step Content */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{step.id}</div>
                <h4 className="text-xl font-semibold text-black">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default VoteSetuJourney;