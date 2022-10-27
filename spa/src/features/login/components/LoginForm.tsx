import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { authActions } from '../../../store/state/auth.state';
import { loginServices } from '../services/login.services';
import { useInput } from '../../../hooks/useInput';
import { Checkbox } from '../../../components/Form/Input';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { Form } from '../../../components/Form/Form';
import { validateEmail } from '../../../utils/emailValidator';
import { LinkButton, SubmitButton } from '../../../components/UI/Buttons';
import { FlexRowContainer } from '../../../components/UI/Containers/FlexRowContainer';
import { Text } from '../../../components/UI';
import { userActions } from '../../../store/state/user.state';

export const LoginForm: FC = () => {
    const [inputType, setInputType] = useState('password');
    const [showPassword, setShowPassword] = useState(false);

    const [rememberStatus, setRememberStatus] = useState(false);

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
                email: enteredEmail,
                password: enteredPassword,
            }),
        );
        dispatch(userActions.setEmail(enteredEmail));
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
                errorMessage="Passord må bestå av minst 8 tegn"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                inputHasError={passwordInputHasError}
                toggleShowPassword={togglePasswordHandler}
                showPassword={showPassword}
            />
            <FlexRowContainer spacing="space-between">
                <div>
                    <Checkbox type="checkbox" checked={rememberStatus} onChange={(e) => setRememberStatus(e.target.checked)} />
                    Husk meg
                    {/* {rememberStatus} */}
                </div>
                <LinkButton
                    sx={{ width: 140, margin: 0, float: 'left' }}
                    onClick={() => navigate('/change-password', { state: { enteredEmail } })}
                >
                    Glemt passord
                </LinkButton>
            </FlexRowContainer>
            {/* add disabled button */}
            <SubmitButton type="submit" variant="contained">
                {!loading ? 'Logg inn' : <CircularProgress color="inherit" size={22} />}
            </SubmitButton>
            <FlexRowContainer spacing="space-between">
                <Text>Ikke registrert?</Text>
                <LinkButton sx={{ width: 140, margin: 0, float: 'left' }} onClick={() => navigate('/register/email')}>
                    Registrer deg
                </LinkButton>
            </FlexRowContainer>
        </Form>
    );
};
