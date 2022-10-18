import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Email, Google, GoogleLogoWhite, Vipps, VippsLogoWhite } from '../components/Form/Buttons';
import { LeftFlex, RightFlex, SplitWrapper } from '../components/Form/Input';
import { FormContent, FormWrapper } from '../components/Form/FormWrapper';
import { SectionWrapper } from '../components/Form/SectionWrapper';
import { LinkText, Text, Title } from '../components/Form/Text';
import { BackButton } from '../components/Navigation/Buttons';
import { MyTheme } from '../styles/global';

export const UserRegistration: FC = () => {
    const navigate = useNavigate();

    return (
        <FormWrapper>
            <FormContent>
                <SectionWrapper>
                    <BackButton
                        backgroundColor={MyTheme.colors.opaque}
                        textColor={MyTheme.colors.lightBase}
                        onClick={() => navigate('/login')}
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </BackButton>
                    <span>
                        <Title>Registrer ny bruker</Title>
                        <Text>Ved å opprette bruker kan du:</Text>
                        <ul>
                            <li>Legge til lokasjoner</li>
                            <li>Få personlig tilpasning og anbefalinger</li>
                        </ul>
                    </span>
                    <Google text="google">
                        <GoogleLogoWhite src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" />
                        Bruk Google
                    </Google>
                    <Vipps text="white">
                        Bruk
                        <VippsLogoWhite src="https://vipps.no/documents/58/vipps-rgb-white.svg" alt="vipps" />
                    </Vipps>
                    <Email text="white" onClick={() => navigate('/email-input')}>
                        Registrer med e-post
                    </Email>
                    <SplitWrapper>
                        <LeftFlex>
                            <Text>Allerede bruker?</Text>
                        </LeftFlex>
                        <RightFlex>
                            <LinkText to="/login">Logg inn</LinkText>
                        </RightFlex>
                    </SplitWrapper>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
