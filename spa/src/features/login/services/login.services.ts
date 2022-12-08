import { API } from '../../../lib/api';
import { AppDispatch, uiActions } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
import { sleep } from '../../../utils/sleep';

export const loginServices = {
    login(payload: ILoginPayload) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                const { data } = await API.post('/auth/login', payload);

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));

                await sleep(2000);
                dispatch(authActions.userLogin(data));
                dispatch(uiActions.setShowSnackbar({ message: 'Du er logget inn', severity: 'success' }));
            } catch (error: any) {
                dispatch(uiActions.setShowSnackbar({ message: 'Feil epost eller passord', severity: 'error' }));
                dispatch(authActions.setLoading(false));
            }
        };
    },
    getToken(payload: { email: string }) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.post('/auth/reset-password', payload);

                await sleep(500);
                dispatch(
                    uiActions.setShowSnackbar({
                        message: `En link for å tilbakestille passordet er sendt til ${payload.email}`,
                        severity: 'success',
                    }),
                );

                return true;
            } catch (error) {
                console.error('error', error);
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
                return false;
            }
        };
    },
    changePassword(payload: IPasswordPayload) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));

                const { data } = await API.put('/users/password', payload);
                console.log(data);
                dispatch(uiActions.setShowSnackbar({ message: 'Passordet er endret', severity: 'success' }));
                await sleep(500);
                dispatch(authActions.setLoading(false));
                dispatch(authActions.setChangePasswordSuccess(true));

                return true;
            } catch (error) {
                console.error('error', error);
                await sleep(500);
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
                dispatch(authActions.setLoading(false));

                return false;
            }
        };
    },
};

interface ILoginPayload {
    email: string;
    password: string;
}

interface IPasswordPayload {
    password: string;
    confirmPassword: string;
}
