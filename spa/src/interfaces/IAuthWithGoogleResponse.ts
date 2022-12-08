import { IUser } from './IUser';

export interface IAuthWithGoogleResponse extends IUser {
    emailId?: string;
    authenticationMethod: string;
    isLoggingIn: boolean;
    isRegistering: boolean;
    emailIsVerified: boolean;
}
