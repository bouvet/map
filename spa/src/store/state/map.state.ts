import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewState } from 'react-map-gl';
import { ICategory, ILocation } from '../../interfaces';

const initialState = {
    loading: false,
    mapMoved: false,
    viewState: {
        longitude: 5.7063,
        latitude: 58.9566,
        zoom: 11,
    } as ViewState,
    locations: [] as ILocation[],
    filteredLocations: [] as ILocation[],
    categories: [] as ICategory[],
    userLocation: {
        lat: 0,
        lng: 0,
        shouldFlyTo: false,
    },
    closestLocation: {} as ILocation,
};

const mapState = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setMapMoved(state, action: PayloadAction<boolean>) {
            state.mapMoved = action.payload;
        },
        setViewState(state, action: PayloadAction<ViewState>) {
            state.viewState = action.payload;
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
        addCategory(state, action: PayloadAction<ICategory>) {
            state.categories.push(action.payload);
        },
        setUserLocation(state, action: PayloadAction<{ lat: number; lng: number; shouldFlyTo: boolean }>) {
            state.userLocation = action.payload;
            state.mapMoved = true;
            state.loading = false;
        },
        setClosestLocation(state, action: PayloadAction<ILocation>) {
            state.closestLocation = action.payload;
        },
    },
});

export const mapActions = mapState.actions;

export const mapReducer = mapState.reducer;
