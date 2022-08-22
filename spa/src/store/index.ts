import { configureStore } from '@reduxjs/toolkit';

import locationState from './state/location.state';
import userState from './state/user.state';

export const store = configureStore({
  reducer: {
    location: locationState,
    users: userState,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
