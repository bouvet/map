import { mapActions } from '../../../store/state/map.state';
import { AppDispatch } from '../../../store/index';
import { generateFakeCategories, generateFakeLocations } from '../../../utils/locationData';
import { API } from '../../../lib/api';

export const mapService = {
    getLocations() {
        return async (dispatch: AppDispatch) => {
            try {
                // console.log('mapservice 2')
                dispatch(mapActions.setLoading(true));
                const categories = await API.get('/Category');
                const locations = await API.get('/Location');
                console.log(locations.data.data);
                dispatch(mapActions.setCategories(categories.data.data));
                dispatch(mapActions.loadLocations(locations.data.data));
                dispatch(mapActions.setLoading(false));
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
