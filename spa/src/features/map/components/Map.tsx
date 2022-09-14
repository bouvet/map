import { useCallback, useEffect, useRef, useState, FC } from 'react';
// @ts-ignore
// eslint-disable-next-line
import { Map as ReactMap } from '!react-map-gl';

import { CustomMarker } from './CustomMarker';

import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { mapService } from '../services/map.services';
import { LatLong, Location } from '../../../utils/types.d';
import { mapActions } from '../../../store/state/map.state';
import { registrationActions } from '../../../store/state/registration.state';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

interface MapProp {
    addingLocation?: boolean;
}

export const ReactMapGL: FC<MapProp> = ({ addingLocation = false }) => {
    const [viewState, setViewState] = useState({
        longitude: 5.7063,
        latitude: 58.9566,
        zoom: 11,
    });

    const { locations, filteredLocations, selectedFilterCategory, selectedMarker } = useStateSelector((state) => state.map);

    const { currentMapCenter, currentUserLocation, hasUserLocation } = useStateSelector((state) => state.registration);

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(mapService.getLocations());
        if (currentMapCenter.lat) {
            setViewState({
                longitude: currentMapCenter.long,
                latitude: currentMapCenter.lat,
                zoom: 11,
            });
        }
    }, []);

    useEffect(() => {
        if (currentUserLocation.lat && hasUserLocation) {
            setViewState({
                longitude: currentUserLocation.long,
                latitude: currentUserLocation.lat,
                zoom: 13,
            });
            const updateLocation: LatLong = {
                lat: currentUserLocation.lat,
                long: currentUserLocation.long,
            };
            dispatch(registrationActions.setCurrentMapCenter(updateLocation));
        }
        return () => {
            dispatch(registrationActions.setHasUserLocation(false));
        };
    }, [currentUserLocation]);

    const mapRef = useRef(null);

    const onMapLoad = useCallback((evt: any) => {
        if (mapRef.current) {
            // @ts-ignore
            mapRef.current.on('move', () => {
                setViewState(evt.viewState);
            });
            // @ts-ignore
            mapRef.current.on('moveend', () => {
                // @ts-ignore
                const currentCenter = mapRef.current.getCenter();
                const currentCenterObj: LatLong = {
                    long: currentCenter.lng,
                    lat: currentCenter.lat,
                };
                dispatch(registrationActions.setCurrentMapCenter(currentCenterObj));
            });
        }
    }, []);

    const onClickHandler = (location: Location) => {
        if (selectedMarker === location.properties.title) {
            dispatch(mapActions.setSelectedMarker(''));
            dispatch(mapActions.setPopupVisibility(false));
            // dispatch(mapActions.setCurrentlySelectedLocation());
            if (mapRef.current) {
                setViewState({
                    latitude: location.geometry.coordinates[1],
                    longitude: location.geometry.coordinates[0],
                    zoom: 12,
                });
            }
        } else {
            dispatch(mapActions.setSelectedMarker(location.properties.title));
            if (mapRef.current) {
                setViewState({
                    latitude: location.geometry.coordinates[1],
                    longitude: location.geometry.coordinates[0],
                    zoom: 14,
                });
            }
            dispatch(mapActions.setPopupVisibility(true));
            dispatch(mapActions.setCurrentlySelectedLocation(location));
        }
    };

    return (
        <ReactMap
            {...viewState}
            ref={mapRef}
            onLoad={onMapLoad}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {!addingLocation &&
                selectedFilterCategory &&
                filteredLocations.map((locaction) => (
                    <CustomMarker
                        key={locaction.id}
                        coordinates={locaction.geometry.coordinates}
                        onClickHandler={onClickHandler}
                        locaction={locaction}
                        selectedMarker={selectedMarker}
                    />
                ))}
            {!addingLocation &&
                !selectedFilterCategory &&
                locations.map((locaction) => (
                    <CustomMarker
                        key={locaction.id}
                        coordinates={locaction.geometry.coordinates}
                        onClickHandler={onClickHandler}
                        locaction={locaction}
                        selectedMarker={selectedMarker}
                    />
                ))}
        </ReactMap>
    );
};
