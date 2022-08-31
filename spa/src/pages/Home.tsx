import { FC } from 'react';
import Slide from '@mui/material/Slide';

import { FilterButton } from '../components/Filter/Buttons';
import { FilterMenu } from '../components/Filter/FilterMenu';
import { Popup, PopupCard } from '../components/Popup/Popup';
import { ReactMapGL } from '../features/map';
import { useStateSelector } from '../hooks/useRedux';
import { useFilterEvent } from '../utils/filterLogic';

export const Home: FC = () => {
    useFilterEvent();
    const { popUpIsVisible, categories, currentlySelectedLocation } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: any) => <FilterButton key={item.name} text={item.name} emoji={item.emoji} />);

    return (
        <div className="App">
            <FilterMenu>{mappedFilter}</FilterMenu>
            <ReactMapGL />
            <Slide direction="up" in={popUpIsVisible} mountOnEnter unmountOnExit>
                <PopupCard>
                    {popUpIsVisible && (
                        <Popup
                            name={currentlySelectedLocation.properties.title}
                            description={currentlySelectedLocation.properties.description}
                            rating={currentlySelectedLocation.properties.rating}
                            image={currentlySelectedLocation.properties.img}
                        />
                    )}
                </PopupCard>
            </Slide>
        </div>
    );
};
