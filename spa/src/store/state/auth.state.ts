import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthWithGoogleResponse } from '../../interfaces';

const initialState = {
    loading: false,
    isAuthenticated: false,
    isAdmin: false,
};

const authState = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        userLogin(state, action: PayloadAction<IAuthWithGoogleResponse>) {
            state.isAuthenticated = true;
            if (action.payload.roles.some((role: any) => role.name === 'Administrator')) {
                state.isAdmin = true;
            }
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.loading = false;
        },
        logOut(state) {
            localStorage.clear();
            state.isAdmin = false;
            state.isAuthenticated = false;
            state.loading = false;
            state.isAdmin = false;
            state.emailIsValid = false;
        },
    },
});

export const authActions = authState.actions;

export const authReducer = authState.reducer;
