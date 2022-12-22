import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, ISession } from '../../interfaces';

const initialState = {
    loading: false,
    user: {} as IUser,
    password: '',
    authMethod: '',
    emailVerified: false,
    favoriteCategoryIds: [] as string[],
    sessions: [] as ISession[],
};

const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        updateUser(state, action: PayloadAction<Partial<IUser>>) {
            state.user = { ...state.user, ...action.payload };
            state.loading = false;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setAuthMethod(state, action: PayloadAction<string>) {
            state.authMethod = action.payload;
        },
        setEmailVerified(state, action: PayloadAction<boolean>) {
            state.emailVerified = action.payload;
        },
        setFavoriteCategoryIds(state, action: PayloadAction<string[]>) {
            state.favoriteCategoryIds = action.payload;
        },
        loadSessions(state, action: PayloadAction<ISession[]>) {
            state.sessions = action.payload;
        },
        resetState(state) {
            state.loading = false;
            state.user = {} as IUser;
            state.password = '';
            state.authMethod = '';
            state.emailVerified = false;
            state.favoriteCategoryIds = [] as string[];
        },
    },
});

export const userActions = userState.actions;

export const userReducer = userState.reducer;
