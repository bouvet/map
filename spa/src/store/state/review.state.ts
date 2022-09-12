import { createSlice } from '@reduxjs/toolkit';
import { ReviewTypeGet } from '../../utils/types.d';

const initialState = {
    currentReviews: [] as ReviewTypeGet[],
};

const reviewState = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setCurrentReviews(state, action: { payload: ReviewTypeGet[]; type: string }) {
            state.currentReviews = action.payload;
        },
    },
});

export const reviewActions = reviewState.actions;

export const reviewReducer = reviewState.reducer;
