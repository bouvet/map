import { AppDispatch } from '../../../store/index';
import { Review } from '../../../lib/api';

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
