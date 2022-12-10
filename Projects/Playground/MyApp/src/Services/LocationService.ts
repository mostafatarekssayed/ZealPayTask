import {http} from './Http';

export const listLocations = () => {
  return http.get('/location');
};

export const addLocationToUser = (email: string, lat: number, lng: number,name:string) => {
  return http.post(`/location/${email}`, {
    lng,
    lat,
    name,
  });
};

export const deleteLocation = (locationId: string) => {
  return http.delete(`/location/${locationId}`);
};

export const listUserLocation = (email) => {
  return http.get(`/location/${email}`);
};
