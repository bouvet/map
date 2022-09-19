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
import { Loading } from '../features/locationRegistration/components/Loading';
import { CenterPin, MapView } from '../features/locationRegistration/components/Location';
import { locationServices } from '../features/locationRegistration/services/location.services';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { registrationActions } from '../store/state/registration.state';
import { snackbarActions } from '../store/state/snackbar.state';
import { MyTheme } from '../styles/global';

export const LocationRegistration: FC = () => {
    const { currentMapCenter, currentTitle, currentDescription, currentCategories, currentImage } = useStateSelector(
        (state) => state.registration,
    );

    const [pageIndex, setPageIndex] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useStateDispatch();

    const handleClearData = () => {
        dispatch(registrationActions.setCurrentDescription(''));
        dispatch(registrationActions.setCurrentTitle(''));
        dispatch(registrationActions.setCurrentCategories([]));
        dispatch(registrationActions.setCurrentImage(''));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleClearData(), []);

    const handleRedirect = useCallback(() => {
        navigate('/', { replace: true });
        handleClearData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const uploadContent = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', currentTitle);
        formData.append('description', currentDescription);
        formData.append('longitude', JSON.stringify(currentMapCenter.long));
        formData.append('latitude', JSON.stringify(currentMapCenter.lat));
        currentCategories.map((x) => formData.append('category', x));

        const response = await fetch(currentImage);
        const buffer = await response.arrayBuffer();
        const file = new File([buffer], currentImage, { type: 'image' });

        formData.append('img', file);
        const successStatus: boolean = await dispatch(locationServices.postLocation(formData));
        setIsLoading(false);

        if (successStatus) {
            dispatch(snackbarActions.setNotify({ message: 'Successfully added location', severity: 'success' }));
        } else {
            dispatch(snackbarActions.setNotify({ message: 'Something went wrong', severity: 'error', autohideDuration: null }));
        }
        handleRedirect();
    };

    const handleForwardClick = () => {
        if (pageIndex === 2) {
            uploadContent();
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
        navigator.geolocation.getCurrentPosition((position) => {
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
            {isLoading ? (
                <Loading />
            ) : (
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
            )}
        </>
    );
};
