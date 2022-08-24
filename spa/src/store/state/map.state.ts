import { createSlice } from '@reduxjs/toolkit';

import { Location } from '../../utils/types.d';

const initialState = {
    loading: true,
    locations: [] as Location[],
    filteredLocations: [] as Location[],
    selected: '',
    Category: [],
};

export const mapState = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLoading(state, action: { payload: boolean; type: string }) {
            state.loading = action.payload;
        },
        loadLocations(state, action: { payload: Location[]; type: string }) {
            state.locations = action.payload;
        },
        setFilteredLocations(state, action: { payload: Location[]; type: string }) {
            state.filteredLocations = action.payload;
        },
        setSelected(state, action: { payload: string; type: string }) {
            state.selected = action.payload;
        },
    },
});

export const mapActions = mapState.actions;

export default mapState.reducer;
