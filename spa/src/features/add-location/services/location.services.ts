import { API } from '../../../lib/api';
import { addLocationActions, AppDispatch, uiActions } from '../../../store';
import { sleep } from '../../../utils';

export const locationServices = {
    addLocation(formData: FormData, callback: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(addLocationActions.setLoading(true));

                await API.post('/locations', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                await sleep(500);

                dispatch(addLocationActions.setLoading(false));
                dispatch(uiActions.showSnackbar({ message: 'Lokasjon er lagt til behandling', severity: 'success' }));

                dispatch(addLocationActions.reset());

                callback();
            } catch (error) {
                dispatch(
                    uiActions.showSnackbar({
                        message: 'Lagring av lokasjon feilet, vennligst prøv igjen',
                        severity: 'error',
                        visibleDuration: 5000,
                    }),
                );
                dispatch(addLocationActions.setLoading(false));
            }
        };
    },
};
