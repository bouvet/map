import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CenterFlex } from '../../../components/Form/Input';
import { ProgressBarOnboarding } from '../../../components/Form/ProgressBar';
import { WrapperOnboarding } from '../../../components/Form/WrapperOnboarding';
import { LinkButton, PageContainer, PageSubtitle, PageTitle, SectionContainer, SubmitButton } from '../../../components/UI';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { userServices } from '../services/user.services';
import { HowAddLocation } from './HowAddLocation';
import { HowAddReview } from './HowAddReview';

export const Onboarding: FC = () => {
    const { email, password, firstName, lastName, dob, favoriteCategoryIds, authMethod } = useStateSelector((state) => state.user);

    const [pageIndex, setPageIndex] = useState(0);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async () => {
        dispatch(
            userServices.register(
                {
                    email,
                    password,
                    firstName,
                    lastName,
                    dob,
                    favoriteCategoryIds,
                },
                authMethod,
            ),
        );

        navigate('/', { replace: true });
    };

    const handleForwardClick = () => {
        if (pageIndex === 2) {
            onSubmitHandler();
        } else {
            setPageIndex(pageIndex + 1);
        }
    };

    // TODO: Make each pageIndex a standalone component. This way we could do something like this:

    /*
   
    {tabIndex === 0 && <TipsAndTricks />}
    {tabIndex === 1 && <Something />}
    {tabIndex === 2 && <Something />}

    */

    return (
        <>
            <PageContainer>
                <SectionContainer>
                    <PageTitle>Slik bruker du VerdenVenter</PageTitle>
                    {pageIndex === 0 ? (
                        <>
                            <PageSubtitle>Tips & triks</PageSubtitle>
                            <CenterFlex>
                                <WrapperOnboarding>
                                    <ProgressBarOnboarding pageIndex={pageIndex} />
                                    <SubmitButton
                                        type="submit"
                                        variant="contained"
                                        sx={{ width: 150, float: 'right' }}
                                        onClick={handleForwardClick}
                                    >
                                        Neste
                                    </SubmitButton>
                                    <LinkButton sx={{ width: 150, float: 'left' }} onClick={onSubmitHandler}>
                                        Hopp over
                                    </LinkButton>
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
                                            <SubmitButton
                                                type="submit"
                                                variant="contained"
                                                sx={{ width: 150, float: 'right' }}
                                                onClick={handleForwardClick}
                                            >
                                                Neste
                                            </SubmitButton>
                                            <LinkButton sx={{ width: 150, float: 'left' }} onClick={onSubmitHandler}>
                                                Hopp over
                                            </LinkButton>
                                        </WrapperOnboarding>
                                    </CenterFlex>
                                </>
                            )}
                            {pageIndex === 2 && (
                                <>
                                    <CenterFlex>
                                        <WrapperOnboarding>
                                            <ProgressBarOnboarding pageIndex={pageIndex} />
                                            <SubmitButton
                                                type="submit"
                                                variant="contained"
                                                sx={{ width: 150, float: 'right' }}
                                                onClick={handleForwardClick}
                                            >
                                                Fullfør
                                            </SubmitButton>
                                        </WrapperOnboarding>
                                    </CenterFlex>
                                </>
                            )}
                        </>
                    )}
                    {pageIndex === 1 && <HowAddLocation />}
                    {pageIndex === 2 && <HowAddReview />}
                </SectionContainer>
            </PageContainer>
        </>
    );
};
