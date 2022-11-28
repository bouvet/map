import { API } from '../../../lib/api';
import { addLocationActions, AppDispatch, uiActions } from '../../../store';

export const locationServices = {
    addLocation(formData: FormData) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/locations', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(data);
                dispatch(addLocationActions.setLoading(false));
            } catch (error) {
                console.error('error', error);
                dispatch(
                    uiActions.setShowSnackbar({
                        message: 'Lagring av lokasjon feilet, vennligst prøv igjen',
                        severity: 'error',
                        visibleDuration: 1500,
                    }),
                );
                dispatch(addLocationActions.setLoading(false));
            }
        };
    },
};
