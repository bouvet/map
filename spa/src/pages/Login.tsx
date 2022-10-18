import { FC } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useStateSelector } from '../hooks/useRedux';

import { fullGoogleAuthUrl } from '../lib/googleAPI';

import { Google, GoogleLogoWhite, Vipps, VippsLogoWhite } from '../components/Form/Buttons';
import { LeftFlex, RightFlex, SplitWrapper } from '../components/Form/Input';
import { FormContent, FormWrapper } from '../components/Form/FormWrapper';
import { DivideLine } from '../features/login/components/DivideLine';
import { SectionWrapper } from '../components/Form/SectionWrapper';
import { LoginForm } from '../features/login/components/LoginForm';
import { LinkText, Text, Title } from '../components/Form/Text';
import { BackButton } from '../components/Navigation/Buttons';
import { MyTheme } from '../styles/global';

export const Login: FC = () => {
    const { isAuthenticated } = useStateSelector((state) => state.auth);

    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <FormWrapper>
            <FormContent>
                <SectionWrapper>
                    <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate('/')}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </BackButton>
                    <span>
                        <Title>Login</Title>
                        <Text>Verden venter... på deg!</Text>
                    </span>
                    <a href={`${fullGoogleAuthUrl}`} rel="noopener noreferrer">
                        <Google text="google">
                            <GoogleLogoWhite
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google"
                            />
                            Logg inn med Google
                        </Google>
                    </a>
                    <Vipps text="white">
                        Logg inn med
                        <VippsLogoWhite src="https://vipps.no/documents/58/vipps-rgb-white.svg" alt="vipps" />
                    </Vipps>
                    <DivideLine />
                    <LoginForm />
                    <SplitWrapper>
                        <LeftFlex>
                            <Text>Ikke registrert?</Text>
                        </LeftFlex>
                        <RightFlex>
                            <LinkText to="/user-registration">Registrer deg</LinkText>
                        </RightFlex>
                    </SplitWrapper>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
