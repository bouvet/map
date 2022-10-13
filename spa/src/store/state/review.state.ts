import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReviewTypeGet } from '../../utils/types.d';

const initialState = {
    currentReviews: [] as IReviewTypeGet[],
};

const reviewState = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setCurrentReviews(state, action: PayloadAction<IReviewTypeGet[]>) {
            state.currentReviews = action.payload;
        },
    },
});

export const reviewActions = reviewState.actions;

export const reviewReducer = reviewState.reducer;
