import Router from '../Router/Router';
import { createUser, deleteUser, getUsers, updateUser } from './user-controller';

export const userRouter = new Router();

userRouter.get('/api/users', getUsers);

userRouter.post('/api/users', createUser);

userRouter.put('/api/users', updateUser);

userRouter.delete('/api/users', deleteUser);
