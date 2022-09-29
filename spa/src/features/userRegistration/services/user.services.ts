import { AppDispatch } from '../../../store';
import { UserType } from '../../../utils/types.d';

export const userService = {
    registerUser(payload: UserType) {
        return async (dispatch: AppDispatch) => {
            try {
                console.log('hello');
            } catch (error) {
                // TODO: Push error to error state
                console.error(error);
            }
        };
    },
};
