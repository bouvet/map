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

    for (let i = 0; i < locations.length; i += 1) {
        if (locations[i].properties.category.includes(category)) {
            filterLocations.push(locations[i]);
        }
    }

    return filterLocations;
}

/**
 * returns a array with fake locations with @param n amount of locations
 * @param numberOfFakeLocations @type number
 * @returns @type Array\<Location\>
 */
export function generateFakeLocations(numberOfFakeLocations: number): Location[] {
    const locations: Location[] = [];

    for (let i = 0; i < numberOfFakeLocations; i += 1) {
        const lorem = faker.lorem.paragraphs(2, '<br/>\n');
        const title = `${faker.unique(faker.name.lastName)} Park`;

        const randomCategoryIndex = Math.floor(Math.random() * category.length);
        const randomCategory = category[randomCategoryIndex];

        const longitude = Number(faker.address.longitude(6, 5.4, 4));
        const latitude = Number(faker.address.latitude(59, 58.4, 4));

        const rating = Math.floor(Math.random() * 5);
        const image = faker.image.nature(640, 480, false);

        const fakeLocation: Location = {
            type: 'Feature',
            properties: {
                title,
                description: lorem,
                category: [randomCategory],
                img: image,
                rating,
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
