// category types, TODO: fetch these from DB
export const category = ["Basketball", "Fotball", "Skating", "Pumptrack", "Tennis", "Volleyball", "Other"]
export type Category = typeof category[number];


// interface for coordinates in Location interface
export interface Geometry {
    coordinates: Array<number>
    type: "Point";            // mapbox type Point
}

// interface for properties in Location interface
export interface Properties {
    title: string;
    description: string;
    category: Array<Category>;
    img?: Blob;
    rating?: number;
}

// Location interface
export interface Location {
    [index: string]: any;   // needed to make Location arrays
    type: "Feature";        // mapbox feature
    properties: Properties;
    geometry: Geometry;
    pinColor?: string;
}


/*
let test : Location =  {
    type: "Feature",
    properties: {
      title: 'Lincoln Park',
      description: 'A northside park that is home to the Lincoln Park Zoo',
      category: ['Fotball']
    },
    geometry: {
      coordinates: [5.7394, 58.9554],
      type: 'Point',
    },
    pinColor: 'purple',
  }


    {
      type: 'Feature',
      properties: {
        title: 'Lincoln Park',
        description: 'A northside park that is home to the Lincoln Park Zoo',
      },
      geometry: {
        coordinates: [5.7394, 58.9554],
        type: 'Point',
      },
      pinColor: 'purple',
    }

*/
