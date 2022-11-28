import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { StyledInput } from '../../components/Form/StyledElements/StyledInput';
import { Main } from '../../components/Layout';
import { PageTitle, SectionContainer, SubmitButton } from '../../components/UI';
import { BackButton } from '../../components/UI/Buttons/NavigationButtons';
import { useInput } from '../../hooks/useInput';
import { useStateDispatch } from '../../hooks/useRedux';
import { snackbarActions } from '../../store/state/snackbar.state';
import { validateEmail } from '../../utils/email-validator';

export const ChangeEmail: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    // email validation?

    const {
        value: email,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => validateEmail(value));

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailBlurHandler();

        if (!enteredEmailIsValid) return;

        // dispatch(userServices.editInfo({ email }));

        dispatch(snackbarActions.setNotify({ message: 'E-posten er endret', severity: 'success' }));
        navigate('/profile');
        console.log('Email: ', email);
    };

    return (
        <Main>
            <BackButton onClick={() => navigate('/profile')} />
            <SectionContainer>
                <PageTitle>Endre e-post</PageTitle>
                <Form onSubmit={onSubmitHandler} style={{ marginTop: '3rem' }}>
                    <StyledInput
                        label="Ny e-post"
                        type="email"
                        errorMessage="Vennligst oppgi en gyldig e-post"
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        inputHasError={emailInputHasError}
                    />
                    <SubmitButton
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 'auto', marginBottom: '-3.5vh' }}
                        disabled={emailInputHasError}
                    >
                        Endre e-post
                    </SubmitButton>
                </Form>
            </SectionContainer>
        </Main>
    );
};
