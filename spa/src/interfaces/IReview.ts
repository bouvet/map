import { IImage } from './IImage';

export interface IReview {
    id: string;
    status: string;
    text: string;
    rating: number;
    originalImage?: IImage;
    webpImage?: IImage;
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
