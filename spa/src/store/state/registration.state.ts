import { createSlice } from '@reduxjs/toolkit';
import { LatLong } from '../../utils/types.d';

const initialState = {
    currentMapCenter: {} as LatLong,
    currentTitle: '',
    currentDescription: '',
    currentCategories: [] as string[],
};

const registrationState = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setCurrentMapCenter(state, action: { payload: LatLong; type: string }) {
            state.currentMapCenter = action.payload;
        },
        setCurrentTitle(state, action: { payload: string; type: string }) {
            state.currentTitle = action.payload;
        },
        setCurrentDescription(state, action: { payload: string; type: string }) {
            state.currentDescription = action.payload;
        },
        setCurrentCategories(state, action: { payload: string[]; type: string }) {
            state.currentCategories = action.payload;
        },
    },
});

export const registrationActions = registrationState.actions;

export const registrationReducer = registrationState.reducer;
