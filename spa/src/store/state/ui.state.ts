import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    shouldNavigate: false,
    showLocationInfoPopup: false,
    showLocationInfoDrawer: false,
};

const uiState = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setShouldNavigate(state, action: PayloadAction<boolean>) {
            state.shouldNavigate = action.payload;
        },
        setShowLocationPopup(state, action: PayloadAction<boolean>) {
            state.showLocationInfoPopup = action.payload;
        },
        setShowLocationDrawer(state, action: PayloadAction<boolean>) {
            state.showLocationInfoDrawer = action.payload;
        },
    },
});

export const uiActions = uiState.actions;

export const uiReducer = uiState.reducer;
