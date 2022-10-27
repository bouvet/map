import { snackbarActions } from '../store/state/snackbar.state';
import { AppDispatch } from '../store';
import { authActions } from '../store/state/auth.state';
import { API } from '../lib/api';
import { userActions } from '../store/state/user.state';

interface IAuthenticateWithCodeResponse {
    id?: string;
    emailId?: string;
    email: string;
    firstName: string;
    lastName: string;
    address?: string;
    authenticationMethod: string;
    postalArea?: string;
    postalCode?: number;
    phoneNumber?: number;
    dob: Date;
    registered?: Date;
    updated?: Date;
    roles?: [];
    favoriteCategories?: [];
    isLoggingIn: boolean;
    isRegistering: boolean;
    emailIsVerified: boolean;
    token: string;
}

export const googleAuthServices = {
    authenticate(code: string) {
        return async (dispatch: AppDispatch) => {
            let timer;
            try {
                const { data: user }: { data: IAuthenticateWithCodeResponse } = await API.post('/auth/code', { code });

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
                timer = setTimeout(() => {
                    dispatch(snackbarActions.setNotify({ message: 'Du er logget inn', severity: 'success' }));
                }, 2000);
            } catch (error: any) {
                console.log(error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt..', severity: 'error', autohideDuration: null }));
            } finally {
                clearTimeout(timer);
            }
        };
    },
};
