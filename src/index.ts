import http, { IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import App from './App/App';
import { UserData } from './types/interface';
import Router from './Router/Router';


const PORT = process.env.PORT || 4000;
const server = new App();
const users: Array<UserData> = [];
const router = new Router();

router.get('/api/users', (req: IncomingMessage, res: ServerResponse) => {
  res.end(`USERS ${req.method}`);
});

router.post('/api/users', (req: IncomingMessage, res: ServerResponse) => {
  res.end(`USERS ${req.method}`);
});

server.addRouter(router);

server.listen(Number(PORT), () => {console.log(`Server running on  port ${PORT}`)});

