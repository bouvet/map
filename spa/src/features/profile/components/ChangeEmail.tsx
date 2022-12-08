import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../components/Common';
import { Form } from '../../../components/Form/Form';
import { StyledInput } from '../../../components/Form/StyledInput';
import { Main, Section } from '../../../components/Layout';
import { Header } from '../../../components/Navigation';
import { useInput } from '../../../hooks/useInput';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { userServices } from '../../../services';
import { validateEmail } from '../../../utils/email-validator';

export const ChangeEmail = () => {
    const { loading } = useStateSelector((state) => state.auth);
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => validateEmail(value));

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailBlurHandler();

        if (!emailIsValid) return;

        dispatch(
            userServices.changeEmail(email, () => {
                navigate('/');
            }),
        );
    };

    return (
        <>
            <Header>Bytt e-post</Header>
            <Main>
                <Section>
                    <p style={{ marginBottom: '2rem' }}>
                        Skriv inn din nye e-post så sender vi deg en e-post for å bekrefte din nye epost. Du vil bli logget ut og ny epost
                        må bekreftes før du kan logge inn igjen.
                    </p>
                    <Form onSubmit={onSubmitHandler}>
                        <StyledInput
                            label="Ny e-post"
                            type="email"
                            errorMessage="Vennligst oppgi en gyldig e-post"
                            value={email}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            inputHasError={emailInputHasError}
                        />
                        <PrimaryButton
                            type="submit"
                            sx={{ marginTop: 'auto' }}
                            disabled={!emailIsValid || emailInputHasError}
                            loading={loading}
                        >
                            Endre e-post
                        </PrimaryButton>
                    </Form>
                </Section>
            </Main>
        </>
    );
};
