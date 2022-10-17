import { API } from '../../../lib/api';
import { IPutLocation } from '../../../utils/types.d';

export const approvalServices = {
    putLocation(payload: IPutLocation) {
        return async () => {
            try {
                const putResponse = await API.put('Locations', payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(putResponse);
            } catch (error) {
                console.error(error);
            }
        };
    },
};
