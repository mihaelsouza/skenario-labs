export interface User {
  userId: number,
  username: string,
  email: string,
  password?: string,
};

export const UserInitialState = {
  userId: 0,
  username: '',
  email: '',
};