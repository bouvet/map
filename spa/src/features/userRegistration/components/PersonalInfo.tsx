import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginButton } from '../../login/components/Button';
import { Form } from '../../login/components/Form';
import { InputEmail } from '../../login/components/Input';
import { LoginContent, LoginWrapper } from '../../login/components/LoginWrapper';
import { SectionWrapper } from '../../login/components/SectoionWrapper';
import { Title } from '../../login/components/Text';

export const PersonalInfo: FC = () => {
    const navigate = useNavigate();

    const [inputEmail, setInputEmail] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/create-password');
        console.log('Email: ', inputEmail);
    };

    return (
        <LoginWrapper>
            <LoginContent>
                <SectionWrapper>
                    <Title>Personlig informasjon</Title>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        {/* Placeholder - replace email with input for name and date of birth */}
                        <InputEmail label="E-post*" value={inputEmail} setState={setInputEmail} handleChange={handleFormInputChange} />
                        <LoginButton text="white">Gå videre</LoginButton>
                    </Form>
                </SectionWrapper>
            </LoginContent>
        </LoginWrapper>
    );
};
