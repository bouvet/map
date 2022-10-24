import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form } from '../../../components/Form/Form';
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
import { CloseButton } from '../../../components/UI/Buttons/NavigationButtons';
import { PageContainer, PageSubtitle, PageTitle, SectionContainer, SubmitButton } from '../../../components/UI';

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
            <PageContainer>
                <CloseButton onClick={() => navigate('/login')} />
                <SectionContainer>
                    <TitleForm>E-post</TitleForm>
                    <ListWrapper>
                        <Text>Ved å opprette bruker kan du:</Text>
                        <ul>
                            <li>Legge til lokasjoner</li>
                            <li>Få personlig tilpasning og anbefalinger</li>
                        </ul>
                    </ListWrapper>
                    <Text>Fyll inn din e-postadresse for å motta en bekreftelseskode.</Text>
                    <Form onSubmit={onSubmitHandler} style={{ marginTop: '3rem' }}>
                        <StyledInput
                            label="E-post*"
                            type="email"
                            errorMessage="Vennligst oppgi en gyldig e-post"
                            value={email}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            inputHasError={emailInputHasError}
                        />
                        <SubmitButton type="submit" variant="contained" sx={{ marginTop: 'auto' }} disabled={emailInputHasError}>
                            Send kode
                        </SubmitButton>
                    </Form>
                </SectionContainer>
            </PageContainer>
        </>
    );
};
