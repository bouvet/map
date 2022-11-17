/* eslint-disable consistent-return */
import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { uiActions } from '../../../store/state/ui.state';
import { sleep } from '../../../utils/sleep';
import { IUserTypeEdit, IUser } from '../../../utils/types.d';

export const userServices = {
    register(user: IRegisterPayload, authMethod: string = 'Email') {
        return async (dispatch: AppDispatch) => {
            try {
                let url = '/auth/register';

                if (authMethod === 'Google') url = '/auth/register-with-google';

                const { data } = await API.post(url, user);

                dispatch(authActions.userLogin(data));
                dispatch(snackbarActions.setNotify({ message: 'Bruker er opprettet', severity: 'success' }));
            } catch (error) {
                console.error('error', error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
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
                    dispatch(snackbarActions.setNotify({ message: 'Profilen er oppdatert', severity: 'success' }));
                }, 500);
            } catch (error) {
                console.error('error', error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
            }
        };
    },
    getCode(payload: { email: string }) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/email', payload);

                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);

                await sleep(500);
                dispatch(snackbarActions.setNotify({ message: 'Kode er sendt', severity: 'success' }));

                return true;
            } catch (error) {
                console.error('error', error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                return false;
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
                dispatch(snackbarActions.setNotify({ message: 'Ny kode er sendt', severity: 'success' }));
            } catch (error) {
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
            }
        };
    },
    confirmCode(payload: IConfirmCodePayload) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/email/confirm', payload);
                console.log(data);
                await sleep(500);

                dispatch(uiActions.setShouldNavigate(true));
                dispatch(snackbarActions.setNotify({ message: 'Kode er bekreftet', severity: 'success' }));
                return true;
            } catch (error) {
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                return false;
            }
        };
    },
    deleteAccount(payload: IUser) {
        return async (dispatch: AppDispatch) => {
            try {
                await API.delete(`/users/${payload.id}`);

                await sleep(500);
                dispatch(snackbarActions.setNotify({ message: 'Konto er slettet', severity: 'success' }));
            } catch (error) {
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
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

interface IConfirmCodePayload {
    email: string;
    confirmationCode: string;
}
