import { API } from '../../../lib/api';
import { AppDispatch } from '../../../store';
import { userActions } from '../../../store/state/user.state';
import { UserType } from '../../../utils/types.d';

export const userService = {
    postUser(payload: UserType) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    getUser() {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: UserData } = await API.get('/users');
                dispatch(userActions.setEmail(UserData));
                dispatch(userActions.setPassword(UserData));
                dispatch(userActions.setFirstName(UserData));
                dispatch(userActions.setLastName(UserData));
                dispatch(userActions.setDob(UserData));
                dispatch(userActions.setFavoriteCategoryIds(UserData));
            } catch (error) {
                // TODO: Push error to error state
                console.error('error', error);
            }
        };
    },
};
