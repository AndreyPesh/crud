import { IncomingMessage, ServerResponse } from 'http';
import { Endpoints } from '../types/interface';
import { HandlerEndpoint, MethodsRequest } from '../types/type';
import { emitter } from '../Emitter/Emitter';

export default class Router {
  private endpoints: Endpoints;
  constructor() {
    this.endpoints = {};
  }

  private request(method: MethodsRequest = 'GET', path: string, handler: HandlerEndpoint) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`${method} by address ${path} already exist`);
    }
    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req: IncomingMessage, res: ServerResponse) => {
      handler(req, res);
    });
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
