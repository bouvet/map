// category types, TODO: fetch these from DB
export const category = ["Basketball", "Fotball", "Skating", "Pumptrack", "Tennis", "Volleyball", "Other"]
export type Category = typeof category[number];


// interface for location object
export interface LocationData {
    [index: string]: any;
    latitude: number;
    longitude: number;
    name: string;
    description: string;
    category: Array<Category>;
}
