import React from 'react';
import { ArrowUpRight, Calendar, Newspaper, ExternalLink } from 'lucide-react';

const Insights = () => {
  const news = [
    {
      date: "May 04, 2026",
      title: "ECI Announces Digital ID Integration",
      excerpt: "The Election Commission of India has approved the integration of Digilocker-based voter IDs for the upcoming local elections.",
      tag: "Policy"
    },
    {
      date: "May 02, 2026",
      title: "AI Literacy Program for New Voters",
      excerpt: "VoteSetu is partnering with local NGOs to deploy AI-driven workshops across 500+ rural constituencies.",
      tag: "Initiative"
    },
    {
      date: "April 28, 2026",
      title: "Overseas Registration Simplified",
      excerpt: "A new streamlined process has been launched for Non-Resident Indians to register without physical presence.",
      tag: "Update"
    },
    {
      date: "April 25, 2026",
      title: "Voter Turnout Predictions 2026",
      excerpt: "Early demographic analysis suggests a record-breaking 72% turnout in the upcoming state assembly phases.",
      tag: "Data"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white text-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              Voting <br /> Insights
            </h2>
            <p className="text-gray-500 mt-6 text-lg uppercase tracking-widest leading-relaxed">
              Latest news, regulatory updates, and democratic trends from across India.
            </p>
          </div>
          <div className="text-right">
            <button className="inline-flex items-center gap-2 border-2 border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              View All News <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.map((item, index) => (
            <div key={index} className="group cursor-pointer border-b border-black pb-8 flex flex-col justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-3 py-1">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                    <Calendar size={12} /> {item.date}
                  </div>
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-4 group-hover:underline">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {item.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Read Article <Newspaper size={14} />
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Insights;

