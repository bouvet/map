import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { Form } from '../../../components/Form/Form';
import { userActions } from '../../../store/state/user.state';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { useInput } from '../../../hooks/useInput';
import { SubmitButton } from '../../../components/UI';
import { Section } from '../../../components/Layout';
import { uiActions } from '../../../store';

export const Password: React.FC = () => {
    const { password: storedPassword } = useStateSelector((state) => state.user);
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordInputHasError,
        inputBlurHandler: passwordBlurHandler,
        valueChangeHandler: passwordChangeHandler,
        setInitialValue: setInitialPassword,
    } = useInput((value) => value.trim().length >= 8);

    const {
        value: confirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        inputBlurHandler: confirmPasswordBlurHandler,
        valueChangeHandler: confirmPasswordChangeHandler,
        setInitialValue: setInitialConfirmPassword,
    } = useInput((value) => value.trim().length >= 8);

    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        passwordChangeHandler(e);
        dispatch(userActions.setPassword(e.target.value));
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            dispatch(uiActions.setShowSnackbar({ message: 'Passord må være like', severity: 'error' }));
            return;
        }
        passwordBlurHandler();
        confirmPasswordBlurHandler();

        if (!passwordIsValid || !confirmPasswordIsValid) return;

        dispatch(userActions.setPassword(password));
        navigate('/register/personalization');
    };

    useEffect(() => {
        if (storedPassword) {
            setInitialPassword(storedPassword);
            setInitialConfirmPassword(storedPassword);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Section>
            <Form onSubmit={onSubmitHandler} style={{ marginTop: '1rem' }}>
                <StyledInput
                    label="Passord*"
                    type={showPassword ? 'text' : 'password'}
                    errorMessage="Passord må bestå av minst 8 tegn"
                    value={password}
                    onChange={setPasswordHandler}
                    onBlur={passwordBlurHandler}
                    inputHasError={passwordInputHasError}
                    toggleShowPassword={() => setShowPassword((showPassword) => !showPassword)}
                    showPassword={showPassword}
                />
                <StyledInput
                    label="Gjenta passord*"
                    type={showConfirmPassword ? 'text' : 'password'}
                    errorMessage={confirmPasswordInputHasError ? 'Passord må bestå av minst 8 tegn' : 'Passord må være like'}
                    value={confirmPassword}
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordBlurHandler}
                    inputHasError={confirmPasswordInputHasError || password !== confirmPassword}
                    toggleShowPassword={() => setShowConfirmPassword((showPassword) => !showPassword)}
                    showPassword={showConfirmPassword}
                />
                <SubmitButton
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: 'auto' }}
                    disabled={passwordInputHasError || confirmPasswordInputHasError || password !== confirmPassword}
                >
                    Gå videre
                </SubmitButton>
            </Form>
        </Section>
    );
};
