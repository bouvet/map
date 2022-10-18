import { googleUserInfo, fullGoogleAuthUrl } from '../lib/googleAPI';
import { snackbarActions } from '../store/state/snackbar.state';
import { AppDispatch } from '../store';
import { authActions } from '../store/state/auth.state';

export interface IGoogleResponse {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export const googleAuthServices = {
    getUserInfo(accessToken: string) {
        return async (dispatch: AppDispatch) => {
            try {
                const { data }: { data: IGoogleResponse } = await googleUserInfo.get(`?alt=json&access_token=${accessToken}`);

                console.log(data);

                // Send user details to backend and get response...

                const isRegistrering = true;

                // IF user is registrering redirect to personalization

                // ELSE see below...

                // Set token in localStorage
                // Set user in localStorage

                setTimeout(() => {
                    if (isRegistrering) {
                        dispatch(authActions.setIsRegistrering(true));
                    }
                    if (!isRegistrering) {
                        dispatch(authActions.userLogin(data));
                    }
                }, 5000);
            } catch (error: any) {
                console.log(error.response.status);
                if (error.response.status === 401) {
                    window.location.replace(fullGoogleAuthUrl);
                }
                if (error.response.status !== 401) {
                    dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
                    setTimeout(() => {
                        window.location.replace(fullGoogleAuthUrl);
                    }, 3000);
                }
            }
        };
    },
};
