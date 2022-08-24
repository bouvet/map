import { useEffect } from 'react';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { mapActions } from '../store/state/map.state';
import { filter } from './locationData';

export function FilterEvent() {
    const { selected, locations } = useStateSelector((state) => state.map);
    const dispatch = useStateDispatch();

    useEffect(() => {
        // console.log('filer this ', selected, filter(locations, selected));
        dispatch(mapActions.setFilteredLocations(filter(locations, selected)));
    }, [selected, dispatch, locations]);
}
