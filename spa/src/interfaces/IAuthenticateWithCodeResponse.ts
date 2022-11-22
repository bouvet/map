export interface IAuthenticateWithCodeResponse {
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
