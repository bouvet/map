import React, { useRef, useState, Ref, useEffect } from 'react';
import { Map as ReactMap, MapRef, ViewStateChangeEvent } from 'react-map-gl';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { mapActions } from '../../../store';
import { mapboxBaseUri } from '../../../styles/map-styles';
import { MapStyleMenu } from './MapStyleMenu';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

interface Props {
    children: React.ReactNode;
    mapStyleMenuStyle?: React.CSSProperties;
}

export const Map: React.FC<Props> = ({ children, mapStyleMenuStyle }) => {
    const mapRef: Ref<MapRef> = useRef(null);

    const [mapLoaded, setMapLoaded] = useState(false);

    const { userLocation, closestLocation, mapMoved, viewState, mapStyle } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();

    const onMapMoveHandler = (event: ViewStateChangeEvent) => {
        dispatch(mapActions.setViewState(event.viewState));
        if (!mapMoved) {
            dispatch(mapActions.setMapMoved(true));
        }
    };

    const onMapLoadHandler = () => {
        setMapLoaded(true);
    };

    const setMapStyleHandler = (mapStyle: string) => {
        dispatch(mapActions.setMapStyle(mapStyle));
    };

    useEffect(() => {
        if (userLocation.shouldFlyTo) {
            if (mapRef.current) {
                mapRef.current.flyTo({ center: [userLocation.lng, userLocation.lat], essential: true, zoom: 16 });
            }
        }
    }, [userLocation]);

    useEffect(() => {
        if (closestLocation) {
            if (mapRef.current) {
                mapRef.current.flyTo({
                    center: [closestLocation.geometry.coordinates[0], closestLocation.geometry.coordinates[1]],
                    essential: true,
                    zoom: 16,
                });
            }
        }
    }, [closestLocation]);

    return (
        <>
            <ReactMap
                {...viewState}
                ref={mapRef}
                onLoad={onMapLoadHandler}
                onMove={onMapMoveHandler}
                mapStyle={`${mapboxBaseUri}${mapStyle}`}
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                {mapLoaded && children}
            </ReactMap>
            <MapStyleMenu setMapStyleHandler={setMapStyleHandler} mapStyle={mapStyle} style={{ top: '4rem', ...mapStyleMenuStyle }} />
        </>
    );
};
