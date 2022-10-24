import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../components/Form/Buttons';
import { Form } from '../../components/Form/Form';
import { FormContent, FormWrapper } from '../../components/Form/FormWrapper';
import { CenterFlex } from '../../components/Form/Input';
import { StyledInput } from '../../components/Form/StyledElements/StyledInput';
import { TitleForm } from '../../components/Form/Text';
import { BackButton } from '../../components/Navigation/Buttons';
import { SectionContainer } from '../../components/UI';
import { useInput } from '../../hooks/useInput';
import { useStateDispatch } from '../../hooks/useRedux';
import { snackbarActions } from '../../store/state/snackbar.state';
import { MyTheme } from '../../styles/global';
import { validateEmail } from '../../utils/emailValidator';

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

        dispatch(snackbarActions.setNotify({ message: 'E-posten er endret', severity: 'success' }));
        navigate('/profile');
        console.log('Email: ', email);
    };

    return (
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate('/profile')}>
                <span className="material-symbols-outlined">arrow_back</span>
            </BackButton>
            <FormContent>
                <SectionContainer>
                    <TitleForm>Endre e-post</TitleForm>
                    <Form onSubmit={onSubmitHandler}>
                        <StyledInput
                            label="E-post"
                            type="email"
                            errorMessage="Vennligst oppgi en gyldig e-post"
                            value={email}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            inputHasError={emailInputHasError}
                        />
                        <CenterFlex>
                            <SubmitButtonRegistration text="white">Endre e-post</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionContainer>
            </FormContent>
        </FormWrapper>
    );
};
