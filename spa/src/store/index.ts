import { configureStore } from '@reduxjs/toolkit';

import mapState from './state/map.state';
import authState from './state/auth.state';

export const store = configureStore({
  reducer: {
    map: mapState,
    auth: authState,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
