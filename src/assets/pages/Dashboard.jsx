import React, { useState } from 'react';
import { 
  User, 
  CheckCircle, 
  Clock, 
  Lock, 
  MapPin, 
  MessageSquare, 
  FileText, 
  Info, 
  ArrowRight,
  Send,
  X,
  ArrowLeft
} from 'lucide-react';

const Dashboard = () => {
  const [view, setView] = useState('onboarding'); // 'onboarding' or 'dashboard'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', age: '', location: '' });
  const [analysisData, setAnalysisData] = useState(null);
  
  // AI Assistant State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnboard = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Save basic info
      await fetch('http://127.0.0.1:5000/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // 2. Get AI Analysis
      const res = await fetch('http://127.0.0.1:5000/api/dashboard-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setAnalysisData(data);
      setView('dashboard');
    } catch (error) {
      console.error("Onboarding Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAiAsk = async (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiResponse("");
    try {
      const res = await fetch('http://127.0.0.1:5000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: aiQuestion })
      });
      const data = await res.json();
      setAiResponse(data.answer);
    } catch (error) {
      setAiResponse("API Key issue. Please check backend config.");
    } finally {
      setIsAiLoading(false);
    }
  };

  if (view === 'onboarding') {
    return (
      <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center p-6">
        <div className="max-w-md w-full border-2 border-black p-8 md:p-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">VOTE SETU</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-12">Building your bridge to democracy</p>
          
          <form onSubmit={handleOnboard} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Full Name</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border-b-2 border-black py-2 outline-none text-sm font-bold focus:border-gray-400 transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Your Age</label>
              <input 
                required
                type="number" 
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full border-b-2 border-black py-2 outline-none text-sm font-bold focus:border-gray-400 transition-colors"
                placeholder="18+"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Location (City/State)</label>
              <input 
                required
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border-b-2 border-black py-2 outline-none text-sm font-bold focus:border-gray-400 transition-colors"
                placeholder="e.g. Mumbai, Maharashtra"
              />
            </div>
            
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-black text-white py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 transition-all disabled:bg-gray-400"
            >
              {loading ? "Analyzing..." : "Generate Dashboard"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans p-6 md:p-12">
      {/* Header */}
      <header className="mb-12 border-b border-black pb-6 flex justify-between items-end">
        <div className="cursor-pointer" onClick={() => setView('onboarding')}>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">VOTE SETU</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mt-2 flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Entry
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          <p className="text-xs text-gray-400 uppercase tracking-tighter">{formData.location}</p>
        </div>
      </header>

      {analysisData?.warning && (
        <div className="mb-8 border-2 border-dashed border-black p-4 text-xs font-bold uppercase text-center bg-gray-50">
          Note: {analysisData.warning}
        </div>
      )}

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Status Card */}
        <section className="md:col-span-3 border-2 border-black p-6 bg-black text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full">
              <User className="text-black w-8 h-8" />
            </div>
            <div>
              <p className="text-xs uppercase text-gray-400 tracking-widest">Personalized for</p>
              <h2 className="text-2xl font-bold">{formData.name}</h2>
            </div>
          </div>
          <div className="flex gap-8 text-center">
            <div>
              <p className="text-xs uppercase text-gray-400">Age</p>
              <p className="text-xl font-bold">{formData.age}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-400">Eligibility</p>
              <p className={`text-xl font-bold px-2 uppercase border ${analysisData?.isEligible ? 'border-white' : 'border-red-500 text-red-500'}`}>
                {analysisData?.isEligible ? "Eligible" : "Not Eligible"}
              </p>
            </div>
          </div>
        </section>

        {/* Next Step */}
        <section className="md:col-span-2 border-2 border-black p-8 flex flex-col justify-between">
          <div>
            <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">Your Next Step</span>
            <h2 className="text-5xl font-black mt-6 tracking-tighter uppercase leading-tight">
              {analysisData?.nextStep?.title}
            </h2>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              {analysisData?.nextStep?.description}
            </p>
          </div>
          <button 
            onClick={() => analysisData?.nextStep?.link && window.open(analysisData.nextStep.link, '_blank')}
            className="mt-12 bg-black text-white px-8 py-4 font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors self-start group"
          >
            {analysisData?.nextStep?.actionCall || "How to Proceed"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>

        {/* Journey Tracker */}
        <section className="border-2 border-black p-6 flex flex-col gap-6">
          <h3 className="font-bold uppercase border-b border-black pb-2">Your Journey</h3>
          <div className="flex flex-col gap-8 relative">
            {analysisData?.journey?.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center border-2 border-black rounded-full z-10 ${step.status === 'completed' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    {step.status === 'completed' ? <CheckCircle size={16} /> : step.status === 'pending' ? <Clock size={16} /> : <Lock size={16} />}
                  </div>
                  {index < analysisData.journey.length - 1 && (
                    <div className="w-0.5 h-full bg-black absolute top-8 left-4 -z-0"></div>
                  )}
                </div>
                <div className={step.status === 'locked' ? 'opacity-30' : 'opacity-100'}>
                  <p className="text-xs font-bold tracking-tighter">{step.label}</p>
                  <p className="text-[10px] text-gray-500">{step.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Guide / AI Generated Info */}
        <div className="md:col-span-3">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Personalized Guide</h3>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-black p-6">
              <FileText className="mb-4" />
              <h4 className="font-bold uppercase mb-4 text-xs tracking-widest border-b border-black pb-2">Documents Needed</h4>
              <ul className="space-y-4">
                {analysisData?.documents?.map((doc, i) => (
                  <li key={i}>
                    <p className="text-xs font-bold uppercase">{doc.title}</p>
                    <p className="text-[10px] text-gray-500 uppercase leading-tight">{doc.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-black p-6 md:col-span-2">
              <Info className="mb-4" />
              <h4 className="font-bold uppercase mb-4 text-xs tracking-widest border-b border-black pb-2">Registration Steps</h4>
              <div className="grid grid-cols-1 gap-6">
                {analysisData?.registrationSteps?.map((step, i) => (
                  <div key={i} className="border-l-2 border-black pl-4 py-2">
                    <p className="text-sm font-bold mb-1">{i + 1}. {step.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Location Card with Real Google Maps */}
        <section className="md:col-span-3 border-2 border-black p-6 flex flex-col md:flex-row gap-8 items-center bg-gray-50">
          <div className="w-full md:w-1/2 h-64 bg-white border border-black overflow-hidden shadow-inner">
             <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(formData.location)}+polling+booth`}
                allowFullScreen
              ></iframe>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="font-black uppercase text-2xl tracking-tighter mb-2">Polling Booth Access</h3>
            <p className="text-sm font-bold">Location Context: {formData.location}</p>
            <p className="text-xs text-gray-600 mt-2 tracking-tight leading-relaxed">
              We are showing the nearest identified polling hubs in {formData.location}. Please note that exact booth assignments are finalized by the ECI closer to the election date based on your specific ward and block.
            </p>
            <button 
              onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(formData.location)}+polling+booth`, '_blank')}
              className="mt-4 border border-black px-4 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors"
            >
              Expand Search
            </button>
          </div>
        </section>

      </main>

      {/* AI Assistant Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        {isAiOpen ? (
          <div className="bg-white border-2 border-black w-80 md:w-96 shadow-2xl flex flex-col">
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <h3 className="font-bold uppercase text-xs tracking-widest">AI Assistant</h3>
              <button onClick={() => setIsAiOpen(false)}><X size={18} /></button>
            </div>
            <div className="h-64 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50">
              <div className="bg-black text-white p-3 text-xs self-start max-w-[80%] uppercase tracking-tighter">
                Hello {formData.name}, ask me anything about voting in {formData.location}.
              </div>
              {aiResponse && <div className="bg-white border border-black p-3 text-xs leading-relaxed uppercase">{aiResponse}</div>}
              {isAiLoading && <div className="animate-pulse text-[10px] uppercase font-bold text-gray-400">AI is thinking...</div>}
            </div>
            <form onSubmit={handleAiAsk} className="p-4 border-t border-black flex gap-2">
              <input 
                type="text" 
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="TYPE QUESTION..." 
                className="flex-1 bg-transparent border-b border-black text-xs p-1 outline-none uppercase"
              />
              <button type="submit" className="bg-black text-white p-2"><Send size={16} /></button>
            </form>
          </div>
        ) : (
          <button 
            onClick={() => setIsAiOpen(true)}
            className="bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <MessageSquare size={24} />
          </button>
        )}
      </div>

      <footer className="mt-24 border-t border-black pt-8 pb-12 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.5em]">VOTE SETU &copy; 2026 | DYNAMIC DEMOCRACY ENGINE</p>
      </footer>
    </div>
  );
};

export default Dashboard;
