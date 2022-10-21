import { FC } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useStateSelector } from '../hooks/useRedux';
import { DivideLine, GoogleLoginLink, LoginForm, VippsLoginLink } from '../features/login';
import { PageContainer, SectionContainer, PageTitle, PageSubtitle, BackButton, FlexRowContainer, LinkText, Text } from '../components/UI';

export const Login: FC = () => {
    const { isAuthenticated } = useStateSelector((state) => state.auth);

    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <PageContainer>
            <BackButton onClick={() => navigate('/')} />
            <SectionContainer>
                <PageTitle>Login</PageTitle>
                <PageSubtitle>Verden venter... på deg!</PageSubtitle>
                <GoogleLoginLink />
                <VippsLoginLink />
                <DivideLine />
                <LoginForm />
                <FlexRowContainer spacing="space-between">
                    <Text>Ikke registrert?</Text>
                    <LinkText to="/email-input">Registrer deg</LinkText>
                </FlexRowContainer>
            </SectionContainer>
        </PageContainer>
    );
};
