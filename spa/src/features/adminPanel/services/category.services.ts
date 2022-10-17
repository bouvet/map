import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { ICategoryTypePost } from '../../../utils/types.d';

export const categoryServices = {
    postCategory(payload: ICategoryTypePost) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/categories', payload);

                dispatch(
                    snackbarActions.setNotify({
                        message: 'Kategori er lagt til',
                        severity: 'success',
                    }),
                );

                return true;
            } catch (error) {
                console.error('error', error);
                return false;
            }
        };
    },
};
