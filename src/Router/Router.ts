import { Endpoints, ServerRouter } from '../types/interface';
import { HandlerEndpoint, MethodsRequest } from '../types/type';

export default class Router implements ServerRouter {
  private _endpoints: Endpoints;
  constructor() {
    this._endpoints = {};
  }

  get endpoints() {
    return this._endpoints;
  }

  private _request(method: MethodsRequest = 'GET', path: string, handler: HandlerEndpoint) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`${method} by address ${path} already exist`);
    }
    endpoint[method] = handler;
  }

  get request() {
    return this._request;
  }

  get(path: string, handler: HandlerEndpoint) {
    this.request('GET', path, handler);
  }

  post(path: string, handler: HandlerEndpoint) {
    this.request('POST', path, handler);
  }

  put(path: string, handler: HandlerEndpoint) {
    this.request('PUT', path, handler);
  }

  delete(path: string, handler: HandlerEndpoint) {
    this.request('DELETE', path, handler);
  }
}
