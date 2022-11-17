import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../utils/types.d';

const initialState = {
    loading: true,
    selectedFilterCategory: '',
    categories: [] as ICategory[],
    workoutCategories: [] as ICategory[],
    popUpIsVisible: false,
};

const workoutState = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setSelectedFilterCategory(state, action: PayloadAction<string>) {
            state.selectedFilterCategory = action.payload;
        },
        setPopupVisibility(state, action: PayloadAction<boolean>) {
            state.popUpIsVisible = action.payload;
        },
        setCategories(state, action: PayloadAction<ICategory[]>) {
            state.categories = action.payload;
        },
        setWorkoutCategories(state, action: PayloadAction<ICategory[]>) {
            state.workoutCategories = action.payload;
        },
    },
});

export const workoutActions = workoutState.actions;

export const workoutReducer = workoutState.reducer;
