import { ChangeEvent, Dispatch, FC, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { CenterFlex, InputPassword } from '../../../components/Form/Input';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { MyTheme } from '../../../styles/global';
import { loginService } from '../services/login.services';

export const ResetPassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowConfirmNewPassword = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [location.search]);

    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>, setState: Dispatch<string>) => {
        setState(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            dispatch(snackbarActions.setNotify({ message: 'Passordene er ikke like', severity: 'error', autohideDuration: null }));
        } else {
            e.preventDefault();
            changePassword();
        }
    };

    const changePassword = async () => {
        const inputPassword = {
            password: newPassword,
            confirmPassword: confirmNewPassword,
        };

        console.log(inputPassword);

        const successStatus: boolean = await dispatch(loginService.changePassword(inputPassword));

        if (successStatus) {
            dispatch(snackbarActions.setNotify({ message: 'Passordet er endret', severity: 'success' }));
            navigate('/login');
        } else {
            dispatch(snackbarActions.setNotify({ message: 'Noe gikk galt', severity: 'error', autohideDuration: null }));
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
                            show={showNewPassword}
                            toggleShow={toggleShowNewPassword}
                        />
                        <InputPassword
                            label="Gjenta nytt passord*"
                            value={confirmNewPassword}
                            setState={setConfirmNewPassword}
                            handleChange={handleFormInputChange}
                            show={showConfirmNewPassword}
                            toggleShow={toggleShowConfirmNewPassword}
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
