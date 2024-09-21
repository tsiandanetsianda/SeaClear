import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Droplet, MapPin, ThermometerSun, Wind } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Link, useLocation, useParams } from 'react-router-dom';
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
  const coordinates = location.state?.coordinates || [-34.1126, 18.4662];
  
  const [beachData, setBeachData] = useState({
    name: beachName?.replace(/-/g, ' ') || '',
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
  const [comment, setComment] = useState('');
  const [communityPosts, setCommunityPosts] = useState([]);
  const mapRef = useRef(null);

  const fetchBeachData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/beaches/${encodeURIComponent(beachName)}`);
      setBeachData((prev) => ({
        ...prev,
        ...response.data,
        coordinates,
        waterQuality: response.data.is_safe || 'Unknown',
      }));
    } catch (error) {
      console.error('Error fetching beach data:', error);
    }
  };

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${OPENWEATHER_API_KEY}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [coordinates]);

  const fetchCommunityPosts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/community/posts/${encodeURIComponent(beachName)}`);
      setCommunityPosts(response.data);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    }
  }, [beachName]);

  useEffect(() => {
    fetchBeachData();
    fetchCommunityPosts();
    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 600000);
    return () => clearInterval(intervalId);
  }, [beachName, coordinates, fetchWeatherData, fetchCommunityPosts]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [mapRef]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/community/posts', {
        beachName: beachName,
        content: comment,
      });
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

  const getQualityClass = (quality) => {
    switch (quality) {
      case 'Excellent':
        return 'quality-excellent';
      case 'Good':
        return 'quality-good';
      case 'Sufficient':
        return 'quality-sufficient';
      case 'Poor':
        return 'quality-poor';
      default:
        return 'quality-unknown';
    }
  };

  return (
    <div className="beach-details">
      <header className="beach-details__header">
        <Link to="/" className="beach-details__back-button">← Back to Home</Link>
      </header>

      {/* Centered Beach Name */}
      <div className="beach-details__name">
        <h1>{beachData.name}</h1>
      </div>

      <main className="beach-details__content">
        <div className="beach-details__map-info">
          <div className="beach-details__map-container">
            <MapContainer 
              center={coordinates} 
              zoom={13} 
              style={{ height: '300px', width: '100%' }}
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

          <div className="beach-details__weather">
            <div className="beach-details__info-item">
              <MapPin className="beach-details__info-icon" />
              <span className="beach-details__info-text">{beachData.location}</span>
            </div>
            <div className="beach-details__info-item">
              <Droplet className="beach-details__info-icon" />
              <span className="beach-details__info-text">Water Quality: {beachData.waterQuality || 'Unknown'}</span>
            </div>
            {weather && (
              <>
                <div className="beach-details__info-item">
                  <ThermometerSun className="beach-details__info-icon" />
                  <span className="beach-details__info-text">Temperature: {Math.round(weather.main.temp)}°C</span>
                </div>
                <div className="beach-details__info-item">
                  <Wind className="beach-details__info-icon" />
                  <span className="beach-details__info-text">Wind: {Math.round(weather.wind.speed * 3.6)} km/h</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="beach-details__water-quality">
          <h2 className="beach-details__section-title">Water Quality Information</h2>
          <p>Last sampled: {beachData.date_sampled ? new Date(beachData.date_sampled).toLocaleDateString() : 'Unknown'}</p>
          <p className={`beach-details__water-quality-status ${getQualityClass(beachData.waterQuality)}`}>
            Status: {beachData.waterQuality}
          </p>
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
