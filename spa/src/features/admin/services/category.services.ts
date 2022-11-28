import { API } from '../../../lib/api';
import { AppDispatch, uiActions } from '../../../store';

export const categoryServices = {
    create(payload: ICreatePayload) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/categories', payload);

                dispatch(uiActions.setShowSnackbar({ message: 'Kategori er lagt til', severity: 'success' }));

                return true;
            } catch (error) {
                console.error('error', error);
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
                return false;
            }
        };
    },
};

interface ICreatePayload {
    name: string;
    emoji: string;
}
