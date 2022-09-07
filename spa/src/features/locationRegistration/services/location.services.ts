import { API } from '../../../lib/api';
import { NewLocation } from '../../../utils/types.d';

export const locationServices = {
    postLocation(payload: NewLocation) {
        return async () => {
            try {
                await API.post('/Locations', payload);
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
