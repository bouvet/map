import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapService } from '../features/map';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { mapActions } from '../store/state/map.state';
import { filter } from './locationData';

export function FilterEvent() {
    const { selected, locations } = useStateSelector((state) => state.map);
    const dispatch = useStateDispatch();

    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('filer this ', selected, filter(locations, selected));
        dispatch(mapActions.setFilteredLocations(filter(locations, selected)));
    }, [selected]);
}
