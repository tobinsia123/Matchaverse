import React from 'react';
import './MatchaSpotCard.css';

const MatchaSpotCard = ({ spot, userLocation }) => {
  // Convert rating to number if it's a string
  const rating = spot.rating ? parseFloat(spot.rating) : null;
  
  const renderStars = (rating) => {
    if (!rating) return null;
    const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    if (isNaN(numRating)) return null;
    
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - Math.ceil(numRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return <div className="stars">{stars}</div>;
  };

  // Calculate distance from user location
  const calculateDistance = () => {
    if (!userLocation || !spot.latitude || !spot.longitude) return null;
    
    const [userLat, userLng] = userLocation;
    const spotLat = parseFloat(spot.latitude);
    const spotLng = parseFloat(spot.longitude);
    
    // Haversine formula
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 3959; // Earth's radius in miles
    
    const dLat = toRad(spotLat - userLat);
    const dLng = toRad(spotLng - userLng);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLat)) * Math.cos(toRad(spotLat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance < 0.1 ? '< 0.1 mi' : `${distance.toFixed(1)} mi`;
  };

  const handleGetDirections = (e) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`;
    window.open(url, '_blank');
  };

  const distance = calculateDistance();

  return (
    <div 
      id={`spot-${spot.id}`}
      className={`matcha-spot-card ${spot.is_featured ? 'featured' : ''}`}
    >
      {spot.is_featured && (
        <div className="featured-badge">Featured</div>
      )}
      
      {distance && (
        <div className="distance-badge">📍 {distance}</div>
      )}
      
      {spot.image_url ? (
        <div className="spot-image-container">
          <img src={spot.image_url} alt={spot.name} className="spot-image" />
        </div>
      ) : (
        <div className="spot-image-placeholder">
          <span className="placeholder-icon">🍵</span>
        </div>
      )}
      
      <div className="spot-content">
        <h3 className="spot-name">{spot.name}</h3>
        
        {rating && !isNaN(rating) && (
          <div className="spot-rating">
            {renderStars(rating)}
            <span className="rating-value">{rating.toFixed(1)}</span>
            {spot.review_count > 0 && (
              <span className="review-count">({spot.review_count} reviews)</span>
            )}
          </div>
        )}
        
        <p className="spot-address">{spot.full_address}</p>
        
        {spot.description && (
          <p className="spot-description">{spot.description}</p>
        )}
        
        <div className="spot-details">
          {spot.price_range && (
            <span className="price-range">{spot.price_range}</span>
          )}
          {spot.hours && (
            <span className="hours">{spot.hours}</span>
          )}
        </div>
        
        <div className="spot-actions">
          {spot.latitude && spot.longitude && (
            <button 
              className="action-btn directions"
              onClick={handleGetDirections}
              title="Get directions"
            >
              🗺️ Directions
            </button>
          )}
          {spot.phone && (
            <a href={`tel:${spot.phone}`} className="action-btn phone">
              📞 Call
            </a>
          )}
          {spot.website && (
            <a 
              href={spot.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn website"
            >
              🌐 Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchaSpotCard;

