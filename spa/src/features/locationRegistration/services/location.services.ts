/* eslint-disable @typescript-eslint/no-unused-vars */
import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { ILatLong } from '../../../utils/types.d';

export const locationServices = {
    postLocation(payload: FormData) {
        return async (dispatch: AppDispatch) => {
            try {
                const postResponse = await API.post('/Locations', payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(postResponse);
                if (postResponse.status === 201) {
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
    getClosestLocation(userLocation: ILatLong, selectedFilterCategory: string) {
        return async (dispatch: AppDispatch) => {
            try {
                console.log('yes');
                console.log(userLocation);
                console.log(selectedFilterCategory);
                if (selectedFilterCategory) {
                    const response = await API.get(
                        `/Locations/${userLocation.lat}&${userLocation.long}?category=${selectedFilterCategory}`,
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
