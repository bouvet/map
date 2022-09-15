import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { mapActions } from '../../../store/state/map.state';
import { LatLong } from '../../../utils/types.d';

export const locationServices = {
    postLocation(payload: FormData) {
        return async (dispatch: AppDispatch) => {
            try {
                const postResponse = await API.post('/Locations', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
                const dispatch = useStateDispatch();
                if (postResponse.data.success) {
                    const { locations } = useStateSelector((state) => state.map);
                    const getResponse = await API.get(`/Locations/${postResponse.data.id}`);
                    dispatch(mapActions.loadLocations([...locations, getResponse.data.data]));
                }
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
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
                    const response = await API.post(
                        `/Locations/${userLocation.lat}&${userLocation.long}/category?category=${selectedFilterCategory}`,
                        {},
                        { headers: { 'Content-Type': 'multipart/form-data' } },
                    );
                    console.log(response);
                } else {
                    const response = await API.post(
                        `/Locations/${userLocation.lat}&${userLocation.long}/category`,
                        {},
                        { headers: { 'Content-Type': 'multipart/form-data' } },
                    );
                    console.log(response);
                }
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
