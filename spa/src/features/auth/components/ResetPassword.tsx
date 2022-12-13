import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageSubtitle, PrimaryButton } from '../../../components/Common';
import { Form, StyledInput } from '../../../components/Form';
import { Main, Section } from '../../../components/Layout';
import { Header } from '../../../components/Navigation';
import { useInput, useStateDispatch, useStateSelector } from '../../../hooks';
import { authServices } from '../../../services';
import { validateEmail } from '../../../utils';

const ResetPassword = () => {
    const { loading } = useStateSelector((state) => state.auth);

    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((email) => validateEmail(email));

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailIsValid) return;

        dispatch(
            authServices.resetPassword(email, () => {
                navigate('/auth/login');
            }),
        );
    };

    return (
        <>
            <Header>Tilbakestill passord</Header>
            <Main>
                <Section>
                    <PageSubtitle>Skriv inn e-posten din så sender vi en e-post med lenke for tilbakestilling av passord</PageSubtitle>
                    <Form onSubmit={onSubmitHandler} style={{ paddingTop: '1rem' }}>
                        <StyledInput
                            label="E-post*"
                            value={email}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            errorMessage="Gyldig e-post kreves"
                            inputHasError={emailInputHasError}
                        />
                        <PrimaryButton type="submit" sx={{ marginTop: 'auto' }} loading={loading}>
                            Tilbakestill
                        </PrimaryButton>
                    </Form>
                </Section>
            </Main>
        </>
    );
};

export default ResetPassword;
