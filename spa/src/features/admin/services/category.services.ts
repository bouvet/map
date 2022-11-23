import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { snackbarActions } from '../../../store/state/snackbar.state';

export const categoryServices = {
    create(payload: ICreatePayload) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/categories', payload);

                dispatch(snackbarActions.setNotify({ message: 'Kategori er lagt til', severity: 'success' }));

                return true;
            } catch (error) {
                console.error('error', error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                return false;
            }
        };
    },
};

interface ICreatePayload {
    name: string;
    emoji: string;
}
