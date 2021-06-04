import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modalSlice';
import usersReducer from './usersSlice';
import propertiesReducer from './propertySlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: usersReducer,
    properties: propertiesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
