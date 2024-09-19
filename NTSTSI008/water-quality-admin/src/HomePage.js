import axios from 'axios';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [beaches, setBeaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/beaches');
        console.log("Fetched beaches:", response.data);  // Debug log
        setBeaches(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching beaches:', error);
        setError('Failed to load beaches. Please try again later.');
        setLoading(false);
      }
    };

    fetchBeaches();
  }, []);

  const filteredBeaches = beaches.filter(beach =>
    beach.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <header className="bg-blue-500 text-white">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-bold">SeaClear</Link>
            <div className="flex space-x-4 items-center">
              <Link to="/education" className="text-white hover:text-blue-200">Learn</Link>
              <Link to="/about" className="text-white hover:text-blue-200">About</Link>
              <Link to="/community" className="text-white hover:text-blue-200">Community</Link> {/* New community tab */}
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
                placeholder="Search for a beach"
                className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-0 top-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 h-full aspect-square flex items-center justify-center">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-white mt-8">Loading beaches...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBeaches.map((beach) => (
              <BeachCard key={beach.name} {...beach} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const BeachCard = ({ name, is_safe, date_sampled }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={`/images/Beach-Image.jpg`} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-sm mb-2">Water Quality: 
        <span className={`font-semibold ${is_safe === "Safe" ? 'text-green-600' : 'text-yellow-600'}`}>
          {is_safe || 'Unknown'}
        </span>
      </p>
      <p className="text-sm mb-2">Last Sampled: {date_sampled ? new Date(date_sampled).toLocaleDateString() : 'Unknown'}</p>
      <Link to={`/beach/${name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
        View Details
      </Link>
    </div>
  </div>
);

export default HomePage;