import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch } from '../hooks/useRedux';
import { useInput } from '../hooks/useInput';
import { validateEmail } from '../utils/emailValidator';
import { loginServices } from '../features/login/services/login.services';
import { Form } from '../components/Form/Form';
import { StyledInput } from '../components/Form/StyledElements/StyledInput';
import { BackButton, PageContainer, PageSubtitle, PageTitle, SectionContainer, SubmitButton } from '../components/UI';

export const ChangePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const {
        value: email,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => validateEmail(value));

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailBlurHandler();

        if (!enteredEmailIsValid) return;

        const successStatus: boolean = await dispatch(loginServices.getToken({ email }));
        if (successStatus) {
            navigate(-1);
            console.log('sjekk', email);
        }
    };

    return (
        <PageContainer>
            <BackButton onClick={() => navigate(-1)} />
            <SectionContainer>
                <PageTitle>Endre passord</PageTitle>
                <PageSubtitle>Fyll inn din e-postadresse så sender vi deg en link for å endre passord.</PageSubtitle>
                <Form onSubmit={onSubmitHandler} style={{ marginTop: '3rem' }}>
                    <StyledInput
                        label="E-post"
                        type="email"
                        errorMessage="Vennligst oppgi en gyldig e-post"
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        inputHasError={emailInputHasError}
                    />
                    <SubmitButton type="submit" variant="contained" sx={{ marginTop: 'auto' }} disabled={emailInputHasError}>
                        Send link
                    </SubmitButton>
                </Form>
            </SectionContainer>
        </PageContainer>
    );
};
