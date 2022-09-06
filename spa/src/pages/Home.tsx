import { FC } from 'react';
import Slide from '@mui/material/Slide';

import { Link } from 'react-router-dom';
import { FilterButton } from '../components/Filter/Buttons';
import { FilterMenu } from '../components/Filter/FilterMenu';
import { Popup, PopupCard } from '../components/Popup/Popup';
import { ReactMapGL } from '../features/map';
import { useStateSelector, useStateDispatch } from '../hooks/useRedux';
import { useFilterEvent } from '../utils/filterLogic';
import { SwipeableEdgeDrawer } from '../features/locationInfo/LocationDrawer';
import { BackButton, GoogleIcon, RoundButton } from '../components/Navigation/Buttons';
import { MyTheme } from '../styles/global';
import { mapActions } from '../store/state/map.state';

export const Home: FC = () => {
    useFilterEvent();
    const { popUpIsVisible, categories, currentlySelectedLocation, homeMarkerFocus } = useStateSelector((state) => state.map);
    const mappedFilter = categories.map((item: any) => <FilterButton key={item.id} id={item.id} text={item.name} emoji={item.emoji} />);
    const dispatch = useStateDispatch();
    const handleBackClick = () => {
        dispatch(mapActions.setHomeMarkerFocus(false));
        dispatch(mapActions.setPopupVisibility(false));
        dispatch(mapActions.setSelectedMarker(''));
    };

    return (
        <div className="App">
            {!homeMarkerFocus ? (
                <FilterMenu>{mappedFilter}</FilterMenu>
            ) : (
                <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={handleBackClick}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </BackButton>
            )}
            <div className="home-container">
                <ReactMapGL />
            </div>
            {!homeMarkerFocus && (
                <RoundButton backgroundColor={MyTheme.colors.accent}>
                    <Link to="/location-registration">
                        <GoogleIcon color={MyTheme.colors.lightbase} className="material-symbols-outlined">
                            add
                        </GoogleIcon>
                    </Link>
                </RoundButton>
            )}
            {!homeMarkerFocus && (
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
            )}
            {homeMarkerFocus && <SwipeableEdgeDrawer />}
        </div>
    );
};
