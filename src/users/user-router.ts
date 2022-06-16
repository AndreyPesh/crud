import Router from '../Router/Router';
import { createUser, getUsers } from './user-controller';

export const userRouter = new Router();

userRouter.get('/api/users', getUsers);

userRouter.post('/api/users', createUser);
