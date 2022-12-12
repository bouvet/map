import { IProfileImage } from './IProfileImage';
import { IRole } from './IRole';
import { ICategory } from './ICategory';

export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address?: string;
    postalArea?: string;
    postalCode?: number;
    phoneNumber?: number;
    updated?: string;
    dob: string;
    registered: string;
    roles: IRole[];
    favoriteCategories: ICategory[];
    originalProfileImage?: IProfileImage;
    webpProfileImage?: IProfileImage;
    token: string;
}
