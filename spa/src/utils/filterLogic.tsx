import { useEffect } from 'react';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { mapActions } from '../store/state/map.state';
import { applyFilterLocationOnCategory } from './locationData';

/**
 *  sets up a useEffect()[@var selected] for filtering locations on "selected" state value
 */
export function useFilterEvent() {
    const { selected, locations } = useStateSelector((state: any) => state.map);
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (selected === '') {
            dispatch(mapActions.setFilteredLocations(locations));
        } else {
            const filteredLocations = applyFilterLocationOnCategory(locations, selected);
            console.log('blob?', locations[19].properties);
            console.log('rating?', locations[0].properties.rating);
            dispatch(mapActions.setFilteredLocations(filteredLocations));
        }
    }, [selected, dispatch, locations]);
}
