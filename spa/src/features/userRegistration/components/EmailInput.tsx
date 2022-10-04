import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { InputEmail } from '../../../components/Form/Input';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, TitleForm } from '../../../components/Form/Text';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';

export const EmailInput: FC = () => {
    const navigate = useNavigate();

    const [inputEmail, setInputEmail] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/email-confirmation', { state: { inputEmail } });
        console.log('Email: ', inputEmail);
    };

    const pageIndex = 0;

    return (
        <>
            <ProgressWrapper>
                <ProgressBarForm pageIndex={pageIndex} />
            </ProgressWrapper>
            <FormWrapperRegistration>
                <BackButton
                    backgroundColor={MyTheme.colors.opaque}
                    textColor={MyTheme.colors.lightbase}
                    onClick={() => navigate('/user-registration')}
                >
                    <span className="material-symbols-outlined">close</span>
                </BackButton>
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>E-post</TitleForm>
                        <Text>Fyll inn din e-postadresse for å motta en bekreftelseskode.</Text>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <InputEmail label="E-post*" value={inputEmail} setState={setInputEmail} handleChange={handleFormInputChange} />
                            <SubmitButtonRegistration text="white">Send kode</SubmitButtonRegistration>
                        </Form>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
