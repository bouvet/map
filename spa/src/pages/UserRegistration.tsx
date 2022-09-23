import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Email, Google, GoogleLogoWhite, Vipps, VippsLogoWhite } from '../features/login/components/Button';
import { LeftFlex, RightFlex, SplitWrapper } from '../features/login/components/Input';
import { LoginContent, LoginWrapper } from '../features/login/components/LoginWrapper';
import { SectionWrapper } from '../features/login/components/SectoionWrapper';
import { LinkText, Text, Title } from '../features/login/components/Text';

export const UserRegistration: FC = () => {
    const navigate = useNavigate();

    return (
        <LoginWrapper>
            <LoginContent>
                <SectionWrapper>
                    <LinkText href="/login">Tilbake</LinkText>
                    <span>
                        <Title>Registrer ny bruker</Title>
                        <Text>
                            Ved å opprette bruker kan du:
                            <br />
                            <ul>
                                <li>Legge til lokasjoner</li>
                                <li>Få personlig tilpasning</li>
                            </ul>
                        </Text>
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
                            <LinkText href="/user-registration">Logg inn</LinkText>
                        </RightFlex>
                    </SplitWrapper>
                </SectionWrapper>
            </LoginContent>
        </LoginWrapper>
    );
};
