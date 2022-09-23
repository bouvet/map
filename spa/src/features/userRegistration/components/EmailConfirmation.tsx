import { FC } from 'react';
import { LoginContent, LoginWrapper } from '../../login/components/LoginWrapper';
import { SectionWrapper } from '../../login/components/SectoionWrapper';
import { Text, Title } from '../../login/components/Text';

export const EmailConfirmation: FC = () => (
    <LoginWrapper>
        <LoginContent>
            <SectionWrapper>
                <Title>Bekreft e-post</Title>
                <Text>Skriv inn koden for å bekrefte e-postadressen *fra EmailInput*</Text>
            </SectionWrapper>
        </LoginContent>
    </LoginWrapper>
);
