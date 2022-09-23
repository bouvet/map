import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginButton } from '../../login/components/Button';
import { Form } from '../../login/components/Form';
import { InputAge, InputName } from '../../login/components/Input';
import { LoginContent, LoginWrapper } from '../../login/components/LoginWrapper';
import { SectionWrapper } from '../../login/components/SectoionWrapper';
import { Title } from '../../login/components/Text';

export const PersonalInfo: FC = () => {
    const navigate = useNavigate();

    const [inputName, setInputName] = useState('');
    const [inputAge, setInputAge] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/create-password');
        console.log('Name: ', inputName);
        console.log('Age: ', inputAge);
    };

    return (
        <LoginWrapper>
            <LoginContent>
                <SectionWrapper>
                    <Title>Personlig informasjon</Title>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputName label="Navn*" value={inputName} setState={setInputName} handleChange={handleFormInputChange} />
                        <InputAge label="Fødselsdato*" value={inputAge} setState={setInputAge} handleChange={handleFormInputChange} />
                        <LoginButton text="white">Gå videre</LoginButton>
                    </Form>
                </SectionWrapper>
            </LoginContent>
        </LoginWrapper>
    );
};
