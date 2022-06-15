import http, { IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import { UserData } from './types/interface';
import Router from './Router/Router';
import { emitter } from './Emitter/Emitter';

const PORT = process.env.PORT || 4000;
const users: Array<UserData> = [];
const router = new Router();

router.get('/api/users', (req: IncomingMessage, res: ServerResponse) => {
  res.end(`USERS ${req.method}`);
});

router.post('/api/users', (req: IncomingMessage, res: ServerResponse) => {
  res.end(`USERS ${req.method}`);
});

const server = http.createServer((req, res) => {
  const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res);
  if (!emitted) {
    res.writeHead(404);
    res.end('Page not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
