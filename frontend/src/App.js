import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import { matchaSpotAPI } from './services/api';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    city: '',
    price_range: '',
    is_featured: false,
  });
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const appRef = useRef(null);

  useEffect(() => {
    fetchSpots();
    
    // Handle scroll to hide landing page
    const handleScroll = () => {
      if (window.scrollY > 100 && showLanding) {
        handleEnter();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showLanding]);

  const fetchSpots = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (showFeaturedOnly) {
        response = await matchaSpotAPI.getFeatured();
        setSpots(response.data);
      } else {
        const params = {};
        if (filter.city) params.city = filter.city;
        if (filter.price_range) params.price_range = filter.price_range;
        if (filter.is_featured) params.is_featured = filter.is_featured;
        
        response = await matchaSpotAPI.getAll(params);
        setSpots(response.data.results || response.data);
      }
    } catch (err) {
      console.error('Error fetching spots:', err);
      setError('Failed to load matcha spots. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, [filter, showFeaturedOnly]);

  const handleEnter = () => {
    setShowLanding(false);
    // Prevent scrolling on map page
    document.body.classList.add('map-active');
    document.documentElement.style.overflow = 'hidden';
  };

  const handleMarkerClick = (spot) => {
    setSelectedSpot(spot);
    setSidebarOpen(true);
    // Scroll to the spot in sidebar
    setTimeout(() => {
      const element = document.getElementById(`spot-${spot.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 400);
  };

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    // You could also center the map on this spot
  };

  const filteredSpots = spots.filter(spot => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      spot.name.toLowerCase().includes(searchLower) ||
      spot.address.toLowerCase().includes(searchLower) ||
      (spot.description && spot.description.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="App" ref={appRef}>
      {showLanding && (
        <LandingPage onEnter={handleEnter} />
      )}

      <div className={`main-content ${showLanding ? 'hidden' : ''}`}>
        <MapView 
          spots={filteredSpots} 
          onMarkerClick={handleMarkerClick}
          selectedSpot={selectedSpot}
          onUserLocationChange={setUserLocation}
        />
        
        {/* Floating button to open sidebar */}
        <button 
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(true)}
          title="Open spots list"
        >
          <span className="toggle-icon">🍵</span>
          <span className="toggle-text">Spots</span>
        </button>

        <Sidebar
          spots={filteredSpots}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSpotClick={handleSpotClick}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={setFilter}
          showFeaturedOnly={showFeaturedOnly}
          onFeaturedToggle={setShowFeaturedOnly}
          onClearFilters={() => {
            setFilter({ city: '', price_range: '', is_featured: false });
            setShowFeaturedOnly(false);
            setSearchTerm('');
          }}
          loading={loading}
          userLocation={userLocation}
        />
      </div>

      {loading && !showLanding && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading matcha spots...</p>
        </div>
      )}

      {error && !showLanding && (
        <div className="error-overlay">
          <p>{error}</p>
          <button onClick={fetchSpots} className="retry-btn">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
