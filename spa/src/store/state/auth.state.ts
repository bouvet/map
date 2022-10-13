import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types.d';

const initialState = {
    loading: true,
    isAuthenticated: false,
    users: [],
    user: {} as IUser | null,
};

const authState = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        logIn(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
            console.log(state.isAuthenticated);
        },
        logOut(state) {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            console.log(state.isAuthenticated);
        },
    },
});

export const authActions = authState.actions;

export const authReducer = authState.reducer;
