import { ICategory } from './ICategory';
import { IImage } from './IImage';

export interface ILocation {
    id: string;
    type: 'Feature' /** mapbox type */;
    properties: IProperties;
    geometry: IGeometry;
}

export type LocationStatus = 'Under Review' | 'Approved' | 'Rejected' | 'Reported';

interface IProperties {
    title: string;
    description: string;
    originalImage?: IImage;
    webpImage?: IImage;
    status: LocationStatus;
    rating: number;
    category: Array<ICategory>;
}

interface IGeometry {
    coordinates: Array<number>;
    type: 'Point' /** mapbox type */;
}
