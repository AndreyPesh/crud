import crypto from 'crypto';
import { BodyUserData, UserData } from '../types/interface';

export const checkData = (userData: BodyUserData) => {
  const { username, age, hobbies } = userData;
  if (!username || typeof username !== 'string') {
    return false;
  }
  if (!age || typeof age !== 'number') {
    return false;
  }

  if (!Array.isArray(hobbies)) {
    return false;
  }

  const typeArrayElementIsString = hobbies.every((element) => typeof element === 'string');
  if (!typeArrayElementIsString) {
    return false;
  }

  return true;
};

export const createNewUser = (userData: BodyUserData) => {
    const id = crypto.randomUUID();
    const newUser: UserData = Object.assign({ id }, userData);
    return newUser;
};
