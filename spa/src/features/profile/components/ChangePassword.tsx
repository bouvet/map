import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../../../components/Common';
import { Form, StyledInput } from '../../../components/Form';
import { Main, Section } from '../../../components/Layout';
import { Header } from '../../../components/Navigation';
import { useInput, useStateDispatch, useStateSelector } from '../../../hooks';
import { userServices } from '../../../services';

export const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { loading } = useStateSelector((state) => state.user);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: currentPassword,
        isValid: currentPasswordIsValid,
        hasError: currentPasswordInputHasError,
        valueChangeHandler: currentPasswordChangeHandler,
        inputBlurHandler: currentPasswordBlurHandler,
    } = useInput((value: string) => value.length >= 8);

    const {
        value: newPassword,
        isValid: newPasswordIsValid,
        hasError: newPasswordInputHasError,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler,
    } = useInput((value: string) => value.length >= 8);

    const {
        value: confirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
    } = useInput((value: string) => value.length >= 8);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        currentPasswordBlurHandler();
        newPasswordBlurHandler();
        confirmPasswordBlurHandler();

        if (!newPasswordIsValid || !confirmPasswordIsValid) return;

        if (newPassword !== confirmPassword) return;

        dispatch(
            userServices.updatePassword({ currentPassword, password: newPassword, confirmPassword }, () => {
                navigate('/profile');
            }),
        );
    };

    return (
        <>
            <Header>Bytt passord</Header>
            <Main>
                <Section>
                    <Form onSubmit={onSubmitHandler} style={{ paddingTop: '1rem' }}>
                        <StyledInput
                            label="Nåværende passord"
                            type={showCurrentPassword ? 'text' : 'password'}
                            errorMessage="Passord må være minst 8 tegn"
                            showPassword={showCurrentPassword}
                            toggleShowPassword={() => setShowCurrentPassword((show) => !show)}
                            value={currentPassword}
                            onChange={currentPasswordChangeHandler}
                            onBlur={currentPasswordBlurHandler}
                            inputHasError={currentPasswordInputHasError}
                        />
                        <StyledInput
                            label="Nytt passord"
                            type={showNewPassword ? 'text' : 'password'}
                            errorMessage="Passord må være minst 8 tegn"
                            showPassword={showNewPassword}
                            toggleShowPassword={() => setShowNewPassword((show) => !show)}
                            value={newPassword}
                            onChange={newPasswordChangeHandler}
                            onBlur={newPasswordBlurHandler}
                            inputHasError={newPasswordInputHasError}
                        />
                        <StyledInput
                            label="Bekreft passord"
                            type={showConfirmPassword ? 'text' : 'password'}
                            errorMessage="Passord må være minst 8 tegn"
                            showPassword={showConfirmPassword}
                            toggleShowPassword={() => setShowConfirmPassword((show) => !show)}
                            value={confirmPassword}
                            onChange={confirmPasswordChangeHandler}
                            onBlur={confirmPasswordBlurHandler}
                            inputHasError={confirmPasswordInputHasError}
                        />
                        <PrimaryButton
                            type="submit"
                            disabled={!currentPasswordIsValid || !newPasswordIsValid || !confirmPasswordIsValid}
                            loading={loading}
                            sx={{ marginTop: 'auto' }}
                        >
                            Lagre
                        </PrimaryButton>
                        <SecondaryButton onClick={() => {}}>Gå tilbake</SecondaryButton>
                    </Form>
                </Section>
            </Main>
        </>
    );
};
