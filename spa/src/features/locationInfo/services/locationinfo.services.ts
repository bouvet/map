import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store/index';
import { reviewActions } from '../../../store/state/review.state';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { IReviewType, IReviewTypeGet } from '../../../utils/types.d';

export const reviewServices = {
    postReview(payload: IReviewType) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/Reviews', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
                const requestUrl = `/Reviews?locationId=${data.locationId}`;
                const reviews: IReviewTypeGet[] = await (await API.get(requestUrl)).data;
                dispatch(reviewActions.setCurrentReviews(reviews));
                dispatch(snackbarActions.setNotify({ message: 'Omtale registrert!', severity: 'success' }));
            } catch (error) {
                console.error('error', error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    getReviews(payload: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = `/Reviews?locationId=${payload}`;
                const reviews: IReviewTypeGet[] = await (await API.get(requestUrl)).data;
                dispatch(reviewActions.setCurrentReviews(reviews));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
};
