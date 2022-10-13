/* eslint-disable @typescript-eslint/no-unused-vars */
import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
import { IEmailType, ILoginType, IPasswordType } from '../../../utils/types.d';

export const loginService = {
    validateUser(payload: ILoginType) {
        return async (dispatch: AppDispatch) => {
            try {
                const validateUser = await API.post('/auth/login', payload);
                console.log(validateUser);
                if (validateUser.status === 200) {
                    localStorage.setItem('token', validateUser.data.token);
                    dispatch(authActions.logIn(validateUser.data));
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
    getToken(payload: IEmailType) {
        return async (dispatch: AppDispatch) => {
            try {
                const getToken = await API.post('/auth/reset-password', payload);
                console.log(getToken);
                if (getToken.status === 204) {
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
    changePassword(payload: IPasswordType) {
        return async (dispatch: AppDispatch) => {
            try {
                const changePassword = await API.put('/user/password', payload);
                console.log(changePassword);
                if (changePassword.status === 200) {
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
    changeEmail() {
        return async (dispatch: AppDispatch) => {
            try {
                const changeEmail = await API.put('/');
                console.log(changeEmail);
                if (changeEmail.status === 200) {
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
