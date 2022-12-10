import axios from 'axios';
import {endpoint} from '../contsants/constants';

const instance = axios.create({
  baseURL: endpoint,
});

instance.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

instance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
})
export const http = instance;
