import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-600 text-white">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">SeaClear</Link>

        {/* Hamburger Icon for Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Links for Desktop and Mobile */}
        <div className={`flex-col md:flex-row md:flex md:space-x-4 mt-2 md:mt-0 ${menuOpen ? 'flex' : 'hidden'}`}>
          <Link to="/education" className="text-white hover:text-blue-200">Learn More</Link>
          <Link to="/about" className="text-white hover:text-blue-200">About</Link>
          <Link to="/community" className="text-white hover:text-blue-200">Community</Link>
          <Link to="/login" className="bg-white text-blue-500 px-2 py-0 rounded-full hover:bg-blue-100 transition duration-300">Admin Login</Link>
          <Link to="/report" className="text-white hover:text-blue-200">Report an Issue</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
