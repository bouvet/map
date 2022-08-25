import { useEffect } from 'react';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { mapActions } from '../store/state/map.state';
import { getFilterOnCategory } from './locationData';

/**
 *  sets up a useEffect()[@var selected] for filtering locations on "selected" state value
 */
export function useFilterEvent() {
    const { selected, locations } = useStateSelector((state) => state.map);
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (selected === ""){
            dispatch(mapActions.setFilteredLocations(locations));
        } else {
            let filteredLocations = getFilterOnCategory(locations, selected)
            dispatch(mapActions.setFilteredLocations(filteredLocations));
        }
    }, [selected, dispatch, locations]);

}
