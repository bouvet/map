import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { LinkButton, ModalContainer, SectionContainer } from '../components/UI';
import { BackButton } from '../components/UI/Buttons/NavigationButtons';
import { StatusSelector } from '../features/adminPanel';
import { LocationBlock } from '../features/adminPanel/LocationBlock';
import { mapServices } from '../features/map';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { ILocation } from '../utils/types.d';

export type ApprovalFilterCategories = 'Under Review' | 'Approved' | 'Rejected' | 'Reported';

export const AdminPanel: FC = () => {
    // TODO: Create method for approving / rejecting locations

    // TODO: Display locations needing approval with button to call method

    // TODO: Create a sufficient preview for admin to judge location

    const { locations } = useStateSelector((state) => state.map);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

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

    useEffect(() => {
        dispatch(mapServices.getLocations('under review'));
    }, [dispatch]);

    const handleCloseImageModal = () => {
        console.log('click');
    };

    return (
        <>
            <header style={{ width: '100%', height: '3rem', backgroundColor: 'lightgray' }}>
                <span>Hamburger</span>
            </header>
            <SectionContainer>
                <BackButton onClick={() => navigate('/')} />
                {/* <LinkButton onClick={() => navigate('/admin/create-category')}>Opprett kategori</LinkButton> */}

                <StatusSelector onChangeHandler={onSelectStatusHandler} />

                {/* {locations.map((location: ILocation) => (
                <LocationBlock key={location.id} location={location} />
            ))} */}
                <ul style={{ width: '100%', marginTop: '1rem', maxHeight: '75vh', overflow: 'scroll' }}>
                    {/* {locations.map((location: ILocation) => (
                        <li key={location.id} style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                            <span>{location.properties.title}</span>
                        </li>
                    ))} */}
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 1</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 2</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 3</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 4</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 5</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 6</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 7</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 8</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 9</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 10</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 11</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 12</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 13</span>
                    </li>
                    <li style={{ padding: '0.5rem', backgroundColor: 'lightgray', marginBottom: '0.5rem' }}>
                        <span>skate park nummer 14</span>
                    </li>
                </ul>
            </SectionContainer>
            <ModalContainer open onCloseHandler={handleCloseImageModal}>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
                <p>SOme content</p>
            </ModalContainer>
        </>
    );
};
