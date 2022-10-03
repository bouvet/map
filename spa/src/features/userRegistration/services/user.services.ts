import { AppDispatch } from '../../../store';

export const userService = {
    registerUser(payload: FormData) {
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
