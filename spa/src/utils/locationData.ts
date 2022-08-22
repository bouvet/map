import { faker } from '@faker-js/faker';
import {LocationData, Category} from "./types"

export function filter(locations : LocationData[], category : Category) : LocationData[] {
    /**
     * returns a filtered array containing only locations with @param {category}.
     * @param {locations} @type {Array<LocationData>}
     * @param {category}  @type {Category}
     * @returns @type {Array<LocationData>}
     */
    let filterLocations : LocationData[] = [];

    for (let idx in locations){
        if(locations[idx].category.includes(category)){
            filterLocations.push(locations[idx]);
        }
    }
    
    return filterLocations;
}

export function fake_locations(n : number) : LocationData[] {
    /**
     * returns a array with fake locations with @param {n} amount of locations
     * @param {n} @type {number}
     * @returns @type {Array<LocationData>}
     */
    let locations : LocationData[] = [];
    let catagories : Array<Category> = ["Basketball", "Fotball", "Skating", "Pumptrack", "Other"];

    
    for (let i = 0; i < n; i++){
        let randomCategory = Math.floor(Math.random() * catagories.length);
        

        let fakeLocation : LocationData = {
            latitude: Number(faker.address.latitude(60, 55, 12)),
            longitude: Number(faker.address.longitude(7, 5, 12)),
            name: faker.unique(faker.name.lastName) + " Park",     
            description: faker.lorem.paragraphs(2, '<br/>\n'), 
            category: [catagories[randomCategory]] 
        }
    
        locations.push(fakeLocation)
    }

    return locations;
}
