import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { snackbarActions } from '../../../store/state/snackbar.state';

import { LocationStatus } from '../../../interfaces';

export const approvalServices = {
    updateLocationStatus(status: LocationStatus, locationId: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const formData = new FormData();
                formData.append('status', status);

                await API.put(`/locations/${locationId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                dispatch(snackbarActions.setNotify({ message: 'Status er oppdatert', severity: 'success', autohideDuration: 1 }));
            } catch (error) {
                console.error(error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
            }
        };
    },
    deleteLocation(locationId: string) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.delete(`/locations/${locationId}`);
                dispatch(snackbarActions.setNotify({ message: 'Lokasjonen er slettet', severity: 'success', autohideDuration: 1 }));
            } catch (error) {
                console.error(error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
            }
        };
    },
};
