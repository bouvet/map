import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { sleep } from '../../../utils/sleep';
import { IEmailType, ILoginType, IPasswordType } from '../../../utils/types.d';

export const loginServices = {
    login(payload: ILoginType) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/auth/login', payload);

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));

                await sleep(2000);
                dispatch(authActions.userLogin(data));
                dispatch(snackbarActions.setNotify({ message: 'Du er logget inn', severity: 'success' }));
            } catch (error: any) {
                const invalidCreds = error.response.data.errors['Authentication.InvalidCredentials'][0];

                if (invalidCreds) {
                    dispatch(snackbarActions.setNotify({ message: 'Feil epost eller passord', severity: 'error', autohideDuration: null }));
                    dispatch(authActions.setLoading(false));
                } else {
                    console.error('error', error.response.data.errors['Authentication.InvalidCredentials'][0]);

                    dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                    dispatch(authActions.setLoading(false));
                }
            }
        };
    },
    getToken(payload: IEmailType) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/auth/reset-password', payload);

                await sleep(500);
                dispatch(
                    snackbarActions.setNotify({
                        message: `En link for å tilbakestille passordet er sendt til ${payload.email}`,
                        severity: 'success',
                    }),
                );

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
                dispatch(authActions.setLoading(true));

                const { data } = await API.put('/users/password', payload);
                console.log(data);

                dispatch(snackbarActions.setNotify({ message: 'Passordet er endret', severity: 'success' }));
                await sleep(500);
                dispatch(authActions.setLoading(false));
                dispatch(authActions.setChangePasswordSuccess(true));

                return true;
            } catch (error) {
                console.error('error', error);
                await sleep(500);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                dispatch(authActions.setLoading(false));

                return false;
            }
        };
    },
};
