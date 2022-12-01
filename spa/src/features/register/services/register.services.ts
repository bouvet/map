import { API } from '../../../lib/api';
import { AppDispatch, authActions, uiActions, userActions } from '../../../store';
import { sleep } from '../../../utils/sleep';
import { IUserTypeEdit, IUser } from '../../../utils/types.d';

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
    getCode(email: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data }: { data: ICrateEmailResponse } = await API.post('/email', { email });

                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.address);
                localStorage.setItem('token', data.token);

                await sleep(500);

                dispatch(userActions.setLoading(false));
                dispatch(uiActions.setShouldNavigate(true));
                dispatch(uiActions.setShowSnackbar({ message: 'Kode er sendt', severity: 'success' }));
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
    confirmCode(email: string, confirmationCode: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data }: { data: IConfirmCodeResponse } = await API.post('/email/confirm', { email, confirmationCode });
                console.log(data);
                await sleep(500);

                dispatch(uiActions.setShouldNavigate(true));
                dispatch(uiActions.setShowSnackbar({ message: 'Kode er bekreftet', severity: 'success' }));
                return true;
            } catch (error) {
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
                return false;
            }
        };
    },
    register(user: IRegisterPayload, authMethod: string = 'Email') {
        return async (dispatch: AppDispatch) => {
            try {
                let url = '/auth/register';

                if (authMethod === 'Google') url = '/auth/register-with-google';

                const { data } = await API.post(url, user);

                dispatch(authActions.userLogin(data));
                dispatch(uiActions.setShowSnackbar({ message: 'Bruker er opprettet', severity: 'success' }));
            } catch (error) {
                console.error('error', error);
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt', severity: 'error' }));
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
    editInfo(payload: IUserTypeEdit) {
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
    resendCode() {
        return async (dispatch: AppDispatch) => {
            try {
                const id = localStorage.getItem('id');
                if (!id) {
                    throw new Error('Noe gikk galt');
                }

                const { data } = await API.post(`/resend-code/${id}`);

                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);

                await sleep(500);
                dispatch(uiActions.setShowSnackbar({ message: 'Ny kode er sendt', severity: 'success' }));
            } catch (error) {
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

interface IRegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    favoriteCategoryIds?: Array<string>;
}
