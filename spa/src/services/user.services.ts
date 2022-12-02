import { FilePondFile } from 'filepond';
import { IUser } from '../interfaces';
import { API } from '../lib/api';
import { AppDispatch, authActions, uiActions } from '../store';
import { sleep } from '../utils/sleep';

export const userServices = {
    updateProfileImage(id: string, image: FilePondFile, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                const formData = new FormData();

                formData.append('ProfileImage', image.file);

                await API.put(`/users/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const { data: user }: { data: IUser } = await API.get(`/users/${id}`);

                await sleep(500);

                console.log('USER', user);

                dispatch(authActions.setLoading(false));
                dispatch(authActions.setUserProfileImage(user));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Opplasting av bilde feilet, prøv igjen', severity: 'error' }));
            }
        };
    },
    getInfo(payload: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.get(`/users/${payload}`);

                dispatch(authActions.userLogin(data));
            } catch (error) {
                dispatch(authActions.logOut());
            }
        };
    },
    editInfo(payload: any) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.put(`/users/${payload.id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
                console.log('Payload', payload);

                setTimeout(() => {
                    dispatch(uiActions.setShowSnackbar({ message: 'Profilen er oppdatert', severity: 'success' }));
                }, 500);
            } catch (error) {
                console.error('error', error);
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    deleteAccount(payload: IUser) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.delete(`/users/${payload.id}`);

                await sleep(500);
                dispatch(uiActions.setShowSnackbar({ message: 'Konto er slettet', severity: 'success' }));
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
};
