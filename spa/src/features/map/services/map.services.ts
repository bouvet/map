import { mapActions } from '../../../store/state/map.state';
import { AppDispatch } from '../../../store/index';
import { API } from '../../../lib/api';
import { locationStatus } from '../../../types';

export const mapServices = {
    getLocations(filter: locationStatus = 'Approved') {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: locations } = await API.get(`/locations/${filter}`);

                dispatch(mapActions.loadLocations(locations));

                const { data: CategoriesData } = await API.get('/Categories');

                dispatch(mapActions.loadCategories(CategoriesData));

                dispatch(mapActions.setLoading(false));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
};
