import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store/index';
import { Review } from '../../../utils/types.d';

export const locationinfoServices = {
    postReview(payload: Review) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/Reviews', payload);
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
