import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISessionTypeGet } from '../../utils/types.d';

const initialState = {
    currentSessions: [] as ISessionTypeGet[],
};

const sessionState = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setCurrentSessions(state, action: PayloadAction<ISessionTypeGet[]>) {
            state.currentSessions = action.payload;
        },
        removeSession(state, action: PayloadAction<string>) {
            state.currentSessions = state.currentSessions.filter((state) => state.id !== action.payload);
        },
        createSession(state, action: PayloadAction<Object>) {},
    },
});

export const sessionActions = sessionState.actions;
export const sessionReducer = sessionState.reducer;
