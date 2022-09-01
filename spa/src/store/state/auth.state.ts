import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    isAuthenticated: false,
    users: [],
};

const authState = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: { payload: boolean; type: string }) {
            state.loading = action.payload;
        },
    },
});

export const authActions = authState.actions;

export const authReducer = authState.reducer;
