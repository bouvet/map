import { faker } from '@faker-js/faker';
import { LocationData, Category, Location, category } from './types.d';

let test: Location = {
    type: 'Feature',
    properties: {
        title: 'Lincoln Park',
        description: 'A northside park that is home to the Lincoln Park Zoo',
        category: ['Fotball'],
    },
    geometry: {
        coordinates: [5.7394, 58.9554],
        type: 'Point',
    },
    pinColor: 'purple',
};

//   console.log('location data type test.',test)

export function filter(locations: Location[], category: Category) {
    /**
     * returns a filtered array containing only locations with @param {category}.
     * @param {locations} @type {Array<Location>}
     * @param {category}  @type {Category}
     * @returns @type {Array<Location>}
     */
    let filterLocations: Location[] = [];

    for (let idx in locations) {
        if (locations[idx].properties.category.includes(category)) {
            filterLocations.push(locations[idx]);
        }
    }

    return filterLocations;
}

export function old_filter(locations: LocationData[], category: Category): LocationData[] {
    /**
     * returns a filtered array containing only locations with @param {category}.
     * @param {locations} @type {Array<LocationData>}
     * @param {category}  @type {Category}
     * @returns @type {Array<LocationData>}
     */
    let filterLocations: LocationData[] = [];

    for (let idx in locations) {
        if (locations[idx].category.includes(category)) {
            filterLocations.push(locations[idx]);
        }
    }

    return filterLocations;
}

export function old_fake_locations(n: number): LocationData[] {
    /**
     * returns a array with fake locations with @param {n} amount of locations
     * @param {n} @type {number}
     * @returns @type {Array<LocationData>}
     */
    let locations: LocationData[] = [];
    //let catagories : Array<Category> = ["Basketball", "Fotball", "Skating", "Pumptrack", "Other"];

    for (let i = 0; i < n; i++) {
        let randomCategory = Math.floor(Math.random() * category.length);

        let fakeLocation: LocationData = {
            latitude: Number(faker.address.latitude(60, 55, 12)),
            longitude: Number(faker.address.longitude(7, 5, 12)),
            name: faker.unique(faker.name.lastName) + ' Park',
            description: faker.lorem.paragraphs(2, '<br/>\n'),
            category: [category[randomCategory]],
        };

        locations.push(fakeLocation);
    }

    return locations;
}

export function fake_locations(n: number): Location[] {
    /**
     * returns a array with fake locations with @param {n} amount of locations
     * @param {n} @type {number}
     * @returns @type {Array<Location>}
     */
    let locations: Location[] = [];

    for (let i = 0; i < n; i++) {
        let randomCategory = Math.floor(Math.random() * category.length);

        let fakeLocation: Location = {
            type: 'Feature',
            properties: {
                title: faker.unique(faker.name.lastName) + ' Park',
                description: faker.lorem.paragraphs(2, '<br/>\n'),
                category: [category[randomCategory]],
            },
            geometry: {
                coordinates: [Number(faker.address.longitude(6, 5.4, 4)), Number(faker.address.latitude(59, 58.4, 4))],
                type: 'Point',
            },
        };

        locations.push(fakeLocation);
    }

    return locations;
}
