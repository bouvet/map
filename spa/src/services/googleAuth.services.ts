import { AppDispatch, uiActions } from '../store';
import { authActions } from '../store/state/auth.state';
import { API } from '../lib/api';
import { userActions } from '../store/state/user.state';
import { sleep } from '../utils/sleep';
import { IAuthenticateWithCodeResponse } from '../interfaces';

export const googleAuthServices = {
    authenticate(code: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data: user }: { data: IAuthenticateWithCodeResponse } = await API.post('/auth/code', { code });

                await sleep(2000);

                if (user.isRegistering && user.emailIsVerified) {
                    dispatch(userActions.setEmail(user.email));
                    dispatch(userActions.setFirstName(user.firstName));
                    dispatch(userActions.setLastName(user.lastName));
                    dispatch(userActions.setAuthMethod(user.authenticationMethod));
                    dispatch(authActions.setEmailIsValid(true));
                    dispatch(authActions.setIsRegistering(true));
                    return;
                }

                if (!user.emailIsVerified) {
                    dispatch(authActions.setEmailIsValid(false));
                    dispatch(authActions.setIsRegistering(true));
                    return;
                }

                dispatch(authActions.userLogin(user));
                dispatch(uiActions.setShowSnackbar({ message: 'Du er logget inn', severity: 'success' }));
            } catch (error: any) {
                await sleep(2000);
                dispatch(uiActions.setShowSnackbar({ message: 'Noe gikk galt, vennligst prøv igjen', severity: 'error' }));
                dispatch(authActions.setLoading(false));
                dispatch(uiActions.setShouldNavigate(true));
            }
        };
    },
};
