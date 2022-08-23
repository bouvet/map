import { createSlice } from '@reduxjs/toolkit';

import { LocationData } from '../../utils/types.d';

const initialState = {
  loading: true,
  locations: [] as LocationData[],
  selected: '',
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
    setSelected(state, action: { payload: string; type: string }) {
      state.selected = action.payload;
    }
  },
});

export const mapActions = mapState.actions;

export default mapState.reducer;
