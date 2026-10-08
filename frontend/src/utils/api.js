import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || '/api' });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const searchProducts = (q, params = {}) =>
  API.get('/products/search', { params: { q, ...params } });

export const getCategories = () => API.get('/products/categories');

export const getCategoryProducts = (slug, params = {}) =>
  API.get(`/products/category/${slug}`, { params });

export const getProduct = (id) => API.get(`/products/${id}`);

export const getFeaturedProducts = (limit = 12) =>
  API.get('/products', { params: { featured: true, limit } });

export const getPopularProducts = (limit = 12) =>
  API.get('/products', { params: { popular: true, limit } });

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const getProfile = () => API.get('/user/profile');
export const updateProfile = (data) => API.put('/user/profile', data);
export const getSavedProducts = () => API.get('/user/saved');
export const saveProduct = (id) => API.post(`/products/save/${id}`);
export const addSearchHistory = (query) => API.post('/user/search-history', { query });

export default API;
