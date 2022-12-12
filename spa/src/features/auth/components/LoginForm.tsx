import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { useInput } from '../../../hooks/useInput';
import { Checkbox } from '../../../components/Form/Input';
import { StyledInput } from '../../../components/Form/StyledInput';
import { Form } from '../../../components/Form/Form';
import { validateEmail } from '../../../utils';
import { FlexRowContainer } from '../../../components/Layout';

import { authServices } from '../../../services';
import { LinkButton, PrimaryButton, Text } from '../../../components/Common';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const { loading } = useStateSelector((state) => state.auth);
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value: string) => validateEmail(value));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value: string) => value.trim().length >= 8);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailBlurHandler();
        passwordBlurHandler();

        if (!enteredEmailIsValid || !enteredPasswordIsValid) return;

        dispatch(authServices.login(enteredEmail, enteredPassword));
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <StyledInput
                label="E-post"
                type="email"
                errorMessage="Vennligst oppgi en gyldig epost"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                inputHasError={emailInputHasError}
            />
            <StyledInput
                label="Passord"
                type={showPassword ? 'text' : 'password'}
                errorMessage="Passord må bestå av minst 8 tegn"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                inputHasError={passwordInputHasError}
                toggleShowPassword={() => setShowPassword((show) => !show)}
                showPassword={showPassword}
            />
            <FlexRowContainer spacing="space-between">
                <FlexRowContainer>
                    <Checkbox type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <Text style={{ whiteSpace: 'nowrap' }}>Husk meg</Text>
                </FlexRowContainer>
                <LinkButton onClick={() => navigate('/auth/reset-password', { state: { enteredEmail } })}>Glemt passord</LinkButton>
            </FlexRowContainer>

            <PrimaryButton type="submit" disabled={!enteredEmailIsValid || !enteredPasswordIsValid} loading={loading}>
                Logg inn
            </PrimaryButton>

            <FlexRowContainer spacing="space-between">
                <Text>Ikke registrert?</Text>
                <LinkButton onClick={() => navigate('/register')}>Registrer deg</LinkButton>
            </FlexRowContainer>
        </Form>
    );
};
