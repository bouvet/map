import { FC } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useStateSelector } from '../hooks/useRedux';
import { fullGoogleAuthUrl } from '../lib/googleAPI';
import { Google, GoogleLogoWhite, Vipps, VippsLogoWhite } from '../components/Form/Buttons';
import { LeftFlex, RightFlex, SplitWrapper } from '../components/Form/Input';
import { FormContent, FormWrapper } from '../components/Form/FormWrapper';
import { SectionWrapperLogin } from '../components/Form/SectionWrapper';
import { DivideLine } from '../features/login/components/DivideLine';
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
                <SectionWrapperLogin>
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
                            Bruk Google
                        </Google>
                    </a>
                    <Vipps text="white">
                        Bruk
                        <VippsLogoWhite src="https://vipps.no/documents/58/vipps-rgb-white.svg" alt="vipps" />
                    </Vipps>
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
                </SectionWrapperLogin>
            </FormContent>
        </FormWrapper>
    );
};
