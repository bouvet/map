export interface IRegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    favoriteCategoryIds: Array<string>;
}
