import { Endpoint, HandlerEndpoint, MethodsRequest } from './type';

export interface ServerRouter {
  endpoints: Endpoints;

  request(method: MethodsRequest, path: string, handler: HandlerEndpoint): void;

  get(path: string, handler: HandlerEndpoint): void;

  post(path: string, handler: HandlerEndpoint): void;

  put(path: string, handler: HandlerEndpoint): void;

  delete(path: string, handler: HandlerEndpoint): void;
}

export interface BodyUserData {
  username: string;
  age: number;
  hobbies: Array<string>;
}

export interface UserData extends BodyUserData {
  id: string;
}

export interface Endpoints {
  [key: string]: Endpoint;
}

export interface ErrorData {
  message: string;
}
