import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { Property, PropertyInitialState } from '../interfaces/Property';

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState: [PropertyInitialState],
  reducers: {
    storeProperties: (state, action: PayloadAction<Property[]>) => {
      return { ...action.payload };
    },
  },
});

export const { storeProperties } = propertiesSlice.actions;
export const selectProperties = (state: RootState): Property[] => state.properties;
export default propertiesSlice.reducer;
