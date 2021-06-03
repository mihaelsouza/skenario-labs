export interface User {
  userId: number,
  username: String,
  email: String,
};

export const UserInitialState = {
  userId: 0,
  username: '',
  email: '',
};