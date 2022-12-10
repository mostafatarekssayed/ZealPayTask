import {http} from './Http';
import { LocationModel } from "../models/LocationModel";

export const listUsers = () => {
  return http.get('/user');
};

export const addUser = (
  name: string,
  email: string,
  locations: LocationModel[],
) => {
  return http.post('/user', {
    locations,
    name,
    email,
  });
};

export const patchUser = (
  name: string,
  email: string,
  locations: LocationModel[],
) => {
  return http.patch(`/user/${email}`, {
    locations,
    name,
    email,
  });
};

export const deleteUser = (email: string) => {
  return http.delete(`/user/${email}`);
};
