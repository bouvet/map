import { FC, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from '../components/Form/Form';
import { StyledInput } from '../components/Form/StyledInput';
import { Main, Section } from '../components/Layout';
import { PageTitle, SubmitButton } from '../components/UI';
import { CloseButton } from '../components/UI/Buttons/NavigationButtons';
import { loginServices } from '../features/login/services/login.services';
import { useInput } from '../hooks/useInput';
import { useStateDispatch } from '../hooks/useRedux';
import { uiActions } from '../store';

export const ResetPassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputTypeNew, setInputTypeNew] = useState('password');
    const [inputTypeConfirm, setInputTypeConfirm] = useState('password');

    const {
        value: newPassword,
        isValid: newPasswordIsValid,
        hasError: newPasswordInputHasError,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler,
    } = useInput((value) => value.trim().length >= 8);

    const {
        value: confirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
    } = useInput((value) => value.trim().length >= 8);

    const toggleNewPasswordHandler = () => {
        if (inputTypeNew === 'password') {
            setInputTypeNew('text');
            setShowNewPassword(true);
        }

        if (inputTypeNew === 'text') {
            setInputTypeNew('password');
            setShowNewPassword(false);
        }
    };

    const toggleConfirmPasswordHandler = () => {
        if (inputTypeConfirm === 'password') {
            setInputTypeConfirm('text');
            setShowConfirmPassword(true);
        }

        if (inputTypeConfirm === 'text') {
            setInputTypeConfirm('password');
            setShowConfirmPassword(false);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [location.search]);

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            dispatch(uiActions.setShowSnackbar({ message: 'Passordene er ikke like', severity: 'error' }));
        } else {
            newPasswordBlurHandler();
            confirmPasswordBlurHandler();

            if (!newPasswordIsValid || !confirmPasswordIsValid) return;

            const successStatus: boolean = await dispatch(
                loginServices.changePassword({
                    password: newPassword,
                    confirmPassword,
                }),
            );
            if (successStatus) {
                navigate('/login');
            }
        }
    };

    return (
        <Main>
            <CloseButton onClick={() => navigate('/login')} />
            <Section>
                <PageTitle>Tilbakestill passord</PageTitle>
                <Form onSubmit={onSubmitHandler} style={{ marginTop: '3rem' }}>
                    <StyledInput
                        label="Passord*"
                        type={inputTypeNew}
                        errorMessage="Passord må bestå av minst 8 tegn"
                        value={newPassword}
                        onChange={newPasswordChangeHandler}
                        onBlur={newPasswordBlurHandler}
                        inputHasError={newPasswordInputHasError}
                        toggleShowPassword={toggleNewPasswordHandler}
                        showPassword={showNewPassword}
                    />
                    <StyledInput
                        label="Gjenta passord*"
                        type={inputTypeConfirm}
                        errorMessage="Passord må bestå av minst 8 tegn"
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        onBlur={confirmPasswordBlurHandler}
                        inputHasError={confirmPasswordInputHasError}
                        toggleShowPassword={toggleConfirmPasswordHandler}
                        showPassword={showConfirmPassword}
                    />
                    {/* add button disabled */}
                    <SubmitButton type="submit" variant="contained" sx={{ marginTop: 'auto', marginBottom: '-3.5vh' }}>
                        Endre passord
                    </SubmitButton>
                </Form>
            </Section>
        </Main>
    );
};
