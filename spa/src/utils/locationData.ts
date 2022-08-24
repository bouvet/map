import { faker } from '@faker-js/faker';
import {Category, Location, category} from "./types.d"

export function filter (locations: Location[], category: Category){
    /**
     * returns a filtered array containing only locations with @param {category}.
     * @param {locations} @type {Array<Location>}
     * @param {category}  @type {Category}
     * @returns @type {Array<Location>}
     */

    // new output array
    let filterLocations : Location[] = [];

    // loop through input array locations
    for (let idx in locations){
    // if the location includes category includes the category add it to the output array.
        if(locations[idx].properties.category.includes(category)){
            filterLocations.push(locations[idx]);
        }
    }
     
    return filterLocations;
  }

export function fake_locations(n : number) : Location[] {
    /**
     * returns a array with fake locations with @param {n} amount of locations
     * @param {n} @type {number}
     * @returns @type {Array<Location>}
     */
    
    // output array
    let locations : Location[] = [];

    // loop n times
    for (let i = 0; i < n; i++){
        // random number to select from a random category from the category array
        let randomCategory = Math.floor(Math.random() * category.length);
        
        // new location
        let fakeLocation : Location = {
            type: "Feature",
            properties: {
                // faker.unique makes sure it wont give same name twice
                title: faker.unique(faker.name.lastName) + " Park",
                description:faker.lorem.paragraphs(2, '<br/>\n'), 
                // random category from the category array defined in ./types.d.tsx
                category: [category[randomCategory]] 
            },
            geometry: {
                coordinates: [
                    // random cooridnate. format: (max, min, accuracy/decimal numbers)
                    Number(faker.address.longitude(6, 5.4, 4)),
                    Number(faker.address.latitude(59, 58.4, 4)) ],
                type: "Point"
            },
        }
        // add location to output array.
        locations.push(fakeLocation)
    }

    return locations;
}
