
import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import { MenuIcon, XIcon } from './Icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-indigo-600">
          Innovate
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="text-gray-600 hover:text-indigo-600 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
            <a href="#contact" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Contact Us
            </a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white absolute top-full left-0 w-full shadow-md`}>
        <div className="flex flex-col items-center space-y-4 py-4">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-indigo-600 transition-colors py-2">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors w-1/2 text-center">
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
