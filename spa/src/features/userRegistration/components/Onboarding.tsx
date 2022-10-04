import { FC } from 'react';
import { SubmitButtonRight } from '../../../components/Form/Buttons';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { ProgressBarOnboarding } from '../../../components/Form/ProgressBar';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkTextOnboarding, Text, TitleForm, WrapperOnboarding } from '../../../components/Form/Text';

const pageIndex = 0;

export const Onboarding: FC = () => (
    <FormWrapper>
        <FormContent>
            <SectionWrapper>
                <TitleForm>Slik bruker du VerdenVenter</TitleForm>
                <Text>...</Text>
                <WrapperOnboarding>
                    <ProgressBarOnboarding pageIndex={pageIndex} />
                    <SubmitButtonRight text="white">Neste</SubmitButtonRight>
                    <LinkTextOnboarding to="/">Hopp over</LinkTextOnboarding>
                </WrapperOnboarding>
            </SectionWrapper>
        </FormContent>
    </FormWrapper>
);
