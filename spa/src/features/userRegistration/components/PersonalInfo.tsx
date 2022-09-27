import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SubmitButton } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { InputAge, InputName } from '../../../components/Form/Input';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { ProgressBarForm, TitleForm } from '../../../components/Form/Text';
import { RequiredStar } from '../../../components/Common/RequiredStar';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';

const Label = styled.div``;

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

    const pageIndex = 2;

    return (
        <FormWrapper>
            <BackButton
                backgroundColor={MyTheme.colors.opaque}
                textColor={MyTheme.colors.lightbase}
                onClick={() => navigate('/user-registration')}
            >
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Personlig informasjon</TitleForm>
                    <ProgressBarForm pageIndex={pageIndex} />
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Label>
                            Navn
                            <RequiredStar />
                        </Label>
                        <InputName label="Navn*" value={inputName} setState={setInputName} handleChange={handleFormInputChange} />
                        <InputAge label="Fødselsdato*" value={inputAge} setState={setInputAge} handleChange={handleFormInputChange} />
                        <SubmitButton text="white">Gå videre</SubmitButton>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
