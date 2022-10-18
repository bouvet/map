import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { FormContent, FormWrapper } from '../../../components/Form/FormWrapper';
import { CenterFlex } from '../../../components/Form/Input';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { Text, TitleForm } from '../../../components/Form/Text';
import { BackButton } from '../../../components/Navigation/Buttons';
import { useStateDispatch } from '../../../hooks/useRedux';
import { MyTheme } from '../../../styles/global';
import { validateEmail } from '../../../utils/emailValidator';
import { loginServices } from '../services/login.services';
import { useInput } from '../../../hooks/useInput';

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
        <FormWrapper>
            <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined">close</span>
            </BackButton>
            <FormContent>
                <SectionWrapper>
                    <TitleForm>Endre passord</TitleForm>
                    <Text>Fyll inn din e-postadresse så sender vi deg en link for å endre passord.</Text>
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
                            <SubmitButtonRegistration text="white">Send link</SubmitButtonRegistration>
                        </CenterFlex>
                    </Form>
                </SectionWrapper>
            </FormContent>
        </FormWrapper>
    );
};
