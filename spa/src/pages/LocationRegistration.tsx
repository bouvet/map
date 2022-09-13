import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BackButtonRegistration,
    PageHeader,
    ProgressBar,
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
    const { currentMapCenter, currentTitle, currentDescription, currentCategories, currentImage } = useStateSelector(
        (state) => state.registration,
    );

    const [pageIndex, setPageIndex] = useState(0);

    const navigate = useNavigate();
    const dispatch = useStateDispatch();

    const handleClearData = () => {
        const emptyFile = {} as File;
        dispatch(registrationActions.setCurrentDescription(''));
        dispatch(registrationActions.setCurrentTitle(''));
        dispatch(registrationActions.setCurrentCategories([]));
        dispatch(registrationActions.setCurrentImage(emptyFile));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleClearData(), []);

    const handleRedirect = useCallback(() => {
        navigate('/', { replace: true });
        handleClearData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

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
        } else if (pageIndex === 1) {
            if (currentTitle && currentDescription && currentCategories[0]) {
                setPageIndex(pageIndex + 1);
            }
        } else {
            setPageIndex(pageIndex + 1);
        }
    };

    const handleBackClick = () => {
        setPageIndex(pageIndex - 1);
    };

    const handleGetLocation = () => {
        console.log('isClicked');
        if ('geolocation' in navigator) {
            setLocationFromUserLocation();
        } else {
            console.log('Not availale');
        }
    };

    const setLocationFromUserLocation = () => {
        console.log('isGettingLocation');
        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(
                registrationActions.setCurrentUserLocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                }),
            );
            dispatch(registrationActions.setHasUserLocation(true));
        });
    };

    return (
        <>
            <RegistrationHeader>
                <BackButtonRegistration />
                <PageHeader>Legg til treningssted</PageHeader>
                <ProgressBar pageIndex={pageIndex} />
            </RegistrationHeader>
            <RegistrationContentWrapper>
                {pageIndex === 0 ? (
                    <>
                        <MapView handleClick={handleGetLocation} />
                        <CenterPin>📍</CenterPin>
                        {currentMapCenter.lat ? (
                            <RegistrationButton
                                text={MyTheme.colors.lightbase}
                                background={MyTheme.colors.accent}
                                onClick={handleForwardClick}
                            >
                                Velg punkt
                            </RegistrationButton>
                        ) : (
                            <RegistrationButton disabled text={MyTheme.colors.lightbase} background={MyTheme.colors.accent}>
                                Velg punkt
                            </RegistrationButton>
                        )}
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

                        {pageIndex === 1 && (
                            <RegistrationButtonRight
                                text={MyTheme.colors.lightbase}
                                background={MyTheme.colors.accent}
                                disabled={!(currentTitle && currentCategories[0] && currentDescription)}
                                onClick={handleForwardClick}
                            >
                                Videre
                            </RegistrationButtonRight>
                        )}

                        {pageIndex === 2 && (
                            <RegistrationButtonRight
                                text={MyTheme.colors.lightbase}
                                background={MyTheme.colors.accent}
                                onClick={handleForwardClick}
                            >
                                Fullfør
                            </RegistrationButtonRight>
                        )}
                    </RegistrationButtonWrapper>
                )}
                {pageIndex === 1 && <Information />}
                {pageIndex === 2 && <ImageUploader />}
            </RegistrationContentWrapper>
        </>
    );
};
