import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const instance = axios.create({ 
  baseURL: BASE_URL + "/api" 
});

instance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
}, e=>Promise.reject(e));

export default instance;
