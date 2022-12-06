export interface ICategory {
    [index: string]: string;
    emoji: string;
    name: string;
}

export interface IGeometry {
    coordinates: Array<number>;
    type: 'Point' /** mapbox type */;
}

export interface IProperties {
    title: string;
    description: string;
    originalImage?: {
        id: string;
        blobUri: string;
        cdnUri: string;
        contentType: string;
        uploaded: Date;
        uploader?: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        originalImageId: null;
        locationId: string;
        reviewId: string | null;
    };
    webpImage?: {
        id: string;
        blobUri: string;
        cdnUri: string;
        contentType: string;
        uploaded: Date;
        uploader?: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        originalImageId: string;
        locationId: string;
        reviewId: string | null;
    };
    status: string;
    rating: number;
    category: Array<ICategory>;
}

export interface ILocation {
    id: string;
    type: 'Feature' /** mapbox type */;
    properties: IProperties;
    geometry: IGeometry;
    pinColor?: string;
}

export interface IPutLocation {
    id: string;
    title: string;
    description: string;
    image?: File;
    status?: string;
    category?: string;
    longitude?: number;
    latitude?: number;
}

export interface ILatLong {
    lat: number;
    long: number;
}

export interface ISession {
    id: string;
    registered: Date;
    locationTitle: string;
    locationId: string;
    userId: string;
}

export interface ISessionType {
    id: string;
    registered?: Date;
    locationTitle?: string;
    locationId: string;
    userId: string;
}

export interface ISessionTypeGet {
    id: string;
    registered?: Date;
    locationTitle?: string;
    locationId: string;
    userId: string;
}

export interface IReviewType {
    rating: number;
    text?: string;
    image?: File;
    locationId: string;
}

export interface IReviewTypeGet {
    id: string;
    status: string;
    text: string;
    rating: number;
    originalImage?: {
        id: string;
        originalFileName: string;
        blobUri: string;
        cdnUri: string;
        contentType: string;
        uploaded: string;
        uploader?: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        originalImageId: null;
        locationId: string;
        reviewId: string;
    };
    webpImage?: {
        id: string;
        originalFileName: string;
        blobUri: string;
        cdnUri: string;
        contentType: string;
        uploaded: string;
        uploader?: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        originalImageId: string;
        locationId: string;
        reviewId: string;
    };
    created: string;
    updated?: string;
    creator?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        dob: string;
    };
    editor?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
    locationId: string;
}

export interface IUserType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    favoriteCategoryIds?: Array<string>;
}

export interface IUserTypeEdit {
    id: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    email?: string;
    favoriteCategoryIds?: Array<string>;
    profileImage?: File;
}

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
    favoriteCategories?: [
        {
            id: string;
            name: string;
            emoji: string;
            created: string;
            updated?: string;
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
    // in database?
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
