import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.MODE === 'production' 
    ? '/api' 
    : 'http://localhost:8000/api', // Hubi in uu 8000 ama 5000 yahay port-kaaga local-ka
  withCredentials: true,
});

export default API;