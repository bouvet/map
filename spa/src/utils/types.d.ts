// category types, TODO: fetch these from DB
export type Category = "Basketball" | "Fotball" | "Skating" | "Pumptrack" | "Other";

// interface for location object
export interface LocationData {
    [index: string]: any;
    latitude: number;
    longitude: number;
    name: string;
    description: string;
    category: Array<Category>;
}
