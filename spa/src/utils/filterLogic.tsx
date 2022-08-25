import { useEffect } from 'react';
import { mapService } from '../features/map';
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
        // dispatch sets the global state value of filtered locations
        if (selected === ""){
            dispatch(mapActions.setFilteredLocations(locations));
        } else {
            dispatch(mapActions.setFilteredLocations(filter(locations, selected)));
        }
    }, [selected, dispatch, locations]);

}
