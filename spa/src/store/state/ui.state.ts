import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISnackbar } from '../../interfaces';

const initialState = {
    shouldNavigate: false,
    showLocationInfoPopup: false,
    showLocationInfoDrawer: false,
    snackbar: {
        visible: false,
        message: '',
        visibleDuration: 0,
        severity: undefined,
    } as ISnackbar,
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
        setShowSnackbar(state, action: PayloadAction<ISnackbar>) {
            const { message, severity, visibleDuration } = action.payload;

            state.snackbar.visible = true;
            state.snackbar.message = message;
            state.snackbar.severity = severity;
            state.snackbar.visibleDuration = visibleDuration || 3000;
        },
        setCloseSnackbar(state) {
            state.snackbar = initialState.snackbar;
        },
    },
});

export const uiActions = uiState.actions;

export const uiReducer = uiState.reducer;
