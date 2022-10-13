import { ILocation } from './types.d';

/**
 * returns a filtered array containing only locations with @param category.
 * @param locations @type Array\<Location\>
 * @param category  @type Category
 * @returns @type Array<ILocation>
 */
export function applyFilterLocationOnCategory(locations: ILocation[], category: string) {
    const filterLocations: ILocation[] = [];

    for (let i = 0; i < locations.length; i += 1) {
        for (let j = 0; j < locations[i].properties.category.length; j += 1) {
            if (locations[i].properties.category[j].id === category) {
                filterLocations.push(locations[i]);
            }
        }
    }

    return filterLocations;
}
