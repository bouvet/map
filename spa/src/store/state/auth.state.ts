import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    isAuthenticated: false,
    users: [],
};

const authState = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const authActions = authState.actions;

export const authReducer = authState.reducer;
