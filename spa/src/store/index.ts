import { configureStore } from '@reduxjs/toolkit';
import { mapReducer } from './state/map.state';
import { authReducer } from './state/auth.state';
import { registrationReducer } from './state/registration.state';
import { reviewReducer } from './state/review.state';
import { snackbarReducer } from './state/snackbar.state';

export const store = configureStore({
    reducer: {
        map: mapReducer,
        auth: authReducer,
        registration: registrationReducer,
        review: reviewReducer,
        snackbar: snackbarReducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
