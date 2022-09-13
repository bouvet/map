import { mapActions } from '../../../store/state/map.state';
import { AppDispatch } from '../../../store/index';
import { API } from '../../../lib/api';

export const mapService = {
    getLocations() {
        return async (dispatch: AppDispatch) => {
            try {
                // console.log('mapservice 2')
                dispatch(mapActions.setLoading(true));

                const locations = await API.get('/Locations');
                dispatch(mapActions.loadLocations(locations.data.data));

                const categoriesWithLocations = await API.get('/Categories/inUse');
                dispatch(mapActions.setCategoriesWithLocations(categoriesWithLocations.data.data));

                const categories = await API.get('/Categories');
                dispatch(mapActions.setCategories(categories.data.data));

                dispatch(mapActions.setLoading(false));
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
