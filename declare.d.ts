import { IncomingMessage, ServerResponse } from 'http';
import { SendData } from './src/types/type';

declare module 'http' {
  export interface IncomingMessage {
    param?: string;
    bodyUser: BodyUserData;
  }
  export interface ServerResponse {
    send: (status: number, data: SendData) => void;
  }
}
