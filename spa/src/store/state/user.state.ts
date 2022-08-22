import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  users: [],
};

export const userState = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
});

export const userActions = userState.actions;

export default userState.reducer;
