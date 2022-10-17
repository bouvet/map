/* eslint-disable @typescript-eslint/no-unused-vars */
import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
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
                const getCode = await API.post('/email', payload);
                console.log(getCode);
                localStorage.setItem('token', getCode.data.token);
                return true;
            } catch (error) {
                console.error('error', error);
                return false;
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
