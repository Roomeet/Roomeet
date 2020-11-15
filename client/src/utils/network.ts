import axios from 'axios';
import Cookies from 'js-cookie';

const network = axios.create({});

const getToken = () => Cookies.get('accessToken');

network.interceptors.request.use(
  (config:any) => {
    // Do something before request is sent
    config.headers.Authorization = `bearer ${getToken()}`;
    return config;
  },
);

export default network;
