import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ILocation } from '../../utils/types.d';

const initialState = {
    loading: true,
    locations: [] as ILocation[],
    filteredLocations: [] as ILocation[],
    selectedFilterCategory: '',
    selectedMarker: '',
    categories: [] as ICategory[],
    categoriesWithLocations: [] as ICategory[],
    popUpIsVisible: false,
    currentlySelectedLocation: {} as ILocation,
    homeMarkerFocus: false,
};

const mapState = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        loadLocations(state, action: PayloadAction<ILocation[]>) {
            state.locations = action.payload;
        },
        setFilteredLocations(state, action: PayloadAction<ILocation[]>) {
            state.filteredLocations = action.payload;
        },
        setSelectedFilterCategory(state, action: PayloadAction<string>) {
            state.selectedFilterCategory = action.payload;
        },
        setSelectedMarker(state, action: PayloadAction<string>) {
            state.selectedMarker = action.payload;
        },
        setPopupVisibility(state, action: PayloadAction<boolean>) {
            state.popUpIsVisible = action.payload;
        },
        setCurrentlySelectedLocation(state, action: PayloadAction<ILocation>) {
            state.currentlySelectedLocation = action.payload;
        },
        setCategories(state, action: PayloadAction<ICategory[]>) {
            state.categories = action.payload;
        },
        setCategoriesWithLocations(state, action: PayloadAction<ICategory[]>) {
            state.categoriesWithLocations = action.payload;
        },
        setHomeMarkerFocus(state, action: PayloadAction<boolean>) {
            state.homeMarkerFocus = action.payload;
        },
    },
});

export const mapActions = mapState.actions;

export const mapReducer = mapState.reducer;
