import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';

import { mapActions } from '../store/state/map.state';
import { mapServices } from '../features/map';

import { ILocation } from '../interfaces';
import { locationStatus } from '../types';

import { LocationCard, LocationModal, StatusSelector } from '../features/admin';
import { Section } from '../components/Layout';
import { Header } from '../components/Navigation';

const Admin: React.FC = () => {
    const [location, setLocation] = useState<ILocation | null>(null);

    const { locations } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();

    useEffect(() => {
        dispatch(mapServices.getLocations('Under Review'));
    }, [dispatch]);

    const onSelectStatusHandler = (
        option: SingleValue<{
            value: locationStatus;
            label: string;
        }>,
    ) => {
        if (option) {
            dispatch(mapServices.getLocations(option.value));
        }
    };

    const closeModalHandler = () => {
        setLocation(null);
    };

    const chooseLocationHandler = (location: ILocation) => {
        setLocation(location);
    };

    const removeLocationFromList = (locationId: string) => {
        const filteredLocations = locations.filter((location) => location.id !== locationId);
        dispatch(mapActions.loadLocations(filteredLocations));
    };

    return (
        <>
            <Header>Behandle lokasjoner</Header>
            <Section>
                <StatusSelector onChangeHandler={onSelectStatusHandler} />

                {locations.length > 0 && (
                    <ul style={{ width: '100%', marginTop: '2rem' }}>
                        {locations.map((location: ILocation) => (
                            <LocationCard key={location.id} location={location} onClickHandler={chooseLocationHandler} />
                        ))}
                    </ul>
                )}

                {locations.length === 0 && <div style={{ marginTop: '2rem' }}>Hurra 🎉 - ingenting å gjøre her 👍</div>}

                {location && (
                    <LocationModal
                        location={location}
                        closeModalHandler={closeModalHandler}
                        removeLocationFromList={removeLocationFromList}
                    />
                )}
            </Section>
        </>
    );
};

export default Admin;
