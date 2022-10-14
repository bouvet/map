import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    favoriteCategoryIds: [] as string[],
};

const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
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
        setFavoriteCategoryIds(state, action: PayloadAction<string[]>) {
            state.favoriteCategoryIds = action.payload;
        },
    },
});

export const userActions = userState.actions;

export const userReducer = userState.reducer;