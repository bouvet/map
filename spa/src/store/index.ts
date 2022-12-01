import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './state/auth.state';
import { mapReducer } from './state/map.state';
import { registrationReducer } from './state/registration.state';
import { reviewReducer } from './state/review.state';
import { sessionReducer } from './state/session.state';
import { snackbarReducer } from './state/snackbar.state';
import { uiReducer } from './state/ui.state';
import { userReducer } from './state/user.state';

export const store = configureStore({
    reducer: {
        map: mapReducer,
        auth: authReducer,
        registration: registrationReducer,
        review: reviewReducer,
        snackbar: snackbarReducer,
        user: userReducer,
        ui: uiReducer,
        session: sessionReducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
