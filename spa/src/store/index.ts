import { configureStore } from '@reduxjs/toolkit';
import { addLocationReducer } from './state/add-location.state';
import { authReducer } from './state/auth.state';
import { mapReducer } from './state/map.state';
import { reviewReducer } from './state/review.state';
import { snackbarReducer } from './state/snackbar.state';
import { uiReducer } from './state/ui.state';
import { userReducer } from './state/user.state';
import { workoutReducer } from './state/workout.state';

export const store = configureStore({
    reducer: {
        map: mapReducer,
        auth: authReducer,
        addLocation: addLocationReducer,
        review: reviewReducer,
        snackbar: snackbarReducer,
        user: userReducer,
        ui: uiReducer,
        workout: workoutReducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './state';
