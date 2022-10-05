import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';

export const userService = {
    registerUser(payload: any) {
        return async (dispatch: AppDispatch) => {
            try {
                const postUser = await API.post('/auth/register', payload);
                console.log(postUser);
                if (postUser.data.success) {
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
