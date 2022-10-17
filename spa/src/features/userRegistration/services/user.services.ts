/* eslint-disable @typescript-eslint/no-unused-vars */
import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { IEmailType, IConfirmCode, IUserType, IUserTypeEdit } from '../../../utils/types.d';

export const userService = {
    postUser(payload: IUserType) {
        return async (dispatch: AppDispatch) => {
            try {
                const postUser = await API.post('/auth/register', payload);
                console.log(postUser);
                return true;
            } catch (error) {
                console.error('error', error);
                return false;
            }
        };
    },
    getUser(payload: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.get(`/users/${payload}`);

                localStorage.setItem('user', JSON.stringify(data));

                dispatch(authActions.userLogin(data));

                return true;
            } catch (error) {
                dispatch(authActions.logOut());

                return false;
            }
        };
    },
    editUser(payload: IUserTypeEdit) {
        return async (dispatch: AppDispatch) => {
            try {
                const editUser = await API.put(`/users/${payload.id}`, { headers: { 'Content-Type': 'multipart/form-data' } });
                console.log(editUser);
                return true;
            } catch (error) {
                console.error('error', error);
                return false;
            }
        };
    },
    getCode(payload: IEmailType) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data } = await API.post('/email', payload);

                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);

                setTimeout(() => {
                    dispatch(snackbarActions.setNotify({ message: 'Kode er sendt', severity: 'success' }));
                }, 500);

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

                setTimeout(() => {
                    dispatch(snackbarActions.setNotify({ message: 'Ny kode er sendt', severity: 'success' }));
                }, 500);
            } catch (error) {
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
            }
        };
    },
    confirmCode(payload: IConfirmCode) {
        return async (dispatch: AppDispatch) => {
            try {
                const confirmCode = await API.post('/email/confirm', payload);
                console.log(confirmCode);
                return true;
            } catch (error) {
                console.error('error', error);
                return false;
            }
        };
    },
};
