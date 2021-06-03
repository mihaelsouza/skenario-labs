import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { User, UserInitialState } from '../interfaces/User';

export const usersSlice = createSlice({
  name: 'users',
  initialState: UserInitialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
    logoutUser: (state) => {
      return { ...state, ...UserInitialState };
    },
  },
});

export const { updateUser, logoutUser } = usersSlice.actions;
export const selectUsers = (state: RootState): User => state.users;
export default usersSlice.reducer;
