import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    shouldNavigate: false,
};

const uiState = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setShouldNavigate(state, action: PayloadAction<boolean>) {
            state.shouldNavigate = action.payload;
        },
    },
});

export const uiActions = uiState.actions;

export const uiReducer = uiState.reducer;
