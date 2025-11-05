import React, { useState, useEffect } from 'react';
import './App.css';
import MatchaSpotCard from './components/MatchaSpotCard';
import { matchaSpotAPI } from './services/api';

function App() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    city: '',
    price_range: '',
    is_featured: false,
  });
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    fetchSpots();
  }, [filter, showFeaturedOnly]);

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
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="matcha-icon">🍵</span>
            MatchaMap
          </h1>
          <p className="app-subtitle">Discover the best matcha spots in Irvine</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="search-section">
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search matcha spots by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="filters">
              <div className="filter-group">
                <label htmlFor="city-filter">City:</label>
                <select
                  id="city-filter"
                  className="filter-select"
                  value={filter.city}
                  onChange={(e) => setFilter({ ...filter, city: e.target.value })}
                >
                  <option value="">All Cities</option>
                  <option value="Irvine">Irvine</option>
                  <option value="Tustin">Tustin</option>
                  <option value="Costa Mesa">Costa Mesa</option>
                  <option value="Newport Beach">Newport Beach</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="price-filter">Price Range:</label>
                <select
                  id="price-filter"
                  className="filter-select"
                  value={filter.price_range}
                  onChange={(e) => setFilter({ ...filter, price_range: e.target.value })}
                >
                  <option value="">All Prices</option>
                  <option value="$">$ - Inexpensive</option>
                  <option value="$$">$$ - Moderate</option>
                  <option value="$$$">$$$ - Expensive</option>
                  <option value="$$$$">$$$$ - Very Expensive</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  />
                  <span>Featured Only</span>
                </label>
              </div>

              <button
                className="clear-filters-btn"
                onClick={() => {
                  setFilter({ city: '', price_range: '', is_featured: false });
                  setShowFeaturedOnly(false);
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading matcha spots...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p>{error}</p>
              <button onClick={fetchSpots} className="retry-btn">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="results-header">
                <h2>
                  {filteredSpots.length === 0
                    ? 'No matcha spots found'
                    : `${filteredSpots.length} Matcha Spot${filteredSpots.length !== 1 ? 's' : ''} Found`}
                </h2>
              </div>

              {filteredSpots.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">🍵</span>
                  <p>No matcha spots match your criteria. Try adjusting your filters!</p>
                </div>
              ) : (
                <div className="spots-grid">
                  {filteredSpots.map((spot) => (
                    <MatchaSpotCard key={spot.id} spot={spot} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Made with ☕ for UCI students</p>
      </footer>
    </div>
  );
}

export default App;
