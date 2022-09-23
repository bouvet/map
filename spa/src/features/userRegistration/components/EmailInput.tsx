import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { LoginButton } from '../../login/components/Button';
import { Form } from '../../login/components/Form';
import { InputEmail } from '../../login/components/Input';
import { LoginContent, LoginWrapper } from '../../login/components/LoginWrapper';
import { SectionWrapper } from '../../login/components/SectoionWrapper';
import { Text, Title } from '../../login/components/Text';

export const EmailInput: FC = () => {
    const navigate = useNavigate();

    const [inputEmail, setInputEmail] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/email-confirmation');
        console.log('Email: ', inputEmail);
    };

    return (
        <LoginWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined">arrow_back</span>
            </BackButton>
            <LoginContent>
                <SectionWrapper>
                    <Title>E-post</Title>
                    <Text>Fyll inn din e-postadresse for å motta en bekreftelseskode.</Text>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputEmail label="E-post*" value={inputEmail} setState={setInputEmail} handleChange={handleFormInputChange} />
                        <LoginButton text="white">Send kode</LoginButton>
                    </Form>
                </SectionWrapper>
            </LoginContent>
        </LoginWrapper>
    );
};
