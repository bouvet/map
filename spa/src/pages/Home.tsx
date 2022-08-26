// import { useEffect } from 'react';
import { FilterButton } from '../components/Filter/Buttons';
import { FilterMenu } from '../components/Filter/FilterMenu';
import { Popup } from '../components/Popup/Popup';
// import { Header } from '../components/Navigation/Header';
import { ReactMapGL } from '../features/map';
import { useStateSelector } from '../hooks/useRedux';
// import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { useFilterEvent } from '../utils/filterLogic';

export const Home = () => {
    // const { selected, locations, filteredLocations } = useStateSelector((state) => state.map);

    // const dispatch = useStateDispatch();

    // useEffect(() => {
    //     dispatch(mapService.getLocations());
    // }, [dispatch]);

    useFilterEvent();
    const { popUpIsVisible, currentlySelectedLocation, categories } = useStateSelector((state) => state.map);

    const mappedFilter = categories.map((item) => <FilterButton key={item.name} text={item.name} />);

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
                    image={currentlySelectedLocation.properties.img}
                />
            )}
        </div>
    );
};
