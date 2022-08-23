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

// new interface
export interface Geometry {
    coordinates: Array<number>
    type: "Point";
}
export interface Properties {
    title: string;
    description: string;
    category: Array<Category>;
    img?: Blob;
    rating?: number;
}
export interface Location {
    [index: string]: any;
    type: "Feature";
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




 {
      "type": "Feature",
      "properties": {
        "title": "Lincoln Park",
        "description": "A northside park that is home to the Lincoln Park Zoo"
      },
      "geometry": {
        "coordinates": [-87.637596, 41.940403],
        "type": "Point"
      }
    },

{
      "type": "Feature",
      "properties": {
        "title": "Burnham Park",
        "description": "A lakefront park on Chicago's south side"
      },
      "geometry": {
        "coordinates": [-87.603735, 41.829985],
        "type": "Point"
      }
    },
*/
