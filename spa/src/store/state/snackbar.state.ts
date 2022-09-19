import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SetNotifyPayload {
    autohideDuration?: number | null;
    severity?: AlertColor;
    message: string;
}

interface InitialState {
    autohideDuration?: number | null;
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
            const { autohideDuration, severity, message } = action.payload;
            state.severity = severity;
            state.message = message;
            state.autohideDuration = autohideDuration;
            state.isOpen = true;
        },
        closeNotify: () => initialState,
    },
});

export const snackbarActions = snackbarState.actions;

export const snackbarReducer = snackbarState.reducer;
