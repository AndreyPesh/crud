import { Endpoint } from './type';

export interface UserData {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
}

export interface Endpoints {
  [key: string]: Endpoint;
}
