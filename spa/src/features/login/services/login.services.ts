import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
import { ILoginType } from '../../../utils/types.d';

export const loginService = {
    validateUser(payload: ILoginType) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
};
