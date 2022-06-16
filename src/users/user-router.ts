import { IncomingMessage, ServerResponse } from 'http';
import Router from '../Router/Router';
import { getUsers } from './user-controller';

export const userRouter = new Router();

userRouter.get('/api/users', getUsers);

userRouter.post('/api/users', (req: IncomingMessage, res: ServerResponse) => {
  res.end(`USERS ${req.method}`);
});
