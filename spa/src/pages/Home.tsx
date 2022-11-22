import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Collapse, Fab, Slide } from '@mui/material';
import { Popup, PopupCard } from '../components/Popup/Popup';
import { SectionContainer } from '../components/UI';
import { BackButton } from '../components/UI/Buttons/NavigationButtons';
import { HomeFooter, HomeHeader } from '../features/home';
import { SwipeableEdgeDrawer } from '../features/locationInfo/components/LocationDrawer';
import { locationServices } from '../features/locationRegistration/services/location.services';
import { mapServices, Map } from '../features/map';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { ICategory, ILocation } from '../interfaces';
import { mapActions } from '../store/state/map.state';
import { uiActions } from '../store/state/ui.state';
import { ILatLong } from '../utils/types.d';
import { GoogleIcon } from '../components/Navigation/GoogleIcon';
import { MyTheme } from '../styles/global';

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
                <HomeFooter getUserLocationHandler={handleLocationClick} showMenuToggler={showMenuToggler} showMenu={showMenu} />
            )}
            <Menu>
                <ul>
                    <Collapse in={showMenu} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                        <MenuListItem>
                            <Fab size="small" sx={{ backgroundColor: 'white' }} />
                        </MenuListItem>
                    </Collapse>
                    <Collapse in={showMenu} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                        <MenuListItem>
                            <Fab size="small" sx={{ backgroundColor: 'white' }} />
                        </MenuListItem>
                    </Collapse>
                    <Collapse in={showMenu} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                        <MenuListItem>
                            <Fab size="small" sx={{ backgroundColor: 'white' }} />
                        </MenuListItem>
                    </Collapse>
                    <Collapse in={showMenu} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                        <MenuListItem>
                            <Fab size="small" sx={{ backgroundColor: 'white' }} />
                        </MenuListItem>
                    </Collapse>
                    <Collapse in={showMenu} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                        <MenuListItem>
                            <Fab size="small" sx={{ backgroundColor: 'white', textAlign: 'center' }}>
                                <Link to="/login">
                                    <GoogleIcon color={MyTheme.colors.darkBase} className="material-symbols-outlined">
                                        login
                                    </GoogleIcon>
                                </Link>
                            </Fab>
                        </MenuListItem>
                    </Collapse>
                </ul>
            </Menu>

            {selectedLocation && showLocationInfoPopup && (
                <Slide direction="up" in={!!selectedLocation} mountOnEnter unmountOnExit>
                    <PopupCard>
                        <Popup location={selectedLocation} />
                    </PopupCard>
                </Slide>
            )}

            {selectedLocation && showLocationInfoDrawer && <SwipeableEdgeDrawer selectedLocation={selectedLocation} />}
        </SectionContainer>
    );
};

const Menu = styled.nav`
    position: absolute;
    bottom: 5.7rem;
    right: 0;
    width: 5.1rem;
`;

const MenuListItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem 0;
`;
