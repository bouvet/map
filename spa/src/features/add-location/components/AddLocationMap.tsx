import React, { useEffect } from 'react';

import { Marker } from 'react-map-gl';
import { Footer, Section } from '../../../components/Layout';
import { MyLocationButton, PillButton } from '../../../components/UI';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { mapActions } from '../../../store';
import { getUserLocation } from '../../../utils';
import { Map } from '../../map';

interface Props {
    pageIndex: number;
    chooseLocationHandler: (longitude: number, latitude: number) => void;
}

// TODO: Let's try to grab user-location on app load and then fly to user location when adding new location.

export const AddLocationMap: React.FC<Props> = ({ pageIndex, chooseLocationHandler }) => {
    const { loading, mapMoved, viewState } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();

    const getUserLocationHandler = () => {
        dispatch(mapActions.setLoading(true));
        getUserLocation((position) => {
            dispatch(
                mapActions.setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    shouldFlyTo: true,
                }),
            );
        });
    };

    useEffect(() => {
        dispatch(mapActions.setMapMoved(false));
    }, [dispatch]);

    return (
        <Section
            // style={{ height: 'calc(100vh - 7.7rem)', padding: 0, position: 'relative', display: pageIndex === 0 ? 'flex' : 'none' }}
            style={{ height: '100%', padding: 0, position: 'relative', display: pageIndex === 0 ? 'flex' : 'none', maxWidth: '100%' }}
        >
            <Map mapStyleMenuStyle={{ top: 0 }}>
                <Marker longitude={viewState.longitude} latitude={viewState.latitude} anchor="bottom">
                    <span style={{ fontSize: '22px' }}>📍</span>
                </Marker>
            </Map>

            <Footer>
                <PillButton
                    style={{ padding: '1.2rem 1rem', marginTop: '0.7rem' }}
                    disabled={!mapMoved}
                    selected={mapMoved}
                    onClick={() => chooseLocationHandler(viewState.latitude, viewState.longitude)}
                >
                    📍 Velg Punkt
                </PillButton>

                <MyLocationButton onClickHandler={getUserLocationHandler} loadingUserLocation={loading} />
            </Footer>
        </Section>
    );
};
