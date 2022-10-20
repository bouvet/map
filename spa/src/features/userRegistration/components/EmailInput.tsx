import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackButton } from '../../../components/Navigation/Buttons';
import { MyTheme } from '../../../styles/global';
import { SubmitButtonRegistration } from '../../../components/Form/Buttons';
import { Form } from '../../../components/Form/Form';
import { CenterFlex } from '../../../components/Form/Input';
import { FormContent, FormWrapperRegistration } from '../../../components/Form/FormWrapper';
import { SectionWrapper } from '../../../components/Form/SectionWrapper';
import { Text, TitleForm } from '../../../components/Form/Text';
import { ProgressBarForm, ProgressWrapper } from '../../../components/Form/ProgressBar';
import { useStateDispatch } from '../../../hooks/useRedux';
import { userServices } from '../services/user.services';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { useInput } from '../../../hooks/useInput';
import { validateEmail } from '../../../utils/emailValidator';
import { userActions } from '../../../store/state/user.state';

const ListWrapper = styled.div`
    padding: 10px;
`;

export const EmailInput: FC = () => {
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

        dispatch(userActions.setEmail(email));

        const successStatus: boolean = await dispatch(userServices.getCode({ email }));
        if (successStatus) {
            navigate('/email-confirmation', { state: { email } });
        }
    };

    const pageIndex = 0;

    return (
        <>
            <ProgressWrapper>
                <ProgressBarForm pageIndex={pageIndex} />
            </ProgressWrapper>
            <FormWrapperRegistration>
                <BackButton backgroundColor={MyTheme.colors.opaque} textColor={MyTheme.colors.lightBase} onClick={() => navigate('/login')}>
                    <span className="material-symbols-outlined">close</span>
                </BackButton>
                <FormContent>
                    <SectionWrapper>
                        <TitleForm>E-post</TitleForm>
                        <ListWrapper>
                            <Text>Ved å opprette bruker kan du:</Text>
                            <ul>
                                <li>Legge til lokasjoner</li>
                                <li>Få personlig tilpasning og anbefalinger</li>
                            </ul>
                        </ListWrapper>
                        <Text>Fyll inn din e-postadresse for å motta en bekreftelseskode.</Text>
                        <Form onSubmit={onSubmitHandler}>
                            <StyledInput
                                label="E-post*"
                                type="email"
                                errorMessage="Vennligst oppgi en gyldig e-post"
                                value={email}
                                onChange={emailChangeHandler}
                                onBlur={emailBlurHandler}
                                inputHasError={emailInputHasError}
                            />
                            <CenterFlex>
                                <SubmitButtonRegistration text="white">Send kode</SubmitButtonRegistration>
                            </CenterFlex>
                        </Form>
                    </SectionWrapper>
                </FormContent>
            </FormWrapperRegistration>
        </>
    );
};
