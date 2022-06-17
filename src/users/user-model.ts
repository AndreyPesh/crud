import { BodyUserData, UserData } from '../types/interface';

const users: Array<UserData> = [];

export const getAllUser = () => {
  return users;
};

export const getUser = (id: string): Promise<UserData | null> => {
  return new Promise((resolve) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      resolve(user);
    }
    resolve(null);
  });
};

export const addUser = (data: UserData) => {
    users.push(data);
    return data;
};

export const updateUserById = (id: string, updatedDataUser: BodyUserData): Promise<UserData | null> => {
  return new Promise((resolve) => {
    const user = users.find(user => user.id === id);
    if (user) {
      Object.assign(user, updatedDataUser);
      resolve(user);
    }
    resolve(null);
  });
}