import { FC, FormEvent, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { Form } from '../components/Form/Form';
import { StyledInput } from '../components/Form/StyledElements/StyledInput';
import { BackButton } from '../components/Navigation/Buttons';
import { SectionContainer, PageTitle, Button } from '../components/UI';
import { useInput } from '../hooks/useInput';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { MyTheme } from '../styles/global';
import { loginServices } from '../features/login/services/login.services';

export const ResetPassword: FC = () => {
    const { changePasswordSuccess, isAuthenticated, loading } = useStateSelector((state) => state.auth);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputTypeNew, setInputTypeNew] = useState('password');
    const [inputTypeConfirm, setInputTypeConfirm] = useState('password');

    const confirmPasswordInputErrorHandler = (value: string) => {
        if (value.trim().length >= 8 && newPassword === value) {
            return true;
        }
        return false;
    };

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
    } = useInput((value) => confirmPasswordInputErrorHandler(value));

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

        newPasswordBlurHandler();
        confirmPasswordBlurHandler();

        if (!newPasswordIsValid || !confirmPasswordIsValid) return;

        dispatch(
            loginServices.changePassword({
                password: newPassword,
                confirmPassword,
            }),
        );
    };

    if (changePasswordSuccess) {
        return <Navigate replace to="/login" />;
    }

    if (isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <SectionContainer>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate('/login')}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>

            <PageTitle>Tilbakestill passord</PageTitle>
            <Form style={{ marginTop: '2rem' }} onSubmit={onSubmitHandler}>
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
                    errorMessage={newPassword !== confirmPassword ? 'Passordene må være like' : 'Passord må bestå av minst 8 tegn'}
                    value={confirmPassword}
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordBlurHandler}
                    inputHasError={confirmPasswordInputHasError}
                    toggleShowPassword={toggleConfirmPasswordHandler}
                    showPassword={showConfirmPassword}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ marginTop: 'auto' }}
                    disabled={newPasswordInputHasError || confirmPasswordInputHasError}
                >
                    {loading ? <CircularProgress color="inherit" size={22} /> : 'Endre Passord'}
                </Button>
            </Form>
        </SectionContainer>
    );
};
