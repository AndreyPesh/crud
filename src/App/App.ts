import http, { IncomingMessage, Server, ServerResponse } from 'http';
import EventEmitter from 'events';
import { ServerRouter } from '../types/interface';
import { MethodsRequest } from '../types/type';

export default class App {
  private _emitter: EventEmitter;
  private _server: Server;

  constructor() {
    this._emitter = new EventEmitter();
    this._server = this._createServer();
  }

  public addRouter(router: ServerRouter) {
    Object.keys(router.endpoints).forEach((path) => {
      const currentEndpoint = router.endpoints[path];
      (Object.keys(currentEndpoint) as Array<MethodsRequest>).forEach((method) => {
        const handler = currentEndpoint[method];
        this._emitter.on(`[${path}]:[${method}]`, (req: IncomingMessage, res: ServerResponse) => {
          if (handler) {
            handler(req, res);
          } else {
            throw new Error(`Can't add handler ${method} to ${path}`);
          }
        });
      });
    });
  }

  private _createServer(): Server {
    return http.createServer((req, res) => {
      const emitted = this._emitter.emit(this._getRouteMask(req.url, req.method), req, res);
      if (!emitted) {
        res.writeHead(404);
        res.end('Page not found');
      }
    });
  }

  private _getRouteMask(path: string | undefined, method: string | undefined): string {
    if (path && method) {
      return `[${path}]:[${method}]`;
    }
    throw new Error(`Incorrect request`);
  }

  public listen(port: number, showStartMessage: () => void) {
    this._server.listen(port, showStartMessage);
  }
}
