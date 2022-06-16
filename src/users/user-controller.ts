import { IncomingMessage, ServerResponse } from 'http';
import { checkData, createNewUser } from '../utils/users';
import { addUser, getAllUser, getUser } from './user-model';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.param) {
    const user = await getUser(req.param);
    if (user) {
      res.send(200, user);
    } else {
      res.send(400, { message: 'User not found' });
    }
  } else {
    res.send(200, getAllUser());
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const isDataCorrect = checkData(req.bodyUser);
    if (isDataCorrect) {
      const newUser = createNewUser(req.bodyUser);
      const user = addUser(newUser);
      res.send(201, user);
    } else {
      res.send(400, { message: 'Incorrect data user' });
    }
  } catch {
    res.send(500, {message: 'Error server creating user'});
  }
};
