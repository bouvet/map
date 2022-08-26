import { faker } from '@faker-js/faker';
import { Category, Location, category } from './types.d';

/**
 * returns a filtered array containing only locations with @param category.
 * @param locations @type Array\<Location\>
 * @param category  @type Category
 * @returns @type Array<Location>
 */
export function applyFilterLocationOnCategory(locations: Location[], category: Category) {
    const filterLocations: Location[] = [];

    for (let idx = 0; idx < locations.length; idx += 1) {
        if (locations[idx].properties.category.includes(category)) {
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
export function generateFakeLocations(n: number): Location[] {
    const locations: Location[] = [];

    for (let i = 0; i < n; i += 1) {
        const lorem = faker.lorem.paragraphs(2, '<br/>\n');
        const title = `${faker.unique(faker.name.lastName)} Park`;

        const randomCategoryIndex = Math.floor(Math.random() * category.length);
        const randomCategory = category[randomCategoryIndex];

        const longitude = Number(faker.address.longitude(6, 5.4, 4));
        const latitude = Number(faker.address.latitude(59, 58.4, 4));

        const fakeLocation: Location = {
            type: 'Feature',
            properties: {
                title,
                description: lorem,
                category: [randomCategory],
            },
            geometry: {
                coordinates: [longitude, latitude],
                type: 'Point',
            },
        };
        locations.push(fakeLocation);
    }

    return locations;
}
