import React, { useRef, useState, Ref, useEffect } from 'react';
import { Map as ReactMap, MapRef, ViewStateChangeEvent } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { useStateSelector } from '../../../hooks/useRedux';
import { mapActions } from '../../../store/state/map.state';
import { mapboxBaseUri, mapboxStreets } from '../../../styles/map-styles';
import { MapStyleMenu } from './MapStyleMenu';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

interface Props {
    children: React.ReactNode;
    mapStyleMenuStyle?: React.CSSProperties;
}

export const Map: React.FC<Props> = ({ children, mapStyleMenuStyle }) => {
    const mapRef: Ref<MapRef> = useRef(null);

    const [mapLoaded, setMapLoaded] = useState(false);

    const [mapStyle, setMapStyle] = useState(`${mapboxStreets}`);

    const { userLocation, closestLocation, mapMoved, viewState } = useStateSelector((state) => state.map);

    const dispatch = useDispatch();

    const onMapMoveHandler = (event: ViewStateChangeEvent) => {
        dispatch(mapActions.setViewState(event.viewState));
        if (!mapMoved) {
            dispatch(mapActions.setMapMoved(true));
        }
    };

    const onMapLoadHandler = () => {
        console.log('[onMapLoadHandler]: Map loaded');
        setMapLoaded(true);
    };

    const setMapStyleHandler = (mapStyle: string) => {
        setMapStyle(mapStyle);
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
            >
                {mapLoaded && children}
            </ReactMap>
            <MapStyleMenu setMapStyleHandler={setMapStyleHandler} style={{ top: '4rem', ...mapStyleMenuStyle }} />
        </>
    );
};
