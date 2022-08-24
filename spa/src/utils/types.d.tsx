// category types, TODO: fetch these from DB
export const category = ["Basketball", "Fotball", "Skating", "Pumptrack", "Tennis", "Volleyball", "Other"]
export type Category = typeof category[number];


/**
 * interface for coordinates in Location interface
 * @param coordinate @type Array\<number\>
 * @param type mapbox variable
 */
export interface Geometry {
    coordinates: Array<number>
    type: "Point";            // mapbox type Point
}

/**
 * interface for properties in Location interface
 * @param title string name of a park
 * @param description string description of park
 * @param category array with park categories
 * @param img Blob with image data
 * @param rating number to indicate star rating on park
 */
export interface Properties {
    /** @param title string name of a park */
    title: string;

    /** @param description string description of park */
    description: string;

    /** @param category array with park categories */
    category: Array<Category>;

    /** @param img Blob with image data */
    img?: Blob;

    /** @param rating number to indicate star rating on park */
    rating?: number;
}

/** 
 * @param type: Feature for mapbox pins
 * @param properties interface with info about location
 * @param geometry interface with coordinates
 * @param pinColor mapbox variable
 */
export interface Location {
  /** needed to make Location arrays */
    [index: string]: any; 
    
    /** @param type mapbox type: Feature */
    type: "Feature";

    /** @param Properties interface holds info about the Location */
    properties: Properties;

    /** @param geometry interface with coordinate */
    geometry: Geometry;
    
    /** @param pinColor mapbox pin color variable */
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
