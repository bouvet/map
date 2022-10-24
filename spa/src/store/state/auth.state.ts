import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types.d';

const initialState = {
    loading: true,
    isAuthenticated: false,
    isAdmin: false,
    isRegistering: false,
    changePasswordSuccess: false,
    emailIsValid: false,
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
        setIsRegistering(state, action: { payload: boolean; type: string }) {
            state.isRegistering = action.payload;
        },
        setEmailIsValid(state, action: { payload: boolean; type: string }) {
            state.emailIsValid = action.payload;
        },
        setChangePasswordSuccess(state, action: { payload: boolean; type: string }) {
            state.changePasswordSuccess = action.payload;
        },
        userLogin(state, action) {
            state.isAuthenticated = true;
            state.emailIsValid = true;
            state.user = action.payload;
            if (action.payload.roles.some((role: any) => role.name === 'Administrator')) {
                state.isAdmin = true;
            }
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload));
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
