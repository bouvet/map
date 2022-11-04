import { FC, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { useInput } from '../hooks/useInput';
import { validateEmail } from '../utils/emailValidator';
import { loginServices } from '../features/login/services/login.services';
import { Form } from '../components/Form/Form';
import { StyledInput } from '../components/Form/StyledElements/StyledInput';
import { BackButton, PageContainer, PageSubtitle, PageTitle, SectionContainer, SubmitButton } from '../components/UI';

export const ChangePassword: FC = () => {
    const dispatch = useStateDispatch();
    const navigate = useNavigate();

    const { user } = useStateSelector((state) => state.auth);
    const { email } = useStateSelector((state) => state.user);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        setInitialValue: setInitialEmail,
    } = useInput((value) => validateEmail(value));

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailBlurHandler();

        if (!enteredEmailIsValid) return;

        const successStatus: boolean = await dispatch(loginServices.getToken({ email: enteredEmail }));
        if (successStatus) {
            navigate(-1);
        }
    };

    useEffect(() => {
        if (user?.email) {
            setInitialEmail(user.email);
        }
        if (email) {
            setInitialEmail(email);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageContainer>
            <BackButton onClick={() => navigate(-1)} />
            <SectionContainer>
                <PageTitle>Endre passord</PageTitle>
                <PageSubtitle style={{ marginTop: '1rem' }}>
                    Fyll inn din e-postadresse så sender vi deg en link for å endre passord.
                </PageSubtitle>
                <Form onSubmit={onSubmitHandler} style={{ marginTop: '1rem' }}>
                    <StyledInput
                        label="E-post"
                        type="email"
                        errorMessage="Vennligst oppgi en gyldig e-post"
                        value={enteredEmail}
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
                        Send link
                    </SubmitButton>
                </Form>
            </SectionContainer>
        </PageContainer>
    );
};
