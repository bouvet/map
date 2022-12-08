import { FilePondFile } from 'filepond';
import { IUpdatePasswordRequest, IUser } from '../interfaces';
import { API } from '../lib/api';
import { AppDispatch, authActions, uiActions } from '../store';
import { sleep } from '../utils/sleep';

export const userServices = {
    login(email: string, password: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                const { data } = await API.post('/auth/login', { email, password });

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));

                await sleep(2000);
                dispatch(authActions.setLoading(false));
                dispatch(authActions.userLogin(data));
                dispatch(uiActions.setShowSnackbar({ message: 'Du er logget inn', severity: 'success' }));
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error: any) {
                dispatch(uiActions.setShowSnackbar({ message: 'Feil epost eller passord', severity: 'error' }));
                dispatch(authActions.setLoading(false));
            }
        };
    },
    validatePassword(email: string, password: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                await API.post('/auth/login', { email, password });

                await sleep(2000);
                dispatch(authActions.setLoading(false));
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error: any) {
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt, vennligst prøv igjen', severity: 'error' }));
                dispatch(authActions.setLoading(false));
            }
        };
    },
    updateProfileImage(userId: string, image: FilePondFile, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                const formData = new FormData();

                formData.append('ProfileImage', image.file);

                await API.put(`/users/${userId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const { data: user }: { data: IUser } = await API.get(`/users/${userId}`);

                await sleep(500);

                dispatch(authActions.setLoading(false));
                dispatch(authActions.updateUser(user));

                dispatch(uiActions.setShowSnackbar({ message: 'Opplasting av bilde vellykket', severity: 'success' }));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Opplasting av bilde feilet, prøv igjen', severity: 'error' }));
            }
        };
    },
    deleteProfileImage(userId: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                const formData = new FormData();

                formData.append('DeleteProfileImage', 'true');

                await API.put(`/users/${userId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                await sleep(500);

                dispatch(authActions.setLoading(false));
                dispatch(authActions.updateUser({ webpProfileImage: undefined }));

                dispatch(uiActions.setShowSnackbar({ message: 'Sletting av bilde vellykket', severity: 'success' }));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Opplasting av bilde feilet, prøv igjen', severity: 'error' }));
            }
        };
    },
    getInfo(userId: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.get(`/users/${userId}`);

                dispatch(authActions.userLogin(data));
            } catch (error) {
                dispatch(authActions.logOut());
            }
        };
    },
    updateProfile(userId: string, formData: FormData, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                await API.put(`/users/${userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                const { data: user }: { data: IUser } = await API.get(`/users/${userId}`);

                await sleep(500);

                dispatch(authActions.setLoading(false));
                dispatch(authActions.updateUser(user));

                dispatch(uiActions.setShowSnackbar({ message: 'Profilen er oppdatert', severity: 'success' }));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                console.error('error', error);
                dispatch(authActions.setLoading(false));
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    updatePassword(request: IUpdatePasswordRequest, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));
                await API.put('/users/password', request);

                await sleep(500);
                dispatch(authActions.setLoading(false));
                dispatch(uiActions.setShowSnackbar({ message: 'Passord er oppdatert 🎉', severity: 'success' }));

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(authActions.setLoading(false));
                dispatch(uiActions.setShowSnackbar({ message: 'Oppdatering av passord feilet, vennligst prøv igjen', severity: 'error' }));
            }
        };
    },
    deleteAccount(userId: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.delete(`/users/${userId}`);

                await sleep(500);
                dispatch(authActions.logOut());
                dispatch(uiActions.setShowSnackbar({ message: 'Konto er slettet', severity: 'success' }));
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(
                    uiActions.setShowSnackbar({
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
                dispatch(authActions.setLoading(true));
                await API.put('/users/change-email', { email });

                await sleep(500);
                dispatch(authActions.setLoading(false));
                dispatch(
                    uiActions.setShowSnackbar({
                        message: 'Epost sendt. Bruk lenken i e-posten for å bekrefte din nye e-post',
                        severity: 'success',
                    }),
                );

                dispatch(authActions.logOut());

                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Sending av epost feilet, vennligst prøv igjen', severity: 'error' }));
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
                    uiActions.setShowSnackbar({
                        message: 'E-posten er bekreftet, du kan nå logge inn',
                        severity: 'success',
                    }),
                );

                if (typeof callback === 'function') {
                    await sleep(500);
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Bekreftelse av epost feilet, vennligst prøv igjen', severity: 'error' }));
                if (typeof callback === 'function') {
                    await sleep(500);
                    callback();
                }
            }
        };
    },
};
