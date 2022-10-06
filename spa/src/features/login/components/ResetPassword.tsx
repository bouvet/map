import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { InputPassword } from '../../../components/Form/Input';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { MyTheme } from '../../../styles/global';

export const ResetPassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            dispatch(snackbarActions.setNotify({ message: 'Passordene er ikke like', severity: 'error', autohideDuration: null }));
        } else {
            e.preventDefault();
            dispatch(snackbarActions.setNotify({ message: 'Passordet er endret', severity: 'success' }));
            navigate('/login');
        }
    };

    return (
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={() => navigate('/login')}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Tilbakestill passord</TitleForm>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputPassword
                            label="Nytt passord*"
                            value={newPassword}
                            setState={setNewPassword}
                            handleChange={handleFormInputChange}
                        />
                        <InputPassword
                            label="Gjenta nytt passord*"
                            value={confirmNewPassword}
                            setState={setConfirmNewPassword}
                            handleChange={handleFormInputChange}
                        />
                        <SubmitButtonRegistration text="white">Endre passord</SubmitButtonRegistration>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
