import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import styled from 'styled-components';
import { SectionContainer } from '../components/UI';
import { Modal, StatusSelector } from '../features/adminPanel';
import { mapServices } from '../features/map';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { ILocation } from '../interfaces';
import { MyTheme } from '../styles/global';

export type ApprovalFilterCategories = 'Under Review' | 'Approved' | 'Rejected' | 'Reported';

export const AdminPanel: FC = () => {
    const [location, setLocation] = useState<ILocation | null>(null);

    const { locations } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(mapServices.getLocations('under review'));
    }, [dispatch]);

    const onSelectStatusHandler = (
        option: SingleValue<{
            value: string;
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

    const List = styled.ul`
        width: 100%;
        margin-top: 1rem;
        max-height: 75vh;
        overflow: scroll;
    `;

    const ListItem = styled.li`
        padding: 0.5rem;
        background-color: ${MyTheme.colors.accent};
        margin-bottom: 0.5rem;
        color: white;
    `;

    return (
        <>
            <header style={{ width: '100%', height: '3rem', backgroundColor: `${MyTheme.colors.accent}` }}>
                <span>Hamburger</span>
            </header>
            <SectionContainer>
                {/* <BackButton onClick={() => navigate('/')} /> */}
                {/* <LinkButton onClick={() => navigate('/admin/create-category')}>Opprett kategori</LinkButton> */}

                <StatusSelector onChangeHandler={onSelectStatusHandler} />

                {/* {locations.map((location: ILocation) => (
                <LocationBlock key={location.id} location={location} />
            ))} */}
                <List>
                    {/* {locations.map((location: ILocation) => (
                        <li key={location.id} style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                            <span>{location.properties.title}</span>
                        </li>
                    ))} */}
                    <ListItem onClick={() => setLocation(locations[0])}>
                        <span>skate park nummer 1</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 2</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 3</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 4</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 5</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 6</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 7</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 8</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 9</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 10</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 11</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 12</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 13</span>
                    </ListItem>
                    <ListItem>
                        <span>skate park nummer 14</span>
                    </ListItem>
                </List>
            </SectionContainer>
            {location && <Modal location={location} closeModalHandler={closeModalHandler} />}
        </>
    );
};
