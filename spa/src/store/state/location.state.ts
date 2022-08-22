import { createSlice } from '@reduxjs/toolkit';

import { LocationData } from '../../utils/types';

const initialState = {
  loading: true,
  locations: [] as LocationData[],
};

export const locationState = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
    loadLocation(state, action: { payload: LocationData[]; type: string }) {
      state.locations = action.payload;
    },
    filteredLocations(
      state,
      action: { payload: LocationData[]; type: string }
    ) {
      state.locations = action.payload;
    },
  },
});

export const locationActions = locationState.actions;

export default locationState.reducer;
