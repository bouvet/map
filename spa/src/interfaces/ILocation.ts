import { ICategory } from './ICategory';

export interface ILocation {
    id: string;
    type: 'Feature' /** mapbox type */;
    properties: IProperties;
    geometry: IGeometry;
    pinColor?: string;
}

export type LocationStatus = 'Under Review' | 'Approved' | 'Rejected' | 'Reported';

interface IProperties {
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
    status: LocationStatus;
    rating: number;
    category: Array<ICategory>;
}

interface IGeometry {
    coordinates: Array<number>;
    type: 'Point' /** mapbox type */;
}
