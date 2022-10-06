import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    isAuthenticated: true,
    users: [],
};

const authState = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        logIn(state) {
            state.isAuthenticated = true;
            console.log(state.isAuthenticated);
        },
        logOut(state) {
            state.isAuthenticated = false;
            console.log(state.isAuthenticated);
        },
    },
});

export const authActions = authState.actions;

export const authReducer = authState.reducer;
