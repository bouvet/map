// category types, TODO: fetch these from DB
// export const category = ['Basketball', 'Fotball', 'Skating', 'Pumptrack', 'Tennis', 'Volleyball', 'Other'];
// export type Category = typeof category[number];

export interface Category {
    [index: string]: string;
    emoji: string;
    name: string;
}

/**
 * interface for coordinates in Location interface
 * @param coordinate @type Array\<number\>
 * @param type mapbox variable
 */
export interface Geometry {
    /** @param coordinate @type Array\<number\> */
    coordinates: Array<number>;

    /** @param type mapbox variable */
    type: 'Point';
}

/**
 * interface for properties in Location interface
 * @param title string name of a park
 * @param description string description of park
 * @param category array with park categories
 * @param img string with image data
 * @param status string with approval status
 * @param rating number to indicate star rating on park
 */
export interface Properties {
    /** @param title string name of a park */
    title: string;

    /** @param description string description of park */
    description: string;

    /** @param category array with park categories */
    category: Array<Category>;

    /** @param img string with image data */
    image: string;

    /** @param status string with image data */
    status: string;

    /** @param rating number to indicate star rating on park */
    rating: number;
}

/**
 * @param type: Feature for mapbox pins
 * @param properties interface with info about location
 * @param geometry interface with coordinates
 * @param pinColor mapbox variable
 */
export interface Location {
    /** needed to make Location arrays */
    id: string;

    /** @param type mapbox type: Feature */
    type: 'Feature';

    /** @param Properties interface holds info about the Location */
    properties: Properties;

    /** @param geometry interface with coordinate */
    geometry: Geometry;

    /** @param pinColor mapbox pin color variable */
    pinColor?: string;
}

export interface PutLocation {
    id: string;

    title: string;

    description: string;

    Img?: File;

    status?: string;

    category?: string;

    longitude?: number;

    latitude?: number;
}

export interface LatLong {
    lat: number;
    long: number;
}

export interface ReviewType {
    rating: number;
    text?: string;
    image?: File;
    locationId: string;
}

export interface ReviewTypeGet {
    id: '';
    status: '';
    text: '';
    rating: number;
    originalImage?: {
        id: '';
        originalFileName: '';
        blobUri: '';
        cdnUri: '';
        contentType: '';
        uploaded: '';
        uploader?: {
            id: '';
            email: '';
            firstName: '';
            lastName: '';
        };
        originalImageId: null;
        locationId: '';
        reviewId: '';
    };
    webpImage?: {
        id: '';
        originalFileName: '';
        blobUri: '';
        cdnUri: '';
        contentType: '';
        uploaded: '';
        uploader?: {
            id: '';
            email: '';
            firstName: '';
            lastName: '';
        };
        originalImageId: '';
        locationId: '';
        reviewId: '';
    };
    created: '';
    updated?: '';
    creator?: {
        id: '';
        email: '';
        firstName: '';
        lastName: '';
    };
    editor?: {
        id: '';
        email: '';
        firstName: '';
        lastName: '';
    };
    locationId: '';
}

export interface UserType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    favoriteCategoryIds?: Array<string>;
}

export interface UserTypeGet {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    favoriteCategoryIds?: Array<string>;
}

export interface LoginType {
    email: string;
    password: string;
}
