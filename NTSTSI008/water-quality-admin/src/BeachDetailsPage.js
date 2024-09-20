import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { MapPin, Droplet, ThermometerSun, Wind, MessageSquare } from 'lucide-react';
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
    waterQuality: 'Good',
    temperature: '22°C',
    windSpeed: '15 km/h',
    description: 'A beautiful sandy beach with crystal clear waters, perfect for swimming and sunbathing.',
    coordinates: coordinates,
  });
  const [weather, setWeather] = useState(null);
  const mapRef = useRef(null)

  useEffect(() => {
    fetchBeachData();
    fetchCommunityPosts();
    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 600000); // Update weather every 10 minutes
    return () => clearInterval(intervalId);
  }, [beachName, coordinates]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [mapRef]);

  const fetchBeachData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/beaches/${beachName}`);
      setBeachData(prev => ({ ...prev, ...response.data, coordinates }));
    } catch (error) {
      console.error('Error fetching beach data:', error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${OPENWEATHER_API_KEY}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchCommunityPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/community/posts/${beachName}`);
      setCommunityPosts(response.data);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/community/posts', {
        beachName: beachName,  // Use the beachName from the URL params
        content: comment,
      });
      setComment('');
      alert('Your post has been submitted for moderation.');
      // Optionally, refresh the posts after submission
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

export default BeachDetailsPage;