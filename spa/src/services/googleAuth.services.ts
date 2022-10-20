import { snackbarActions } from '../store/state/snackbar.state';
import { AppDispatch } from '../store';
import { authActions } from '../store/state/auth.state';
import { API } from '../lib/api';

interface IAuthenticateWithCodeResponse {
    id?: string;
    emailId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    postalArea?: string;
    postalCode?: number;
    phoneNumber?: number;
    dob?: Date;
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
            try {
                const { data: user }: { data: IAuthenticateWithCodeResponse } = await API.post('/auth/code', { code });

                if (user.isRegistering && user.emailIsVerified) {
                    dispatch(authActions.setIsRegistering(true));
                    return;
                }

                if (!user.emailIsVerified) {
                    dispatch(authActions.setEmailIsValid(false));
                    return;
                }

                dispatch(authActions.userLogin(user));
                setTimeout(() => {
                    dispatch(snackbarActions.setNotify({ message: 'Du er logget in', severity: 'success', autohideDuration: 5 }));
                }, 2000);
            } catch (error: any) {
                console.log(error);
                dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt..', severity: 'error', autohideDuration: null }));
            }
        };
    },
};
