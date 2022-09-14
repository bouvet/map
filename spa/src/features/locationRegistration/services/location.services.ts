import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { API } from '../../../lib/api';
import { mapActions } from '../../../store/state/map.state';

export const locationServices = {
    postLocation(payload: FormData) {
        return async () => {
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
};
