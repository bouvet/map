import { useEffect, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from '../../../components/Form/Form';
import { StyledInput } from '../../../components/Form/StyledInput';
import { Section } from '../../../components/Layout';
import { useInput, useStateDispatch, useStateSelector } from '../../../hooks';
import { validateEmail } from '../../../utils';
import { registerServices } from '../services/register.services';
import { PrimaryButton, Text, PageSubtitle } from '../../../components/Common';

export const Email = () => {
    const [storedEmail, setStoredEmail] = useState('');

    const { loading } = useStateSelector((state) => state.user);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        setInitialValue: setInitialEmail,
    } = useInput((value) => validateEmail(value));

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailBlurHandler();

        if (!emailIsValid) return;

        localStorage.setItem('email', email);

        dispatch(
            registerServices.getCode(email, (emailIsConfirmed) => {
                if (emailIsConfirmed) {
                    navigate('/register/personal-info');
                    return;
                }
                navigate('/register/confirm-code');
            }),
        );
    };

    useEffect(() => {
        const localStoredEmail = localStorage.getItem('email');
        if (localStoredEmail) {
            setInitialEmail(localStoredEmail);
            setStoredEmail(localStoredEmail);
        }
    }, [setInitialEmail]);

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
                    value={email}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    inputHasError={emailInputHasError}
                />
                <div style={{ marginTop: 'auto' }}>
                    <PrimaryButton type="submit" disabled={!emailIsValid} loading={loading}>
                        Send kode
                    </PrimaryButton>

                    {storedEmail && (
                        <PrimaryButton sx={{ marginTop: '0.5rem' }} onClick={() => navigate('/register/confirm-code')}>
                            Jeg har kode
                        </PrimaryButton>
                    )}
                </div>
            </Form>
        </Section>
    );
};
