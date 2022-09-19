import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { LatLong } from '../../../utils/types.d';

export const locationServices = {
    postLocation(payload: FormData) {
        return async (dispatch: AppDispatch) => {
            try {
                const postResponse = await API.post('/Locations', payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(postResponse);
                if (postResponse.data.success) {
                    return true;
                }
                return false;
            } catch (error) {
                // TODO: Push error to error state
                console.error('error:', error);
                return false;
            }
        };
    },
    getClosestLocation(userLocation: LatLong, selectedFilterCategory: string) {
        return async (dispatch: AppDispatch) => {
            try {
                console.log('yes');
                console.log(userLocation);
                console.log(selectedFilterCategory);
                if (selectedFilterCategory) {
                    const response = await API.get(
                        `/Locations/${userLocation.lat}&${userLocation.long}/category?category=${selectedFilterCategory}`,
                    );
                    return response;
                }
                const response = await API.get(`/Locations/${userLocation.lat}&${userLocation.long}/category`);
                return response;
            } catch (error) {
                // TODO: Push error to error state
                return error;
            }
        };
    },
};
