import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { InputEmail } from '../../../components/Form/Input';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { MyTheme } from '../../../styles/global';

export const ForgottenPassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [inputEmail, setInputEmail] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            snackbarActions.setNotify({
                message: `En link for å tilbakestille passordet er sendt til ${inputEmail}`,
                severity: 'success',
            }),
        );
        navigate('/login');
    };

    return (
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={() => navigate('/login')}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Glemt passord</TitleForm>
                    <Text>Fyll inn din e-postadresse så sender vi deg en link for å endre passord.</Text>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputEmail label="E-post*" value={inputEmail} setState={setInputEmail} handleChange={handleFormInputChange} />
                        <SubmitButtonRegistration text="white">Tilbakestill passord</SubmitButtonRegistration>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
