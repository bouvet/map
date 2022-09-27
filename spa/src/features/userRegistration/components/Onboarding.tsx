import { FC } from 'react';
import { SubmitButtonRight } from '../../../components/Form/Buttons';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkTextOnboarding, ProgressBarForm, Text, TitleForm } from '../../../components/Form/Text';

const pageIndex = 0;

export const Onboarding: FC = () => (
    <FormWrapper>
        <FormContent>
            <SectionWrapper>
                <TitleForm>Slik bruker du VerdenVenter</TitleForm>
                <Text>...</Text>
                <ProgressBarForm pageIndex={pageIndex} />
                <div>
                    <SubmitButtonRight text="white">Neste</SubmitButtonRight>
                    {/* Validate user when redirecting */}
                    <LinkTextOnboarding href="/">Hopp over</LinkTextOnboarding>
                </div>
            </SectionWrapper>
        </FormContent>
    </FormWrapper>
);
