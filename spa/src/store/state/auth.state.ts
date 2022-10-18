import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types.d';

const initialState = {
    loading: false,
    isAuthenticated: false,
    isRegistrering: false,
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
        setIsRegistrering(state, action) {
            state.isRegistrering = action.payload;
        },
        userLogin(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        logOut(state) {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const authActions = authState.actions;

export const authReducer = authState.reducer;
