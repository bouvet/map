import { useEffect } from 'react';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { mapActions } from '../store/state/map.state';
import { applyFilterLocationOnCategory } from './locationData';

/**
 *  sets up a useEffect()[@var selected] for filtering locations on "selected" state value
 */
// export function useFilterEvent() {
//     const { selectedFilterCategory, locations } = useStateSelector((state) => state.map);
//     const dispatch = useStateDispatch();

//     useEffect(() => {
//         if (selectedFilterCategory === '') {
//             dispatch(mapActions.setFilteredLocations(locations));
//         } else {
//             const filteredLocations = applyFilterLocationOnCategory(locations, selectedFilterCategory);
//             dispatch(mapActions.setFilteredLocations(filteredLocations));
//         }
//     }, [selectedFilterCategory, dispatch, locations]);
// }
