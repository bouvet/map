import { FC, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { CenterFlex } from '../../../components/Form/Input';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { useInput } from '../../../hooks/useInput';
import { useStateDispatch } from '../../../hooks/useRedux';
import { snackbarActions } from '../../../store/state/snackbar.state';
import { MyTheme } from '../../../styles/global';
import { loginServices } from '../services/login.services';

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
            dispatch(snackbarActions.setNotify({ message: 'Passordene er ikke like', severity: 'error', autohideDuration: null }));
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
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate('/login')}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Tilbakestill passord</TitleForm>
                    <Form onSubmit={onSubmitHandler}>
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
                        <CenterFlex>
                            <SubmitButtonRegistration text="white">Endre passord</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
