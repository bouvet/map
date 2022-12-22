import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store/index';
import { reviewActions } from '../../../store/state/review.state';
import { uiActions } from '../../../store/state/ui.state';

export const reviewServices = {
    postReview(payload: any) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/Reviews', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
                const requestUrl = `/Reviews?locationId=${data.locationId}`;

                const { data: reviews } = await API.get(requestUrl);
                dispatch(reviewActions.setCurrentReviews(reviews));

                dispatch(uiActions.showSnackbar({ message: 'Omtale registrert!', severity: 'success' }));
            } catch (error) {
                console.error('error', error);
                dispatch(uiActions.showSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    getReviews(payload: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const requestUrl = `/Reviews?locationId=${payload}`;
                const { data } = await API.get(requestUrl);
                dispatch(reviewActions.setCurrentReviews(data));
            } catch (error) {
                console.error('error', error);
            }
        };
    },
};
