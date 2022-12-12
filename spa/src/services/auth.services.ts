import { AppDispatch, uiActions } from '../store';
import { authActions } from '../store/state/auth.state';
import { API } from '../lib/api';
import { userActions } from '../store/state/user.state';
import { sleep } from '../utils/sleep';
import { IAuthWithGoogleResponse } from '../interfaces';

export const authServices = {
    login(email: string, password: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                const { data: user } = await API.post('/auth/login', { email, password });

                localStorage.setItem('token', user.token);
                localStorage.setItem('user', JSON.stringify(user));

                await sleep(2000);

                dispatch(authActions.userLogin(user));
                dispatch(userActions.updateUser(user));
                dispatch(uiActions.showSnackbar({ message: 'Du er logget inn', severity: 'success' }));
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error: any) {
                dispatch(uiActions.showSnackbar({ message: 'Feil epost eller passord', severity: 'error' }));
                dispatch(authActions.setLoading(false));
            }
        };
    },
    authenticateWithGoogle(code: string, callback: (navigationUri: string) => void) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: user }: { data: IAuthWithGoogleResponse } = await API.post('/auth/code', { code });

                dispatch(
                    userActions.updateUser({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        dob: user.dob,
                    }),
                );

                dispatch(userActions.setAuthMethod(user.authenticationMethod));

                await sleep(2000);

                if (user.isRegistering && user.emailIsVerified) {
                    callback('/register/personal-info');
                    return;
                }

                if (user.isRegistering && !user.emailIsVerified) {
                    dispatch(
                        uiActions.showSnackbar({
                            message: 'Du må bekrefte e-posten din først. Vi har sendt en e-post med en bekreftelse-kode',
                            severity: 'success',
                        }),
                    );
                    callback('/register/confirm-code');
                    return;
                }

                dispatch(authActions.userLogin(user));
                dispatch(userActions.updateUser(user));
                dispatch(uiActions.showSnackbar({ message: 'Du er logget inn', severity: 'success' }));

                callback('/');
            } catch (error: any) {
                await sleep(2000);
                dispatch(uiActions.showSnackbar({ message: 'Noe gikk galt, vennligst prøv igjen', severity: 'error' }));
                callback('register');
            }
        };
    },
    resetPassword(email: string, callback: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));
                await API.post('/auth/reset-password', { email });

                await sleep(500);
                dispatch(uiActions.showSnackbar({ message: 'Sending av epost fullført', severity: 'success' }));
                dispatch(authActions.setLoading(false));
                callback();
            } catch (error: any) {
                let errorMessage = 'Sending av epost feilet, vennligst prøv igjen';

                if (error.response?.status === 404) {
                    errorMessage = `${email} finnes ikke i systemet`;
                }

                await sleep(500);

                dispatch(uiActions.showSnackbar({ message: errorMessage, severity: 'error' }));
                dispatch(authActions.setLoading(false));
            }
        };
    },
};
