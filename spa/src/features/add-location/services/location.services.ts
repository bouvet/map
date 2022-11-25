import { API } from '../../../lib/api';
import { addLocationActions, AppDispatch } from '../../../store';
// import { ILatLong } from '../../../utils/types.d';

export const locationServices = {
    addLocation(formData: FormData) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/locations', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(data);
                dispatch(addLocationActions.setLoading(false));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
    // getClosestLocation(userLocation: ILatLong, selectedCategory: string) {
    //     return async () => {
    //         try {
    //             if (selectedCategory) {
    //                 const { data } = await API.get(`/Locations/${userLocation.lat}&${userLocation.long}?category=${selectedCategory}`);
    //                 console.log(data);
    //                 return;
    //             }
    //             const { data } = await API.get(`/Locations/${userLocation.lat}&${userLocation.long}`);
    //             console.log(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    // },
};
