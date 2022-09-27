import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { SubmitButton } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { InputPassword } from '../../../components/Form/Input';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { LinkText, ProgressBarForm, TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';

export const CreatePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [createPassword, setCreatePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (createPassword !== confirmPassword) {
            dispatch(snackbarActions.setNotify({ message: 'Passordene er ikke like', severity: 'error', autohideDuration: null }));
            console.log('Passordene er ikke like');
        } else {
            navigate('/personalization');
            console.log('Passord er satt');
        }
    };

    const pageIndex = 3;

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
                    <TitleForm>Passord</TitleForm>
                    <ProgressBarForm pageIndex={pageIndex} />
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputPassword
                            label="Passord*"
                            value={createPassword}
                            setState={setCreatePassword}
                            handleChange={handleFormInputChange}
                        />
                        <InputPassword
                            label="Gjenta passord*"
                            value={confirmPassword}
                            setState={setConfirmPassword}
                            handleChange={handleFormInputChange}
                        />
                        <SubmitButton text="white">Gå videre</SubmitButton>
                    </Form>
                    <LinkText onClick={() => navigate(-1)}>Gå tilbake</LinkText>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
