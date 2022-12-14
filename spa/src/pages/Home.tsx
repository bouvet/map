import React, { useState } from 'react';
import { Main, Section } from '../components/Layout';

import { FABBackButton } from '../components/Common/Buttons/NavigationButtons';
import { HomeHeader, HomeMap, LocationInfoPopup } from '../features/home';
import { SwipeableEdgeDrawer } from '../features/locationInfo/components/LocationDrawer';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { ICategory, ILocation } from '../interfaces';
import { mapActions, uiActions } from '../store';

export const Home: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    const [showMenu, setShowMenu] = useState(false);

    const { showLocationInfoPopup, showLocationInfoDrawer } = useStateSelector((state) => state.ui);

    const { categories } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();

    const onMarkerSelectHandler = (location: ILocation) => {
        if (selectedLocation && selectedLocation.id === location.id) {
            setShowMenu(false);
            setSelectedLocation(null);
            dispatch(uiActions.setShowLocationPopup(false));
            return;
        }
        setShowMenu(false);
        setSelectedLocation(location);
        dispatch(uiActions.setShowLocationPopup(true));
    };

    const onCategorySelectHandler = (category: ICategory) => {
        if (selectedCategory && selectedCategory.id === category.id) {
            setShowMenu(false);
            setSelectedCategory(null);
            dispatch(mapActions.filterLocations(null));
            return;
        }
        setShowMenu(false);
        setSelectedCategory(category);
        dispatch(mapActions.filterLocations(category.id));
    };

    const showMenuToggler = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            {!showLocationInfoPopup && (
                <HomeHeader onCategorySelectHandler={onCategorySelectHandler} categories={categories} selectedCategory={selectedCategory} />
            )}
            <Main>
                <Section style={{ position: 'absolute', height: '100%', width: '100%', padding: 0, maxWidth: '100%' }}>
                    {showLocationInfoPopup && <FABBackButton onClick={() => dispatch(uiActions.setShowLocationPopup(false))} />}

                    <HomeMap
                        selectedLocation={selectedLocation}
                        selectedCategory={selectedCategory}
                        onMarkerSelectHandler={onMarkerSelectHandler}
                        showMenuToggler={showMenuToggler}
                        showMenu={showMenu}
                    />

                    {selectedLocation && showLocationInfoPopup && (
                        <LocationInfoPopup selectedLocation={selectedLocation} onMarkerSelectHandler={onMarkerSelectHandler} />
                    )}

                    {selectedLocation && showLocationInfoDrawer && <SwipeableEdgeDrawer selectedLocation={selectedLocation} />}
                </Section>
            </Main>
        </>
    );
};
