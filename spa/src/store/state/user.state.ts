import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    currentEmail: '',
    currentPassword: '',
    currentName: '',
    currentAge: '',
    currentFavorites: [] as string[],
};

const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentEmail(state, action: PayloadAction<string>) {
            state.currentEmail = action.payload;
        },
        setCurrentPassword(state, action: PayloadAction<string>) {
            state.currentPassword = action.payload;
        },
        setCurrentName(state, action: PayloadAction<string>) {
            state.currentName = action.payload;
        },
        setCurrentAge(state, action: PayloadAction<string>) {
            state.currentAge = action.payload;
        },
        setCurrentFavorites(state, action: PayloadAction<string[]>) {
            state.currentFavorites = action.payload;
        },
    },
});

export const userActions = userState.actions;

export const userReducer = userState.reducer;
