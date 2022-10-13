/* eslint-disable @typescript-eslint/no-unused-vars */
import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { IEmailType, IConfirmCode, IUserType, IUserTypeEdit } from '../../../utils/types.d';

export const userService = {
    postUser(payload: IUserType) {
        return async (dispatch: AppDispatch) => {
            try {
                const postUser = await API.post('/auth/register', payload);
                console.log(postUser);
                if (postUser.status === 200) {
                    return true;
                }
                return false;
            } catch (error) {
                // TODO: Push error to error state
                console.error('error', error);
                return false;
            }
        };
    },
    editUser(payload: IUserTypeEdit) {
        return async (dispatch: AppDispatch) => {
            try {
                const editUser = await API.put(`/users/${payload.id}`);
                console.log(editUser);
                if (editUser.status === 200) {
                    return true;
                }
                return false;
            } catch (error) {
                // TODO: Push error to error state
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
                if (getCode.status === 200) {
                    localStorage.setItem('token', getCode.data.token);
                    return true;
                }
                return false;
            } catch (error) {
                // TODO: Push error to error state
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
                if (confirmCode.status === 200) {
                    return true;
                }
                return false;
            } catch (error) {
                // TODO: Push error to error state
                console.error('error', error);
                return false;
            }
        };
    },
};
