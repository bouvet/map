import { ChangeEvent, Dispatch, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../components/Form/Buttons';
import { Form } from '../../components/Form/Form';
import { FormContent, FormWrapper } from '../../components/Form/FormWrapper';
import { CenterFlex, InputPassword } from '../../components/Form/Input';
import { TitleForm } from '../../components/Form/Text';
import { BackButton } from '../../components/Navigation/Buttons';
import { useStateDispatch } from '../../hooks/useRedux';
import { snackbarActions } from '../../store/state/snackbar.state';
import { MyTheme } from '../../styles/global';
import { SectionWrapper } from '../login/components/SectionWrapper';

export const ChangePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [changedPassword, setChangedPassword] = useState('');
    const [confirmChangedPassword, setConfirmChangedPassword] = useState('');

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (changedPassword !== confirmChangedPassword) {
            dispatch(snackbarActions.setNotify({ message: 'Passordene er ikke like', severity: 'error', autohideDuration: null }));
        } else {
            e.preventDefault();
            dispatch(snackbarActions.setNotify({ message: 'Passordet er endret', severity: 'success' }));
            navigate('/profile');
        }
    };

    return (
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightbase} onClick={() => navigate('/profile')}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Endre passord</TitleForm>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <InputPassword
                            label="Nytt passord*"
                            value={changedPassword}
                            setState={setChangedPassword}
                            handleChange={handleFormInputChange}
                        />
                        <InputPassword
                            label="Gjenta nytt passord*"
                            value={confirmChangedPassword}
                            setState={setConfirmChangedPassword}
                            handleChange={handleFormInputChange}
                        />
                        <CenterFlex>
                            <SubmitButtonRegistration text="white">Endre passord</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
