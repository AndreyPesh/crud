import { IncomingMessage, ServerResponse } from 'http';
import { getAllUser, getUser } from './user-model';

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
