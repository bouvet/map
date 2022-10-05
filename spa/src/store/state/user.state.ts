import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    favorites: [] as string[],
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
        setAge(state, action: PayloadAction<string>) {
            state.age = action.payload;
        },
        setFavorites(state, action: PayloadAction<string[]>) {
            state.favorites = action.payload;
        },
    },
});

export const userActions = userState.actions;

export const userReducer = userState.reducer;
