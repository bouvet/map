import { configureStore } from '@reduxjs/toolkit';

import { mapReducer } from './state/map.state';
import { authReducer } from './state/auth.state';

export const store = configureStore({
    reducer: {
        map: mapReducer,
        auth: authReducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
