import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SetNotifyPayload {
    visibleDuration?: number | null;
    severity?: AlertColor;
    message: string;
}

interface InitialState {
    visibleDuration?: number | null;
    severity?: AlertColor;
    message: string;
    isOpen: boolean;
}

const initialState: InitialState = {
    isOpen: false,
    message: '',
};

const snackbarState = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        setNotify(state, action: PayloadAction<SetNotifyPayload>) {
            const { visibleDuration, severity, message } = action.payload;
            state.severity = severity;
            state.message = message;
            state.visibleDuration = visibleDuration;
            state.isOpen = true;
        },
        closeNotify: () => initialState,
    },
});

export const snackbarActions = snackbarState.actions;

export const snackbarReducer = snackbarState.reducer;
