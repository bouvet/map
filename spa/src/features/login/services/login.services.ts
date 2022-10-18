import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { IEmailType, ILoginType, IPasswordType } from '../../../utils/types.d';

export const loginServices = {
    login(payload: ILoginType) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/auth/login', payload);

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));

                setTimeout(() => {
                    dispatch(authActions.userLogin(data));
                    dispatch(snackbarActions.setNotify({ message: 'Du er logget inn', severity: 'success' }));
                }, 2000);

                return true;
            } catch (error: any) {
                const invalidCreds = error.response.data.errors['Authentication.InvalidCredentials'][0];

                if (invalidCreds) {
                    dispatch(snackbarActions.setNotify({ message: 'Feil epost eller passord', severity: 'error', autohideDuration: null }));
                    dispatch(authActions.setLoading(false));

                    return false;
                }

                console.error('error', error.response.data.errors['Authentication.InvalidCredentials'][0]);

                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                dispatch(authActions.setLoading(false));
                return false;
            }
        };
    },
    getToken(payload: IEmailType) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/auth/reset-password', payload);

                setTimeout(() => {
                    dispatch(
                        snackbarActions.setNotify({
                            message: `En link for å tilbakestille passordet er sendt til ${payload.email}`,
                            severity: 'success',
                        }),
                    );
                }, 500);

                return true;
            } catch (error) {
                console.error('error', error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                return false;
            }
        };
    },
    changePassword(payload: IPasswordType) {
        return async (dispatch: AppDispatch) => {
            try {
                const changePassword = await API.put('/users/password', payload);
                console.log(changePassword);

                setTimeout(() => {
                    dispatch(snackbarActions.setNotify({ message: 'Passordet er endret', severity: 'success' }));
                }, 500);

                return true;
            } catch (error) {
                console.error('error', error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                return false;
            }
        };
    },
    changeEmail() {
        return async () => {
            try {
                const changeEmail = await API.put('/');
                console.log(changeEmail);
                return true;
            } catch (error) {
                console.error('error', error);
                return false;
            }
        };
    },
};
