import http, { IncomingMessage, Server, ServerResponse } from 'http';
import EventEmitter from 'events';
import { ServerRouter } from '../types/interface';
import { HandlerEndpoint, MethodsRequest } from '../types/type';

export default class App {
  private _emitter: EventEmitter;
  public server: Server;
  private _middleware: Array<HandlerEndpoint>;

  constructor() {
    this._emitter = new EventEmitter();
    this.server = this.createServer();
    this._middleware = [];
  }

  public use(middleware: HandlerEndpoint) {
    this._middleware.push(middleware);
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

  public createServer(): Server {
    return http.createServer((req, res) => {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          if (body) {
            req.bodyUser = JSON.parse(body);
          }
          this._middleware.forEach((middleware) => middleware(req, res));

          const emitted = this._emitter.emit(this._getRouteMask(req.url, req.method), req, res);

          if (!emitted) {
            res.send(404, { message: 'Page not found' });
          }
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: (error as Error).message }));
        }
      });
    });
  }

  private _getRouteMask(path: string | undefined, method: string | undefined): string {
    if (path && method) {
      return `[${path}]:[${method}]`;
    }
    throw new Error(`Incorrect request`);
  }

  public listen(port: number, showStartMessage: () => void) {
    this.server.listen(port, showStartMessage);
  }
}
