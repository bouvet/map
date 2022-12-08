import React, { useEffect, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';
import { Form } from '../../../components/Form/Form';
import { StyledInput } from '../../../components/Form/StyledInput';
import { Section } from '../../../components/Layout';
import { SubmitButton, Text, PageSubtitle, LinkButton } from '../../../components/UI';
import { useInput, useStateDispatch, useStateSelector } from '../../../hooks';
import { userActions } from '../../../store';
import { validateEmail } from '../../../utils';
import { registerServices } from '../services/register.services';

export const Email: React.FC = () => {
    const [storedEmail, setStoredEmail] = useState('');

    const { loading, email } = useStateSelector((state) => state.user);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => validateEmail(value));

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailBlurHandler();

        if (!enteredEmailIsValid) return;

        dispatch(
            registerServices.getCode(enteredEmail, (emailIsConfirmed) => {
                if (emailIsConfirmed) {
                    navigate('/register/personal-info');
                    return;
                }
                navigate('/register/confirm-code');
            }),
        );
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        emailChangeHandler(e);
        dispatch(userActions.setEmail(e.target.value));
    };

    useEffect(() => {
        const email = localStorage.getItem('email');

        if (email) {
            setStoredEmail(email);
            dispatch(userActions.setEmail(email));
        }
    }, [dispatch]);

    return (
        <Section>
            <PageSubtitle>Ved å opprette bruker kan du</PageSubtitle>
            <ul style={{ listStyle: 'disc', paddingLeft: '1rem' }}>
                <li>
                    <Text>Legge til lokasjoner</Text>
                </li>
                <li style={{ padding: '1rem 0' }}>
                    <Text>Få personlig tilpasning og anbefalinger</Text>
                </li>
            </ul>
            <Form onSubmit={onSubmitHandler} style={{ marginTop: '1rem' }}>
                <StyledInput
                    label="E-post*"
                    type="email"
                    errorMessage="Vennligst oppgi en gyldig e-post"
                    value={enteredEmail.trim().length > 0 ? enteredEmail : email}
                    onChange={onEmailChange}
                    onBlur={emailBlurHandler}
                    inputHasError={emailInputHasError}
                />
                <SubmitButton type="submit" variant="contained" sx={{ marginTop: '1rem' }} disabled={!enteredEmailIsValid}>
                    {!loading ? 'Send kode' : <CircularProgress color="inherit" size={22} />}
                </SubmitButton>
                {storedEmail && (
                    <LinkButton sx={{ marginTop: '0.5rem' }} onClick={() => navigate('/register/confirm-code')}>
                        Jeg har kode
                    </LinkButton>
                )}
            </Form>
        </Section>
    );
};
