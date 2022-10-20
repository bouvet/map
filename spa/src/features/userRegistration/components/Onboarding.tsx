import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRight } from '../../../components/Form/Buttons';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { CenterFlex } from '../../../components/Form/Input';
import { ProgressBarOnboarding } from '../../../components/Form/ProgressBar';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, LinkTextOnboarding, TitleForm, WrapperOnboarding } from '../../../components/Form/Text';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { userActions } from '../../../store/state/user.state';
import { loginServices } from '../../login/services/login.services';
import { userServices } from '../services/user.services';
import { HowAddLocation } from './HowAddLocation';
import { HowAddReview } from './HowAddReview';

export const Onboarding: FC = () => {
    const { email, password, firstName, lastName, dob, favoriteCategoryIds } = useStateSelector((state) => state.user);

    const [pageIndex, setPageIndex] = useState(0);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const handleClearData = () => {
        dispatch(userActions.setEmail(''));
        dispatch(userActions.setPassword(''));
        dispatch(userActions.setFirstName(''));
        dispatch(userActions.setLastName(''));
        dispatch(userActions.setDob(''));
        dispatch(userActions.setFavoriteCategoryIds([]));
    };

    const handleRedirect = () => {
        navigate('/', { replace: true });
        handleClearData();
    };

    // upload unless redirected from Vipps or Google signup
    const onSubmitHandler = async () => {
        const userDetails = {
            email,
            password,
            firstName,
            lastName,
            dob,
            favoriteCategoryIds,
        };

        const loginDetails = {
            email,
            password,
        };

        const successStatus: boolean = await dispatch(userServices.register(userDetails));

        if (successStatus) {
            await dispatch(loginServices.login(loginDetails));
            dispatch(snackbarActions.setNotify({ message: 'Bruker er opprettet', severity: 'success' }));
        } else {
            dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
        }
        handleRedirect();
    };

    const handleForwardClick = () => {
        if (pageIndex === 2) {
            onSubmitHandler();
        } else {
            setPageIndex(pageIndex + 1);
        }
    };

    // test
    console.log('sjekk1', email);
    console.log('sjekk2', password);
    console.log('sjekk2', firstName, lastName);
    console.log('sjekk4', dob);
    console.log('sjekk5', favoriteCategoryIds);

    return (
        <>
            <FormWrapper>
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>Slik bruker du VerdenVenter</TitleForm>
                        {pageIndex === 0 ? (
                            <>
                                <Text>Tips & triks</Text>
                                <CenterFlex>
                                    <WrapperOnboarding>
                                        <ProgressBarOnboarding pageIndex={pageIndex} />
                                        <SubmitButtonRight text="white" onClick={handleForwardClick}>
                                            Neste
                                        </SubmitButtonRight>
                                        <LinkTextOnboarding onClick={onSubmitHandler}>Hopp over</LinkTextOnboarding>
                                    </WrapperOnboarding>
                                </CenterFlex>
                            </>
                        ) : (
                            <>
                                {pageIndex === 1 && (
                                    <>
                                        <CenterFlex>
                                            <WrapperOnboarding>
                                                <ProgressBarOnboarding pageIndex={pageIndex} />
                                                <SubmitButtonRight text="white" onClick={handleForwardClick}>
                                                    Neste
                                                </SubmitButtonRight>
                                                <LinkTextOnboarding onClick={onSubmitHandler}>Hopp over</LinkTextOnboarding>
                                            </WrapperOnboarding>
                                        </CenterFlex>
                                    </>
                                )}
                                {pageIndex === 2 && (
                                    <>
                                        <CenterFlex>
                                            <WrapperOnboarding>
                                                <ProgressBarOnboarding pageIndex={pageIndex} />
                                                <SubmitButtonRight text="white" onClick={handleForwardClick}>
                                                    Fullfør
                                                </SubmitButtonRight>
                                            </WrapperOnboarding>
                                        </CenterFlex>
                                    </>
                                )}
                            </>
                        )}
                        {pageIndex === 1 && <HowAddLocation />}
                        {pageIndex === 2 && <HowAddReview />}
                    </SectionWrapper>
                </FormContent>
            </FormWrapper>
        </>
    );
};
