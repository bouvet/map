import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces';

const initialState = {
    loading: false,
    selectedCategories: [] as ICategory[],
    title: '',
    description: '',
    lat: 0,
    lng: 0,
};

const addLocationState = createSlice({
    name: 'add-location',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setLatLng(state, action: PayloadAction<{ lat: number; lng: number }>) {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        },
        setSelectedCategories(state, action: PayloadAction<ICategory[]>) {
            state.selectedCategories = action.payload;
        },
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
    },
});

export const addLocationActions = addLocationState.actions;

export const addLocationReducer = addLocationState.reducer;
