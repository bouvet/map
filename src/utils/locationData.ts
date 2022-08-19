import { faker } from '@faker-js/faker';
import {LocationData, Category} from "./types"



let location : LocationData = {
    latitude: 58.91645986493334,
    longitude: 5.732116770030319,
    name: "kanalpiren",                 // park name
    description: "",                    // park description
    category: ['Skating', 'Fotball', "Other"] // catagories the park fits
}


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

let locations = fake_locations(10);
console.log(locations);

console.log("Fotball parks:")
for (let idx in filter(locations, 'Fotball') ) {
    console.log(locations[idx].name)
} 
