import { FC } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useStateSelector } from '../hooks/useRedux';
import { LeftFlex, RightFlex, SplitWrapper } from '../components/Form/Input';
import { DivideLine } from '../features/login/components/DivideLine';
import { LoginForm } from '../features/login/components/LoginForm';
import { LinkText, Text } from '../components/Form/Text';
import { BackButton } from '../components/Navigation/Buttons';
import { MyTheme } from '../styles/global';
import { PageContainer, SectionContainer } from '../components/UI/Containers';
import { PageSubtitle, PageTitle } from '../components/UI/Text';
import { GoogleLoginLink } from '../features/login/components/GoogleLoginLink';
import { VippsLoginLink } from '../features/login/components/VippsLoginLink';

export const Login: FC = () => {
    const { isAuthenticated } = useStateSelector((state) => state.auth);

    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <PageContainer>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate('/')}>
                <span className="material-symbols-outlined">arrow_back</span>
            </BackButton>
            <SectionContainer>
                <PageTitle>Login</PageTitle>
                <PageSubtitle>Verden venter... på deg!</PageSubtitle>
                <GoogleLoginLink />
                <VippsLoginLink />
                <DivideLine />
                <LoginForm />
                <SplitWrapper>
                    <LeftFlex>
                        <Text>Ikke registrert?</Text>
                    </LeftFlex>
                    <RightFlex>
                        <LinkText to="/email-input">Registrer deg</LinkText>
                    </RightFlex>
                </SplitWrapper>
            </SectionContainer>
        </PageContainer>
    );
};
