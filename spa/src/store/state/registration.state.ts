import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LatLong } from '../../utils/types.d';

const initialState = {
    currentMapCenter: {} as LatLong,
    currentTitle: '',
    currentDescription: '',
    currentCategories: [] as string[],
    currentImage: '' as string,
    currentUserLocation: {} as LatLong,
    hasUserLocation: false,
};

const registrationState = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setCurrentMapCenter(state, action: PayloadAction<LatLong>) {
            state.currentMapCenter = action.payload;
        },
        setCurrentTitle(state, action: PayloadAction<string>) {
            state.currentTitle = action.payload;
        },
        setCurrentDescription(state, action: PayloadAction<string>) {
            state.currentDescription = action.payload;
        },
        setCurrentCategories(state, action: PayloadAction<string[]>) {
            state.currentCategories = action.payload;
        },
        setCurrentImage(state, action: PayloadAction<string>) {
            state.currentImage = action.payload;
        },
        setCurrentUserLocation(state, action: PayloadAction<LatLong>) {
            state.currentUserLocation = action.payload;
        },
        setHasUserLocation(state, action: PayloadAction<boolean>) {
            state.hasUserLocation = action.payload;
        },
        resetToInitalState: () => initialState,
    },
});

export const registrationActions = registrationState.actions;

export const registrationReducer = registrationState.reducer;
