// import { useEffect } from 'react';
import { FilterButton } from '../components/Filter/Buttons';
import { FilterMenu } from '../components/Filter/FilterMenu';
import { Popup } from '../components/Popup/Popup';
// import { Header } from '../components/Navigation/Header';
import { ReactMapGL } from '../features/map';
import { useStateSelector } from '../hooks/useRedux';
// import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { useFilterEvent } from '../utils/filterLogic';
import { category } from '../utils/types.d';

export const Home = () => {
    // const { selected, locations, filteredLocations } = useStateSelector((state) => state.map);

    // const dispatch = useStateDispatch();

    // useEffect(() => {
    //     dispatch(mapService.getLocations());
    // }, [dispatch]);

    const mappedFilter = category.map((item) => <FilterButton key={item} text={item} />);

    useFilterEvent();
    const { popUpIsVisible, currentlySelectedLocation } = useStateSelector((state) => state.map);

    return (
        <div className="App">
            {/* <Header content={selected}></Header> */}
            <FilterMenu>{mappedFilter}</FilterMenu>
            <ReactMapGL />
            {popUpIsVisible && (
                <Popup
                    name={currentlySelectedLocation.properties.title}
                    description={currentlySelectedLocation.properties.description}
                    rating={currentlySelectedLocation.properties.rating}
                />
            )}
        </div>
    );
};
