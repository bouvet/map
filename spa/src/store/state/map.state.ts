import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Location } from '../../utils/types.d';

const initialState = {
    loading: true,
    locations: [] as Location[],
    filteredLocations: [] as Location[],
    selectedFilterCategory: '',
    selectedMarker: '',
    categories: [] as Category[],
    categoriesWithLocations: [] as Category[],
    popUpIsVisible: false,
    currentlySelectedLocation: {} as Location,
    homeMarkerFocus: false,
};

const mapState = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        loadLocations(state, action: PayloadAction<Location[]>) {
            state.locations = action.payload;
        },
        setFilteredLocations(state, action: PayloadAction<Location[]>) {
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
        setCurrentlySelectedLocation(state, action: PayloadAction<Location>) {
            state.currentlySelectedLocation = action.payload;
        },
        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },
        setCategoriesWithLocations(state, action: PayloadAction<Category[]>) {
            state.categoriesWithLocations = action.payload;
        },
        setHomeMarkerFocus(state, action: PayloadAction<boolean>) {
            state.homeMarkerFocus = action.payload;
        },
    },
});

export const mapActions = mapState.actions;

export const mapReducer = mapState.reducer;
