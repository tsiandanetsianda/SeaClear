import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Droplet, ThermometerSun, Wind, MessageSquare, AlertTriangle } from 'lucide-react';

const BeachDetailsPage = () => {
  const { beachName } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Placeholder data - replace with actual data fetching logic
  const beachData = {
    name: beachName.replace('-', ' '),
    image: '/images/Beach-Image.jpg',
    location: 'Cape Town, South Africa',
    waterQuality: 'Good',
    temperature: '22°C',
    windSpeed: '15 km/h',
    warnings: ['Strong currents'],
    description: 'A beautiful sandy beach with crystal clear waters, perfect for swimming and sunbathing.',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="text-white hover:text-blue-200">← Back to Home</Link>
          <h1 className="text-3xl font-bold mt-2">{beachData.name}</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={beachData.image} alt={beachData.name} className="w-full h-64 object-cover" />
          
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <MapPin className="mr-2 text-blue-600" />
                <span>{beachData.location}</span>
              </div>
              <div className="flex items-center">
                <Droplet className="mr-2 text-blue-600" />
                <span>Water Quality: {beachData.waterQuality}</span>
              </div>
              <div className="flex items-center">
                <ThermometerSun className="mr-2 text-blue-600" />
                <span>Temperature: {beachData.temperature}</span>
              </div>
              <div className="flex items-center">
                <Wind className="mr-2 text-blue-600" />
                <span>Wind: {beachData.windSpeed}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Warnings</h2>
              {beachData.warnings.map((warning, index) => (
                <div key={index} className="flex items-center text-yellow-600">
                  <AlertTriangle className="mr-2" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p>{beachData.description}</p>
            </div>

            <div>
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <button
                    className={`mr-8 py-4 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`mr-8 py-4 text-sm font-medium ${
                      activeTab === 'community'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('community')}
                  >
                    Community
                  </button>
                </nav>
              </div>
              <div className="mt-4">
                {activeTab === 'overview' ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Water Quality History</h3>
                    {/* Add water quality chart or data here */}
                    <p>Water quality data visualization coming soon...</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Community Posts</h3>
                    {/* Add community posts or comments here */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MessageSquare className="mr-2 text-blue-600" />
                        <span className="font-semibold">John Doe</span>
                      </div>
                      <p>Great beach day! The water was perfect for swimming.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeachDetailsPage;