import { FC } from 'react';
import { LoginButton } from '../../login/components/Button';
import { LoginContent, LoginWrapper } from '../../login/components/LoginWrapper';
import { SectionWrapper } from '../../login/components/SectoionWrapper';
import { LinkText, Title } from '../../login/components/Text';

export const Onboarding: FC = () => (
    <LoginWrapper>
        <LoginContent>
            <SectionWrapper>
                <Title>Slik bruker du VerdenVenter</Title>
                <LoginButton text="white">Fortsett</LoginButton>
                {/* Validate user when redirecting */}
                <LinkText href="/">Hopp over</LinkText>
            </SectionWrapper>
        </LoginContent>
    </LoginWrapper>
);
