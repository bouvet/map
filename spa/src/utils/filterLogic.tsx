import { useEffect } from 'react';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { mapActions } from '../store/state/map.state';
import { filter } from './locationData';
import { Location } from './types.d';

/**
 *  sets up a useEffect()[@var selected] for filtering locations on "selected" state value
 */
export function FilterEvent() {


    // redux stuff for global states
    const { selected, locations } = useStateSelector((state) => state.map);
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (selected === ""){
            dispatch(mapActions.setFilteredLocations(locations));    
        }
        // dispatch sets the global state value of filtered locations
        dispatch(mapActions.setFilteredLocations(filter(locations, selected)));
    }, [selected, dispatch, locations]);

}
