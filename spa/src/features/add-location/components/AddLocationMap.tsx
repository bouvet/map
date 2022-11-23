import React, { Ref, useRef, useState } from 'react';

import { Map as ReactMap, MapRef, Marker, ViewStateChangeEvent } from 'react-map-gl';
import { Footer } from '../../../components/Layout';
import { MyLocationButton, PillButton, SectionContainer } from '../../../components/UI';
import { mapboxBaseUri, mapboxStreets } from '../../../styles/map-styles';
import { MapStyleMenu } from '../../map';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

interface Props {
    pageIndex: number;
    chooseLocationHandler: (longitude: number, latitude: number) => void;
}

// TODO: Let's try to grab user-location on app load and then fly to user location when adding new location.

export const AddLocationMap: React.FC<Props> = ({ pageIndex, chooseLocationHandler }) => {
    const [viewState, setViewState] = useState({
        longitude: 5.7063,
        latitude: 58.9566,
        zoom: 11,
    });

    const [mapStyle, setMapStyle] = useState(`${mapboxStreets}`);

    const [mapLoading, setMapLoading] = useState(true);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [loadingUserLocation, setLoadingUserLocation] = useState(false);

    const mapRef: Ref<MapRef> = useRef(null);

    const onMapMoveHandler = (event: ViewStateChangeEvent) => {
        setViewState(event.viewState);
        setButtonDisabled(false);
    };

    const onMapLoadHandler = () => {
        console.log('[onMapLoadHandler]: Map loaded');
        setMapLoading(false);
    };

    // eslint-disable-next-line no-undef
    const getUserLocationSuccess: PositionCallback = (position) => {
        if (mapRef.current) {
            setLoadingUserLocation(false);
            mapRef.current.flyTo({ center: [position.coords.longitude, position.coords.latitude], essential: true, zoom: 16 });
        }
    };

    // eslint-disable-next-line no-undef
    const getUserLocationError: PositionErrorCallback = (error) => {
        if (error.message === 'User denied geolocation prompt') return;
        console.log(error);
        console.log(error.message);
    };

    const getUserLocationHandler = () => {
        setLoadingUserLocation(true);
        navigator.geolocation.getCurrentPosition(getUserLocationSuccess, getUserLocationError);
    };

    const setMapStyleHandler = (mapStyle: string) => {
        setMapStyle(mapStyle);
    };

    return (
        <SectionContainer
            style={{ height: 'calc(100vh - 7.7rem)', padding: 0, position: 'relative', display: pageIndex === 0 ? 'flex' : 'none' }}
        >
            <ReactMap
                {...viewState}
                ref={mapRef}
                onLoad={onMapLoadHandler}
                onMove={onMapMoveHandler}
                mapStyle={`${mapboxBaseUri}${mapStyle}`}
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {!mapLoading && (
                    <Marker longitude={viewState.longitude} latitude={viewState.latitude} anchor="bottom">
                        <span style={{ fontSize: '22px' }}>📍</span>
                    </Marker>
                )}
            </ReactMap>

            <MapStyleMenu setMapStyleHandler={setMapStyleHandler} />

            <Footer>
                <PillButton
                    style={{ padding: '1.2rem 1rem', marginTop: '0.7rem' }}
                    disabled={buttonDisabled}
                    selected={!buttonDisabled}
                    onClick={() => chooseLocationHandler(viewState.longitude, viewState.latitude)}
                >
                    📍 Velg Punkt
                </PillButton>

                <MyLocationButton onClickHandler={getUserLocationHandler} loadingUserLocation={loadingUserLocation} />
            </Footer>
        </SectionContainer>
    );
};
