import { API } from '../../../lib/api';
import { addLocationActions, AppDispatch, uiActions } from '../../../store';

export const locationServices = {
    addLocation(formData: FormData) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/locations', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                dispatch(addLocationActions.setLoading(false));
                dispatch(uiActions.showSnackbar({ message: 'Lokasjon er lagt til behandling', severity: 'success' }));
                dispatch(uiActions.setShouldNavigate(true));
            } catch (error) {
                console.error('error', error);
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
