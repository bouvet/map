import { IConfirmCodeResponse, ICrateEmailResponse, IRegisterRequest } from '../../../interfaces';
import { API } from '../../../lib/api';
import { AppDispatch, authActions, uiActions, userActions } from '../../../store';
import { sleep } from '../../../utils/sleep';

export const registerServices = {
    getCode(email: string, callback?: (emailIsConfirmed?: boolean) => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(userActions.setLoading(true));

                const { data }: { data: ICrateEmailResponse } = await API.post('/email', { email });

                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.address);
                localStorage.setItem('token', data.token);

                if (data.confirmed) {
                    dispatch(userActions.setLoading(false));
                    if (typeof callback === 'function') {
                        callback(true);
                    }
                    return;
                }

                dispatch(uiActions.setShowSnackbar({ message: 'Kode er sendt', severity: 'success' }));
                dispatch(userActions.setAuthMethod('email'));

                await sleep(500);
                dispatch(userActions.setLoading(false));
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error: any) {
                if (error.response?.data?.title === 'Email has already been registered') {
                    dispatch(uiActions.setShowSnackbar({ message: 'E-posten er allerede registrert', severity: 'error' }));
                    dispatch(userActions.setLoading(false));
                    return;
                }
                dispatch(userActions.setLoading(false));
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    confirmCode(email: string, confirmationCode: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data }: { data: IConfirmCodeResponse } = await API.post('/email/confirm', { email, confirmationCode });

                dispatch(userActions.setEmailVerified(data.confirmed));
                dispatch(uiActions.setShowSnackbar({ message: 'Kode er bekreftet', severity: 'success' }));

                localStorage.setItem('emailVerified', JSON.stringify(data.confirmed));

                await sleep(500);
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    register(user: IRegisterRequest, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(authActions.setLoading(true));
                const { data } = await API.post('/auth/register', user);

                localStorage.clear();

                dispatch(authActions.userLogin(data));
                dispatch(uiActions.setShowSnackbar({ message: 'Bruker er opprettet', severity: 'success' }));

                await sleep(500);
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                console.error('error', error);
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
    resendCode() {
        return async (dispatch: AppDispatch) => {
            try {
                const id = localStorage.getItem('id');
                if (!id) {
                    dispatch(uiActions.setShowSnackbar({ message: 'Vi kunne ikke sende ny kode', severity: 'error' }));
                }

                const { data } = await API.post(`/email/resend-code/${id}`);

                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);

                await sleep(500);
                dispatch(uiActions.setShowSnackbar({ message: 'Ny kode er sendt', severity: 'success' }));
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
            }
        };
    },
};
