import {http} from './Http';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AdminKey} from '../contsants/constants';
import axios from "axios";

export const login = (email: string, password: string) => {
  return http.post('/login', {email, password});
};

export const register = (name:string,email: string, password: string) => {
  console.log("registering ",name,email,password)
  return http.post('/register', {name, email, password});
};

export const updateToken = async (token: string) => {
  await EncryptedStorage.setItem(AdminKey, token);
  console.log(token);
  http.defaults.headers.common['token'] = token;
};
