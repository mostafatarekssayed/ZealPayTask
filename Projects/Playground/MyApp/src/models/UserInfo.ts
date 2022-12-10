import { LocationModel } from "./LocationModel";

export interface UserInfo {
  name: string;
  email: string;
  locations: LocationModel[];
}
