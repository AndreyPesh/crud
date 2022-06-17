import { IncomingMessage, ServerResponse } from 'http';
import { checkData, createNewUser, validateId } from '../utils/users';
import { addUser, getAllUser, getUser } from './user-model';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.param) {
      const isIdValid = validateId(req.param);
      if (!isIdValid) {
        res.send(400, { message: 'Id invalid' });
      }
      const user = await getUser(req.param);
      if (user) {
        res.send(200, user);
      } else {
        res.send(404, { message: 'User not found' });
      }
    } else {
      res.send(200, getAllUser());
    }
  } catch {
    res.send(500, { message: 'Error server creating user' });
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (!req.bodyUser) {
      res.send(400, { message: 'User data not sent' });
      return;
    }
    const isDataCorrect = checkData(req.bodyUser);
    if (isDataCorrect) {
      const newUser = createNewUser(req.bodyUser);
      const user = addUser(newUser);
      res.send(201, user);
    } else {
      res.send(400, { message: 'Incorrect data user' });
    }
  } catch {
    res.send(500, { message: 'Error server creating user' });
  }
};
