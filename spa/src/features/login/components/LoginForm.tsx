import { FC, FormEvent, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { authActions } from '../../../store/state/auth.state';
import { loginServices } from '../services/login.services';

import { useInput } from '../../../hooks/useInput';

import { Checkbox, LeftFlex, RightFlex, SplitWrapper } from '../../../components/Form/Input';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { SubmitButton } from '../../../components/Form/Buttons';
import { LinkText } from '../../../components/Form/Text';
import { Form } from '../../../components/Form/Form';
import { validateEmail } from '../../../utils/emailValidator';

export const LoginForm: FC = () => {
    const [inputType, setInputType] = useState('password');
    const [showPassword, setShowPassword] = useState(false);

    const [rememberStatus, setRememberStatus] = useState(false);

    const { loading } = useStateSelector((state) => state.auth);
    const dispatch = useStateDispatch();

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => validateEmail(value));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.trim().length >= 8);

    const togglePasswordHandler = () => {
        if (inputType === 'password') {
            setInputType('text');
            setShowPassword(true);
        }

        if (inputType === 'text') {
            setInputType('password');
            setShowPassword(false);
        }
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailBlurHandler();
        passwordBlurHandler();

        if (!enteredEmailIsValid || !enteredPasswordIsValid) return;

        dispatch(authActions.setLoading(true));

        dispatch(
            loginServices.login({
                email: 'email',
                password: 'password',
            }),
        );
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
                type={inputType}
                errorMessage="Passord må være minst 8 tegn"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                inputHasError={passwordInputHasError}
                toggleShowPassword={togglePasswordHandler}
                showPassword={showPassword}
            />
            <SplitWrapper>
                <LeftFlex>
                    <Checkbox type="checkbox" checked={rememberStatus} onChange={(e) => setRememberStatus(e.target.checked)} />
                    Husk meg
                    {rememberStatus}
                </LeftFlex>
                <RightFlex>
                    <LinkText to="/change-password">Glemt passord</LinkText>
                </RightFlex>
            </SplitWrapper>
            <SubmitButton text="white" type="submit">
                {!loading ? 'Logg inn' : <CircularProgress color="inherit" size={22} />}
            </SubmitButton>
        </Form>
    );
};
