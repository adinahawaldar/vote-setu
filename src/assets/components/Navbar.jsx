import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LEFT: Brand */}
          <div className="text-xl font-bold tracking-tighter uppercase cursor-pointer">
            VoteSetu
          </div>

          {/* DESKTOP: Navigation & Utilities */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex gap-8 text-sm font-medium uppercase tracking-widest text-black">
              {['Home', 'Dashboard', 'Assistant', 'Simulation'].map((item) => (
                <a key={item} href="#" className="hover:opacity-50 transition-opacity">{item}</a>
              ))}
            </div>
            
            <div className="flex items-center gap-6 border-l border-gray-200 pl-8">
              <button className="text-sm font-medium uppercase tracking-widest hover:opacity-50">EN / हिंदी</button>
              <button className="text-sm font-medium uppercase tracking-widest hover:opacity-50">Voice</button>
              <button className="bg-black text-white px-6 py-2 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors">
                Login
              </button>
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
        <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-6 text-sm font-medium uppercase tracking-widest text-center">
          {['Home', 'Dashboard', 'Assistant', 'Simulation'].map((item) => (
            <a key={item} href="#" onClick={() => setIsOpen(false)}>{item}</a>
          ))}
          <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
            <button>EN / हिंदी</button>
            <button>Voice</button>
            <button className="bg-black text-white py-3">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;