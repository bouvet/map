// import { useEffect } from 'react';
import { FilterButton } from '../components/Filter/Buttons';
import { FilterMenu } from '../components/Filter/FilterMenu';
import { Popup } from '../components/Popup/Popup';
// import { Header } from '../components/Navigation/Header';
import { Map } from '../features/map';
// import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { FilterEvent } from '../utils/filterLogic';
import { category } from '../utils/types.d';

export const Home = () => {
    // const { selected, locations, filteredLocations } = useStateSelector((state) => state.map);

    // const dispatch = useStateDispatch();

    // useEffect(() => {
    //     dispatch(mapService.getLocations());
    // }, [dispatch]);

    const mappedFilter = category.map((item) => <FilterButton key={item} text={item} />);

    FilterEvent();

    return (
        <div className="App">
            {/* <Header content={selected}></Header> */}
            <FilterMenu>{mappedFilter}</FilterMenu>
            <Popup name='Våland park' description='This park is lovely for people who like something to do' rating={3}></Popup>
            <Map />
        </div>
    );
};
