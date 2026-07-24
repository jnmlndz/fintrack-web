import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // tu API de NestJS
});

export default api;