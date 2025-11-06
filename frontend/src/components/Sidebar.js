import React, { useState } from 'react';
import MatchaSpotCard from './MatchaSpotCard';
import LoadingSkeleton from './LoadingSkeleton';
import './Sidebar.css';

const Sidebar = ({ spots, isOpen, onClose, onSpotClick, searchTerm, onSearchChange, filter, onFilterChange, showFeaturedOnly, onFeaturedToggle, onClearFilters, loading, userLocation }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            <span className="sidebar-icon">🍵</span>
            Matcha Spots
          </h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-search-section">
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search matcha spots..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
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
                  onChange={(e) => onFilterChange({ ...filter, city: e.target.value })}
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
                  onChange={(e) => onFilterChange({ ...filter, price_range: e.target.value })}
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
                    onChange={(e) => onFeaturedToggle(e.target.checked)}
                  />
                  <span>Featured Only</span>
                </label>
              </div>

              <button
                className="clear-filters-btn"
                onClick={onClearFilters}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="sidebar-results">
            <div className="results-header">
              <h3>
                {loading ? (
                  'Loading...'
                ) : spots.length === 0 ? (
                  'No matcha spots found'
                ) : (
                  `${spots.length} Spot${spots.length !== 1 ? 's' : ''}`
                )}
              </h3>
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : spots.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🍵</span>
                <p>No matcha spots match your criteria.</p>
              </div>
            ) : (
              <div className="spots-list">
                {spots.map((spot, index) => (
                  <div 
                    key={spot.id} 
                    onClick={() => onSpotClick(spot)}
                    className="spot-card-wrapper"
                    style={{
                      animation: `fadeInUp 0.5s ease forwards`,
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0
                    }}
                  >
                    <MatchaSpotCard spot={spot} userLocation={userLocation} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

