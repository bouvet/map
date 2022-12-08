import { API } from '../../../lib/api';
import { AppDispatch, uiActions } from '../../../store';

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
                dispatch(uiActions.showSnackbar({ message: 'Status er oppdatert', severity: 'success' }));
            } catch (error) {
                console.error(error);
                dispatch(uiActions.showSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    deleteLocation(locationId: string) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.delete(`/locations/${locationId}`);
                dispatch(uiActions.showSnackbar({ message: 'Lokasjonen er slettet', severity: 'success' }));
            } catch (error) {
                console.error(error);
                dispatch(uiActions.showSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
};
