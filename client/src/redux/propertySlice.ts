import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { Properties, Property, PropertyInitialState } from '../interfaces/Property';

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {value: PropertyInitialState},
  reducers: {
    storeProperties: (state, action: PayloadAction<Property[]>) => {
      return { ...state, value: action.payload };
    },
  },
});

export const { storeProperties } = propertiesSlice.actions;
export const selectProperties = (state: RootState): Properties => state.properties;
export default propertiesSlice.reducer;
