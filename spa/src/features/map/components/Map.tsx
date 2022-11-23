import { useRef, useState, FC, Ref } from 'react';
import { Map as ReactMap, MapRef, ViewStateChangeEvent } from 'react-map-gl';
import { CustomMarker } from './CustomMarker';
import { useStateSelector } from '../../../hooks/useRedux';
import { ILocation } from '../../../interfaces';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

interface MapProp {
    selectedLocation: ILocation | null;
    onMarkerSelectHandler: (location: ILocation) => void;
}

export const Map: FC<MapProp> = ({ selectedLocation, onMarkerSelectHandler }) => {
    const [viewState, setViewState] = useState({
        longitude: 5.7063,
        latitude: 58.9566,
        zoom: 11,
    });

    const [mapLoading, setMapLoading] = useState(true);

    const { filteredLocations } = useStateSelector((state) => state.map);

    // const { currentMapCenter, currentUserLocation, hasUserLocation } = useStateSelector((state) => state.registration);

    // const dispatch = useStateDispatch();

    // const setViewStateCurrentMapCenter = useCallback(() => {
    //     if (currentMapCenter.lat) {
    //         setViewState((prevState) => ({ ...prevState, longitude: currentMapCenter.long, latitude: currentMapCenter.lat }));
    //     }
    // }, [currentMapCenter.lat, currentMapCenter.long]);

    // useEffect(() => {
    //     dispatch(mapServices.getLocations());
    //     setViewStateCurrentMapCenter();
    // }, [dispatch, setViewStateCurrentMapCenter]);

    // useEffect(() => {
    //     if (currentUserLocation.lat && hasUserLocation) {
    //         setViewState((prevState) => ({ ...prevState, longitude: currentUserLocation.long, latitude: currentUserLocation.lat }));
    //         const updateLocation: ILatLong = {
    //             lat: currentUserLocation.lat,
    //             long: currentUserLocation.long,
    //         };
    //         dispatch(registrationActions.setCurrentMapCenter(updateLocation));
    //     }
    //     return () => {
    //         dispatch(registrationActions.setHasUserLocation(false));
    //     };
    // }, [currentUserLocation, dispatch, hasUserLocation]);

    const mapRef: Ref<MapRef> = useRef(null);

    const onMapMoveHandler = (event: ViewStateChangeEvent) => {
        setViewState(event.viewState);
    };

    const onMapLoadHandler = () => {
        console.log('[onMapLoadHandler]: Map loaded');
        setMapLoading(false);
    };

    // const onMapLoad = useCallback(
    //     (e: any) => {
    //         if (mapRef.current !== null) {
    //             mapRef.current.on('move', () => {
    //                 setViewState(e.viewState);
    //             });

    //             mapRef.current.on('moveend', () => {
    //                 if (mapRef.current) {
    //                     const currentCenter = mapRef.current.getCenter();
    //                     const currentCenterObj: ILatLong = {
    //                         long: currentCenter.lng,
    //                         lat: currentCenter.lat,
    //                     };
    //                     dispatch(registrationActions.setCurrentMapCenter(currentCenterObj));
    //                 }
    //             });
    //         }
    //     },
    //     [dispatch],
    // );

    // const onClickHandler = (location: ILocation) => {
    //     if (selectedMarker === location.id) {
    //         dispatch(mapActions.setSelectedMarker(''));
    //         dispatch(mapActions.setPopupVisibility(false));
    //     } else {
    //         dispatch(mapActions.setSelectedMarker(location.id));
    //         dispatch(mapActions.setPopupVisibility(true));
    //         dispatch(mapActions.setCurrentlySelectedLocation(location));
    //     }
    // };

    return (
        <ReactMap
            {...viewState}
            ref={mapRef}
            onLoad={onMapLoadHandler}
            onMove={onMapMoveHandler}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {!mapLoading &&
                filteredLocations.map((location) => (
                    <CustomMarker
                        key={location.id}
                        coordinates={location.geometry.coordinates}
                        onClick={onMarkerSelectHandler}
                        location={location}
                        selectedLocation={selectedLocation}
                    />
                ))}
            {/* {!addingLocation &&
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
                    ))} */}
        </ReactMap>
    );
};
