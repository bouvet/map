import { mapActions } from '../../../store/state/map.state';
import { AppDispatch } from '../../../store/index';

import { generateFakeCategories, generateFakeLocations } from '../../../utils/locationData';

export const mapService = {
    getLocations() {
        return async (dispatch: AppDispatch) => {
            try {
                // console.log('mapservice 2')
                dispatch(mapActions.setLoading(true));
                const categories = generateFakeCategories();
                const locations = generateFakeLocations(20, categories);
                dispatch(mapActions.setCategories(categories));
                dispatch(mapActions.loadLocations(locations));
                dispatch(mapActions.setLoading(false));
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
