import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISession } from '../../utils/types.d';

const initialState = {
    userSessions: [] as ISession[],
};

const sessionState = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUserSessions(state, action: PayloadAction<ISession[]>) {
            state.userSessions = action.payload;
        },
        removeSession(state, action: PayloadAction<string>) {
            state.userSessions = state.userSessions.filter((state) => state.id !== action.payload);
        },
        createSession(state, action: PayloadAction<any>) {
            state.userSessions = [...state.userSessions, action.payload];
        },
    },
});

export const sessionActions = sessionState.actions;
export const sessionReducer = sessionState.reducer;
