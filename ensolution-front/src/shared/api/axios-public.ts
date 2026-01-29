import axios from 'axios';

const baseURL = import.meta.env.DEV ? 'http://localhost:8080/api' : '/api';

export const axiosPublic = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
