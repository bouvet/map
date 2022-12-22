import React, { useEffect } from 'react';

import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { ICategory, ILocation } from '../../../interfaces';

import { HomeFooter } from './HomeFooter';
import { CustomMarker, Map, mapServices } from '../../map';
import { getUserLocation } from '../../../utils';
import { mapActions } from '../../../store/state/map.state';

interface Props {
    showMenu: boolean;
    showMenuToggler: () => void;
    selectedLocation: ILocation | null;
    selectedCategory: ICategory | null;
    onMarkerSelectHandler: (location: ILocation) => void;
}

export const HomeMap: React.FC<Props> = ({ showMenu, showMenuToggler, selectedLocation, selectedCategory, onMarkerSelectHandler }) => {
    const { loading, filteredLocations } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();

    const getUserLocationHandler = () => {
        dispatch(mapActions.setLoading(true));

        getUserLocation((position) => {
            dispatch(mapServices.getClosestLocation(position, selectedCategory));
        });
    };

    useEffect(() => {
        dispatch(mapServices.getCategories());
        dispatch(mapServices.getLocations());
    }, [dispatch]);

    return (
        <>
            <Map>
                {filteredLocations.map((location) => (
                    <CustomMarker
                        key={location.id}
                        coordinates={location.geometry.coordinates}
                        onClick={onMarkerSelectHandler}
                        location={location}
                        selectedLocation={selectedLocation}
                    />
                ))}
            </Map>
            <HomeFooter
                getUserLocationHandler={getUserLocationHandler}
                loadingUserLocation={loading}
                showMenu={showMenu}
                showMenuToggler={showMenuToggler}
            />
        </>
    );
};
