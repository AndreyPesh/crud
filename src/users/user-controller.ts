import { IncomingMessage, ServerResponse } from 'http';
import { checkData, createNewUser, validateId } from '../utils/users';
import { addUser, getAllUser, getUser, updateUserById } from './user-model';

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

export const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.param) {
      const isIdValid = validateId(req.param);
      if (!isIdValid) {
        res.send(400, { message: 'Incorrect ID' });
        return;
      }
      const isNewDataUserCorrect = checkData(req.bodyUser);
      if (isNewDataUserCorrect) {
        const userData = await updateUserById(req.param, req.bodyUser);
        if (userData) {
          res.send(200, userData);
        } else {
          res.send(404, { message: "User doesn't exist" });
        }
        return;
      }
      res.send(400, { message: 'Incorrect data user' });
      return;
    }
    res.send(404, { message: 'Incorrect request. Missing ID' });
  } catch {
    res.send(500, { message: 'Error server creating user' });
  }
};
