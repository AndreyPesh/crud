import { IncomingMessage, ServerResponse } from 'http';

export type MethodsRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type HandlerEndpoint = (req: IncomingMessage, res: ServerResponse) => void;

export type Endpoint = {
  [key in MethodsRequest]?: HandlerEndpoint;
};
