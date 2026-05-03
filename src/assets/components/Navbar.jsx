import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'English');

  const languages = [
    { name: 'English', code: 'English' },
    { name: 'हिंदी', code: 'Hindi' },
    { name: 'मराठी', code: 'Marathi' },
    { name: 'తెలుగు', code: 'Telugu' },
    { name: 'தமிழ்', code: 'Tamil' },
    { name: 'ಕನ್ನಡ', code: 'Kannada' },
    { name: 'বাংলা', code: 'Bengali' }
  ];

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
    // Optional: refresh page or trigger event to update other components
    window.dispatchEvent(new Event('languageChange'));
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Assistant', path: '/assistance' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* LEFT: Brand */}
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs">VS</div>
            VoteSetu
          </Link>

          {/* DESKTOP: Navigation & Utilities */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-black">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="hover:opacity-50 transition-all">{item.name}</Link>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-gray-400" />
                <select 
                  value={language}
                  onChange={handleLanguageChange}
                  className="text-[10px] font-bold uppercase tracking-widest bg-transparent border-none outline-none cursor-pointer hover:opacity-50 appearance-none"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code} className="bg-white text-black">{lang.name}</option>
                  ))}
                </select>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest hover:opacity-50 border border-black px-3 py-1">Voice</button>
            </div>
          </div>

          {/* MOBILE: Hamburger Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE: Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-6 text-[10px] font-bold uppercase tracking-widest text-center animate-in slide-in-from-top">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)} className="py-2">{item.name}</Link>
          ))}
          <div className="flex flex-col gap-4 pt-6 border-t border-gray-100 items-center">
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <select 
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent border-none outline-none font-bold uppercase"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            <button className="border border-black px-4 py-2 w-full max-w-[200px]">Voice Assistant</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;