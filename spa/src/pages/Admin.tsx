import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';

import MenuIcon from '@mui/icons-material/Menu';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { mapServices } from '../features/map';
import { ILocation } from '../interfaces';

import { DrawerContainer, SectionContainer } from '../components/UI';
import { LocationList, LocationListItem, Modal, StatusSelector } from '../features/adminPanel';
import { mapActions } from '../store/state/map.state';
import { Header } from '../components/Navigation';
import { locationStatus } from '../types';

export const Admin: React.FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [location, setLocation] = useState<ILocation | null>(null);

    const { locations } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

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

    const toggleDrawerHandler = () => {
        setOpenDrawer((open) => !open);
    };

    return (
        <>
            <Header>
                <IconButton
                    color="inherit"
                    aria-label="Navigate home"
                    onClick={() => navigate('..')}
                    sx={{
                        mr: 'auto',
                        width: '4rem',
                        alignItems: 'center',
                        display: {
                            xs: 'flex',
                            sm: 'none',
                        },
                    }}
                >
                    <ArrowBack sx={{ color: 'white' }} />
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawerHandler}
                    sx={{
                        ml: 'auto',
                        width: '4rem',
                        alignItems: 'center',
                        display: {
                            xs: 'flex',
                            sm: 'none',
                        },
                    }}
                >
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton>
            </Header>

            <SectionContainer>
                <StatusSelector onChangeHandler={onSelectStatusHandler} />

                {locations.length > 0 && (
                    <LocationList>
                        {locations.map((location: ILocation) => (
                            <LocationListItem key={location.id} location={location} onClickHandler={chooseLocationHandler}>
                                <span>{location.properties.title}</span>
                            </LocationListItem>
                        ))}
                    </LocationList>
                )}

                {locations.length === 0 && <div style={{ marginTop: '2rem' }}>Hurra 🎉 - ingenting å gjøre her 👍</div>}

                {location && (
                    <Modal location={location} closeModalHandler={closeModalHandler} removeLocationFromList={removeLocationFromList} />
                )}
            </SectionContainer>

            <DrawerContainer
                drawerOpen={openDrawer}
                openCloseToggle={toggleDrawerHandler}
                links={[
                    { to: '/admin/create-category', label: 'Opprett Kategori' },
                    { to: '/', label: 'Hjem' },
                ]}
            />
        </>
    );
};
