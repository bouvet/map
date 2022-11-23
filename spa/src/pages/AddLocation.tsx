import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton, PageContainer } from '../components/UI';
import { AddLocationHeader } from '../features/add-location';
import {
    PageHeader,
    ProgressBar,
    RegistrationButton,
    RegistrationButtonLeft,
    RegistrationButtonRight,
    RegistrationButtonWrapper,
    RegistrationContentWrapper,
    RegistrationHeader,
} from '../features/add-location/components/Common';
import { ImageUploader } from '../features/add-location/components/ImageUploader';
import { Information } from '../features/add-location/components/Information';
import { Loading } from '../features/add-location/components/Loading';
import { CenterPin, MapView } from '../features/add-location/components/Location';
import { locationServices } from '../features/add-location/services/location.services';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { registrationActions } from '../store/state/registration.state';
import { snackbarActions } from '../store/state/snackbar.state';
import { MyTheme } from '../styles/global';

export const AddLocation: FC = () => {
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
        const contentType = response.headers.get('content-type');
        const buffer = await response.arrayBuffer();
        const file = new File([buffer], currentImage, { type: contentType?.toString() });

        formData.append('image', file);
        const successStatus: boolean = await dispatch(locationServices.postLocation(formData));
        setIsLoading(false);

        if (successStatus) {
            dispatch(snackbarActions.setNotify({ message: 'Lokasjon er lagt til', severity: 'success' }));
        } else {
            dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
        }
        handleRedirect();
    };

    const handleForwardClick = () => {
        if (pageIndex === 2) {
            uploadContent();
        } else if (pageIndex === 1) {
            if (currentTitle.length < 5) {
                dispatch(
                    snackbarActions.setNotify({ message: 'Tittel må bestå av minst 5 tegn', severity: 'error', autohideDuration: null }),
                );
            } else if (currentDescription.length < 20) {
                dispatch(
                    snackbarActions.setNotify({
                        message: 'Beskrivelse må bestå av minst 20 tegn',
                        severity: 'error',
                        autohideDuration: null,
                    }),
                );
            } else if (!currentCategories[0]) {
                dispatch(snackbarActions.setNotify({ message: 'Vennligst velg kategori', severity: 'error', autohideDuration: null }));
            } else {
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
            console.log('Not available');
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
                    <AddLocationHeader />
                    {/* <RegistrationHeader> */}
                    {/* <BackButton onClick={() => navigate('..')} /> */}
                    {/* <PageHeader>Legg til treningssted</PageHeader> */}
                    <ProgressBar pageIndex={pageIndex} />
                    {/* </RegistrationHeader> */}
                    <RegistrationContentWrapper>
                        {pageIndex === 1 && <Information />}
                        {pageIndex === 2 && <ImageUploader />}
                        {pageIndex === 0 ? (
                            <>
                                <MapView handleClick={handleGetLocation} />
                                <CenterPin>📍</CenterPin>
                                {currentMapCenter.lat ? (
                                    <RegistrationButton
                                        text={MyTheme.colors.lightBase}
                                        background={MyTheme.colors.accent}
                                        onClick={handleForwardClick}
                                    >
                                        Velg punkt
                                    </RegistrationButton>
                                ) : (
                                    <RegistrationButton disabled text={MyTheme.colors.lightBase} background={MyTheme.colors.accent}>
                                        Velg punkt
                                    </RegistrationButton>
                                )}
                            </>
                        ) : (
                            <RegistrationButtonWrapper>
                                <RegistrationButtonLeft
                                    text={MyTheme.colors.lightBase}
                                    background={MyTheme.colors.darkBase}
                                    onClick={handleBackClick}
                                >
                                    Tilbake
                                </RegistrationButtonLeft>

                                <RegistrationButtonRight
                                    text={MyTheme.colors.lightBase}
                                    background={MyTheme.colors.accent}
                                    disabled={
                                        !(currentTitle && currentCategories[0] && currentDescription) ||
                                        currentTitle.length < 5 ||
                                        currentDescription.length < 20
                                    }
                                    onClick={handleForwardClick}
                                >
                                    {pageIndex === 1 && 'Videre'}
                                    {pageIndex === 2 && 'Fullfør'}
                                </RegistrationButtonRight>
                            </RegistrationButtonWrapper>
                        )}
                    </RegistrationContentWrapper>
                </>
            )}
        </>
    );
};
