import { ServerResponse } from 'http';
import { IncomingMessage } from 'http';
import { SendData } from '../types/type';

const sendJson = (req: IncomingMessage, res: ServerResponse) => {
  res.send = (status: number, data: SendData) => {
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  };
};

export default sendJson;
