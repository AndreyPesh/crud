import { IncomingMessage, ServerResponse } from 'http';
import { ErrorData, UserData } from './interface';

export type MethodsRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type HandlerEndpoint = (req: IncomingMessage, res: ServerResponse) => void;

export type Endpoint = {
  [key in MethodsRequest]?: HandlerEndpoint;
};

export type SendData = UserData | Array<UserData> | ErrorData;
