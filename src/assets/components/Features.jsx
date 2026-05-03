import React from 'react';
import { BrainCircuit, BotMessageSquare, Languages, Mic, MapPinned, ArrowRight } from 'lucide-react';

const coreFeatures = [
  { 
    icon: BrainCircuit, 
    title: "Decision Engine", 
    desc: "Personalized roadmap based on eligibility analysis.",
    span: "md:col-span-2"
  },
  { 
    icon: BotMessageSquare, 
    title: "AI Consultant", 
    desc: "24/7 expert guidance powered by Gemini 2.0.",
    span: "md:col-span-1"
  },
  { 
    icon: Languages, 
    title: "Global Reach", 
    desc: "Native support for all major Indian languages.",
    span: "md:col-span-1"
  },
  { 
    icon: Mic, 
    title: "Voice First", 
    desc: "Hands-free interaction for ultimate accessibility.",
    span: "md:col-span-1"
  },
  { 
    icon: MapPinned, 
    title: "Booth Finder", 
    desc: "Precise geospatial polling station mapping.",
    span: "md:col-span-1"
  }
];

const Features = () => {
  return (
    <section className="w-full py-24 bg-white border-t border-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
              Powerful <br /> Capabilities
            </h2>
            <p className="text-gray-500 text-lg uppercase tracking-widest leading-relaxed">
              Cutting-edge technology designed to empower every citizen.
            </p>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
               Engineering Excellence
             </div>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black border border-black overflow-hidden">
          {coreFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`group p-10 bg-white hover:bg-black hover:text-white transition-all duration-500 ${feature.span} flex flex-col justify-between min-h-[350px]`}
            >
              <div>
                <div className="mb-8 p-3 border border-black inline-block group-hover:border-white transition-colors">
                  <feature.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase">
                  {feature.title}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-400 transition-colors text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                Explore Feature <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;