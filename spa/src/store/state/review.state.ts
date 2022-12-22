import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReview } from '../../interfaces';

const initialState = {
    currentReviews: [] as IReview[],
};

const reviewState = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setCurrentReviews(state, action: PayloadAction<IReview[]>) {
            state.currentReviews = action.payload;
        },
    },
});

export const reviewActions = reviewState.actions;

export const reviewReducer = reviewState.reducer;
