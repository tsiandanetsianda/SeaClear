import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <header className="bg-blue-500 text-white">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-bold">SeaClear</Link>
            <div className="flex space-x-4 items-center">
              
              <Link to="/education" className="text-white hover:text-blue-200">Learn</Link>
              <Link to="/about" className="text-white hover:text-blue-200">About</Link>
              <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300">Admin Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect Beach Here
          </h1>
          <p className="text-xl text-white mb-8">
            Discover Cape Town's beautiful beaches and check their water quality.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="absolute right-0 top-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 h-full aspect-square flex items-center justify-center">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BeachCard name="Camps Bay" image="/images/Beach-Image.jpg" />
          <BeachCard name="Muizenberg" image="/images/beach2.jpg" />
          <BeachCard name="Clifton" image="/images/beach3.jpg" />
        </div>
      </main>
    </div>
  );
};

const BeachCard = ({ name, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <Link to={`/beach/${name.toLowerCase().replace(' ', '-')}`} className="text-blue-600 hover:underline">
        View Details
      </Link>
    </div>
  </div>
);

export default HomePage;