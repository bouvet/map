import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ILocation } from '../../interfaces';

const initialState = {
    loading: true,
    locations: [] as ILocation[],
    filteredLocations: [] as ILocation[],
    categories: [] as ICategory[],
    selectedFilterCategory: '',
    selectedMarker: '',
    categoriesWithLocations: [] as ICategory[],
    popUpIsVisible: false,
    currentlySelectedLocation: {} as ILocation,
    homeMarkerFocus: false,
};

const mapState = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        loadLocations(state, action: PayloadAction<ILocation[]>) {
            state.locations = action.payload;

            if (state.filteredLocations.length < 1) {
                state.filteredLocations = action.payload;
            }
        },
        filterLocations(state, action: PayloadAction<string | null>) {
            if (!action.payload) {
                state.filteredLocations = state.locations;
                return;
            }

            const filteredLocations = state.locations.filter((location) =>
                location.properties.category.some((category) => category.id === action.payload),
            );
            state.filteredLocations = filteredLocations;
        },
        loadCategories(state, action: PayloadAction<ICategory[]>) {
            state.categories = action.payload;
        },
        setSelectedFilterCategory(state, action: PayloadAction<string>) {
            state.selectedFilterCategory = action.payload;
        },
        setSelectedMarker(state, action: PayloadAction<string>) {
            state.selectedMarker = action.payload;
        },
        setPopupVisibility(state, action: PayloadAction<boolean>) {
            state.popUpIsVisible = action.payload;
        },
        setCurrentlySelectedLocation(state, action: PayloadAction<ILocation>) {
            state.currentlySelectedLocation = action.payload;
        },
        setHomeMarkerFocus(state, action: PayloadAction<boolean>) {
            state.homeMarkerFocus = action.payload;
        },
    },
});

export const mapActions = mapState.actions;

export const mapReducer = mapState.reducer;
