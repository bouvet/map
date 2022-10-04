import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';

export const userService = {
    registerUser(payload: FormData) {
        return async (dispatch: AppDispatch) => {
            try {
                const postUser = await API.post('/Users', payload, { headers: { 'Content-Type': 'application/json' } });
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
