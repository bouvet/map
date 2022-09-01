import { createSlice } from '@reduxjs/toolkit';

import { Category, Location } from '../../utils/types.d';

const initialState = {
    loading: true,
    locations: [] as Location[],
    filteredLocations: [] as Location[],
    selectedFilterCategory: '',
    selectedMarker: '',
    categories: [] as Category[],
    popUpIsVisible: false,
    currentlySelectedLocation: {} as Location,
    homeMarkerFocus: false,
};

const mapState = createSlice({
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
        setSelectedFilterCategory(state, action: { payload: string; type: string }) {
            state.selectedFilterCategory = action.payload;
        },
        setSelectedMarker(state, action: { payload: string; type: string }) {
            state.selectedMarker = action.payload;
        },
        setPopupVisibility(state, action: { payload: boolean; type: string }) {
            state.popUpIsVisible = action.payload;
        },
        setCurrentlySelectedLocation(state, action: { payload: Location; type: string }) {
            state.currentlySelectedLocation = action.payload;
        },
        setCategories(state, action: { payload: Category[]; type: string }) {
            state.categories = action.payload;
        },
        setHomeMarkerFocus(state, action: { payload: boolean; type: string }) {
            state.homeMarkerFocus = action.payload;
        },
    },
});

export const mapActions = mapState.actions;

export const mapReducer = mapState.reducer;
