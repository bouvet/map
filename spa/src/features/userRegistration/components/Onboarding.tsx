import { FC, useCallback, useEffect, useState } from 'react';
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
import { userService } from '../services/user.services';
import { HowAddLocation } from './HowAddLocation';
import { HowAddReview } from './HowAddReview';

export const Onboarding: FC = () => {
    const { email, password, firstName, lastName, dob, favoriteCategoryIds } = useStateSelector((state) => state.user);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleClearData(), []);

    const handleRedirect = useCallback(() => {
        navigate('/', { replace: true });
        handleClearData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    // upload unless redirected from Vipps or Google signup
    const uploadContent = async () => {
        const userDetails = {
            email,
            password,
            firstName,
            lastName,
            dob,
            favoriteCategoryIds,
        };

        const successStatus: boolean = await dispatch(userService.registerUser(userDetails));

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

    // test
    console.log('sjekk1', email);
    console.log('sjekk2', password);
    console.log('sjekk2', firstName, lastName);
    console.log('sjekk4', dob);
    console.log('sjekk5', favoriteCategoryIds);

    const [pageIndex, setPageIndex] = useState(0);

    const handleForwardClick = () => {
        if (pageIndex === 2) {
            uploadContent();
        } else {
            setPageIndex(pageIndex + 1);
        }
    };

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
                                        <LinkTextOnboarding onClick={handleClickSkip}>Hopp over</LinkTextOnboarding>
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
                                                <LinkTextOnboarding onClick={handleClickSkip}>Hopp over</LinkTextOnboarding>
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
