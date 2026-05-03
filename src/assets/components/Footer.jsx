import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black py-12 px-6 md:px-12 mt-20">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tighter uppercase">VoteSetu</span>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <Link to="/" className="hover:opacity-50 transition-opacity">Home</Link>
          <Link to="/dashboard" className="hover:opacity-50 transition-opacity">Dashboard</Link>
          <Link to="/assistance" className="hover:opacity-50 transition-opacity">AI Assistant</Link>
          <a href="#" className="hover:opacity-50 transition-opacity">Privacy Policy</a>
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
          &copy; 2026 VoteSetu | Dynamic Democracy Engine
        </div>
      </div>
    </footer>
  );
};

export default Footer;
