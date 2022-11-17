import { mapActions } from '../../../store/state/map.state';
import { AppDispatch } from '../../../store/index';
import { API } from '../../../lib/api';

export const mapServices = {
    getLocations(filter: string = 'approved') {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(mapActions.setLoading(true));

                const { data: locations } = await API.get(`/locations/${filter}`);

                dispatch(mapActions.loadLocations(locations));

                // TODO: filter list later...
                const { data: CategoriesData } = await API.get('/Categories');
                dispatch(mapActions.setCategories(CategoriesData));
                dispatch(mapActions.setCategoriesWithLocations(CategoriesData));

                dispatch(mapActions.setLoading(false));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
};
