import { mapActions } from '../../../store/state/map.state';
import { AppDispatch } from '../../../store/index';
import { API } from '../../../lib/api';
import { locationStatus } from '../../../types';
import { ICategory } from '../../../interfaces';

export const mapServices = {
    getLocations(filter: locationStatus = 'Approved') {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: locations } = await API.get(`/locations/${filter}`);

                dispatch(mapActions.loadLocations(locations));

                const { data: CategoriesData } = await API.get('/Categories');

                dispatch(mapActions.loadCategories(CategoriesData));
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
};
