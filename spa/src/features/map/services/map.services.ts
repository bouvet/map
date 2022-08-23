import { mapActions } from '../../../store/state/map.state';
import { AppDispatch } from '../../../store/index';

import { fake_locations } from '../../../utils/locationData';

export const mapService = {
    getLocations() {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(mapActions.setLoading(true));
                const locations = fake_locations(20);
                dispatch(mapActions.loadLocations(locations));
                dispatch(mapActions.setLoading(false));
            } catch (error) {
                //TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
