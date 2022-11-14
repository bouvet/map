import Slide from '@mui/material/Slide';
import { FC, useEffect } from 'react';
import { FilterButton } from '../components/Filter/FilterButtons';
import { FilterMenu } from '../components/Filter/FilterMenu';
import { Popup, PopupCard } from '../components/Popup/Popup';
import { SectionContainer } from '../components/UI';
import { BackButton } from '../components/UI/Buttons/NavigationButtons';
import { FabMenu } from '../features/home/components/FabMenu';
import { SwipeableEdgeDrawer } from '../features/locationInfo/components/LocationDrawer';
import { EmojiButton } from '../features/locationRegistration/components/Location';
import { locationServices } from '../features/locationRegistration/services/location.services';
import { ReactMapGL } from '../features/map';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { mapActions } from '../store/state/map.state';
import { useFilterEvent } from '../utils/filterLogic';
import { ICategory, ILatLong } from '../utils/types.d';

export const Home: FC = () => {
    useFilterEvent();
    const { popUpIsVisible, categoriesWithLocations, currentlySelectedLocation, homeMarkerFocus, selectedFilterCategory } =
        useStateSelector((state) => state.map);
    const { currentUserLocation } = useStateSelector((state) => state.registration);
    const mappedFilter = categoriesWithLocations.map((item: ICategory) =>
        item.id ? <FilterButton key={item.id} id={item.id} text={item.name} emoji={item.emoji} /> : null,
    );
    const dispatch = useStateDispatch();
    const handleBackClick = () => {
        dispatch(mapActions.setHomeMarkerFocus(false));
        dispatch(mapActions.setPopupVisibility(false));
        dispatch(mapActions.setSelectedMarker(''));
    };

    const handleLocationClick = () => {
        if (currentUserLocation.lat) {
            dispatch(locationServices.getClosestLocation(currentUserLocation, selectedFilterCategory));
        } else {
            console.log('isGettingLocation');
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation: ILatLong = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                };
                dispatch(locationServices.getClosestLocation(userLocation, selectedFilterCategory));
            });
        }
    };

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    return (
        <SectionContainer style={{ height: '100%', width: '100%' }}>
            {!homeMarkerFocus ? (
                <>
                    <FilterMenu>{mappedFilter}</FilterMenu>
                    <EmojiButton text="Nærmeste lokasjon" emoji="🔍" onClick={handleLocationClick} bottom="30px" left="16px" />
                </>
            ) : (
                <BackButton onClick={handleBackClick} />
            )}
            <ReactMapGL />
            {!homeMarkerFocus && <FabMenu />}
            {!homeMarkerFocus && (
                <Slide direction="up" in={popUpIsVisible} mountOnEnter unmountOnExit>
                    <PopupCard>
                        {popUpIsVisible && (
                            <>
                                <Popup
                                    name={currentlySelectedLocation.properties.title}
                                    description={currentlySelectedLocation.properties.description}
                                    rating={currentlySelectedLocation.properties.rating}
                                    image={currentlySelectedLocation.properties.webpImage.cdnUri}
                                />
                            </>
                        )}
                    </PopupCard>
                </Slide>
            )}
            {homeMarkerFocus && <SwipeableEdgeDrawer />}
        </SectionContainer>
    );
};
