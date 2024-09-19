import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './HomePage.css';


const beachImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1535262412227-85541e910204?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501950183564-3c8b915a5c74?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1528150230181-99bbf7b22162?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1536759808958-bccfbc1ec1d2?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=400&h=300&fit=crop",
  
];


const getRandomBeachImage = () => {
  return beachImages[Math.floor(Math.random() * beachImages.length)];
};

const beaches = [
  { name: "Bailey's Cottage Beach", address: "Main Road, Muizenberg", lat: -34.1126, lng: 18.4662 },
  { name: "Bakoven Beach", address: "Victoria Road, Bakoven", lat: -34.0023, lng: 18.3442 },
  { name: "Beta Beach", address: "Victoria Road, Bakoven", lat: -33.9603, lng: 18.3731 },
  { name: "Big Bay Beach", address: "Marine Drive, Big Bay", lat: -33.7744, lng: 18.4457 },
  { name: "Bikini Beach", address: "Beach Road, Gordon's Bay", lat: -34.1656, lng: 18.8588 },
  { name: "Blaauwberg Beach", address: "Otto du Plessis Drive, Bloubergstrand", lat: -33.8102, lng: 18.4695 },
  { name: "Blue Waters Beach", address: "Cnr Lucannon Drive and Michael Road, Strandfontein", lat: -34.0813, lng: 18.5797 },
  { name: "Broken Baths Beach", address: "Sea Point Promenade", lat: -33.9165, lng: 18.3854 },
  { name: "Camps Bay Beach", address: "Victoria Road, Camps Bay", lat: -33.9506, lng: 18.3775 },
  { name: "Cayman Beach", address: "Octopus Road, Gordon’s Bay", lat: -34.1452, lng: 18.8543 },
  { name: "Cemetery Beach", address: "Baden Powell Drive, Muizenberg", lat: -34.1023, lng: 18.4867 },
  { name: "Clifton 1st Beach", address: "Victoria Road, Clifton", lat: -33.9338, lng: 18.3769 },
  { name: "Clifton 2nd Beach", address: "Victoria Road, Clifton", lat: -33.9364, lng: 18.3774 },
  { name: "Clifton 3rd Beach", address: "Victoria Road, Clifton", lat: -33.9388, lng: 18.3762 },
  { name: "Clifton 4th Beach", address: "Victoria Road, Clifton", lat: -33.9404, lng: 18.3751 },
  { name: "Clovelly Beach", address: "Main Road, Clovelly", lat: -34.1321, lng: 18.4395 },
  { name: "Cosy Bay", address: "Victoria Road, Oudekraal", lat: -33.9821, lng: 18.3613 },
  { name: "Dalebrook Beach", address: "Main Road, Kalk Bay", lat: -34.1236, lng: 18.4527 },
  { name: "Danger Beach", address: "Main Road, St James", lat: -34.1201, lng: 18.4564 },
  { name: "Dappat se Gat Beach", address: "Clarence Drive, R44, Gordon`s Bay", lat: -34.2253, lng: 18.8397 },
  { name: "Dolphin Beach", address: "Marine Drive, Table View", lat: -33.8303, lng: 18.4823 },
  { name: "East Beach", address: "Royal Road, Muizenberg", lat: -34.1023, lng: 18.4842 },
  { name: "Fish Hoek Beach", address: "Beach Road, Fish Hoek", lat: -34.1375, lng: 18.4337 },
  { name: "Fisherman's Beach", address: "Main Road, Simon’s Town", lat: -34.2037, lng: 18.4563 },
  { name: "Frank's Beach", address: "Main Road, Simon’s Town", lat: -34.2035, lng: 18.4568 },
  { name: "Glen Beach", address: "Victoria Road, Camps Bay", lat: -33.9468, lng: 18.3777 },
  { name: "Glencairn Beach", address: "Main Road, Glencairn", lat: -34.1599, lng: 18.4317 },
  { name: "Gordon's Bay Beach", address: "Beach Road, Gordon’s Bay", lat: -34.1570, lng: 18.8667 },
  { name: "Granger Bay Beach", address: "Beach Road, Green Point", lat: -33.8999, lng: 18.4140 },
  { name: "Harmony Park Beach", address: "Gordon’s Bay Road, Gordon’s Bay", lat: -34.1390, lng: 18.8462 },
  { name: "Hendon Park Resort Beach", address: "Beach Road, Gordon’s Bay", lat: -34.1534, lng: 18.8609 },
  { name: "Hout Bay Beach", address: "Beach Road, Hout Bay", lat: -34.0460, lng: 18.3547 },
  { name: "Kalk Bay Beach", address: "Main Road, Kalk Bay", lat: -34.1277, lng: 18.4488 },
  { name: "Klippies Bay Beach", address: "Clarence Drive, R44, Gordon’s Bay", lat: -34.2442, lng: 18.8532 },
  { name: "Kogel Bay Beach", address: "Clarence Drive, R44, Gordon’s Bay", lat: -34.2343, lng: 18.8491 },
  { name: "Llandudno Beach", address: "Llandudno Road, Llandudno", lat: -34.0080, lng: 18.3412 },
  { name: "Long Beach, Kommetjie", address: "M65, Kommetjie", lat: -34.1325, lng: 18.3344 },
  { name: "Long Beach, Simon's Town", address: "Main Road, Simon's Town", lat: -34.1876, lng: 18.4259 },
  { name: "Macassar Beach", address: "Beach Road, Macassar", lat: -34.0748, lng: 18.7399 },
  { name: "Mackerel Beach", address: "M65, Dido Valley", lat: -34.1728, lng: 18.4282 },
  { name: "Maiden's Cove Beach", address: "Victoria Road, Camps Bay", lat: -33.9448, lng: 18.3734 },
  { name: "Melkbaai Beach", address: "Beach Road, Strand", lat: -34.1100, lng: 18.8205 },
  { name: "Melkbosstrand Beach", address: "7th Avenue, Melkbosstrand", lat: -33.7241, lng: 18.4421 },
  { name: "Miller's Point Beach", address: "Murdock Valley, False Bay", lat: -34.2312, lng: 18.4760 },
  { name: "Miller's Point Day Camp Area", address: "Miller's Point Road, Murdock Valley", lat: -34.2288, lng: 18.4704 },
  { name: "Milnerton Beach", address: "Lagoon Beach Drive, Milnerton", lat: -33.8922, lng: 18.4819 },
  { name: "Milnerton Lagoon", address: "Lagoon Beach Drive, Milnerton", lat: -33.8918, lng: 18.4834 },
  { name: "Milton Beach", address: "Beach Road, Sea Point", lat: -33.9143, lng: 18.3866 },
  { name: "Misty Cliffs Beach", address: "M65, Misty Cliffs", lat: -34.1844, lng: 18.3622 },
  { name: "Mnandi Beach", address: "Weltevreden Road, Rocklands, Mitchells Plain", lat: -34.0755, lng: 18.6116 },
  { name: "Monwabisi Beach", address: "Baden Powell Drive, Khayelitsha", lat: -34.0720, lng: 18.6896 },
  { name: "Mostertsbaai Beach", address: "Beach Road, Strand", lat: -34.1216, lng: 18.8308 },
  { name: "Muizenberg Beach", address: "Main Road, Muizenberg", lat: -34.1081, lng: 18.4698 },
  { name: "Nine Miles Beach", address: "Surf Road, Strandfontein", lat: -34.0880, lng: 18.5548 },
  { name: "Queen's Beach", address: "Beach Road, Sea Point", lat: -33.9213, lng: 18.3780 },
 { name: "Rocklands Beach", address: "Beach Road, Sea Point", lat: -33.90834394780414, lng: 18.393268924068494 },
{ name: "Rocky Beach", address: "Beach Road, Muizenberg", lat: -34.10872155604728, lng: 18.47021117486384 },
{ name: "Saunders' Rocks Beach", address: "Beach Road, Sea Point", lat: -33.92372306211277, lng: 18.3769243568783 },
{ name: "Seaforth Beach", address: "Cnr Kleintuin Road and M4, Simon's Town", lat: -34.19975446247689, lng: 18.4499941581522 },
{ name: "Shelley Beach", address: "Shelley Beach, Glencairn", lat: -34.16563909884276, lng: 18.432778648087886 },
{ name: "Silwerstroomstrand Beach", address: "Silwerstroom, Atlantis", lat: -33.58088743247886, lng: 18.35628041656802 },
{ name: "Small Bay Beach", address: "Otto du Plessis Drive, Blouberg", lat: -33.79548367005577, lng: 18.45805315105121 },
{ name: "Soetwater Beach", address: "Lighthouse Road, Kommetjie", lat: -34.158003437814514, lng: 18.328369931375047 },
{ name: "Sonwabe Beach", address: "Baden Powell Drive, Muizenberg", lat: -34.09594930501099, lng: 18.510096712430855 },
{ name: "Spark's Bay Beach", address: "Clarence Drive, R44, Gordon’s Bay", lat: -34.24764811353642, lng: 18.854379341369462 },
{ name: "St James Beach", address: "Main Road, St James", lat: -34.118251375174864, lng: 18.45898943223609 },
{ name: "Strand Beach", address: "Beach Road, Strand", lat: -34.1057164363823, lng: 18.817171438415354 },
{ name: "Strandfontein Beach", address: "Strandfontein Road, Strandfontein", lat: -34.08755935015142, lng: 18.556589254759523 },
{ name: "Sunrise Beach", address: "Sunrise Circle, Muizenberg", lat: -34.10096153813111, lng: 18.48944435496233 },
{ name: "Sunset Beach, Gordon's Bay", address: "Beach Road, Gordon’s Bay", lat: -34.15929707736061, lng: 18.8675064952462 },
{ name: "Sunset Beach, Milnerton", address: "Forata Drive, Sunset Beach", lat: -33.85444974462016, lng: 18.488898169495886 },
{ name: "Surfer's Corner Beach", address: "Beach Road, Muizenberg", lat: -34.108646823488314, lng: 18.469849097089316 },
{ name: "Table View Beach", address: "Otto Du Plessis, Table View", lat: -33.821709214673774, lng: 18.476122708693214 },
{ name: "Three Anchor Bay Beach", address: "Beach Road, Green Point", lat: -33.9062320088816, lng: 18.39800210179859 },
{ name: "Water's Edge Beach", address: "Kleintuin Road, Simon's Town", lat: -34.19471600562603, lng: 18.448663956612293 },
{ name: "Windmill Beach", address: "Cnr M4 and Bellevue Road, Simon's Town", lat: -34.20054226395493, lng: 18.457222155023242 },
{ name: "Wireless Road Beach", address: "Wireless Road, Kommetjie", lat: -34.13132480860037, lng: 18.33599606515714 },
{ name: "Witsands Beach", address: "Witsands, Scarborough", lat: -34.20120593463397, lng: 18.371606318368837 } ];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);
  const [filteredBeaches, setFilteredBeaches] = useState(beaches);
  const mapContainer = useRef(null);

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    const newMap = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [18.4241, -33.9249], // Cape Town coordinates
      zoom: 10,
    });
  
    newMap.on('load', () => {
      beaches.forEach((beach) => {
        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 15,
          className: 'beach-popup'
        }).setHTML(`<div>${beach.name}</div>`);
  
        const marker = new maplibregl.Marker({
          color: '#37b8ca'
        })
          .setLngLat([beach.lng, beach.lat])
          .addTo(newMap);
  
        const markerElement = marker.getElement();
        
        markerElement.addEventListener('mouseenter', () => {
          popup.setLngLat([beach.lng, beach.lat]).addTo(newMap);
        });
  
        markerElement.addEventListener('mouseleave', () => {
          popup.remove();
        });
  
        markerElement.addEventListener('click', () => handleBeachSelection(beach));
      });
    });
  
    setMap(newMap);
  };

  const handleBeachSelection = useCallback((beach) => {
    const beachNameForUrl = beach.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/beach/${beachNameForUrl}`, { state: { coordinates: [beach.lat, beach.lng] } });
  }, [navigate]);

  const handleSearchInput = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);

    if (input.trim().length > 0) {
      const filtered = beaches.filter(
        (beach) => beach.name.toLowerCase().includes(input) || beach.address.toLowerCase().includes(input)
      );
      setSearchResults(filtered.slice(0, 5)); // Limit to 5 results for dropdown
      setFilteredBeaches(filtered); // Update filtered beaches for cards
    } else {
      setSearchResults([]);
      setFilteredBeaches(beaches); // Reset to all beaches when search is empty
    }
  };

  const handleAdminClick = () => {
    navigate('/login');
  };

  const handleLearnMoreClick = () => {
    navigate('/education');
  };

  const getRandomBeachImage = () => {
    return beachImages[Math.floor(Math.random() * beachImages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <header className="bg-blue-500 text-white">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex-1"> {/* This will take up all available space on the left */}
              <Link to="/" className="text-white text-2xl font-bold">SeaClear</Link>
            </div>
            <div className="flex-1 flex justify-end"> {/* This will push the button to the far right */}
              <button onClick={handleAdminClick} className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300">Admin Login</button>
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
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for beaches..."
                value={searchInput}
                onChange={handleSearchInput}
                className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="absolute right-0 top-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 h-full aspect-square flex items-center justify-center">
                <Search size={20} />
              </button>
            </div>
            {searchResults.length > 0 && (
              <ul className="search-results bg-white mt-2 rounded-lg shadow-md">
                {searchResults.map((beach, index) => (
                  <li key={`result-${index}`} onClick={() => handleBeachSelection(beach)} className="p-2 hover:bg-blue-100 cursor-pointer">
                    {beach.name}, {beach.address}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Beaches in Cape Town</h2>
            <button onClick={handleLearnMoreClick} className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300">
              Learn More
            </button>
          </div>
          <div ref={mapContainer} className="w-full h-96 rounded-lg overflow-hidden"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeaches.map((beach, index) => (
            <BeachCard 
            key={index} 
            beach={beach} 
            onSelect={handleBeachSelection}
            image={getRandomBeachImage()}
          />
          ))}
        </div>
      </main>
    </div>
  );
};

const BeachCard = ({ beach, onSelect, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => onSelect(beach)}>
    <div className="w-full h-48 bg-gray-200 overflow-hidden">
      <img 
        src={image} 
        alt={beach.name} 
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop';
        }}
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{beach.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{beach.address}</p>
      <span className={`status ${beach.name.includes("Clifton") ? "text-red-500" : "text-green-500"}`}>
        {beach.name.includes("Clifton") ? "UNSAFE" : "SAFE"}
      </span>
      <p className="mt-2 text-sm text-gray-600">
        {beach.name.includes("Clifton") 
          ? "This beach is unsafe to swim in due to pollution. The water quality is affected."
          : "This beach is safe to swim in. The water quality is not harmful for your health."}
      </p>
    </div>
  </div>
);

export default HomePage;