import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISnackbar } from '../../interfaces';

const initialState = {
    showLocationInfoPopup: false,
    showLocationInfoDrawer: false,
    snackbar: {
        visible: false,
        message: '',
        visibleDuration: 0,
        severity: undefined,
    } as ISnackbar,
    showSidebar: false,
};

const uiState = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setShowLocationPopup(state, action: PayloadAction<boolean>) {
            state.showLocationInfoPopup = action.payload;
        },
        setShowLocationDrawer(state, action: PayloadAction<boolean>) {
            state.showLocationInfoDrawer = action.payload;
        },
        showSnackbar(state, action: PayloadAction<ISnackbar>) {
            const { message, severity, visibleDuration } = action.payload;

            state.snackbar.visible = true;
            state.snackbar.message = message;
            state.snackbar.severity = severity;
            state.snackbar.visibleDuration = visibleDuration || 5000;
        },
        setCloseSnackbar(state) {
            state.snackbar = initialState.snackbar;
        },
        setShowSidebar(state, action: PayloadAction<boolean>) {
            state.showSidebar = action.payload;
        },
    },
});

export const uiActions = uiState.actions;

export const uiReducer = uiState.reducer;
