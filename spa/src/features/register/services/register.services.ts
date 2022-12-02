import { API } from '../../../lib/api';
import { AppDispatch, authActions, uiActions, userActions } from '../../../store';
import { sleep } from '../../../utils/sleep';

interface ICrateEmailResponse {
    id: string;
    address: string;
    token: string;
}

interface IConfirmCodeResponse {
    id: string;
    address: string;
    confirmationCode: 0;
    confirmed: true;
    created: string;
    updated: string;
}

export const registerServices = {
    getCode(email: string, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data }: { data: ICrateEmailResponse } = await API.post('/email', { email });

                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.address);
                localStorage.setItem('token', data.token);

                dispatch(uiActions.setShowSnackbar({ message: 'Kode er sendt', severity: 'success' }));
                dispatch(userActions.setAuthMethod('email'));

                await sleep(500);
                dispatch(userActions.setLoading(false));
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (error: any) {
                console.log(error.response.data.title);
                if (error.response.data.title === 'Email has already been registered') {
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
                console.log(data);
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
    register(user: IRegisterPayload, callback?: () => void) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/auth/register', user);

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

interface IRegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    favoriteCategoryIds?: Array<string>;
}
