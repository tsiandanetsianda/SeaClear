import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { MapPin, Droplet, ThermometerSun, Wind } from 'lucide-react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './BeachDetails.css';

const OPENWEATHER_API_KEY = 'cd605f37629117f007b32d581e8f19af';

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

const BeachDetailsPage = () => {
  const { beachName } = useParams();
  const location = useLocation();
  const { coordinates } = location.state || { coordinates: [-34.1126, 18.4662] };
  const [comment, setComment] = useState('');
  const [communityPosts, setCommunityPosts] = useState([]);
  const [beachData, setBeachData] = useState({
    name: beachName.replace(/-/g, ' '),
    location: 'Cape Town, South Africa',
    waterQuality: 'Unknown',
    values: [],
    date_sampled: null,
    temperature: '22°C',
    windSpeed: '15 km/h',
    description: 'A beautiful sandy beach with crystal clear waters, perfect for swimming and sunbathing.',
    coordinates: coordinates,
  });
  const [weather, setWeather] = useState(null);
  const mapRef = useRef(null);

  const fetchBeachData = useCallback(async () => {
    console.log('Fetching beach data for:', beachName);
    try {
      const response = await axios.get(`http://localhost:5000/api/beaches/${encodeURIComponent(beachName)}`);
      console.log('Beach data received:', response.data);
      setBeachData(prev => ({ 
        ...prev, 
        ...response.data, 
        coordinates,
        waterQuality: response.data.is_safe,
      }));
      console.log('Beach data state updated');
    } catch (error) {
      console.error('Error fetching beach data:', error);
    }
  }, [beachName, coordinates]);

  const fetchWeatherData = useCallback(async () => {
    console.log('Fetching weather data for coordinates:', coordinates);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${OPENWEATHER_API_KEY}`);
      console.log('Weather data received:', response.data);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [coordinates]);

  const fetchCommunityPosts = useCallback(async () => {
    console.log('Fetching community posts for:', beachName);
    try {
      const response = await axios.get(`http://localhost:5000/api/community/posts/${encodeURIComponent(beachName)}`);
      console.log('Community posts received:', response.data);
      setCommunityPosts(response.data);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    }
  }, [beachName]);

  useEffect(() => {
    console.log('BeachDetailsPage mounted. Beach name:', beachName);
    console.log('Coordinates:', coordinates);
    fetchBeachData();
    fetchCommunityPosts();
    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 600000); // Update weather every 10 minutes
    return () => clearInterval(intervalId);
  }, [beachName, coordinates, fetchBeachData, fetchCommunityPosts, fetchWeatherData]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [mapRef]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting comment:', comment);
    try {
      await axios.post('http://localhost:5000/api/community/posts', {
        beachName: beachName,
        content: comment,
      });
      console.log('Comment submitted successfully');
      setComment('');
      alert('Your post has been submitted for moderation.');
      fetchCommunityPosts();
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    }
  };

  const customIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  console.log('Rendering BeachDetailsPage. Current beach data:', beachData);

  return (
    <div className="beach-details">
      <header className="beach-details__header">
        <Link to="/" className="beach-details__back-button">← Back to Home</Link>
        <h1 className="beach-details__title">{beachData.name}</h1>
      </header>

      <main className="beach-details__content">
        <div className="beach-details__map-container">
          <MapContainer 
            center={coordinates} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates} icon={customIcon}>
              <Popup>
                <strong>{beachData.name}</strong><br />
                {weather && (
                  <>
                    Temperature: {Math.round(weather.main.temp)}°C<br />
                    Wind: {Math.round(weather.wind.speed * 3.6)} km/h
                  </>
                )}
              </Popup>
            </Marker>
            <MapUpdater center={coordinates} />
          </MapContainer>
        </div>

        <div className="beach-details__info">
          <div className="beach-details__info-item">
            <MapPin className="beach-details__info-icon" />
            <span>{beachData.location}</span>
          </div>
          <div className="beach-details__info-item">
            <Droplet className="beach-details__info-icon" />
            <span>Water Quality: {beachData.waterQuality}</span>
          </div>
          {weather && (
            <>
              <div className="beach-details__info-item">
                <ThermometerSun className="beach-details__info-icon" />
                <span>Temperature: {Math.round(weather.main.temp)}°C</span>
              </div>
              <div className="beach-details__info-item">
                <Wind className="beach-details__info-icon" />
                <span>Wind: {Math.round(weather.wind.speed * 3.6)} km/h</span>
              </div>
            </>
          )}
        </div>

        <div className="beach-details__water-quality">
          <h2 className="beach-details__section-title">Water Quality Information</h2>
          <p>Last sampled: {beachData.date_sampled ? new Date(beachData.date_sampled).toLocaleDateString() : 'Unknown'}</p>
          <p>Status: <span className={getWaterQualityColor(beachData.waterQuality)}>{beachData.waterQuality}</span></p>
          <p>{getWaterQualityDescription(beachData.waterQuality)}</p>
          {beachData.values && beachData.values.length > 0 && (
            <div>
              <h3>Recent Measurements:</h3>
              <ul>
                {beachData.values.map((value, index) => (
                  <li key={index}>Sample {index + 1}: {value} cfu/100ml</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="beach-details__description">
          <h2 className="beach-details__description-title">Description</h2>
          <p>{beachData.description}</p>
        </div>

        <div className="beach-details__community">
          <h2 className="beach-details__community-title">Community Posts</h2>
          <form onSubmit={handleCommentSubmit} className="beach-details__comment-form">
            <textarea
              className="beach-details__comment-input"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience at this beach..."
              required
            ></textarea>
            <button type="submit" className="beach-details__submit-button">
              Submit Post
            </button>
          </form>

          <div className="beach-details__posts">
            {communityPosts.length === 0 ? (
              <p>No approved posts yet. Be the first to share your experience!</p>
            ) : (
              communityPosts.map((post) => (
                <div key={post.post_id} className="beach-details__post">
                  <div className="post-header">
                    <span className="post-author">{post.author || 'Anonymous'}</span>
                    <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
                  </div>
                  <p className="post-content">{post.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const getWaterQualityColor = (quality) => {
  switch (quality) {
    case 'Excellent':
    case 'Good':
      return 'text-green-500';
    case 'Sufficient':
      return 'text-yellow-500';
    case 'Poor':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const getWaterQualityDescription = (quality) => {
  switch (quality) {
    case 'Excellent':
    case 'Good':
      return 'This beach is safe to swim in. The water quality is good for your health.';
    case 'Sufficient':
      return 'This beach is generally safe, but caution is advised. The water quality is acceptable.';
    case 'Poor':
      return 'This beach is unsafe to swim in due to pollution. The water quality is affected.';
    default:
      return 'Water quality information is not available for this beach.';
  }
};

export default BeachDetailsPage;