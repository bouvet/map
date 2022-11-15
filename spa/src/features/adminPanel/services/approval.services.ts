import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { IPutLocation } from '../../../utils/types.d';

export const approvalServices = {
    updateLocation(payload: IPutLocation) {
        return async (dispatch: AppDispatch) => {
            try {
                const putResponse = await API.put(`/Locations/${payload.id}`, payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(putResponse);
                dispatch(snackbarActions.setNotify({ message: 'Status er oppdatert', severity: 'success' }));
            } catch (error) {
                console.error(error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
            }
        };
    },
};
