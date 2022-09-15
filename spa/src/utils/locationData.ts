import { faker } from '@faker-js/faker';
import { Category, Location } from './types.d';

/**
 * returns a filtered array containing only locations with @param category.
 * @param locations @type Array\<Location\>
 * @param category  @type Category
 * @returns @type Array<Location>
 */
export function applyFilterLocationOnCategory(locations: Location[], category: string) {
    const filterLocations: Location[] = [];

    for (let i = 0; i < locations.length; i += 1) {
        for (let j = 0; j < locations[i].properties.category.length; j += 1) {
            if (locations[i].properties.category[j].id === category) {
                filterLocations.push(locations[i]);
            }
        }
    }

    return filterLocations;
}

export function generateFakeCategories() {
    const cats = ['Stryke', 'Basketball', 'Fotball', 'Skating', 'Pumptrack', 'Tennis', 'Volleyball', 'Diverse'];
    const emoji = ['💪', '🏀', '⚽️', '🛹', '🚲', '🎾', '🏐', '🤔'];
    const fakeCategories = [];

    for (let i = 0; i < cats.length; i += 1) {
        const fakeCategory: Category = { name: cats[i], emoji: emoji[i] };
        fakeCategories.push(fakeCategory);
    }

    return fakeCategories;
}
/**
 * returns a array with fake locations with @param n amount of locations
 * @param numberOfFakeLocations @type number
 * @returns @type Array\<Location\>
 */
export function generateFakeLocations(numberOfFakeLocations: number, categories: Array<Category>): Location[] {
    const locations: Location[] = [];

    for (let i = 0; i < numberOfFakeLocations; i += 1) {
        const lorem = faker.lorem.paragraphs(2, '<br/>\n');
        const title = `${faker.unique(faker.name.lastName)} Park`;

        const randomCategoryIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomCategoryIndex];

        const longitude = Number(faker.address.longitude(6, 5.4, 4));
        const latitude = Number(faker.address.latitude(59, 58.4, 4));

        const rating = Math.floor(Math.random() * 5);
        const image = faker.image.nature(640, 480, true);

        const category: Category = { name: randomCategory.name, emoji: randomCategory.emoji };

        const fakeLocation: Location = {
            type: 'Feature',
            properties: {
                title,
                description: lorem,
                category: [category],
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
