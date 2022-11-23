import { API } from '../../../lib/api';
import { ILatLong } from '../../../utils/types.d';

export const locationServices = {
    postLocation(payload: FormData) {
        return async () => {
            try {
                const postResponse = await API.post('/Locations', payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(postResponse);
                return true;
            } catch (error) {
                console.error('error', error);
                return false;
            }
        };
    },
    getClosestLocation(userLocation: ILatLong, selectedFilterCategory: string) {
        return async () => {
            try {
                console.log(userLocation);
                console.log(selectedFilterCategory);
                if (selectedFilterCategory) {
                    const response = await API.get(
                        `/Locations/${userLocation.lat}&${userLocation.long}?category=${selectedFilterCategory}`,
                    );
                    return response;
                }
                const response = await API.get(`/Locations/${userLocation.lat}&${userLocation.long}`);
                console.log(response.data);
                return response;
            } catch (error) {
                return error;
            }
        };
    },
};
