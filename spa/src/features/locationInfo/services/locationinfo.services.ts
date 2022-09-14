import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store/index';
import { reviewActions } from '../../../store/state/review.state';
import { ReviewTypeGet, ReviewType } from '../../../utils/types.d';

export const reviewServices = {
    postReview(payload: ReviewType) {
        return async (dispatch: AppDispatch) => {
            try {
                const response = await API.post('/Reviews', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
                const requestUrl = `/Reviews?locationId=${response.data.data.locationId}`;
                const reviews: ReviewTypeGet[] = await (await API.get(requestUrl)).data.data;
                dispatch(reviewActions.setCurrentReviews(reviews));
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
    getReviews(payload: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = `/Reviews?locationId=${payload}`;
                const reviews: ReviewTypeGet[] = await (await API.get(requestUrl)).data.data;
                dispatch(reviewActions.setCurrentReviews(reviews));
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
