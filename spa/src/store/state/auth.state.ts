import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

const initialState = {
    loading: true,
    isAuthenticated: false,
    isAdmin: false,
    isRegistering: false,
    changePasswordSuccess: false,
    emailIsValid: false,
    users: [],
    user: {} as IUser,
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
            state.loading = false;
        },
        setEmailIsValid(state, action: { payload: boolean; type: string }) {
            state.emailIsValid = action.payload;
            state.loading = false;
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
            localStorage.clear();
            state.isAdmin = false;
            state.isAuthenticated = false;
            state.user = initialState.user;
            state.loading = false;
        },
        updateUser(state, action: PayloadAction<Partial<IUser>>) {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const authActions = authState.actions;

export const authReducer = authState.reducer;
