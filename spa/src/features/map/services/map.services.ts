import { ICategory, LocationStatus } from '../../../interfaces';
import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store/index';
import { mapActions } from '../../../store/state/map.state';

export const mapServices = {
    getLocations(filter: LocationStatus = 'Approved') {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: locations } = await API.get(`/locations/${filter}`);

                dispatch(mapActions.loadLocations(locations));
            } catch (error) {
                console.error('error', error);
            }
        };
    },

    // eslint-disable-next-line no-undef
    getClosestLocation(position: GeolocationPosition, selectedCategory: ICategory | null) {
        return async (dispatch: AppDispatch) => {
            try {
                if (selectedCategory) {
                    const { data } = await API.get(
                        `/locations/${position.coords.latitude}&${position.coords.longitude}?categoryId=${selectedCategory.id}`,
                    );

                    dispatch(mapActions.setLoading(false));
                    dispatch(mapActions.setClosestLocation(data));
                    return;
                }

                const { data } = await API.get(`/locations/${position.coords.latitude}&${position.coords.longitude}`);

                dispatch(mapActions.setLoading(false));
                dispatch(mapActions.setClosestLocation(data));
            } catch (error) {
                dispatch(mapActions.setLoading(false));
            }
        };
    },

    getCategories() {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: categories } = await API.get('/Categories');

                dispatch(mapActions.loadCategories(categories));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
};
