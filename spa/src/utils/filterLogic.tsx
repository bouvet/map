
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useStateDispatch, useStateSelector } from "../hooks/useRedux";
import { filter } from './locationData';

export function FilterEvent() {
    const {selected, locations } = useStateSelector(state => state.map);
    const dispatch = useStateDispatch();

    const [count, setCount] = useState(0);
    useEffect( () => {
        console.log('filer this ', selected, filter(locations, selected));
    }, [selected] );
}
  