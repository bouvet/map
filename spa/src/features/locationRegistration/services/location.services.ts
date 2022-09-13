import { API } from '../../../lib/api';
import { NewLocation } from '../../../utils/types.d';

export const locationServices = {
    postLocation(payload: any) {
        return async () => {
            try {
                await API.post('/Locations', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
