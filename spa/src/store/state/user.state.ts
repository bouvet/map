import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    authMethod: '',
    favoriteCategoryIds: [] as string[],
};

const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setFirstName(state, action: PayloadAction<string>) {
            state.firstName = action.payload;
        },
        setLastName(state, action: PayloadAction<string>) {
            state.lastName = action.payload;
        },
        setDob(state, action: PayloadAction<string>) {
            state.dob = action.payload;
        },
        setAuthMethod(state, action: PayloadAction<string>) {
            state.authMethod = action.payload;
        },
        setFavoriteCategoryIds(state, action: PayloadAction<string[]>) {
            state.favoriteCategoryIds = action.payload;
        },
    },
});

export const userActions = userState.actions;

export const userReducer = userState.reducer;
