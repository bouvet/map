import { faker } from '@faker-js/faker';
import {Category, Location, category} from "./types.d"

/**
 * returns a filtered array containing only locations with @param category.
 * @param locations @type Array\<Location\>
 * @param category  @type Category
 * @returns @type Array<Location>
 */
export function getFilterOnCategory (locations: Location[], category: Category){
    let filterLocations : Location[] = [];

    for (let idx in locations){
        if(locations[idx].properties.category.includes(category)){
            filterLocations.push(locations[idx]);
        }
    }
     
    return filterLocations;
  }

/**
 * returns a array with fake locations with @param n amount of locations
 * @param n @type number
 * @returns @type Array\<Location\>
 */
export function generateFakeLocations(n : number) : Location[] {
    let locations : Location[] = [];

    for (let i = 0; i < n; i++){
        let lorem = faker.lorem.paragraphs(2, '<br/>\n');
        let title = faker.unique(faker.name.lastName) + " Park"

        let randomCategoryIndex = Math.floor(Math.random() * category.length);
        let randomCategory = category[randomCategoryIndex]

        let longitude = Number(faker.address.longitude(6, 5.4, 4));
        let latitude = Number(faker.address.latitude(59, 58.4, 4))

        let fakeLocation : Location = {
            type: "Feature",
            properties: {
                title: title,
                description: lorem, 
                category: [randomCategory] 
            },
            geometry: {
                coordinates: [ longitude, latitude ],
                type: "Point"
            },
        }
        locations.push(fakeLocation)
    }

    return locations;
}
