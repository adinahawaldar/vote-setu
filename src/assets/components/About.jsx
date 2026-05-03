import React from 'react';
import { UserCircle, Bot, MapPin, CheckCircle2, ArrowDown } from 'lucide-react';

const steps = [
  { id: "01", title: "Identity", description: "Define your demographic profile and location context.", icon: UserCircle },
  { id: "02", title: "Analysis", description: "Gemini 2.0 processes state-specific voting mandates.", icon: Bot },
  { id: "03", title: "Roadmap", description: "Receive a step-by-step digital journey to the booth.", icon: MapPin },
  { id: "04", title: "Democracy", description: "Exercise your right with absolute clarity and ease.", icon: CheckCircle2 }
];

const About = () => {
  return (
    <section className="relative w-full py-32 bg-white overflow-hidden border-t border-black">

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-20 items-start">

          {/* Left: Sticky Header */}
          <div className="md:w-1/3 md:sticky md:top-32">
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-gray-400 mb-6">The Civic Bridge</h2>
            <h3 className="text-6xl font-black text-black tracking-tighter uppercase leading-tight mb-8">
              Your Journey <br /> Simplified.
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed font-normal mb-12">
              VoteSetu transforms the complex bureaucratic process of Indian elections into a seamless, digital experience.
            </p>
            <div className="flex items-center gap-4">

            </div>
          </div>

          {/* Right: Vertical/Grid Steps */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-px bg-black border border-black">
            {steps.map((step) => (
              <div key={step.id} className="bg-white p-12 hover:bg-gray-50 transition-colors group">
                <div className="flex justify-between items-start mb-12">
                  <div className="text-4xl font-black tracking-tighter text-gray-200 group-hover:text-black transition-colors">
                    {step.id}
                  </div>
                  <div className="p-3 border border-black group-hover:bg-black group-hover:text-white transition-all">
                    <step.icon size={24} strokeWidth={1.5} />
                  </div>
                </div>

                <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">{step.title}</h4>
                <p className="text-lg text-gray-500 leading-relaxed group-hover:text-gray-900 transition-colors">
                  {step.description}
                </p>

                <div className="mt-12 h-1 bg-gray-100 w-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-black w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default About;