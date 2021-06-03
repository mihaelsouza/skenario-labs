export interface User {
  userId: number,
  username: string,
  email: string,
};

export const UserInitialState = {
  userId: 0,
  username: '',
  email: '',
};