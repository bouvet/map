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
    dob: string;
    registered: string;
    roles: [
        {
            id: string;
            name: string;
            created: string;
            updated: string;
            creator?: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
            editor?: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
        },
    ];
    favoriteCategories: ICategory[];
    originalProfileImage?: {
        id: string;
        originalFileName: string;
        blobUri: string;
        cdnUri: string;
        contentType: string;
        uploaded: string;
        originalImageId: null;
    };
    webpProfileImage?: {
        id: string;
        originalFileName: string;
        blobUri: string;
        cdnUri: string;
        contentType: string;
        uploaded: string;
        originalImageId: string;
    };
    token: string;
}
