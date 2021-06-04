import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: { value: boolean, render: string } = {
  value: false,
  render: 'user',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      return { ...state, value: true };
    },
    closeModal: (state) => {
      return { ...state, value: false };
    },
    switchRender: (state, action: PayloadAction<string>) => {
      return { ...state, render: action.payload}
    },
  },
});

export const { openModal, closeModal, switchRender } = modalSlice.actions;
export const selectModal = (state: RootState): { value: boolean } =>
  state.modal;
export default modalSlice.reducer;
