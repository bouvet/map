import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISessionTypeGet } from '../../utils/types.d';

const initialState = {
    userSessions: [] as ISessionTypeGet[],
};

const sessionState = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUserSessions(state, action: PayloadAction<ISessionTypeGet[]>) {
            state.userSessions = action.payload;
        },
        removeSession(state, action: PayloadAction<string>) {
            state.userSessions = state.userSessions.filter((state) => state.id !== action.payload);
        },
        // createSession(state, action: PayloadAction<Object>) {},
    },
});

export const sessionActions = sessionState.actions;
export const sessionReducer = sessionState.reducer;
