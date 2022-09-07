import { FC, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../components/Navigation/Buttons';
import {
    BackButtonRegistration,
    PageHeader,
    ProgressBar,
    ProgressElement,
    RegistrationButton,
    RegistrationButtonLeft,
    RegistrationButtonRight,
    RegistrationButtonWrapper,
    RegistrationContentWrapper,
    RegistrationHeader,
} from '../features/locationRegistration/components/Common';
import { ImageUploader } from '../features/locationRegistration/components/ImageUploader';
import { Information } from '../features/locationRegistration/components/Information';
import { CenterPin, MapView } from '../features/locationRegistration/components/Location';
import { locationServices } from '../features/locationRegistration/services/location.services';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { registrationActions } from '../store/state/registration.state';
import { MyTheme } from '../styles/global';
import { NewLocation } from '../utils/types.d';

export const LocationRegistration: FC = () => {
    const { currentMapCenter, currentTitle, currentDescription, currentCategories, currentImage } = useStateSelector((state) => state.registration);
    const [pageIndex, setPageIndex] = useState(0);

    const navigate = useNavigate();
    const dispatch = useStateDispatch();

    const handleRedirect = useCallback(() => navigate('/', { replace: true }), [navigate]);

    const handleForwardClick = () => {
        if (pageIndex === 2) {
            const newLocation: NewLocation = {
                title: currentTitle,
                description: currentDescription,
                longitude: currentMapCenter.long,
                latitude: currentMapCenter.lat,
                rating: 0,
                category: currentCategories,
                img: currentImage,
            };
            dispatch(locationServices.postLocation(newLocation));
            handleRedirect();
            dispatch(registrationActions.setCurrentDescription(''));
            dispatch(registrationActions.setCurrentTitle(''));
            dispatch(registrationActions.setCurrentCategories([]));
        } else {
            setPageIndex(pageIndex + 1);
        }
    };

    const handleBackClick = () => {
        setPageIndex(pageIndex - 1);
    };

    return (
        <>
            <RegistrationHeader>
                <BackButtonRegistration backgroundColor={MyTheme.colors.opaque}>
                    <Link to="/">
                        <GoogleIcon color={MyTheme.colors.lightbase} className="material-symbols-outlined">
                            arrow_back
                        </GoogleIcon>
                    </Link>
                </BackButtonRegistration>
                <PageHeader>Legg til treningssted</PageHeader>
                <ProgressBar>
                    <ProgressElement completed={pageIndex >= 0} icon="add_location" />
                    <ProgressElement completed={pageIndex >= 1} icon="edit_note" />
                    <ProgressElement completed={pageIndex >= 2} icon="add_photo_alternate" />
                </ProgressBar>
            </RegistrationHeader>
            <RegistrationContentWrapper>
                {pageIndex === 0 ? (
                    <>
                        <MapView />
                        <CenterPin>📍</CenterPin>
                        <RegistrationButton text={MyTheme.colors.lightbase} background={MyTheme.colors.accent} onClick={handleForwardClick}>
                            Velg punkt
                        </RegistrationButton>
                    </>
                ) : (
                    <RegistrationButtonWrapper>
                        <RegistrationButtonLeft
                            text={MyTheme.colors.lightbase}
                            background={MyTheme.colors.darkbase}
                            onClick={handleBackClick}
                        >
                            Tilbake
                        </RegistrationButtonLeft>
                        <RegistrationButtonRight
                            text={MyTheme.colors.lightbase}
                            background={MyTheme.colors.accent}
                            onClick={handleForwardClick}
                        >
                            {pageIndex === 1 ? 'Videre' : 'Fullfør'}
                        </RegistrationButtonRight>
                    </RegistrationButtonWrapper>
                )}
                {pageIndex === 1 && <Information />}
                {pageIndex === 2 && <ImageUploader />}
            </RegistrationContentWrapper>
        </>
    );
};
