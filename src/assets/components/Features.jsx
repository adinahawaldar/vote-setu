import React from 'react';
import { BrainCircuit, BotMessageSquare, Languages, Mic, MapPinned, ListChecks } from 'lucide-react';

const coreFeatures = [
  { icon: BrainCircuit, title: "Smart Decision Engine", desc: "Get personalized next steps based on your eligibility.", span: "md:col-span-2" },
  { icon: BotMessageSquare, title: "AI Assistant", desc: "Instant explanations powered by Gemini.", span: "md:col-span-1" },
  { icon: Languages, title: "Multilingual", desc: "Accessibility for all regions.", span: "md:col-span-1" },
  { icon: Mic, title: "Voice Interaction", desc: "Speak your questions instantly.", span: "md:col-span-1" },
  { icon: MapPinned, title: "Booth Finder", desc: "Real-world map guidance.", span: "md:col-span-1" },
  { icon: ListChecks, title: "Progress Tracker", desc: "Track your journey visually.", span: "md:col-span-2" },
];

const BentoGrid = () => {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#32136E] mb-2">Core Features</h2>
          <h3 className="text-4xl font-bold tracking-tight">Everything you need to vote.</h3>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {coreFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`group p-8 rounded-[32px] border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#32136E]/20 hover:shadow-xl transition-all duration-300 ${feature.span} flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#32136E]">
                  <feature.icon size={24} />
                </div>
                <h4 className="text-xl font-semibold">{feature.title}</h4>
                <p className="text-gray-500 text-sm max-w-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;