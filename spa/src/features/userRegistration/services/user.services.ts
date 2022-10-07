import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { UserType } from '../../../utils/types.d';

export const userService = {
    registerUser(payload: UserType) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
