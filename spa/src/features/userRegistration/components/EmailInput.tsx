import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form } from '../../../components/Form/Form';
import { ProgressBarForm } from '../../../components/Form/ProgressBar';
import { useStateDispatch } from '../../../hooks/useRedux';
import { userServices } from '../services/user.services';
import { StyledInput } from '../../../components/Form/StyledElements/StyledInput';
import { useInput } from '../../../hooks/useInput';
import { validateEmail } from '../../../utils/email-validator';
import { userActions } from '../../../store/state/user.state';
import { CloseButton } from '../../../components/UI/Buttons/NavigationButtons';
import { PageSubtitle, PageTitle, SectionContainer, SubmitButton, Text } from '../../../components/UI';
import { Main } from '../../../components/Layout';

const ListWrapper = styled.div`
    padding: 10px;
    margin-bottom: 20px;
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
            navigate('/register/confirm-code', { state: { email } });
        }
    };

    const pageIndex = 0;

    return (
        <Main>
            <CloseButton onClick={() => navigate('/login')} />
            <SectionContainer>
                <PageTitle className="registration">E-post</PageTitle>
                <ProgressBarForm pageIndex={pageIndex} />
                <ListWrapper>
                    <Text>Ved å opprette bruker kan du:</Text>
                    <ul>
                        <li>Legge til lokasjoner</li>
                        <li>Få personlig tilpasning og anbefalinger</li>
                    </ul>
                </ListWrapper>
                <PageSubtitle>Fyll inn din e-postadresse for å motta en bekreftelseskode.</PageSubtitle>
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
                    <SubmitButton
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 'auto', marginBottom: '-10vh' }}
                        disabled={emailInputHasError}
                    >
                        Send kode
                    </SubmitButton>
                </Form>
            </SectionContainer>
        </Main>
    );
};
