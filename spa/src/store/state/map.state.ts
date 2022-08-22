import { createSlice } from '@reduxjs/toolkit';

import { LocationData } from '../../utils/types.d';

const initialState = {
  loading: true,
  locations: [] as LocationData[],
};

export const mapState = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
    loadLocations(state, action: { payload: LocationData[]; type: string }) {
      state.locations = action.payload;
    },
  },
});

export const mapActions = mapState.actions;

export default mapState.reducer;
