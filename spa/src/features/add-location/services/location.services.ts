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
    getClosestLocation(userLocation: ILatLong, selectedCategory: string) {
        return async () => {
            try {
                if (selectedCategory) {
                    const { data } = await API.get(`/Locations/${userLocation.lat}&${userLocation.long}?category=${selectedCategory}`);
                    console.log(data);
                    return;
                }
                const { data } = await API.get(`/Locations/${userLocation.lat}&${userLocation.long}`);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
    },
};
