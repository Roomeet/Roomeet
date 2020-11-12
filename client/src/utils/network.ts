import axios from 'axios';
import { logout } from './authUtils';

const network = axios.create({});

const getToken = () => localStorage.getItem('token');

network.interceptors.request.use(
  (config:any) => {
    // Do something before request is sent
    config.headers.Authorization = `bearer ${getToken()}`;
    return config;
  },
);

network.interceptors.response.use(
  (config: any) => {
    console.log('RESPONSE', config);
    localStorage.setItem('token', config.data.accessToken);
    localStorage.setItem('email', config.data.email);
    return config;
  },
  (error : any) => {
    if (error.response.status === 401) {
      logout();
    }
    return error;
  },
);

export default network;
