import { mapActions } from '../../../store/state/map.state';
import { AppDispatch } from '../../../store/index';

import { generateFakeLocations } from '../../../utils/locationData';

export const mapService = {
    getLocations() {
        return async (dispatch: AppDispatch) => {
            try {
                // console.log('mapservice 2')
                dispatch(mapActions.setLoading(true));
                const locations = generateFakeLocations(20);
                dispatch(mapActions.loadLocations(locations));
                dispatch(mapActions.setLoading(false));
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
