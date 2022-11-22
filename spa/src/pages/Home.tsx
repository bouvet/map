import React, { useEffect, useState } from 'react';

import { SectionContainer } from '../components/UI';
import { BackButton } from '../components/UI/Buttons/NavigationButtons';
import { HomeFooter, HomeHeader, HomeMenu, LocationInfoPopup } from '../features/home';
import { SwipeableEdgeDrawer } from '../features/locationInfo/components/LocationDrawer';
import { locationServices } from '../features/locationRegistration/services/location.services';
import { mapServices, Map } from '../features/map';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { ICategory, ILocation } from '../interfaces';
import { mapActions } from '../store/state/map.state';
import { uiActions } from '../store/state/ui.state';
import { ILatLong } from '../utils/types.d';

export const Home: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    const [showMenu, setShowMenu] = useState(false);

    const { showLocationInfoPopup, showLocationInfoDrawer } = useStateSelector((state) => state.ui);

    const { loading, categories, selectedFilterCategory } = useStateSelector((state) => state.map);

    const { currentUserLocation } = useStateSelector((state) => state.registration);

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(mapServices.getLocations());
    }, [dispatch]);

    const onMarkerSelectHandler = (location: ILocation) => {
        if (selectedLocation && selectedLocation.id === location.id) {
            setSelectedLocation(null);
            dispatch(uiActions.setShowLocationPopup(false));
            return;
        }
        setSelectedLocation(location);
        dispatch(uiActions.setShowLocationPopup(true));
    };

    const onCategorySelectHandler = (category: ICategory) => {
        if (selectedCategory && selectedCategory.id === category.id) {
            setSelectedCategory(null);
            dispatch(mapActions.filterLocations(null));
            return;
        }
        setSelectedCategory(category);
        dispatch(mapActions.filterLocations(category.id));
    };

    const getUserLocationHandler = () => {
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

    const showMenuToggler = () => {
        setShowMenu(!showMenu);
    };

    return (
        <SectionContainer style={{ position: 'absolute', height: '100%', width: '100%', padding: 0 }}>
            {!showLocationInfoPopup && (
                <HomeHeader onCategorySelectHandler={onCategorySelectHandler} categories={categories} selectedCategory={selectedCategory} />
            )}

            {showLocationInfoPopup && <BackButton onClick={() => dispatch(uiActions.setShowLocationPopup(false))} />}

            {!loading && <Map selectedLocation={selectedLocation} onMarkerSelectHandler={onMarkerSelectHandler} />}

            {!showLocationInfoPopup && (
                <HomeFooter getUserLocationHandler={getUserLocationHandler} showMenuToggler={showMenuToggler} showMenu={showMenu} />
            )}

            <HomeMenu showMenu={showMenu} />

            {selectedLocation && showLocationInfoPopup && <LocationInfoPopup selectedLocation={selectedLocation} />}

            {selectedLocation && showLocationInfoDrawer && <SwipeableEdgeDrawer selectedLocation={selectedLocation} />}
        </SectionContainer>
    );
};
