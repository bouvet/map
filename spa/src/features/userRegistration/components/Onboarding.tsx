import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRight } from '../../../components/Form/Buttons';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { ProgressBarOnboarding } from '../../../components/Form/ProgressBar';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, LinkTextOnboarding, TitleForm, WrapperOnboarding } from '../../../components/Form/Text';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { userActions } from '../../../store/state/user.state';
import { userService } from '../services/user.services';

const pageIndex = 0;

export const Onboarding: FC = () => {
    const { email, password, firstName, lastName, age, favorites } = useStateSelector((state) => state.user);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const handleClearData = () => {
        dispatch(userActions.setEmail(''));
        dispatch(userActions.setPassword(''));
        dispatch(userActions.setFirstName(''));
        dispatch(userActions.setLastName(''));
        dispatch(userActions.setAge(''));
        dispatch(userActions.setFavorites([]));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleClearData(), []);

    const handleRedirect = useCallback(() => {
        navigate('/', { replace: true });
        handleClearData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const uploadContent = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('age', age);
        favorites.map((x) => formData.append('favorites', x));

        const successStatus: boolean = await dispatch(userService.registerUser(formData));

        if (successStatus) {
            dispatch(snackbarActions.setNotify({ message: 'Bruker er opprettet', severity: 'success' }));
        } else {
            dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
        }
        handleRedirect();
    };

    const handleClickSkip = () => {
        uploadContent();
    };

    const handleClickComplete = () => {
        uploadContent();
    };

    // test
    console.log('sjekk1', email);
    console.log('sjekk2', password);
    console.log('sjekk2', firstName, lastName);
    console.log('sjekk4', age);
    console.log('sjekk5', favorites);

    return (
        <>
            <FormWrapper>
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>Slik bruker du VerdenVenter</TitleForm>
                        <Text>...</Text>
                        <WrapperOnboarding>
                            <ProgressBarOnboarding pageIndex={pageIndex} />
                            <SubmitButtonRight text="white">Neste</SubmitButtonRight>
                            <LinkTextOnboarding onClick={handleClickSkip}>Hopp over</LinkTextOnboarding>
                        </WrapperOnboarding>
                    </SectionWrapper>
                </FormContent>
            </FormWrapper>
        </>
    );
};
