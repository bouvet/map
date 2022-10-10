import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { LoginType } from '../../../utils/types.d';

export const loginService = {
    validateUser(payload: LoginType) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return async (dispatch: AppDispatch) => {
            try {
                const validateUser = await API.post('/auth/login', payload);
                console.log(validateUser);
                if (validateUser.status === 200) {
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
