import { UserData } from '../types/interface';

const users: Array<UserData> = [
  {
    id: '12',
    username: 'Andrei',
    age: 33,
    hobbies: ['Programming'],
  },
  {
    id: '23',
    username: 'Andrei',
    age: 33,
    hobbies: ['Programming'],
  },
];

export const getAllUser = () => {
  return users;
};

export const getUser = (id: string): Promise<UserData | null> => {
  return new Promise((resolve) => {
    const user = users.find(user => user.id === id);
    if (user) {
      resolve(user);
    }
    resolve(null);
  });
};
