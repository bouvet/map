import { FilePondFile } from 'filepond';
import { IUpdatePasswordRequest, IUser } from '../interfaces';
import { API } from '../lib/api';
import { AppDispatch, authActions, uiActions, userActions } from '../store';
import { sleep } from '../utils/sleep';

export const userServices = {
    validatePassword(email: string, password: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(userActions.setLoading(true));

                await API.post('/auth/login', { email, password });

                await sleep(2000);
                dispatch(userActions.setLoading(false));
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error: any) {
                dispatch(uiActions.showSnackbar({ message: 'Noe gikk galt, vennligst prøv igjen', severity: 'error' }));
                dispatch(userActions.setLoading(false));
            }
        };
    },
    updateProfileImage(userId: string, image: FilePondFile, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(userActions.setLoading(true));

                const formData = new FormData();

                formData.append('ProfileImage', image.file);

                await API.put(`/users/${userId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const { data: user }: { data: IUser } = await API.get(`/users/${userId}`);

                await sleep(500);

                dispatch(userActions.updateUser(user));

                dispatch(uiActions.showSnackbar({ message: 'Opplasting av bilde vellykket', severity: 'success' }));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.showSnackbar({ message: 'Opplasting av bilde feilet, prøv igjen', severity: 'error' }));
                dispatch(userActions.setLoading(false));
            }
        };
    },
    deleteProfileImage(userId: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(userActions.setLoading(true));

                const formData = new FormData();

                formData.append('DeleteProfileImage', 'true');

                await API.put(`/users/${userId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                await sleep(500);

                dispatch(userActions.updateUser({ webpProfileImage: undefined }));

                dispatch(uiActions.showSnackbar({ message: 'Sletting av bilde vellykket', severity: 'success' }));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.showSnackbar({ message: 'Opplasting av bilde feilet, prøv igjen', severity: 'error' }));
                dispatch(userActions.setLoading(false));
            }
        };
    },
    getInfo(userId: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: user } = await API.get(`/users/${userId}`);

                dispatch(authActions.userLogin(user));
                dispatch(userActions.updateUser(user));
            } catch (error) {
                dispatch(authActions.logOut());
            }
        };
    },
    updateProfile(userId: string, formData: FormData, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(userActions.setLoading(true));

                await API.put(`/users/${userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                const { data: user }: { data: IUser } = await API.get(`/users/${userId}`);

                await sleep(500);

                dispatch(userActions.updateUser(user));

                dispatch(uiActions.showSnackbar({ message: 'Profilen er oppdatert', severity: 'success' }));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                console.error('error', error);
                dispatch(userActions.setLoading(false));
                dispatch(uiActions.showSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    updatePassword(request: IUpdatePasswordRequest, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(userActions.setLoading(true));
                await API.put('/users/password', request);

                await sleep(500);
                dispatch(userActions.setLoading(false));
                dispatch(uiActions.showSnackbar({ message: 'Passord er oppdatert 🎉', severity: 'success' }));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(userActions.setLoading(false));
                dispatch(uiActions.showSnackbar({ message: 'Oppdatering av passord feilet, vennligst prøv igjen', severity: 'error' }));
            }
        };
    },
    deleteAccount(userId: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.delete(`/users/${userId}`);

                await sleep(500);
                dispatch(authActions.logOut());
                dispatch(uiActions.showSnackbar({ message: 'Konto er slettet', severity: 'success' }));
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(
                    uiActions.showSnackbar({
                        message: 'Noe gikk galt med slettingen, beklager det. Vennligst prøv igjen og sjekk at passordet er korrekt',
                        severity: 'error',
                    }),
                );
            }
        };
    },
    changeEmail(email: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(userActions.setLoading(true));
                await API.put('/users/change-email', { email });

                await sleep(500);
                dispatch(userActions.setLoading(false));
                dispatch(
                    uiActions.showSnackbar({
                        message: 'Epost sendt. Bruk lenken i e-posten for å bekrefte din nye e-post',
                        severity: 'success',
                    }),
                );

                dispatch(authActions.logOut());

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.showSnackbar({ message: 'Sending av epost feilet, vennligst prøv igjen', severity: 'error' }));
                dispatch(userActions.setLoading(false));
            }
        };
    },
    confirmEmail(callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.logOut());
                await API.put('/users/confirm-email');

                await sleep(500);
                dispatch(
                    uiActions.showSnackbar({
                        message: 'E-posten er bekreftet, du kan nå logge inn',
                        severity: 'success',
                    }),
                );

                if (typeof callback === 'function') {
                    await sleep(500);
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.showSnackbar({ message: 'Bekreftelse av epost feilet, vennligst prøv igjen', severity: 'error' }));
                if (typeof callback === 'function') {
                    await sleep(500);
                    callback();
                }
            }
        };
    },
    changePassword(password: string, confirmPassword: string) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                const { data } = await API.put('/users/password', { password, confirmPassword });
                console.log(data);
                dispatch(uiActions.showSnackbar({ message: 'Passordet er endret', severity: 'success' }));
                await sleep(500);
            } catch (error) {
                console.error('error', error);
                await sleep(500);
                dispatch(uiActions.showSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
                dispatch(authActions.setLoading(false));
            }
        };
    },
};
