import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/spots';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const matchaSpotAPI = {
  // Get all matcha spots
  getAll: (params = {}) => api.get('/', { params }),
  
  // Get a single matcha spot by ID
  getById: (id) => api.get(`/${id}/`),
  
  // Get featured spots
  getFeatured: () => api.get('/featured/'),
  
  // Get top-rated spots
  getTopRated: () => api.get('/top_rated/'),
  
  // Create a new matcha spot
  create: (data) => api.post('/', data),
  
  // Update a matcha spot
  update: (id, data) => api.put(`/${id}/`, data),
  
  // Delete a matcha spot
  delete: (id) => api.delete(`/${id}/`),
};

export default api;

