import { useCallback, useEffect, useRef, useState, FC, Ref } from 'react';
import { Map as ReactMap, MapRef } from 'react-map-gl';
import { CustomMarker } from './CustomMarker';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { ILatLong } from '../../../utils/types.d';
import { mapActions } from '../../../store/state/map.state';
import { registrationActions } from '../../../store/state/registration.state';
import { mapServices } from '../services/map.services';
import { ILocation } from '../../../interfaces';

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

    const setViewStateCurrentMapCenter = useCallback(() => {
        if (currentMapCenter.lat) {
            setViewState((prevState) => ({ ...prevState, longitude: currentMapCenter.long, latitude: currentMapCenter.lat }));
        }
    }, [currentMapCenter.lat, currentMapCenter.long]);

    useEffect(() => {
        dispatch(mapServices.getLocations());
        setViewStateCurrentMapCenter();
    }, [dispatch, setViewStateCurrentMapCenter]);

    useEffect(() => {
        if (currentUserLocation.lat && hasUserLocation) {
            setViewState((prevState) => ({ ...prevState, longitude: currentUserLocation.long, latitude: currentUserLocation.lat }));
            const updateLocation: ILatLong = {
                lat: currentUserLocation.lat,
                long: currentUserLocation.long,
            };
            dispatch(registrationActions.setCurrentMapCenter(updateLocation));
        }
        return () => {
            dispatch(registrationActions.setHasUserLocation(false));
        };
    }, [currentUserLocation, dispatch, hasUserLocation]);

    const mapRef: Ref<MapRef> = useRef(null);

    const onMapLoad = useCallback(
        (e: any) => {
            if (mapRef.current !== null) {
                mapRef.current.on('move', () => {
                    setViewState(e.viewState);
                });

                mapRef.current.on('moveend', () => {
                    if (mapRef.current) {
                        const currentCenter = mapRef.current.getCenter();
                        const currentCenterObj: ILatLong = {
                            long: currentCenter.lng,
                            lat: currentCenter.lat,
                        };
                        dispatch(registrationActions.setCurrentMapCenter(currentCenterObj));
                    }
                });
            }
        },
        [dispatch],
    );

    const onClickHandler = (location: ILocation) => {
        if (selectedMarker === location.id) {
            dispatch(mapActions.setSelectedMarker(''));
            dispatch(mapActions.setPopupVisibility(false));
        } else {
            dispatch(mapActions.setSelectedMarker(location.id));
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
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {!addingLocation &&
                selectedFilterCategory &&
                filteredLocations
                    .filter((location) => location.properties.status === 'Approved')
                    .map((location) => (
                        <CustomMarker
                            key={location.id}
                            coordinates={location.geometry.coordinates}
                            onClickHandler={onClickHandler}
                            markerLocation={location}
                            selectedMarker={selectedMarker}
                        />
                    ))}
            {!addingLocation &&
                !selectedFilterCategory &&
                locations
                    .filter((location) => location.properties.status === 'Approved')
                    .map((location) => (
                        <CustomMarker
                            key={location.id}
                            coordinates={location.geometry.coordinates}
                            onClickHandler={onClickHandler}
                            markerLocation={location}
                            selectedMarker={selectedMarker}
                        />
                    ))}
        </ReactMap>
    );
};
