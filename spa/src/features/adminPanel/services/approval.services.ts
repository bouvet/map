import { API } from '../../../lib/api';
import { PutLocation } from '../../../utils/types.d';

export const approvalServices = {
    putLocation(payload: PutLocation) {
        return async () => {
            try {
                const putResponse = await API.put('Locations', payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(putResponse);
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
